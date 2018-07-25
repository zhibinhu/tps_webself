<template>
    <div>
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <router-link to="/">首页</router-link>
            </li>
            <li class="breadcrumb-item">
                <router-link to="/target">靶区勾画</router-link>
            </li>
            <li class="breadcrumb-item active">靶区勾画列表</li>
        </ol>

        <div class="card p-3 mb-3">
            <div class="row" style="margin-left: 2px;margin-bottom: 12px">
                <div class="col-md-3 input-group">
                    <input name="keyword" v-model.trim="keyword" class="form-control" placeholder="请输入病历号或者姓名">
                </div>

                <div class="col-md-2">
                    <select class="form-control" id="status" v-model="status" v-on:change="query(1)">
                        <option value="99" selected="selected">所有</option>
                        <option value="0">新增</option>
                        <option value="1">已保存</option>
                        <option value="2">已提交</option>
                        <option value="3">已接收</option>
                        <option value="4">已拒绝</option>
                        <option value="5">待审核</option>
                        <option value="6">审核不通过</option>
                        <option value="7">已完成</option>
                        <!--<option value="4">已完成</option>-->
                        <!--<option value="5">已拒绝</option>-->
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
                        <th @click="sort('createTime')">CT时间<i
                                :class="{fa:true,'fa-arrow-up':sortType=='asc'&&sortField=='createTime','fa-arrow-down':sortType=='desc'&&sortField=='createTime'}"></i>
                        </th>
                        <th @click="sort('finishTime')">完成时间<i
                                :class="{fa:true,'fa-arrow-up':sortType=='asc'&&sortField=='finishTime','fa-arrow-down':sortType=='desc'&&sortField=='finishTime'}"></i>
                        </th>
                        <th @click="sort('t.status')">当前状态<i
                                :class="{fa:true,'fa-arrow-up':sortType=='asc'&&sortField=='t.status','fa-arrow-down':sortType=='desc'&&sortField=='t.status'}"></i>
                        </th>
                        <th class="text-xs-center">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, index) in page.items" :key="item.id">
                        <!--<td class="hidden-lg-down">{{item.patientHospno | to-short}}</td>-->
                        <td>{{item.patientHospno | to-short}}</td>
                        <td>
                            <span v-show="item.patientName != null && item.patientName != '' ">{{item.patientName | to-short}}</span>
                            <span v-show="item.patientName == null || item.patientName == '' ">{{item.patientEngName | to-short}}</span>

                        </td>
                        <td>{{item.departmentName}}</td>
                        <td>{{item.doctor | to-short}}</td>
                        <td>{{item.createTime | time-date}}</td>
                        <td>{{item.finishTime | time-date}}</td>
                        <td>
                            <span v-show="item.status==0">新增</span>
                            <span v-show="item.status==1">已保存</span>
                            <span v-show="item.status==2 && item.applyDocid == current">待接收</span>
                            <span v-show="item.status==2 && item.applyDocid != current">已提交</span>
                            <span v-show="item.status==3">已接收</span>
                            <span v-show="item.status==4">已拒绝</span>
                            <span v-show="item.status==5">待审核</span>
                            <span v-show="item.status==6">审核不通过</span>
                            <span v-show="item.status==7">已完成</span>
                            <!--<span v-show="item.status==4">已完成</span>-->
                            <!--<span v-show="item.status==5">已拒绝</span>-->
                        </td>
                        <td colspan="3" class="text-xs-center">
              <span v-on:mouseenter="enter" @mouseleave="leave">
                  <router-link :to="'/target/detail/' + item.id+'?suid='+item.suid" title="进展详情">
                      <i class="fa fa-pencil"></i>
                      <span v-if="item.status == 7">查看</span>
                      <span v-if="item.status != 7">申请</span>
                  </router-link>

              </span>
                            <!--<span>-->
              <!--<span><a class="text-danger" @click="copy(item.id, index)"><i class="fa fa-check"></i>复制</a></span>-->
              <!--</span>-->
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
    import {Target, User} from '../../resources'
    import swal from 'sweetalert'
    import Pagination from '../../widgets/pagination.vue'
    import {debounce} from '../../misc/utils'
    import paginations from '../../widgets/paginations.vue'


    export default {
        data: () => ({
            seen: false,
            sortField: null,
            sortType: null,
            loading: 0,
            loadingflag: 0,
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
            Target.query().then(response => {
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
            vm.cur = 1;
            this.paging(1, next)
        },
        methods: {
            enter() {
                this.seen = true;
            },
            leave() {
                this.seen = false;
            },
            paging(pn, cb) {  // 分页查询
                this.loading = 1;
                Target.query({
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
            edit(id) {
                this.$router.push('/target/' + id)
            },
            finish(id, index) {
                swal({
                    type: 'warning',
                    title: '您确定已经完成么?',
                    text: '',
                    showCancelButton: true,
                    cancelButtonText: '关闭',
                    confirmButtonText: '是的, 我确认已完成!',
                    confirmButtonColor: '#DD6B55',
                    showLoaderOnConfirm: true,
                    closeOnConfirm: false
                }, confirmed => {
                    if (confirmed) {
                        this.loading = 1;
                        Target.status(id, "finish").then(response => {
                            if (response.data.success) {
                                swal('已完成!', '该靶区已完成.', 'success')
                            }

                            this.loading = 0;
                            this.paging_delayed()

                        }, response => {
                            swal('操作失败', response.data.msg, 'error');
                            this.loading = 0
                        }).catch(error => {
                            swal('操作失败', error, 'error');
                            this.loading = 0
                        })
                    }
                })
            },

            copy(id, index) {
                swal({
                    type: 'warning',
                    title: '您确定复制该条靶区么?',
                    text: '',
                    showCancelButton: true,
                    cancelButtonText: '关闭',
                    confirmButtonText: '是的, 我确认!',
                    confirmButtonColor: '#DD6B55',
                    showLoaderOnConfirm: true,
                    closeOnConfirm: false
                }, confirmed => {
                    if (confirmed) {
                        this.loading = 1;
                        Target.copy(id).then(response => {
                            if (response.data.success) {
                                swal('已复制!', '该靶区已复制.', 'success')
                            }

                            this.loading = 0;
                            this.paging_delayed()

                        }, response => {
                            swal('操作失败', response.data.msg, 'error');
                            this.loading = 0
                        }).catch(error => {
                            swal('操作失败', error, 'error');
                            this.loading = 0
                        })
                    }
                })
            },


            sort(field) {
                this.sortField = field;
                this.sortType = this.sortType == 'asc' ? 'desc' : 'asc';
                this.paging(1);
            },
            query(id) {
                this.loading = 1;
                this.cur = 1;
                this.curIndex_s = id;
                this.paging(1);
                this.pageNumChange++;

                var checkedYeMa = document.getElementById("activedYeMa");
                var checkedYeMaValue = checkedYeMa.getAttribute("value");
                if (checkedYeMaValue > 0) {
                    $(".active").removeClass("active");
                    let frontYeMas = document.getElementById("frontYeMa");
                    frontYeMas.setAttribute("class", "page-button-disabled");
                    let yemaId = document.getElementById("yema1");
                    yemaId.setAttribute("class", "active");
                }
                if (this.count >= 2) {
                    let yemaId = document.getElementById("yema1");
                    yemaId.setAttribute("class", "active")
                }
            }
        },
        components: {Pagination, 'v-pagination': paginations}
    }
</script>
