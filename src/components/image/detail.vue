<template>
    <div>
        <ol class="breadcrumb">
            <li class="breadcrumb-item">        <router-link to="/">首页</router-link>      </li>
            <li class="breadcrumb-item">
                <router-link to="/image">影像管理</router-link>
            </li>
            <li class="breadcrumb-item active">影像详情</li>
        </ol>
        <div style="margin-left: 15px">
            <div class="col-md-12">
                <a href="javascript:void(0);" class="btn btn-primary imgTab" :class="{curShow:curShowFlag}" @click="changeImgShow(0)">影像管理</a>
                <!--<a href="javascript:void(0);" class="btn btn-primary imgTab" :class="{curShow:curShowFlag1}" @click="changeImgShow(1)">影像查看</a>-->
                <a href="javascript:void(0);" class="btn btn-primary imgTab" :class="{curShow:curShowFlag2}" @click="changeImgShow(2)">三维影像</a>
                <a href="javascript:void(0);" class="btn btn-primary imgTab" :class="{curShow:curShowFlag3}" @click="changeImgShow(3)">靶区勾画</a>
            </div>
        </div>
        <div class="imgManage">
            <div class="patentInfos">
                <table v-if="imgShow !=1 ">
                    <tr>
                        <td rowspan="2" class="head"><span>患者信息</span></td>
                        <td>患者姓名：<span v-html="imageInfo.name"></span></td>
                        <td>诊断：<span v-html="imageInfo.diagnose"></span></td>
                        <td>所在医院：<span v-html="imageInfo.hospital"></span></td>
                    </tr>
                    <tr>
                        <td>患者病历号：<span v-html="imageInfo.hospno"></span></td>
                        <td>年龄：<span v-html="imageInfo.age"></span></td>
                        <td>主管大夫：<span v-html="imageInfo.doctor"></span></td>
                    </tr>
                </table>
            </div>
            <div class="manageImg" v-show="imgShow == 0">
                <div class="pull-left leftImg" >
                    <img :src=this.imagePath alt="暂无影像"/>
                </div>
                <div class="pull-left rightAction">
                  <p>
                    <button style="width:calc(100% - 20px)"  @click="openNewWindow" :title="openNewWindowTitle"  class="ms-button ms-button--primary ms-button--mini">
                      <i class="ms-icon-document">
                        <img src="./img/chakan.png" alt="">
                      </i>
                      <span>查看影像</span>
                    </button>
                  </p>
                    <p>
                        <button :id="imageInfo.id+'-1'" :title="downloadTitle" class="ms-button ms-button--primary ms-button--mini"
                                 @click="download(imageInfo.id)">
                          <i class="ms-icon-document">
                            <img src="./img/xiazai.png" alt="">
                          </i>
                          <span>下载</span>
                        </button>
                        <button class="ms-button ms-button--primary ms-button--mini" @click="remove(imageInfo.id)"
                                :title="deleteTitle" :disabled="isThisLock">
                          <i class="ms-icon-document">
                            <img src="./img/shanchu.png" alt="">
                          </i>
                          <span>删除</span>
                        </button>
                    </p>
                    <p>
                        <button class="ms-button ms-button--primary ms-button--mini" disabled="disabled">
                          <i class="ms-icon-document">
                            <img src="./img/fasong.png" alt="">
                          </i>
                          <span>发送</span>
                        </button>
                        <button class="ms-button ms-button--primary ms-button--mini" @click="protect(imageInfo.id, imageInfo.isLock)" id="protect"
                                :title="protectTitle" :disabled="notProtected">
                          <i class="ms-icon-document">
                            <img src="./img/baohu.png" alt="">
                          </i>
                          <span>保护</span>
                        </button>
                    </p>
                </div>
            </div>
          <!--<div v-if="postFlag==1 && imgView==1" id="imgViewP">-->
                <!--<image-view :showStateFlag="imgShow" :imgView='imgView' :imageSizeParent="imageInfo.imageSize"-->
                            <!--:imageIdParent="imageInfo.id" :imageParams="imageParams" @view-info="getChildInfo" id="imgView"></image-view>-->
            <!--</div>-->
            <div v-if="graphicView==1 && sketchShow == 2">
                <graphicModel v-show="imgShow==2" :styleW="600" :styleH="600"></graphicModel>
            </div>
            <div v-if="sketchView==1" id="sketchViewP">
                <sketchLine :showStateFlag="imgShow" :imgView='imgView' :imageSizeParent="imageInfo.imageSize"
                            :imageIdParent="imageInfo.id" :imageParams="imageParams" id="sketchView"></sketchLine>
            </div>
        </div>
    </div>
