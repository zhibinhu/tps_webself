<template>
    <div>
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <router-link to="/">首页</router-link>
            </li>
            <li class="breadcrumb-item">
                <router-link to="/pdf">pdf文档管理</router-link>
            </li>
            <li class="breadcrumb-item active">pdf文档列表</li>
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
        </div>
        <div class="card mx-3">
            <div class="layer-loading" v-show="loading"><i></i><i></i><i></i></div>


            <table class="table table-advanced table-hover treetable" ref="treetable">
                <thead>
                <tr>
                    <th class="hidden-md-down">文件名</th>
                    <th class="hidden-md-down">所在医院</th>
                    <th class="hidden-md-down">上传时间</th>
                    <th class="text-xs-center">操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in page.items" :key="item.id">
                    <td class="hidden-sm-down">{{item.name}}</td>
                    <td class="hidden-sm-down">{{item.departmentName}}</td>
                    <td class="hidden-sm-down">{{item.createTime | time-date}}</td>
                    <td class="text-xs-center">
                        <a class="text-info" @click="download(item.path)"><i class="fa fa-ey"></i> 查看</a>
                    </td>
                </tr>
                </tbody>

            </table>
            <v-pagination :pageNumChange.sync="pageNumChange" :cur.sync="cur" :all.sync="all" :count.sync="count"
                          :curIndex_s.sync="curIndex_s" @listen="paging"></v-pagination>
        </div>
    </div>
</template>
<script>
    import {Pdf} from '../../resources'

    import Pagination from '../../widgets/pagination.vue'
    import {debounce} from '../../misc/utils'
    import paginations from '../../widgets/paginations.vue'

    export default {
        data: () => ({
            loading: 0,
            keyword: '',
            page: {},
            cur: 1,
            all: 1,
            curIndex_s: 1,
            count: 0,
            pageNumChange: 0
        }),
        beforeRouteEnter(to, from, next) {
            Pdf.query().then(response => {
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
                Pdf.query({keyword: this.keyword, pn: pn || 1}).then(response => {
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

            download(path) {
                window.open(path);
            },
            query(id) {
                this.loading = 1;
                this.curIndex_s = id;
                this.paging(1);
                this.pageNumChange++;
            }


        },
        components: {Pagination, 'v-pagination': paginations}
    }
</script>
