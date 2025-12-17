//  API関数群  //

//本番環境
const url = "https://exedy-robo.com/v1/robots/"; //基本URL
const ws_url = "wss://exedy-robo.com/websocket/"; //遠隔操作URL
const video_url = "wss://exedy-robo.com/ws/video/"; //ストリーミングURL

// // 開発環境
// const url = "https://robot-dev.net/v1/robots/"; //基本URL
// const ws_url = "wss://robot-dev.net/websocket/"; //遠隔操作URL
// const video_url = "wss://robot-dev.net/ws/video/"; //ストリーミングURL

// //keisuu.net
// const url = 'https://exedy.keisuu.net/v1/robots/';  //基本URL
// const ws_url = 'wss://exedy.keisuu.net/websocket/';  //遠隔操作URL
// const video_url = 'wss://exedy.keisuu.net/ws/video/';  //ストリーミングURL

const timeout = 20;
const duration = 10;
const api_key = "sumagi1007";

/////ロボット使用中フラグAPI
function GETmutex(url, id) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        axios
            .get(url + id + "/mutex", { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/////ロボット使用中フラグAPI
function POSTmutex(url, id, use) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        const data = new FormData();
        data.append("use", use);

        axios
            .post(url + id + "/mutex", data, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data.service_id);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/////状態（ステータス）確認
function GETstatus(url, id) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        axios
            .get(url + id + "/status", { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/////利用状況確認
function GETusage(url, id) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        axios
            .get(url + id + "/usage", { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/////地図取得、表示
function GETmap(url, id) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        axios
            .get(url + id + "/map", { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/////登録済み地図一覧取得
function GETmaps(url, id) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        axios
            .get(url + id + "/maps", { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/////地図画像アップロード
function POSTmaps(url, id, formData) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        axios
            .post(url + id + "/maps", formData, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    console.log("done");
                    resolve(response.data);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/////地図削除
function POSTmap_delete(url, id, map_id) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        axios
            .post(url + id + "/maps/" + map_id + "/delete", {}, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/////地図要求結果取得
function GETget_map(url, id, service_id) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        axios
            .get(url + id + "/service/get_map?service_id=" + service_id, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/////地図要求指示
function POSTget_map(url, id) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        const data = new FormData();
        data.append("timeout", timeout);

        axios
            .post(url + id + "/service/get_map", data, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data.service_id);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/////地図保存結果取得
function GETsave_map(url, id, service_id) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        axios
            .get(url + id + "/service/save_map?service_id=" + service_id, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/////地図保存指示
function POSTsave_map(url, id, map_name) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        const data = new FormData();
        data.append("timeout", timeout);
        data.append("name", map_name);

        axios
            .post(url + id + "/service/save_map", data, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data.service_id);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/////地図作成モードと地図使用モードの切替状態取得API
function GETcreate_map(url, id, service_id) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        axios
            .get(url + id + "/service/create_map?service_id=" + service_id, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/////地図作成モードと地図使用モードの切替指令API
function POSTcreate_map(url, id, command) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        const data = new FormData();
        data.append("timeout", timeout);
        data.append("command", command);

        axios
            .post(url + id + "/service/create_map", data, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data.service_id);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/////地図ダウンロード結果取得
function GETdeploy_map(url, id, service_id) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        axios
            .get(url + id + "/service/deploy_map?service_id=" + service_id, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/////地図ダウンロード指示
function POSTdeploy_map(url, id, map_id) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        const data = new FormData();
        data.append("timeout", timeout);
        data.append("map_id", map_id);
        data.append("x", 0);
        data.append("y", 0);
        data.append("angle", 0);

        axios
            .post(url + id + "/service/deploy_map", data, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data.service_id);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/////ダウンロード地図ID要求結果取得
function GETget_map_id(url, id, service_id) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        axios
            .get(url + id + "/service/get_map_id?service_id=" + service_id, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/////ダウンロード地図ID要求指示
function POSTget_map_id(url, id) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        const data = new FormData();
        data.append("timeout", timeout);

        axios
            .post(url + id + "/service/get_map_id", data, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data.service_id);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/////原点位置だし結果取得
function GETinitialize_pose(url, id, service_id) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        axios
            .get(url + id + "/service/initialize_pose?service_id=" + service_id, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/////原点位置だし指示
function POSTinitialize_pose(url, id, x, y, angle) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        const data = new FormData();
        data.append("x", x);
        data.append("y", y);
        data.append("angle", angle);
        data.append("timeout", timeout);

        axios
            .post(url + id + "/service/initialize_pose", data, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data.service_id);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/////位置情報結果取得
function GETget_pose(url, id, service_id) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        axios
            .get(url + id + "/service/get_pose?service_id=" + service_id, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/////位置情報取得指示
function POSTget_pose(url, id) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        const data = new FormData();
        data.append("timeout", timeout);

        axios
            .post(url + id + "/service/get_pose", data, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data.service_id);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/////停止ステータス取得
function GETstop(url, id, service_id) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        axios
            .get(url + id + "/service/idle?service_id=" + service_id, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/////停止指示
function POSTstop(url, id) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        const data = new FormData();
        data.append("timeout", timeout);

        axios
            .post(url + id + "/service/idle", data, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data.service_id);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/////追従走行ステータス取得
function GETfollow(url, id, service_id) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        axios
            .get(url + id + "/service/follow?service_id=" + service_id, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/////追従走行
function POSTfollow(url, id) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        const data = new FormData();
        data.append("timeout", timeout);

        axios
            .post(url + id + "/service/follow", data, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data.service_id);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/////ルート走行ステータス取得
function GETroute_navigation(url, id, service_id) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        axios
            .get(url + id + "/service/route_navigation?service_id=" + service_id, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/////ルート走行指示
function POSTroute_navigation(url, id, route_position, angle) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        let data = {
            timeout,
            angle,
            waypoints: route_position,
        };
        axios
            .post(url + id + "/service/route_navigation", data, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data.service_id);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/////ルート走行 一時停止結果取得
function GETroute_navigation_pause(url, id, service_id) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        axios
            .get(url + id + "/service/route_navigation/pause?service_id=" + service_id, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/////ルート走行指示 一時停止指示
function POSTroute_navigation_pause(url, id) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        const data = new FormData();
        data.append("timeout", timeout);

        axios
            .post(url + id + "/service/route_navigation/pause", data, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data.service_id);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/////ルート走行 一時停止結果取得
function GETroute_navigation_resume(url, id, service_id) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        axios
            .get(url + id + "/service/route_navigation/resume?service_id=" + service_id, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/////ルート走行指示 再開指示
function POSTroute_navigation_resume(url, id, route_navigation_service_id) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        const data = new FormData();
        data.append("route_navigation_service_id", route_navigation_service_id, { headers: headers });
        data.append("timeout", timeout);

        axios
            .post(url + id + "/service/route_navigation/resume", data)
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data.service_id);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/////自律走行ステータス取得
function GETnavigate(url, id, service_id) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        axios
            .get(url + id + "/service/navigation?service_id=" + service_id, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/////自律走行
function POSTnavigate(url, id, x, y, angle) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        const data = new FormData();
        data.append("x", x);
        data.append("y", y);
        data.append("angle", angle);
        data.append("timeout", timeout);

        axios
            .post(url + id + "/service/navigation", data, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data.service_id);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/////自律走行 一時停止結果取得
function GETnavigate_pause(url, id, service_id) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        axios
            .get(url + id + "/service/navigation/pause?service_id=" + service_id, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/////自律走行 一時停止
function POSTnavigate_pause(url, id) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        const data = new FormData();
        data.append("timeout", timeout);

        axios
            .post(url + id + "/service/navigation/pause", data, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data.service_id);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/////自律走行 再開結果取得
function GETnavigate_resume(url, id, service_id) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        axios
            .get(url + id + "/service/navigation/resume?service_id=" + service_id, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/////自律走行 再開指示
function POSTnavigate_resume(url, id, navigation_service_id) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        const data = new FormData();
        data.append("navigation_service_id", navigation_service_id, { headers: headers });
        data.append("timeout", timeout);

        axios
            .post(url + id + "/service/navigation/resume", data)
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data.service_id);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/////先導走行ステータス取得
function GETleading_navigate(url, id, service_id) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        axios
            .get(url + id + "/service/lead_navigation?service_id=" + service_id, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/////先導走行
function POSTleading_navigate(url, id, x, y, angle) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        const data = new FormData();
        data.append("x", x);
        data.append("y", y);
        data.append("angle", angle);

        axios
            .post(url + id + "/service/lead_navigation", data, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data.service_id);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/////カメラ画像取得
function GETimage(url, id) {
    var img = new Image();
    img.src = url + id + "/camera/image";
    return img.src;
}

/////カメラ画像要求結果取得
function GETget_image(url, id, service_id) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        axios
            .get(url + id + "/service/get_image?service_id=" + service_id, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/////カメラ画像要求
function POSTget_image(url, id) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        const data = new FormData();
        data.append("timeout", timeout);

        axios
            .post(url + id + "/service/get_image", data, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data.service_id);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/////カメラ動画(ストリーミング)開始・停止要求結果取得
function GETstreaming(url, id, service_id) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        axios
            .get(url + id + "/service/set_streaming?service_id=" + service_id, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/////カメラ動画(ストリーミング)開始・停止要求指示
function POSTstreaming(url, id, command) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        const data = new FormData();
        data.append("command", command);

        axios
            .post(url + id + "/service/set_streaming", data, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data.service_id);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/////GNSS座標要求結果取得
function GETget_gnss_position(url, id, service_id) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        axios
            .get(url + id + "/service/get_gnss_position?service_id=" + service_id, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

//////GNSS座標要求指示
function POSTget_gnss_position(url, id) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        const data = new FormData();
        data.append("timeout", timeout);
        axios
            .post(url + id + "/service/get_gnss_position", data, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data.service_id);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/////音声認識結果取得
function GETmic_recognition(url, id, service_id) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        axios
            .get(url + id + "/service/mic_recognition?service_id=" + service_id, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

//////音声認識操作
function POSTmic_recognition(url, id) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        const data = new FormData();
        data.append("timeout", timeout);

        axios
            .post(url + id + "/service/mic_recognition", data, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data.service_id);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

//////Google Speech音声入力指示
function GETspeech_recognition_google(url, id, service_id) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        axios
            .get(url + id + "/service/speech_recognition_google?service_id=" + service_id, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

//////Google Speech音声認識結果
function POSTspeech_recognition_google(url, id, language) {
    console.log(language);
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        const data = new FormData();
        data.append("timeout", timeout);
        data.append("language_code", language);
        axios
            .post(url + id + "/service/speech_recognition_google", data, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data.service_id);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/////音声出力結果取得
function GETspeak(url, id, service_id) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        axios
            .get(url + id + "/service/speak?service_id=" + service_id, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/////音声出力
function POSTspeak(url, id, speak_text, voice_name) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        const data = new FormData();
        data.append("text", speak_text);
        // data.append('voice_name', 'Kazuha');
        data.append("voice_name", voice_name);
        data.append("timeout", timeout);

        axios
            .post(url + id + "/service/speak", data, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data.service_id);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/////広告動画一覧取得
function GETmedia(url, id) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        axios
            .get(url + id + "/media", { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/////広告動画登録
function POSTmedia(url, id, formData) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        var status = 0; //0:登録失敗 1:登録成功
        axios
            .post(url + id + "/media", formData, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    console.log("done");
                    resolve();
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/////広告動画削除
function POSTmedia_delete(url, id, media_id) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        axios
            .post(url + id + "/media/" + media_id + "/delete", {}, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/////広告動画再生結果取得
function GETplay_media(url, id, service_id) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        axios
            .get(url + id + "/service/play_media?service_id=" + service_id, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/////広告動画再生
function POSTplay_media(url, id, media_id, loop) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        const data = new FormData();
        data.append("media_id", media_id);
        data.append("loop", loop);
        data.append("timeout", timeout);
        // var data={
        //     media_id:media_id
        //   };

        axios
            .post(url + id + "/service/play_media", data, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data.service_id);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/////広告動画停止要求結果取得
function GETstop_media(url, id, service_id) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        axios
            .get(url + id + "/service/stop_media?service_id=" + service_id, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/////広告動画停止要求
function POSTstop_media(url, id) {
    return new Promise((resolve, reject) => {
        var headers = {
            "API-Key": api_key,
        };
        axios
            .post(url + id + "/service/stop_media", {}, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data.service_id);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/////顔登録一覧取得
function GETfaces(url, id) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        axios
            .get(url + id + "/faces", { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/////顔登録
function POSTfaces(url, id, formData) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        axios
            .post(url + id + "/faces", formData, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    console.log("done");
                    resolve(response.data);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/////顔削除
function POSTfaces_delete(url, id, face_id) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        axios
            .post(url + id + "/faces/" + face_id + "/delete", {}, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    resolve();
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/////顔認証結果取得
function GETface_recognition(url, id, service_id) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        axios
            .get(url + id + "/service/face_recognition?service_id=" + service_id, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/////顔認証指示
function POSTface_recognition(url, id) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        const data = new FormData();
        data.append("timeout", timeout);

        axios
            .post(url + id + "/service/face_recognition", data, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data.service_id);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/////登録済み学習モデル一覧取得
function GETobject_models(url, id) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        axios
            .get(url + id + "/object_models", { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/////学習済みモデル登録
function POSTobject_models(url, id, formData) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        axios
            .post(url + id + "/object_models", formData, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/////物体認証結果取得
function GETobject_detection(url, id, service_id) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        axios
            .get(url + id + "/service/object_detection?service_id=" + service_id, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/////物体認証指示
function POSTobject_detection(url, id) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        const data = new FormData();
        data.append("timeout", timeout);

        axios
            .post(url + id + "/service/object_detection", data, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data.service_id);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/////人数カウント結果取得
function GETpeople_count(url, id, service_id) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        axios
            .get(url + id + "/service/people_count?service_id=" + service_id, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/////人数カウント指示
function POSTpeople_count(url, id) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        const data = new FormData();
        data.append("timeout", timeout);

        axios
            .post(url + id + "/service/people_count", data, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data.service_id);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/////属性検知結果取得
function GETpeople_profile(url, id, service_id) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        axios
            .get(url + id + "/service/people_profile?service_id=" + service_id, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/////属性検知指示
function POSTpeople_profile(url, id) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        const data = new FormData();
        data.append("timeout", timeout);

        axios
            .post(url + id + "/service/people_profile", data, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data.service_id);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/////密集地帯アクション状態取得
function GETgathering(url, id, service_id) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        axios
            .get(url + id + "/service/gathering?service_id=" + service_id, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/////密集地帯アクション指示
function POSTgathering(url, id) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        const data = new FormData();
        data.append("timeout", timeout);

        axios
            .post(url + id + "/service/gathering", data, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data.service_id);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/////QRコード情報結果取得API
function GETread_qr(url, id, service_id) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        axios
            .get(url + id + "/service/read_qr?service_id=" + service_id, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/////QRコード情報取得API
function POSTread_qr(url, id, duration) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        const data = new FormData();
        data.append("timeout", timeout);
        data.append("duration", duration);
        axios
            .post(url + id + "/service/read_qr", data, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data.service_id);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/////I/O指示結果取得API
function GETio(url, id, service_id) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        axios
            .get(url + id + "/service/io?service_id=" + service_id, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/////I/O指示API
function POSTio(url, id, type, number, value, duration) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        const data = new FormData();
        data.append("type", type);
        data.append("number", number);
        data.append("value", value);
        data.append("duration", duration);
        data.append("timeout", timeout);
        axios
            .post(url + id + "/service/io", data, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data.service_id);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/////クラウド指示停止結果取得
function GETstop_all(url, id, service_id) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        axios
            .get(url + id + "/service/stop_all?service_id=" + service_id, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/////クラウド指示停止指示
function POSTstop_all(url, id) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Api-Key": api_key,
        };
        const data = new FormData();
        data.append("timeout", timeout);

        axios
            .post(url + id + "/service/stop_all", data, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data.service_id);
                } else {
                    throw new Error("APIリクエストが失敗しました。");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}
