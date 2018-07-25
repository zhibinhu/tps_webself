<template>
    <div>
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <router-link to="/">首页</router-link>
            </li>
            <li class="breadcrumb-item active">报表管理</li>
            <li class="breadcrumb-item active">报表-列表</li>
        </ol>
        <div class="row" style="margin-left: 15px;margin-bottom: 12px">
            <label style="width:75px;">申请医院:</label>
            <div class="col-md-3">
                <input class="form-control" id="departmentName" placeholder="请选择" readonly>
                <jstree attach="#departmentName" :treenodes="treenodes" dropdown="down" multiple
                        v-model="data"></jstree>
            </div>
        </div>
        <div class="row" style="margin-left: 15px;margin-bottom: 12px">
            <label style="width:75px;">完成日期:</label>
            <div class="col-md-3">
                <input type="date" name="date" class="form-control" v-model="startDate"/>
            </div>
            <span style="height:40px;line-height:40px;">---</span>
            <div class="col-md-3">
                <input type="date" name="date" class="form-control" v-model="endDate"/>
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
                    <th v-show="isLower === 0" @click="sort('appDepartmentName')">申请医院<i
                            :class="{fa:true,'fa-arrow-up':sortType=='asc'&&sortField=='appDepartmentName','fa-arrow-down':sortType=='desc'&&sortField=='appDepartmentName'}"></i></th>
                    <th  @click="sort('applyName')">申请医生<i
                            :class="{fa:true,'fa-arrow-up':sortType=='asc'&&sortField=='applyName','fa-arrow-down':sortType=='desc'&&sortField=='applyName'}"></i></th>
                    <th  @click="sort('applyTime')">申请时间<i
                            :class="{fa:true,'fa-arrow-up':sortType=='asc'&&sortField=='applyTime','fa-arrow-down':sortType=='desc'&&sortField=='applyTime'}"></i></th>
                    <th  @click="sort('doctor')">完成医生<i
                            :class="{fa:true,'fa-arrow-up':sortType=='asc'&&sortField=='doctor','fa-arrow-down':sortType=='desc'&&sortField=='doctor'}"></i></th>
                    <th  @click="sort('finishedTime')">完成时间<i
                            :class="{fa:true,'fa-arrow-up':sortType=='asc'&&sortField=='finishedTime','fa-arrow-down':sortType=='desc'&&sortField=='finishedTime'}"></i></th>
                    <th  @click="sort('patientName')">患者姓名<i
                            :class="{fa:true,'fa-arrow-up':sortType=='asc'&&sortField=='patientName','fa-arrow-down':sortType=='desc'&&sortField=='patientName'}"></i></th>
                    <th  @click="sort('patientHospno')">病历号<i
                            :class="{fa:true,'fa-arrow-up':sortType=='asc'&&sortField=='patientHospno','fa-arrow-down':sortType=='desc'&&sortField=='patientHospno'}"></i></th>
                </tr>
                </thead>
                <tbody>
                <span v-show="is_show === 1" style="margin-left: 50px">没有数据</span>
                <tr v-for="(item, index) in hosUpList.list" :key="item.id">
                    <td class="hidden-sm-down" v-show="isLower === 0">{{item.appDepartmentName}}</td>
                    <td class="hidden-sm-down">{{item.applyName}}</td>
                    <td class="hidden-sm-down">{{item.applyTime}}</td>
                    <td class="hidden-sm-down">{{item.doctor}}</td>
                    <td class="hidden-sm-down">{{item.finishedTime}}</td>
                    <td class="hidden-sm-down">{{item.patientName}}</td>
                    <td class="hidden-lg-down">{{item.patientHospno}}</td>
                </tr>
                </tbody>
            </table>
            <!--分页-->
            <v-pagination :pageNumChange.sync="pageNumChange" :cur.sync="cur" :all.sync="all" :count.sync="count"
                          :curIndex_s.sync="curIndex_s"
                          @listen="paging"></v-pagination>
        </div>
    </div>
    <!--</div>-->
