<template>
    <div>
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <router-link to="/">首页</router-link>
            </li>
            <li class="breadcrumb-item active">医院管理</li>
        </ol>
        <div class="card p-3 mb-3">
            <div class="row" style="margin-left: 2px;margin-bottom: 12px">
                <div class="col-md-3 input-holder b-ddd rad-3"><i class="ti-search"></i>
                    <input name="keyword" v-model.trim="keyword" class="form-control" placeholder="输入查询内容">

                </div>
                <div class="col-md-1">
                    <button type="button" class="btn btn-info rounded" v-on:click="query(1)"><i class="fa fa-search"
                                                                                                style="color: #fff"></i>
                        查询
                    </button>
                </div>
                <div class="col-md-1">
                    <router-link class="btn  btn-info rounded ml-auto" to="/department/new"><i class="fa fa-plus"></i>
                        新增
                    </router-link>
                </div>
            </div>
            <div class="card mx-3">
                <div class="layer-loading" v-show="loading"><i></i><i></i><i></i></div>
                <table class="table table-advanced table-hover treetable" ref="treetable">
                    <thead>
                    <tr>
                        <th @click="sort('name')">医院名<i
                                :class="{fa:true,'fa-arrow-up':sortType=='asc'&&sortField=='name','fa-arrow-down':sortType=='desc'&&sortField=='name'}"></i>
                        </th>
                        <th @click="sort('alia')">别名<i
                                :class="{fa:true,'fa-arrow-up':sortType=='asc'&&sortField=='alia','fa-arrow-down':sortType=='desc'&&sortField=='alia'}"></i>
                        </th>
                        <th @click="sort('address')">地址<i
                                :class="{fa:true,'fa-arrow-up':sortType=='asc'&&sortField=='address','fa-arrow-down':sortType=='desc'&&sortField=='address'}"></i>
                        </th>
                        <th @click="sort('adminName')">管理员<i
                                :class="{fa:true,'fa-arrow-up':sortType=='asc'&&sortField=='adminName','fa-arrow-down':sortType=='desc'&&sortField=='adminName'}"></i>
                        </th>
                        <th class="hidden-md-down">电话</th>
                        <th class="text-xs-center">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr :data-tt-id="item.id" :data-tt-parent-id="item.parent" v-for="(item, index) in page.items"
                        :key="item.id">
                        <td>{{item.name}}</td>
                        <td class="hidden-sm-down">{{item.alia}}</td>
                        <td class="hidden-sm-down">{{item.address | to-short}}</td>
                        <td class="hidden-sm-down">{{item.adminName | to-short}}</td>
                        <td class="hidden-lg-down">{{item.adminPhone}}</td>
                        <td class="text-xs-center">
                            <router-link :to="'/department/' + item.id"><i class="fa fa fa-pencil"></i>编辑</router-link>
                            <a class="text-danger" @click="remove(item.id, index)"><i class="fa fa-trash-o"></i>删除</a>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <v-pagination :pageNumChange.sync="pageNumChange" :cur.sync="cur" :all.sync="all" :count.sync="count"
                              :curIndex_s.sync="curIndex_s" @listen="paging"></v-pagination>
            </div>
        </div>
    </div>
</template>
<script>
    import {del, treeify} from '../../misc/utils'
    import {Department} from '../../resources'
    let storage = localStorage;
    import swal from 'sweetalert'

    import Pagination from '../../widgets/pagination.vue'
    import {debounce} from '../../misc/utils'
    import paginations from '../../widgets/paginations.vue'

    var stored = storage.getItem('departmentExpanded')  // get stored expanded nodes
    var expanded = stored ? JSON.parse(stored) : {}

    export default {
        data: () => ({
            sortField: null,
            sortType: null,
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
            Department.query().then(response => {
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
                Department.query({
                    keyword: this.keyword,
                    pn: pn || 1,
                    sort: (this.sortField != undefined && this.sortField != null && this.sortField != '') ? (this.sortField + ' ' + this.sortType) : ''
                }).then(response => {
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
                this.$router.push('/department/' + id)
            },
            remove(id, index) {
                del(this, Department, id, this.page.items, index)
            },
            sort(field) {
                this.sortField = field;
                this.sortType = this.sortType == 'asc' ? 'desc' : 'asc';
                this.paging(1);
            },
            query(id) {
                this.loading = 1;
                this.curIndex_s = id;
                this.paging(1);
                this.pageNumChange++;
            }
        },
        components: {Pagination, 'v-pagination': paginations},
        destroyed() {
            storage.setItem('departmentExpanded', JSON.stringify(expanded))
        }
    }
</script>
