<template>
    <div>
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <router-link to="/">首页</router-link>
            </li>
            <li class="breadcrumb-item active">系统日志</li>
        </ol>
        <div class="row" style="margin-left: 15px;margin-bottom: 12px">
            <div class="col-md-3">
                <input type="date" name="date" class="form-control" v-model="start"/>
            </div>
            <span style="height:40px;line-height:40px;">---</span>
            <div class="col-md-3">
                <input type="date" name="date" class="form-control" v-model="end"/>
            </div>
            <div class="col-md-1">
                <button type="button" class="btn btn-info rounded" @click="queryData"><i class="fa fa-search"
                                                                                         style="color: #fff"></i> 查询
                </button>
            </div>
        </div>
        <div class="card mx-3">
            <div class="layer-loading" v-show="loading"><i></i><i></i><i></i></div>

            <table class="table table-advanced table-hover treetable">
                <thead>
                <tr>
                    <th style="width: 6%">id</th>
                    <th style="width: 11%">用户名</th>
                    <th style="width: 15%">用户操作</th>
                    <th style="width: 17%">请求参数</th>
                    <th style="width: 17%">执行时长(毫秒)</th>
                    <th style="width: 15%">IP地址</th>
                    <th style="width: 19%">创建时间</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in LogList.logList" :key="item.id">
                    <td class="hidden-sm-down" style="width: 6%">{{item.id}}</td>
                    <td class="hidden-sm-down" style="width: 11%">{{item.username}}</td>
                    <td class="hidden-sm-down" style="width: 15%">{{item.operation}}</td>
                    <td class="hidden-sm-down" style="width: 17%">{{item.params}}</td>
                    <td class="hidden-sm-down" style="width: 17%">{{item.time}}</td>
                    <td class="hidden-sm-down" style="width: 15%">{{item.ip}}</td>
                    <td class="hidden-lg-down" style="width: 19%">{{item.created}}</td>
                </tr>
                </tbody>

            </table>
            <v-pagination :cur.sync="cur" :all.sync="all" :count.sync="count" @listen="paging"></v-pagination>
        </div>
    </div>
</template>
<script>
    import {SysLog} from '../../resources'
    import Pagination from '../../widgets/pagination.vue'
    import paginations from '../../widgets/paginations.vue'
    import {debounce} from '../../misc/utils'

    var page_backup = null;  // 初始化分页数据备份

    export default {
        data: () => ({
            loading: 0,
            keyword: '',
            start: '',
            end: '',
            cur: 1,
            all: 1,
            count: 0,
            LogList: {}
        }),
        beforeRouteEnter(to, from, next) {
            SysLog.getLog({pageSize: 20, pageNumber: 1}).then((data) => {
                next(vm => {
                    vm.LogList = data.data.data;
                    vm.all = parseInt(vm.LogList.totalCount % vm.LogList.pageSize == 0 ? vm.LogList.totalCount / vm.LogList.pageSize : vm.LogList.totalCount / vm.LogList.pageSize + 1);
                    vm.count = vm.LogList.totalCount;
                    vm.$nextTick(() => vm.$store.state.isLoading = false)
                })
            })
        },
        beforeRouteUpdate(to, from, next) {
            this.$store.state.isLoading = false
            this.paging(1, next)
        },
        created() {
            this.getLog()
        },
        methods: {
            queryData() {
                this.getLog()
            },
            getLog() {
                SysLog.getLog({pageSize: 20, pageNumber: 1, start: this.start, end: this.end}).then((data) => {
                    this.LogList = data.data.data;
                    this.all = parseInt(this.LogList.totalCount % this.LogList.pageSize == 0 ? this.LogList.totalCount / this.LogList.pageSize : this.LogList.totalCount / this.LogList.pageSize + 1);
                    this.count = this.LogList.totalCount
                })
            },
            paging(pn, cb) {  // 分页查询
                this.loading = 1;
                SysLog.getLog({
                    keyword: this.keyword,
                    pageNumber: pn || 1,
                    start: this.start,
                    end: this.end
                }).then(response => {
                    this.LogList = response.data;
                    this.all = parseInt(this.LogList.totalCount % this.LogList.pageSize == 0 ? this.LogList.totalCount / this.LogList.pageSize : this.LogList.totalCount / this.LogList.pageSize + 1);
                    this.count = this.LogList.totalCount;
                    this.loading = 0;
                    cb && cb()
                })
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
            }
        },
        components: {Pagination, 'v-pagination': paginations}
    }
</script>