</template>
<script>
    import {
        del,
        treeify
    } from '../../misc/utils'
    import {
        Department,
        Docgroup,
        User,
        Log,
        Fills
    } from '../../resources'
    import swal from 'sweetalert'
    import Pagination from '../../widgets/pagination.vue'
    import paginations from '../../widgets/paginations.vue'
    import jstree from '../../widgets/jstree.vue'
    import {
        debounce
    } from '../../misc/utils'

    var page_backup = null; // 初始化分页数据备份

    export default {
        data () {
          return {
            loading: 0,
            keyword: '',
            startDate: '',
            endDate: '',
            cur: 1,
            all: 1,
            curIndex_s: 1,
            count: 0,
            is_show: 0,
            treenodes: [],
            //table列表数据
            hosUpList: {},
            data: [],
            hosName: '',
            isLower: 0,
            pageNumChange: 0,
            sortField:null,
            sortType:null
          }
        },
        beforeRouteEnter(to, from, next) {
            // 报表-列表
            Fills.getHosList({
                userId: User.current().id
            }).then((res) => {
                next(vm => {
                    vm.hosUpList = res.data.data;
                    console.log('list--------',vm.hosUpList)
                    vm.isLower = vm.hosUpList.isLower;
                    if (res.data.data.list != null && res.data.data.list != '') {
                        vm.all = parseInt(vm.hosUpList.totalCount % vm.hosUpList.pageSize == 0 ? vm.hosUpList.totalCount / vm.hosUpList.pageSize : vm.hosUpList.totalCount / vm.hosUpList.pageSize + 1)
                        vm.count = vm.hosUpList.totalCount;
                        vm.is_show = 0
                    } else {
                        vm.all = 0;
                        vm.count = 0;
                        vm.is_show = 1
                    }

                    vm.$nextTick(() => vm.$store.state.isLoading = false)

                })
            })

        },
        beforeRouteUpdate(to, from, next) {
            this.$store.state.isLoading = false
            this.paging(1, next)
        },
        created: function () {
            //获取下级医院名称
            this.getHosNames()
        },
        mounted() {
          this.$store.state.isLoading = false
        },
        methods: {
            queryData() {
                this._getHosList();
                this.pageNumChange++;
            },
            // 报表-列表
            _getHosList() {

                let userId = User.current().id
                var arrId=[];
                if(this.data.length>0 && (this.data instanceof Array)){
                    console.log('thisdata-----------',this.data);
                    this.data=this.data.join(',');
                }else if(this.data.length>0 && !(this.data instanceof Array)){
                    this.data=this.data;
                }else if(this.data.length==0){
                    this.data='';
                };
                console.log('data===',this.data);
                Fills.getHosList({
                    userId: userId,
                    applyHospitals: this.data,
                    startDate: this.startDate,
                    endDate: this.endDate,
                    sort: (this.sortField != undefined && this.sortField != null && this.sortField != '') ? (this.sortField + ' ' + this.sortType) : ''
                }).then((res) => {
                    this.hosUpList = res.data.data;
                    if (res.data.data != null && res.data.data != '') {
                        this.all = parseInt(this.hosUpList.totalCount % this.hosUpList.pageSize == 0 ? this.hosUpList.totalCount / this.hosUpList.pageSize : this.hosUpList.totalCount / this.hosUpList.pageSize + 1);
                        this.count = this.hosUpList.totalCount;
                        this.is_show = 0;
                    } else {
                        this.all = 0;
                        this.count = 0;
                        this.is_show = 1
                    }
                })
            },
            sort(field) {
                this.sortField = field;
                this.sortType = this.sortType == 'asc' ? 'desc' : 'asc';
                this.paging(1);
            },
            // 获取申请医院列表
            getHosNames() {
                let userId = User.current().id;
                Fills.getNames({userId: userId}).then((res) => {
                    console.log(JSON.stringify(res, null, 4));
                    this.treenodes = res.data.data
                })
            },
            paging(pn, cb) { // 分页查询
                this.loading = 1;
                let userId = User.current().id;
                Fills.getHosList({
                    userId: userId,
                    pageNumber: pn || 1,
                    startDate: this.startDate,
                    endDate: this.endDate,
                    applyHospitals: this.data,
                    sort: (this.sortField != undefined && this.sortField != null && this.sortField != '') ? (this.sortField + ' ' + this.sortType) : ''
                }).then(res => {
                    this.hosUpList = res.data.data
                    if (res.data.data != null && res.data.data != '') {
                        this.all = parseInt(this.hosUpList.totalCount % this.hosUpList.pageSize == 0 ? this.hosUpList.totalCount / this.hosUpList.pageSize : this.hosUpList.totalCount / this.hosUpList.pageSize + 1);
                        this.count = this.hosUpList.totalCount;
                        this.loading = 0
                    } else {
                        this.all = 0;
                        this.count = 0;
                        this.is_show = 1
                    }
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
        components: {Pagination, 'v-pagination': paginations, jstree}
    }
</script>
