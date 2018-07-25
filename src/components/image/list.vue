<template>
    <div>
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <router-link to="/">首页</router-link>
            </li>
            <li class="breadcrumb-item">
                <router-link to="/image">影像管理</router-link>
            </li>
            <li class="breadcrumb-item active">影像列表</li>
        </ol>
        <div class="row" style="margin-left: 15px;margin-bottom: 12px">
            <label style="width: 70px">拍摄日期:</label>
            <div class="col-md-3">
                <input type="date" v-model="shootingTime" class="form-control" placeholder="拍摄日期" @change="query(1)"/>
            </div>
            <div class="col-md-3 input-group">
                <input name="keyword" v-model.trim="keyword" class="form-control" placeholder="输入查询内容"
                       @keyup.enter="query(1)">
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
                    <!--<th>文件名</th>-->
                    <th class="hidden-md-down">所在医院</th>
                    <th class="hidden-md-down">姓名</th>
                    <th class="hidden-md-down">病历号</th>
                    <!--<th class="hidden-md-down">SUID</th>-->
                    <th class="hidden-md-down">上传时间</th>
                    <!--<th class="text-xs-center">下载</th>-->
                    <th class="text-xs-center">状态</th>
                    <th class="text-xs-center">操作</th>
                </tr>
                </thead>
                <tbody id="imageBody">
                <tr :id="item.id" v-for="(item, index) in page.items" :key="item.id">
                    <!--<td class="hidden-sm-down">{{item.name | to-short}}}</td>-->
                    <td class="hidden-sm-down">{{item.departmentName | to-short}}</td>
                    <td class="hidden-sm-down">{{item.patientName | to-short}}</td>
                    <td class="hidden-sm-down">{{item.hospno | to-short}}</td>
                    <!--<td class="hidden-sm-down">{{item.suid | to-short}}</td>-->
                    <td class="hidden-sm-down">{{item.createTime | time-date}}</td>
                    <td class="hidden-sm-down">
                        <span v-show="item.schedule==0">新增</span>
                        <span v-show="item.schedule==1">正在上传CT文件/已上传{{item.fileNums}}个</span>
                        <span v-show="item.schedule==2">CT文件上传完成</span>
                        <span v-show="item.schedule==3">正在生成切面数据</span>
                        <span v-show="item.schedule==4">切面数据生成完毕</span>
                        <span v-show="item.schedule==5">解析异常</span>
                    </td>
                    <!--<td>-->
                    <!--<a :id="item.id+'-1'" style="display: block"  class="text-info" @click="download(item.id)"><i class="fa fa-cloud-download"></i></a>-->
                    <!--<Row  style="display: none;" :id="item.id+'-2'">-->
                    <!--<Col class="demo-spin-col" span="8">-->
                    <!--<Spin fix>-->
                    <!--<Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>-->
                    <!--<Icon type="load-c" size=18   class="demo-spin-icon-load"></Icon>-->
                    <!--</Spin>-->
                    <!--</Col>-->
                    <!--</Row>-->
                    <!--</td>-->
                    <td class="text-xs-center">

                        <!--<a  class="text-danger" @click="readImage(item.id)"><i class="fa fa-caret-square-o-right"></i> 阅片</a>-->
                        <!--<a class="text-danger" @click="remove(item.id, index)" v-show="item.isLock==0"><i class="fa fa-trash-o"></i>删除</a>-->
                        <!--<a class="text-danger" v-show="item.isLock==1"><i class="fa fa-lock" aria-hidden="true"></i>保护</a>-->

                        <router-link :to="'/image/detail/' + item.id + '?studyUID=' + item.suid"><i class="fa fa-eye"></i>查看</router-link>
                    </td>
                </tr>
                </tbody>

            </table>
            <v-pagination :pageNumChange.sync="pageNumChange" :cur.sync="cur" :all.sync="all" :count.sync="count"
                          :curIndex_s.sync="curIndex_s"
                          @listen="paging"></v-pagination>
        </div>
    </div>
