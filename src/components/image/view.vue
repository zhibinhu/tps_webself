<template>
    <div class="viewerContent" style="height:100%; width:100%;position: relative;padding: 0 10px;">
        <div class="progress-tip">
            <div class="text-center">正在加载数据中...</div>
            <div class="progressing"></div>
            <span></span></div>
        <div class="view-nav changBtnStyle">
            <div class="pull-right">
                <!--<a class="text-info"><i class="fa fa-cloud-download"></i></a>-->
                <button id="bone" class="btn btn-info btn-sm">骨</button>
                <button id="lung" class="btn btn-info btn-sm">肺</button>
                <button id="softTissue" class="btn btn-info btn-sm">软组织</button>
            </div>
            <div class="pull-left">
                <a href="javascript:void(0);" class="btn btn-info btn-sm" @click="moveCanvasNow(2)" id="move">平移</a>
                <a href="javascript:void(0);" class="btn btn-info btn-sm" @click="moveCanvasNow(3)" id="scale">缩放</a>
                <a href="javascript:void(0);" class="btn btn-info btn-sm" @click="moveCanvasNow(1)"
                   id="default">窗宽 / 窗位</a>{{ loadThreeImg }}
            </div>
        </div>
        <div class="view-drawing container row" id="distanceTop" style="width:100%;height:516px;">
            <!--左边大盒子-->
            <div class="view-left col-md-8 col-lg-8" id="view-left">
                <div class="canvasBox" id="boxBorder"
                     style="height:100%; width:100%;overflow:hidden;position: relative;">
                    <div id="canvasBox" style="width:400%;height:400%;overflow:hidden;position: absolute;"
                         :style="{left: jisuanValue.left,top:jisuanValue.top}">
                        <div class="directBox directBoxBig" id="dicomImage" style="height:512px; width:512px;">
                            <canvas class="drawLineX" width="256" height="222" style="position:absolute;z-index:999;left:-100px"></canvas>
                            <canvas class="drawLineY" width="256" height="222" style="position:absolute;z-index:999;top: -100px;"></canvas>
                        </div>
                    </div>
                    <div id="imgInfo">
                        <ul style="position: absolute;top: 20px;left: 20px; color: #FF9696;z-index:9999;font-size:12px">
                            <li>Im：<span id="curPage"><span>{{ zIndexPage }}</span>/{{ imageParams.fileNum}}</span></li>
                        </ul>
                        <ul style="position: absolute;bottom: 20px;left: 20px; color: #FF9696;z-index:9999;font-size:12px">
                            <li>
                                WW：<span id="windowWidth">{{ imageParams.windowWidth }}</span>&nbsp;
                                WL：<span id="windowCenter">{{ imageParams.windowCenter }}</span>
                            </li>
                            <li>T : {{imageParams.sliceSpacing.toFixed(1)}}</li>
                            <li>L : {{recentOri.toFixed(1)}}</li>
                        </ul>
                        <ul style="position: absolute;top: 20px;right: 20px; color: #FF9696;z-index:9999;font-size:12px">
                            <li>{{imageParams.patient.patientName}}</li>
                            <li>{{imageParams.patient.gender}}</li>
                            <li>{{imageParams.patient.id}}</li>
                            <li>{{imageParams.patient.patientPosition}}</li>

                        </ul>
                        <ul style="position: absolute;bottom:20px;right: 20px; color: #FF9696;z-index:9999;font-size:12px">
                            <li v-if="imageParams.patient.current!=undefined">{{imageParams.patient.current+'mA '+imageParams.patient.voltage+'kV'}}</li>
                            <li v-if="imageParams.patient.gatherDate!=undefined">{{imageParams.patient.gatherDate.substring(0,10)+' '+imageParams.patient.gatherTime}}</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="view-right col-md-4 col-lg-4">
                <!--右上小盒子-->
                <div class="view-right-top" id="view-right-top">
                    <div class="canvasBox1" id="boxBorder1"
                         style="height:100%; width:100%;overflow:hidden;position: relative;">
                        <div id="canvasBox1" style="width:400%;height:400%;overflow:hidden;position: absolute;"
                             :style="{left: jisuanValue.left1,top:jisuanValue.top1 }">
                            <div class="directBox directBoxSmall" id="dicomImage2" >
                                <canvas class="drawLine" width="256" height="222" style="position:absolute;z-index:0"></canvas>
                            </div>
                        </div>
                        <div>
                            <ul style="position: absolute;top: 20px;left: 20px; color: #FF9696;z-index:9999;font-size:12px">
                                <li>Im：<span id="curPage1"><span>{{ xIndexPage }}</span>/{{ imageParams.width}}</span></li>
                            </ul>
                            <ul style="position: absolute;bottom: 20px;left: 20px; color: #FF9696;z-index:9999;font-size:12px">
                                <li>
                                    WW：<span id="windowWidth1">{{ imageParams.windowWidth }}</span>&nbsp;
                                    WL：<span id="windowCenter1">{{ imageParams.windowCenter }}</span>
                                </li>
                                <li>T : {{imageParams.rowPixelSpacing.toFixed(1)}}</li>
                                <li>L : {{xOri.toFixed(1)}}</li>
                            </ul>
                            <ul style="position: absolute;top: 20px;right: 20px; color: #FF9696;z-index:9999;font-size:12px">
                                <li>{{imageParams.patient.patientName}}</li>
                                <li>{{imageParams.patient.gender}}</li>
                                <li>{{imageParams.patient.id}}</li>
                                <li>{{imageParams.patient.patientPosition}}</li>

                            </ul>
                            <ul style="position: absolute;bottom:20px;right: 20px; color: #FF9696;z-index:9999;font-size:12px">
                                <li v-if="imageParams.patient.current!=undefined">{{imageParams.patient.current+'mA '+imageParams.patient.voltage+'kV'}}</li>
                                <li v-if="imageParams.patient.gatherDate!=undefined">{{imageParams.patient.gatherDate.substring(0,10)+' '+imageParams.patient.gatherTime}}</li>
                            </ul>
                        </div>
                        <!--<div class="winWidthAndCenter">
                            <p>当前张数：<span id="curPage1"><span>{{ xIndexPage }}</span>/{{ imageParams.width}}</span></p>
                            <p>窗宽：<span id="windowWidth1">{{ imageParams.windowWidth }}</span></p>
                            <p>窗位：<span id="windowCenter1">{{ imageParams.windowCenter }}</span></p>
                        </div>-->
                    </div>
                </div>
                <!--右下小盒子-->
                <div class="view-right-bottom" id="view-right-bottom">
                    <div class="canvasBox2" id="boxBorder2"
                         style="height:100%; width:100%;overflow:hidden; position: relative;">
                        <div id="canvasBox2" style="width:400%;height:400%;overflow:hidden;position: absolute;"
                             :style="{left: jisuanValue.left2,top:jisuanValue.top2 }">
                            <div class="directBox directBoxSmall" id="dicomImage3" style="width:256px;height:222px;">
                                <canvas class="drawLine" width="256" height="222" style="position:absolute;z-index:0;"></canvas>
                            </div>
                        </div>

                        <!--<div class="winWidthAndCenter">
                            <p>当前张数：<span id="curPage2"><span>{{ yIndexPage }}</span>/{{ imageParams.height}}</span></p>
                            <p>窗宽：<span id="windowWidth2">{{ imageParams.windowWidth }}</span></p>
                            <p>窗位：<span id="windowCenter2">{{ imageParams.windowCenter }}</span></p>
                        </div>-->
                        <div>
                            <ul style="position: absolute;top: 20px;left: 20px; color: #FF9696;z-index:9999;font-size:12px">
                                <li>Im：<span id="curPage2"><span>{{ xIndexPage }}</span>/{{ imageParams.width}}</span></li>
                            </ul>
                            <ul style="position: absolute;bottom: 20px;left: 20px; color: #FF9696;z-index:9999;font-size:12px">
                                <li>
                                    WW：<span id="windowWidth2">{{ imageParams.windowWidth }}</span>&nbsp;
                                    WL：<span id="windowCenter2">{{ imageParams.windowCenter }}</span>
                                </li>
                                <li>T : {{imageParams.rowPixelSpacing.toFixed(1)}}</li>
                                <li>L : {{yOri.toFixed(1)}}</li>
                            </ul>
                            <ul style="position: absolute;top: 20px;right: 20px; color: #FF9696;z-index:9999;font-size:12px">
                                <li>{{imageParams.patient.patientName}}</li>
                                <li>{{imageParams.patient.gender}}</li>
                                <li>{{imageParams.patient.id}}</li>
                                <li>{{imageParams.patient.patientPosition}}</li>

                            </ul>
                            <ul style="position: absolute;bottom:20px;right: 20px; color: #FF9696;z-index:9999;font-size:12px">
                                <li v-if="imageParams.patient.current!=undefined">{{imageParams.patient.current+'mA '+imageParams.patient.voltage+'kV'}}</li>
                                <li v-if="imageParams.patient.gatherDate!=undefined">{{imageParams.patient.gatherDate.substring(0,10)+' '+imageParams.patient.gatherTime}}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    var cornerstone = require("./../../../static/js/cornerstone")
    import {del, treeify} from '../../misc/utils'
    import {Image} from '../../resources'
    import {Download} from '../../resources'
    import swal from 'sweetalert'
    import Pagination from '../../widgets/pagination.vue'
    import {debounce} from '../../misc/utils'
    import paginations from '../../widgets/paginations.vue'

    export default {
        props: ["showStateFlag", "imageSizeParent", "imageIdParent", "imgView", "imageParams","ctImageFlag","patient"],
        data: () => ({
            loading: 0,
            keyword: '',
            page: {},
            cur: 1,
            all: 1,
            curIndex_s: 1,
            count: 0,
            zData: [],
            zIndex: 65,
            zIndexPage:0,
            zLen: 0,
            zImageIds: [],
            xData: [],
            xIndex: 260,
            xIndexPage: 0,
            xLen: 0,
            xImageIds: [],
            yData: [],
            yIndex: 260,
            yIndexPage: 0,
            yLen: 0,
            yImageIds: [],
            axisG: "",
            scaleSize: 0,//放大倍数百分比值
            moveFlag: 1,  //1.影像图窗宽窗位变化 2.不能变，只能平移
            scaleFlag: 1,  //1.影像图窗宽窗位变化 3.不能变，只能缩放
//            winPosFlag:1  //1.影像图窗宽窗位变化 2|3.不能变，只能平移或缩放
            canvasLength: 0,
            volumeOri:[],
            recentOri:0,
            x:'x',
            y:'y',
            z:'z',
            xOri:0,
            yOri:0,
            resizeWindowFlag:0
        }),
        beforeRouteEnter(to, from, next) {
            Image.query().then(response => {
                next(vm => {
                    vm.page = response.data
                    vm.all = parseInt(vm.page.totalCount % vm.page.pageSize == 0 ? vm.page.totalCount / vm.page.pageSize : vm.page.totalCount / vm.page.pageSize + 1)
                    vm.count = vm.page.totalCount

//                    page_backup = response.data
                    vm.$nextTick(() => vm.$store.state.isLoading = false)
                })
            })
        },
        beforeRouteUpdate(to, from, next) {
            this.$store.state.isLoading = false
            this.paging(1, next)
        },
        mounted: function () {
            var that=this;

            that.initialize();
            that.volumeOri  = that.imageParams.volumeOri;
            that.recentOri=that.imageParams.volumeOri[that.zIndex];
            console.log('that.imageParams');
            console.log(that.imageParams);
            this.$nextTick(function () {

//                this.readImage(this.imageIdParent);
                this.style();
            });
            //设置影像图盒子的高度
            var distanceTop=this.distanceTop('distanceTop');
            var winHeight=window.innerHeight;
            var minusResult=winHeight-distanceTop-10;
            document.getElementById('distanceTop').style.height=minusResult+'px';
            window.onresize=function () {
                that.resizeWindowFlag++;
            }
        },
        destroyed(){

        },
        computed: {
            jisuanValue() {
                if (this.canvasLength > 0) {
                    var changeSizeFlag=this.resizeWindowFlag;
                    var boxBorderWidth = $('#boxBorder')[0].offsetWidth;
                    var boxBorderHeight = $('#boxBorder')[0].offsetHeight;
                    var canvasBoxWidth = $('#canvasBox')[0].offsetWidth;
                    var canvasBoxHeight = $('#canvasBox')[0].offsetHeight;

                    var boxBorderWidth1 = $('#boxBorder1')[0].offsetWidth;
                    var boxBorderHeight1 = $('#boxBorder1')[0].offsetHeight;
                    var canvasBoxWidth1 = $('#canvasBox1')[0].offsetWidth;
                    ;
                    var canvasBoxHeight1 = $('#canvasBox1')[0].offsetHeight;

                    var boxBorderWidth2 = $('#boxBorder2')[0].offsetWidth;
                    var boxBorderHeight2 = $('#boxBorder2')[0].offsetHeight;
                    var canvasBoxWidth2 = $('#canvasBox2')[0].offsetWidth;
                    var canvasBoxHeight2 = $('#canvasBox2')[0].offsetHeight;

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
            loadThreeImg(){
//                alert(this.imgView);
                if (this.imgView==1 && parseInt($('#dicomImage').find('canvas').length) <= 0) {
                    this.readImage(this.imageIdParent);

                }
            }
        },
        methods: {
            distanceTop(obj){
                var thisObj=document.getElementById(obj);
                var distance=0;
                while(thisObj.offsetParent!=null){
                    distance+=thisObj.offsetTop;
                    thisObj=thisObj.offsetParent;
                }
                return distance;
            },
            moveCanvasNow(paramFlag) {
                //2.平移 3.缩放 1.窗宽窗位可变化
                if (paramFlag == 2) {
                    this.moveFlag = 2;
                    this.scaleFlag = 2;
                    $('body *').on('mouseover.MOVE', this.bindMove);//绑定平移功能
                    $('body *').off('.SCALE');//解绑缩放功能
                    var thisCanvas = document.getElementsByTagName('canvas');
                    for (var i = 0; i < thisCanvas.length; i++) {
                        thisCanvas[i].style.cursor = 'move';
                    }
                    console.log('this.moveFlag888==='+this.moveFlag);
                    return false;
                } else if (paramFlag == 3) {
                    this.scaleFlag = 3;
                    this.moveFlag = 3;
                    $('body *').on('mouseover.SCALE', this.bindScale);//绑定缩放功能
                    $('body *').off('.MOVE');//解绑平移功能
                    var thisCanvas = document.getElementsByTagName('canvas');
                    for (var i = 0; i < thisCanvas.length; i++) {
                        thisCanvas[i].style.cursor = 's-resize';
                    }
                    return false;
                } else if (paramFlag == 1) {
                    this.moveFlag = 1;
                    this.scaleFlag = 1;
                    var that = this;
                    var thisCanvas = document.getElementsByTagName('canvas');
                    for (var i = 0; i < thisCanvas.length; i++) {
                        thisCanvas[i].style.cursor = 'default';
                    }
                }
                $('body *').off('mouseover.MOVE', this.bindMove);//解绑平移功能
                $('body *').off('mouseover.SCALE', this.bindScale);//解绑缩放功能
                return false;
            },
            bindMove(e) {   //            绑定平移方法
                e.stopPropagation();
                var curObj = e.target.parentNode.parentNode.id;
                if (curObj == 'canvasBox' || curObj == 'canvasBox1' || curObj == 'canvasBox2') {
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
                        this.moveObj(obj, parentObjWidth, parentObjHeight,2);
                    }
                }
            },
            bindScale(e) {
                e.stopPropagation();
                var curObj = e.target.parentNode.parentNode.id;
                if (curObj == 'canvasBox' || curObj == 'canvasBox1' || curObj == 'canvasBox2') {
                    var parentObj = document.getElementById(curObj);
//                    var parentObj=document.getElementById(parentObj.parentNode.id);
                    var parentObjWidth = parentObj.offsetWidth;
                    var parentObjHeight = parentObj.offsetHeight;

//                    var boxBorderObj=parentObj.parentNode.id;
//                    var boxBorderObjWidth=document.getElementById(boxBorderObj).offsetWidth;
//                    var boxBorderObjHeight=document.getElementById(boxBorderObj).offsetHeight;

                    var obj = parentObj.getElementsByTagName('div')[0];
                    if (this.scaleFlag == 3) {
                        this.moveObj(obj, parentObjWidth, parentObjHeight,3);
                    }
                }
            },
            moveObj(obj, parentObjWidth, parentObjHeight,scaleFlag) {
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

                                    var nowScale=parseFloat((that.scaleSize / 100).toFixed(2));
//                                console.log('nowScale==='+nowScale);//下面设置的9/10，表示将有1/10的部分不能被拖出窗口
                                    newPosX=newPosX<=(parentObjWidth*3/8-obj.offsetWidth*(9/10)-(1/2)*nowScale*obj.offsetWidth)?(parentObjWidth*3/8-obj.offsetWidth*(9/10)-(1/2)*nowScale*obj.offsetWidth):newPosX>=(parentObjWidth*5/8-20+(1/2)*nowScale*obj.offsetWidth)?(parentObjWidth*5/8-20+(1/2)*nowScale*obj.offsetWidth):newPosX;
                                    newPosY=newPosY<=(parentObjHeight*3/8-obj.offsetHeight*(9/10)-(1/2)*nowScale*obj.offsetHeight)?(parentObjHeight*3/8-obj.offsetHeight*(9/10)-(1/2)*nowScale*obj.offsetHeight):newPosY>=(parentObjHeight*5/8-20+(1/2)*nowScale*obj.offsetHeight)?(parentObjHeight*5/8-20+(1/2)*nowScale*obj.offsetHeight):newPosY;
                                    obj.style.left = newPosX + 'px';
                                    obj.style.top = newPosY + 'px';
                                    obj.style.marginLeft = 0;
                                    obj.style.marginTop = 0;
                                }
//                                console.log('currentScale===' + currentScale);
                                obj.style.transform = 'scale(' + (1 + currentScale) + ')';


                                startX = moveX;
                                startY = moveY;

                                posX = newPosX;
                                posY = newPosY;
                            } else {
                                /////放大4倍后的位移限制：不小于1倍時的x再減去放大后寬度的一半，同理其他；
                                var nowScale=parseFloat((that.scaleSize / 100).toFixed(2));
//                                console.log('nowScale==='+nowScale);
                                newPosX=newPosX<=(parentObjWidth*3/8-obj.offsetWidth*(9/10)-(1/2)*nowScale*obj.offsetWidth)?(parentObjWidth*3/8-obj.offsetWidth*(9/10)-(1/2)*nowScale*obj.offsetWidth):newPosX>=(parentObjWidth*5/8-20+(1/2)*nowScale*obj.offsetWidth)?(parentObjWidth*5/8-20+(1/2)*nowScale*obj.offsetWidth):newPosX;
                                newPosY=newPosY<=(parentObjHeight*3/8-obj.offsetHeight*(9/10)-(1/2)*nowScale*obj.offsetHeight)?(parentObjHeight*3/8-obj.offsetHeight*(9/10)-(1/2)*nowScale*obj.offsetHeight):newPosY>=(parentObjHeight*5/8-20+(1/2)*nowScale*obj.offsetHeight)?(parentObjHeight*5/8-20+(1/2)*nowScale*obj.offsetHeight):newPosY;
//                                var aa1=parentObjWidth*3/8-obj.offsetWidth-(1/2)*nowScale*obj.offsetWidth;
//                                var aa2=parentObjWidth*5/8-20+(1/2)*nowScale*obj.offsetWidth;
//                                console.log('min==='+aa1);
//                                console.log('max==='+aa2);
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
                            document.onmousemove = null;
                            document.onmouseup = null;

                        }
                    }
                }
            },
            initialize(){
                var sliceSpacing=this.imageParams.sliceSpacing;
                var spacing=this.imageParams.rowPixelSpacing;
                var width=this.imageParams.width;
                var height=this.imageParams.height;
                var fileNum=this.imageParams.fileNum;
                var asp=(width*spacing)/(fileNum*sliceSpacing);
                var heightXY=200/asp;
                var heightXY2=200*asp;

                //判断生成图像是以长或者宽作为标准
                var actualWidth=width*spacing;
                var actualHeight=height*sliceSpacing;
                if(actualWidth>=actualHeight){
                    $('#dicomImage2').width(200);
                    $('#dicomImage3').width(200);
                    $('#dicomImage2').height(heightXY);
                    $('#dicomImage3').height(heightXY);
                }else{
                    $('#dicomImage2').height(200);
                    $('#dicomImage3').height(200);
                    $('#dicomImage2').width(heightXY2);
                    $('#dicomImage3').width(heightXY2);
                }
            },

            drawLine(obj,k) {
                var ctx=obj.getContext('2d');
                ctx.strokeStyle='red';
                ctx.beginPath();
                ctx.moveTo(0,k);
                ctx.lineTo(obj.offsetWidth,k);
                ctx.stroke();
                ctx.closePath();
                ctx.clearRect(0,k+1,obj.offsetWidth,obj.offsetHeight-k-1);
                ctx.clearRect(0,0,obj.offsetWidth,k);
            },
            drawLineY(obj,k) {
                var ctx=obj.getContext('2d');
                ctx.strokeStyle='red';
                ctx.beginPath();
                ctx.moveTo(k,0);
                ctx.lineTo(k,obj.offsetHeight);
                ctx.stroke();
                ctx.closePath();
                ctx.clearRect(k+1,0,obj.offsetWidth-k-1,obj.offsetHeight);
                ctx.clearRect(0,0,k,obj.offsetHeight);
            },
            paging(pn, cb) {  // 分页查询
                this.loading = 1
                Image.query({keyword: this.keyword, pn: pn || 1}).then(response => {
                    this.page = response.data
                    this.all = parseInt(this.page.totalCount % this.page.pageSize == 0 ? this.page.totalCount / this.page.pageSize : this.page.totalCount / this.page.pageSize + 1)
                    this.count = this.page.totalCount
                    this.loading = 0
                    cb && cb()
                })
            },
            readImage(id) {
                console.log('loading...');
                var that=this;
                $(".right-top-line").hide();
                $(".right-bottom-line").hide();
                var type = 1;
                var z = "z";
                var x = "x";
                var y = "y";
                Download.readImage(id, type, this.imageSizeParent).then(response => {
                    var startTime = new Date().getTime()
                    if (response.status == "200") {
                        $('.progress-tip').hide();//隐藏进度条
                        this.canvasLength = 1; //把canvas元素个数置为1
                        var uint16 = new Uint16Array(response.data); // length为4


                        var width = this.imageParams.width;
                        var height = this.imageParams.height;
                        var fileNum = this.imageParams.fileNum;
                        var sliceSpacing=this.imageParams.sliceSpacing;

                        this.zIndexPage=Math.floor(fileNum/2);
                        this.xIndexPage=Math.floor(width/2);
                        this.yIndexPage=Math.floor(height/2);

                        that.xOri=that.imageParams.rowPixelSpacing*(that.xIndexPage-1);
                        that.yOri=that.imageParams.rowPixelSpacing*(that.yIndexPage-1);

                        this.zIndex=this.zIndexPage;
                        this.yIndex=this.yIndexPage;
                        this.xIndex=this.xIndexPage;


                        //声明三切面数组
                        var arr_x = [];
                        var arr_y = [];
                        var arr_z = [];

                        var num = uint16.length
                        console.log("num: " + num)
                        for (var i = 0; i < num; i++) {
                            uint16[i] = uint16[i];
                        }


                        //生成 Z 切面 数据
                        for (var i = 0; i < fileNum; i++) {
                            arr_z[(fileNum - 1 ) - i] = uint16.slice((width * height) * i, (width * height) * (i + 1))
                        }
                        //生成 X 切面 数据

                        for (var jx = 0; jx < height; jx++) {
                            arr_x[jx] = []
                            for (var kx = 0; kx < arr_z.length; kx++) {
                                //每一像素行数据
                                arr_x[jx].push.apply(arr_x[jx], arr_z[kx].slice(width * jx, width * (jx + 1)))
                            }
                        }
                        //生成 Y 切面 数据
                        for (var jy = 0; jy < width; jy++) {
                            arr_y[jy] = []
                            for (var ky = 0; ky < arr_z.length; ky++) { //获取每行数据
                                var line = []
                                //获取一行像素点的值
                                for (var my = 0; my < height; my++) {//获取单像素点数据
                                    //获取行内指定一个像素点的值
                                    line[my] = arr_z[ky][width * my + jy]
                                }
                                arr_y[jy].push.apply(arr_y[jy], line)
                                line=null;
                            }
                        }


                        this.xData = arr_x;
                        this.yData = arr_y;
                        this.zData = arr_z;
//                        console.log("this.showStateFlag: " + this.showStateFlag)
//                        console.log("this.showStateFlag == 1: " + this.showStateFlag == 1)
//
//                        console.log("parseInt($('#dicomImage').find('canvas').length): " + parseInt($('#dicomImage').find('canvas').length))
//                        if (this.imgView == 1 && parseInt($('#dicomImage').find('canvas').length) <= 0) {
//                        if (this.showStateFlag==1 && parseInt($('#dicomImage').find('canvas').length) <= 0) {
//                            console.log("imgView: " + this.imgView)
                        var WHbili=(width*this.imageParams.rowPixelSpacing)/(fileNum*sliceSpacing);
                        var rightDicomWidth=280;
                        var rightDicomHeight=parseInt(280/WHbili);
                        if(width*this.imageParams.rowPixelSpacing>fileNum*sliceSpacing){
                            rightDicomWidth=280;
                            rightDicomHeight=parseInt(280/WHbili)

                        }else{
                            rightDicomWidth=parseInt(280/WHbili)
                            rightDicomHeight=280
                        }

                        $('#dicomImage2,#dicomImage3').css({
                            "width":rightDicomWidth+'px',
                            "height":rightDicomHeight+'px',
                            'margin-top':-rightDicomHeight/2+'px',
                            'margin-left':-rightDicomWidth/2+'px'
                        });
                        $('canvas.drawLineX').attr({

                            'width':that.imageParams.width+200,
                            'height':that.imageParams.height
                        })
                        $('canvas.drawLineY').attr({

                            'width':that.imageParams.width+200,
                            'height':that.imageParams.height+200
                        })
                        $('canvas.drawLine').attr({

                            'width':rightDicomWidth+100,
                            'height':rightDicomHeight

                        })

                        this.xLen = this.xData.length;
                        this.ctImage(cornerstone, x);
                        this.loader(x);

                        this.yLen = this.yData.length;
                        this.ctImage(cornerstone, y);
                        this.loader(y);

                        this.zLen = this.zData.length;
                        this.ctImage(cornerstone, z);
                        this.loader(z);

                        console.log(this.xLen + " " + this.yLen + " " + this.zLen);

                        var endTime = new Date().getTime()
                        console.log((endTime - startTime) / 1000 + "秒")
//                        }
                    }
                })
            },
            paging_delayed: debounce(function () {
                this.paging(1)
            }, 400),
            download(id) {
                Image.download(id).then(response => {
                    window.open(response.data.path);
                })
            },

            query(id) {
                this.loading = 1
                this.curIndex_s = id
                this.paging(1)
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


            moveMouse() {

                var lastX = e.pageX;
                var lastY = e.pageY;
                var that = this;
                $(document).mousemove(function (e) {
                    if (that.domWindow == "#dicomImage") {
                        axis = "z";
                        Vue.axisG = axis;

                    } else if (that.domWindow == "#dicomImage2") {
                        axis = "x";
                        Vue.axisG = axis;
                    } else if (that.domWindow == "#dicomImage3") {
                        axis = "y";
                        Vue.axisG = axis;
                    }

                    //console.log("Vue.axisG="+Vue.axisG+"---当前axis="+axis+"---mageId="+imageId)
                    var deltaX = e.pageX - lastX,
                        deltaY = e.pageY - lastY;
                    lastX = e.pageX;
                    lastY = e.pageY;
                    viewport.voi.windowWidth += (deltaX / viewport.scale);
                    viewport.voi.windowCenter += (deltaY / viewport.scale);
                    cornerstone.setViewport(element, viewport);
//                    $('#bottomleft').text("WW/WL:" + Math.round(viewport.voi.windowWidth) + "/" + Math.round(viewport.voi.windowCenter));
                    console.log("WW/WL:" + Math.round(viewport.voi.windowWidth) + "/" + Math.round(viewport.voi.windowCenter));
                });
                $(document).mouseup(function (e) {
                    $(document).unbind('mousemove');
                    $(document).unbind('mouseup');
                });

            },
            loader(axis) {
                //console.log("axis==="+axis);
                var imageId = "";
                var index = 0;
                var len = 0;
                var Vue = this;
                var domWindow = ""
                var Vue = this;
                var zIndex = this.zIndex;
                var zLength = this.zLen;
                //获得X轴canvas高度
                var topHeight = 0;

                /*                var topWidth=0;
                                topWidth=$(".canvasBox1").width();*/
                /*                console.log("topWidth="+topWidth)
                                $(".right-bottom-line").width(topWidth);*/

                //定义X轴线条到顶部距离
                var topDistance = 0;

                if (axis == "z") {
                    domWindow = "#dicomImage"
                    imageId = 'ctexample://' + this.zIndex;
                    index = this.zIndex;
                    len = this.zLen;
                    for (var i = 0; i < len; i++) {
                        this.zImageIds[i] = 'ctexample://' + (i);
                    }
                    var element = $('#dicomImage').get(0);
                    cornerstone.enable(element);
                    var imageIds = this.zImageIds;
                }
                if (axis == "x") {
                    domWindow = "#dicomImage2"
                    imageId = 'ctexample://' + this.xIndex;
                    index = this.xIndex;
                    len = this.xLen;
                    for (var i = 0; i < len; i++) {
                        this.xImageIds[i] = 'ctexample://' + (i);
                    }
                    var element = document.getElementById("dicomImage2");
                    cornerstone.enable(element);
                    var imageIds = this.xImageIds;
                }
                if (axis == "y") {
                    domWindow = "#dicomImage3"
                    imageId = 'ctexample://' + this.yIndex;
                    index = this.yIndex;
                    len = this.yLen;
                    for (var i = 0; i < len; i++) {
                        this.yImageIds[i] = 'ctexample://' + (i);
                    }
                    var element = document.getElementById("dicomImage3");
                    cornerstone.enable(element);
                    var imageIds = this.yImageIds;
                }

//                function updateTheImage(imageIndex) {
//                    var currentImageIndex = imageIndex;
//                    console.log("updateTheImage--imageIndex=" + currentImageIndex)
//                    cornerstone.loadImage(imageIds[currentImageIndex]).then(function (image) {
//                        cornerstone.displayImage(element, image);
//                    });
//                };
                cornerstone.loadImage(imageId).then(function (image) {
                    cornerstone.displayImage(element, image);
                    var viewport = cornerstone.getViewport(element);

                    $('#bottomright').text("Zoom: " + viewport.scale + "x");
                    $('#bottomleft').text("WW/WC:" + Math.round(viewport.voi.windowWidth) + "/" + Math.round(viewport.voi.windowCenter));
                    $('#softTissue').click(function (e) {
                        if (Vue.axisG == axis) {
                            var viewport = cornerstone.getViewport(element);
                            viewport.voi.windowWidth = 400;
                            viewport.voi.windowCenter = 20;
                            cornerstone.setViewport(element, viewport);
                            if(axis=='z'){
                                document.getElementById('windowWidth').innerHTML=400;
                                document.getElementById('windowCenter').innerHTML=20
                            }else if(axis=='x'){
                                document.getElementById('windowWidth1').innerHTML=400;
                                document.getElementById('windowCenter1').innerHTML=20
                            }else{
                                document.getElementById('windowWidth2').innerHTML=400;
                                document.getElementById('windowCenter2').innerHTML=20
                            }
                        } else {
                            return;
                        }
                    });

                    //自定义窗宽窗位点击方法
                    $('#lung').click(function (e) {
                        if (Vue.axisG == axis) {//先判断当前轴是否等于主轴,只渲染当前主轴的图像
                            var viewport = cornerstone.getViewport(element);
                            viewport.voi.windowWidth = 1600;
                            viewport.voi.windowCenter = -600;
                            cornerstone.setViewport(element, viewport);
                            if(axis=='z'){
                                document.getElementById('windowWidth').innerHTML=1600;
                                document.getElementById('windowCenter').innerHTML=-600
                            }else if(axis=='x'){
                                document.getElementById('windowWidth1').innerHTML=1600;
                                document.getElementById('windowCenter1').innerHTML=-600
                            }else{
                                document.getElementById('windowWidth2').innerHTML=1600;
                                document.getElementById('windowCenter2').innerHTML=-600
                            }
                        } else {
                            return;
                        }
                    });
                    $('#bone').click(function (e) {
                        if (Vue.axisG == axis) {
                            //throw Error("ddd")
                            //console.log("按下的图像id="+imageId+"--当前轴位="+axis+"--全局轴位"+Vue.axisG)
                            var viewport = cornerstone.getViewport(element);
                            viewport.voi.windowWidth = 2000;
                            viewport.voi.windowCenter = 300;
                            cornerstone.setViewport(element, viewport);
                            if(axis=='z'){
                                document.getElementById('windowWidth').innerHTML=2000;
                                document.getElementById('windowCenter').innerHTML=300
                            }else if(axis=='x'){
                                document.getElementById('windowWidth1').innerHTML=2000;
                                document.getElementById('windowCenter1').innerHTML=300
                            }else{
                                document.getElementById('windowWidth2').innerHTML=2000;
                                document.getElementById('windowCenter2').innerHTML=300
                            }
                        } else {
                            return;
                        }

                    });
                    $(domWindow).mousedown(function (e) {
                        if (Vue.moveFlag == 1 && Vue.scaleFlag == 1) {//判断是否点击了平移、缩放按钮
                            var lastX = e.pageX;
                            var lastY = e.pageY;
                            $(document).mousemove(function (e) {
                                if (domWindow == "#dicomImage") {
                                    axis = "z";
                                    Vue.axisG = axis;

                                } else if (domWindow == "#dicomImage2") {
                                    axis = "x";
                                    Vue.axisG = axis;
                                } else if (domWindow == "#dicomImage3") {
                                    axis = "y";
                                    Vue.axisG = axis;
                                }

                                //console.log("Vue.axisG="+Vue.axisG+"---当前axis="+axis+"---mageId="+imageId)
                                var deltaX = e.pageX - lastX,
                                    deltaY = e.pageY - lastY;
                                lastX = e.pageX;
                                lastY = e.pageY;
                                viewport.voi.windowWidth += (deltaX / viewport.scale);
                                viewport.voi.windowCenter += (deltaY / viewport.scale);
                                cornerstone.setViewport(element, viewport);
//                                $('#bottomleft').text("WW/WL:" + Math.round(viewport.voi.windowWidth) + "/" + Math.round(viewport.voi.windowCenter));
                                console.log("WW/WL:" + Math.round(viewport.voi.windowWidth) + "/" + Math.round(viewport.voi.windowCenter));
                                if (domWindow == "#dicomImage") {
                                    document.getElementById('windowWidth').innerHTML=Math.round(viewport.voi.windowWidth);
                                    document.getElementById('windowCenter').innerHTML=Math.round(viewport.voi.windowCenter);
                                } else if (domWindow == "#dicomImage2") {
                                    document.getElementById('windowWidth1').innerHTML=Math.round(viewport.voi.windowWidth);
                                    document.getElementById('windowCenter1').innerHTML=Math.round(viewport.voi.windowCenter);
                                } else if (domWindow == "#dicomImage3") {
                                    document.getElementById('windowWidth2').innerHTML=Math.round(viewport.voi.windowWidth);
                                    document.getElementById('windowCenter2').innerHTML=Math.round(viewport.voi.windowCenter);
                                }
                            });
                            $(document).mouseup(function (e) {
                                $(document).unbind('mousemove');
                                $(document).unbind('mouseup');
                            });
                        }
                    });
////
                    $("#dicomImage canvas").eq(2).css({
                        'position':'relative'
                    })
                    $('#dicomImage2 canvas').eq(1).css({
                        "position":"relative",
                        "z-index":"5"
                    });
                    $('#dicomImage3 canvas').eq(1).css({
                        "position":"relative",
                        "z-index":"5"
                    })
                    //鼠标滚轮滚动事件
                    $(domWindow).on('mousewheel DOMMouseScroll', function (e) {
                        console.log("axis=" + axis + "---index=" + index + "---len" + len)
                        //把鼠标所在轴覆盖当前轴,并修改全局主轴
                        Vue.axisG = axis;
                        // Firefox e.originalEvent.detail > 0 scroll back, < 0 scroll forward
                        // chrome/safari e.originalEvent.wheelDelta < 0 scroll back, > 0 scroll forward
                        if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {

                            if (index > 0) {
                                index--;
                                console.log("这是第" + index + "张影像")
//                                updateTheImage(index)//在getExampleImage方法中进行轴位判断,根据不同的轴,不同的轴数据和index渲染
                            } else if (index == 0) {
                                index = len - 1;
//                                updateTheImage(index)
                                console.log("这是第" + index + "张影像")
                            }

                        } else {
                            console.log("向上")
                            if (index >= 0 && index < (len - 1)) {
                                index++;
                                console.log("这是第" + index + "张影像")
//                                updateTheImage(index)
                            } else if (index == len - 1) {
                                index = 0;
//                                updateTheImage(index)
                                console.log("这是第" + index + "张影像")
                            }
                        }
                        if(axis == 'z'){
                            Vue.zIndex=index;
                            Vue.recentOri=Vue.volumeOri[Vue.zIndex]
                        }
                        if(axis == 'x'){
                            Vue.xIndex=index;
                            Vue.xOri=Vue.imageParams.rowPixelSpacing*(Vue.xIndex);
                        }
                        if(axis == 'y'){
                            Vue.yIndex=index;
                            Vue.yOri=Vue.imageParams.rowPixelSpacing*(Vue.yIndex);
                        }


                        // console.log(Vue.imageParams.sliceSpacing);
                        cornerstone.loadImage(imageIds[index]).then(function (image) {
                            cornerstone.displayImage(element, image);
                        });

                        if (domWindow == "#dicomImage") {
                            document.getElementById('curPage').getElementsByTagName('span')[0].innerHTML = index + 1;
                        } else if (domWindow == "#dicomImage2") {
                            document.getElementById('curPage1').getElementsByTagName('span')[0].innerHTML = index + 1;
                        } else if (domWindow == "#dicomImage3") {
                            document.getElementById('curPage2').getElementsByTagName('span')[0].innerHTML = index + 1;
                        }
                        //以红线展示当前是第几张切面图
                        if (this.id == "dicomImage") {
                            topHeight = $("#dicomImage2").height();
                            var currentCanvas = document.getElementsByClassName('drawLine');
                            topDistance = Math.round((topHeight / zLength) * (index));
                            console.log('topDistance======'+topDistance);
                            for (var i = 0; i < currentCanvas.length; i++) {
                                Vue.drawLine(currentCanvas[i], topDistance);
                            }
                        }else if(this.id == 'dicomImage2'){

                            topHeight = $("#dicomImage").height();
                            var currentCanvas = document.querySelector('.drawLineX');
                            var hideCanvas=document.querySelector('.drawLineY');

                            currentCanvas.style.zIndex=0
                            hideCanvas.style.zIndex=0

                            topDistance = Math.round((topHeight / Vue.xLen) * (index));
                            Vue.drawLine(currentCanvas, topDistance);
                        }else if(this.id == 'dicomImage3'){
                            topHeight = $("#dicomImage").height();
                            var currentCanvas = document.querySelector('.drawLineY');
                            var hideCanvas=document.querySelector('.drawLineX');

                            currentCanvas.style.zIndex=0
                            hideCanvas.style.zIndex=0

                            topDistance = Math.round((topHeight / Vue.xLen) * (index));
                            Vue.drawLineY(currentCanvas, topDistance);
                        }
                        //prevent page fom scrolling
                        return false;
                    });
                });
            },
            ctImage(cornerstone, axis) {
                // alert("初始化"+axis+"轴")
                var data = [];
                var index = 0;
                var len = 0;
                var width = 0;
                var height = 0;
                var zData = this.zData;
                var zIndex = this.zIndex;
                var xData = this.xData;
                var xIndex = this.xIndex;
                var yData = this.yData;
                var yIndex = this.yIndex;
                var columnPixelSpacing;
                var rowPixelSpacing;
                var Vue = this;

                var intercept=this.imageParams.intercept;//获取动态截距
                // console.log("截距="+intercept)
                function getExampleImage(imageId) {
                    //渲染前的所在轴位判断
                    if (Vue.axisG == "") {
                        if (axis == "z") {
                            data = zData;
                            index = zIndex
                            len = data.length;
                            width = Vue.imageParams.width;
                            height = Vue.imageParams.height;
                            columnPixelSpacing = Vue.imageParams.columnPixelSpacing;
                            rowPixelSpacing =Vue.imageParams.rowPixelSpacing;
                        }
                        if (axis == "x") {
                            data = xData
                            index = xIndex;
                            len = data.length;
                            width =Vue.imageParams.width;
                            height = Vue.imageParams.fileNum;
                            columnPixelSpacing =Vue.imageParams.columnPixelSpacing;
                            rowPixelSpacing =Vue.imageParams.sliceSpacing;
                        }
                        if (axis == "y") {
                            data = yData
                            index = yIndex;
                            len = data.length;
                            width =Vue.imageParams.width;
                            height = Vue.imageParams.fileNum;
                            columnPixelSpacing = Vue.imageParams.columnPixelSpacing;
                            rowPixelSpacing =Vue.imageParams.sliceSpacing;
                        }
                    }
                    else {
                        if (Vue.axisG == "z") {

                            index = zIndex
                            len = data.length;
                            width = Vue.imageParams.width;
                            height = Vue.imageParams.height;
                            columnPixelSpacing = Vue.imageParams.columnPixelSpacing;
                            rowPixelSpacing = Vue.imageParams.rowPixelSpacing;
                        }
                        if (Vue.axisG == "x") {

                            index = xIndex;
                            len = data.length;
                            width =Vue.imageParams.width;
                            height = Vue.imageParams.fileNum;
                            columnPixelSpacing = Vue.imageParams.columnPixelSpacing;
                            rowPixelSpacing =Vue.imageParams.sliceSpacing;
                        }
                        if (Vue.axisG == "y") {
                            index = yIndex;
                            len = data.length;
                            width =Vue.imageParams.width;
                            height = Vue.imageParams.fileNum;
                            columnPixelSpacing = Vue.imageParams.columnPixelSpacing;
                            rowPixelSpacing =Vue.imageParams.sliceSpacing;
                        }
                    }

                    function getPixelData() {
                        if (Vue.axisG == "z") {
                            data = zData;
                        }
                        if (Vue.axisG == "x") {
                            data = xData;
                        }
                        if (Vue.axisG == "y") {
                            data = yData;
                        }
                        var num = imageId.substr(12)
                        //console.log("当前num="+num+"--当前data长度="+data.length+"--全局轴位="+Vue.axisG)
                        return data[num];
                        throw "unknown imageId";
                    }

                    var image = {
                        imageId: imageId,
                        minPixelValue: 0,//最小像素值
                        maxPixelValue: 4096,//最大像素值
                        slope: 1.0,//斜率
                        intercept:intercept,//截距
                        windowCenter: Vue.imageParams.windowCenter,//窗位
                        windowWidth: Vue.imageParams.windowWidth,//窗宽
                        render: cornerstone.renderGrayscaleImage,//渲染灰度图像
                        getPixelData: getPixelData,//返回像素数组
                        rows: height,//行
                        columns: width,//列
                        height: height,//高
                        width: width,//宽
                        color: false,//是否单色
                        columnPixelSpacing: columnPixelSpacing,//像素之间的纵向间隔
                        rowPixelSpacing: rowPixelSpacing,//像素之间的横向间隔
                        sizeInBytes: width * height * 2//字节大小
                    };

                    //alert("滚动"+axis+"轴")
                    var deferred = $.Deferred();
                    deferred.resolve(image);

                    return deferred;
                }

                cornerstone.registerImageLoader('ctexample', getExampleImage);


            }
        },


    }
