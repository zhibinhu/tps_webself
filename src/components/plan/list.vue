<template>
  <div>
    <ol class="breadcrumb">
      <li class="breadcrumb-item">        <router-link to="/">首页</router-link>      </li>
      <li class="breadcrumb-item">
        <router-link to="/plan">计划管理</router-link>
      </li>
      <li class="breadcrumb-item active">计划列表</li>
    </ol>
    <div class="row" style="margin-left: 2px;margin-bottom: 12px">
      <div class="col-md-3 input-group">
        <input  name="keyword" v-model.trim="keyword" class="form-control" placeholder="输入查询内容">
      </div>
      <div class="col-md-1">
        <button type="button" class="btn btn-info rounded" v-on:click="query(1)"><i class="fa fa-search" style="color: #fff"></i> 查询</button>
      </div>
    </div>
    <div class="card mx-3">
      <div class="layer-loading" v-show="loading"><i></i><i></i><i></i></div>


      <table class="table table-advanced table-hover treetable" ref="treetable">
        <thead>
        <tr>
          <!--<th class="hidden-md-down">所在医院</th> -->
          <th >所在医院</th>
          <th >姓名</th>
          <th >病历号</th>
          <!--<th >SUID</th>-->
          <th >上传时间</th>
          <th >状态</th>
          <th >操作</th>
        </tr>
        </thead>
        <tbody>
        <tr :id="item.id" v-for="(item, index) in page.items" :key="item.id">
          <td class="hidden-sm-down">{{item.departmentName| to-short}}</td>
          <td class="hidden-sm-down">{{item.patientName | to-short}}</td>
          <td class="hidden-sm-down">{{item.hospno | to-short}}</td>
          <!--<td class="hidden-sm-down">{{item.suid | to-short}}</td>-->
          <td class="hidden-sm-down">{{item.createTime | time-date}}</td>
          <td class="hidden-sm-down">
            <span v-show="item.schedule==0">新增</span>
            <span v-show="item.schedule==1">正在上传计划文件/已上传{{item.fileNums}}个</span>
            <span v-show="item.schedule==2">计划文件上传完成</span>
            <span v-show="item.schedule==3">正在生成勾画数据</span>
            <span v-show="item.schedule==4">勾画数据生成完毕</span>
            <span v-show="item.schedule==5">正在生成剂量数据</span>
            <span v-show="item.schedule==6">剂量数据生成完毕</span>
            <span v-show="item.schedule==7">正在生成剂量体积数据</span>
            <span v-show="item.schedule==8">剂量体积数据生成完毕</span>
            <span v-show="item.schedule==9">解析异常</span>
          </td>
          <td class="text-xs-center">
            <router-link :to="'/plan/detail/' + item.id"><i class="fa fa-eye"></i>查看</router-link>
            <!--<a class="text-info" @click="downloadplan(item.id)"><i class="fa fa-eye"></i>查看</a>-->
          </td>
        </tr>
        </tbody>

      </table>
      <v-pagination :pageNumChange.sync="pageNumChange" :cur.sync="cur" :all.sync="all" :count.sync="count" :curIndex_s.sync="curIndex_s" @listen="paging"></v-pagination>
    </div>
  </div>
