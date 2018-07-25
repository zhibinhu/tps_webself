<template>
    <div>
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <router-link to="/">首页</router-link>
            </li>
            <li class="breadcrumb-item">
                <router-link to="/planning">计划申请</router-link>
            </li>
            <li class="breadcrumb-item active">计划列表</li>
        </ol>

        <div class="card p-3 mb-3" style="margin-right: 20px">
            <div class="row" style="margin-left: 2px;margin-bottom: 12px">
                <div class="col-md-3 input-group">
                    <input type="text" name="keyword" v-model.trim="keyword" class="form-control"
                           placeholder="请输入病历号或者姓名">
                </div>

                <div class="col-md-2">
                    <select class="form-control" id="status" v-model="status" v-on:change="query(1)">
                        <option value="99" selected>所有</option>
                        <option value="0">新增</option>
                        <option value="1">已保存</option>
                        <option value="2">已提交</option>
                        <option value="3">已接收</option>
                        <option value="4">待上级评估</option>
                        <option value="5">待验证</option>
                        <option value="6">已完成</option>
                        <option value="7">已拒绝</option>
                        <option value="8">已作废</option>
                        <option value="9">待本院评估</option>
                        <option value="15">评估不通过</option>
                        <option value="16">验证不通过</option>
                    </select>
                </div>

                <div class="col-md-1">
                    <button type="button" class="btn btn-info rounded" v-on:click="query(1)"><i class="fa fa-search"
                                                                                                style="color: #fff"></i>
                        查询
                    </button>
                </div>


            </div>
            <div class="card mx-3">
                <div class="layer-loading" v-show="loading"><i></i><i></i><i></i></div>
                <table class="table table-advanced table-hover treetable" ref="treetable">
                    <thead>
                    <tr>
                        <th @click="sort('patientHospno')">病历号<i
                                :class="{fa:true,'fa-arrow-up':sortType=='asc'&&sortField=='patientHospno','fa-arrow-down':sortType=='desc'&&sortField=='patientHospno'}"></i>
                        </th>
                        <th @click="sort('patientName')">姓名<i
                                :class="{fa:true,'fa-arrow-up':sortType=='asc'&&sortField=='patientName','fa-arrow-down':sortType=='desc'&&sortField=='patientName'}"></i>
                        </th>
                        <th @click="sort('departmentName')">所在医院<i
                                :class="{fa:true,'fa-arrow-up':sortType=='asc'&&sortField=='departmentName','fa-arrow-down':sortType=='desc'&&sortField=='departmentName'}"></i>
                        </th>
                        <th @click="sort('doctor')">主治医生<i
                                :class="{fa:true,'fa-arrow-up':sortType=='asc'&&sortField=='doctor','fa-arrow-down':sortType=='desc'&&sortField=='doctor'}"></i>
                        </th>
                        <th @click="sort('createTime')">靶区时间<i
                                :class="{fa:true,'fa-arrow-up':sortType=='asc'&&sortField=='createTime','fa-arrow-down':sortType=='desc'&&sortField=='createTime'}"></i>
                        </th>
                        <th @click="sort('approveTime')">完成时间<i
                                :class="{fa:true,'fa-arrow-up':sortType=='asc'&&sortField=='approveTime','fa-arrow-down':sortType=='desc'&&sortField=='approveTime'}"></i>
                        </th>
                        <th @click="sort('t.status')">当前状态<i
                                :class="{fa:true,'fa-arrow-up':sortType=='asc'&&sortField=='t.status','fa-arrow-down':sortType=='desc'&&sortField=='t.status'}"></i>
                        </th>
                        <th class="text-xs-center">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, index) in page.items" :key="item.id">
                        <td>{{item.patientHospno | to-short }}</td>
                        <td>
                            <span v-show="item.patientName != null && item.patientName != '' ">{{item.patientName | to-short}}</span>
                            <span v-show="item.patientName == null || item.patientName == '' ">{{item.patientEngName | to-short}}</span>

                        </td>
                        <td>{{item.departmentName}}</td>
                        <td>{{item.doctor | to-short}}</td>
                        <td>{{item.createTime | time-date}}</td>
                        <td>{{item.verifyTime | time-date}}</td>
                        <td>
                            <span v-show="item.status==0">新增</span>
                            <span v-show="item.status==1">已保存</span>
                            <span v-show="item.status==2 && item.physicsId == current">
                待接收
              </span>
                            <span v-show="item.status==2 && item.physicsId != current">
                已提交
              </span>
                            <span v-show="item.status==3">已接收 </span>
                            <span v-show="item.status==4">待上级评估</span>
                            <span v-show="item.status==5">待验证</span>
                            <span v-show="item.status==6">已完成</span>
                            <span v-show="item.status==7">已拒绝</span>
                            <span v-show="item.status==8">已作废</span>
                            <span v-show="item.status==9">待本院评估</span>

                            <span v-show="item.status==15">评估不通过</span>
                            <span v-show="item.status==16">验证不通过</span>
                        </td>
                        <td class="text-xs-center">
                            <router-link :to="'/planning/detail/' + item.id+'?suid='+item.suid+'&nowImageId='+item.imageId">
                                <i class="fa fa fa-pencil"></i>
                                <span v-if="item.status == 6">查看</span>
                                <span v-if="item.status != 6">申请</span>
                            </router-link>

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
    import {Planning, User} from '../../resources'
    import {showResponse} from '../../misc/utils'
    import Pagination from '../../widgets/pagination.vue'
    import {debounce} from '../../misc/utils'
    import QueryMenu from './query-menu.vue'
    import paginations from '../../widgets/paginations.vue'

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
            status: '99',
            current: User.current().id,
            pageNumChange: 0
        }),
        beforeRouteEnter(to, from, next) {
            Planning.query().then(response => {
                next(vm => {
                    vm.page = response.data;
                    console.log('vm.page---------',vm.page)
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
                Planning.query({
                    keyword: this.keyword,
                    status: this.status,
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
            },
            copy(id) {
                Planning.copy(id).then(response => {
                    showResponse(response)
                })
            }
        },
        components: {QueryMenu, Pagination, 'v-pagination': paginations}

    }
</script>
