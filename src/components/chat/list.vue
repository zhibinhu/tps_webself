<template>
    <div>
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <router-link to="/">首页</router-link>
            </li>
            <li class="breadcrumb-item active">沟通管理</li>
        </ol>
        <div class="card mx-3 logCardBackground">
            <!--通知列表-->
            <div v-if="showCode !== 0 && msgCount !== 0">
                <table class="table table-advanced table-hover">
                    <thead>
                    <tr>
                        <th class="hidden-sm-down">联系人</th>
                        <th class="hidden-sm-down">登录状态</th>
                        <th class="hidden-sm-down">最近消息</th>
                        <th class="hidden-sm-down">发送时间</th>
                        <th class="text-xs-center">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, index) in infoList" :key="infoList.id">
                        <td class="hidden-sm-down">{{item.userName | to-short}}</td>
                        <td class="hidden-sm-down text-success" v-if="item.isOnline === true">在线</td>
                        <td class="hidden-sm-down text-danger" v-if="item.isOnline === false">离线</td>
                        <!--消息格式分类-->
                        <td class="hidden-sm-down" v-if='item.message.indexOf("<img") >= 0'>[图片]</td>
                        <td class="hidden-sm-down" v-else-if='item.message.indexOf("<") >= 0'>[艺术字]</td>
                        <td class="hidden-sm-down" v-else>{{item.message | to-short}}</td>
                        <td class="hidden-sm-down">{{item.time | time-date}}</td>
                        <td class="text-xs-center">
                            <router-link :to="'/chat/room/' + currentUser + '/' + item.userId + '?userName=' + item.userName">
                                <i class="fa fa-commenting-o"></i>交流
                            </router-link>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <v-pagination :pageNumChange.sync="pageNumChange" :cur.sync="cur" :all.sync="all" :count.sync="count"
                              :curIndex_s.sync="curIndex_s"></v-pagination>
            </div>

            <div class="row" style="padding:0 30px;border-bottom:1px solid #b4dbed;height:400px"
                 v-if="showCode === 0 || msgCount === 0">
                <span style="color: grey; margin-left: 500px; margin-top: 180px">没有消息</span>
            </div>
        </div>
    </div>
</template>

<script>
    import {Chat, User} from "../../resources"
    import Pagination from '../../widgets/pagination.vue'
    import paginations from '../../widgets/paginations.vue'
    let storage = localStorage;

    export default {
        data: () => ({
            infoList: [],
            showCode: '',
            msgCount: 0,
            cur: 1,
            all: 1,
            count: 0,
            curIndex_s: 1,
            pageNumChange: 0,
            currentUser: ''
        }),
        beforeRouteEnter(to, from, next) {
            Chat.listInfo({currentId: User.current().id}).then((res) => {
                next(vm => {
                    vm.currentUser = res.data.data.currentId;
                    vm.showCode = res.data.code;
                    if (vm.showCode > 0) {
                        vm.infoList = res.data.data.list;
                        vm.msgCount = vm.infoList.length;
                        vm.count = vm.msgCount;
                    }

                    vm.$nextTick(() => vm.$store.state.isLoading = false)
                })
            })
        },
        components: {Pagination, 'v-pagination': paginations}
    }
</script>

<style>

</style>