</script>
<style scoped="scoped">
    * {
        margin: 0;
        padding: 0;
    }

    .viewerContent {
        margin: 0;
        display: flex;
        flex-direction: column;
    }

    .viewerContent .view-nav {
        height: 47px;
        padding: 10px;
        border-top: 1px solid #eee;
        margin-top: 10px;
    }
    .changBtnStyle{
        border-top:0 !important;
        margin-top:0 !important;
    }
    .changBtnStyle .btn.btn-info{
        background: #edf5ff;
        /*color:#7cb6ff;*/
        border-color:#7cb6ff;
    }
    .view-drawing {
        margin: 0;
        padding: 0;
    }

    .view-left {
        top: 0;
        padding: 0;
        border: 1px solid black;
        border-right: 1px solid #636c72;
        background-color: black;
    }

    .view-left:hover {
        border: 1px solid #9c9c9c;
    }

    .view-right {
        bottom: 0;
        padding: 0;
        height: 100%;
        background-color: aqua;
    }

    .view-right {
        display: flex;
        flex-direction: column;
    }

    .view-right-bottom, .view-right-top {
        flex: 1;
        display: flex;
        align-items: center;

    }

    .view-right-bottom:hover, .view-right-top:hover {
        border: 1px solid #9c9c9c;
    }

    .view-right-bottom {
        border: 1px solid black;
        background-color: black;
    }

    .view-right-top {
        border: 1px solid black;
        background-color: black;
        border-bottom: 1px solid #9c9c9c;
    }

    .canvasBox1, .canvasBox2 {
        position: relative;
    }

    .right-top-line, .right-bottom-line {
        padding: 0;
        margin: 0;
        top: 0px;
        width: 100%;
        position: absolute;
        height: 3px;
        opacity: 0.5;
        background-color: red;
    }

    #dicomImage, #dicomImage2, #dicomImage3 {
        margin: auto;
    }

    .canvasBox, .canvasBox2, .canvasBox1 {
        display: flex;
        align-items: center; /*垂直居中*/
        justify-content: center; /*水平居中*/
        width: 100%;
    }

    /*进度条展示*/
    .progress-tip {
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
    .progress-tip div.text-center{
        position: absolute;
        top:-22px;
        width:100%;
        color:#fff;
        font-size:12px;
    }
    .progress-tip .progressing {
        background: green;
        width: 0;
        height: 8px;
        border-radius: 4px;
    }

    .progress-tip span {
        color: green;
        font-size: 14px;
        line-height: 20px;
    }
    #distanceTop .directBox{
        position: absolute;
        left: 50%;
        top: 50%;
    }
    #distanceTop #canvasBox .directBoxBig {
        margin-left: -256px;
        margin-top: -256px;
    }

    #distanceTop #canvasBox1 .directBoxSmall,#distanceTop #canvasBox2 .directBoxSmall {
        margin-top: -111px;
        margin-left: -128px;
    }
    .winWidthAndCenter{
        position: absolute;
        bottom:10px;
        left:20px;
        color:#999;
        font-size:14px;
    }
    .drawLine{
        position: absolute;
        z-index: 0;
        left: -50px;
    }
</style>
