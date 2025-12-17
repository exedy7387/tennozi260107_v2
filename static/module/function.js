var web_socket;
var size = [640, 480];

//ロボット使用中フラグAPI
// async function mutex(id,use) {
//   try{
//     var service_id = '';
//     var data = '';
//     service_id = await POSTget_map(url,id,use)
//     data = await checkStatus(id,service_id,GETmutex);
//     console.log(data.status);
//     return data;
//   }
//   catch(error){
//     console.error(error);
//     throw new Error(error.message);
//   }
// }

//地図取得
async function get_map(id) {
    try {
        var service_id = "";
        var data = "";
        service_id = await POSTget_map(url, id);
        console.log("service_id:" + service_id);
        data = await checkStatus(id, service_id, GETget_map);
        console.log(data.status);
        return data;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
}

//地図保存
async function save_map(id, map_name) {
    try {
        var service_id = "";
        var data = "";
        service_id = await POSTsave_map(url, id, map_name);
        console.log("service_id:" + service_id);
        data = await checkStatus(id, service_id, GETsave_map);
        console.log(data.status);
        return data;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
}

//地図モード切替
async function create_map(id, command) {
    console.log(command);
    try {
        var service_id = "";
        var data = "";
        service_id = await POSTcreate_map(url, id, command);
        console.log("service_id:" + service_id);
        data = await checkStatus(id, service_id, GETcreate_map);
        console.log(data.status);
        return data.status;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
}

//地図ダウンロード
async function deploy_map(id, map_id) {
    try {
        var service_id = "";
        var data = "";
        service_id = await POSTdeploy_map(url, id, map_id);
        console.log("service_id:" + service_id);
        data = await checkStatus(id, service_id, GETdeploy_map);
        console.log(data.status);
        return data.status;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
}

//ダウンロード地図ID取得
async function get_map_id(id) {
    try {
        var service_id = "";
        var data = "";
        service_id = await POSTget_map_id(url, id);
        console.log("service_id:" + service_id);
        data = await checkStatus(id, service_id, GETget_map_id);
        console.log(data.status);
        return data;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
}

//原点位置だし
async function initialize_pose(id, x, y, angle) {
    try {
        var service_id = "";
        var data = "";
        service_id = await POSTinitialize_pose(url, id, x, y, angle);
        console.log("service_id:" + service_id);
        data = await checkStatus(id, service_id, GETinitialize_pose);
        console.log(data.status);
        return data.status;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
}

//位置情報取得
async function get_pose(id) {
    try {
        var service_id = "";
        var data = "";
        service_id = await POSTget_pose(url, id);
        console.log("service_id:" + service_id);
        data = await checkStatus(id, service_id, GETget_pose);
        console.log(data.status);
        return data;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
}

//idleモード切替
async function stop(id) {
    try {
        var service_id = "";
        var data = "";
        service_id = await POSTstop(url, id);
        console.log("service_id:" + service_id);
        data = await checkStatus(id, service_id, GETstop);
        console.log(data.status);
        return data.status;
    } catch (error) {
        console.log(error);
    }
}

//追従走行
async function follow(id) {
    try {
        var service_id = "";
        var data = "";
        service_id = await POSTfollow(url, id);
        console.log("service_id:" + service_id);
        data = await checkStatus(id, service_id, GETfollow);
        console.log(data.status);
        return data;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
}

//自律走行
async function navigate(id, x, y, angle) {
    try {
        var service_id = "";
        var data = "";
        service_id = await POSTnavigate(url, id, x, y, angle);
        console.log("service_id:" + service_id);
        data = await checkStatus(id, service_id, GETnavigate);
        console.log(data.status);
        return data.status;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
}

//自律走行 一時停止
async function navigate_pause(id) {
    try {
        var service_id = "";
        var data = "";
        service_id = await POSTnavigate_pause(url);
        console.log("service_id:" + service_id);
        data = await checkStatus(id, service_id, GETnavigate_pause);
        console.log(data.status);
        return data.status;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
}

//自律走行 再開
async function navigate_resume(id) {
    try {
        var service_id = "";
        var data = "";
        service_id = await POSTnavigate_resume(url);
        console.log("service_id:" + service_id);
        data = await checkStatus(id, service_id, GETnavigate_resume);
        console.log(data.status);
        return data.status;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
}

//先導走行
async function leading_navigate(id, x, y, angle) {
    try {
        var service_id = "";
        var data = "";
        service_id = await POSTleading_navigate(url, id, x, y, angle);
        console.log("service_id:" + service_id);
        data = await checkStatus(id, service_id, GETleading_navigate);
        console.log(data.status);
        return data.status;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
}

//カメラ画像
async function get_image(id, c) {
    try {
        var service_id = "";
        var data = "";
        service_id = await POSTget_image(url, id);
        console.log("service_id:" + service_id);
        data = await checkStatus(id, service_id, GETget_image);
        console.log(data.status);
        console.log(data.image);
        var img = new Image();
        img.src = data.image;
        img.onload = function () {
            c.drawImage(img, 0, 0, size[0], size[1]);
        };
        // return data.image;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
}

//カメラ動画
async function streaming(id, command, c) {
    try {
        await POSTstreaming(url, id, command);
        if (!c) {
            console.error(c + "was not found");
            return;
        }
        web_socket = new WebSocket(video_url + id);
        web_socket.onmessage = function (msg) {
            var data = "data:image/png;base64," + msg.data;
            var image = new Image();
            image.src = data;
            image.onload = function () {
                c.drawImage(image, 0, 0, size[0], size[1]);
            };
        };
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
}

//GNSS座標要求
async function get_gnss_position(id) {
    try {
        var service_id = "";
        var data = "";
        service_id = await POSTget_gnss_position(url, id);
        console.log("service_id:" + service_id);
        data = await checkStatus(id, service_id, GETget_gnss_position);
        console.log(data.status);
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
}

//音声入力
async function mic(id) {
    try {
        var service_id = "";
        var data = "";
        service_id = await POSTmic_recognition(url, id);
        console.log("service_id:" + service_id);
        data = await checkStatus(id, service_id, GETmic_recognition);
        return data.text;
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
}

//Google Speech音声入力
async function speech_recognition_google(id, language) {
    try {
        var service_id = "";
        var data = "";
        service_id = await POSTspeech_recognition_google(url, id, language);
        console.log("service_id:" + service_id);
        data = await checkStatus(id, service_id, GETspeech_recognition_google);
        return data.recognized;
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
}

// 音声出力
async function speak(id, speak_text, voice_name) {
    try {
        var service_id = "";
        var data = "";
        service_id = await POSTspeak(url, id, speak_text, voice_name);
        console.log("service_id:" + service_id);
        data = await checkStatus(id, service_id, GETspeak);
        console.log(data.status);
        return data.status;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
}

//広告動画再生
async function play_media(id, media_id, loop) {
    try {
        var service_id = "";
        var data = "";
        service_id = await POSTplay_media(url, id, media_id, loop);
        console.log("service_id:" + service_id);
        data = await checkStatus(id, service_id, GETplay_media);
        console.log(data.status);
        return data.status;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
}

//広告動画停止
async function stop_media(id) {
    try {
        var service_id = "";
        var data = "";
        service_id = await POSTstop_media(url, id);
        console.log("service_id:" + service_id);
        data = await checkStatus(id, service_id, GETstop_media);
        console.log(data.status);
        return data.status;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
}

//顔認証
async function face_recognition(id) {
    try {
        var service_id = "";
        var image_service_id = "";
        var data = "";
        // var img = new Image();
        service_id = await POSTface_recognition(url, id);
        image_service_id = await POSTget_image(url, id);
        // img.src = await GETget_image(url,id,image_service_id);
        await GETget_image(url, id, image_service_id);
        console.log("service_id:" + service_id);
        data = await checkStatus(id, service_id, GETface_recognition);
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
}

//物体認証
async function object_detection(id) {
    try {
        var service_id = "";
        var data = "";
        service_id = await POSTobject_detection(url, id);
        console.log("service_id:" + service_id);
        data = await checkStatus(id, service_id, GETobject_detection);
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
}

//人数カウント
async function people_count(id) {
    try {
        var service_id = "";
        var data = "";
        service_id = await POSTpeople_count(url, id);
        console.log("service_id:" + service_id);
        data = await checkStatus(id, service_id, GETpeople_count);
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
}

//属性検知
async function profile(id) {
    try {
        var service_id = "";
        var data = "";
        service_id = await POSTpeople_profile(url, id);
        console.log("service_id:" + service_id);
        data = await checkStatus(id, service_id, GETpeople_profile);
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
}

//密集地帯アクション
async function gathering(id) {
    try {
        var service_id = "";
        var data = "";
        service_id = await POSTgathering(url, id);
        console.log("service_id:" + service_id);
        data = await checkStatus(id, service_id, GETgathering);
        console.log(data.status);
        return data.status;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
}

//ルート走行
async function route_navigation(id, route_position, angle) {
    try {
        var service_id = "";
        var data = "";
        service_id = await POSTroute_navigation(url, id, route_position, angle);
        console.log("service_id:" + service_id);
        data = await checkStatus(id, service_id, GETroute_navigation);
        console.log(data.status);
        return data.status;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
}

//ルート走行 一時停止
async function route_navigation_pause(id) {
    try {
        var service_id = "";
        var data = "";
        service_id = await POSTroute_navigation_pause(url, id);
        console.log("service_id:" + service_id);
        data = await checkStatus(id, service_id, GETroute_navigation_pause);
        console.log(data.status);
        return data.status;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
}

//ルート走行 再開
async function route_navigation_resume(id) {
    try {
        var service_id = "";
        var data = "";
        service_id = await POSTroute_navigation_resume(url, id);
        console.log("service_id:" + service_id);
        data = await checkStatus(id, service_id, GETroute_navigation_resume);
        console.log(data.status);
        return data.status;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
}

//QRコード情報取得
async function read_qr(id, duration) {
    try {
        var service_id = "";
        var data = "";
        service_id = await POSTread_qr(url, id, duration);
        console.log("service_id:" + service_id);
        data = await checkStatus(id, service_id, GETread_qr);
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
}

// IO指示
async function io(id, type, number, value, duration) {
    try {
        var service_id = "";
        var data = "";
        var status = "";
        const stopPromise = new Promise((resolve, reject) => {
            document.getElementById("div_stop").addEventListener("click", () => {
                console.log("停止しました");
                reject(new Error("停止しました")); // ボタンが押されたらエラーをスロー
            });
        });
        service_id = await POSTio(url, id, type, number, value, duration);
        console.log("service_id:" + service_id);
        while (status !== "SUCCEEDED" && status !== "ABORTED") {
            //ABORTEDでもエラーを出さない
            if (status === "PREEMPTING" || status === "REJECTED" || status === "PREEMPTED" || status === "TIMEOUT") {
                console.log("Error:" + status);
                throw new Error("失敗しました。  状態：" + status);
            }
            data = await Promise.race([GETio(url, id, service_id), stopPromise]);
            status = data.status;
            console.log(status);
        }
        return status;
    } catch (error) {
        console.log(status);
        throw error;
    }
}

//クラウド全停止
async function stop_all(id) {
    try {
        var service_id = "";
        var data = "";
        service_id = await POSTstop_all(url, id);
        console.log("service_id:" + service_id);
        data = await checkStatus(id, service_id, GETstop_all);
        console.log(data.status);
        return data.status;
    } catch (error) {
        console.log(error);
    }
}

// chatGPT
async function gpt(data_text) {
    const apiKey = "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";
    var prompt = `
    あなたは役に立つアシスタントです。とてもフレンドリーに会話します。2文までで話して。相手は子供です。
    `;
    var params = {
        model: "gpt-4o",
        messages: [{ role: "system", content: prompt }],
    };
    const options = {
        headers: {
            Authorization: "Bearer " + apiKey,
            "Content-Type": "application/json",
        },
    };
    params.messages.push({ role: "user", content: data_text });
    try {
        const result = await axios.post("https://api.openai.com/v1/chat/completions", params, options);
        console.log(result);
        var response = result["data"]["choices"][0]["message"]["content"];
        console.log(response);
        params.messages.push({ role: "assistant", content: response });
        console.log(params);
        return response;
    } catch {
        console.log(error);
    }
}

// //status確認用関数
// async function checkStatus(id, service_id, callback,start_time) {
//   try {
//     console.log(start_time);
//     let status = '';
//     var data = await callback(url,id, service_id);
//     status = data.status;
//     console.log(data);
//     if (status === 'PENDING') {
//       const end_time = performance.now();
//       if (end_time - start_time >= wait_time) {
//         console.log(wait_time + '経ちました');
//         throw new Error('PENDINGに時間がかかっています。通信を確認してください。');
//       }
//       else{
//         data = await checkStatus(id, service_id, callback,start_time);
//       }
//     } else if (status === 'ACTIVE') {
//       data = await checkStatus(id, service_id, callback,start_time);
//     } else if (status === 'SUCCEEDED') {
//       console.log(status);
//     } else if (status === 'PREEMPTING' || status === 'ABORTED' || status === 'REJECTED' || status === 'PREEMPTED') {
//       console.log('Error:' + status);
//       throw new Error('失敗しました。 状態：'+status);
//     }
//     return data;
//   } catch (error) {
//     throw error;
//   }
// }

//status確認用関数
async function checkStatus(id, service_id, callback) {
    try {
        var data = "";
        var status = "";
        //'div_stop'の有無で条件分岐
        if (document.getElementById("div_stop")) {
            const stopPromise = new Promise((resolve, reject) => {
                document.getElementById("div_stop").addEventListener("click", () => {
                    console.log("停止しました");
                    reject(new Error("停止しました")); // ボタンが押されたらエラーをスロー
                });
            });
            while (status !== "SUCCEEDED") {
                if (
                    status === "PREEMPTING" ||
                    status === "ABORTED" ||
                    status === "REJECTED" ||
                    status === "PREEMPTED" ||
                    status === "TIMEOUT"
                ) {
                    console.log("Error:" + status);
                    throw new Error("失敗しました。 状態：" + status);
                }
                data = await Promise.race([callback(url, id, service_id), stopPromise]);
                status = data.status;
                console.log(status);
                await sleep(500);
            }
        } else {
            while (status !== "SUCCEEDED") {
                if (
                    status === "PREEMPTING" ||
                    status === "ABORTED" ||
                    status === "REJECTED" ||
                    status === "PREEMPTED" ||
                    status === "TIMEOUT"
                ) {
                    console.log("Error:" + status);
                    throw new Error("失敗しました。 状態：" + status);
                }
                data = await callback(url, id, service_id);
                status = data.status;
                console.log(status);
                await sleep(500);
            }
        }
        return data;
    } catch (error) {
        throw error;
    }
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
