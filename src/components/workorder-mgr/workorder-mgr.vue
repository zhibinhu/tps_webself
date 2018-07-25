<style scoped>
</style>
<template>
    <div>
        <ol class="breadcrumb">
            <li class="breadcrumb-item">        <router-link to="/">首页</router-link>      </li>
            <li class="breadcrumb-item active">工单管理</li>
        </ol>
        <div class="card p-3 mb-3" style="min-height: 650px">
            <div class="row" style="margin-left: 2px;margin-bottom: 12px">
                <label style="padding:5px 0;margin:0;"> 问题内容：</label>
                <div class="col-md-3">
                    <input class="form-control" placeholder="输入查询内容" v-model="orderTitle">
                </div>
                <div class="col-md-3">
                    <input  type="date" name="date" class="form-control" v-model="beginTime"/>
                </div>
                <span style="height:40px;line-height:40px;">---</span>
                <div class="col-md-3">
                    <input  type="date" name="date" class="form-control" v-model="endTime" />
                </div>
                <div class="col-md-1">
                    <button type="button" class="btn btn-info rounded" v-on:click="query(1)"><i class="fa fa-search" style="color: #fff"></i> 查询</button>
                </div>
            </div>
            <div class="card mx-3">
                <div class="layer-loading" v-show="loading"><i></i><i></i><i></i></div>
                <table class="table table-advanced table-hover treetable" ref="treetable" v-show="code==0">
                    <thead>
                    <tr>
                        <th>工单编号</th>
                        <th>问题内容</th>
                        <th>问题分类</th>
                        <th>提交时间</th>
                        <th>状态(全部)</th>
                        <!-- <th class="hidden-md-down">管理员电话</th> -->
                        <th class="text-xs-center">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <p>没有记录</p>
                    </tbody>
                </table>
                <table class="table table-advanced table-hover treetable" ref="treetable" v-show="code==1">
                    <thead>
                    <tr>
                        <th>工单编号</th>
                        <th>问题内容</th>
                        <th>问题分类</th>
                        <th>提交时间</th>
                        <th>状态(全部)</th>
                        <!-- <th class="hidden-md-down">管理员电话</th> -->
                        <th class="text-xs-center" style="text-align: center">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, index) in workList.list" :key="item.id">
                        <td><a class="text-link" @click.stop="look(item.id)">{{item.id}}</a></td>
                        <td class="hidden-sm-down">{{item.orderTitle}}</td>
                        <td class="hidden-sm-down" v-if="item.orderType===1">靶区勾画</td>
                        <td class="hidden-sm-down" v-if="item.orderType===2">计划设计</td>
                        <td class="hidden-sm-down" v-if="item.orderType===3">其他</td>
                        <td class="hidden-sm-down">{{item.gmtCreate}}</td>
                        <td class="hidden-sm-down" v-if="item.orderStatus===1">工单已分派</td>
                        <td class="hidden-sm-down" v-if="item.orderStatus===2">待您确认</td>
                        <td class="hidden-sm-down" v-if="item.orderStatus===3">待您反馈</td>
                        <td class="hidden-sm-down" v-if="item.orderStatus===4">待您评价</td>
                        <td class="hidden-sm-down" v-if="item.orderStatus===5">工单已关闭</td>
                        <!-- <td class="hidden-lg-down">{{item.adminPhone}}</td> -->
                        <td class="text-xs-center" style="text-align: center">
                            <router-link :to="'/workorder.view/' + 0+'-'+ item.orderType+'-'+item.id+'-'+item.createUserId+'-'+item.acceptUserId+'-'+item.planTargetId "><i class="fa fa fa-pencil"></i>查看</router-link>
                           <!--<span style="width: auto">|</span>-->
                            <!--<span><a style="color:#0275d8;" @click="reject(item.id)">任务拒绝</a></span>-->
                            <!--<span style="width: auto">|</span>-->
                            <!--<router-link :to="'/workorder.view/' + 0+'-'+ item.orderType+'-'+item.id+'-'+item.createUserId+'-'+item.acceptUserId+'-'+item.planTargetId "><i class="fa fa fa-pencil"></i>重新分配</router-link>-->

                        </td>
                    </tr>
                    </tbody>
                </table>
                <!--分页-->
                <v-pagination :pageNumChange.sync="pageNumChange" :cur.sync="cur" :all.sync="all" :count.sync="count" :curIndex_s.sync="curIndex_s" @listen="paging"></v-pagination>
            </div>
        </div>
    </div>
