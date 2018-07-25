<template>
    <div>
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <router-link to="/">首页</router-link>
            </li>
            <li class="breadcrumb-item active">通知管理</li>
        </ol>
        <div class="row" style="margin-left: 15px">
            <div class="col-md-5">
                <a href="javascript:void(0);" class="btn btn-primary noticeTab" :class="{curShow: unreadFlag}"
                   @click="changeNoticeShow(0)">未读通知</a>
                <a href="javascript:void(0);" class="btn btn-primary noticeTab" :class="{curShow: readedFlag}"
                   @click="changeNoticeShow(1)">已读通知</a>
            </div>
            <div class="col-md-5"></div>
            <div class="col-md-2" v-if="state == 1 && readedCount != 0" style="margin-top: 5px">
                <i class="text-danger fa fa-trash-o" @click="clearAll()">清空所有通知</i>
            </div>
        </div>
        <div class="card mx-3 logCardBackground">
            <!--通知列表-->
            <div v-if="count != 0">
                <table class="table table-advanced table-hover">
                    <thead>
                    <tr>
                        <th @click="sort('sender_id')">发件人<i :class="{fa:true,'fa-arrow-up':sortType=='asc'&&sortField=='sender_id','fa-arrow-down':sortType=='desc'&&sortField=='sender_id'}"></i></th>
                        <!--<th class="hidden-sm-down">发件人</th>-->
                        <th @click="sort('title')">标题<i :class="{fa:true,'fa-arrow-up':sortType=='asc'&&sortField=='title','fa-arrow-down':sortType=='desc'&&sortField=='title'}"></i></th>
                        <th @click="sort('gmt_create')">发送时间<i :class="{fa:true,'fa-arrow-up':sortType=='asc'&&sortField=='gmt_create','fa-arrow-down':sortType=='desc'&&sortField=='gmt_create'}"></i></th>
                        <th class="text-xs-center">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, index) in NoticeList.list" :key="NoticeList.list.id">
                        <td class="hidden-sm-down">{{item.sender | to-short}}</td>
                        <td class="hidden-sm-down">{{item.title | to-short}}</td>
                        <td class="hidden-sm-down">{{item.created | to-short}}</td>
                        <td class="text-xs-center">
                            <router-link :to="'/notice/detail/' + item.id">
                                <i class="fa fa-eye"></i>查看
                            </router-link>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <v-pagination :pageNumChange.sync="pageNumChange" :cur.sync="cur" :all.sync="all" :count.sync="count"
                              :curIndex_s.sync="curIndex_s" @listen="paging"></v-pagination>
            </div>

            <div class="row" style="padding:0 30px;border-bottom:1px solid #b4dbed;height:400px"
                 v-if="count == 0">
                <span style="color: grey; margin-left: 500px; margin-top: 180px">没有通知</span>
            </div>
        </div>
    </div>
