<template>
    <div class="main">
        <!-- 顶栏 显示对方用户姓名 -->
        <div class="row" id="head">
            <div class="col-md-5">
                <button class="btn btn-info"><i class="fa fa-arrow-left" @click="goBack">&nbsp;返回</i></button>
            </div>
            <div class="col-md-7">
                <p>{{userName}}</p>
            </div>
        </div>
        <!-- 消息显示框 -->
        <chat-show id="show" ref="show" :list="messages" @insert="updateScroll"></chat-show>
        <!-- 消息编辑框 -->
        <chat-edit id="edit" @insert="newMessage"></chat-edit>
    </div>
</template>

<script>
    import chatShow from './message.vue'
    import chatEdit from './text.vue'
    import {Chat, User, netURL} from "../../resources";
    let storage = localStorage;

    export default {
        // el: '#chat',
        data: () => ({
            currentId: '',
            anotherId: '',
            messages: [],
            userName: '',
            message: '',
            currentAvatar: '',
            defaultImg: '/img/timg.jpg',
            roomType: '',
            type: '',
        }),
        beforeRouteEnter(to, from, next) {
            let currentId = to.params.id1;
            let anotherId = to.params.id2;
            let messageType = '';
            let url = window.location.href;
            // console.log(url);
            // let typeParam = url.split('&');
            // if (typeParam.length > 1) {
            //     let param = typeParam[1];
            //     let keyValue = param.split('=');
            //     if (keyValue[1] === 'target') {
            //         messageType = 3;
            //     } else if (keyValue[1] === 'planning') {
            //         messageType = 8;
            //     }
            // }
            Chat.getRecent({currentId: currentId, anotherId: anotherId, size: 30}).then((res) => {
                next(vm => {
                    vm.currentId = currentId;
                    vm.anotherId = anotherId;
                    vm.messages = res.data.data.data;
                    console.log(vm.messages);
                    // 当前用户头像 用于发送时显示临时消息
                    for (let i = 0; i < vm.messages.length; i++) {
                        let oneMessage = vm.messages[i];
                        if (oneMessage.senderId === vm.currentId) {
                            vm.currentAvatar = oneMessage.senderAvatar;
                            break;
                        }
                    }
                    // 更改消息状态
                    let idStr = '';
                    let records = vm.messages;
                    for (let i = 0; i < records.length; i++) {
                        if (currentId == records[i].receiverId && records[i].status == 0) {
                            let id = records[i].id;
                            idStr += id + '-';
                        }
                    }
                    Chat.update({ids: idStr, status: 1});

                    // vm.type = messageType;

                    vm.$nextTick(() => vm.$store.state.isLoading = false)
                })
            })
        },
        mounted() {
            // 获取对方用户名
            this.userName = this.$route.query.userName;
        },
        updated() {
            // 初始加载滚动条位置
            this.$nextTick(() => this.updateScroll());
        },
        methods: {
            // 获取最新的消息序列，规定显示条数
            getRecent() {
                Chat.getRecent({currentId: this.currentId, anotherId: this.anotherId, size: 10}).then((res) => {
                    this.messages = res.data.data;
                })
            },
            // 发送一条消息并更新到发送方的消息显示栏
            newMessage(message) {
                // 校正换行符
                let array = message.split('<\/p>');
                let newMessage = '';
                let len = array.length;
                if (len > 2) {
                    for (let i = 0; i < len - 1; i++) {
                        newMessage += array[i] + '<br>';
                    }
                    message = newMessage;
                } else {
                    message = array[0];
                }
                // 去除头尾p标签
                message = message.replace(/<p>/g, '');
                this.clearRestRows(message);
                if (this.message !== '' && this.message !== undefined) {
                    Chat.saveNew({
                        senderId: this.currentId,
                        receiverId: this.anotherId,
                        message: this.message,
                        type: this.type
                    }).then(() => {
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
                        // 获取发送者头像
                        let avatar ,localMs = window.localStorage.getItem('headImageSrc');
                        if(localMs){
                            avatar = localMs;
                        }else {
                            avatar = netURL + User.current().avatar;
                        }
                        // 调用消息显示栏方法 添加最新消息
                        this.$refs.show.addMessage(sendTime, message, avatar);
                    })
                } else {
                    swal('发送失败', '消息不可为空', 'error')
                }
            },
            // 返回流程详情页
            goBack() {
                return this.$router.back();
            },
            // 动态修改发送方滚动条
            updateScroll() {
                let div = document.getElementById('show');
                div.scrollTop = div.scrollHeight;
            },
            // 清除空行
            clearRestRows(message) {
                if (message.endsWith('<br>')) {
                    if (message.length === '<br>'.length) {
                        this.message = '';
                    } else {
                        let msg = message.substring(0, message.length - '<br>'.length);
                        this.clearRestRows(msg);
                    }
                } else {
                    this.message = message;
                }
            }
        },
        components: {
            chatShow, chatEdit
        }
    }
</script>

<style>
    .main {
        position: relative;
        overflow: hidden;
        background-color: #eee;
    }

    .main #head button {
        width: 70px;
        border-radius: 10px;
    }

    .main #head i {
        margin-left: -7px;
        font-size: 16px;
    }

    .main #head p {
        margin-left: 45px;
        margin-top: 5px;
        font-size: 20px;
        font-weight: bold;
        width: 100%;
    }

    .main #show {
        height: 600px;
        /*height: 400px;*/
    }

    .main #edit {
        height: 500px;
        /*height: 500px;*/
    }

    .main .modal-dialog {
      display: inline-block;
      width: auto;
    }

    .main .modal img {
      width: 100%;
    }
</style>