</template>
<script>
    import $ from 'jquery'
    import {Image, Download, isDev} from '../../resources'
    import {delOne, protect} from '../../misc/utils'
//    import imageView from './view_new2.vue'
//    import imageView from './view.vue'
    import graphicModel from './graphicModel.vue'
    import sketchLine from './sketchLine.vue'

    export default {
        data: () => ({
            sketchShow:0,
            imgShow: 0,
            imgView: 0,
            sketchView:0,
            graphicView:0,
            imagePath: '',
            isThisLock: true,
            notProtected: true,
            downloadTitle: '',
          openNewWindowTitle: '',
            deleteTitle: '',
            protectTitle: '',
            postFlag: 0,////三切面影像图的加载标识
            imageInfo: {
                id: 0,
                name: '',
                age: '',
                diagnose: '',
                hospno: '',
                hospital: '',
                doctor: '',
                isLock: 0,
                imageSize: 0
            },
            imageParams: {
                fileNum: 0,
                width: 0,
                height: 0,
                rowPixelSpacing: 0,
                columnPixelSpacing: 0,
                intercept: 0,
                slope: 0,
                windowWidth: 0,
                windowCenter: 0,
                sliceThickness:0,
                sliceSpacing:0,
                patient:{
                    patientName:'',
                    gender:'',
                    id:'',
                    patientPosition:0,
                    gatherDate:'',
                    gatherTime:'',
                    current:0,
                    voltage:0
                }
            },
            curShowFlag:true,
            curShowFlag1:false,
            curShowFlag2:false,
            curShowFlag3:false
        }),
        beforeRouteEnter(to, from, next) {
            let id = to.params.id;
            Image.getInfo(id).then((res) => {
                next(vm => {
                  vm.openNewWindowTitle='点击查看详情'
                    console.log('res.data=');
                    console.log(res.data);
                    if (res.data == null) {
                        swal({title: '找不到病人', text: '找不到影像对应的病人', type: 'error'}, confirmed => {
                            if (confirmed) {
                                return this.$router.back();
                            }
                        })
                    }
                    if (res.data.imageSize == 0) {
                        swal("文件正在上传", "文件未上传完毕", "error");
                    }
                    vm.imageInfo.id = id;
                    vm.imageInfo.name = res.data.name;
                    vm.imageInfo.age = res.data.age;
                    vm.imageInfo.diagnose = res.data.diagnose;
                    vm.imageInfo.hospno = res.data.hospno;
                    vm.imageInfo.hospital = res.data.hospital;
                    vm.imageInfo.doctor = res.data.doctor;
                    vm.imageInfo.isLock = res.data.isLock;
                    vm.imageInfo.imageSize = res.data.imageSize;
                    vm.postFlag = 1;

                    vm.imageParams.fileNum = res.data.fileNum;
                    vm.imageParams.width = res.data.width;
                    vm.imageParams.height = res.data.height;
                    vm.imageParams.rowPixelSpacing = res.data.rowPixelSpacing;
                    vm.imageParams.columnPixelSpacing = res.data.columnPixelSpacing;
                    vm.imageParams.intercept = res.data.intercept;
                    vm.imageParams.slope = res.data.slope;
                    vm.imageParams.windowWidth = res.data.windowWidth;
                    vm.imageParams.windowCenter = res.data.windowCenter;
                    vm.imageParams.sliceThickness=res.data.sliceThickness;
                    vm.imageParams.sliceSpacing=res.data.sliceSpacing;
                    vm.imageParams.volumeOri = res.data.volumeOri;

                    vm.imageParams.patient.patientName=res.data.patient.patientName;
                    vm.imageParams.patient.gender=res.data.patient.gender;
                    vm.imageParams.patient.id=res.data.patient.id;
                    vm.imageParams.patient.patientPosition=res.data.patient.patientPosition;
                    vm.imageParams.patient.gatherDate=res.data.gather.gatherDate;
                    vm.imageParams.patient.gatherTime=res.data.gather.gatherTime;
                    vm.imageParams.patient.current=res.data.gather.current;
                    vm.imageParams.patient.voltage=res.data.gather.voltage;


                    if (vm.imageInfo.isLock == 1) {
                        vm.isThisLock = true;
                        vm.deleteTitle = '保护关闭后可删除';
                        vm.protectTitle = '影像保护已开启';
                    } else {
                        vm.isThisLock = false;
                        vm.protectTitle = '影像保护已关闭';
                        $("#protect").css('background', '#6e6e6c')
                    }

                    if (res.data.canProtect == 1) {
                        vm.notProtected = false;
                    } else {
                        vm.protectTitle = '您没有修改保护状态的权限';
                    }

                    if (res.data.isLocal == 0) {
                        vm.isThisLock = true;
                        vm.deleteTitle = '您不能修改此医院的影像数据';
                        vm.notProtected = true;
                        vm.protectTitle = '您不能修改此医院的影像数据';
                    }

//                    console.log(JSON.stringify(vm.imageInfo))

                    vm.showImg(id);

                    vm.$nextTick(() => vm.$store.state.isLoading = false)
                })
            })
        },
        destroyed(){
            window.location.reload();
        },
        mounted(){
            var that=this;
            if($('#imgView')[0]) {///判断是否已经加载该页签
                that.viewSize();
            }
            if($('#sketchViewP')[0]){///判断是否已经加载该页签
                that.sketchSize();
            }
            window.onresize=function(){
//                if($('#imgView')[0]) {
//                    that.viewSize();
//                }
                if($('#sketchViewP')[0]){
                    that.sketchSize();
                }
            }

        },
        methods: {
          openNewWindow () {
            let url = 'view_new.html?studyUID=' + this.$route.query.studyUID
            if (isDev) url = 'http://117.78.42.234:8083/tps_webself/' + url
            window.open(url)
          },
            sketchSize(){
                var viewTop=this.distanceTop('sketchViewP');
                var viewLeft=this.distanceLeft('sketchViewP');
                var winW=$(window).width();
                var winH=$(window).height();
                $('.sketchContent').parent().css({
                    'position':'absolute',
                    'z-index':-1,
                    'width':winW-viewLeft+'px',
                    'height':winH-viewTop+'px'
                });
            },
            viewSize(){
                var viewTop=this.distanceTop('imgViewP');
                var viewLeft=this.distanceLeft('imgViewP');
                var winW=$(window).width();
                var winH=$(window).height();
                $('.viewerContent').parent().css({
                    'position':'absolute',
                    'z-index':-1,
                    'width':winW-viewLeft+'px',
                    'height':winH-viewTop+'px'
                });
            },
            distanceTop(obj){
                var thisObj=document.getElementById(obj);
                var distance=0;
                while(thisObj.offsetParent!=null){
                    distance+=thisObj.offsetTop;
                    thisObj=thisObj.offsetParent;
                }
                return distance;
            },
            distanceLeft(obj){
                var thisObj=document.getElementById(obj);
                var distance=0;
                while(thisObj.offsetParent!=null){
                    distance+=thisObj.offsetLeft;
                    thisObj=thisObj.offsetParent;
                }
                return distance;
            },
            getChildInfo(viewInfo){

            },
            //修改查看页面
            changeImgShow(status) {
                this.imgShow = status;
                this.sketchShow=status;
                if (status == 1) {
                    this.imgView = 1;
                    this.curShowFlag=false;
                    this.curShowFlag1=true;
                    this.curShowFlag2=false;
                    this.curShowFlag3=false;
                }else if(status==2){
                    this.graphicView=1;
                    this.curShowFlag=false;
                    this.curShowFlag1=false;
                    this.curShowFlag2=true;
                    this.curShowFlag3=false;
                }else if(status==3){
                    this.sketchView=1;
                    this.curShowFlag=false;
                    this.curShowFlag1=false;
                    this.curShowFlag2=false;
                    this.curShowFlag3=true;
                }else{
                    this.curShowFlag=true;
                    this.curShowFlag1=false;
                    this.curShowFlag2=false;
                    this.curShowFlag3=false;
                }
                if(status==1 && $('#imgView')[0]){
                    $('.viewerContent').parent().removeAttr('style');//展示影像查看页签
                }else{
                    if($('#imgView')[0]) {
                        this.viewSize();
                    }
                }
                if(status==3 && $('#sketchView')[0]){
                    $('.sketchContent').parent().removeAttr('style');//展示靶区勾画页签
                }else{
                    if($('#sketchView')[0]) {
                        this.sketchSize();
                    }
                }
            },
            //影像下载
            download(id) {
                let downloadId1 = id + "-1";
                $("#" + downloadId1).attr("disabled", true);
                this.downloadTitle = '正在下载中......';
                Image.download(id).then(response => {
                    $("#" + downloadId1).attr("disabled", false);
                    this.downloadTitle = '';
                })
            },
            //影像删除
            remove(id) {
                delOne(this, Image, id)
            },
            //影像保护
            protect(id, isLock) {
                protect(this, Image, id, isLock)
            },
            //影像详情重载
            reload(id) {
                Image.getInfo(id).then((res) => {
                    this.imageInfo.isLock = res.data.isLock;

                    if (this.imageInfo.isLock == 1) {
                        this.isThisLock = true;
                        this.deleteTitle = '保护关闭后可删除';
                        this.protectTitle = '影像保护已开启';
                        $("#protect").css('background', '')
                    } else {
                        this.isThisLock = false;
                        this.deleteTitle = '可执行删除';
                        this.protectTitle = '影像保护已关闭';
                        $("#protect").css('background', '#6e6e6c')
                    }

                    this.$nextTick(() => this.$store.state.isLoading = false)
                })
            },
            //展示中间的dicom图片
            showImg(id) {
                Image.showOneImg(id).then(res => {
                    let path = res.data;
                    if (null != path && "" != path) {
//                        this.imagePath = Common.baseURL + '/' + path;
                        this.imagePath = '/' + path;
                    } else {
                        this.imagePath = '../../../static/img/placeholder1.png';
                    }
                })
            }
        },
        components: {sketchLine,graphicModel}
    }
