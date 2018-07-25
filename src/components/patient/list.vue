<template>
  <div>
    <ol class="breadcrumb">
      <li class="breadcrumb-item">        <router-link to="/">首页</router-link>      </li>
      <li class="breadcrumb-item active">病人管理</li>
    </ol>
    <div class="row" style="margin-left: 2px;margin-bottom: 12px">
      <div class="col-md-3 input-group">
        <input  name="keyword" v-model.trim="keyword" class="form-control" placeholder="输入病历号或姓名查询">
      </div>
      <!--<div class="col-md-2">-->
        <!--<select class="form-control" id="status"  v-model="status"   v-on:change="query(1)">-->
          <!--<option value="0" selected>启用</option>-->
          <!--<option value="1">已删除病人</option>-->
        <!--</select>-->
      <!--</div>-->
      <div class="col-md-1">
        <button type="button" class="btn btn-info rounded" v-on:click="query(1)"><i class="fa fa-search" style="color: #fff"></i> 查询</button>
      </div>
    </div>
    <div class="card mx-3 logCardBackground">
      <div class="layer-loading" v-show="loading"><i></i><i></i><i></i></div>

      <table class="table table-advanced table-hover">
        <thead>
        <tr>
          <th @click="sort('hospno')">病历号<i :class="{fa:true,'fa-arrow-up':sortType=='asc'&&sortField=='hospno','fa-arrow-down':sortType=='desc'&&sortField=='hospno'}"></i></th>
          <th @click="sort('name')">姓名<i :class="{fa:true,'fa-arrow-up':sortType=='asc'&&sortField=='name','fa-arrow-down':sortType=='desc'&&sortField=='name'}"></i></th>
          <th class="hidden-sm-down" @click="sort('departmentName')">医院<i :class="{fa:true,'fa-arrow-up':sortType=='asc'&&sortField=='departmentName','fa-arrow-down':sortType=='desc'&&sortField=='departmentName'}"></i></th>
          <th class="hidden-md-down" @click="sort('sex')">性别<i :class="{fa:true,'fa-arrow-up':sortType=='asc'&&sortField=='sex','fa-arrow-down':sortType=='desc'&&sortField=='sex'}"></i></th>
          <th class="hidden-md-down">电话</th>
          <th class="hidden-md-down">图像</th>
          <th @click="sort('createTime')">创建时间<i :class="{fa:true,'fa-arrow-up':sortType=='asc'&&sortField=='createTime','fa-arrow-down':sortType=='desc'&&sortField=='createTime'}"></i></th>
          <!--<th class="hidden-md-down" @click="sort('p.status')">状态<i :class="{fa:true,'fa-arrow-up':sortType=='asc'&&sortField=='p.status','fa-arrow-down':sortType=='desc'&&sortField=='p.status'}"></i></th>-->
          <th class="text-xs-center">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in page.items" :key="item.id">
          <td>{{item.hospno | to-short}}</td>
          <td class="sm-down">
            <span v-show="item.name != null && item.name != '' ">{{item.name | to-short}}</span>
            <span v-show="item.name == null || item.name == '' ">{{item.engname | to-short}}</span>
          </td>
          <td class="hidden-sm-down">{{item.departmentName}}</td>
          <td class="hidden-sm-down">
            {{item.sex}}
          </td>
          <td class="hidden-sm-down">{{item.phone}}</td>
          <td class="hidden-sm-down">
            <span v-if="item.isLoading==0">{{item.currentImage}}/{{item.totalImage}}</span>
            <span v-else-if="item.isLoading==1 && item.currentImage!=undefined && item.totalImage!=undefined"><i class="fa fa-spinner" aria-hidden="true"></i>{{item.currentImage}}/{{item.totalImage}}</span>
            <span v-else-if="item.totalImage==undefined || item.currentImage==undefined"></span>
          </td>
          <td class="hidden-sm-down">{{ item.createTime }}</td>
          <!--<td class="hidden-lg-down">-->
            <!--<span v-show="item.status==0">启用</span>-->
            <!--<span v-show="item.status==1">已删除</span>-->
          <!--</td>-->
          <td class="text-xs-center">
            <router-link :to="'/patient/' + item.id"><i class="fa fa-address-card-o"></i>编辑信息</router-link>&nbsp;
            <router-link :to="'/patient/medical/' + item.id"><i class="fa fa-address-card"></i>上传病历</router-link>
          </td>
        </tr>
        </tbody>

      </table>
      <v-pagination :pageNumChange.sync="pageNumChange" :cur.sync="cur" :all.sync="all" :count.sync="count" :curIndex_s.sync="curIndex_s"  @listen="paging"></v-pagination>
    </div>
  </div>
