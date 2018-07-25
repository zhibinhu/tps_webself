<template>
    <div class="sketchContent" style="position: relative;">
        <div class="cur_mask">
            <div class="tipLoadingBox">
                <div id="tipLoading"></div>
            </div>
            <div class="readImageProgress">
                <div class="progress-tip2">
                    <div class="text-center">正在加载数据中...</div>
                    <div class="progressing"></div>
                    <span></span>
                </div>
            </div>
        </div>
        <div class="row sketchLine">
            <!--左侧操作-->
            <div class="col-md-3" style="background: #f7f7f7;padding-bottom:10px;">
                <!--感兴趣区域-->
                <div class="likeArea">
                    <span class="fieldSet">感兴趣区域</span>
                    <div class="addArea">
                        <input type="text" placeholder="ROINAME" disabled="disabled" id="roiName"
                               class="form-control roiName"/>
                        <button class="btn btn-info pull-left addBtn" @click="addSketchROI">添加ROI</button>
                    </div>
                    <div class="delArea">
                        <select class="form-control roiList pull-left" v-model="organType" @change="showCurrentLine">
                            <option value="-1">请选择</option>
                            <!--<option value="2">肝</option>-->
                            <!--<option value="3">肺</option>-->
                        </select>
                        <button class="btn btn-info pull-left delBtn" @click="removeRoi">删除</button>
                    </div>
                </div>
                <!--感兴趣区域显示-->
                <div class="likeShow">
                    <span class="fieldSet">感兴趣区域显示</span>
                    <div class="colorBold">
                        <div class="pull-left colorShow">
                            <span>颜色显示</span>
                            <select class="form-control" @change="changeColor">
                                <option value="rgb(232,145,5)">土黄</option>
                                <option value="rgb(143,2,26)">深红色</option>
                                <option value="rgb(255,255,0)">黄色</option>
                                <option value="rgb(255,238,38)">柠檬黄</option>
                                <option value="rgb(255,127,1)">桔黄</option>
                                <option value="rgb(255,193,7)">深黄</option>
                                <option value="rgb(0,255,0)">绿</option>
                                <option value="rgb(99,207,65)">淡绿</option>
                                <option value="rgb(1,161,87)">深绿</option>
                                <option value="rgb(7,86,178)">浅蓝</option>
                                <option value="rgb(6,38,113)">青</option>
                                <option value="rgb(110,8,177)">紫</option>
                                <option value="rgb(0,0,255)">蓝</option>
                                <option value="rgb(0,0,0)">黑</option>
                                <option value="rgb(86,55,37)">棕</option>
                                <option value="rgb(191,80,32)">赭石</option>
                                <option value="rgb(255,57,1)">朱红</option>
                                <option value="rgb(237,12,50)">玫瑰红</option>
                                <option value="rgb(255,0,0)">红色</option>
                                <option value="rgb(6,38,113)">钴蓝</option>
                            </select>
                        </div>
                        <div class="pull-right boldShow">
                            <span>线粗细显示</span>
                            <select class="form-control" @change="changeWidth">
                                <option value="1" class="thin">——</option>
                                <option value="3" class="bold">——</option>
                                <option value="5" class="bolder">——</option>
                            </select>
                        </div>
                    </div>
                    <!--二维显示、三维显示-->
                    <div class="colorBold dimension">
                        <div class="pull-left twoShow">
                            <span>二维显示</span>
                            <select class="form-control" @change="changeShow">
                                <option value="line">线条</option>
                                <option value="face">面</option>
                                <option value="none">不显示</option>
                            </select>
                        </div>
                        <div class="pull-right dimShow">
                            <span>三维显示</span>
                            <select class="form-control">
                                <option>骨骼和皮肤</option>
                                <option>骨骼和肺</option>
                                <option>骨骼和肝</option>
                            </select>
                        </div>
                    </div>
                </div>
                <!--透明度显示-->
                <div class="opacityControl text-center">
                    <span class="">透明度显示%</span>
                    <input type="number" max="100" min="0" value="30" placeholder="30" disabled="disabled" class=""
                           @change="changeOpacity"/>
                </div>
                <!--编辑-->
                <div class="editArea">
                    <span class="fieldSet">编辑</span>
                    <button class="btn btn-info btn-sm" @click="copyLine"><i class="fa fa-files-o"
                                                                             aria-hidden="true"></i>复制
                    </button>
                </div>
            </div>
            <!--中间操作类型-->
            <div class="col-md-1">
                <div class="text-center revokeBtn">
                    <button class="btn btn-info btn-sm" @click="repeal" title="撤销"><i class="fa fa-reply"
                                                                                      aria-hidden="true"></i></button>
                </div>
                <div class="text-center penBtn">
                    <i class="fa fa-pencil-square-o" aria-hidden="true" title="开始勾画" @click="startGoing(0)"></i>
                    <!--<p title="调整笔头的大小"><input type="number" max="6" min="1" class="penBold" value="1" @change="changePensize"/></p>-->
                    <p title="调整笔头的大小">
                        <select class="form-control penPadding" @change="changePensize">
                            <option value="1">8x8</option>
                            <option value="2">16x16</option>
                            <option value="3">32x32</option>
                            <option value="4">48x48</option>
                            <option value="5">64x64</option>
                            <option value="6">128x128</option>
                        </select>
                    </p>
                </div>
                <div class="text-center moveBtn" title="移动勾画线"><i class="fa fa-arrows-alt" aria-hidden="true"
                                                                  @click="startGoing(4)"></i></div>
                <!--自动勾画按钮-->
                <div class="text-center">
                    <button class="btn btn-info btn-sm" id="autoDraw" @click="startDraw(1)">自动勾画</button>
                    <button class="btn btn-info btn-sm" id="cancelAutoDraw" style="font-size:12px;display:none;">取消自动勾画</button>
                    <button type="submit" class="btn btn-info btn-sm" id="saveSketch" @click="saveSketchData">保存
                    </button>
                </div>
                <!--<div class="colorBold dimension">-->
                <!--<div class="pull-left organShow">-->
                <!--<span>器官类型</span>-->
                <!--<select class="form-control" id="organType">-->
                <!--&lt;!&ndash;<option>0肾脏</option>&ndash;&gt;-->
                <!--&lt;!&ndash;<option>1脊髓</option>&ndash;&gt;-->
                <!--<option value="2">肝</option>-->
                <!--<option value="3">肺</option>-->
                <!--</select>-->
                <!--</div>-->
                <!--</div>-->
            </div>
            <!--右侧展示-->
            <div class="col-md-8 allSection">
                <div class="myAction">
                  <!--请选择操作-->
                  <div class="dropdown" style="display:inline-block;">
                    <button class="btn btn-default dropdown-toggle" title="请先滚动CT图再进行操作" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                      <span id="chooseCon">请选择操作</span>
                      <span class="caret"></span>
                    </button>
                    <ul class="dropdown-menu showFeatures"  aria-labelledby="dropdownMenu1">
                      <li @click="startGoing(0)">请选择操作</li>
                      <li id="moving" @click="startGoing(2)">平移</li>
                      <li id="scaling" @click="startGoing(3)">缩放</li>
                      <li id="winding" @click="startGoing(1)">窗宽窗位</li>
                      <li id="lung" @click="startGoing">肺窗</li>
                      <li id="bone" @click="startGoing">骨窗</li>
                      <li id="softTissue" @click="startGoing">软组织窗</li>
                      <li id="modifyLine" @click="startGoing(5)">修正勾画线</li>
                    </ul>
                  </div>
                    <!--<button class="btn btn-info btn-sm" id="moving" @click="startGoing(2)">平移</button>-->
                    <!--<button class="btn btn-info btn-sm" id="scaling" @click="startGoing(3)">缩放</button>-->
                    <!--<button class="btn btn-info btn-sm" id="winding" @click="startGoing(1)">窗宽窗位</button>-->
                    <!--<button class="btn btn-info btn-sm" id="lung">肺窗</button>-->
                    <!--<button class="btn btn-info btn-sm" id="bone">骨窗</button>-->
                    <!--<button class="btn btn-info btn-sm" id="softTissue">软组织窗</button>-->
                    <!--<button class="btn btn-info btn-sm" id="modifyLine" @click="startGoing(5)">修正勾画线</button>-->
                </div>
                <div id="sectionId">
                    <!--z-->
                    <div class="pull-left common sectionZ"
                         style="padding-left: 15px;background-color: black;position:relative;display: flex;justify-content: center">
                        <div class="canvasBoxGrey" id="boxBorderGrey"
                             style="height:100%; width:100%;overflow:hidden;position: relative;">
                            <div id="canvasBoxGrey" style="width:400%;height:400%;overflow:hidden;position: absolute;"
                                 :style="{left: jisuanValue.left,top:jisuanValue.top}">
                                <div class="directBoxGrey directBoxGreyBig" id="dicomImageGrey"
                                     style="width:315px;height:315px;position: relative;display: flex;justify-content: center">
                                    <canvas id="autoZ" style="position: absolute;top:0;left: 0;z-index: 1"></canvas>
                                    <canvas id="lineBoxZ" width="315" height="315"
                                            style="cursor: url(static/img/mousePen8.ico),auto"></canvas>
                                </div>
                            </div>
                        </div>
                        <div id="tooltipZS"
                             style="display: none;background-color:dimgrey;height:20px;position: absolute;color:white;z-index:9999;left:0;">
                            请点击第一个点:{{xStart}},{{yStart}}
                        </div>
                        <div id="tooltipZE"
                             style="display: none;background-color:dimgrey;height:20px;position: absolute;color:white;z-index:9999;left:0; top:25px;">
                            请点击第二个点:{{xEnd}},{{yEnd}}
                        </div>
                    </div>
                    <!--x-->
                    <div class="pull-left common sectionX"
                         style="padding-left: 15px;background-color: black;position:relative;display: flex;align-items:center;justify-content: center;">
                        <div class="canvasBoxGrey1" id="boxBorderGrey1"
                             style="height:100%; width:100%;overflow:hidden;position: relative;">
                            <div id="canvasBoxGrey1" style="width:400%;height:400%;overflow:hidden;position: absolute;"
                                 :style="{left: jisuanValue.left1,top:jisuanValue.top1 }">
                                <div class="directBoxGrey directBoxGreySmall" id="dicomImageGrey2"
                                     style="width:315px;position: relative;">
                                    <canvas id="lineBoxX"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--y-->
                    <div class="pull-left common sectionY"
                         style="padding-left: 15px;background-color: black;position:relative;display: flex;justify-content: center;align-items:center">
                        <div class="canvasBoxGrey2" id="boxBorderGrey2"
                             style="height:100%; width:100%;overflow:hidden; position: relative;">
                            <div id="canvasBoxGrey2" style="width:400%;height:400%;overflow:hidden;position: absolute;"
                                 :style="{left: jisuanValue.left2,top:jisuanValue.top2 }">
                                <div class="directBoxGrey directBoxGreySmall" id="dicomImageGrey3"
                                     style="width:315px;position: relative;display: flex;align-items: center">
                                    <canvas id="lineBoxY"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="pull-left common sectionDim" style="padding-left: 15px;background-color: black;position:relative;display: flex;justify-content: center;align-items:center">
                      <div id="d" :style="{ backgroundColor: 'rgb(0, 0, 0)', width: '315px', height: '315px', margin: '0 auto' }"></div>
                    </div>
                </div>
            </div>
            <!-- 主治医生审核轮廓勾画按键 -->
            <div class="text-right" style="padding:10px 10px;" v-if="$route.path.indexOf('patient') > 0 && currentUser==target.docid && target.status!=7">
                <button type="button" class="btn btn-info rounded" @click="check(1)"><i class="fa fa-check" style="color: #fff"></i> 审核通过</button>
                <button type="button" class="btn btn-info rounded" @click="check(0)"><i class="fa fa-check" style="color: #fff"></i> 审核不通过</button>
            </div>
            <!-- 上级医院医生提交轮廓勾画按键 -->
            <div class="text-right" style="padding:10px 10px;" v-if="$route.path.indexOf('patient') > 0 && currentUser==target.receiveDocid && target.status!=7">
                <button type="button" class="btn btn-info rounded" @click="estimate()"><i class="fa fa-check" style="color: #fff"></i> 提交勾画</button>
            </div>
        </div>

    </div>
</template>
<script>
    import {mapState} from 'vuex'
    import {dvhData} from '../../resources';
    import {sketchData} from '../../resources';
    import storeState from '../../vuex/store.js';
