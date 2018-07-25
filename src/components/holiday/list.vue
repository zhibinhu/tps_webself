<template>
    <div>
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <router-link to="/">首页</router-link>
            </li>
            <li class="breadcrumb-item active">节假日管理</li>
        </ol>
        <div class="row" style="margin-left: 2px;margin-bottom: 12px">
            <div class="col-md-3 input-group">
                <input name="keyword" v-model.trim="keyword" class="form-control" placeholder="输入查询内容">
            </div>
            <div class="col-md-1">
                <button type="button" class="btn btn-info rounded" v-on:click="query(1)"><i class="fa fa-search"
                                                                                            style="color: #fff"></i> 查询
                </button>
            </div>
            <div class="col-md-1">
                <router-link class="btn  btn-info rounded ml-auto" to="/holiday/new"><i class="fa fa-plus"></i> 新增
                </router-link>
            </div>
        </div>
        <div class="card mx-3">
            <div class="layer-loading" v-show="loading"><i></i><i></i><i></i></div>


            <table class="table table-advanced table-hover treetable">
                <thead>
                <tr>
                    <th>开始</th>
                    <th>结束</th>
                    <th>类型</th>
                    <th>备注</th>
                    <th class="text-xs-center">操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in page.items" :key="item.id">
                    <td class="hidden-sm-down">{{item.startdate | time-date }}</td>
                    <td class="hidden-sm-down">{{item.enddate | time-date}}</td>
                    <td class="hidden-sm-down">
                        <span v-show="item.type === 0">工作日</span>
                        <span v-show="item.type === 1">假日</span>
                    </td>
                    <td class="hidden-sm-down">{{item.memo}}</td>
                    <td class="text-xs-center">
                        <router-link :to="'/holiday/' + item.id"><i class="fa fa fa-pencil"></i>编辑</router-link>
                        <a class="text-danger" @click="remove(item.id, index)"><i class="fa fa-trash-o"></i>删除</a>
                    </td>
                </tr>
                </tbody>

            </table>
            <v-pagination :cur.sync="cur" :all.sync="all" :count.sync="count" :curIndex_s.sync="curIndex_s"
                          @listen="paging"></v-pagination>
        </div>
    </div>
</template>
<script>
    import {del, formatDate} from '../../misc/utils'
    import {Holiday} from '../../resources'
    import Pagination from '../../widgets/pagination.vue'
    import {debounce} from '../../misc/utils'
    import paginations from '../../widgets/paginations.vue'

    var page_backup = null;  // 初始化分页数据备份

    export default {
        data: () => ({
            loading: 0,
            keyword: '',
            page: {},
            cur: 1,
            all: 1,
            curIndex_s: 1,
            count: 0
        }),
        beforeRouteEnter(to, from, next) {
            Holiday.query().then(response => {
                next(vm => {
                    vm.page = response.data;
                    vm.all = parseInt(vm.page.totalCount % vm.page.pageSize == 0 ? vm.page.totalCount / vm.page.pageSize : vm.page.totalCount / vm.page.pageSize + 1);
                    vm.count = vm.page.totalCount;

                    vm.$nextTick(() => vm.$store.state.isLoading = false)
                })
            })
        },
        beforeRouteUpdate(to, from, next) {
            this.$store.state.isLoading = false
            this.paging(1, next)
        },
        methods: {
            paging(pn, cb) {  // 分页查询
                this.loading = 1;
                Holiday.query({keyword: this.keyword, pn: pn || 1}).then(response => {
                    this.page = response.data;
                    this.all = parseInt(this.page.totalCount % this.page.pageSize == 0 ? this.page.totalCount / this.page.pageSize : this.page.totalCount / this.page.pageSize + 1);
                    this.count = this.page.totalCount;
                    this.loading = 0;
                    cb && cb()
                })
            },
            paging_delayed: debounce(function () {
                this.paging(1)
            }, 400),
            edit(id) {
                this.$router.push('/holiday/' + id)
            },
            remove(id, index) {
                del(this, Holiday, id, this.page.items, index)
            },
            query(id) {
                this.loading = 1;
                this.curIndex_s = id;
                this.paging(1)
            }
        },
        components: {Pagination, 'v-pagination': paginations}
    }
</script>