</template>
<script>
    import {del, pause} from '../../misc/utils'
    import {Patient, Image} from '../../resources'
    import swal from 'sweetalert'
    import Pagination from '../../widgets/pagination.vue'
    import {debounce} from '../../misc/utils'
    import paginations from '../../widgets/paginations.vue'

    var page_backup = null  // 初始化分页数据备份

    export default {
        data: () => ({
            sortField:null,
            sortType:null,
            loading: 0,
            keyword: '',
            status:0,
            page:{},
            cur: 1,
            all: 1,
            curIndex_s: 1,
            count:0,
            pageNumChange:0
        }),
        beforeRouteEnter(to, from, next) {
            Patient.findall().then(response => {
                next(vm => {
                    console.log('data==================',response.data)
                    vm.page = response.data;
                    vm.all = parseInt(vm.page.totalCount % vm.page.pageSize == 0 ? vm.page.totalCount / vm.page.pageSize : vm.page.totalCount / vm.page.pageSize + 1);
                    vm.count = vm.page.totalCount;

//                    page_backup = response.data
                    vm.$nextTick(() => vm.$store.state.isLoading = false);
                })
            })
        },
      beforeRouteUpdate(to, from, next) {
        this.$emit('loaded')
        vm.cur = 1;
        this.paging(1, next)
       },
        mounted(){
//            var that=this;
//            setInterval(function () {
//                that.paging(that.curIndex_s);
//            },3000)
        },
        methods: {
            paging (pn, cb) {  // 分页查询
                this.loading = 1
                Patient.findall({keyword: this.keyword, status:this.status, pn: pn || 1, sort:(this.sortField!=undefined&&this.sortField!=null&&this.sortField!='')?(this.sortField+' '+this.sortType):''}).then(response => {
//                    console.log(response.data);
                    this.page = response.data
                    this.all = parseInt(this.page.totalCount % this.page.pageSize == 0 ? this.page.totalCount / this.page.pageSize : this.page.totalCount / this.page.pageSize + 1)
                    this.count = this.page.totalCount
                    this.loading = 0
                    cb && cb()
                })
            },
            paging_delayed: debounce(function () { this.paging(1) }, 400),
            toggle(e) {
                var $this = $(e.target)
                $this.addClass('active').siblings().removeClass('active')
                this.$treetable[e.target.title]()
            },
            edit (id) {
                this.$router.push('/patient/' + id)
            },
            showImages(item) {
                Image.patientImages({hospno: item.hospno}).then(res => {
                    let imageIds = res.data;
                    //暂时默认一个病人只有一个影像文件，一对多待添加
                    if (imageIds.length > 0) {
                        let imageId = imageIds[0];
                        return this.$router.push('/image/detail/' + imageId)
                    } else {
                        swal('该病人没有影像!', '没有影像文件', 'error')
                    }
                })
            },
            remove (id, index) {
                pause(this, Patient, id, this.page.items, index,'停用')
            },
            renew(id,index){
                pause(this, Patient, id, this.page.items, index,'激活')
            },
            sort(field){
                this.sortField=field;
                this.sortType=this.sortType=='asc'?'desc':'asc';
                this.paging(1);
            },
            query(id){
                this.cur = 1

                this.loading = 1
                this.curIndex_s=id
                this.paging(1)
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
<style>
  i.fa-spinner{
    animation:autoRoate 2s linear 0s infinite;
  }
  @keyframes autoRoate {
     from {
        transform: rotate(0deg);
     }
    to {
       transform:rotate(360deg);
    }
  }
</style>