//    import {doseData} from '../../resources';

    var cornerstoneGrey = require("../../../static/js/cornerstoneGrey.js")
    import {del, treeify} from '../../misc/utils'
    import {Download, Common, Sketch, User, Target, Image, http, isDev} from '../../resources'
    import swal from 'sweetalert'
    import Pagination from '../../widgets/pagination.vue'
    import {debounce} from '../../misc/utils'
    import paginations from '../../widgets/paginations.vue'
    import {showResponse} from '../../misc/utils'

    export default {
        props: ["imageSizeParent", "dosageLength", "doseId", "imageIdParent", "imageParams", "target"],
        data: () => ({
            currentUser: User.current().id,
            indexCollect: [],
            sketchContext: '',
            renderer: '',
            organType: '',
            sketchFlag: false,
            imgDataSketch: {},
            sketchContext2: '',
            imgDataSketch2: {},
            dvhData: '',
            dvh_flag: false,
            preAfterFlag: 0,
            loading: 0,
            keyword: '',
            page: {},
            cur: 1,
            all: 1,
            curIndex_s: 1,
            count: 0,
            zData: [],
            zIndex: 65,
            // zFileNum:78,
            zLen: 0,
            zImageIds: [],
            xData: [],
            xIndex: 260,
            // xFileNum:512,
            xLen: 0,
            xImageIds: [],
            yData: [],
            yIndex: 260,
            // yFileNum:512,
            yLen: 0,
            yImageIds: [],
            axisG: "",
            brr: [],
            colorArr: [],

            step: 8176,
            //比例
            widthXY: 0,
            heightXY: 0,
            widthZ: 0,//200/512
            heightZ: 0,//200/512
            //显示的缩放
            spread: 0,
            //放大背景黑色
            scWidth: 0,
            aspAll: 0,//底图和剂量图的宽高比例
            scale1: 0,//z切面缩放比例
            scaleX: 0,//x、y切面在x轴缩放比例
            scaleY: 0,  //x、y切面在y轴缩放比例

            myDB: {
                name: 'CTImage',
                version: 1,
                db: null
            },
            dbVersionStore:1,
            flag: 0,
            data_tmp: [],
            xStart: 0,
            yStart: 0,
            xEnd: 0,
            yEnd: 0,
            click: 0,
            clickFlag:false,//判断是否点击了自动勾画按钮true：是，false：否
            organType: 0,//器官类型
            nameObj: {
                id: 'sketch_z_namelist',
                value: []
            },
            Map: '',
            roiMap: {},
            canvasTop: 0,
            canvasLeft: 0,
            drawPosX: 4,
            drawPosY: 4,
            haveCanvasFlag: false,
            resizeWindowFlag: 0,
            canvasLength: 0,
            scaleFlag: 0,
            moveFlag: 0,
            scaleSize: 0,//放大倍数百分比值
            startDrawOrganLine: null,
            isClockwiseStatus: true,
            overActiveFlag: false,  ///勾画线是否可以激活的标识
            noChangePage: true, ///判断是否进行过翻页,
            commonzIndex:0,
            toParentFlag:1,
        }),
        created() {

        },
        mounted() {
//            console.log(this.$route)
            var that = this;
            this.runContainer();
            this.calcH();
            window.onresize = function () {
                that.calcH();
                that.canvasTop = that.distanceTop('lineBoxZ') - $('.app-content-view')[0].scrollTop;
                that.canvasLeft = that.distanceLeft('lineBoxZ') - $('.app-content-view')[0].scrollLeft;
                that.resizeWindowFlag++;
            };
            $('.app-content-view')[0].onscroll = function () {
                that.canvasTop = that.distanceTop('lineBoxZ') - this.scrollTop;
                that.canvasLeft = that.distanceLeft('lineBoxZ') - this.scrollLeft;
            }

            this.initialize();
            //勾画线代码
            this.initDrawSketch();
//            this.roiMap = new this.Map();
            //创建或打开
            $.when(this.createIndexedDB()).done(function (dbFlag) {//创建indexedDB数据库
                if (dbFlag) {
                    $.when(that.getSketchData(that.imageIdParent)).always(function (dataFlag) {//从后台数据库获取勾画数据
                        that.backDrawLine(that.zIndex);//展示第一次进来时该层的勾画线
//                    for(var i=0;i<that.zIndex*2;i++){///先创建每层存储勾画数据的对象
//                        var objLine={
//                            id:'sketch_z_'+i,
//                            value:[]
//                        }
//                        that.addDBSingleData('sketchDB_'+that.imageIdParent,objLine);
//                    }
                        //创建存储勾画线名称的一条数据
//                    var objNamelist={
//                        id:"sketch_z_namelist",
//                        value:[
//                            {isAuto:false,name:'肾',val:0},
//                            {isAuto:false,name:'脊髓',val:1},
//                            {isAuto:false,name:'肝',val:2},
//                            {isAuto:false,name:'肺',val:3}
//                        ]
//                    }
//                    that.addDBSingleData('sketchDB_'+that.imageIdParent,objNamelist);
                        //填充已添加过的勾画线名称
                        $.when(that.getDataByKey(that.myDB.db, 'sketchDB_' + that.imageIdParent, 'sketch_z_namelist')).done(function (data) {
                            for (var i = 0; i < data.length; i++) {
                                if (data[i].isAuto) {
                                    var nameOption = '<option value="' + data[i].val + '">' + data[i].name + '<i></i></option>';
                                } else {
                                    var nameOption = '<option value="' + data[i].val + '">' + data[i].name + '</option>';
                                }
                                $('.delArea select').find('option').eq(0).after(nameOption);
                            }
                        });
                    });
                }
            });
         //取消自动勾画
          $(document).on('click','#cancelAutoDraw',function(){
            $(this).hide();
            $('#autoDraw').show();
            that.click=0;
            that.clickFlag=false;
            tooltipZS.style.display = 'none';
            tooltipZE.style.display = 'none';
          })
        },
        watch: {
            haveCanvasFlag: function () {
                var dicomImageGreyWidth2 = $('#dicomImageGrey2')[0].offsetWidth;
                var dicomImageGreyHeight2 = $('#dicomImageGrey2')[0].offsetHeight;
                var dicomImageGreyWidth3 = $('#dicomImageGrey3')[0].offsetWidth;
                var dicomImageGreyHeight3 = $('#dicomImageGrey3')[0].offsetHeight;
                $('#dicomImageGrey2').css({
                    'margin-left': -dicomImageGreyWidth2 / 2 + 'px',
                    'margin-top': -dicomImageGreyHeight2 / 2 + 'px'
                });
                $('#dicomImageGrey3').css({
                    'margin-left': -dicomImageGreyWidth3 / 2 + 'px',
                    'margin-top': -dicomImageGreyHeight3 / 2 + 'px'
                });
            }
        },
        computed: {
          ...mapState(['storeOrganType']),
            jisuanValue() {
                if (this.canvasLength > 0) {
                    var changeSizeFlag = this.resizeWindowFlag;
                    var boxBorderWidth = $('#boxBorderGrey')[0].offsetWidth;
                    var boxBorderHeight = $('#boxBorderGrey')[0].offsetHeight;
                    var canvasBoxWidth = $('#canvasBoxGrey')[0].offsetWidth;
                    var canvasBoxHeight = $('#canvasBoxGrey')[0].offsetHeight;

                    var boxBorderWidth1 = $('#boxBorderGrey1')[0].offsetWidth;
                    var boxBorderHeight1 = $('#boxBorderGrey1')[0].offsetHeight;
                    var canvasBoxWidth1 = $('#canvasBoxGrey1')[0].offsetWidth;
                    ;
                    var canvasBoxHeight1 = $('#canvasBoxGrey1')[0].offsetHeight;

                    var boxBorderWidth2 = $('#boxBorderGrey2')[0].offsetWidth;
                    var boxBorderHeight2 = $('#boxBorderGrey2')[0].offsetHeight;
                    var canvasBoxWidth2 = $('#canvasBoxGrey2')[0].offsetWidth;
                    var canvasBoxHeight2 = $('#canvasBoxGrey2')[0].offsetHeight;

                    return {
                        left: -(canvasBoxWidth - boxBorderWidth) / 2 + 'px',
                        top: -(canvasBoxHeight - boxBorderHeight) / 2 + 'px',
                        left1: -(canvasBoxWidth1 - boxBorderWidth1) / 2 + 'px',
                        top1: -(canvasBoxHeight1 - boxBorderHeight1) / 2 + 'px',
                        left2: -(canvasBoxWidth2 - boxBorderWidth2) / 2 + 'px',
                        top2: -(canvasBoxHeight2 - boxBorderHeight2) / 2 + 'px',
                        canvasBoxWidth: canvasBoxWidth,
                        sboxBorderWidth: boxBorderWidth

                    }
                }
                return {
                    left: -(canvasBoxWidth - boxBorderWidth) / 2 + 'px',
                    top: -(canvasBoxHeight - boxBorderHeight) / 2 + 'px',
                    left1: -(canvasBoxWidth1 - boxBorderWidth1) / 2 + 'px',
                    top1: -(canvasBoxHeight1 - boxBorderHeight1) / 2 + 'px',
                    left2: -(canvasBoxWidth2 - boxBorderWidth2) / 2 + 'px',
                    top2: -(canvasBoxHeight2 - boxBorderHeight2) / 2 + 'px',
                    canvasBoxWidth: canvasBoxWidth,
                    boxBorderWidth: boxBorderWidth
                }
            },
//            loadThreeImg(){
////                alert(this.imgView);
//                if (this.imgView==1 && parseInt($('#dicomImage').find('canvas').length) <= 0) {
//                    this.readImage(this.imageIdParent);
//
//                }
//            }
        },
        destroyed() {
            this.clearObjectStore(this.myDB.db, 'sketchDB_' + this.imageIdParent);//离开后清除DB，释放空间
            this.myDB.db.close();
        },
        methods: {
          runContainer() {
            let type = this.organType
            let renderer = this.renderer
            renderer && renderer.destroy()
            $('#d').html('')
            renderer = new X.renderer3D();
            renderer.container = 'd';
            renderer.init();
            var organNames = new X.object();
            var elementNames = new X.mesh();
//            elementNames.file =  'static/js/threeJS/models/vtk/test.vtk';
            let vtkID = this.$route.params.id
            http.get('/download/vtk?id=' + vtkID + '&type=' + type).then((res)=>{
              if(res.data.code == '200') {
                try{
                  let url = res.data.filePath.replace(/\/tps-server/,'')
                  if(isDev) url ='/v.api'+ url
                    elementNames.file = url;
//        elementNames.file =  'http://x.babymri.org/?skull.vtk';
//              organNames.color = [0, 0, 0];
//              organNames.color = [0.3, 0.3, 0.3];
                  elementNames.opacity = 0.9;
                  organNames.children.push(elementNames);
                  renderer.add(elementNames);
                  renderer.camera.up = [0, 0, 1];
                  renderer.camera.position = [300, 0, 0];
                  renderer.render();
                } catch (e) {
                  console.log('eeeee',e)
//                    alert('网络发生错误，请稍后再试！')
                }

              } else{
//                  alert('vtk文件未生成！')
                return false
              }
            })
          },
            moveLine() {
                var that = this;
                document.onkeyup = function (e) {
                    if (that.moveFlag == 4 && that.scaleFlag == 4) {
                        ////e.keyCode 38↑ 40↓ 37← 39→
                        var haveOrNot = false;
                        var delText = $('.delArea select').find('option:selected').text();
                        if (delText == '请选择') {
                            swal('操作失败', '请先选择您要移动的勾画线名称，再点击移动按钮', 'error');
                        } else {
                            $.when(that.getDataByKey(that.myDB.db, 'sketchDB_' + that.imageIdParent, 'sketch_z_' + that.zIndex)).done(function (data) {
                                var oldData = data;
                                for (var i = 0; i < oldData.length; i++) {
                                    if (oldData[i].key == delText) {
                                        haveOrNot = true;////判断该层是否有对应名称的勾画线
                                        for (var j = 0; j < oldData[i].value.length; j++) {
                                            if (e.keyCode == 38) {
                                                var newNum = oldData[i].value[j][1];
                                                newNum--;
                                                oldData[i].value[j][1] = newNum;
                                            } else if (e.keyCode == 40) {
                                                var newNum = oldData[i].value[j][1];
                                                newNum++;
                                                oldData[i].value[j][1] = newNum;
                                            } else if (e.keyCode == 37) {
                                                var newNum = oldData[i].value[j][0];
                                                newNum--;
                                                oldData[i].value[j][0] = newNum;
                                            } else if (e.keyCode == 39) {
                                                var newNum = oldData[i].value[j][0];
                                                newNum++;
                                                oldData[i].value[j][0] = newNum;
                                            }
                                        }
                                    }
                                }
                                var objLine = {
                                    id: 'sketch_z_' + that.zIndex,
                                    value: data
                                };
                                that.deleteDataByKey(that.myDB.db, 'sketchDB_' + that.imageIdParent, 'sketch_z_' + that.zIndex);
                                that.addDBSingleData('sketchDB_' + that.imageIdParent, objLine);
                                if (haveOrNot) {
                                    var box = document.getElementById('lineBoxZ');
                                    var context = box.getContext('2d');
                                    context.clearRect(0, 0, box.width, box.height);
                                    that.backDrawLine(that.zIndex);
                                }
                            });
                        }
                    }
                }
            },
            pushAndPull() {
                var that = this;
                var box = document.getElementById('lineBoxZ');

                box.onmousedown = function (e) {
                    if (that.moveFlag == 5 && that.scaleFlag == 5) {
                        let moveX;
                        let moveY;
                        let startX = e.pageX;
                        let startY = e.pageY;

                        let x = that.getPointOnCanvasforMove(box, e).x;//鼠标在画布上的坐标
                        let y = that.getPointOnCanvasforMove(box, e).y;//鼠标在画布上的坐标

                        let mousePixPos = $('.penBtn select').find('option:selected').text().indexOf('x');
                        let mousePix = parseInt($('.penBtn select').find('option:selected').text().substring(0, mousePixPos));
//                        console.log(mousePix);
                        //插值后的圆的数组  25~35ms
                        let circleArray = that.drawCircle(x, y, mousePix);//鼠标圆数组
                        let x1 = x + (mousePix / 2);//移动时鼠标圆心X坐标
                        let y1 = y + (mousePix / 2);//移动时鼠标圆心Y坐标

                        let oldData;
                        var oldData2 = [];
                        var oldData3 = [];
                        let haveOrNot = false;
                        var delText = $('.delArea select').find('option:selected').text();


                        if (delText == '请选择') {
                            swal('操作失败', '请先选择您要修正的勾画线名称，再点击修正勾画线按钮', 'error');
                        } else {
                            $.when(that.getDataByKey(that.myDB.db, 'sketchDB_' + that.imageIdParent, 'sketch_z_' + that.zIndex)).done(function (data) {
                                oldData = data;
                                oldData2 = that.mainPush(haveOrNot, oldData, delText, circleArray, x1, y1);

                                document.onmousemove = function (e) {
                                    //挤压时
                                    let startXM = e.pageX;
                                    let startYM = e.pageY;
                                    moveX = startXM - startX;
                                    moveY = startYM - startY;
                                    let x = that.getPointOnCanvasforMove(box, e).x;
                                    let y = that.getPointOnCanvasforMove(box, e).y;
                                    let x1 = x + (mousePix / 2);//移动时鼠标圆心X坐标
                                    let y1 = y + (mousePix / 2);//移动时鼠标圆心Y坐标
                                    haveOrNot = false;
                                    circleArray = that.drawCircle(x, y, mousePix);
                                    oldData3 = that.mainPush(haveOrNot, oldData2, delText, circleArray, x1, y1);
                                    oldData2 = null;
                                    oldData2 = oldData3;
                                }
                                document.onmouseup = function () {
                                  debugger
                                    if (Math.abs(moveX) > 0 || Math.abs(moveY) > 0) {///点击并移动后鼠标抬起
                                        var objLine = {
                                            id: 'sketch_z_' + that.zIndex,
                                            value: oldData3
                                        };
                                        that.deleteDataByKey(that.myDB.db, 'sketchDB_' + that.imageIdParent, 'sketch_z_' + that.zIndex);
                                        that.addDBSingleData('sketchDB_' + that.imageIdParent, objLine);
                                    } else {////点击后鼠标立即抬起
                                        var objLine = {
                                            id: 'sketch_z_' + that.zIndex,
                                            value: oldData2
                                        };
                                        that.deleteDataByKey(that.myDB.db, 'sketchDB_' + that.imageIdParent, 'sketch_z_' + that.zIndex);
                                        that.addDBSingleData('sketchDB_' + that.imageIdParent, objLine);
                                    }
                                    document.onmousemove = document.onmouseup = null;
                                }

                            });
                        }
                    }
                };
            },
            mainPush(haveOrNot, oldData, delText, circleArray, x, y) {
                var that = this;
                var charZhiArr = [];//存储当前层上所有勾画线的插值后的数组
                var pointArr = [];//存储鼠标圆与当前层上所有勾画线的交点
                var crossCount = 0;//鼠标圆与几条当前名称下的勾画线相交
                var kkk = 0;//记录当前层下当前名称下的哪一条勾画线可操作
                for (var i = 0; i < oldData.length; i++) {
                    var sketchChazhiArr = that.interpolationByArray(oldData[i].value);//插值勾画线后的勾画线数组
                    var objChazhi = {
                        arr: sketchChazhiArr,
                        key: oldData[i].key
                    };
                    var interSectPoint = that.isIntersect(circleArray, sketchChazhiArr);//圆圈与勾画线之间的交点
                    pointArr.push(interSectPoint.length);
                    charZhiArr.push(objChazhi);
                    objChazhi = null;
                }
                for (var i = 0; i < oldData.length; i++) {
                    if (oldData[i].key == delText) {
                        if (pointArr[i] > 0) {
                            crossCount++;
                        }
                    }
                }
                if (crossCount > 1 || crossCount == 0) {//超过两条或无交点则不操作
                    var box = document.getElementById('lineBoxZ');
                    var context = box.getContext('2d');
                    context.clearRect(0, 0, box.width, box.height);
                    that.drawMoveLine(context, oldData);////重画移动后当前层的勾画线
                    return oldData;
                }
                haveOrNot = true;//证明有交点
                var sketchData = [];//要操作的勾画线数组
                for (var i = 0; i < pointArr.length; i++) {
                    if (pointArr[i] > 0) {
                        if (delText == charZhiArr[i].key) {
                            sketchData = charZhiArr[i].arr;
                            kkk = i;
                        }
                    }
                }
                charZhiArr.length = 0;
                pointArr.length = 0;
                that.isClockwiseStatus = that.isClockwise(sketchData) > 0 ? true : false;
//TODO 获取圆与勾画线的位置关系
//                let circlePosition = false
                let circlePosition = that.isCircleInTheSketch([x, y], sketchData);
                //交点数组的顺序是按勾画数组的先后顺序
                let result = that.isIntersect(circleArray, sketchData);
                //圆弧的数组
                let sliceCircleArray = [];
                //挤压后的新的坐标数组
                let updateArray = new Array();
                if (result.length > 1) {
                    //判断勾画数组的起点是否在圆内或圆上,如果在,则为true,[sketchArrayData[0], sketchArrayData[1]]
//                    let isStartPointBetweenCrossPoint1 = false
                    let isStartPointBetweenCrossPoint1 = that.isStartPointBetweenCrossPoint([sketchData[0][0], sketchData[0][1]], circleArray);
//            console.log("勾画线起点: " + [sketchData[0][0], sketchData[0][1]].toString())
//                                    let x = that.getPointOnCanvasforMove(box, e).x;
//                                    let y = that.getPointOnCanvasforMove(box, e).y;
//            console.log("圆心坐标 : " + x, y)
                    if (isStartPointBetweenCrossPoint1) {
                        // 添加第一段数组
                        updateArray = sketchData.slice(that.getIndexFromArray(sketchData, result[0]), that.getIndexFromArray(sketchData, result[result.length - 1]))
                        // 添加圆弧数组
                        //TODO 根据鼠标的位置 获取圆弧,并返回数组: 圆心坐标,交点数组,插值后的圆的数组
                        sliceCircleArray = that.sliceArray(circlePosition, result, circleArray);
                        let sliceCircleArray1 = [];
                        for (let i = 0; i < sliceCircleArray.length; i++) {
                            sliceCircleArray1[sliceCircleArray.length - 1 - i] = sliceCircleArray[i];
                        }
                        updateArray.push.apply(updateArray, sliceCircleArray1);
//                console.log("---------------------------------勾画起点在圆内: " + isStartPointBetweenCrossPoint1)
                    } else {
//                console.log("---------------------------------勾画起点在圆外: " + isStartPointBetweenCrossPoint1)
                        //				console.log("sketchData---------------: " + sketchData)
                      // TODO 根据鼠标的位置 获取圆弧,并返回数组: 圆心坐标,交点数组,插值后的圆的数组
                        sliceCircleArray = that.sliceArray(circlePosition, result, circleArray);
                        //添加第一段数组
                        updateArray = sketchData.slice(0, that.getIndexFromArray(sketchData, result[0]))
                        updateArray.push.apply(updateArray, sliceCircleArray);
                        //            console.log("updateArray2 :  " + sliceCircleArray.length, updateArray.length, updateArray.toString())

                        //添加最后一段
                        let foo1 = sketchData.slice(that.getIndexFromArray(sketchData, result[result.length - 1]), sketchData.length)
                        //				console.log("foo1: " + foo1)
                        //				updateArray.push()
                        updateArray.push.apply(updateArray, foo1);
                    }
                    //给勾画数据赋值
                    sketchData = updateArray;
                    for (var i = 0; i < oldData.length; i++) {
                        if (i === kkk) {
                            oldData[i].value = sketchData;
                        }
                    }
                }
                if (haveOrNot) {
                    var box = document.getElementById('lineBoxZ');
                    var context = box.getContext('2d');
                    context.clearRect(0, 0, box.width, box.height);
                    that.drawMoveLine(context, oldData);////重画移动后当前层的勾画线
                }
                return oldData;
            },
            /**
             * 判断勾画数组的起点是否在圆内或圆上,true: 在圆内或圆上
             */
            isStartPointBetweenCrossPoint(circleCenterPoint, circleArray) {
                return this.isCircleInTheSketch(circleCenterPoint, circleArray);
            },
            /**
             * 判断圆心与勾画线的位置关系
             *
             * 圆心在勾画线的外部: false
             * 圆心在勾画线的内部: true
             *
             * @param {Object} circleCenterPoint: 圆心的实时位置
             * @param {Object} sketchArrayData: 插值后的勾画数组
             */
            isCircleInTheSketch(circleCenterPoint, sketchArrayData) {
                // 交点个数
                let nCross = 0

                for (let i = 0; i < sketchArrayData.length; i++) {

                    let p1x = sketchArrayData[i][0]
                    let p1y = sketchArrayData[i][1]

                    let p2x = sketchArrayData[(i + 1) % sketchArrayData.length][0]
                    let p2y = sketchArrayData[(i + 1) % sketchArrayData.length][1]

                    if (p1y == p2y)
                        continue;

                    if (circleCenterPoint[1] < Math.min(p1y, p2y))
                        continue;

                    if (circleCenterPoint[1] >= Math.max(p1y, p2y))
                        continue;

                    // 求交点的x坐标
                    let x = (circleCenterPoint[1] - p1y) * (p2x - p1x) / (p2y - p1y) + p1x;

                    // 只统计p1p2与p向右射线的交点

                    if (x > circleCenterPoint[0]) {
                        nCross++;
                    }
                }

                // 交点为偶数，点在多边形之外
                return (nCross % 2 == 1);

            },
            /**
             * 从坐标数组中寻找单个坐标再数组中的位置的索引值
             * @param {Object} array []
             * @param {Object} crossPoint 坐标点,如: [x, y]
             */
            getIndexFromArray(array_data, crossPoint) {
                //			console.log("array_data: " + array_data.length, crossPoint)
                let result;
                for (var i = 0; i < array_data.length; i++) {
                    if (array_data[i].toString() == crossPoint) {
                        //					console.log("/*******************************/: " + i)
                        result = i;
                        break;
                    }
                }
                //			console.log("result:          " + result)
                //			console.log("/*******************************/: " + result)
                return result;
            },
            /**
             * 截取圆弧,返回数组
             * @param {Object} array_big 圆插值后的数组
             * @param {Object} array_crossPoint 交点数组
             */
            sliceArray(circlePosition, array_crossPoint, circleArray) {
                // 绘制圆弧,使用交点坐标的头尾两点,按顺序,从头画到尾;
                //        console.log("交点数组: " + array_crossPoint);
//              circlePosition = false
              let arcArray = new Set();
                arcArray.add(array_crossPoint[0]); //添加起点
                arcArray.add(array_crossPoint[array_crossPoint.length - 1]); //添加起点

                //在勾画线内部
                //在勾画线外部

                //勾画线与圆弧的第一个最后一个交点
                let startPoint; //第一个交点再圆弧数组中的序号
                let endPoint; //最后一个交点再圆弧数组中的序号
                if (array_crossPoint.length > 1) {
                    for (let i = 0; i < circleArray.length; i++) {
                        // array_crossPoint[0]: 以勾画线顺序,第一个交点
                        if (circleArray[i].toString() == array_crossPoint[0]) {
                            //                    console.log("startPoint: " + i)
                            //与勾画线的第一个交点在圆的数组中的序号
                            startPoint = i;
                        }
                        if (circleArray[i].toString() == array_crossPoint[array_crossPoint.length - 1]) {
                            //                    console.log("endPoint: " + i)
                            endPoint = i;
                        }
                    }
                }

                let result = [];
                //判断圆弧数组顺序与交点的关系, 起点与勾画线拼接, 终点与下一段勾画线拼接

                // TODO 加判断,判断勾画是顺时针还是逆时针
                //顺时针
                if (this.isClockwiseStatus) {
                    //起点 < 终点   勾画线与圆弧的第一个最后一个交点
                    if (startPoint < endPoint) {
                        // circlePosition: 圆与勾画线的位置关系 1: 左边. 2内部. 3: 右边  4:最上或最下
                        if (circlePosition) {
                            //起点与勾画线拼接
                            result = circleArray.slice(startPoint, endPoint + 1); //ok
//                    console.log("1  startPoint < endPoint, true 在内部,不逆转")
                        } else {
                            let re = circleArray.slice(endPoint, circleArray.length + 1);
                            re.push.apply(re, circleArray.slice(0, startPoint + 1));
                            //逆转圆弧数组
                            for (let i = 0; i < re.length; i++) {
                                result[re.length - i - 1] = re[i];
                            }
//                    console.log("2  startPoint < endPoint, true 在外部,逆转")
                        }
                    } else {
                        //起点 > 终点
                        //终点与下一段勾画线拼接
                        // circlePosition: 圆与勾画线的位置关系 1: 左边. 2内部. 3: 右边  4:最上或最下
                        if (circlePosition) {
                            //起点与勾画线拼接
                            result = circleArray.slice(startPoint, circleArray.length + 1);
                            result.push.apply(result, circleArray.slice(0, endPoint + 1));
//                    console.log("3  startPoint > endPoint, true 在内部, 不逆转")
                        } else {
                            let re = circleArray.slice(endPoint, startPoint + 1);
                            //逆转圆弧数组
                            for (let i = 0; i < re.length; i++) {
                                result[re.length - i - 1] = re[i];
                            }
//                    console.log("4  startPoint > endPoint, true 在外部, 不逆转")
                        }
                    }
                } else {
                    //逆时针
                    //起点 < 终点   勾画线与圆弧的第一个最后一个交点
                    if (startPoint < endPoint) {
                        // circlePosition: 圆与勾画线的位置关系 1: 左边. 2内部. 3: 右边  4:最上或最下
                        if (circlePosition == true) {
                            //起点与勾画线拼接
                            let re = circleArray.slice(endPoint, circleArray.length + 1);
                            re.push.apply(re, circleArray.slice(0, startPoint + 1));
                            //逆转圆弧数组
                            for (let i = 0; i < re.length; i++) {
                                result[re.length - i - 1] = re[i];
                            }
//                    console.log("11  startPoint < endPoint, true 在内部,逆转")
                        } else {
                            result = circleArray.slice(startPoint, endPoint + 1); //ok
//                    console.log("22  startPoint < endPoint, false 在外部,不逆转")
                        }
                    } else {
                        //起点 > 终点
                        //终点与下一段勾画线拼接
                        // circlePosition: 圆与勾画线的位置关系 1: 左边. 2内部. 3: 右边  4:最上或最下
                        if (circlePosition == true) {
                            //起点与勾画线拼接
                            let re = circleArray.slice(endPoint, startPoint + 1);
                            //逆转圆弧数组
                            for (let i = 0; i < re.length; i++) {
                                result[re.length - i - 1] = re[i];
                            }
//                    console.log("33  startPoint > endPoint, true 在内部, 逆转")
                        } else {
                            result = circleArray.slice(startPoint, circleArray.length + 1);
                            result.push.apply(result, circleArray.slice(0, endPoint + 1));
//                    console.log("44  startPoint > endPoint, false 在外部, 不逆转")
                        }
                    }
                }
//        console.log("圆弧: " + result)
                return result;
            },
            isClockwise(sketchData) {
                //x最大值的位置;
                let xMaxIndex = 0;
                let xMax = sketchData[0][0];
                for (var i in sketchData) {
                    if (sketchData[i][0] > xMax) {
                        xMax = sketchData[i][0];
                        xMaxIndex = i;
                    }
                }

                //叉乘,三个点
                //最大值不是数组第一个点 point_b 是x为最大值所在的点
                let aIndex = eval(xMaxIndex - 1)
                let bIndex = eval(xMaxIndex)
                let cIndex = aIndex + 2
                if (xMaxIndex != 0) {
                    if (xMaxIndex != (sketchData.length - 1)) {
                        //最大值不是数组最一个点
                        cIndex = aIndex + 1;
                    } else {
                        //最大值是数组最一个点
                        cIndex = 0
                    }
                } else {
                    //最大值是数组第一个点
                    aIndex = sketchData.length - 1
                }

                let point_a = sketchData[aIndex];
                let point_b = sketchData[bIndex];
//        let point_c = sketchData[cIndex];

//        console.log(point_b[0])
                // x1*y2 -x2*y1
                let result = point_a[0] * point_b[1] - point_b[0] * point_a[1]
//        result < 0, 逆时针
//        result > 0, 顺时针
//        if (result < 0) {
//            //逆时针
//            return false;
//        } else {
//            // > 0 顺时针
//            return true;
//        }
                return result;
            },
            isCircleInTheSketch(circleCenterPoint, sketchArrayData) {
                // 交点个数
                let nCross = 0

                for (let i = 0; i < sketchArrayData.length; i++) {

                    let p1x = sketchArrayData[i][0]
                    let p1y = sketchArrayData[i][1]

                    let p2x = sketchArrayData[(i + 1) % sketchArrayData.length][0]
                    let p2y = sketchArrayData[(i + 1) % sketchArrayData.length][1]

                    if (p1y == p2y)
                        continue;

                    if (circleCenterPoint[1] < Math.min(p1y, p2y))
                        continue;

                    if (circleCenterPoint[1] >= Math.max(p1y, p2y))
                        continue;

                    // 求交点的x坐标
                    let x = (circleCenterPoint[1] - p1y) * (p2x - p1x) / (p2y - p1y) + p1x;

                    // 只统计p1p2与p向右射线的交点

                    if (x > circleCenterPoint[0]) {
                        nCross++;
                    }
                }

                // 交点为偶数，点在多边形之外
                return (nCross % 2 == 1);

            },
            moveCanvasLine() {
                var that = this;
                var box = document.getElementById('lineBoxZ');
                this.activeLine(box);
                box.onmousedown = that.moveFlag == 4 && that.scaleFlag == 4 ? moveLineStart : that.startDrawOrganLine;

                function moveLineStart(e) {
                    if (that.moveFlag == 4 && that.scaleFlag == 4) {
                        let startX = e.pageX;
                        let startY = e.pageY;
                        let moveX;////是否移动的标识
                        let moveY;

                        let x = that.getPointOnCanvasforMove(box, e).x
                        let y = that.getPointOnCanvasforMove(box, e).y
//                        console.log('x======' + x)
//                        console.log('y======' + y)
                        let mousePixPos = $('.penBtn select').find('option:selected').text().indexOf('x');
                        let mousePix = parseInt($('.penBtn select').find('option:selected').text().substring(0, mousePixPos));
//                        console.log(mousePix);
                        //插值后的圆的数组  25~35ms
                        let circleArray = that.drawCircle(x, y, mousePix);

                        let oldData;
                        let haveOrNot = false;
                        var delText = $('.delArea select').find('option:selected').text();

                        if (delText == '请选择') {
                            swal('操作失败', '请先选择您要移动的勾画线名称，再点击移动按钮', 'error');
                        } else {
                            $.when(that.getDataByKey(that.myDB.db, 'sketchDB_' + that.imageIdParent, 'sketch_z_' + that.zIndex)).done(function (data) {
                                oldData = data;
                                var pointArr = [];///鼠标圆圈与每个插值后的勾画线交点个数的数组
                                for (var i = 0; i < oldData.length; i++) {
                                    var sketchChazhiArr = that.interpolationByArray(oldData[i].value);//插值勾画线后的勾画线数组
                                    var interSectPoint = that.isIntersect(circleArray, sketchChazhiArr);//圆圈与勾画线之间的交点
                                    pointArr.push(interSectPoint.length);
                                }
                                document.onmousemove = function (e) {
                                    let startXM = e.pageX;
                                    let startYM = e.pageY;
                                    let disX = startXM - startX;
                                    let disY = startYM - startY;
                                    moveX = disX;
                                    moveY = disY;
                                    for (var i = 0; i < oldData.length; i++) {
                                        if (oldData[i].key == delText) {
                                            haveOrNot = true;////判断该层是否有对应名称的勾画线
                                            if (pointArr[i] > 0) {////判断交点个数是否大于0
                                                for (var j = 0; j < oldData[i].value.length; j++) {
                                                    var newNumY = oldData[i].value[j][1];
                                                    newNumY += disY;
                                                    oldData[i].value[j][1] = newNumY;
                                                    var newNumX = oldData[i].value[j][0];
                                                    newNumX += disX;
                                                    oldData[i].value[j][0] = newNumX;
                                                }
                                            }
                                        }
                                    }

                                    if (haveOrNot) {
                                        var box = document.getElementById('lineBoxZ');
                                        var context = box.getContext('2d');
                                        context.clearRect(0, 0, box.width, box.height);
                                        that.drawMoveLine(context, oldData);////重画移动后当前层的勾画线
                                    }
                                    startX = startXM;
                                    startY = startYM;
                                }
                                document.onmouseup = function () {
                                    document.onmousemove = null;
                                    document.onmouseup = null;
                                    if (Math.abs(moveX) > 0 || Math.abs(moveY) > 0) {
                                        var objLine = {
                                            id: 'sketch_z_' + that.zIndex,
                                            value: oldData
                                        };
                                        that.deleteDataByKey(that.myDB.db, 'sketchDB_' + that.imageIdParent, 'sketch_z_' + that.zIndex);
                                        that.addDBSingleData('sketchDB_' + that.imageIdParent, objLine);
                                    }
                                }
                            })
                        }
                    }
                }
            },
            activeLine(box) {
                var that = this;
                box.onmouseover = function (e) {
                    if (that.overActiveFlag) {//判断如果是勾画线可以激活的情况
                        let x = that.getPointOnCanvasforMove(box, e).x;
                        let y = that.getPointOnCanvasforMove(box, e).y;
                        let mousePixPos = $('.penBtn select').find('option:selected').text().indexOf('x');
                        let mousePix = parseInt($('.penBtn select').find('option:selected').text().substring(0, mousePixPos));
//                    console.log(mousePix);
                        //插值后的圆的数组  25~35ms
                        let circleArray = that.drawCircle(x, y, mousePix);
                        var ctx = box.getContext('2d');
//                    ctx.beginPath();
//                    for(var i=0;i<circleArray.length;i++){
//                       ctx.lineTo(circleArray[i][0],circleArray[i][1]);
//                    }
//                    ctx.strokeStyle='green';
//                    ctx.stroke();
//                    ctx.closePath();
                        var oldData = [];
                        var delText = $('.delArea select').find('option:selected').text();
                        if (delText == '请选择') {
                            return false;
                        } else {
                            let activeFlag = false;///是否有碰到相应的勾画线
//                            console.log('nochangepage=========' + that.noChangePage)
                            that.noChangePage = true;
//                            console.log('overerrerrrrrrrrrrrrrrrrrrrrrrr');
                            if (that.noChangePage) {//判断是否进行过翻页，默认true(没翻过)
                                $.when(that.getDataByKey(that.myDB.db, 'sketchDB_' + that.imageIdParent, 'sketch_z_' + that.zIndex)).done(function (data) {
                                    oldData = data;
                                    window.localStorage.setItem("thisData", JSON.stringify(data));
                                    document.onmousemove = function (e) {
                                        if (that.noChangePage) {
                                            let x = that.getPointOnCanvasforMove(box, e).x;
                                            let y = that.getPointOnCanvasforMove(box, e).y;
                                            let circleArray = that.drawCircle(x, y, mousePix);
                                            var pointArr = [];///鼠标圆圈与每个插值后的勾画线交点个数的数组
                                            for (var i = 0; i < oldData.length; i++) {
                                                var sketchChazhiArr = that.interpolationByArray(oldData[i].value);//插值勾画线后的勾画线数组
                                                var interSectPoint = that.isIntersect(circleArray, sketchChazhiArr);//圆圈与勾画线之间的交点
                                                pointArr.push(interSectPoint.length);
                                            }
                                            for (var i = 0; i < oldData.length; i++) {
                                                if (oldData[i].key == delText && pointArr[i] > 0) {
                                                    oldData[i].lineWidth = parseInt(oldData[i].lineWidth) + 1;//加粗选中的勾画线
                                                    activeFlag = true;
                                                }
                                            }
                                            if (activeFlag) {
                                                ctx.clearRect(0, 0, box.width, box.height);
                                                that.drawMoveLine(ctx, oldData);
                                                for (var i = 0; i < oldData.length; i++) {
                                                    if (oldData[i].key == delText && pointArr[i] > 0) {
                                                        oldData[i].lineWidth = parseInt(oldData[i].lineWidth) - 1;
                                                        activeFlag = false;
                                                    }
                                                }
                                                return;
                                            } else {
                                                var thisData = window.localStorage.getItem("thisData");
//                                    console.info(JSON.parse(thisData))
                                                ctx.clearRect(0, 0, box.width, box.height);
                                                that.drawMoveLine(ctx, JSON.parse(thisData));
                                            }
                                        }
                                    }
                                    document.onmouseout = function (e) {
                                        document.onmousemove = document.onmouseout = null;
                                    }
                                });
                            }
                        }
                    }
                }
            },
            drawMoveLine(context, data) {
                for (var i = 0; i < data.length; i++) {
                    var dashPos = 0;
                    context.beginPath();
                    context.lineWidth = data[i].lineWidth;
                    if (data[i].rules != 'none') {//判断是否选中不显示选项
                        for (var j = 0; j < data[i].value.length; j++) {
                            if (j == 0) {
                                context.moveTo(data[i].value[j][0], data[i].value[j][1]);
                            } else if (j == data[i].value.length - 1) {
                                context.lineTo(data[i].value[0][0], data[i].value[0][1]);
                            } else {
                                context.lineTo(data[i].value[j][0], data[i].value[j][1])
                            }
                        }
                    }
                    context.strokeStyle = data[i].color;
                    context.stroke();
                    context.closePath();
                    if (!data[i].rules) {
                        context.fillStyle = data[i].color;
                        context.fill();
                    }
                }
            },
            isIntersect(array_a, array_b) {
                let result = new Array();
                for (let i = 0; i < array_b.length; i++) {
                    for (var j = 0; j < array_a.length; j++) {
                        if (array_b[i].toString() == array_a[j].toString()) {
                            result.push(array_a[j])
                        }
                    }
                }
                //			console.log("array_a: " + array_a)
                //			console.log("array_b: " + array_b)
                return result;
            },
            getPointOnCanvasforMove(canvas, evt) {
                var bbox = canvas.getBoundingClientRect();
                return {
                    x: Math.round((evt.pageX - bbox.left) * (canvas.width / bbox.width)),
                    y: Math.round((evt.pageY - bbox.top) * (canvas.height / bbox.height))
                };
            },
            drawCircle(circle_x, circle_y, mousePix) {
                /*
                 * context.arc(x,y,r,sAngle,eAngle,counterclockwise);
                 * r	半径
                 * sAngle	起始角，以弧度计。（弧的圆形的三点钟位置是 0 度）。
                 * eAngle	结束角，以弧度计。360° = 2π
                 * counterclockwise	可选。规定应该逆时针还是顺时针绘图。False = 顺时针，true = 逆时针。
                 */
                var circleData = new Array();
                //从3点的位置顺时针取数据
                for (var i = 0; i < 360; i++) {
                    // 邻边=斜边*cos(弧度), 对边=斜边*sin(弧度), 弧度=角度*π/180
                    var x = Math.floor(circle_x + mousePix / 2 + (mousePix / 2) * (Math.cos(i * Math.PI / 180)));
                    var y = Math.floor(circle_y + mousePix / 2 + (mousePix / 2) * (Math.sin(i * Math.PI / 180)));
                    circleData.push([x, y])
                }
                //			console.log("圆弧数据长度为: " + circleData.size() + ", 数据为: " + circleData.values())
                return this.interpolationByArray(circleData);
            },
            /**
             * 整条勾画线插值: 此处插值返回的是环形的结果
             * @param {Object} arrayInput: 被插值的数组
             */
            interpolationByArray(arrayInput) {
                var that = this;
                let result = new Array(); // 返回的插值数组
                for (let i = 0; i < arrayInput.length - 1; i++) {
                    //interpolationPix()方法没有添加原始的勾画数组
                    result.push([arrayInput[i][0], arrayInput[i][1]])
                    //调用interpolationPix(x1, y1, x2, y2)
                    let foo = that.interpolationPix(arrayInput[i][0], arrayInput[i][1], arrayInput[i + 1][0], arrayInput[i + 1][1]);
                    for (let j = 0; j < foo.length; j++) {
                        result.push(foo[j])
                    }
                }
                //终点与起点做插值
                result.push.apply(result, that.interpolationPix(arrayInput[arrayInput.length - 1][0], arrayInput[arrayInput.length - 1][1], arrayInput[0][0], arrayInput[0][1]))
                //最后添加最后一个点的坐标
                //        result.push([arrayInput[arrayInput.length - 1][0], arrayInput[arrayInput.length - 1][1]])
                //			console.log("长度为: " + result.size() + ", 大数组数据: " + result.values())
                return result;
                //			return result.values();
            },
            /**
             * 插值, 数组push到interpolation数组里去
             * @param {Object} x1 第一个点的横坐标
             * @param {Object} y1 第一个点的纵坐标
             * @param {Object} x2 第二个点的横坐标
             * @param {Object} y2 第二个点的纵坐标
             */
            interpolationPix(x1, y1, x2, y2) {
                let result = new Array();
                /*
                 * 差值初始化数据
                 */
                let deltax; //ΔX 两点之间的横轴的差的绝对值
                let deltay; //ΔY 两点之间的纵轴的差的绝对值
                let i, j; //foo,中间变量
                let xl, xr, yl, yr, x, y; //xl xr yl yr加权的分子, x y 插值的x y的坐标点的值
                let h1, h2; // 权重
                //			console.log("---------------------*-----------------------: " + x1, y1, x2, y2)

                /*
                 * 差值计算
                 */
                //ΔX
                deltax = Math.abs(x1 - x2)
                //ΔY
                deltay = Math.abs(y1 - y2)
                //第一种情况,ΔX > ΔY,
                if (deltax >= deltay) {
                    if (x1 > x2) {
                        for (j = x1 - 1; j > x2; j--) {
                            xl = j - x1;
                            xr = j - x2;
                            h1 = xl / (x2 - x1);
                            h2 = xr / (x1 - x2);
                            y = Math.floor((h1 * y2 + h2 * y1) + 0.5);
                            x = j;
                            result.push([x, y]);
                        }
                    } else {
                        for (j = x1 + 1; j < x2; j++) {
                            xl = j - x1;
                            xr = j - x2;
                            h1 = xl / (x2 - x1);
                            h2 = xr / (x1 - x2);
                            y = Math.floor((h1 * y2 + h2 * y1) + 0.5);
                            x = j;
                            result.push([x, y]);
                        }
                    }
                } else {
                    if (y2 >= y1) {
                        for (i = y1 + 1; i < y2; i++) {
                            yl = i - y1;
                            yr = i - y2;
                            h1 = yl / (y2 - y1);
                            h2 = yr / (y1 - y2);
                            x = Math.floor((h1 * x2 + h2 * x1) + 0.5);
                            y = i;
                            result.push([x, y]);
                        }
                    } else {
                        for (i = y1 - 1; i > y2; i--) {
                            yl = i - y1;
                            yr = i - y2;
                            h1 = yl / (y2 - y1);
                            h2 = yr / (y1 - y2);
                            x = Math.floor((h1 * x2 + h2 * x1) + 0.5);
                            y = i;
                            result.push([x, y]);
                        }
                    }
                }
                //			console.log("////////////////////////////////////////////////////: " + result.size(), result.values())
                return result;
            },
            startGoing(paramFlag) {
                //0.手动勾画 2.平移 3.缩放 4.拖动勾画线 5.修正勾画线 1.窗宽窗位可变化
                var currentVal=$(event.target).text();
                $('#chooseCon').html(currentVal);

                if (paramFlag == 2) {
                    this.moveFlag = 2;
                    this.scaleFlag = 2;
                    $('#sectionId *').on('mouseover.MOVE', this.bindMove);//绑定平移功能
                    $('#sectionId *').off('.SCALE');//解绑缩放功能
                    var thisCanvas = document.getElementById('sectionId').getElementsByTagName('canvas');
                    for (var i = 0; i < thisCanvas.length; i++) {
                        thisCanvas[i].style.cursor = 'move';
                    }
//                    console.log('this.moveFlag888===' + this.moveFlag);
                    this.overActiveFlag = false;
                    return false;
                } else if (paramFlag == 3) {
                    this.scaleFlag = 3;
                    this.moveFlag = 3;
                    $('#sectionId *').on('mouseover.SCALE', this.bindScale);//绑定缩放功能
                    $('#sectionId *').off('.MOVE');//解绑平移功能
                    var thisCanvas = document.getElementById('sectionId').getElementsByTagName('canvas');
                    for (var i = 0; i < thisCanvas.length; i++) {
                        thisCanvas[i].style.cursor = 's-resize';
                    }
                    this.overActiveFlag = false;
                    return false;
                } else if (paramFlag == 1) {
                    this.moveFlag = 1;
                    this.scaleFlag = 1;
                    var that = this;
                    var thisCanvas = document.getElementById('sectionId').getElementsByTagName('canvas');
                    for (var i = 0; i < thisCanvas.length; i++) {
                        thisCanvas[i].style.cursor = 'default';
                    }
                    this.overActiveFlag = false;
                } else if (paramFlag == 0) {
                    this.moveFlag = 0;
                    this.scaleFlag = 0;
                    var that = this;
                    var thisCanvas = document.getElementById('sectionId').getElementsByTagName('canvas');
                    for (var i = 0; i < thisCanvas.length; i++) {
                        thisCanvas[i].style.cursor = 'url(static/img/mousePen8.ico),auto';
                    }
                    this.overActiveFlag = false;
                    $('.penBtn select').val(1);
                    this.initDrawSketch();//绑定mousedown的对应方法
                } else if (paramFlag == 4) {
                    this.moveFlag = 4;
                    this.scaleFlag = 4;
//                    alert('现在可以用↑ ↓ ← →键移动选中的勾画线了！');
//                    this.moveLine();
                    var thisCanvas = document.getElementById('sectionId').getElementsByTagName('canvas');
                    for (var i = 0; i < thisCanvas.length; i++) {
                        thisCanvas[i].style.cursor = 'url(static/img/mousePen16.ico),auto';
                    }
                    $('.penBtn select').val(2);
                    this.overActiveFlag = true;
                    this.moveCanvasLine();//绑定mousedown的对应方法
                } else if (paramFlag == 5) {
                    this.moveFlag = 5;
                    this.scaleFlag = 5;
                    var thisCanvas = document.getElementById('sectionId').getElementsByTagName('canvas');
                    for (var i = 0; i < thisCanvas.length; i++) {
                        thisCanvas[i].style.cursor = 'url(static/img/mousePen32.ico),auto';
                    }
                    $('.penBtn select').val(3);
                    this.overActiveFlag = true;
                    this.pushAndPull();//开始挤压外扩
                }
                $('#sectionId *').off('mouseover.MOVE', this.bindMove);//解绑平移功能
                $('#sectionId *').off('mouseover.SCALE', this.bindScale);//解绑缩放功能
                return false;
            },
            bindMove(e) {   //            绑定平移方法
                e.stopPropagation();
                var curObj = e.target.parentNode.parentNode.id;
                if (curObj == 'canvasBoxGrey' || curObj == 'canvasBoxGrey1' || curObj == 'canvasBoxGrey2') {
                    var parentObj = document.getElementById(curObj);
//                        var preParentObj=document.getElementById(parentObj.parentNode.id);
                    var parentObjWidth = parentObj.offsetWidth;
                    var parentObjHeight = parentObj.offsetHeight;
//                    var boxBorderObj=parentObj.parentNode.id;
//                    var boxBorderObjWidth=document.getElementById(boxBorderObj).offsetWidth;
//                    var boxBorderObjHeight=document.getElementById(boxBorderObj).offsetHeight;

                    var obj = parentObj.getElementsByTagName('div')[0];
                    if (this.moveFlag == 2) {
//                        console.log('hahahahhah===' + this.moveFlag);
                        this.moveObj(obj, parentObjWidth, parentObjHeight, 2);
                    }
                }
            },
            bindScale(e) {
                e.stopPropagation();
                var curObj = e.target.parentNode.parentNode.id;
                if (curObj == 'canvasBoxGrey' || curObj == 'canvasBoxGrey1' || curObj == 'canvasBoxGrey2') {
                    var parentObj = document.getElementById(curObj);
//                    var parentObj=document.getElementById(parentObj.parentNode.id);
                    var parentObjWidth = parentObj.offsetWidth;
                    var parentObjHeight = parentObj.offsetHeight;

//                    var boxBorderObj=parentObj.parentNode.id;
//                    var boxBorderObjWidth=document.getElementById(boxBorderObj).offsetWidth;
//                    var boxBorderObjHeight=document.getElementById(boxBorderObj).offsetHeight;

                    var obj = parentObj.getElementsByTagName('div')[0];
                    if (this.scaleFlag == 3) {
                        this.moveObj(obj, parentObjWidth, parentObjHeight, 3);
                    }
                }
            },
            moveObj(obj, parentObjWidth, parentObjHeight, scaleFlag) {
                console.log(parentObjWidth);
                var that = this;
                obj.onmousedown = function (e) {
                    if (that.moveFlag == 2 || that.moveFlag == 3) {
                        var e = e || window.event;
                        e.preventDefault();
                        var startX = e.pageX;
                        var startY = e.pageY;
                        var posX = this.offsetLeft;
                        var posY = this.offsetTop;
                        document.onmousemove = function (e) {
                            var e = e || window.event;
                            e.preventDefault();
                            var moveX = e.pageX;
                            var moveY = e.pageY;
                            var deltX = moveX - startX;
                            var deltY = moveY - startY;
                            var newPosX = posX + deltX;
                            var newPosY = posY + deltY;
                            //console.log('leftPx-----'+canvas.style.left);
                            if (scaleFlag == 3) {
                                if (that.scaleSize < 0) {
                                    that.scaleSize = 0;
                                    var currentScale = parseFloat((that.scaleSize / 100).toFixed(2));
                                } else if (that.scaleSize > 400) {
                                    that.scaleSize = 400;
                                    var currentScale = parseFloat((that.scaleSize / 100).toFixed(2));
                                } else {
//                                    console.log('deltY2222====' + deltY);
                                    that.scaleSize -= deltY;
                                    var currentScale = parseFloat((that.scaleSize / 100).toFixed(2));

                                    var nowScale = parseFloat((that.scaleSize / 100).toFixed(2));
//                                    @author:huzhibin
//                                //计算思想：1.先算出3层居中不动时dicomImageGrey的位置为left=50%-(obj.offsetWidth/2;
//                                          2.画出3层div的结构图，观察dicomImageGrey在当前位置上环能移动的距离范围（在boxBorderGrey这个框的可见区域内）;
//                                          3.计算得出结果可移动的范围在parentObjWidth*3/8-(obj.offsetWidth)/2-157.5 和 parentObjWidth*5/8+(obj.offsetWidth/2)-157.5
//                                          4.上述结果中的157.5正是obj.offsetWidth/2,所以上述的结果最小值为parentObjWidth*3/8-obj.offsetWidth,最大值为parentObjWidth*5/8;
//                                          5.由于要在可视区域内可平移所以上述的最小值应+obj.offsetWidth/10，最大值应-obj.offsetWidth/10；
//                                          6.上下平移同理可得。最后由三元运算符得出以下结果：
//                                    newPosX=newPosX<=(parentObjWidth*3/8-((obj.offsetWidth)/2+137.5)*(nowScale+1))?(parentObjWidth*3/8-((obj.offsetWidth)/2+137.5)*(nowScale+1)):newPosX>=(parentObjWidth*5/8+((obj.offsetWidth/2)-177.5)*(nowScale+1))?(parentObjWidth*5/8+((obj.offsetWidth/2)-177.5)*(nowScale+1)):newPosX;
                                    newPosX = newPosX <= (parentObjWidth * 3 / 8 - obj.offsetWidth * 9 / 10 * (nowScale + 1)) ? (parentObjWidth * 3 / 8 - obj.offsetWidth * 9 / 10 * (nowScale + 1)) : newPosX >= (parentObjWidth * 5 / 8 - obj.offsetWidth / 10 * (nowScale + 1)) ? (parentObjWidth * 5 / 8 - obj.offsetWidth / 10 * (nowScale + 1)) : newPosX;
//                                    newPosX=newPosX<=(parentObjWidth*3/8-obj.offsetWidth*(9/10)-(1/2)*nowScale*obj.offsetWidth)?(parentObjWidth*3/8-obj.offsetWidth*(9/10)-(1/2)*nowScale*obj.offsetWidth):newPosX>=(parentObjWidth*5/8-20+(1/2)*nowScale*obj.offsetWidth)?(parentObjWidth*5/8-20+(1/2)*nowScale*obj.offsetWidth):newPosX;
                                    newPosY = newPosY <= (parentObjHeight * 3 / 8 - obj.offsetHeight * 9 / 10 * (nowScale + 1)) ? (parentObjHeight * 3 / 8 - obj.offsetHeight * 9 / 10 * (nowScale + 1)) : newPosY >= (parentObjHeight * 5 / 8 - obj.offsetHeight / 10 * (nowScale + 1)) ? (parentObjHeight * 5 / 8 - obj.offsetHeight / 10 * (nowScale + 1)) : newPosY;
                                    obj.style.left = newPosX + 'px';
                                    obj.style.top = newPosY + 'px';
                                    obj.style.marginLeft = 0;
                                    obj.style.marginTop = 0;
                                }
//                                console.log('currentScale===' + currentScale);
                                obj.style.transform = 'scale(' + (1 + currentScale) + ')';
                                obj.style.transformOrigin = '0 0';

                                startX = moveX;
                                startY = moveY;

                                posX = newPosX;
                                posY = newPosY;
                            } else {
                                /////放大4倍后的位移限制：不小于1倍時的x再減去放大后寬度的一半，同理其他；
                                var nowScale = parseFloat((that.scaleSize / 100).toFixed(2));
//                                console.log('nowScale==='+nowScale);
                                newPosX = newPosX <= (parentObjWidth * 3 / 8 - obj.offsetWidth * 9 / 10 * (nowScale + 1)) ? (parentObjWidth * 3 / 8 - obj.offsetWidth * 9 / 10 * (nowScale + 1)) : newPosX >= (parentObjWidth * 5 / 8 - obj.offsetWidth / 10 * (nowScale + 1)) ? (parentObjWidth * 5 / 8 - obj.offsetWidth / 10 * (nowScale + 1)) : newPosX;
//                                newPosX=newPosX<=(parentObjWidth*3/8-obj.offsetWidth*(9/10)-(1/2)*nowScale*obj.offsetWidth)?(parentObjWidth*3/8-obj.offsetWidth*(9/10)-(1/2)*nowScale*obj.offsetWidth):newPosX>=(parentObjWidth*5/8-20+(1/2)*nowScale*obj.offsetWidth)?(parentObjWidth*5/8-20+(1/2)*nowScale*obj.offsetWidth):newPosX;
                                newPosY = newPosY <= (parentObjHeight * 3 / 8 - obj.offsetHeight * 9 / 10 * (nowScale + 1)) ? (parentObjHeight * 3 / 8 - obj.offsetHeight * 9 / 10 * (nowScale + 1)) : newPosY >= (parentObjHeight * 5 / 8 - obj.offsetHeight / 10 * (nowScale + 1)) ? (parentObjHeight * 5 / 8 - obj.offsetHeight / 10 * (nowScale + 1)) : newPosY;
//
                                obj.style.left = newPosX + 'px'
                                obj.style.top = newPosY + 'px';
                                obj.style.marginLeft = 0;
                                obj.style.marginTop = 0;
                                startX = moveX;
                                startY = moveY;
                                posX = newPosX;
                                posY = newPosY;
                            }
                        }
                        document.onmouseup = function () {
                            //document.onmousedown=null;
                            console.log('scaleSize==================================' + that.scaleSize);
                            document.onmousemove = null;
                            document.onmouseup = null;

                        }
                    }
                }
            },
            initDrawSketch() {
                var that = this;
                var box = document.getElementById('lineBoxZ');
                var context = box.getContext('2d');

                that.startDrawOrganLine = function (e) {
                    e.preventDefault();
                    that.canvasTop = that.distanceTop('lineBoxZ') - $('.app-content-view')[0].scrollTop;
                    that.canvasLeft = that.distanceLeft('lineBoxZ') - $('.app-content-view')[0].scrollLeft;

                    var posX1 = $('.penBtn select').find('option:selected').text().indexOf('x');
                    that.drawPosX = parseInt($('.penBtn select').find('option:selected').text().substring(0, posX1)) / 2;
                    that.drawPosY = that.drawPosX;
                    var delVal = $('.delArea select').find('option:selected').val();
                    if (that.moveFlag != 0 && that.scaleFlag != 0) {
                        return;
                    } else {
                        if (delVal == '-1') {
                            swal('操作失败', '请选择勾画线名称！', 'error');
                            return;
                        } else {
                            var roiName = $('.delArea select').find('option:selected').text();
                        }
                    }
                    var boxWidth = parseInt(box.style.width);
                    var boxHeight = parseInt(box.style.height);

                    var lastStatus = context.getImageData(0, 0, boxWidth, boxHeight)

                    var haveDrawRoi = 'sketch_z_' + that.zIndex + '-' + roiName;


                    //获取勾画线颜色
                    var lineColor = $('.colorShow select').val();
                    //获取勾画线粗细
                    var lineWidth = parseInt($('.boldShow select').val()) || 1;
                    //获取勾画结果是线或者面
                    var drawResult = $('.twoShow select').val();
                    var rules = drawResult == 'line' ? true : drawResult == 'none' ? 'none' : false;
                    //获取面的透明度
                    var opacityValue = parseInt($('.opacityControl input').val());
                    var faceOpacity = rules == false ? opacityValue : 100;
                    if (!rules) {
                        //把rgb颜色值转换成rgba颜色值
                        var lineColorArr = lineColor.split('(');
                        var rgba = lineColorArr[0] + 'a';
                        lineColorArr.splice(0, 1, rgba);
                        var lineColorArrStr = lineColorArr.join('(');
                        var lineColorArrO = lineColorArrStr.split(')');
                        var rgbaO = lineColorArrO[0] + ',' + faceOpacity / 100;
                        lineColorArrO.splice(0, 1, rgbaO);
                        var rgbaStr = lineColorArrO.join(')');
//                        console.log('rgbaStr==' + rgbaStr);
                    }
                    var addlengthX = 0, addlengthY = 0;
                    //存勾画线的数组
                    var a = new Array();

                    e = e || window.event;
                    var ox = Math.round((e.pageX - that.canvasLeft + that.drawPosX) / (that.scaleSize / 100 + 1));
                    var oy = Math.round((e.pageY - that.canvasTop + that.drawPosY) / (that.scaleSize / 100 + 1));

                    context.beginPath();
                    context.lineWidth = lineWidth;
                    context.moveTo(ox, oy);

                    a.push([ox, oy])

                    document.onmousemove = function (e) {
                        e.preventDefault();
                        var ox1 = Math.round((e.pageX - that.canvasLeft + that.drawPosX) / (that.scaleSize / 100 + 1));
                        var oy1 = Math.round((e.pageY - that.canvasTop + that.drawPosY) / (that.scaleSize / 100 + 1));

                        context.lineTo(ox1, oy1);

                        if (!rules) {
                            context.strokeStyle = rgbaStr;//如果是面
                        } else {
                            context.strokeStyle = lineColor;//如果是线
                        }
                        context.stroke();
                        a.push([ox1, oy1]);
                        var bbox = box.getBoundingClientRect();
                    }

                    document.onmouseup = function () {

                        document.onmousemove = document.onmouseup = null;
                        context.lineTo(ox, oy);
                        //如果是闭环,加这句,如果不是,则不需要加
                        context.closePath();
                        //通过此函数将以上绘制的图形绘制到画布上
                        context.stroke();
                        if (!rules) {
                            context.fillStyle = rgbaStr;
                            context.fill();
                        }


                        if (a.length > 1) {
//                            $.when(that.getDataByKey(that.myDB.db,'sketchDB_'+that.imageIdParent,'sketch_z_'+that.zIndex)).done(function(oldData){
//                                var drawFlag=false;
//                                for(var i=0;i<oldData.length;i++){
//                                    if(oldData[i].key==roiName){
//                                        drawFlag=true;///判断在同一张上是否已勾画过同一个器官ROI
//                                    }
//                                }
//                                if(drawFlag){
//                                    context.putImageData(lastStatus, 0, 0);
//                                    console.log('在当前张数上已勾画过同一个roiName的勾画线');
//                                }else{
                            $.when(that.getDataByKey(that.myDB.db, 'sketchDB_' + that.imageIdParent, 'sketch_z_' + that.zIndex)).done(function (oldData) {//如果已有勾画数据就取出勾画数据
                                var newA = {
                                    key: roiName,
                                    value: a,
                                    color: rules == true ? lineColor : rgbaStr,
                                    lineWidth: lineWidth,
                                    haveDrawRoi: haveDrawRoi,
                                    rules: rules
                                }

                                oldData.push(newA);//把新的勾画线数据存入已有的勾画线数据数组中
                                var objLine = {
                                    id: 'sketch_z_' + that.zIndex,
                                    value: oldData
                                }
//                                console.log('000');
//                                console.log(oldData);
                                that.deleteDataByKey(that.myDB.db, 'sketchDB_' + that.imageIdParent, 'sketch_z_' + that.zIndex);//删除这条已有的勾画线数据
                                that.addDBSingleData('sketchDB_' + that.imageIdParent, objLine);//把新增数据和老数据同时重新加进该表中


                            });

//                                }
//                            });
                        }
                    }

                }

                box.onmousedown = that.startDrawOrganLine;


            },
            //改变笔的大小
            changePensize(e) {
                var penSize = $(e.target).val();
                if (penSize == 6) {
                    penSize = 16 * 8;
                } else if (penSize == 1) {
                    penSize = 8;
                } else {
                    penSize = 16 * (penSize - 1)
                }
                this.drawPosX = penSize / 2;
                this.drawPosY = penSize / 2;
                $('canvas#lineBoxZ').css({
                    'cursor': 'url(static/img/mousePen' + penSize + '.ico),auto'
                });
            },
            /////复制勾画线的功能
            copyLine() {
                var delText = $('.delArea select').find('option:selected').text();
                var that = this;
                if (delText == '请选择') {
                    swal('操作失败', '请先选择要复制的勾画线名称', 'error');
                    return;
                } else {
                    $.when(that.getDataByKey(that.myDB.db, 'sketchDB_' + that.imageIdParent, 'sketch_z_' + that.zIndex)).done(function (data) {
                        var copyObj = {
                            keyName: '',
                            lineArr: []
                        };
                        copyObj.keyName = delText;
                        for (var i = 0; i < data.length; i++) {
                            if (data[i].key == delText) {
                                copyObj.lineArr.push(JSON.stringify(data[i]));
                            }
                        }
                        window.localStorage.setItem("copyLine", JSON.stringify(copyObj));
                    });
                }
            },
            /////展示删除框中选中的勾画线
            showCurrentLine(e) {
                this.$store.state.storeOrganType = this.organType
                var thisText = $(e.target).find('option:selected').text();
                if (thisText == "请选择") {

                    $('.colorShow select').val('rgb(255,0,0)');//红色
                    $('.boldShow select').val('1');
                    $('.twoShow select').val('line');
                    $('.opacityControl input').val('30');
                    $('.opacityControl input').attr('disabled', 'disabled');
                } else {
                    if (thisText != '肾' && thisText != '脊髓' && thisText != '肝' && thisText != '肺' && thisText!='心脏') {
                        $('#autoDraw').attr('disabled', 'disabled');
                    } else {
                        $('#autoDraw').removeAttr('disabled');
                    }
                    $.when(this.fetchStoreByCursorbydelName(this.myDB.db, 'sketchDB_' + this.imageIdParent, thisText)).done(function (data) {
                        $('.boldShow select').val(data.lineWidth);
                        var twoShowValue = data.rules == true ? 'line' : data.rules == false ? 'face' : "none";
                        if (data.rules == false) {
                            if (data.color.indexOf('rgba') > -1) {
                                //把rgba转换成rgb颜色值
                                var setColorArr = data.color.split('');
                                setColorArr.splice(3, 1);
                                var setColorArrStr = setColorArr.join('');
                                var setColorO = setColorArrStr.split(',');
                                var Opa = setColorO.splice(setColorO.length - 1, 1);
                                var setColorStr = setColorO.join(',');
                                setColorStr += ')';
                                var OpaNum = (Opa[0].replace(/\)/g, '')) * 100;

                                $('.colorShow select').val(setColorStr);//红色
                                $('.opacityControl input').val(OpaNum);
                                $('.opacityControl input').removeAttr('disabled');
                            }
                        } else if (data.rules == true) {
                            $('.colorShow select').val(data.color);
                            $('.opacityControl input').attr('disabled', 'disabled').val('30');
                        } else {
                            $('.colorShow select').val(data.color);
                            $('.opacityControl input').attr('disabled', 'disabled').val('30');
                        }
                        $('.twoShow select').val(twoShowValue);

                    });
                }
                $(e.target).blur();
            },
            //利用游标遍历数据库中的表
            fetchStoreByCursorbydelName(db, storeName, delName) {
                var transaction = db.transaction(storeName);
                var store = transaction.objectStore(storeName);
                var request = store.openCursor();
                var defer = $.Deferred();

                request.onsuccess = function (e) {
                    var cursor = e.target.result;
//                    console.log('搜索与删除框中同名的勾画线并获取其特性');
                    if (cursor) {
                        for (var j = 0; j < cursor.value.value.length; j++) {
                            if (cursor.value.value[j].key == delName) {
                                var curShow = {};
                                curShow.color = cursor.value.value[j].color;
                                curShow.lineWidth = cursor.value.value[j].lineWidth;
                                curShow.rules = cursor.value.value[j].rules;
//                                console.dir(curShow)
                                defer.resolve(curShow);
                            }
                        }
                        cursor.continue();
                    }
                };
                return defer.promise();
            },
            /**
             * 按key删除数据
             */
            deleteDataByKey(db, storeName, value) {
                var transaction = db.transaction(storeName, 'readwrite');
                var store = transaction.objectStore(storeName);
                store.delete(value);
            },
            fetchStoreByCursorforDownload(db, storename) {
                var store = db.transaction(storename, 'readwrite').objectStore(storename);
                var request = store.openCursor();//db为IDBDatabase对象
                var defer = $.Deferred();
                var allImageDataNum = this.imageParams.width + this.imageParams.height + this.imageParams.fileNum;
                var count = 0;
                request.onsuccess = function (e) {
                    var cursor = e.target.result;
                    if (cursor) {//必须要检查
                        count++;
                        cursor.continue();//遍历了存储对象中的所有内容
                    }
                    if (!cursor) {
//                        console.log(count + '游标开始查询' + allImageDataNum)
                        if (count == allImageDataNum) {
                            defer.resolve(true);
                        } else {
                            defer.reject(false);
                        }
                    }
                };
                return defer.promise();
            },
            fetchStoreByCursorforRemoveRoi(db, storeName, roiName) {
                var transaction = db.transaction(storeName);
                var store = transaction.objectStore(storeName);
                var request = store.openCursor();
                var defer = $.Deferred();
                var that = this;

                request.onsuccess = function (e) {
                    var cursor = e.target.result;
                    if (cursor) {
                        for (var i = 0; i < cursor.value.value.length; i++) {
                            if (cursor.value.value[i].key == roiName) {
                                var thisKey = cursor.key;
                                $.when(that.getDataByKey(that.myDB.db, 'sketchDB_' + that.imageIdParent, thisKey)).done(function (oldData) {
//                                    console.log(oldData);
//                                    console.log('oldData');
                                    for (var j = 0; j < oldData.length; j++) {
                                        if (oldData[j].key == roiName) {
                                            oldData.splice(j, 1);
                                            j = j - 1;
                                        }
                                    }
                                    that.deleteDataByKey(that.myDB.db, 'sketchDB_' + that.imageIdParent, thisKey);//删除旧数据
                                    var objLine = {
                                        id: thisKey,
                                        value: oldData
                                    }
                                    that.addDBSingleData('sketchDB_' + that.imageIdParent, objLine);//重新添加该条数据
                                    if (thisKey == 'sketch_z_' + that.zIndex) {
                                        defer.resolve(true);
                                    }

                                });

                            }
                        }

                        cursor.continue();
                    }

                };
                return defer.promise();
            },
            fetchStoreByCursorforFinalData(db, storeName) {
                var transaction = db.transaction(storeName);
                var store = transaction.objectStore(storeName);
                var request = store.openCursor();
                var defer = $.Deferred();
                var that = this;
                var mapData = {
                    imageId: this.imageIdParent,
                    sketchData: []
                };
                request.onsuccess = function (e) {
                    var cursor = e.target.result;
                    if (cursor) {
                        var Singlesketch = {};
                        Singlesketch[cursor.key] = cursor.value;
                        mapData.sketchData.push(Singlesketch);
                        cursor.continue();
                    }
                    if (!cursor) {
                        defer.resolve(mapData);
                    }
                };
                return defer.promise();
            },
            fetchStoreByCursorforCompare(db, storeName) {
                var transaction = db.transaction(storeName);
                var store = transaction.objectStore(storeName);
                var request = store.openCursor();
                var defer = $.Deferred();
                var that = this;
                var mapData = {
                    imageId: this.imageIdParent,
                    sketchData: []
                }
                request.onsuccess = function (e) {
                    var cursor = e.target.result;
                    if (cursor) {
//                        console.log(cursor.value);
                        if (JSON.stringify(cursor.value.value) != JSON.stringify(cursor.value.storeValue)) {
                            var Singlesketch = {};
                            Singlesketch[cursor.key] = cursor.value;
                            mapData.sketchData.push(Singlesketch);
                        }
                        cursor.continue();
                    }
                    if (!cursor) {
                        defer.resolve(mapData);
                    }
                };
                return defer.promise();
            },
            saveSketchData() {
                var that = this;
                $('#saveSketch').attr('disabled', 'disabled');
                ///先判断是否点击过保存按钮
                $.when(this.getDataByKeyforstoreValue(this.myDB.db, 'sketchDB_' + this.imageIdParent, 'sketch_z_0')).done(function (data) {
//                    console.log('uuuuuuuuuu=======' + data);
                    if (data == undefined) {///这种条件下没有点击过保存按钮，就把所有db中的勾画数据发送到后台接口
                        $.when(that.fetchStoreByCursorforFinalData(that.myDB.db, 'sketchDB_' + that.imageIdParent)).done(function (data) {///获取DB中的所有勾画数据
//                            console.log('保存成功！11111111111111');
                            var passData = {
                                imageId: data.imageId,
                                sketchData: JSON.stringify(data.sketchData)
                            }
//                            console.log(passData);
                            Sketch.saveSketchData(passData).then(res => {
                                $('#saveSketch').removeAttr('disabled');
                                for (var i = 0; i < that.imageParams.fileNum; i++) {
                                    that.updateDataByKey(that.myDB.db, 'sketchDB_' + that.imageIdParent, 'sketch_z_' + i);///更新DB中的数据新增storeValue字段,用于对比勾画线是否变化
                                }
                                that.updateDataByKey(that.myDB.db, 'sketchDB_' + that.imageIdParent, 'sketch_z_namelist');
                                var resultCode = res.data.code;
                                var resultMsg = res.data.msg;
//                                console.log('resultCode:' + resultCode)
//                                console.log('resultMsg:' + resultMsg)
                                if (resultCode > 0) {
                                    swal(resultMsg, '勾画数据保存成功', 'success');
                                } else {
                                    if (resultMsg != undefined) {
                                        swal(resultMsg, '勾画数据保存失败', 'error');
                                    } else {
                                        swal("保存失败", '勾画数据保存失败', 'error');
                                    }
                                }
                            })
                        });
                    } else {///否则只发送修改过的数据到后台接口
                        $.when(that.fetchStoreByCursorforCompare(that.myDB.db, 'sketchDB_' + that.imageIdParent)).done(function (data) {///对比db中的哪些数据发生了改变，只发送改变的数据
//                            console.log('保存成功！2222222222');
                            if (data.sketchData.length === 0) {
                                swal('提示', '您还没有做任何修改，无需保存！', 'warning');
                                $('#saveSketch').removeAttr('disabled');
                            } else {
                                var passData = {
                                    imageId: data.imageId,
                                    sketchData: JSON.stringify(data.sketchData)
                                }
//                                console.log(passData);
                                Sketch.saveSketchData(passData).then(res => {
                                    $('#saveSketch').removeAttr('disabled');
                                    for (var i = 0; i < that.imageParams.fileNum; i++) {
                                        that.updateDataByKey(that.myDB.db, 'sketchDB_' + that.imageIdParent, 'sketch_z_' + i);///更新DB中的数据新增storeValue字段,用于对比勾画线是否变化
                                    }
                                    that.updateDataByKey(that.myDB.db, 'sketchDB_' + that.imageIdParent, 'sketch_z_namelist');
                                    var resultCode = res.data.code;
                                    if (resultCode > 0) {
                                        swal(res.data.msg, '勾画数据保存成功', 'success');
                                    } else {
                                        swal(res.data.msg, '勾画数据保存失败', 'error');
                                    }
                                })
                            }
                        });
                    }
                });

            },
            getSketchData(imageId) {
                var defer = $.Deferred();
                this.clearObjectStore(this.myDB.db, 'sketchDB_' + imageId);
                Sketch.querySketchData(imageId).then(res => {
                    console.log('rrrrrrrrrrrrrrrrrrrrrrr');
                    console.log(res);
                    //创建存储勾画线名称的一条数据
//                  console.log('res.data.data.SketchNameList');
//                  console.log(res.data.data.SketchNameList);
//                  console.log('res.data.data.SketchNameList');
                    if (res.data.data.SketchNameList == "" || res.data.data.SketchNameList == null || res.data.data.SketchNameList.length == 0) {
                        var namelistObj = {
                            id: "sketch_z_namelist",
                            value: [
                                {isAuto: false, name: '肾', val: 0},
                                {isAuto: false, name: '脊髓', val: 1},
                                {isAuto: false, name: '肝', val: 2},
                                {isAuto: false, name: '肺', val: 3},
                                {isAuto: false, name: '心脏', val: 4}
                            ]
                        }
                    } else {
                        var namelistObj = {
                            id: 'sketch_z_namelist',
                            value: eval(res.data.data.SketchNameList)
                        }
                    }
                    this.addDBSingleData('sketchDB_' + this.imageIdParent, namelistObj);//把勾画线名称列表从数据库放到DB中
                  //获取z切面勾画数据
                  for (var i = 0; i < res.data.data.sketchData.length; i++) {///把勾画线数据从数据库放到DB中
                        var thisValue = res.data.data.sketchData[i].value.value;
                        if (thisValue) {
                            for (var j = 0; j < thisValue.length; j++) {
                                thisValue[j].value = eval(thisValue[j].value);
                            }
                            var sketchLineObj = {
                                id: res.data.data.sketchData[i].key,
                                value: thisValue
                            }
                        } else {
                            var sketchLineObj = {
                                id: res.data.data.sketchData[i].key,
                                value: []
                            }
                        }
                        this.addDBSingleData('sketchDB_' + this.imageIdParent, sketchLineObj);
                    }
                    //创造X切面空勾画数据
                    for(var i=0;i<this.imageParams.width;i++){
                       var sketchLineObjX={
                         id:'sketch_x_'+i,
                         value:[]
                       }
                      this.addDBSingleData('sketchDB_' + this.imageIdParent, sketchLineObjX);
                    }
                  //创造Y切面空勾画数据
                  for(var i=0;i<this.imageParams.height;i++){
                    var sketchLineObjY={
                      id:'sketch_y_'+i,
                      value:[]
                    }
                    this.addDBSingleData('sketchDB_' + this.imageIdParent, sketchLineObjY);
                  }
                    defer.resolve(true);
                })
                return defer.promise();
            },
            clearObjectStore(db, storeName) {
                var transaction = db.transaction(storeName, 'readwrite');
                var store = transaction.objectStore(storeName);
                store.clear();
            },
            updateDataByKey(db, storeName, value) {
                var transaction = db.transaction(storeName, 'readwrite');
                var store = transaction.objectStore(storeName);
                var request = store.get(value);
                request.onsuccess = function (e) {
                    var resultObj = e.target.result;
//                    student.age=35;
                    resultObj.storeValue = resultObj.value;
                    store.put(resultObj);
                };
            },
            addSketchROI() {
                if ($('#roiName').attr('disabled') == 'disabled') {
                    $('#roiName').removeAttr('disabled').focus();
                    return;
                }

                //roiName赋值
                var roiInput = $.trim($('#roiName').val());
                if (roiInput == '') {
                    swal('操作失败', '请输入勾画线名称', 'error');
                    return false;
                } else {
                    var isOrNotHave = false;
                    for (var i = 0; i < $('.delArea select').find('option').length; i++) {
                        if ($('.delArea select').find('option').eq(i).text() == roiInput) {
                            isOrNotHave = true;
                            swal('操作失败', '您输入的勾画线名称在下述列表中已存在，请选择或修改！', 'error');
                            return false;
                        }
                    }
                    if (!isOrNotHave) {
                        if (roiInput == '肾') {
                            var nameOption = "<option value='0'>" + roiInput + "</option>";
                        } else if (roiInput == '脊髓') {
                            var nameOption = "<option value='1'>" + roiInput + "</option>";
                        } else if (roiInput == '肝') {
                            var nameOption = "<option value='2'>" + roiInput + "</option>";
                        } else if (roiInput == '肺') {
                            var nameOption = "<option value='3'>" + roiInput + "</option>";
                        }else if (roiInput == '心脏') {
                            var nameOption = "<option value='4'>" + roiInput + "</option>";
                        } else {
                            var nameOption = "<option>" + roiInput + "</option>";
                        }
                        $('.delArea select').find('option').eq(0).after(nameOption);
                        var that = this;
                        $.when(this.getDataByKey(this.myDB.db, 'sketchDB_' + this.imageIdParent, 'sketch_z_namelist')).done(function (data) {
                            that.nameObj.value = [];
                            for (var i = 0; i < data.length; i++) {
                                that.nameObj.value.push(data[i]);
                            }
                            if (roiInput == '肾') {
                                var nameObjnew = {
                                    isAuto: false,
                                    name: roiInput,
                                    val: 0
                                }
                            } else if (roiInput == '脊髓') {
                                var nameObjnew = {
                                    isAuto: false,
                                    name: roiInput,
                                    val: 1
                                }
                            } else if (roiInput == '肝') {
                                var nameObjnew = {
                                    isAuto: false,
                                    name: roiInput,
                                    val: 2
                                }
                            } else if (roiInput == '肺') {
                                var nameObjnew = {
                                    isAuto: false,
                                    name: roiInput,
                                    val: 3
                                }
                            } else if (roiInput == '心脏') {
                              var nameObjnew = {
                                isAuto: false,
                                name: roiInput,
                                val: 4
                              }
                            } else {
                                var nameObjnew = {
                                    isAuto: false,
                                    name: roiInput
                                };
                            }
                            that.nameObj.value.push(nameObjnew);
                            that.deleteDataByKey(that.myDB.db, 'sketchDB_' + that.imageIdParent, 'sketch_z_namelist');
                            that.addDBSingleData('sketchDB_' + that.imageIdParent, that.nameObj);
                            $('#roiName').val('');
                        });
                    }
                }
                //恢复初始设置
//                $('.colorShow select').val('rgb(255,0,0)');//红色
//                $('.boldShow select').val('1');
//                $('.twoShow select').val('line');
//                $('.opacityControl input').val('30');
//                $('.opacityControl input').attr('disabled','disabled');
            },
            removeRoi() {
                var that = this;
                var thisVal = $('.delArea select').val();
                if (thisVal == '-1') {
                    swal('操作失败', '请选择要删除的勾画线名称', 'error');
                    return false;
                } else {
                    var thisText = $('.delArea select').find('option:selected').text();
                    swal({
                        type: 'warning',
                        title: '确定要删除吗?',
                        text: '点击确认后可执行彻底删除',
                        showCancelButton: true,
                        cancelButtonText: '取消',
                        confirmButtonText: '确认',
                        confirmButtonColor: '#DD6B55',
                        showLoaderOnConfirm: true,
                        closeOnConfirm: true
                    }, confirmed => {
                        if (confirmed) {
                            //先删除勾画线名称列表中的这个值
                            for (var i = 0; i < $('.delArea select').find('option').length; i++) {
                                if ($('.delArea select').find('option').eq(i).text() == thisText) {
                                    $('.delArea select').find('option').eq(i).remove();
                                }
                            }
                            //删除后台数据
                            Sketch.deleteSketchLine(this.imageIdParent, thisText).then(res => {
//                                console.log('res=====================================================')
//                                console.log(res)
                                var resultCode = res.data.code;
                                if (resultCode > 0) {
                                    swal(res.data.msg, '勾画数据删除成功', 'success');
                                } else {
                                    swal(res.data.msg, '勾画数据删除失败', 'error');
                                }
                            })
                            //再删除数据库中的勾画数据
                            $.when(this.fetchStoreByCursorforRemoveRoi(this.myDB.db, 'sketchDB_' + this.imageIdParent, thisText)).done(function (data) {
                                if (data) {
                                    that.backDrawPageLine(that.zIndex); //重新绘制当前张数的勾画线
                                }
                            })
                            //删除namelist中的这个值
                            $.when(that.getDataByKey(that.myDB.db, 'sketchDB_' + that.imageIdParent, 'sketch_z_namelist')).done(function (data) {
                                for (var i = 0; i < data.length; i++) {
                                    if (data[i].name == thisText) {
                                        data.splice(i, 1);
                                        i = i - 1;
                                    }
                                }
                                that.deleteDataByKey(that.myDB.db, 'sketchDB_' + that.imageIdParent, 'sketch_z_namelist');//删除旧数据
                                var entry_map_data = {
                                    id: 'sketch_z_namelist',
                                    value: data
                                }
                                that.addDBSingleData('sketchDB_' + that.imageIdParent, entry_map_data);//添加修改后的数据
                            });
                        }
                    });
                }
            },
            repeal() {
                var that = this;
                $.when(this.getDataByKey(this.myDB.db, 'sketchDB_' + this.imageIdParent, 'sketch_z_' + this.zIndex)).done(function (oldData) {//如果已有勾画数据就取出勾画数据
                    var delSelectText = $('.delArea select').find('option:selected').text();
//                    console.log('delSelectText=========' + delSelectText);
                    if (delSelectText != '请选择') {//判断删除框中是否有值，如果有就只删除指定名称的勾画线
//                        console.log("oldData.length====" + oldData.length);
                        for (var i = 0; i < oldData.length; i++) {
                            if (oldData[i].key == delSelectText && oldData[i].sketchRoiId == undefined) {
                                oldData.splice(i, 1);
                                i = i - 1;
                            }
                        }
                        var objLine = {
                            id: 'sketch_z_' + that.zIndex,
                            value: oldData
                        }
//                        console.log('000000000000000000000');
//                        console.log(oldData);
                        that.deleteDataByKey(that.myDB.db, 'sketchDB_' + that.imageIdParent, 'sketch_z_' + that.zIndex);//删除这条已有的勾画线数据
                        that.addDBSingleData('sketchDB_' + that.imageIdParent, objLine);//把删除最后一步后的数据再重新加进该表中


                        that.backDrawPageLine(that.zIndex); //重新绘制当前张数的勾画线
                    }


                });
            },
            backDrawPageLine(pageIndex) {
                var box = document.getElementById('lineBoxZ');
                var context = box.getContext('2d');
                $.when(this.getDataByKey(this.myDB.db, 'sketchDB_' + this.imageIdParent, 'sketch_z_' + pageIndex)).done(function (data) {
                    context.clearRect(0, 0, box.width, box.height);
                    for (var i = 0; i < data.length; i++) {
                        var dashPos = 0;
                        context.beginPath();
                        context.lineWidth = data[i].lineWidth;
                        for (var j = 0; j < data[i].value.length; j++) {
//                            if(data[i].value.indexOf('dash')==-1){//判断该数组是否为虚线数组
                            if (j == 0) {
                                context.moveTo(data[i].value[j][0], data[i].value[j][1]);
                            } else if (j == data[i].value.length - 1) {
                                context.lineTo(data[i].value[0][0], data[i].value[0][1]);
                            } else {
                                context.lineTo(data[i].value[j][0], data[i].value[j][1])
                            }
//                            }else{
//                                if(j==0){
//                                    context.moveTo(data[i].value[j][0],data[i].value[j][1]);
//                                }else if(j==data[i].value.length-1){
//                                    context.lineTo(data[i].value[0][0],data[i].value[0][1]);
//                                }else{
//                                    if(data[i].value[j].indexOf('dash')>-1){
//                                        var dashIndex=data[i].value[j].indexOf('dash',dashPos)
//                                        dashPos=dashIndex+1;
//                                        context.moveTo(data[i].value[j+1][0],data[i].value[j+1][1]);
//                                    }else{
//                                        context.lineTo(data[i].value[j][0],data[i].value[j][1])
//                                    }
//                                }
//                            }
                        }
                        context.strokeStyle = data[i].color;
                        context.stroke();
                        context.closePath();
                        if (!data[i].rules) {
                            context.fillStyle = data[i].color;
                            context.fill();
                        }
                    }
                });
            },
            ///滚轮滚动时执行的函数:重新绘制之前的勾画好的数据
            backDrawLine(pageIndex) {
                var that = this;
                $.when(this.getDataByKey(this.myDB.db, 'sketchDB_' + this.imageIdParent, 'sketch_z_' + pageIndex)).done(function (data) {
//                    console.log(data);
//                    console.log(111111);
                    var lineName = $('.delArea select').val();
                    if (data.length > 0) {//如果勾画线下拉框中有没有值
                        that.backDrawLineAction(data);
                    }
                }).fail(function (data) {
//                    console.log('fail=====')
//                    console.log(data)
                });
            },
          backDrawLineX(pageIndex) {
            var that = this;
            $.when(this.getDataByKey(this.myDB.db, 'sketchDB_' + this.imageIdParent, 'sketch_x_' + pageIndex)).done(function (data) {
//                    console.log(data);
              var lineName = $('.delArea select').val();
              if (data.length > 0) {//如果勾画线下拉框中有没有值
                that.backDrawLineActionX(data);
              }
            }).fail(function (data) {
//                    console.log('fail=====')
//                    console.log(data)
            });
          },
          backDrawLineY(pageIndex) {
            var that = this;
            $.when(this.getDataByKey(this.myDB.db, 'sketchDB_' + this.imageIdParent, 'sketch_y_' + pageIndex)).done(function (data) {
//                    console.log(data);
              var lineName = $('.delArea select').val();
              if (data.length > 0) {//如果勾画线下拉框中有没有值
                that.backDrawLineActionY(data);
              }
            }).fail(function (data) {
//                    console.log('fail=====')
//                    console.log(data)
            });
          },
            backDrawLineAction(data) {
                var box = document.getElementById('lineBoxZ');
                var context = box.getContext('2d');
                for (var i = 0; i < data.length; i++) {
                    var dashPos = 0;
                    context.beginPath();
                    context.lineWidth = data[i].lineWidth;
                    if (data[i].rules != 'none') {//判断是否选中不显示选项
                        for (var j = 0; j < data[i].value.length; j++) {
                            if (j == 0) {
                                context.moveTo(data[i].value[j][0], data[i].value[j][1]);
                            } else if (j == data[i].value.length - 1) {
                                context.lineTo(data[i].value[0][0], data[i].value[0][1]);
                            } else {
                                context.lineTo(data[i].value[j][0], data[i].value[j][1])
                            }
                        }
                    }
                    context.strokeStyle = data[i].color;
                    context.stroke();
                    context.closePath();
                    if (!data[i].rules) {
                        context.fillStyle = data[i].color;
                        context.fill();
                    }
                }
            },
          backDrawLineActionX(data) {
            var box = document.getElementById('lineBoxX');
            var context = box.getContext('2d');
            for (var i = 0; i < data.length; i++) {
              var dashPos = 0;
              context.beginPath();
              context.lineWidth = data[i].lineWidth;
              if (data[i].rules != 'none') {//判断是否选中不显示选项
                for (var j = 0; j < data[i].value.length; j++) {
                  if (j == 0) {
                    context.moveTo(data[i].value[j][0], data[i].value[j][1]);
                  } else if (j == data[i].value.length - 1) {
                    context.lineTo(data[i].value[0][0], data[i].value[0][1]);
                  } else {
                    context.lineTo(data[i].value[j][0], data[i].value[j][1])
                  }
                }
              }
              context.strokeStyle = data[i].color;
              context.stroke();
              context.closePath();
              if (!data[i].rules) {
                context.fillStyle = data[i].color;
                context.fill();
              }
            }
          },
          backDrawLineActionY(data) {
            var box = document.getElementById('lineBoxY');
            var context = box.getContext('2d');
            for (var i = 0; i < data.length; i++) {
              var dashPos = 0;
              context.beginPath();
              context.lineWidth = data[i].lineWidth;
              if (data[i].rules != 'none') {//判断是否选中不显示选项
                for (var j = 0; j < data[i].value.length; j++) {
                  if (j == 0) {
                    context.moveTo(data[i].value[j][0], data[i].value[j][1]);
                  } else if (j == data[i].value.length - 1) {
                    context.lineTo(data[i].value[0][0], data[i].value[0][1]);
                  } else {
                    context.lineTo(data[i].value[j][0], data[i].value[j][1])
                  }
                }
              }
              context.strokeStyle = data[i].color;
              context.stroke();
              context.closePath();
              if (!data[i].rules) {
                context.fillStyle = data[i].color;
                context.fill();
              }
            }
          },
            cursorUpdateDataColor(db, storename, key, newValue, i) {
                //通过游标更新记录db为IDBDatabase对象,storename为存储空间名称
                var store = db.transaction(storename, 'readwrite').objectStore(storename);
                var request = store.openCursor();
                request.onsuccess = function (e) {
                    var cursor = e.target.result, value, updateRequest;
                    if (cursor) {//必须要检查
                        if (cursor.key == key) {
//                            console.log('-------游标开始更新------------')
                            value = cursor.value;
                            value.value[i] = newValue;
                            updateRequest = cursor.update(value);
                            updateRequest.onsuccess = function () {
//                                console.log('----------------游标更新成功-----------');
                            }
                        } else {
                            cursor.continue();
                        }
                    }

                }
            },
            //利用游标遍历数据库中的表,如果和删除框中的值相同就更新(颜色color)
            fetchStoreByCursorByroiNameforColor(db, storeName, roiName, color, opacity) {
                var transaction = db.transaction(storeName);
                var store = transaction.objectStore(storeName);
                var request = store.openCursor();
                var defer = $.Deferred();
                var that = this;
                request.onsuccess = function (e) {
                    var cursor = e.target.result;
                    if (cursor) {
                        if (cursor.value.value.length > 0) {
                            for (var i = 0; i < cursor.value.value.length; i++) {
                                if (roiName == cursor.value.value[i].key) {
//                                    console.log('haha===hehe' + cursor.key);
                                    var curColor = cursor.value.value[i].color;
                                    if (curColor.indexOf('rgba') > -1) {
                                        var curColorArr = curColor.split(',');
                                        var curColorO = curColorArr[curColorArr.length - 1];
                                        var curColorOstr = ',' + curColorO;
//                                        console.log(color);
                                        var nowColorArr = color.split('');
//                                        console.log(color);
//                                        console.log(nowColorArr);
                                        nowColorArr.splice(nowColorArr.length - 1, 1, curColorOstr);
                                        nowColorArr.splice(3, 0, 'a');
                                        var nowColor = nowColorArr.join('');
                                    } else {
                                        var nowColor = color;
                                    }
                                    var valueIObj = {
                                        key: cursor.value.value[i].key,
                                        haveDrawRoi: cursor.value.value[i].haveDrawRoi,
                                        lineWidth: cursor.value.value[i].lineWidth,
                                        rules: cursor.value.value[i].rules,
                                        value: cursor.value.value[i].value,
                                        color: nowColor
                                    }
//                                    that.cursorUpdateDataColor(that.myDB.db, 'sketchDB_' + that.imageIdParent, cursor.key, valueIObj, i);
                                    cursor.value.value.splice(i,1,valueIObj);
                                    var objLine={
                                        id:cursor.key,
                                        value:cursor.value.value
                                    }
                                    that.deleteDataByKey(that.myDB.db, 'sketchDB_'+that.imageIdParent, cursor.key);//删除这一张的数据
                                    that.addDBSingleData('sketchDB_'+that.imageIdParent,objLine);//重新添加这一张的勾画数据
                                }
                            }
                        }
                        cursor.continue();
                    }
                    defer.resolve(true);
                };
                return defer.promise();
            },
            changeColor(e) {
                var delValue = $('.delArea select').find('option:selected').text();
                var thisColor = $(e.target).val();
                var faceOpacity = $('.opacityControl input').val();
                if (delValue != '请选择') {
                    var that = this;
                    var box = document.getElementById('lineBoxZ');
                    var context = box.getContext('2d');
                    var boxX = document.getElementById('lineBoxX');
                    var contextX = boxX.getContext('2d');
                    var boxY = document.getElementById('lineBoxY');
                    var contextY = boxY.getContext('2d');
                    $.when(that.fetchStoreByCursorByroiNameforColor(that.myDB.db, 'sketchDB_' + that.imageIdParent, delValue, thisColor, faceOpacity)).done(function (data) {
                        //重画z切面当前张数下的数据
                        $.when(that.getDataByKey(that.myDB.db, 'sketchDB_' + that.imageIdParent, 'sketch_z_' + that.zIndex)).done(function (data) {
                            context.clearRect(0, 0, box.width, box.height);
                            console.log('z切面开始改变颜色了');
//                            console.log(data);
                            for (var i = 0; i < data.length; i++) {
                                var dashPos = 0;
                                context.beginPath();
                                context.lineWidth = data[i].lineWidth;
                                if (data[i].rules != "none") {//判断是否选中不显示选项
                                    for (var j = 0; j < data[i].value.length; j++) {
                                        if (j == 0) {
                                            context.moveTo(data[i].value[j][0], data[i].value[j][1]);
                                        } else if (j == data[i].value.length - 1) {
                                            context.lineTo(data[i].value[0][0], data[i].value[0][1]);
                                        } else {
                                            context.lineTo(data[i].value[j][0], data[i].value[j][1])
                                        }
                                    }
                                }
                                if (data[i].key == delValue) {
                                    context.strokeStyle = thisColor;
                                } else {
                                    context.strokeStyle = data[i].color;
                                }
                                context.stroke();
                                context.closePath();
                                if (!data[i].rules) {
                                    if (data[i].key == delValue) {
                                        //把rgb颜色值转换成rgba颜色值
                                        var lineColorArr = thisColor.split('(');
                                        var rgba = lineColorArr[0] + 'a';
                                        lineColorArr.splice(0, 1, rgba);
                                        var lineColorArrStr = lineColorArr.join('(');
                                        var lineColorArrO = lineColorArrStr.split(')');
                                        var rgbaO = lineColorArrO[0] + ',' + faceOpacity / 100;
                                        lineColorArrO.splice(0, 1, rgbaO);
                                        var rgbaStr = lineColorArrO.join(')');

                                        context.fillStyle = rgbaStr;
                                    } else {
                                        context.fillStyle = data[i].color;
                                    }
                                    context.fill();
                                }
                            }
                        });
                      //重画x切面当前张数下的数据
                      $.when(that.getDataByKey(that.myDB.db, 'sketchDB_' + that.imageIdParent, 'sketch_x_' + that.xIndex)).done(function (data) {
                        contextX.clearRect(0, 0, boxX.width, boxX.height);
                        console.log('X切面开始改变颜色了');
//                            console.log(data);
                        for (var i = 0; i < data.length; i++) {
                          var dashPos = 0;
                          contextX.beginPath();
                          contextX.lineWidth = data[i].lineWidth;
                          if (data[i].rules != "none") {//判断是否选中不显示选项
                            for (var j = 0; j < data[i].value.length; j++) {
                              if (j == 0) {
                                contextX.moveTo(data[i].value[j][0], data[i].value[j][1]);
                              } else if (j == data[i].value.length - 1) {
                                contextX.lineTo(data[i].value[0][0], data[i].value[0][1]);
                              } else {
                                contextX.lineTo(data[i].value[j][0], data[i].value[j][1])
                              }
                            }
                          }
                          if (data[i].key == delValue) {
                            contextX.strokeStyle = thisColor;
                          } else {
                            contextX.strokeStyle = data[i].color;
                          }
                          contextX.stroke();
                          contextX.closePath();
                          if (!data[i].rules) {
                            if (data[i].key == delValue) {
                              //把rgb颜色值转换成rgba颜色值
                              var lineColorArr = thisColor.split('(');
                              var rgba = lineColorArr[0] + 'a';
                              lineColorArr.splice(0, 1, rgba);
                              var lineColorArrStr = lineColorArr.join('(');
                              var lineColorArrO = lineColorArrStr.split(')');
                              var rgbaO = lineColorArrO[0] + ',' + faceOpacity / 100;
                              lineColorArrO.splice(0, 1, rgbaO);
                              var rgbaStr = lineColorArrO.join(')');

                              contextX.fillStyle = rgbaStr;
                            } else {
                              contextX.fillStyle = data[i].color;
                            }
                            contextX.fill();
                          }
                        }
                      });
                      //重画y切面当前张数下的数据
                      $.when(that.getDataByKey(that.myDB.db, 'sketchDB_' + that.imageIdParent, 'sketch_y_' + that.yIndex)).done(function (data) {
                        contextY.clearRect(0, 0, boxY.width, boxY.height);
                        console.log('y切面开始改变颜色了');
//                            console.log(data);
                        for (var i = 0; i < data.length; i++) {
                          var dashPos = 0;
                          contextY.beginPath();
                          contextY.lineWidth = data[i].lineWidth;
                          if (data[i].rules != "none") {//判断是否选中不显示选项
                            for (var j = 0; j < data[i].value.length; j++) {
                              if (j == 0) {
                                contextY.moveTo(data[i].value[j][0], data[i].value[j][1]);
                              } else if (j == data[i].value.length - 1) {
                                contextY.lineTo(data[i].value[0][0], data[i].value[0][1]);
                              } else {
                                contextY.lineTo(data[i].value[j][0], data[i].value[j][1])
                              }
                            }
                          }
                          if (data[i].key == delValue) {
                            contextY.strokeStyle = thisColor;
                          } else {
                            contextY.strokeStyle = data[i].color;
                          }
                          contextY.stroke();
                          contextY.closePath();
                          if (!data[i].rules) {
                            if (data[i].key == delValue) {
                              //把rgb颜色值转换成rgba颜色值
                              var lineColorArr = thisColor.split('(');
                              var rgba = lineColorArr[0] + 'a';
                              lineColorArr.splice(0, 1, rgba);
                              var lineColorArrStr = lineColorArr.join('(');
                              var lineColorArrO = lineColorArrStr.split(')');
                              var rgbaO = lineColorArrO[0] + ',' + faceOpacity / 100;
                              lineColorArrO.splice(0, 1, rgbaO);
                              var rgbaStr = lineColorArrO.join(')');

                              contextY.fillStyle = rgbaStr;
                            } else {
                              contextY.fillStyle = data[i].color;
                            }
                            contextY.fill();
                          }
                        }
                      });
                    });//改变其他张数下的同一roiName的颜色

                }
            },
            //利用游标遍历数据库中的表,如果和删除框中的值相同就更新(粗细lineWidth)
            fetchStoreByCursorByroiNameforWidth(db, storeName, roiName, width, showStyle) {
                var transaction = db.transaction(storeName);
                var store = transaction.objectStore(storeName);
                var request = store.openCursor();
                var defer = $.Deferred();
                var that = this;
                request.onsuccess = function (e) {
                    var cursor = e.target.result;
                    if (cursor) {
                        if (cursor.value.value.length > 0) {
                            for (var i = 0; i < cursor.value.value.length; i++) {
                                if (roiName == cursor.value.value[i].key) {
//                                    console.log('haha===hehe' + cursor.key);
                                    if (showStyle == 'line' || showStyle == "none") {
                                        var valueIObj = {
                                            key: cursor.value.value[i].key,
                                            haveDrawRoi: cursor.value.value[i].haveDrawRoi,
                                            lineWidth: width,
                                            rules: cursor.value.value[i].rules,
                                            value: cursor.value.value[i].value,
                                            color: cursor.value.value[i].color
                                        }
                                        cursor.value.value.splice(i, 1, valueIObj);
                                        var objLine = {
                                            id: cursor.key,
                                            value: cursor.value.value
                                        }
                                        that.deleteDataByKey(that.myDB.db, 'sketchDB_' + that.imageIdParent, cursor.key);//删除这一张的数据
                                        that.addDBSingleData('sketchDB_' + that.imageIdParent, objLine);//重新添加这一张的勾画数据
                                    }
                                    if (cursor.key == 'sketch_z_' + that.zIndex) {
                                        defer.resolve(true);
                                    }
                                }
                            }
                        }
                        cursor.continue();
                    }

                };
                return defer.promise();
            },
            //改变线条粗细
            changeWidth(e) {
                var delValue = $('.delArea select').find('option:selected').text();
                var thisWidth = parseInt($(e.target).val());
                var thisShow = $('.twoShow select').val();
                var that = this;
                $(e.target).css('font-size', thisWidth * 9 + 'px');//改变下拉框中线的粗细显示
                if (delValue != '请选择') {
                    var box = document.getElementById('lineBoxZ');
                    var context = box.getContext('2d');
                    $.when(that.fetchStoreByCursorByroiNameforWidth(that.myDB.db, 'sketchDB_' + that.imageIdParent, delValue, thisWidth, thisShow)).done(function (data) {
                        //重画当前张数下的数据
                        $.when(that.getDataByKey(that.myDB.db, 'sketchDB_' + that.imageIdParent, 'sketch_z_' + that.zIndex)).done(function (data) {
                            context.clearRect(0, 0, box.width, box.height);
                            console.log('开始改变粗细了');
//                            console.log(data);
                            for (var i = 0; i < data.length; i++) {
                                var dashPos = 0;
                                context.beginPath();
                                if (data[i].key == delValue && thisShow == 'line') {
                                    context.lineWidth = thisWidth;
                                } else {
                                    context.lineWidth = data[i].lineWidth;
                                }
                                if (data[i].rules != "none") {//判断是否选中不显示选项
                                    for (var j = 0; j < data[i].value.length; j++) {
                                        //                                    if(data[i].value.indexOf('dash')==-1){//判断该数组是否为虚线数组
                                        if (j == 0) {
                                            context.moveTo(data[i].value[j][0], data[i].value[j][1]);
                                        } else if (j == data[i].value.length - 1) {
                                            context.lineTo(data[i].value[0][0], data[i].value[0][1]);
                                        } else {
                                            context.lineTo(data[i].value[j][0], data[i].value[j][1])
                                        }
                                        //                                    }else{
                                        //                                        if(j==0){
                                        //                                            context.moveTo(data[i].value[j][0],data[i].value[j][1]);
                                        //                                        }else if(j==data[i].value.length-1){
                                        //                                            context.lineTo(data[i].value[0][0],data[i].value[0][1]);
                                        //                                        }else{
                                        //                                            if(data[i].value[j].indexOf('dash')>-1){
                                        //                                                var dashIndex=data[i].value[j].indexOf('dash',dashPos)
                                        //                                                dashPos=dashIndex+1;
                                        //                                                context.moveTo(data[i].value[j+1][0],data[i].value[j+1][1]);
                                        //                                            }else{
                                        //                                                context.lineTo(data[i].value[j][0],data[i].value[j][1])
                                        //                                            }
                                        //                                        }
                                        //                                    }
                                    }
                                }
                                context.strokeStyle = data[i].color;
                                context.stroke();
                                context.closePath();
                                if (!data[i].rules) {
                                    context.fillStyle = data[i].color;
                                    context.fill();
                                }
                            }
                        });
                    });//改变其他张数下的同一roiName的颜色

                }
            },
            //利用游标遍历数据库中的表,如果和删除框中的值相同就更新(显示line/face)
            fetchStoreByCursorByroiNameforShow(db, storeName, roiName, showStyle, faceOpacity) {
                var transaction = db.transaction(storeName);
                var store = transaction.objectStore(storeName);
                var request = store.openCursor();
                var defer = $.Deferred();
                var that = this;
                request.onsuccess = function (e) {
                    var cursor = e.target.result;
                    if (cursor) {
                        if (cursor.value.value.length > 0) {
                            for (var i = 0; i < cursor.value.value.length; i++) {
                                if (roiName == cursor.value.value[i].key) {
//                                    console.log('haha===hehe' + cursor.key);
                                    var rulesValue = showStyle == 'line' ? true : showStyle == "face" ? false : "none";
                                    var lineColor = cursor.value.value[i].color;
                                    if (showStyle == 'face') {
                                        //把rgb颜色值转换成rgba颜色值
                                        if (lineColor.indexOf('rgba') == -1) {
                                            var lineColorArr = lineColor.split('(');
                                            var rgba = lineColorArr[0] + 'a';
                                            lineColorArr.splice(0, 1, rgba);
                                            var lineColorArrStr = lineColorArr.join('(');
                                            var lineColorArrO = lineColorArrStr.split(')');
                                            var rgbaO = lineColorArrO[0] + ',' + faceOpacity / 100;
                                            lineColorArrO.splice(0, 1, rgbaO);
                                            var rgbaStr = lineColorArrO.join(')');

                                            var finalColor = rgbaStr;
                                        } else {
                                            var finalColor = lineColor;
                                        }
                                    } else if (showStyle == 'line') {
                                        //把rgba转换成rgb颜色值
                                        if (lineColor.indexOf('rgba') > -1) {
                                            var setColorArr = lineColor.split('');
                                            setColorArr.splice(3, 1);
                                            var setColorArrStr = setColorArr.join('');
                                            var setColorO = setColorArrStr.split(',');
                                            var Opa = setColorO.splice(setColorO.length - 1, 1);
                                            var setColorStr = setColorO.join(',');
                                            setColorStr += ')';

                                            var finalColor = setColorStr;
                                        } else {
                                            var finalColor = lineColor;
                                        }
                                    } else {
                                        var finalColor = lineColor;
                                    }

                                    var valueIObj = {
                                        key: cursor.value.value[i].key,
                                        haveDrawRoi: cursor.value.value[i].haveDrawRoi,
                                        lineWidth: cursor.value.value[i].lineWidth,
                                        rules: rulesValue,
                                        value: cursor.value.value[i].value,
                                        color: finalColor
                                    }
                                    cursor.value.value.splice(i, 1, valueIObj);
                                    var objLine = {
                                        id: cursor.key,
                                        value: cursor.value.value
                                    }
                                    that.deleteDataByKey(that.myDB.db, 'sketchDB_' + that.imageIdParent, cursor.key);//删除这一张的数据
                                    that.addDBSingleData('sketchDB_' + that.imageIdParent, objLine);//重新添加这一张的勾画数据
                                    if (cursor.key == 'sketch_z_' + that.zIndex) {
                                        defer.resolve(true);
                                    }
                                }
                            }
                        }
                        cursor.continue();
                    }

                };
                return defer.promise();
            },
            //改变显示方式：线或面（line/face）
            changeShow(e) {
                var delValue = $('.delArea select').find('option:selected').text();
                var thisShow = $(e.target).val();
                var faceOpacity = $('.opacityControl input').val();
                var that = this;
                if (thisShow == 'face') {
                    $('.opacityControl input').removeAttr('disabled');
                } else {
                    $('.opacityControl input').attr('disabled', 'disabled');
                }
                if (delValue != '请选择') {
                    var box = document.getElementById('lineBoxZ');
                    var context = box.getContext('2d');
                    $.when(that.fetchStoreByCursorByroiNameforShow(that.myDB.db, 'sketchDB_' + that.imageIdParent, delValue, thisShow, faceOpacity)).done(function (data) {
                        //重画当前张数下的数据
                        $.when(that.getDataByKey(that.myDB.db, 'sketchDB_' + that.imageIdParent, 'sketch_z_' + that.zIndex)).done(function (data) {
                            context.clearRect(0, 0, box.width, box.height);
                            console.log('开始改变线面了');
//                            console.log(data);
                            for (var i = 0; i < data.length; i++) {
                                var dashPos = 0;
                                context.beginPath();
                                context.lineWidth = data[i].lineWidth;
                                if (data[i].rules != "none") {//判断是否选中不显示选项
                                    for (var j = 0; j < data[i].value.length; j++) {
//                                    if(data[i].value.indexOf('dash')==-1){//判断该数组是否为虚线数组
                                        if (j == 0) {
                                            context.moveTo(data[i].value[j][0], data[i].value[j][1]);
                                        } else if (j == data[i].value.length - 1) {
                                            context.lineTo(data[i].value[0][0], data[i].value[0][1]);
                                        } else {
                                            context.lineTo(data[i].value[j][0], data[i].value[j][1])
                                        }

//                                    }else{
//                                        if(j==0){
//                                            context.moveTo(data[i].value[j][0],data[i].value[j][1]);
//                                        }else if(j==data[i].value.length-1){
//                                            context.lineTo(data[i].value[0][0],data[i].value[0][1]);
//                                        }else{
//                                            if(data[i].value[j].indexOf('dash')>-1){
//                                                var dashIndex=data[i].value[j].indexOf('dash',dashPos)
//                                                dashPos=dashIndex+1;
//                                                context.moveTo(data[i].value[j+1][0],data[i].value[j+1][1]);
//                                            }else{
//                                                context.lineTo(data[i].value[j][0],data[i].value[j][1])
//                                            }
//                                        }
//                                    }
                                    }
                                }
                                context.closePath();
                                if (data[i].key == delValue) {
                                    if (thisShow == 'line') {
                                        var lineColor = data[i].color;
                                        if (lineColor.indexOf('rgba') > -1) {
                                            //把rgba转换成rgb颜色值
                                            var setColorArr = lineColor.split('');
                                            setColorArr.splice(3, 1);
                                            var setColorArrStr = setColorArr.join('');
                                            var setColorO = setColorArrStr.split(',');
                                            var Opa = setColorO.splice(setColorO.length - 1, 1);
                                            var setColorStr = setColorO.join(',');
                                            setColorStr += ')';

                                            context.strokeStyle = setColorStr;
                                            context.stroke();
                                        } else {
//                                            console.log('data[i].color===lineColor===' + lineColor);
                                            context.strokeStyle = lineColor;
                                            context.stroke();
                                        }

                                        $('.opacityControl input').attr('disabled', 'disabled')

                                    } else if (thisShow == 'face') {
                                        var lineColor = data[i].color;
                                        //把rgb颜色值转换成rgba颜色值
                                        if (lineColor.indexOf('rgba') == -1) {
                                            var lineColorArr = lineColor.split('(');
                                            var rgba = lineColorArr[0] + 'a';
                                            lineColorArr.splice(0, 1, rgba);
                                            var lineColorArrStr = lineColorArr.join('(');
                                            var lineColorArrO = lineColorArrStr.split(')');
                                            var rgbaO = lineColorArrO[0] + ',' + faceOpacity / 100;
                                            lineColorArrO.splice(0, 1, rgbaO);
                                            var rgbaStr = lineColorArrO.join(')');
//                                            console.log('rgbaStr===' + rgbaStr);
                                            var finalColorStr = rgbaStr;
                                            context.fillStyle = finalColorStr;
                                            context.fill();
                                        } else {
                                            context.fillStyle = lineColor;
                                            context.fill();
                                        }

                                        $('.opacityControl input').removeAttr('disabled');
                                    }
                                } else {

                                    if (data[i].rules == false) {
                                        var lineColor = data[i].color;
                                        context.fillStyle = lineColor;
                                        context.fill();
                                    } else {
                                        context.strokeStyle = data[i].color;
                                        context.stroke();
                                    }

                                }

                            }
                        });
                    });

                }
            },
            //利用游标遍历数据库中的表,如果和删除框中的值相同就更新(透明度opacity)
            fetchStoreByCursorByroiNameforOpacity(db, storeName, roiName, opacity) {
                var transaction = db.transaction(storeName);
                var store = transaction.objectStore(storeName);
                var request = store.openCursor();
                var defer = $.Deferred();
                var that = this;
                request.onsuccess = function (e) {
                    var cursor = e.target.result;
                    if (cursor) {
                        if (cursor.value.value.length > 0) {
                            for (var i = 0; i < cursor.value.value.length; i++) {
                                if (roiName == cursor.value.value[i].key) {
//                                    console.log('haha===hehe' + cursor.key);
                                    var faceColor = cursor.value.value[i].color;
                                    var opacityDot = opacity / 100 + ')';
                                    var faceColorArr = faceColor.split(',');
                                    faceColorArr.splice(faceColorArr.length - 1, 1, opacityDot);
                                    var finalColor = faceColorArr.join(',');
//                                    console.log('fianlCOlor==' + finalColor);
                                    var valueIObj = {
                                        key: cursor.value.value[i].key,
                                        haveDrawRoi: cursor.value.value[i].haveDrawRoi,
                                        lineWidth: cursor.value.value[i].lineWidth,
                                        rules: cursor.value.value[i].rules,
                                        value: cursor.value.value[i].value,
                                        color: finalColor
                                    }
                                    cursor.value.value.splice(i, 1, valueIObj);
                                    var objLine = {
                                        id: cursor.key,
                                        value: cursor.value.value
                                    }
                                    that.deleteDataByKey(that.myDB.db, 'sketchDB_' + that.imageIdParent, cursor.key);//删除这一张的数据
                                    that.addDBSingleData('sketchDB_' + that.imageIdParent, objLine);//重新添加这一张的勾画数据
                                    if (cursor.key == 'sketch_z_' + that.zIndex) {
                                        defer.resolve(true);
                                    }
                                }
                            }
                        }
                        cursor.continue();
                    }

                };
                return defer.promise();
            },
            //改变透明度(opacity)fetchStoreByCursorByroiNameforOpacity(db,storeName,roiName,opacity)
            changeOpacity(e) {
                var delValue = $('.delArea select').find('option:selected').text();
                var faceOpacity = $(e.target).val();
                var that = this;
                if (delValue != '请选择') {
                    var box = document.getElementById('lineBoxZ');
                    var context = box.getContext('2d');
                    $.when(that.fetchStoreByCursorByroiNameforOpacity(that.myDB.db, 'sketchDB_' + that.imageIdParent, delValue, faceOpacity)).done(function (data) {
                        //重画当前张数下的数据
                        $.when(that.getDataByKey(that.myDB.db, 'sketchDB_' + that.imageIdParent, 'sketch_z_' + that.zIndex)).done(function (data) {
                            context.clearRect(0, 0, box.width, box.height);
                            console.log('开始改变透明度了');
//                            console.log(data);
                            for (var i = 0; i < data.length; i++) {
                                var dashPos = 0;
                                context.beginPath();
                                context.lineWidth = data[i].lineWidth;
                                for (var j = 0; j < data[i].value.length; j++) {
//                                    if(data[i].value.indexOf('dash')==-1){//判断该数组是否为虚线数组
                                    if (j == 0) {
                                        context.moveTo(data[i].value[j][0], data[i].value[j][1]);
                                    } else if (j == data[i].value.length - 1) {
                                        context.lineTo(data[i].value[0][0], data[i].value[0][1]);
                                    } else {
                                        context.lineTo(data[i].value[j][0], data[i].value[j][1])
                                    }
//                                    }else{
//                                        if(j==0){
//                                            context.moveTo(data[i].value[j][0],data[i].value[j][1]);
//                                        }else if(j==data[i].value.length-1){
//                                            context.lineTo(data[i].value[0][0],data[i].value[0][1]);
//                                        }else{
//                                            if(data[i].value[j].indexOf('dash')>-1){
//                                                var dashIndex=data[i].value[j].indexOf('dash',dashPos)
//                                                dashPos=dashIndex+1;
//                                                context.moveTo(data[i].value[j+1][0],data[i].value[j+1][1]);
//                                            }else{
//                                                context.lineTo(data[i].value[j][0],data[i].value[j][1])
//                                            }
//                                        }
//                                    }
                                }

                                context.closePath();
                                if (data[i].key == delValue) {
//                                    console.log('data[i].color====' + data[i].color);
                                    var faceColor = data[i].color;
                                    var opacityDot = faceOpacity / 100 + ')';
                                    var faceColorArr = faceColor.split(',');
                                    faceColorArr.splice(faceColorArr.length - 1, 1, opacityDot);
                                    var finalColor = faceColorArr.join(',');

                                    context.fillStyle = finalColor;
                                    context.fill();

                                    $('.opacityControl input').removeAttr('disabled');
                                } else {
                                    if (data[i].rules == false) {
                                        var lineColor = data[i].color;
                                        context.fillStyle = lineColor;
                                        context.fill();

                                        $('.opacityControl input').removeAttr('disabled');
                                    } else {
                                        context.strokeStyle = data[i].color;
                                        context.stroke();
                                        $('.opacityControl input').attr('disabled', 'disabled')
                                    }
                                }

                            }
                        });
                    });
                }

            },
            fetchStoreByCursorforAuto(db, storeName, type) {
                var transaction = db.transaction(storeName);
                var store = transaction.objectStore(storeName);
                var request = store.openCursor();
                var defer = $.Deferred();
                var that = this;
                var count = 0;
                var allOrganDataNum = this.imageParams.fileNum;
                request.onsuccess = function (e) {
                    var cursor = e.target.result;
                    if (cursor) {
                        if (cursor.value.id.indexOf('organ_' + type) > -1) {
                            count++;
//                            console.log(cursor.value);
                        }
                        cursor.continue();
                    }
                    if (!cursor) {
//                        console.log(count)
//                        console.log('count---------------' + count);
                        if (count == allOrganDataNum) {
                            defer.resolve(true);
                        } else {
                            defer.reject(false);
                        }
                    }
                }
                return defer.promise();
            },
            fetchStoreByCursorforMoveData(db, storeName, type) {
                var transaction = db.transaction(storeName);
                var store = transaction.objectStore(storeName);
                var request = store.openCursor();
                var defer = $.Deferred();
                var that = this;
                request.onsuccess = function (e) {
                    var cursor = e.target.result;
                    if (cursor) {
                        if (cursor.value.id.indexOf('organ_' + type) > -1) {
//                            console.log(cursor.value.id);
//                            console.log(cursor.value.value);

                        }
                        cursor.continue();
                    }
                    if (!cursor) {
                        defer.resolve(true);
                    }
                }
                return defer.promise();
            },
            //自动勾画
            startDraw() {
                var Vue = this;
                var organDB = 'organDB_' + Vue.imageIdParent;
                var type = $('.delArea select').val();
                var text = $('.delArea select').find('option:selected').text();
                var curHtml = $('.delArea select').find('option:selected');
                var autoFlag = (curHtml.html() + '').indexOf('<i></i>') == -1 ? false : true;
                var organIndex = 'organ_' + type + '_' + Vue.zIndex;
                $('#autoDraw').hide();
                $('#cancelAutoDraw').show();
                Vue.clickFlag=true;
                ////判断库是否有存入数据
                if (autoFlag) {
                    swal('操作失败', '您已自动勾画过该器官，若想再次勾画请删除后重新添加', 'error');
                    return false;
                } else if (text == '请选择') {
                    swal('操作失败', '请选择要自动勾画的勾画线名称', 'error');
                    return false;
                } else {
                    tooltipZS.style.display = 'block';
                    tooltipZE.style.display = 'none';
                    Vue.xStart = 0;
                    Vue.yStart = 0;
                    Vue.xEnd = 0;
                    Vue.yEnd = 0;
                    //鼠标点击事件
                    var xStart = 0;
                    var yStart = 0;
                    var xEnd = 0;
                    var yEnd = 0;
                    var data = {};
                    Vue.click = 0;
                    dicomImageGrey.onclick = function (e) {
                      if(Vue.clickFlag) {
                        //获取当前鼠标在剂量图上的坐标
                        if (Vue.click == 0) {

                          xStart = Vue.getPointOnCanvas(dicomImageGrey, e).x;
                          Vue.xStart = xStart;
                          yStart = Vue.getPointOnCanvas(dicomImageGrey, e).y;
                          Vue.yStart = yStart;
                          Vue.click++;
                          tooltipZE.style.display = 'block';
                        } else if (Vue.click == 1) {

                          xEnd = Vue.getPointOnCanvas(dicomImageGrey, e).x;
                          Vue.xEnd = xEnd;
                          yEnd = Vue.getPointOnCanvas(dicomImageGrey, e).y;
                          Vue.yEnd = yEnd;
                          Vue.click = 2;
                          $('.cur_mask').show();
                          document.getElementById('tipLoading').innerHTML = '正在请求自动勾画数据中,请稍侯...';
                          var type = $('.delArea select').val();
                          Vue.organType = type;
                          data = {
                            id: Vue.imageIdParent,
                            type: type,
                            sliceIndex: Vue.zIndex,
                            xStart: Vue.xStart,
                            yStart: Vue.yStart,
                            xEnd: Vue.xEnd,
                            yEnd: Vue.yEnd
                          };
                          curHtml.append('<i></i>');
                          $.when(Vue.getDataByKey(Vue.myDB.db, 'sketchDB_' + Vue.imageIdParent, 'sketch_z_namelist')).done(function (data) {
                            for (var i = 0; i < data.length; i++) {
                              if (data[i].name == text) {
                                data[i].isAuto = true;
                              }
                            }
                            Vue.deleteDataByKey(Vue.myDB.db, 'sketchDB_' + Vue.imageIdParent, 'sketch_z_namelist');
                            var namelistObj = {
                              id: 'sketch_z_namelist',
                              value: data
                            }
//                                console.log('namelistObj');
//                                console.log(namelistObj);
                            Vue.addDBSingleData('sketchDB_' + Vue.imageIdParent, namelistObj);
                          });

                          Vue.delineation(data);//请求后台自动勾画数据，并展示到页面
                        }
                      }
                    };
                }
//                });
//                $.when(Vue.getDataByKey(Vue.myDB.db,organDB,initIndex)).fail(function (data) {
//                    if(param == 1){
//                        tooltipZS.style.display='block';
//                        tooltipZE.style.display='none';
//                        Vue.xStart=0;
//                        Vue.yStart=0;
//                        Vue.xEnd=0;
//                        Vue.yEnd=0;
//                        //鼠标点击事件
//                        var xStart=0;
//                        var yStart=0;
//                        var xEnd=0;
//                        var yEnd=0;
//                        var data={};
//                        Vue.click=0;
//                        dicomImageGrey.onclick=function (e){
//                            //获取当前鼠标在剂量图上的坐标
//                            if(Vue.click == 0){
//
//                                xStart = Vue.getPointOnCanvas(dicomImageGrey, e).x;
//                                Vue.xStart = xStart;
//                                yStart = Vue.getPointOnCanvas(dicomImageGrey, e).y;
//                                Vue.yStart = yStart;
//                                Vue.click++;
//                                tooltipZE.style.display='block';
//                            }else if(Vue.click == 1){
//
//                                xEnd = Vue.getPointOnCanvas(dicomImageGrey, e).x;
//                                Vue.xEnd = xEnd;
//                                yEnd = Vue.getPointOnCanvas(dicomImageGrey, e).y;
//                                Vue.yEnd = yEnd;
//                                Vue.click = 2;
//                                var type = $('.delArea select').val();
//                                Vue.organType=type;
//                                data={
//                                    id:Vue.imageIdParent,
//                                    type:type,
//                                    sliceIndex:Vue.zIndex,
//                                    xStart:Vue.xStart,
//                                    yStart:Vue.yStart,
//                                    xEnd:Vue.xEnd,
//                                    yEnd:Vue.yEnd
//                                };
//                                Vue.delineation(data);
//                            }
//                        };
//                    }
//                }).done(function (data) {
//                    $.when(Vue.getDataByKey(Vue.myDB.db,organDB,organIndex)).done(function (data) {
//                        var axis='z';
//                        Vue.renderAuto(data,axis);
////                        $("#organType").change(function () {
//                        $(".delArea select").change(function () {
//                            Vue.startDraw()
//                        })
//
//                    })
//                })


            },

            //获取自动勾画数据,并放进db数据库中
            delineation(data) {
                var Vue = this;
                var organDB = 'organDB_' + this.imageIdParent;
                var type = $('.delArea select').find('option:selected').text();
                var defer = $.Deferred();
                var that = this;
                console.log('请求自动勾画数据开始了')
//                console.log(data);
                Image.delineation(data).then(res => {
                  console.log('delineation---z--data======',res)
                    if (res.status == "200") {
                        var lung_temp = [];
                        var lungData = res.data.split('\n');
                        for (var i = 0; i < lungData.length; i++) {
                            lung_temp[i] = lungData[i].split('|');
                        }
                        for (var j = 0; j < Vue.imageParams.fileNum; j++) {
                            var obj = {
//                                 'num':Vue.imageParams.fileNum-j-1,
                                'num': j,
                                'value': []
                            }
                            for (var k = 0; k < lung_temp.length - 1; k++) {
                                if (j == lung_temp[k][0]) {
                                    var auto_entry_map = {
                                        color: 'rgb(232,145,5)',///土黄色
                                        lineWidth: 1,
                                        haveDrawRoi: 'sketch_z_' + type,
                                        rules: true,
                                        key: type,
                                        value: []
                                    };
                                    var arr = lung_temp[k][1].split('\\');
                                    for (var m = 0; m < arr.length; m += 2) {
                                        var arrDot = [];
                                        arrDot.push(Math.round(arr[m] * 315 / that.imageParams.width));///把它展示在315大小的画布上
                                        arrDot.push((Math.round(315-arr[m + 1] * 315 / that.imageParams.height)));//当前数据是反的，所以用减法
                                        auto_entry_map.value.push(arrDot);
                                    }
                                    obj.value.push(auto_entry_map);
                                }

                            }
                            ;
                            if (obj.value.length > 0) {
                                (function (j, auto_entry_map) {
                                    $.when(that.getDataByKey(that.myDB.db, 'sketchDB_' + that.imageIdParent, 'sketch_z_' + j)).done(function (data) {
                                        var newData = data.concat(auto_entry_map);

                                        var newObjLine = {
                                            id: 'sketch_z_' + j,
                                            value: newData
                                        }
                                        that.deleteDataByKey(that.myDB.db, 'sketchDB_' + that.imageIdParent, 'sketch_z_' + j);
                                        that.addDBSingleData('sketchDB_' + that.imageIdParent, newObjLine);
                                        if (j == that.zIndex) {
                                            that.backDrawLine(that.zIndex);//展示当前张数下的勾画线
                                        }
                                    })
                                })(obj.num, obj.value);
                            }
                        }
                        ;
                        lung_temp.length = 0;
                        lungData.length = 0;
                        lung_temp = null;
                        lungData = null;
                        defer.resolve(true);
                        $('#autoDraw').removeAttr('disabled');///可以继续点击自动勾画按钮
                        document.getElementById('tipLoading').innerHTML = '自动勾画数据请求成功！';
                        setTimeout(function () {
                            tooltipZS.style.display = 'none';
                            tooltipZE.style.display = 'none';
                            $('.cur_mask').hide();
                        }, 1000);
                    }
                    ;
                }).then(res => {
                  $('#cancelAutoDraw').click()
                  Vue.runContainer()
                }).catch(err => {

                    $('#autoDraw').removeAttr('disabled');///可以继续点击自动勾画按钮
                    document.getElementById('tipLoading').innerHTML = '您选取的点有误，请重试！';
                    setTimeout(function () {
                      tooltipZS.style.display = 'none';
                      tooltipZE.style.display = 'none';
                      $('.cur_mask').hide();
                    }, 1000);
                  })
                this.delineationX();
                this.delineationY();
                return defer.promise();
            },
          delineationX(){
            var that=this;
            var type = $('.delArea select').find('option:selected').text();
            var xWidth=parseInt($('#lineBoxX').width()),xHeight=parseInt($('#lineBoxX').height());
            var params={};
            params.id=this.imageIdParent;
            params.type=this.organType;
            Image.delineationX(params).then(res=>{
                console.log('delineationX--------------',res);
              var lung_temp = [];
              var lungData = res.data.split('\r\n');
              for (var i = 0; i < lungData.length; i++) {
                lung_temp[i] = lungData[i].split('|');
              }
//              debugger;
              for (var j = 0; j < that.imageParams.width; j++) {
                var obj = {
//                                 'num':Vue.imageParams.width-j-1,
                  'num': j,
                  'value': []
                }
                for (var k = 0; k < lung_temp.length - 1; k++) {
                  if (j == lung_temp[k][0]) {
                    var auto_entry_map = {
                      color: 'rgb(232,145,5)',///土黄色
                      lineWidth: 1,
                      haveDrawRoi: 'sketch_x_' + type,
                      rules: true,
                      key: type,
                      value: []
                    };
                    var arr = lung_temp[k][1].split('\\');
                    for (var m = 0; m < arr.length; m += 2) {
                      var arrDot = [];
                      arrDot.push(Math.round(arr[m] * xWidth / that.imageParams.width));///把它展示在315大小的画布上
                      arrDot.push((Math.round(arr[m+1] * xHeight / that.imageParams.fileNum)));
                      auto_entry_map.value.push(arrDot);
                    }
                    obj.value.push(auto_entry_map);
                  }

                }
                ;
                if (obj.value.length > 0) {
                  (function (j, auto_entry_map) {
                    $.when(that.getDataByKey(that.myDB.db, 'sketchDB_' + that.imageIdParent, 'sketch_x_' + j)).done(function (data) {
                      var newData = data.concat(auto_entry_map);

                      var newObjLine = {
                        id: 'sketch_x_' + j,
                        value: newData
                      }
                      that.deleteDataByKey(that.myDB.db, 'sketchDB_' + that.imageIdParent, 'sketch_x_' + j);
                      that.addDBSingleData('sketchDB_' + that.imageIdParent, newObjLine);
                      if (j == that.xIndex) {
                        that.backDrawLineX(that.xIndex);//展示当前张数下的勾画线
                      }
                    })
                  })(obj.num, obj.value);
                }
              };
              lung_temp.length = 0;
              lungData.length = 0;
              lung_temp = null;
              lungData = null;
            })
          },
          delineationY(){
            var that=this;
            var type = $('.delArea select').find('option:selected').text();
            var xWidth=parseInt($('#lineBoxY').width()),xHeight=parseInt($('#lineBoxY').height());
            var params={};
            params.id=this.imageIdParent;
            params.type=this.organType;
            Image.delineationY(params).then(res=>{
              console.log('delineationY--------------',res);
              var lung_temp = [];
              var lungData = res.data.split('\r\n');
              for (var i = 0; i < lungData.length; i++) {
                lung_temp[i] = lungData[i].split('|');
              }
//              debugger;
              for (var j = 0; j < that.imageParams.height; j++) {
                var obj = {
//                                 'num':Vue.imageParams.width-j-1,
                  'num': j,
                  'value': []
                }
                for (var k = 0; k < lung_temp.length - 1; k++) {
                  if (j == lung_temp[k][0]) {
                    var auto_entry_map = {
                      color: 'rgb(232,145,5)',///土黄色
                      lineWidth: 1,
                      haveDrawRoi: 'sketch_y_' + type,
                      rules: true,
                      key: type,
                      value: []
                    };
                    var arr = lung_temp[k][1].split('\\');
                    for (var m = 0; m < arr.length; m += 2) {
                      var arrDot = [];
                      arrDot.push(Math.round(arr[m] * xWidth / that.imageParams.height));///把它展示在315大小的画布上
                      arrDot.push((Math.round(arr[m + 1] * xHeight / that.imageParams.fileNum)));
                      auto_entry_map.value.push(arrDot);
                    }
                    obj.value.push(auto_entry_map);
                  }

                }
                ;
                if (obj.value.length > 0) {
                  (function (j, auto_entry_map) {
                    $.when(that.getDataByKey(that.myDB.db, 'sketchDB_' + that.imageIdParent, 'sketch_y_' + j)).done(function (data) {
                      var newData = data.concat(auto_entry_map);

                      var newObjLine = {
                        id: 'sketch_y_' + j,
                        value: newData
                      }
                      that.deleteDataByKey(that.myDB.db, 'sketchDB_' + that.imageIdParent, 'sketch_y_' + j);
                      that.addDBSingleData('sketchDB_' + that.imageIdParent, newObjLine);
                      if (j == that.yIndex) {
                        that.backDrawLineY(that.yIndex);//展示当前张数下的勾画线
                      }
                    })
                  })(obj.num, obj.value);
                }
              };
              lung_temp.length = 0;
              lungData.length = 0;
              lung_temp = null;
              lungData = null;
            })
          },
////获取自动勾画数据,并放进db数据库中
//            delineation(data){
//                var Vue=this;
//                var organDB='organDB_'+this.imageIdParent;
//                var type=$('.delArea select').val();
////                var type=$('#organType').val();
//                Image.delineation(data).then(res => {
//                    if(res.status == "200"){
//                        var lung_temp=[];
//                        var arr=[]
//                        // if(Vue.organType == 3){//器官为肺
//                        var lungData=res.data.split('\r\n');
//
//                        // }
//                        for(var i=0;i<lungData.length-1;i++){//-1是因为每组数据的末尾是\,会产生空字符串
//                            lung_temp[i]=lungData[i].split('|');
//                        }
//                        // console.log(lung_temp)
//                        for(var j=0;j<Vue.imageParams.fileNum;j++){
//                            var auto_entry_map={
//                                id:"organ_"+type+"_"+j,
//                                value:[]
//                            };
//                            for(var k=0;k<lung_temp.length;k++){
//                                if(j == lung_temp[k][0]){
//                                    arr=lung_temp[k][1].split('\\');
//                                    auto_entry_map.value.push(arr)
//                                }
//
//                            };
//                            Vue.addDBSingleData(organDB,auto_entry_map);
//                            auto_entry_map=null;
//                        };
//
//
//                    };
//                })
//            },

            //渲染自动勾画
            renderAuto(data, index) {
                var Vue = this;
                Vue.canvasAuto = document.getElementById('autoZ');
                Vue.canvasAuto.width = Vue.imageParams.width;
                Vue.canvasAuto.height = Vue.imageParams.height;
                Vue.scaleW = 315 / Vue.imageParams.width;
                Vue.scaleH = 315 / Vue.imageParams.height;
                $('#autoZ').css({
                    'transform-origin': '0% 0%',
                    'transform': 'scale(' + Vue.scaleW + ',' + Vue.scaleH + ')'
                    // 'background-color':'red'
                })
                Vue.ctxAuto = Vue.canvasAuto.getContext('2d');

                //var imgData=ctx.getImageData(0,0,Vue.imageParams.width,Vue.imageParams.height);
                // ctx.putImageData(imgData,0,0);

                // for(var i=0;i<data.length;i++){
                //     ctx.beginPath();
                //     // ctx.strokeStyle="#0000ff"
                //     for(var j=0;j<data[i].length-1;j+=2){
                //         ctx.lineTo(data[i][j],data[i][j+1]);
                //         // console.log(data[i][j]);
                //     }
                //     ctx.closePath();
                //     ctx.stroke();
                // }
                for (var i = 0; i < data.length; i++) {
                    Vue.ctxAuto.beginPath();
                    for (var j = 0; j < data[i].length; j += 2) {
                        Vue.ctxAuto.lineTo(data[i][j], Vue.imageParams.height - data[i][j + 1]);
                    }
                    Vue.ctxAuto.strokeStyle = '#00ff00'
                    Vue.ctxAuto.closePath();
                    Vue.ctxAuto.stroke();
                }
                // ctx.beginPath();
                // ctx.moveTo(0,0);
                // ctx.lineTo(100,100);
                // ctx.stroke();

            },
            distanceLeft(obj) {
                var thisObj = document.getElementById(obj);
                var distance = 0;
                while (thisObj.offsetParent != null) {
                    distance += thisObj.offsetLeft;
                    thisObj = thisObj.offsetParent;
                }
                return distance;
            },
            distanceTop(obj) {
                var thisObj = document.getElementById(obj);
                var distance = 0;
                while (thisObj.offsetParent != null) {
                    distance += thisObj.offsetTop;
                    thisObj = thisObj.offsetParent;
                }
                return distance;
            },
            calcH() {
                var distanceTop = this.distanceTop('sectionId');
                var winH = window.innerHeight;
                var finalH = winH - distanceTop;
                finalH = finalH > 630 ? finalH : 630;
                $('#sectionId').css({
                    'height': finalH + 'px'
                })
                $('.sketchLine').css({
                    'height': finalH + 30 + 'px'
                })
            },
            style() {
                var Vue = this;
                var className = [".view-left", ".view-right-bottom", " .view-right-top"];
                //选中的外框高亮显示,并且把选中外框的轴赋值给全局变量,供给一键调窗方法使用
                for (var i = 0; i < className.length; i++) {
                    $(className[i]).click(function (e) {
                        var elementId = e.currentTarget.id
                        if (elementId == "view-left") {
                            Vue.axisG = "z";
                        } else if (elementId == "view-right-bottom") {
                            Vue.axisG = "y";
                        } else if (elementId == "view-right-top") {
                            Vue.axisG = "x";
                        }

                        for (var j = 0; j < className.length; j++) {
                            $(className[j]).css("border", "1px solid black");
                        }
                        $(".view-left").css("border-right", "1px solid #636c72");
                        $(".view-right-top").css("border-bottom", "1px solid #636c72");
                        $(this).css("border", "1px solid white");
                    })
                }

            },

            //获取当前鼠标在canvas上的坐标
            getPointOnCanvas(canvas, evt) {
                var bbox = canvas.getBoundingClientRect();
                // console.log(bbox);
                if (canvas == dicomImageGrey) {
                    return {
                        x: Math.ceil((evt.clientX - bbox.left ) * (this.imageParams.width) / (bbox.width)),
                        y: Math.ceil((evt.clientY - bbox.top ) * (this.imageParams.height) / (bbox.height))
                    };
                } else {
                    return {
                        x: Math.ceil((evt.clientX - bbox.left ) * (this.imageParams.width) / (bbox.width)),
                        y: Math.ceil((evt.clientY - bbox.top ) * (this.imageParams.fileNum) / (bbox.height))
                    };
                }
            },

            //初始化窗口尺寸
            initialize() {
                var sliceThinkness = this.imageParams.sliceThickness;
                var spacing = this.imageParams.rowPixelSpacing;
                var width = this.imageParams.width;
                var height = this.imageParams.height;
                var fileNum = this.imageParams.fileNum;
                var asp = (width * spacing) / (fileNum * sliceThinkness);
                var heightXY = 315 / asp;

                $('#dicomImageGrey2').height(heightXY);
                $('#dicomImageGrey3').height(heightXY);
                //定义勾画线画布大小
                $('#lineBoxX,#lineBoxY').height(heightXY);
                var dicomZWidth = $('#dicomImageGrey').width();
                var dicomXWidth = $('#dicomImageGrey2').width();
                var dicomYWidth = $('#dicomImageGrey3').width();
                $('#lineBoxZ').width(dicomZWidth).height(dicomZWidth);
                $('#lineBoxX').width(dicomXWidth);
                $('#lineBoxY').width(dicomYWidth);

            },

            //创建db数据库
            createIndexedDB() {
                var imageDB = 'imageDB_' + this.imageIdParent;
                var sketchDB = 'sketchDB_' + this.imageIdParent;
                var organDB = 'organDB_' + this.imageIdParent;
                var that = this;
                var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
                window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {
                    READ_WRITE: "readwrite"
                };
                window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

                if (!window.indexedDB) {
                    //您的浏览器不支持稳定版本的IndexedDB。这样的特性是不可用的
                    window.alert("您的浏览器不支持稳定版本的IndexedDB, 这样的特性是不可用的.");
                }
                var defer = $.Deferred();
                //新建一个db
                that.dbVersionStore = parseInt(window.localStorage.getItem("dbVersion")) || 1;
                var dbVersion=parseInt(window.localStorage.getItem("dbVersion")) || 1;
                //                var dbVersion=storeState.state.dbVersion;
                that.myDB.version = dbVersion;
                console.log('myDB--version=====' + that.myDB.version);
                var openRequest = indexedDB.open(that.myDB.name, that.myDB.version);
//                storeState.state.dbVersion=dbVersion
                dbVersion++;
                window.localStorage.setItem("dbVersion", dbVersion);
                openRequest.onerror = function (e) {
                    console.log("Database error: " + e.target.errorCode);
                };
                //如果数据库已经创建
                openRequest.onsuccess = function (e) {
                    console.log("Database created11111");
                    defer.resolve(true);
                    that.myDB.db = e.target.result;//将数据存进db中
                    //获取每个轴图像的长度
                    that.zLen = that.imageParams.fileNum;
                    that.xLen = that.imageParams.width;
                    that.yLen = that.imageParams.height;

                    that.zIndex = Math.floor(that.zLen / 2);
                    that.xIndex = Math.floor(that.xLen / 2);
                    that.yIndex = Math.floor(that.yLen / 2);
                    $('.cur_mask,.cur_mask .readImageProgress').show();//展示进度条
                    $.when(that.fetchStoreByCursorforDownload(that.myDB.db, imageDB)).done(function (data) {

                        //获取z轴的图像和剂量值数据
                        var imageIndex = 'image_z_' + that.zIndex;
                        var temp_c = 'z'
                        $.when(that.getDataByKey(that.myDB.db, imageDB, imageIndex)).done(function (data) {
                            that.ctImageGrey(cornerstoneGrey, data, temp_c);
                            that.loaderGrey(temp_c);
                            $('.progress-tip .progressing').css('width', '30%');
                            //获取x轴的图像和剂量值数据
                            imageIndex = 'image_x_' + that.xIndex;
                            temp_c = 'x'
                            $.when(that.getDataByKey(that.myDB.db, imageDB, imageIndex)).done(function (data) {
                                that.ctImageGrey(cornerstoneGrey, data, temp_c);
                                that.loaderGrey(temp_c);
                                $('.progress-tip2 .progressing').css('width', '60%');
                                //获取y轴的图像和剂量值数据
                                imageIndex = 'image_y_' + that.yIndex;
                                temp_c = 'y';
                                $.when(that.getDataByKey(that.myDB.db, imageDB, imageIndex)).done(function (data) {
                                    that.ctImageGrey(cornerstoneGrey, data, temp_c);
                                    that.loaderGrey(temp_c);
                                    $('.progress-tip2 .progressing').css('width', '100%');
                                    setTimeout(function () {
                                        $('.cur_mask,.cur_mask .readImageProgress').hide();//隐藏进度条
                                    }, 500)

                                });
                            });
                        });

                    }).fail(function (data) {
                        $('.cur_mask,.cur_mask .readImageProgress').show();//展示进度条
                        $.when(that.readImage2(that.imageIdParent)).done(function (data) { //加载底图的数据
                            //获取z轴的图像和剂量值数据
                            var imageIndex = 'image_z_' + that.zIndex;
                            var temp_c = 'z'
                            $.when(that.getDataByKey(that.myDB.db, imageDB, imageIndex)).done(function (data) {
                                that.ctImageGrey(cornerstoneGrey, data, temp_c);
                                that.loaderGrey(temp_c);

                                //获取x轴的图像和剂量值数据
                                imageIndex = 'image_x_' + that.xIndex;
                                temp_c = 'x'
                                $.when(that.getDataByKey(that.myDB.db, imageDB, imageIndex)).done(function (data) {
                                    that.ctImageGrey(cornerstoneGrey, data, temp_c);
                                    that.loaderGrey(temp_c);

                                    //获取y轴的图像和剂量值数据
                                    imageIndex = 'image_y_' + that.yIndex;
                                    temp_c = 'y';
                                    $.when(that.getDataByKey(that.myDB.db, imageDB, imageIndex)).done(function (data) {
                                        that.ctImageGrey(cornerstoneGrey, data, temp_c);
                                        that.loaderGrey(temp_c);
                                        $('.cur_mask,.cur_mask .readImageProgress').hide();//隐藏进度条

                                    });
                                });
                            });
                        });
                    });
                };

                //如果数据库更新
                openRequest.onupgradeneeded = function (e) {
                    //创建objectstore表
                    that.myDB.db = e.target.result;
//                    console.log("Database created22222");

                    if (!that.myDB.db.objectStoreNames.contains(imageDB)) {
                        var store = that.myDB.db.createObjectStore(imageDB, {
                            keyPath: 'id'
                        });
                        //创建索引
                        store.createIndex('id', 'id', {
                            unique: true
                        });

                    }
                    if (!that.myDB.db.objectStoreNames.contains(sketchDB)) {
                        var store = that.myDB.db.createObjectStore(sketchDB, {
                            keyPath: 'id'
                        });
                        //创建索引
                        store.createIndex('id', 'id', {
                            unique: true
                        });
                    }
                    if (!that.myDB.db.objectStoreNames.contains(organDB)) {
                        var store = that.myDB.db.createObjectStore(organDB, {
                            keyPath: 'id'
                        });
                        //创建索引
                        store.createIndex('id', 'id', {
                            unique: true
                        });
                    }

                };

                return defer.promise();
            },


            //新增单条DB数据
            addDBSingleData(objectStore, entry) {//参数一:表名,参数二:需要添加的数据
                var _objectStore = this.myDB.db.transaction(objectStore, "readwrite").objectStore(objectStore);
                _objectStore.add(entry);
            }
            ,

            //按key获取DB数据
            getDataByKey(db, storeName, id) {
                var transaction = db.transaction(storeName, 'readwrite');
                var store = transaction.objectStore(storeName);
                var request = store.get(id);
                var defer = $.Deferred();
                request.onsuccess = function (e) {
                    let entry = e.target.result;//定义变量存放所需id的数据
                    if (!entry) {
                        defer.reject(false);
                        return;
                    }
                    if (entry.id.indexOf('image') != -1) {//判断,如果是image数据,则渲染图像
                        defer.resolve(entry.value);
                    } else if (entry.id.indexOf('organ') != -1) {
                        defer.resolve(entry.value);
                    } else if (entry.id.indexOf('sketch') != -1) {
                        defer.resolve(entry.value);
                    }
                }
                return defer.promise();
            }
            ,
            getDataByKeyforstoreValue(db, storeName, id) {
                var transaction = db.transaction(storeName, 'readwrite');
                var store = transaction.objectStore(storeName);
                var request = store.get(id);
                var defer = $.Deferred();
                request.onsuccess = function (e) {
                    let entry = e.target.result;//定义变量存放所需id的数据
                    if (!entry) {
                        defer.reject(false);
                        return;
                    }
                    if (entry.id.indexOf('sketch') > -1) {
                        defer.resolve(entry.storeValue);
                    }
                }
                return defer.promise();
            }
            ,
            readImage2(id) {
                console.log('loading...');
                var type = 1;
                var imageDB = 'imageDB_' + this.imageIdParent;
                var defer = $.Deferred();
                Download.readImage2(id, type, this.imageSizeParent).then(response => {
                    if (response.status == "200") {
                      var timestart=new Date().getTime();
                        this.canvasLength = 1;//确定canvas元素被加载进来
                        this.preAfterFlag = 1;//开始加载剂量数据的标示
                        var uint16 = new Uint16Array(response.data); // length为4

                        var width = this.imageParams.width;
                        var height = this.imageParams.height;
                        var fileNum = this.imageParams.fileNum;
                        ;
                        this.zIndex = Math.floor(fileNum / 2);
                        this.xIndex = Math.floor(width / 2);
                        this.yIndex = Math.floor(height / 2);
                        var arr_z_first = [];
                        var arr_tmp = [];

                        //生成 Z 切面 数据
                        for (var i = 0; i < fileNum; i++) {
                            arr_tmp[(fileNum - 1 ) - i] = uint16.slice((width * height) * i, (width * height) * (i + 1))
//                            arr_tmp[i] = uint16.slice((width * height) * i, (width * height) * (i + 1))
                            var image_entry_map = {
                                id: '',
                                value: null
                            };
                            image_entry_map.id = 'image_z_' + (fileNum - 1 - i);//图像id
//                            image_entry_map.id='image_z_'+(i);//图像id
                            image_entry_map.value = arr_tmp[(fileNum - 1 ) - i];//每一张图的数据放入value中
//                            image_entry_map.value=arr_tmp[i];//每一张图的数据放入value中
                            this.addDBSingleData(imageDB, image_entry_map)
//                            if(i==this.zIndex){
//                                arr_z_first=image_entry_map.value;
//                                this.ctImageGrey(cornerstoneGrey, arr_z_first, 'z');
//                                this.loaderGrey('z');
//                            }
                            image_entry_map = null;

                        }

                        //生成 X 切面 数据
                        var arr_x_first = [];
                        var arr_tmp_x = [];
                        var arr_tmp_x2 = [];
                        for (var jx = 0; jx < height; jx++) {
//                            if(jx==this.xIndex){
//                                for (var kx = 0; kx < arr_tmp.length; kx++) {
//                                    //每一像素行数据
//                                    arr_tmp_x2.push.apply(arr_tmp_x2, arr_tmp[kx].slice(width * jx, width * (jx + 1)))
//                                }
//                                arr_x_first=arr_tmp_x2;
//                                this.ctImageGrey(cornerstoneGrey, arr_x_first, 'x');
//                                this.loaderGrey('x');
//                                var image_entry_map={
//                                    id:'',
//                                    value:null
//                                };
//                                image_entry_map.id='image_x_'+jx;//图像id
//                                image_entry_map.value=arr_tmp_x2;//每一张图的数据放入value中
//                                this.addDBSingleData(imageDB, image_entry_map)
//
//                                image_entry_map=null;
//                            }else {
                            arr_tmp_x.length = 0;
                            for (var kx = 0; kx < arr_tmp.length; kx++) {
                                //每一像素行数据
                                arr_tmp_x.push.apply(arr_tmp_x, arr_tmp[kx].slice(width * jx, width * (jx + 1)))
                            }
//                            }

                            var image_entry_map = {
                                id: '',
                                value: null
                            };
                            image_entry_map.id = 'image_x_' + jx;//图像id
                            image_entry_map.value = arr_tmp_x;//每一张图的数据放入value中
                            this.addDBSingleData(imageDB, image_entry_map)

                            image_entry_map = null;

                            arr_tmp_x.length = 0;
                        }
                        arr_tmp_x.length = 0;
                        //生成 Y 切面 数据
                        var arr_y_first = [];
                        var yData_tmp = []
                        var yData_tmp2 = [];
                        var arr_tmp_x2 = [];
                        for (var jy = 0; jy < width; jy++) {
                            yData_tmp.length = 0;
//                            if (jy == this.yIndex) {//先存下来第中间张数的数据
//                                for (var ky = 0; ky < arr_tmp.length; ky++) { //获取每行数据
//                                    //获取一行像素点的值
//                                    for (var my = 0; my < height; my++) {//获取单像素点数据
//                                        //获取行内指定一个像素点的值
//                                        arr_tmp_x2[my] = arr_tmp[ky][width * my + jy]
//                                    }
//                                    yData_tmp2.push.apply(yData_tmp2, arr_tmp_x2)
//                                }
//                                arr_y_first = yData_tmp2;
//                                this.ctImageGrey(cornerstoneGrey, arr_y_first, 'y');
//                                this.loaderGrey('y');
//                                var image_entry_map = {
//                                    id: '',
//                                    value: null
//                                };
//                                image_entry_map.id = 'image_y_' + jy;//图像id
//                                image_entry_map.value = yData_tmp2;//每一张图的数据放入value中
//                                this.addDBSingleData(imageDB, image_entry_map)
//
//                                image_entry_map = null;
//                            }else {
                            for (var ky = 0; ky < arr_tmp.length; ky++) { //获取每行数据
                                // var line = []
                                arr_tmp_x.length = 0;
                                //获取一行像素点的值
                                for (var my = 0; my < height; my++) {//获取单像素点数据
                                    //获取行内指定一个像素点的值
                                    arr_tmp_x[my] = arr_tmp[ky][width * my + jy]
                                }
                                yData_tmp.push.apply(yData_tmp, arr_tmp_x)
                            }
//                            }

                            var image_entry_map = {
                                id: '',
                                value: null
                            };
                            image_entry_map.id = 'image_y_' + jy;//图像id
                            image_entry_map.value = yData_tmp;//每一张图的数据放入value中
                            this.addDBSingleData(imageDB, image_entry_map)

                            image_entry_map = null;

                        }
                        yData_tmp.length = 0;
                        arr_tmp.length = 0;
                      var endTime=new Date().getTime();
                      console.log('storeTime===============',endTime-timestart);
                        defer.resolve(true);
                    }
                })
                return defer.promise();
            }
            ,
            loaderGrey(axis) {
                var imageId = "";
                var index = 0;
                var len = 0;
                var domWindow = ""
                var Vue = this;
                var domCanvas = {};
                var axisFlag='';
                //判断是哪个窗口
                if (axis == "z") {
                    domWindow = "#dicomImageGrey";
                    imageId = 'ctexample://' + this.zIndex;
                    index = this.zIndex;
                    len = this.zLen;

                    for (var i = 0; i < len; i++) {
                        this.zImageIds[i] = 'ctexample://' + (i);
                    }
                    var element = document.getElementById("dicomImageGrey");
                    cornerstoneGrey.enable(element);
                    var imageIds = this.zImageIds;
                }
                if (axis == "x") {
                    domWindow = "#dicomImageGrey2"
                    imageId = 'ctexample://' + this.xIndex;
                    index = this.xIndex;
                    len = this.xLen;
                    for (var i = 0; i < len; i++) {
                        this.xImageIds[i] = 'ctexample://' + (i);
                    }
                    var element = document.getElementById("dicomImageGrey2");

                    cornerstoneGrey.enable(element);
                    var imageIds = this.xImageIds;
                }
                if (axis == "y") {
                    domWindow = "#dicomImageGrey3"
                    imageId = 'ctexample://' + this.yIndex;
                    index = this.yIndex;
                    len = this.yLen;
                    for (var i = 0; i < len; i++) {
                        this.yImageIds[i] = 'ctexample://' + (i);
                    }
                    var element = document.getElementById("dicomImageGrey3");

                    cornerstoneGrey.enable(element);
                    var imageIds = this.yImageIds;
                }


//                function updateTheImage(imageIndex) {
//                    Vue.flag=1;
//                    cornerstoneGrey.loadImage(imageIds[imageIndex]).then(function(imageGrey) {
//                        cornerstoneGrey.displayImage(element, image);
//                    });
//                };
                var imageDB = 'imageDB_' + Vue.imageIdParent;
                var imageIndex = 0;
                var x = 0;
                var y = 0;
                cornerstoneGrey.loadImage(imageId).then(function (image) {
                    cornerstoneGrey.displayImage(element, image);
                    var viewport = cornerstoneGrey.getViewport(element);
                    $('#softTissue').click(function (e) {
                      Vue.moveFlag=8;
                        if (Vue.axisG == axis) {
                            var viewport = cornerstoneGrey.getViewport(element);
                            viewport.voi.windowWidth = 400;
                            viewport.voi.windowCenter = 20;
                            cornerstoneGrey.setViewport(element, viewport);
                        } else {
                            return;
                        }
                    });

                    //自定义窗宽窗位点击方法
                    $('#lung').click(function (e) {
                      Vue.moveFlag=6;
                        if (Vue.axisG == axis) {//先判断当前轴是否等于主轴,只渲染当前主轴的图像
                            var viewport = cornerstoneGrey.getViewport(element);
                            viewport.voi.windowWidth = 1600;
                            viewport.voi.windowCenter = -600;
                            cornerstoneGrey.setViewport(element, viewport);
                        } else {
                            return;
                        }
                    });
                    $('#bone').click(function (e) {
                      Vue.moveFlag=7;
                        if (Vue.axisG == axis) {
                            //throw Error("ddd")
                            //console.log("按下的图像id="+imageId+"--当前轴位="+axis+"--全局轴位"+Vue.axisG)
                      //渲染图像
                      var viewport = cornerstoneGrey.getViewport(element);
                      viewport.voi.windowWidth = 2000;
                      viewport.voi.windowCenter = 300;
                      cornerstoneGrey.setViewport(element, viewport);
                        } else {
                            return;
                        }

                    });
                    /////改变窗宽/窗位
                  var windowWidthZ=1000,windowCenterZ=250;
                  var windowWidthX=1000,windowCenterX=250;
                  var windowWidthY=1000,windowCenterY=250;
                  $(domWindow).mousedown(function (e) {
                    if (Vue.moveFlag == 1 && Vue.scaleFlag == 1) {//判断是否点击了平移、缩放按钮
                      var lastX = e.pageX;
                      var lastY = e.pageY;
                      if (domWindow == "#dicomImageGrey") {
                        axis = "z";
                        element = document.getElementById("dicomImageGrey");
                      }else if (domWindow == "#dicomImageGrey2") {
                        axis = "x";
                        element = document.getElementById("dicomImageGrey2");
                      } else if (domWindow == "#dicomImageGrey3") {
                        axis = "y";
                        element = document.getElementById("dicomImageGrey3");
                      }
                      Vue.axisG = axis;
                      if(axisFlag!=axis){
                        layer.msg('请先滚动该轴图像，再调节窗宽窗位！');
                        return ;
                      }
//                      console.log('element==========',element)
                      //渲染图像
                      $.when(Vue.getDataByKey(Vue.myDB.db, imageDB, imageIndex)).done(function (oneData) {
//                            updateTheImage(index);
                        Vue.flag = 1;
                        Vue.data_tmp = oneData;
                        cornerstoneGrey.loadImage(imageIds[index]).then(function (imageGrey) {
                          cornerstoneGrey.displayImage(element, imageGrey);
                        });
                      });
                      $(document).mousemove(function (e) {
                        if (domWindow == "#dicomImageGrey") {

                          element = document.getElementById("dicomImageGrey");
                          var deltaX = e.pageX - lastX,
                            deltaY = e.pageY - lastY;
                          lastX = e.pageX;
                          lastY = e.pageY;
                          viewport.voi.windowWidth =windowWidthZ + (deltaX / viewport.scale);
                          viewport.voi.windowCenter =windowCenterZ + (deltaY / viewport.scale);
                          cornerstoneGrey.setViewport(element, viewport);
//                                $('#bottomleft').text("WW/WL:" + Math.round(viewport.voi.windowWidth) + "/" + Math.round(viewport.voi.windowCenter));
                          console.log("WW/WL:" + Math.round(viewport.voi.windowWidth) + "/" + Math.round(viewport.voi.windowCenter));
                          windowWidthZ=viewport.voi.windowWidth;
                          windowCenterZ=viewport.voi.windowCenter;
                        } else if (domWindow == "#dicomImageGrey2") {

                          element = document.getElementById("dicomImageGrey2");
                          var deltaX = e.pageX - lastX,
                            deltaY = e.pageY - lastY;
                          lastX = e.pageX;
                          lastY = e.pageY;
                          viewport.voi.windowWidth =windowWidthX + (deltaX / viewport.scale);
                          viewport.voi.windowCenter =windowCenterX + (deltaY / viewport.scale);
                          cornerstoneGrey.setViewport(element, viewport);
//                                $('#bottomleft').text("WW/WL:" + Math.round(viewport.voi.windowWidth) + "/" + Math.round(viewport.voi.windowCenter));
                          console.log("WW/WL:" + Math.round(viewport.voi.windowWidth) + "/" + Math.round(viewport.voi.windowCenter));
                          windowWidthX=viewport.voi.windowWidth;
                          windowCenterX=viewport.voi.windowCenter;
                        } else if (domWindow == "#dicomImageGrey3") {

                          element = document.getElementById("dicomImageGrey3");
                          var deltaX = e.pageX - lastX,
                            deltaY = e.pageY - lastY;
                          lastX = e.pageX;
                          lastY = e.pageY;
                          viewport.voi.windowWidth =windowWidthY + (deltaX / viewport.scale);
                          viewport.voi.windowCenter =windowCenterY + (deltaY / viewport.scale);
                          cornerstoneGrey.setViewport(element, viewport);
//                                $('#bottomleft').text("WW/WL:" + Math.round(viewport.voi.windowWidth) + "/" + Math.round(viewport.voi.windowCenter));
                          console.log("WW/WL:" + Math.round(viewport.voi.windowWidth) + "/" + Math.round(viewport.voi.windowCenter));
                          windowWidthY=viewport.voi.windowWidth;
                          windowCenterY=viewport.voi.windowCenter;
                        }

                        //console.log("Vue.axisG="+Vue.axisG+"---当前axis="+axis+"---mageId="+imageId)

                      });
                      $(document).mouseup(function (e) {
                        $(document).unbind('mousemove');
                        $(document).unbind('mouseup');
                      });
                    }
                  });

                    //鼠标滚轮滚动事件
                    $(domWindow).on('mousewheel DOMMouseScroll', function (e) {
//                        tooltipZS.style.display = 'none';
//                        tooltipZE.style.display = 'none';
//                        Vue.axisG = axis;
                      if (domWindow == "#dicomImageGrey") {
                        axis = "z";
                      }else if (domWindow == "#dicomImageGrey2") {
                        axis = "x";
                      } else if (domWindow == "#dicomImageGrey3") {
                        axis = "y";
                      }
                      Vue.axisG = axis;
                      axisFlag=axis;
                        if (e.originalEvent.wheelDelta < 0 || e.originalEvent.detail > 0) {//向下滑
                            if (index > 0) {
                                index--;
                                console.log("这是第" + index + "张影像")
                                // Vue.render(index,axis);
                            } else if (index == 0) {
                                index = len - 1;
                                console.log("这是第" + index + "张影像")
                            }
                        } else {
//                            console.log("向上")
                            if (index >= 0 && index < (len - 1)) {
                                index++;
                                console.log("这是第" + index + "张影像")
                                // Vue.render(index,axis);
                            } else if (index == len - 1) {
                                index = 0;
                                // Vue.render(index,axis);
                                console.log("这是第" + index + "张影像")
                            }
                            ;
                        }
                        if (axis == 'z') {
                            imageIndex = 'image_z_' + index;
                            Vue.zIndex = index;
                            var box = document.getElementById('lineBoxZ');
                            var context = box.getContext('2d');
                            Vue.zIndex = index;
                            Vue.noChangePage = false;
                            $.when(Vue.copyLineDB()).done(function (data) {/////如果进行了复制就把数据存入数据库
                                context.clearRect(0, 0, box.width, box.height);
                                Vue.backDrawLine(index);//展示当前张数下的勾画线
                            });
                        }
                        if (axis == 'x') {
                            imageIndex = 'image_x_' + index;
                            Vue.xIndex = index;
                            var boxX = document.getElementById('lineBoxX');
                            var contextX = boxX.getContext('2d');
                            contextX.clearRect(0, 0, boxX.width, boxX.height);
                            Vue.backDrawLineX(index);//展示当前张数下的勾画线
                        }
                        if (axis == 'y') {
                            imageIndex = 'image_y_' + index;
                            Vue.yIndex = index;
                            var boxY = document.getElementById('lineBoxY');
                            var contextY = boxY.getContext('2d');
                            contextY.clearRect(0, 0, boxY.width, boxY.height);
                            Vue.backDrawLineY(index);//展示当前张数下的勾画线
                        }


                        //渲染图像
                        $.when(Vue.getDataByKey(Vue.myDB.db, imageDB, imageIndex)).done(function (oneData) {
//                            updateTheImage(index);
                            Vue.flag = 1;
                            Vue.data_tmp = oneData;
                            cornerstoneGrey.loadImage(imageIds[index]).then(function (imageGrey) {
                                cornerstoneGrey.displayImage(element, imageGrey);
                            });
                        });

                        return false;
                    });

                });
                if ($('#dicomImageGrey3').find('canvas').length > 1) {
                    this.haveCanvasFlag = true;//判断3个底图canvas是否已加载完毕，再设定x/y切面的位置
                }
            },
            copyLineDB() {
                var that = this;
                var defer = $.Deferred();
                $.when(that.getDataByKey(that.myDB.db, 'sketchDB_' + that.imageIdParent, 'sketch_z_' + that.zIndex)).done(function (data) {
                    var copyFlag = true;
                    var copyLineData = window.localStorage.getItem("copyLine");
                    if (!copyLineData) {
                        defer.resolve(true);
                        return false;
                    }
                    copyLineData = JSON.parse(copyLineData);
                    for (var i = 0; i < copyLineData.lineArr.length; i++) {
                        copyLineData.lineArr[i] = JSON.parse(copyLineData.lineArr[i]);
                    }
//                    console.log('copyLineData--------');
//                    console.log(copyLineData);
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].key == copyLineData.keyName) {
                            copyFlag = false;
                        }
                    }
                    if (copyFlag) {
                        var newData = data.concat(copyLineData.lineArr);
//                        console.log(newData);
                        var objLine = {
                            id: "sketch_z_" + that.zIndex,
                            value: newData
                        };
                        that.deleteDataByKey(that.myDB.db, 'sketchDB_' + that.imageIdParent, 'sketch_z_' + that.zIndex);
                        that.addDBSingleData('sketchDB_' + that.imageIdParent, objLine);
                        defer.resolve(true);
                    }
                    window.localStorage.removeItem("copyLine");

                });
                return defer.promise();
            }
            ,
            ctImageGrey(cornerstoneGrey, data, axis) {
                var index = 0;
                var width = 0;
                var height = 0;
                var zIndex = this.zIndex;
                var xIndex = this.xIndex;
                var yIndex = this.yIndex;
                var columnPixelSpacing;
                var rowPixelSpacing;
                var sliceThickness = 3;
                var Vue = this;
                var intercept = this.imageParams.intercept;//获取动态截距
                var slope = this.imageParams.slope;

                function getExampleImageGrey(imageId) {
                    //渲染前的所在轴位判断
                    if (Vue.axisG == "") {
                        if (axis == "z" || axis == "zModal") {
                            index = zIndex
                            width = Vue.imageParams.width;
                            height = Vue.imageParams.height;
                            columnPixelSpacing = Vue.imageParams.columnPixelSpacing;
                            rowPixelSpacing = Vue.imageParams.rowPixelSpacing;
                        }
                        if (axis == "x") {
                            index = xIndex;
                            width = Vue.imageParams.width;
                            height = Vue.imageParams.fileNum;
                            columnPixelSpacing = Vue.imageParams.columnPixelSpacing;
                            rowPixelSpacing = sliceThickness;
                        }
                        if (axis == "y") {
                            index = yIndex;
                            width = Vue.imageParams.width;
                            height = Vue.imageParams.fileNum;
                            columnPixelSpacing = Vue.imageParams.columnPixelSpacing;
                            rowPixelSpacing = sliceThickness;
                        }
                    }
                    else {
                        if (Vue.axisG == "z" || Vue.axisG == "zModal") {
                            index = zIndex
                            width = Vue.imageParams.width;
                            height = Vue.imageParams.height;
                            columnPixelSpacing = Vue.imageParams.columnPixelSpacing;
                            rowPixelSpacing = Vue.imageParams.rowPixelSpacing;
                        }
                        if (Vue.axisG == "x") {
                            index = xIndex;
                            width = Vue.imageParams.width;
                            height = Vue.imageParams.fileNum;
                            columnPixelSpacing = Vue.imageParams.columnPixelSpacing;
                            rowPixelSpacing = sliceThickness;
                        }
                        if (Vue.axisG == "y") {
                            index = yIndex;
                            width = Vue.imageParams.width;
                            height = Vue.imageParams.fileNum;
                            columnPixelSpacing = Vue.imageParams.columnPixelSpacing;
                            rowPixelSpacing = sliceThickness;
                        }
                    }

                    function getPixelDataGrey() {
                        if (Vue.flag == 1) {
                            return Vue.data_tmp;
                        } else {
                            return data;
                        }
                        Vue.data_tmp.length = 0;
                    }

                    var imageGrey = {
                        imageId: imageId,
                        minPixelValue: 0,//最小像素值
                        maxPixelValue: 4096,//最大像素值
                        slope: slope,//斜率
                        intercept: intercept,//截距
                        windowCenter: 250,//窗位
                        windowWidth: 1000,//窗宽
                        render: cornerstoneGrey.renderGrayscaleImage,//渲染灰度图像
                        getPixelData: getPixelDataGrey,//返回像素数组
                        rows: height,//行
                        columns: width,//列
                        height: height,//高
                        width: width,//宽
                        color: false,//是否单色
                        columnPixelSpacing: columnPixelSpacing,//像素之间的纵向间隔
                        rowPixelSpacing: rowPixelSpacing,//像素之间的横向间隔
                        sizeInBytes: width * height * 2//字节大小
                    };
                    var deferred = $.Deferred();
                    deferred.resolve(imageGrey);
                    return deferred;
                }

                cornerstoneGrey.registerImageLoader('ctexample', getExampleImageGrey);

            }
            ,

            // 靶区勾画流程 上级医院医生提交勾画数据
            estimate() {
                Target.finish(this.target).then(response => {
                    showResponse(response, () => this.$router.back())
                })
            },
            // 靶区勾画流程 下级医院医生审核勾画数据
            check(result) {
                if (result == 0) {
                    swal({
                        title: "审核不通过原因",
                        text: "输入审核不通过原因",
                        type: "input",
                        showCancelButton: true,
                        closeOnConfirm: false,
                        confirmButtonText: "确认",
                        cancelButtonText: "取消",
                        animation: "slide-from-top",
                        inputPlaceholder: "输入审核不通过原因"
                    }, inputValue => {
                        if (inputValue === false || inputValue === "") {
                            return false;
                        } else {
                            this.target.checkMemo = inputValue;
                            Target.check(this.target, result).then(response => {
                                showResponse(response, () => this.$router.back())
                            })
                        }

                    })
                } else {
                    Target.check(this.target, result).then(response => {
                        showResponse(response, () => this.$router.back())
                    })
                }
            },
        }
    }
