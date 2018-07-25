<template>
    <div class="m-message" ref="msgList">
        <ul>
            <!-- 显示聊天消息 -->
            <li v-for="item in list">
                <span v-if="item.senderId === userId"></span>
                <p class="info"><span>{{item.sendTime}}</span></p>
                <div class="main" :class="{self: item.senderId === userId}">
                    <!--自己/对方头像-->
                    <img  v-if="item.senderId == userId" class="avatar" width="30" height="30" :src="netURL+item.senderAvatar" />
                    <img v-else class="avatar" width="30" height="30" :src="netURL+item.senderAvatar"/>
                    <!--文字/图片消息-->
                    <div class="text" v-if="pictureIds.indexOf(item.id) < 0" v-html="item.message"></div>
                    <div class="image" v-if="pictureIds.indexOf(item.id) > -1" v-html="item.message" @click="showPicture(item.message)"
                         data-toggle="modal" data-target="#picture"></div>
                </div>
            </li>
            <!-- 历史消息文字 -->
            <li>
                <p class="info" v-if="list.length > 0"><span>{{historyNotice}}</span></p>
            </li>
        </ul>
        <!-- 查看原图 模态框 -->
        <div id="picture" class="modal fade text-center">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-body" id="close">
                        <button class="close" data-dismiss="modal">
                            <span>&times;</span>
                        </button>
                    </div>
                    <div class="modal-body" id="oneImg" v-html="showPic"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery'
    import {User,netURL} from "../../resources";

    export default {
        props: ['list'],
        data: () => ({
            userId: '',
            netURL,
            historyNotice: '-------- 以上是历史消息 --------',
            pictureIds: '',
            showPic: '',
            newImgId: 0,
            newImgPath: []
        }),
        created() {
            this.userId = User.current().id;

        },
        updated() {
            let messages = this.list;
            for (let i = 0; i < messages.length; i++) {
                let message = messages[i].message;
                if (message.indexOf('<img') > -1) {
                    let pictureId = messages[i].id;
                    // 避免重复统计
                    if (this.pictureIds.indexOf(pictureId) > -1) {
                        return;
                    }
                    this.pictureIds += pictureId + '-';
                }
            }
        },
        methods: {
            // 当前用户新增消息
            addMessage(sendTime, message, avatar) {
                this.newImgPath.push(message);
                let html = '';
                if (message.indexOf('<img') > -1) {
                    html = '<li>'
                        + '<p class="info"><span>' + sendTime + '</span></p>'
                        + '<div class="main self">'
                        + '<img class="avatar" src="' + avatar + '" width="30" height="30" />'
                        + '<div class="image" id="sendImg' + this.newImgId + '" data-toggle="modal" data-target="#picture">' + message + '</div>'
                        + '</div></li>';
                    // 添加发送方新图片查看原图
                    let newestId = '#sendImg' + this.newImgId;
                    let that = this;
                    $(document).on('click',newestId,() => {
                        let index = newestId.charAt(newestId.length - 1);
                        let newestPic = that.newImgPath[index];
                        that.showPicture(newestPic);
                    });
                    this.newImgId++;
                } else {
                    html = '<li>'
                        + '<p class="info"><span>' + sendTime + '</span></p>'
                        + '<div class="main self">'
                        + '<img class="avatar" src="' + avatar + '" width="30" height="30" />'
                        + '<div class="text">' + message + '</div>'
                        + '</div></li>'
                }
                $('ul').append(html);
                this.$emit('insert');
            },
            // 查看原图
            showPicture(imgPath) {
                this.showPic = imgPath;
            }
        }
    }
</script>

<style>
  .m-message ul, .m-message ol{list-style-type:none;}
    .m-message {
        padding: 10px 15px;
        overflow-y: scroll;
        margin-right: 15px;
        margin-left: 1rem !important;
    }

    .m-message li {
        margin-bottom: 15px;
    }

    .m-message .info {
        margin: 7px 0;
        text-align: center;
    }

    .m-message p {
        background-color: #eee;
    }

    .m-message .info span {
        display: inline-block;
        padding: 0 18px;
        font-size: 12px;
        color: #fff;
        border-radius: 2px;
        background-color: #dcdcdc;
    }

    .m-message .avatar {
        float: left;
        margin: 0 10px 0 0;
        border-radius: 3px;
    }

    .m-message .text {
        display: inline-block;
        position: relative;
        padding: 0 10px;
        min-height: 30px;
        line-height: 2.5;
        font-size: 14px;
        text-align: left;
        word-break: break-all;
        background-color: #fafafa;
        border-radius: 4px;
    }

    .m-message .text:before {
        content: " ";
        position: absolute;
        top: 9px;
        right: 100%;
        border: 6px solid transparent;
        border-right-color: #fafafa;
    }

    .m-message .image {
        display: inline-block;
    }

    .m-message .image img {
        width: 200px;
        height: 150px;
    }

    /* 当前用户发送的消息右对齐 */
    .m-message .self {
        text-align: right;
    }

    .m-message .self .avatar {
        float: right;
        margin: 0 0 0 10px;
    }

    .m-message .self .text {
        background-color: #b2e281;
    }

    .m-message .self .text:before {
        right: inherit;
        left: 100%;
        border-right-color: transparent;
        border-left-color: #b2e281;
    }

</style>
