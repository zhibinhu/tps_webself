import $ from 'jquery'
const storage = localStorage;
import {User, Chat,netURL} from "../resources";
import {receiveChat, enterChatRoom} from "./utils";
import state from '../vuex/state'
// 新图片预览 图片id与图片路径为一对一关系
let newImgPath = [];
let newImgId = 0;
// WebSocket服务器地址
// let host = 'ws://117.78.42.234:8886';
let host = 'ws://10.131.104.216:8886';
let lockReconnect = false;
let websocket;
// 心跳包
let heartCheck = {

    timeout: 30000,
    timeoutObj: null,
    serverTimeoutObj: null,
    reset() {
        clearTimeout(this.timeoutObj);
        clearTimeout(this.serverTimeoutObj);
        return this;
    },
    start() {
        let self = this;
        this.timeoutObj = setTimeout(function () {
            websocket.send("@heartbeat");
            self.serverTimeoutObj = setTimeout(function () {
                websocket.close();
            }, self.timeout)
        }, this.timeout)
    }
};

// 监控连接状态
function initEventHandle(userId) {
    websocket.onopen = function () {
        console.log("websocket连接上");
        websocket.send("login" + userId);
        checkOffline(userId);
        heartCheck.reset().start();
    };
    websocket.onmessage = function (event) {
        console.log(JSON.stringify(event.data));
        let message = event.data;
        let array = message.split(",");
        let array1 = array[0].split(":");
        //判定头部
        if (array1.length > 1 && array1[0] === 'type') {
            if (array1[1] === 'notice') {
                // 流程通知 更新条数
                let count = state.noticeCount;
                if (count === -1) {
                    count = storage.getItem('count');
                }
                count++;
                state.noticeCount = count;
                storage.setItem('count', count);
                // 弹窗提示
                let sender = array[1];
                let content = array[2];
                Notification.requestPermission().then((result) => {
                    if (result === "granted") {
                        let notification = new Notification(sender + '发来了新的通知', {
                            body : content
                        });
                    }
                })
                // swal(sender + "向您发送了消息", content, "warning");
            } else if (array1[1] === 'invite') {
                // 在线交流 查看邀请
                let inviter = array[1];
                let taskId = array[2];
                let chatId = array[3];
                let inviterId = array[4];
                let type = array[5];
                receiveChat(this, Chat, taskId, User.current().id, inviterId, inviter, type, chatId);
            } else if (array1[1] === 'enter') {
                // 在线交流 查看进入房间提醒
                let receiver = array[1];
                let taskId = array[2];
                let chatId = array[3];
                let receiverId = array[4];
                let type = array[5];
                enterChatRoom(this, Chat, taskId, User.current().id, receiverId, receiver, type, chatId);
            } else if (array1[1] === 'message') {
                // 在线交流 发送的消息
                let senderAvatar = netURL + array[1];
                let senderName = array[array.length - 2];
                let senderId = array[array.length - 1];
                let msgArr = array.slice(2,-2)
                let msgcon = msgArr.concat();
              // let message = array[2];
                // 消息发送时间格式
                let date = new Date();
                let hour = date.getHours();
                let minute = date.getMinutes();
                if (hour < 10) {
                    hour = '0' + hour;
                }
                if (minute < 10) {
                    minute = '0' + minute;
                }
                let sendTime = hour + ':' + minute;
                // 判定页面所在路由 如在对应的聊天室则实时更新记录
                let href = window.location.href;
                if (href.indexOf('chat/room') > 0) {
                    let locationStrings = href.split('?');
                    // console.log(locationStrings);
                    let suffix = locationStrings[0];
                    let str = suffix.substring(suffix.lastIndexOf('/') + 1);
                    if (senderId === str) {
                        let html = '';
                        if (msgcon.indexOf('<img') > -1) {
                            html = '<li>'
                                + '<p class="info"><span>' + sendTime + '</span></p>'
                                + '<div class="main">'
                                + '<img class="avatar" width="30" height="30" src="' + senderAvatar + '"/>'
                                + '<div class="image" id="receiveImg' + newImgId + '" data-toggle="modal" data-target="#picture">' + msgcon + '</div>';
                            showReceiveImg(newImgId, msgcon);
                            newImgId++;
                        } else {
                            html = '<li>'
                                + '<p class="info"><span>' + sendTime + '</span></p>'
                                + '<div class="main">'
                                + '<img class="avatar" width="30" height="30" src="' + senderAvatar + '"/>'
                                + '<div class="text">' + msgcon + '</div>'
                        }
                        $('ul').append(html);
                        // 动态修改接收方滚动条
                        let div = document.getElementById('show');
                        div.scrollTop = div.scrollHeight;
                    }
                } else {
                    // 非文字消息 消息列表特殊显示
                    if (msgcon.indexOf("<img") >= 0) {
                      msgcon = '[图片]';
                    } else if (msgcon.indexOf("<") >= 0) {
                      msgcon = '[艺术字]';
                    }
                    // 浏览器桌面通知
                    Notification.requestPermission().then((result) => {
                        if (result === "granted") {
                            let notification = new Notification(senderName + '发来了新的消息', {
                                body : msgcon,
                                icon : senderAvatar
                            });

                        }
                    })
                }
            }
        }
        heartCheck.reset().start();
    };
    websocket.onerror = function (evnt) {
        console.log("websocket错误");
        remove(userId);
        reconnect(userId);
    };
    websocket.onclose = function (evnt) {
        console.log("websocket关闭");
        remove(userId);
        reconnect(userId);
    }
}

// 销毁连接
function remove(userId) {
    // websocket.send("close" + userId)
}

// 重连动作
function reconnect(userId) {
    if (lockReconnect) return;
    lockReconnect = true;
    setTimeout(function () {
        createWebSocket(userId);
        lockReconnect = false;
    }, 10000)
}

// 检查是否有离线消息
function checkOffline(userId) {
    Chat.checkOffline({currentId: userId}).then(res => {
        let offlineCount = res.data.data;
        if (offlineCount > 0) {
            // 浏览器桌面通知
            Notification.requestPermission().then((result) => {
                if (result === "granted") {
                    let notification = new Notification('您有未查看的沟通消息', {
                        body : '您有' + offlineCount + '条未读的沟通消息',
                        icon : ''
                    });
                }
            })
        }
    })
}

// 接收方查看新图片
function showReceiveImg(imageId, message) {
    newImgPath.push(message);
    let showId = '#receiveImg' + imageId;
    $(document).on('click', showId, () => {
        let index = showId.charAt(showId.length - 1);
        let showPic = newImgPath[index];
        $('#oneImg').html(showPic);
    })
}

// 创建WebSocket连接
export function createWebSocket(userId) {
    console.log("login userId:" + userId);
    try {
        websocket = new WebSocket(host);
        initEventHandle(userId);
    } catch (e) {
        reconnect(userId);
    }
}