</template>
<script>
    import {del, treeify} from '../../misc/utils'
    import {Plan,Image} from '../../resources'
    import storage from 'localStorage'
    import swal from 'sweetalert'
    import Pagination from '../../widgets/pagination.vue'
    import {debounce} from '../../misc/utils'
    import paginations from '../../widgets/paginations.vue'

    var page_backup = null  // 初始化分页数据备份

    export default {
        data: () => ({
            loading: 0,
            keyword: '',
            page:{},
            cur: 1,
            all: 1,
            curIndex_s: 1,
            count:0,
            pageNumChange:0,
            flags:null,
            pagedatas:{}
        }),
        beforeRouteEnter(to, from, next) {
            Plan.query().then(response => {
                next(vm => {
                    vm.page = response.data
                    vm.all = parseInt(vm.page.totalCount % vm.page.pageSize == 0 ? vm.page.totalCount / vm.page.pageSize : vm.page.totalCount / vm.page.pageSize + 1)
                    vm.count = vm.page.totalCount
                    vm.pagedatas= response.data.items
                    vm.$nextTick(() => vm.$store.state.isLoading = false)
                })
            })
        },
        beforeRouteUpdate(to, from, next) {
            this.$store.state.isLoading = false
            this.paging(1, next)
        },
        created(){
            this.initSetTimeout(1)
        },
        methods: {
            getData(){
                var pagedatas=this.pagedatas
                if(pagedatas!=null){
                    var  planIds='';
                    var  planId='';
                    for (var i=0;i<pagedatas.length ;i++){
                        planId=pagedatas[i].id+'';
                        var planSchedule= pagedatas[i].schedule;
                        if(planSchedule != 6 && planSchedule != 7){
                            planIds=planIds+planId+'-';
                        }
                    }
                    if(planIds != ""){
                        planIds=planIds.substring(0,planIds.length-1)
                    }

                    if(planIds !=null && planIds !='') {
                        this.timeRequest(planIds);
                    }else {
                        clearInterval(this.flags);
                    }
                }

            },
            initSetTimeout(flag) {//每隔10秒刷新数据，也就是每隔10秒向后台请求一次数据
                if(flag==1){
                    this.flags= setInterval(() => {//es6中这个this指向的是这些方法，若setInterval(function(){ this.getData(today)})中的this指向的真个windows，这样写是会报错的，所以最好用es6来调用getData里的方法
                        this.getData()
                    }, 2000)
                }else {
                    clearInterval(this.flags);
                }
            },
            timeRequest(planIds){
                if(planIds !=null && planIds !='') {
                    Plan.getFileNums({PlanIds: planIds}).then(result => {
                        var planSchedules = -1;
                        var planDatas = result.data
                        var planIds = '';
                        var planId = -1;
                        if(planDatas!=null) {
                            for (var i = 0; i < planDatas.length; i++) {
                                planId = planDatas[i].id
                                var planSchedule = planDatas[i].schedule;
                                if (planSchedule != 8 && planSchedule != 9) {
                                    planIds = planIds + planId + '-';
                                } else {
                                    clearInterval(this.flags);
                                }
                                var spanStatus = '';
                                if (planSchedule == 0) {
                                    spanStatus = '<span >新增</span>';
                                }
                                if (planSchedule == 1) {
                                    spanStatus = '<span>正在上传计划文件/已上传' + planDatas[i].fileNums + '个</span>';
                                    planSchedules = planSchedule;
                                }
                                if (planSchedule == 2) {
                                    spanStatus = '<span>计划文件上传完成</span>';
                                    planSchedules = planSchedule;
                                }
                                if (planSchedule == 3) {
                                    spanStatus = ' <span >正在生成勾画数据</span>';
                                    planSchedules = planSchedule;
                                }
                                if (planSchedule == 4) {
                                    spanStatus = ' <span >勾画数据生成完毕</span>';
                                    planSchedules = planSchedule;
                                }
                                if (planSchedule == 5) {
                                    spanStatus = '  <span >正在生成剂量数据</span>';
                                    planSchedules = planSchedule;
                                }
                                if (planSchedule == 6) {
                                    spanStatus = '  <span >剂量数据生成完毕</span>';
                                    planSchedules = planSchedule;
                                }
                                if (planSchedule == 7) {
                                    spanStatus = '  <span >正在生成剂量体积数据</span>';
                                    planSchedules = planSchedule;
                                }
                                if (planSchedule == 8) {
                                    spanStatus = '  <span >剂量体积数据生成完毕</span>';
                                }
                                if (planSchedule == 9) {
                                    spanStatus = '  <span >解析异常</span>';
                                }
                                var data = '<td class="hidden-sm-down">' + planDatas[i].departmentName + '</td>' +
                                    '<td class="hidden-sm-down">' + planDatas[i].patientName + '</td>' +
                                    '<td class="hidden-sm-down">' + planDatas[i].hospno + '</td>' +
                                    '<td class="hidden-sm-down">' + planDatas[i].createTime + '</td>' +
                                    '<td class="hidden-sm-down">' + spanStatus + '</td>' +
                                    '<td><a href="#/plan/detail/' + planId + '" class=""><i class="fa fa-eye"></i>查看</a> </td>';
                                $("#" + planId).html(data);

                            }

                            if (planIds != "") {
                                planIds = planIds.substring(0, planIds.length - 1)
                            } else {
                                clearInterval(this.flags);
                            }
                            this.timeRequest(planIds);

                        }else {
                            clearInterval(this.flags);

                        }
                    })
                }else {
                    clearInterval(this.flags);
                }
            },
            paging (pn, cb) {  // 分页查询
                this.loading = 1
                Plan.query({keyword: this.keyword,  pn: pn || 1}).then(response => {
                    this.page = response.data
                    this.all = parseInt(this.page.totalCount % this.page.pageSize == 0 ? this.page.totalCount / this.page.pageSize : this.page.totalCount / this.page.pageSize + 1)
                    this.count = this.page.totalCount
                    this.loading = 0
                    cb && cb()
                })
            },
            paging_delayed: debounce(function () { this.paging(1) }, 400),
//            downloadplan(id) {
//
//                Image.downloadplan(id).then(response => {
//                    window.open(response.data.path);
//                })
//            },
            query(id){
                this.loading = 1
                this.curIndex_s=id
                this.paging(1);
                this.pageNumChange++;

            }
        },
//        watch: {
//            keyword(v){
//                if (!v &&  page_backup) { // 已经备份过原始数据, 直接使用跳过查询
//                    return this.page = page_backup
//                }
//
//                this.loading = 1
//                this.paging_delayed()
//            }
//        },
        components: {Pagination,'v-pagination': paginations}
    }
</script>