</script>
<style>
    .sketchLine {
        padding: 10px 15px 10px 25px;
        overflow: hidden;
    }

    .sketchLine .likeArea, .sketchLine .editArea {
        position: relative;
        border: 1px solid #dedede;
        border-radius: 5px;
        padding: 15px;
        margin-top: 20px;
    }

    .sketchLine span.fieldSet {
        position: absolute;
        top: -15px;
        left: 20px;
        padding: 3px;
        background: #f7f7f7;
        color: #666;
        font-size: 16px;
        line-height: 22px;
    }

    .sketchLine .addArea {
        overflow: hidden;

    }

    .sketchLine .addArea input.roiName {
        float: left;
        width: auto;
        min-width: 150px;
        padding-right: 4px;
        margin-right: 5px;
        margin-top: 3px;
    }

    .sketchLine .addArea .addBtn {
        margin-top: 3px;
    }

    .sketchLine .delArea {
        overflow: hidden;
        margin-top: 5px;
        clear: both;
    }

    .sketchLine .roiList {
        width: auto;
        min-width: 150px;
        overflow: hidden;
        margin-right: 5px;
        margin-top: 3px;
    }

    .sketchLine .delBtn {
        margin-top: 3px;
    }

    .sketchLine .likeShow {
        position: relative;
        margin-top: 20px;
        padding: 15px;
        border: 1px solid #dedede;
        border-radius: 5px;
    }

    .sketchLine .likeShow .colorBold {
        clear: both;
        overflow: hidden;
    }

    .sketchLine .likeShow .dimension {
        margin-top: 15px;
    }

    .sketchLine .likeShow .colorBold .colorShow, .sketchLine .likeShow .boldShow, .sketchLine .likeShow .twoShow, .sketchLine .likeShow .dimShow {
        border: 1px solid #ccc;
        border-radius: 3px;
        width: 49%;
        text-align: center;
    }

    .sketchLine .colorBold span {
        line-height: 22px;
        color: #333;
        font-size: 14px;
    }

    .sketchLine .colorBold select {
        border-bottom: 0;
    }

    .sketchLine .colorBold .thin {
        font-size: 12px;
    }

    .sketchLine .colorBold .bold {
        font-size: 20px;
    }

    .sketchLine .colorBold .bolder {
        font-size: 28px;
    }

    .sketchLine .opacityControl {
        border: 1px solid #ccc;
        margin-top: 20px;
        padding: 3px;
        border-radius: 5px;
    }

    .sketchLine .opacityControl input {
        width: 30%;
        margin-left: 10px;
        padding-left: 10px;
        border: 1px solid #ccc;
    }

    .sketchLine .editArea i {
        margin-right: 5px;
    }

    .sketchLine .revokeBtn {
        margin-top: 50px;
    }

    .sketchLine .penBtn {
        margin: 20px 0;
        clear: both;
    }

    .sketchLine .moveBtn {
        clear: both;
    }

    .sketchLine .myAction {
        margin-bottom: 5px;
    }

    .sketchLine .allSection {
        height: 200px;
        padding: 10px;
    }

    .sketchLine .allSection div.common {
        width: 50%;
        height: 50%;
        padding: 0px;
    }

    #saveSketch {
        margin-top: 100px;
    }

    .form-control.penPadding {
        padding: 0;
    }

    canvas#lineBoxZ, canvas#lineBoxX, canvas#lineBoxY {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 3;
    }

    .canvasBoxGrey, .canvasBoxGrey2, .canvasBoxGrey1 {
        display: flex;
        align-items: center; /*垂直居中*/
        justify-content: center; /*水平居中*/
        width: 100%;
    }

    #sectionId .directBoxGrey {
        position: absolute;
        left: 50%;
        top: 50%;
    }

    #sectionId #canvasBoxGrey .directBoxGreyBig {
        margin-left: -157.5px;
        margin-top: -157.5px;
    }

    #sectionId #canvasBoxGrey1 .directBoxGreySmall, #sectionId #canvasBoxGrey2 .directBoxGreySmall {
        /*margin-top: -111px;*/
        /*margin-left: -128px;*/
    }

    i.fa-pencil-square-o {
        cursor: pointer;
    }

    .cur_mask {
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.5);
        position: absolute;
        top: 0;
        left: 0;
        z-index: 9999;
        display: none;
    }

    .cur_mask .tipLoadingBox {
        width: 100%;
        height: 100%;
        display: table;
    }

    .cur_mask .tipLoadingBox #tipLoading {
        display: table-cell;
        vertical-align: middle;
        text-align: center;
        color: green;
        font-size: 16px;
        font-family: 'Microsoft YaHei';
    }

    .cur_mask .readImageProgress {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        display: none;
        z-index: 999;
    }

    /*进度条展示*/
    .progress-tip2 {
        position: absolute;
        width: 200px;
        height: 10px;
        border: 1px solid #fff;
        border-radius: 5px;
        z-index: 999;
        top: 50%;
        margin-top: -5px;
        left: 50%;
        margin-left: -100px;
        text-align: center;
    }

    .progress-tip2 div.text-center {
        position: absolute;
        top: -22px;
        width: 100%;
        color: #fff;
        font-size: 12px;
    }

    .progress-tip2 .progressing {
        background: green;
        width: 0;
        height: 8px;
        border-radius: 4px;
    }

    .progress-tip2 span {
        color: green;
        font-size: 14px;
        line-height: 20px;
    }
    ul,ol{list-style:none;}
  .showFeatures li{
    padding-left:10px;
  }
  .showFeatures li:hover{
    background:#eee;
    cursor:pointer;
  }
</style>