</template>
<script>
    import {del, treeify} from '../../misc/utils'
    import {Image, Upload} from '../../resources'
    import {Download} from '../../resources'
    import swal from 'sweetalert'
    import Pagination from '../../widgets/pagination.vue'
    import {debounce} from '../../misc/utils'
    import paginations from '../../widgets/paginations.vue'
    import axios from 'axios'

    var page_backup = null  // 初始化分页数据备份

    export default {
        data: () => ({
            loading: 0,
            keyword: '',
            shootingTime: '',
            page: {},
            cur: 1,
            all: 1,
            curIndex_s: 1,
            count: 0,
            pageNumChange: 0,
            pageNum: 1,
            flags: null,
            pagedatas: {}

        }),
        beforeRouteEnter(to, from, next) {
            Image.query().then(response => {
                next(vm => {
                    vm.page = response.data
                    console.log('vm.page--------------',vm.page)
                    vm.all = parseInt(vm.page.totalCount % vm.page.pageSize == 0 ? vm.page.totalCount / vm.page.pageSize : vm.page.totalCount / vm.page.pageSize + 1)
                    vm.count = vm.page.totalCount

                    vm.pagedatas = response.data.items


                    vm.$nextTick(() => vm.$store.state.isLoading = false)


                })
            })
        },
        beforeRouteUpdate(to, from, next) {
            this.$store.state.isLoading = false
            this.paging(1, next)
        },
        created() {
            this.initSetTimeout(1)//
        },
        methods: {
            getData() {
//                console.log("---------------wd2--------------------")
                var pagedatas = this.pagedatas
                if (pagedatas != null) {
                    var imageIds = '';
                    var imageId = '';
                    for (var i = 0; i < pagedatas.length; i++) {
                        imageId = pagedatas[i].id + '';
                        var imageSchedule = pagedatas[i].schedule;
                        if (imageSchedule != 4 && imageSchedule != 5) {
                            imageIds = imageIds + imageId + '-';
                        }
                    }
                    if (imageIds != "") {
                        imageIds = imageIds.substring(0, imageIds.length - 1)
                    }

                    if (imageIds != null && imageIds != '') {
                        this.timeRequest(imageIds);
                    } else {
                        clearInterval(this.flags);
                    }
                }

            },
            initSetTimeout(flag) {//每隔10秒刷新数据，也就是每隔10秒向后台请求一次数据
                console.log("---------------wd1--------------------")
                if (flag == 1) {
                    this.flags = setInterval(() => {//es6中这个this指向的是这些方法，若setInterval(function(){ this.getData(today)})中的this指向的真个windows，这样写是会报错的，所以最好用es6来调用getData里的方法
                        this.getData()
                    }, 5000)
                } else {
                    clearInterval(this.flags);
                }
            },
            timeRequest(imageIds) {
                if (imageIds != null && imageIds != '') {
                    Image.getFileNum({ImageIds: imageIds}).then(result => {
                        var imageSchedules = -1;
                        var imageDatas = result.data
                        if (imageDatas != null) {
//                            console.log("---------------wd3------------" + imageDatas)
                            var imageIds = '';
                            var imageId = -1;
                            for (var i = 0; i < imageDatas.length; i++) {
                                imageId = imageDatas[i].id
                                var imageSchedule = imageDatas[i].schedule;
                                if (imageSchedule != 4 && imageSchedule != 5) {
                                    imageIds = imageIds + imageId + '-';
                                } else {
                                    clearInterval(this.flags);
                                }
                                var spanStatus = '';
                                if (imageSchedule == 0) {
                                    spanStatus = '<span >新增</span>';
                                }
                                if (imageSchedule == 1) {
                                    spanStatus = '<span>正在上传CT文件/已上传' + imageDatas[i].fileNums + '个</span>';
                                    imageSchedules = imageSchedule;
                                }
                                if (imageSchedule == 2) {
                                    spanStatus = '<span>CT文件上传完成</span>';
                                    imageSchedules = imageSchedule;
                                }
                                if (imageSchedule == 3) {
                                    spanStatus = ' <span >正在生成切面数据</span>';
                                    imageSchedules = imageSchedule;
                                }
                                if (imageSchedule == 4) {
                                    spanStatus = ' <span >切面数据生成完毕</span>';
                                }
                                if (imageSchedule == 5) {
                                    spanStatus = '  <span >解析异常</span>';
                                }
                                var data = '<td class="hidden-sm-down">' + imageDatas[i].departmentName + '</td>' +
                                    '<td class="hidden-sm-down">' + imageDatas[i].patientName + '</td>' +
                                    '<td class="hidden-sm-down">' + imageDatas[i].hospno + '</td>' +
                                    '<td class="hidden-sm-down">' + imageDatas[i].createTime + '</td>' +
                                    '<td class="hidden-sm-down">' + spanStatus + '</td>' +
                                    '<td><a href="#/image/detail/' + imageId + '" class=""><i class="fa fa-eye"></i>查看</a> </td>';
                                $("#" + imageId).html(data);

                            }

                            if (imageIds != "") {
                                imageIds = imageIds.substring(0, imageIds.length - 1)
                            } else {
                                clearInterval(this.flags);
                            }
                            this.timeRequest(imageIds);
                        } else {
                            clearInterval(this.flags);

                        }
                    })
                } else {
                    clearInterval(this.flags);
                }
            },
            paging(pn, cb) {  // 分页查询
                this.loading = 1
                Image.query({keyword: this.keyword, pn: pn || 1, shootingTime: this.shootingTime}).then(response => {
                    this.page = response.data
                    this.all = parseInt(this.page.totalCount % this.page.pageSize == 0 ? this.page.totalCount / this.page.pageSize : this.page.totalCount / this.page.pageSize + 1)
                    this.count = this.page.totalCount
                    this.loading = 0
                    cb && cb()
                })
            },
            readImage(id) {
                //type:  ct image 1; plan 2 ; pdf 3;
                var type = 1
                Download.readImage(id, type).then(response => {
                    console.log("response: " + JSON.stringify(response))

                    if (response.status == "200") {

                        var uint16 = new Uint16Array(response.data); // length为4
                        console.log(uint16.length)
                        console.log(uint16[88])

                        var startTime = new Date().getTime()

                        var width = 512
                        var height = 512
                        var fileNum = 130

                        //声明三切面数组
                        var arr_x = [];
                        var arr_y = [];
                        var arr_z = [];

                        //生成 Z 切面 数据
                        for (var i = 0; i < fileNum; i++) {
                            arr_z[(fileNum - 1) - i] = uint16.slice((width * height) * i, (width * height) * (i + 1))
                        }

                        //生成 X 切面 数据
                        //生成x的密度数组,数组长度为z图的height,来自于header.txt文件
                        //生成height张x切面的数组
                        for (var jx = 0; jx < height; jx++) {
                            //生成一张x轴切面图的数组,
                            //z图的width为x图的width
                            //z图数组的长度(z图的张数)为x图的高度,
                            arr_x[jx] = []
                            for (var kx = 0; kx < arr_z.length; kx++) {
                                //每一像素行数据
                                arr_x[jx].push.apply(arr_x[jx], arr_z[kx].slice(width * jx, width * (jx + 1)))
                            }
                        }

                        //生成 Y 切面 数据
                        //生成y的密度数组,数组长度为z图的width,来自于header.txt文件
                        //生成width张y切面的数组
                        for (var jy = 0; jy < width; jy++) {
                            //生成一张y轴切面图的数组,
                            //z图的height为y图的width
                            //z图数组的长度(z图的张数)为y图的高度,
                            arr_y[jy] = []
                            for (var ky = 0; ky < arr_z.length; ky++) { //获取每行数据
                                var line = []
                                //获取一行像素点的值
                                for (var my = 0; my < height; my++) {//获取单像素点数据
                                    //获取行内指定一个像素点的值
                                    line[my] = arr_z[ky][width * my + jy]
                                }
                                arr_y[jy].push.apply(arr_y[jy], line)
                            }
                        }

                        var endTime = new Date().getTime()
                        console.log((endTime - startTime) / 1000 + "秒")
                        console.log(arr_x[50])
                        console.log(arr_x[50].length)
                        console.log(arr_x.length)
                    }
                })
            },
            paging_delayed: debounce(function () {
                this.paging(1)
            }, 400),
            query(id) {
                this.loading = 1
                this.curIndex_s = id
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
        components: {Pagination, 'v-pagination': paginations}
    }
</script>
<!--<script type="text/javascript">-->
<!--var t2 = window.setInterval(getFileNum(),1000);-->
<!--function getFileNum()-->
<!--{-->
<!--console.log("222222222222222222222")-->
<!--}-->
<!--</script>-->
