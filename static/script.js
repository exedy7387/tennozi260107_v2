let isTyping = false;
let isAppStopped = false;
let isMediaStopped = false;
let longPressTimer = null;
let lastClickTime = 0;
let validUsers = [];

const ROBOT_ID = "SR05_2502110006";
// const ROBOT_ID = "multi2";

// ===== メディア設定（長押しで表示） =====
const header = document.getElementById("header");
const popup = document.getElementById("mediaConfigPopup");

const listEl = document.getElementById("mediaConfigList");
const btnSave = document.getElementById("mediaConfigSave");
const btnCancel = document.getElementById("mediaConfigCancel");

const MEDIA_MAP_STORAGE_KEY = "mediaIdMapByLabel";
const LONG_PRESS_MS = 700;

document.addEventListener("DOMContentLoaded", async () => {
    setInterval(updateTime, 10000);
    updateTime();

    // ★ ポップアップを強制的に非表示
    const loginPopup = document.getElementById("loginPopup");
    const robotPopup = document.getElementById("robotPopup");
    if (loginPopup) loginPopup.style.display = "none";
    if (robotPopup) robotPopup.style.display = "none";

    document.querySelectorAll(".play-button").forEach((btn) => {
        btn.addEventListener("click", async () => {
            const label = btn.dataset.label;
            const mediaId = btn.dataset.mediaId;

            console.log(`${label}のボタンが押されました`);

            try {
                await play_media(ROBOT_ID, mediaId, false);
            } catch (err) {
                console.error("play_media 実行中にエラー:", err);
            }
        });
    });

    const stopBtn = document.querySelector(".stop-button");
    if (stopBtn) {
        stopBtn.addEventListener("click", async () => {
            console.log("停止ボタンが押されました");
            try {
                await stop_media(ROBOT_ID);
            } catch (err) {
                console.error("stop_media 実行中にエラー:", err);
            }
        });
    }
    document.querySelectorAll(".mode-button").forEach((btn) => {
        btn.addEventListener("click", async () => {
            const mode = btn.dataset.mode;

            try {
                if (mode === "heart_eye") {
                    console.log("目♥ が押されました");
                    await gathering(ROBOT_ID);
                } else if (mode === "sad_image") {
                    console.log("悲しい が押されました");
                    const mediaId = btn.dataset.mediaId;
                    await play_media(ROBOT_ID, mediaId, false);
                } else if (mode === "heart_image") {
                    console.log("画像♥ が押されました");
                    const mediaId = btn.dataset.mediaId;
                    await play_media(ROBOT_ID, mediaId, false);
                } else if (mode === "normal") {
                    console.log("通常 が押されました");
                    await leading_navigate(ROBOT_ID, 0, 0, 0);
                    await stop_media(ROBOT_ID);
                }
            } catch (err) {
                console.error("mode 処理中にエラー:", err);
            }
        });
    });

    // DOMContentLoaded の中に入れる
    const header = document.getElementById("header");
    if (!header) console.error("header not found");

    let pressTimer = null;

    header.addEventListener("contextmenu", (e) => e.preventDefault()); // 長押しメニュー抑止

    const startPress = (e) => {
        if (e.cancelable) e.preventDefault();
        pressTimer = setTimeout(() => {}, 700);
    };

    const endPress = () => {
        if (pressTimer) clearTimeout(pressTimer);
        pressTimer = null;
    };

    header.addEventListener("mousedown", startPress);
    header.addEventListener("mouseup", endPress);
    header.addEventListener("mouseleave", endPress);

    header.addEventListener("touchstart", startPress, { passive: false });
    header.addEventListener("touchend", endPress);
    header.addEventListener("touchcancel", endPress);
});

// 時刻表示
function updateTime() {
    const el = document.getElementById("current-time");
    const now = new Date();
    const formatted = now.toLocaleDateString("ja-JP", { month: "long", day: "numeric" }) + " " + now.toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" });
    el.textContent = formatted;
}