</template>
<script>
    import {
        Planning,
        Workorder,
        User
    } from '../../resources'
    let storage = localStorage;
    import Pagination from '../../widgets/pagination.vue'
    import paginations from '../../widgets/paginations.vue'
    import {
        debounce
    } from '../../misc/utils'

    var stored = storage.getItem('departmentExpanded') // get stored expanded nodes
    var expanded = stored ? JSON.parse(stored) : {}
    var page_backup = null // 初始化分页数据备份

    export default {
        data: () => ({
            loading: 0,
            workList: {},
            cur: 1,
            all: 1,
            code: 0,
            curIndex_s: 1,
            count:0,
            orderTitle: "",
            beginTime: '',
            endTime: '',
            pageNumChange:0
        }),
        beforeRouteEnter(to, from, next) {
            let userId = User.current().id
            Workorder.workorderList({pageSize: 10,userId:userId}).then(res => {
                next(vm => {
                    vm.code=res.data.code
                    if( res.data.code>0){
                    vm.workList = res.data.data
                    //console.log(JSON.stringify(res,null,4), '==========')
                    vm.all = parseInt(vm.workList.totalCount % vm.workList.pageSize == 0 ? vm.workList.totalCount / vm.workList.pageSize : vm.workList.totalCount / vm.workList.pageSize + 1)
                    vm.count = vm.workList.totalCount

                    }else {
                        vm.all=0
                        vm.count=0
                    }
                    vm.$nextTick(() => vm.$store.state.isLoading = false)
                })
            })

        },
        beforeRouteUpdate(to, from,next) {
            this.$store.state.isLoading = false
            this.paging(1,next)
        },
        methods: {
            paging (pn, cb) {  // 分页查询
                this.loading = 1
                let userId = User.current().id
                Workorder.workorderList({pageSize: 10, userId:userId,beginTime:this.beginTime, endTime:this.endTime,keyWords: this.orderTitle, pageNum: pn || 1}).then(response => {
                    console.log(response.data,"++++++++++++++4444444444++++++++++++++++++++++++")
                    this.code=response.data.code
                    if(response.data.code >0){
                    this.workList = response.data.data
                    this.all = parseInt(this.workList.totalCount % this.workList.pageSize == 0 ? this.workList.totalCount / this.workList.pageSize : this.workList.totalCount / this.workList.pageSize + 1)
                    this.count = this.workList.totalCount
                    this.loading = 0

                    }else {
                        this.all=0
                        this.count = 0
                        this.loading = 0
                    }
                    cb && cb()
                })
            },
            paging_delayed: debounce(function () { this.paging(1) }, 400),
            look(id) {
                this.$router.push('/workorder-mgr-look/' + id)
            },
            query(id) {
                this.curIndex_s=id;
                this.paging(1);
                this.pageNumChange++;
            },
            reject(id){
                swal({
                    title: "任务拒绝原因",
                    text: "输入任务拒绝原因",
                    type: "input",
                    showCancelButton:true,
                    closeOnConfirm:false,
                    confirmButtonText:"确认",
                    cancelButtonText:"取消",
                    animation: "slide-from-top",
                    inputPlaceholder: "输入任务拒绝原因"
                },  inputValue => {
                    if (inputValue === false || inputValue === "") {
                        return false;
                    }else{
//                        this.workList.rejectReason=inputValue
//                        Planning.reject(this.planning).then(response => {
//                            showResponse(response, () => this.$router.back())
//                        })
                    }

                })
            },
        },
        watch: {},
        components: {Pagination,'v-pagination': paginations},
        destroyed() {
            storage.setItem('departmentExpanded', JSON.stringify(expanded))
        }
    }
</script>
