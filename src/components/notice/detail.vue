<template>
    <div>
        <div>
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <router-link to="/">首页</router-link>
                </li>
                <li class="breadcrumb-item">
                    <router-link to="/notice">通知管理</router-link>
                </li>
                <li class="breadcrumb-item">通知详情</li>
            </ol>
        </div>
        <div class="row" style="border: 0; height: 60px">
            <div class="col-md-10">
                <span v-html="notice.title" style="font-weight: bold; font-size: 20px"></span>
            </div>
            <!--靶区勾画/计划设计详情快捷入口-->
            <div class="col-md-2" style="margin-top: 8px; padding-left: 22px" v-if="notice.planningId != null">
                <router-link :to="'/planning/detail/' + notice.planningId">
                    <i class="fa fa-eye">查看计划详情</i>
                </router-link>
            </div>
            <div class="col-md-2" style="margin-top: 8px; padding-left: 22px"
                 v-if="notice.planningId == null && notice.targetId != null">
                <router-link :to="'/target/detail/' + notice.targetId">
                    <i class="fa fa-eye">查看靶区详情</i>
                </router-link>
            </div>
        </div>
        <div class="row" style="border: 0; height: 40px">
            <div class="col-md-10">
                发件人：<span v-html="notice.sender"></span>
            </div>
            <div class="col-md-2">
                <span v-html="notice.created" style="font-size: 14px"></span>
            </div>
        </div>
        <div class="row" style="border: 0">
            <div class="col-md-12">
                收件人：<span v-html="notice.receiver"></span>
            </div>
        </div>
        <div class="row" style="border-top: 1px grey solid; height: 100px; margin-top: 5px">
            <div class="col-md-12" style="margin-top: 10px">
                <p v-html="notice.content"></p>
            </div>
        </div>
    </div>
</template>

<script>
    import {Notice} from '../../resources'
    let storage = localStorage;

    export default {
        data: () => ({
            notice: {},
            count: ''
        }),
        beforeRouteEnter(to, from, next) {
            let id = to.params.id;
            Notice.getNotice(id).then((data) => {
                next(vm => {
                    console.log(data.data.data);
                    let notice = data.data.data;
                    vm.notice = notice;
                    //切换为已读
                    if (notice.status == 0) {
                        Notice.changeStatus(id, 1);
                    }

                    vm.$nextTick(() => vm.$store.state.isLoading = false)
                })
            });
        },

        created() {
            //校正未读条数
            Notice.getUnreadCount().then((res) => {
                this.count = res.data.data;
                this.$store.state.noticeCount = this.count;
            })
        },

        methods: {},
    }
</script>