</template>
<script>

    import {User, Notice} from '../../resources'
    import swal from 'sweetalert'
    import Pagination from '../../widgets/pagination.vue'
    import paginations from '../../widgets/paginations.vue'
    import {debounce} from '../../misc/utils'
    let storage = localStorage;

    let page_backup = null;  // 初始化分页数据备份

    export default {
        data: () => ({
            sortField:null,
            sortType:null,
            loading: 0,
            keyword: '',
            startDate: '',
            endDate: '',
            NoticeList: {},
            cur: 1,
            all: 1,
            count: 0,
            curIndex_s: 1,
            roleId: 0,
            ids: 0,
            status: 0,
            //未读条数
            noticeCount: 0,
            //已读条数
            readedCount: 0,
            pageNumChange: 0,
            //链接参数
            targetId: 0,
            planningId: 0,
            //显示状态
            state: 0,
            unreadFlag: true,
            readedFlag: false
        }),
        beforeRouteEnter(to, from, next) {
            Notice.getNoticeList({pageSize: 10, pageNumber: 1, status: 0, sort: 'gmt_create' + ' ' + 'desc'}).then((data) => {
                next(vm => {
                    vm.NoticeList = data.data.data;
                    vm.all = parseInt(vm.NoticeList.totalCount % vm.NoticeList.pageSize == 0 ? vm.NoticeList.totalCount / vm.NoticeList.pageSize : vm.NoticeList.totalCount / vm.NoticeList.pageSize + 1);
                    vm.count = vm.NoticeList.totalCount;
                    vm.$nextTick(() => vm.$store.state.isLoading = false)
                })
            })
        },
        beforeRouteUpdate(to, from, next) {
            this.$store.state.isLoading = false
            this.paging(1, next)
        },
        methods: {
            queryData() {
                this.getNoticeList()
            },
            //获取通知列表
            getNoticeList() {
                Notice.getNoticeList({
                    pageSize: 10, pageNumber: 1, status: this.state
                }).then((data) => {
                    this.NoticeList = data.data.data;
                    this.all = parseInt(this.NoticeList.totalCount % this.NoticeList.pageSize === 0 ? this.NoticeList.totalCount / this.NoticeList.pageSize : this.NoticeList.totalCount / this.NoticeList.pageSize + 1);
                    this.count = this.NoticeList.totalCount;
                    if (this.state === 0) {
                        this.noticeCount = this.$store.state.noticeCount;
                    } else {
                        this.readedCount = this.count;
                    }
                });
            },
            //修改一条通知的状态（目前只有未读→已读）
            changeStatus(item, status) {
                Notice.changeStatus(item.id, status).then(() => {
                    this.getNoticeList()
                });
                this.subUnreadCount(1);
            },
            //全标已读/全标未读
            changeAllStatus(status) {
                Notice.changeAllStatus(status).then(() => {
                    this.getNoticeList();
                    this.setUnreadCount(status);
                });
            },
            //未读条数减少count的值
            subUnreadCount(count) {
                this.noticeCount -= count;
                this.updateUnreadCount();
            },
            //根据所选状态（已读/未读）设置未读条数
            setUnreadCount(status) {
                this.noticeCount = (status === 1) ? 0 : this.count;
                this.updateUnreadCount();
            },
            //更新未读条数
            updateUnreadCount() {
                console.log("当前未读条数:" + this.noticeCount)
                this.$store.state.noticeCount = this.noticeCount;
                storage.setItem('count', this.$store.state.noticeCount);
            },
            //删除一条通知
            trash(item) {
                if (confirm('确定要删除该条记录？')) {
                    Notice.deleteNotice(item.id).then(() => {
                        this.getNoticeList();
                        if (item.status === 0) {
                            this.subUnreadCount(1);
                        }
                    })
                }
            },
            //清空所有通知
            clearAll() {
                swal({
                    type: 'warning',
                    title: '您真的要清空已读通知吗？',
                    text: '',
                    showCancelButton: true,
                    cancelButtonText: '取消',
                    confirmButtonText: '清空',
                    confirmButtonColor: '#DD6B55',
                    showLoaderOnConfirm: true,
                    closeOnConfirm: false
                }, confirmed => {
                    if (confirmed) {
                        this.loading = true
                        Notice.deleteAll({
                            userId: User.current().id
                        }).then(response => {
                            this.loading = false;
                            if (response.data.code == 1) {
                                swal({type: 'success', title: '已清空通知!', text: '您的已读通知已被清空.'}, confirmed => {
                                    if (confirmed) {
                                        this.reload();
                                        this.setUnreadCount(1);
                                    }
                                })
                            } else {
                                swal('删除失败!', response.data.msg, 'warning')
                            }
                        }, response => {
                            swal('操作失败', response.data.msg, 'error')
                            vm.loading = false
                        }).catch(error => {
                            swal('操作失败', error, 'error')
                            vm.loading = false
                        })
                    }
                })
            },
            //通知列表重载
            reload() {
                this.getNoticeList();
            },
            //不同的分栏显示
            changeNoticeShow(state) {
                this.state = state;
                if (state == 0) {
                    this.unreadFlag = true;
                    this.readedFlag = false;
                } else if (state == 1) {
                    this.unreadFlag = false;
                    this.readedFlag = true;
                }
                this.getNoticeList();
            },
            // 分页查询
            paging(pn, cb) {
                this.loading = 1;
                Notice.getNoticeList({
                    keyword: this.keyword,
                    status: this.status,
                    pn: pn || 1,
                    sort: (this.sortField != undefined && this.sortField != null && this.sortField != '') ? (this.sortField + ' ' + this.sortType) : ''
//                    pageNumber: pn || 1, status: this.state
                }).then(response => {
                    this.NoticeList = response.data.data;
                    this.loading = 0;
                    this.all = parseInt(this.NoticeList.totalCount % this.NoticeList.pageSize === 0 ? this.NoticeList.totalCount / this.NoticeList.pageSize : this.NoticeList.totalCount / this.NoticeList.pageSize + 1);
                    this.count = this.NoticeList.totalCount;
                    cb && cb()
                })
            },
            //排序
            sort(field){
                this.sortField=field;
                this.sortType=this.sortType=='asc'?'desc':'asc';
                this.paging(1);
            },
            paging_delayed: debounce(function () {
                this.paging(1)
            }, 400)
        },
        watch: {
            keyword(v) {
                if (!v && page_backup) { // 已经备份过原始数据, 直接使用跳过查询
                    return this.page = page_backup
                }

                this.loading = 1;
                this.paging_delayed()
            },
        },
        components: {Pagination, 'v-pagination': paginations}
    }
</script>
<style>
    .btn.noticeTab {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        margin-left: 10px;
        background: #fff;
        color: #333;
        border: 0;
        box-shadow: 0 0 5px #ccc;
        padding: 0.5rem 2rem;
    }

    .btn.noticeTab.curShow {
        background: #54a0ff;
        color: #fff;
    }
</style>