</script>
<style type="text/css">
  .ms-button[disabled], .ms-button[disabled]:focus, .ms-button[disabled]:hover {
    color: #c0c4cc;
    cursor: not-allowed;
    background-image: none;
    background-color: #fff;
    border-color: #ebeef5;
  }
  .ms-button--primary[disabled], .ms-button--primary[disabled]:active, .ms-button--primary[disabled]:focus, .ms-button--primary[disabled]:hover {
    color: #fff;
    background-color: #a0cfff;
    border-color: #a0cfff;
  }

  .ms-button:focus, .ms-button:hover {
    color: #409eff;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
  }
  .ms-button:active {
    color: #3a8ee6;
    border-color: #3a8ee6;
    outline: 0;
  }
  .ms-button--primary:focus, .ms-button--primary:hover {
    background: #66b1ff;
    border-color: #66b1ff;
    color: #fff;
  }
  .ms-button--primary.is-active, .ms-button--primary:active {
    background: #3a8ee6;
    border-color: #3a8ee6;
    color: #fff;
  }
  .ms-button--primary:active {
    outline: 0;
  }

  .ms-icon-document>img{
    height: 16px;
  }
  [class*=" el-icon-"], [class^=el-icon-] {
    /*font-family: element-icons!important;*/
    height: 100%;
    speak: none;
    font-style: normal;
    font-weight: 400;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    vertical-align: baseline;
    display: inline-block;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .ms-button {
    margin-left: 20px;
    display: inline-block;
    line-height: 16px;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: 0;
    /*margin: 0;*/
    transition: .1s;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
  }
  .ms-button--mini, .ms-button--mini.is-round {
    padding: 8px 15px;
  }

  .ms-button--mini{
    font-size: 12px;
    border-radius: 3px;
  }
  .ms-button--primary {
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;
  }

  #imgViewP{
    width: 100%;
    height: 100%;
  }
    .btn.imgTab {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        margin-left: 10px;
        background: #fff;
        color:#333;
        border:0;
        box-shadow: 0 0 5px #ccc;
        padding:0.5rem 2rem;
    }
    .btn.imgTab.curShow{
        background:#54a0ff;
        color:#fff;
}
    .rightAction p button.btn-info{
        background-color:#54a0ff;
        padding:0.5rem 2rem;
    }
    .imgManage {
        height: calc(100% - 100px);
        padding: 10px;
        background:#fff;
        box-shadow: 0 0 5px #ccc;
        overflow: hidden;
        margin:5px;
        margin-top:0;
    }
    .imgManage h3 {
        font-size: 16px;
        color: #333;
        font-weight: normal;
        border-bottom: 1px solid #eee;
        line-height: 25px;
    }

    .imgManage p.patInfo {
        line-height: 20px;
        font-size: 14px;
        padding-left: 10px;
        padding-top: 10px;
    }

    .imgManage p.patInfo span {
        padding-right: 20px;
    }

    .manageImg {
        padding: 10px;
    }

    .manageImg .leftImg {
        width: 512px;
        height: 512px;
        background: #ccc;
        border-radius: 10px;
    }

    .manageImg .rightAction {
        padding-left: 10px;
        padding-top: 100px;

    }

    .manageImg .rightAction button.btn {
        margin: 20px;
    }
    .patentInfos{
        border-bottom:1px solid #dedede;
        padding-bottom: 5px;
        margin-left:10px;
    }
    .patentInfos table tr td{
        padding:2px 20px;
        font-size:14px;
    }
    .patentInfos table tr td.head{
        font-size:16px;
        color:#1775ea;
        border-right:0;
    }
    .patentInfos table tr td{
        border-right:1px solid #eee;
    }
    .patentInfos table tr td:last-child{
        border-right:0;
    }
</style>