function setupLongPress(el, onLongPress) {
    let timer = null;

    const start = (e) => {
        // タッチ長押しでブラウザに奪われるのを防ぐ
        if (e && e.cancelable) e.preventDefault();
        timer = setTimeout(() => onLongPress(), LONG_PRESS_MS);
    };

    const cancel = () => {
        if (timer) clearTimeout(timer);
        timer = null;
    };

    el.addEventListener("contextmenu", (e) => e.preventDefault());

    el.addEventListener("mousedown", start);
    el.addEventListener("mouseup", cancel);
    el.addEventListener("mouseleave", cancel);

    el.addEventListener("touchstart", start, { passive: false });
    el.addEventListener("touchend", cancel);
    el.addEventListener("touchcancel", cancel);
    el.addEventListener("touchmove", cancel); // ← これ重要（微妙に動くと解除）
}

function getSavedMediaMap() {
    try {
        return JSON.parse(localStorage.getItem(MEDIA_MAP_STORAGE_KEY) || "{}");
    } catch {
        return {};
    }
}

function saveMediaMap(map) {
    localStorage.setItem(MEDIA_MAP_STORAGE_KEY, JSON.stringify(map));
}

function applyMediaMapToButtons(map) {
    document.querySelectorAll(".play-button").forEach((btn) => {
        const label = btn.dataset.label;
        if (!label) return;
        if (map[label]) {
            btn.dataset.mediaId = map[label];
        }
    });
    document.querySelectorAll('.mode-button[data-mode="heart_image"], .mode-button[data-mode="sad_image"]').forEach((btn) => {
        const label = btn.dataset.label;
        if (!label) return;
        if (map[label]) btn.dataset.mediaId = map[label];
    });
}

async function fetchMediaList() {
    let data = await GETmedia(url, ROBOT_ID);

    const items = data.media || [];

    return items.map((m) => ({
        id: m.media_id,
        name: m.filename,
        mime: m.mime_type,
    }));
}

function openPopup() {
    popup.style.display = "flex";
}
function closePopup() {
    popup.style.display = "none";
}

async function buildMediaConfigUI() {
    listEl.innerHTML = "";

    // ①メディア一覧取得
    const mediaList = await fetchMediaList();
    if (!mediaList.length) {
        listEl.innerHTML = `<p>メディア一覧を取得できませんでした。</p>`;
        return;
    }

    // ②現在のボタン（デフォルト or 保存値反映後）をベースにUI生成
    const saved = getSavedMediaMap();
    const targetButtons = [
        ...document.querySelectorAll(".play-button"),
        ...document.querySelectorAll('.mode-button[data-mode="heart_image"]'),
        ...document.querySelectorAll('.mode-button[data-mode="sad_image"]'),
    ].filter((b) => b.dataset.label && b.dataset.mediaId);

    targetButtons.forEach((btn) => {
        const label = btn.dataset.label;
        const currentId = saved[label] || btn.dataset.mediaId;

        const row = document.createElement("div");
        row.className = "popup-row";

        const lab = document.createElement("label");
        lab.textContent = label;

        const sel = document.createElement("select");
        sel.dataset.label = label;

        mediaList.forEach((m) => {
            const opt = document.createElement("option");
            opt.value = m.id;
            opt.textContent = m.name;
            if (m.id === currentId) opt.selected = true;
            sel.appendChild(opt);
        });

        row.appendChild(lab);
        row.appendChild(sel);
        listEl.appendChild(row);
    });
}

setupLongPress(header, async () => {
    applyMediaMapToButtons(getSavedMediaMap());

    try {
        await buildMediaConfigUI();
    } catch (e) {
        console.error("buildMediaConfigUI failed:", e);
        listEl.innerHTML = `<p>メディア一覧の取得に失敗しました</p>`;
    } finally {
        openPopup(); // ← 何があっても開く
    }
});

btnCancel.addEventListener("click", () => closePopup());

// 保存：選択値を localStorage & ボタンに反映
btnSave.addEventListener("click", () => {
    const map = getSavedMediaMap();

    listEl.querySelectorAll("select").forEach((sel) => {
        const label = sel.dataset.label;
        const id = sel.value;
        if (label && id) map[label] = id;
    });

    saveMediaMap(map);
    applyMediaMapToButtons(map);
    closePopup();
});
