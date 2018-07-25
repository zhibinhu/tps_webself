<template>
    <div id="content-dose" style="position: relative">
        <div id="backgroundLayer" style="background-color:black;color:white;z-index:-1;position: absolute;color: grey;
        padding:10px;left: 0px;margin-left: 5px;">
            <button @click="minModal"><i class="fa fa-angle-left"></i>&nbsp;back</button>
            <div id="info" >
                <ul style="position: absolute;top: 450px;left: 20px; color: #FF9696;z-index:9999;font-size:14px">
                    <li>Im: {{zIndex+1+' / '+imageParams.fileNum}}</li>
                    <li>L: {{recentOri && recentOri.toFixed(1)}}</li>
                </ul>
                <ul style="position: absolute;top: 100px;left: 20px; color: #FF9696;z-index:9999;font-size:14px">
                    <li>{{patientName}}</li>
                    <li>{{gender}}</li>
                    <li>{{patientId}}</li>
                    <li>{{patientPosition}}</li>
                    <li>{{gatherDate}}</li>
                </ul>
            </div>
            <div id="info1" >
                <ul style="position: absolute;top: 450px;left: 20px; color: #FF9696;z-index:9999;font-size:14px">
                    <li>Im: {{xIndex+1+' / '+imageParams.width}}</li>
                    <li>L: {{xOri.toFixed(1)}}</li>
                </ul>
                <ul style="position: absolute;top: 100px;left: 20px; color: #FF9696;z-index:9999;font-size:14px">
                    <li>{{patientName}}</li>
                    <li>{{gender}}</li>
                    <li>{{patientId}}</li>
                    <li>{{patientPosition}}</li>
                    <li>{{gatherDate}}</li>
                </ul>
            </div>
            <div id="info2" >
                <ul style="position: absolute;top: 450px;left: 20px; color: #FF9696;z-index:9999;font-size:14px">
                    <li>Im: {{yIndex+1+' / '+imageParams.height}}</li>
                    <li>L: {{yOri.toFixed(1)}}</li>
                </ul>
                <ul style="position: absolute;top: 100px;left: 20px; color: #FF9696;z-index:9999;font-size:14px">
                    <li>{{patientName}}</li>
                    <li>{{gender}}</li>
                    <li>{{patientId}}</li>
                    <li>{{patientPosition}}</li>
                    <li>{{gatherDate}}</li>
                </ul>
            </div>
            <div class="colorInfoBoxBgd">
                <div id="colorInfoBgd"  style="font-size: 14px; z-index: 9992; position:absolute; top: 200px; right: 100px; transform: scale(1.5,1.5)">
                    <table >
                        <tr>
                            <td rowspan="5"><canvas id="colorBarBgd"></canvas></td>
                            <td>{{doseMax}}</td>
                        </tr>
                        <tr>
                            <td>{{dose2}}</td>
                        </tr>
                        <tr>
                            <td>{{dose3}}</td>
                        </tr>
                        <tr>
                            <td>{{dose4}}</td>
                        </tr>
                        <tr>
                            <td>{{doseMin}}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <div id="backgroundLayer-white" style="background-color:white;width:100%;height:100%;z-index:-2;position: absolute;color: grey;padding:10px;margin-right: 10px;"></div>
        <!--三幅ct图-->
        <div class="row" id="doseImages" style="height: 200px;margin:10px 0;padding:0;position:relative;">
            <div class="dose-mask"></div>
            <!--z轴图像-->
            <div class="col-md-4">
                <!--新加图像-->
                <span href="javascript:void (0);" class="fa fa-arrows-alt " id="z-view" @click="spreadModal"></span>
                <div class="imgContainer" style="height:200px;padding-left: 15px;background-color: black;position:relative;overflow: hidden;">
                    <div class="view-left" id="view-left">
                        <div class="canvasBox" style="height:512px; width:512px;display: flex;align-items:center;position:absolute;z-index:3;">
                            <div id="dicomImageforDose" style="height:512px; width:512px;position: relative">
                                <canvas id="sketchLine" width="512" height="512"></canvas>
                                <canvas id="canvas000" style="width:512px;height:512px;position: absolute;top:0;left:0;z-index:9990"></canvas>
                                <div id="tooltipZ" style="display: none;background-color:dimgrey;height:16px;position: absolute;color:white;z-index:9999;font-size: 14px;"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--剂量颜色条-->
                <div class="colorInfoBox">
                    <div id="colorInfo"  style="font-size: 14px; z-index: 99;">
                        <table>
                            <tr>
                                <td rowspan="5"><canvas id="colorBar"></canvas></td>
                                <td>{{doseMax}}</td>
                            </tr>
                            <tr>
                                <td>{{dose2}}</td>
                            </tr>
                            <tr>
                                <td>{{dose3}}</td>
                            </tr>
                            <tr>
                                <td>{{dose4}}</td>
                            </tr>
                            <tr>
                                <td>{{doseMin}}</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <!--图像信息显示-->
                <div id="imgInfo" >
                    <ul style="position: absolute;bottom: 20px;left: 20px; color: #FF9696;z-index:9999;font-size:12px">
                        <li>Im: {{zIndex+1+' / '+imageParams.fileNum}}</li>
                        <li>L: {{recentOri.toFixed(1)}}</li>
                    </ul>
                    <ul style="position: absolute;top: 10px;left: 20px; color: #FF9696;z-index:9999;font-size:12px">
                        <li>{{patientName}}</li>
                        <li>{{gender}}</li>
                        <li>{{patientId}}</li>
                        <li>{{patientPosition}}</li>
                        <li>{{gatherDate}}</li>
                    </ul>
                </div>
            </div>

            <!--x轴图像-->
            <div class="col-md-4">
                <!--新加图像-->
                <span href="javascript:void (0);" class="fa fa-arrows-alt " id="x-view" @click="spreadModal"></span>
                <div class="imgContainer" style="height:200px;padding-right: 15px;background-color: black;position:relative;">
                    <div class="dose-progress-tip">
                        <div class="text-center"><i>正在加载数据中...</i></div>
                        <div class="dose-progressing"></div>
                        <span></span>
                    </div>
                    <div class="view-right-top" id="view-right-top">
                        <div class="canvasBox1"
                             style="height:512px; width:512px;display: flex;align-items:center;position:absolute;z-index:2;">
                            <div id="dicomImageforDose2" style="width:512px;position: relative;">
                                <canvas id="sketchLineX" width="512"></canvas>
                                <canvas id="canvas111"
                                        style="width:512px;position: absolute;top:0;left:0;"></canvas>
                                <!--剂量值显示框-->
                                <div id="tooltipX" style="display: none;background-color:dimgrey;height:20px;position: absolute;color:white;z-index:9999"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--剂量颜色条-->
                <div class="colorInfoBox2">
                    <div id="colorInfo2"  style="font-size: 14px; z-index: 99;">
                        <table >
                            <tr>
                                <td rowspan="5"><canvas id="colorBar2"></canvas></td>
                                <td>{{doseMax}}</td>
                            </tr>
                            <tr>
                                <td>{{dose2}}</td>
                            </tr>
                            <tr>
                                <td>{{dose3}}</td>
                            </tr>
                            <tr>
                                <td>{{dose4}}</td>
                            </tr>
                            <tr>
                                <td>{{doseMin}}</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <!--图像信息显示-->
                <div id="imgInfo1" >
                    <ul style="position: absolute;bottom: 20px;left: 20px; color: #FF9696;z-index:9999;font-size:12px">
                        <li>Im: {{xIndex+1+' / '+imageParams.width}}</li>
                        <li>L: {{xOri.toFixed(1)}}</li>
                    </ul>
                    <ul style="position: absolute;top: 10px;left: 20px; color: #FF9696;z-index:9999;font-size:12px">
                        <li>{{patientName}}</li>
                        <li>{{gender}}</li>
                        <li>{{patientId}}</li>
                        <li>{{patientPosition}}</li>
                        <li>{{gatherDate}}</li>
                    </ul>
                </div>
            </div>

            <!--y轴图像-->
            <div class="col-md-4">
                <!--新加图像-->
                <span href="javascript:void (0);" class="fa fa-arrows-alt " id="y-view" @click="spreadModal"></span>
                <div class="imgContainer" style="height:200px;padding-right: 15px;background-color: black;position:relative;overflow: hidden;">
                    <div class="view-right-bottom" id="view-right-bottom">
                        <div class="canvasBox2" style="height:512px; width:512px;display: flex;align-items:center;position:absolute;z-index:1;">

                            <!--<div id="dicomImage3" style="width:280px;height:137px;position: relative">-->
                            <div id="dicomImageforDose3" style="width:512px;position: relative">
                                <canvas id="sketchLineY" width="512"></canvas>
                                <!--剂量值canvas-->
                                <!--<canvas id="canvas222" style="position: absolute;top:0;left:0;transform-origin:0% 0%"></canvas>-->
                                <canvas id="canvas222" style="width:512px;position: absolute;top:0;left:0;"></canvas>
                                <!--剂量值显示框-->
                                <div id="tooltipY" style="display: none;background-color:dimgrey;height:20px;position: absolute;color:white;z-index:9999"></div>
                            </div>

                        </div>
                    </div>
                </div>
                <!--剂量颜色条-->
                <div class="colorInfoBox3">
                    <div id="colorInfo3" style="font-size: 14px; z-index: 99;">
                        <table>
                            <tr>
                                <td rowspan="5"><canvas id="colorBar3"></canvas></td>
                                <td> {{ doseMax}}</td>
                            </tr>
                            <tr>
                                <td> {{ dose2}}</td>
                            </tr>
                            <tr>
                                <td> {{ dose3}}</td>
                            </tr>
                            <tr>
                                <td> {{ dose4}}</td>
                            </tr>
                            <tr>
                                <td> {{ doseMin}}</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <!--图像信息显示-->
                <div id="imgInfo2" >
                    <ul style="position: absolute;bottom: 20px;left: 20px; color: #FF9696;z-index:9999;font-size:12px">
                        <li>Im: {{yIndex+1+' / '+imageParams.height}}</li>
                        <li>L: {{yOri.toFixed(1)}}</li>
                    </ul>
                    <ul style="position: absolute;top: 10px;left: 20px; color: #FF9696;z-index:9999;font-size:12px">
                        <li>{{patientName}}</li>
                        <li>{{gender}}</li>
                        <li>{{patientId}}</li>
                        <li>{{patientPosition}}</li>
                        <li>{{gatherDate}}</li>
                    </ul>
                </div>
            </div>

        </div>
        <!--dvh剂量图显示-->
        <div class="row modifyTableStyle" style="height: 330px;margin:10px 0;padding:0;  position: relative;z-index: 22;">
            <div class="col-md-7" style="padding-right:0;">

                <div id="diagram"></div>

            </div>
            <div class="col-md-5" style="overflow-y:auto;">
                <h4 style="display: none;">曲线名称及颜色信息列表{{ drawStart }}</h4>
                <table class="table" id="dvhTable">
                    <thead>
                    <tr>
                        <th>名称</th>
                        <th>颜色</th>
                        <th>是否可见</th>
                        <th>体积</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td></td>
                        <td><div class="colorLine"></div></td>
                        <td><input type="checkbox" class="clickMe" checked="checked" /></td>
                        <td></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="row modifyTableStyle" style="margin:10px 0;padding:0;">
            <div class="col-md-12 DVH_stat">
                <!--<h4>DVH数据统计信息</h4>-->
                <div class="text-center">DVH统计信息</div>
                <table class="table text-center table-hover table-striped" cellspacing="0" cellpadding="0" width="100%">
                    <thead>
                    <tr>
                        <th>器官名称</th>
                        <th>体积(cm³)</th>
                        <th>最大剂量(cGy)</th>
                        <th>最小剂量(cGy)</th>
                        <th>平均剂量(cGy)</th>
                        <th>热点剂量(cGy)</th>
                        <th>热点覆盖体积(cm³)</th>
                        <th>热点百分比(%)</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    </tbody>
                </table>
            </div>

        </div>
        <!--上级医生评估计划设计按键-->
        <div class="text-right evaluePadding" style="padding:0 10px;" v-if="$route.path.indexOf('patient') > 0 && currentUser==planning.applyDocid && planning.status!=6">
            <button type="button" class="btn btn-info rounded" @click="approve()"><i class="fa fa-check" style="color: #fff"></i> 评估通过</button>
            <button type="button" class="btn btn-info rounded" @click="notapprove()"><i class="fa fa-check" style="color: #fff"></i> 评估不通过</button>
        </div>
        <!--主治医生评估计划设计按键-->
        <div class="text-right evaluePadding" style="padding:0 10px;" v-if="$route.path.indexOf('patient') > 0 && currentUser==planning.docid && planning.status!=6">
            <button type="button" class="btn btn-info rounded" @click="docapprove()"><i class="fa fa-check" style="color: #fff"></i> 评估通过</button>
            <button type="button" class="btn btn-info rounded" @click="docnotapprove()"><i class="fa fa-check" style="color: #fff"></i> 评估不通过</button>
        </div>
        <!--质控物理师验证计划设计按键-->
        <div class="text-right evaluePadding" style="padding:0 10px;" v-if="$route.path.indexOf('patient') > 0 && currentUser==planning.responsiblePhysicist && planning.status!=6">
            <button type="button" class="btn btn-info rounded" @click="verify()"><i class="fa fa-check" style="color: #fff"></i> 验证通过</button>
            <button type="button" class="btn btn-info rounded" @click="notverify()"><i class="fa fa-check" style="color: #fff"></i> 验证不通过</button>
        </div>

    </div>
</template>

<script>
    import $store from '../../vuex/store';
    import {dvhData} from '../../resources';
    import {sketchData} from '../../resources';
    import {beamData} from '../../resources';
    import storeState from '../../vuex/store.js';

    import {doseData} from '../../resources';
    var cornerstone_dose = require("./../../../static/js/cornerstone_dose.js")
    import {del, treeify} from '../../misc/utils'
    import {Image} from '../../resources'
    import {Download, Planning, User} from '../../resources'
    import swal from 'sweetalert'
    import Pagination from '../../widgets/pagination.vue'
    import {debounce} from '../../misc/utils'
    import paginations from '../../widgets/paginations.vue'
    import {showResponse} from '../../misc/utils'
    export  default {
        props:["fileLength","dosageLength","doseId","imageId", "imageParams", "planning"],
        data(){
            return {
                'xAxisData':[],
                'options': {
                    tooltip: {
                        formatter: '{a}<br/>剂量:{b0}cGy<br/>体积:{c0}%'
                        // trigger: 'axis',
                        // position: function (pt) {
                        //     return [pt[0], '10%'];
                        // }
                    },
                    backgroundColor: '#000',
                    color: ['rgb(220,160,120)', 'rgb(255,32,32)', 'rgb(164,164,255)', 'rgb(255,255,32)', 'rgb(64,64,255)', 'rgb(32,255,255)', 'rgb(32,255,32)','rgb(232,145,5)','rgb(143,2,26)','rgb(255,255,0)','rgb(255,238,38)','rgb(255,127,1)','rgb(255,127,1)','rgb(0,255,0)','rgb(99,207,65)','rgb(1,161,87)','rgb(7,86,178)','rgb(6,38,113)','rgb(110,8,177)','rgb(86,55,37)'],
                    title: {
                        left: 'center',
                        text: '剂量体积直方图',
                        textStyle:{
                            color:'#eee',
                            width:'100%'
                        },
                        padding:10
                    },
                    legend: {
                        data: ['patient', 'GTV', 'SV', 'BLADDER', 'PTV', 'CTV', 'RECTUM'],
                        show: false,
                        selected: {
                            'patient': true,
                            'GTV': true,
                            'SV': true,
                            'BLADDER': true,
                            'PTV': true,
                            'CTV': true,
                            'RECTUM': true
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '60',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
//                        dataZoom: {
//                            yAxisIndex: 'none'
//                        },
//                        restore: {},
                            saveAsImage: {}
                        },
                        right:'30'
                    },
                    xAxis: {
                        // type: 'category',
                        // boundaryGap: false,
                        data: new Array(),
                        type: 'category',
                        boundaryGap: false,
                        name: '剂量(cGy)',
                        nameLocation: 'middle',
                        nameGap: 25,
                        nameTextStyle: {
                            color: '#ccc'
                        },
                        axisTick: {
                            lineStyle: {
                                color: '#fff'
                            }
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#fff'
                            }
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: '#eee',
                                type: 'dotted',
                                width: 1,
                                opacity: 1
                            }
                        }
                    },
                    yAxis: {
                        // type: 'value',
                        // boundaryGap: [0, '100%']
                        type: 'value',
                        name: '体积(%)',
                        nameLocation: 'middle',
                        nameTextStyle: {
                            color: '#ccc'
                        },
                        nameGap: 30,
                        axisLine: {
                            lineStyle: {
                                type: 'solid',
                                width: 1,
                                opacity: 1
                            }
                        },
                        axisTick: {
                            lineStyle: {
                                color: '#ccc'
                            }
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#fff'
                            }
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: '#eee',
                                type: 'dotted',
                                width: 1,
                                opacity: 1
                            }
                        }
                    },
//                    dataZoom: [{
//                        type: 'slider',
//                        start: 0,
//                        end: 100
//                    }, {
//                        start: 0,
//                        end: 10,
//                        handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
//                        handleSize: '80%',
//                        handleStyle: {
//                            color: '#fff',
//                            shadowBlur: 3,
//                            shadowColor: 'rgba(0, 0, 0, 0.6)',
//                            shadowOffsetX: 2,
//                            shadowOffsetY: 2
//                        },
//                        backgroundColor: '#fff'
//                    }],/////////是否展示更细化的拖动按钮
                    series: new Array()
                },
                currentUser: User.current().id,
                indexCollect: [],
                sketchContext: '',
                sketchFlag: false,
                imgDataSketch: {},
                sketchContext2: '',
                imgDataSketch2: {},
                sketchContextX: '',
                imgDataSketchX: {},
                sketchContextY: '',
                imgDataSketchY: {},
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
                zData:[],
                zIndex:65,
                // zFileNum:78,
                zLen:0,
                zImageIds:[],
                xData:[],
                xIndex:260,
                // xFileNum:512,
                xLen:0,
                xImageIds:[],
                yData:[],
                yIndex:260,
                // yFileNum:512,
                yLen:0,
                yImageIds:[],
                axisG:"",
                brr:[],
                colorArr:[],

                //剂量数据
                zDoseData:[],
                xDoseData:[],
                yDoseData:[],
                //剂量值(由剂量数据处理而来)
                zDose:[],
                xDose:[],
                yDose:[],
                step:0,
                //比例
                widthXY:0,
                heightXY:0,
                widthZ:0,//200/512
                heightZ:0,//200/512
                //显示的缩放
                spread:0,
                //放大背景黑色
                scWidth:0,
                allHeight:0,//dicomImageforDose2,3的高度
                aspAll:0 ,//底图和剂量图的宽高比例
                scale1:0,//z切面缩放比例
                scaleX:0,//x、y切面在x轴缩放比例
                scaleY:0,  //x、y切面在y轴缩放比例

                myDB_dose:{
                    name:'CTImage',
                    version:1,
                    db:null
                },
                flag:0,
                data_tmp:[],
                zDoseIndex:'',
                xDoseIndex:'',
                yDoseIndex:'',
                flag: 0,
                data_tmp: [],
                lastTime:0,
                volumeOri:[],
                recentOri:0,
                xOri:0,
                yOri:0,
                density:0,//密度
                densityX:0,//密度
                densityY:0,//密度
                //图像信息
                patientName:'',//姓名
                gender:'',//性别
                patientBirth:'',//出生日期(暂无)
                patientId:'',//ID
                patientPosition:'',//体位
                hosName:'',//所在机构
                gatherDate:'',//检查时间
                gatherTime:'',

                doseArrMax:[],
                doseArrMin:[],
                doseMax:0,
                dose2:0,
                dose3:0,
                dose4:0,
                doseMin:0,
                dvhTableRowLen:0,//存放右侧有颜色表格的行数
                dvhTableOrganName:[] //存放右侧表格第一列的数据
            }


        },
        beforeDestroy(){
          this.myDB_dose.db.close();
          window.onresize = null
        },
        created() {
            var that = this;
            function dvhDataShow(lengendData){
                dvhData.getData(that.doseId).then(res => {
                    //X轴数据：
                    for (var k = 0; k < 821; k++) {
                        var curXdot = (k * 10);
    //                var curXdot=(k*0.1).toFixed(1);
                        that.options.xAxis.data.push(curXdot);
                    }
                    console.log('resrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr');
                    console.log(res);
                    console.log('resrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr');
                    //y轴数据：
                    var dvhDATA = res.data.split('CUMULATIVE');
                    for (var i = 1; i < dvhDATA.length; i++) {
                        var curObj = {
                            name: '',
                            type: 'line',
                            data: []
                        };
    //                    curObj.name=this.options.legend.data[i-1];
                        curObj.name = that.dvhTableOrganName[i - 1];
                        var curData = dvhDATA[i].split('|');
                        var curDataDot = new Array(Math.pow(2, 32) - 1);
                        curDataDot = curData[9].split('/');
    //               console.dir(curDataDot.length);
                        for (var j = 1; j < (curDataDot.length / 2) + 1; j++) {
    //                for(var j=1;j<200;j++){
                            var dot = '';
                            dot = curDataDot[2 * j - 1];
                            curObj.data.push(dot);
                        }
    //               console.log(JSON.stringify(curObj.data));
                        that.options.series.push(curObj);
                    }
                    //遍历展示dvhtable
                    for (var i = 0; i < that.options.legend.data.length; i++) {
                        var curData = that.options.legend.data[i];
                        var curColor = that.options.color[i];
                        var trNew = $('#dvhTable tbody tr:eq(0)').clone().show();
                        trNew.find('td').each(function (k, item) {
                            switch (k) {
                                case 0:
                                    $(this).html(curData);
                                    break;
                                case 1:
                                    $(this).find('.colorLine').css('background', curColor);
                                    break;
                                case 2:
                                    $(this).find('input[type=checkbox]').attr('id', 'check' + i);
                                    break;
                                case 3:
    //                                $(this).html((111+3*i)+'mm³');
                                    $(this).html('cm³');
                                    break;
                            }
                        });
                        $('#dvhTable tbody').append(trNew).find('tr').eq(0).hide();
                    }
                    //显示隐藏对应线条
                    var obj={};
                    for (var i = 0; i < lengendData.length; i++) {
                        obj[lengendData[i]]=true;
                    }
                    that.options.legend.selected = obj;
                    for (var i = 0; i < lengendData.length; i++) {
                        (function (i) {
                            $('#dvhTable').on('click', 'input#check' + i, {index: i}, function (event) {
                                var curIndex = event.data.index;
                                var curName = lengendData[i];
                                var curLegend = that.options.legend.selected;
                                for (var k in curLegend) {
                                    if (k == curName) {
                                        if (event.target.checked) {
                                            curLegend[k] = true;
                                        } else {
                                            curLegend[k] = false;
                                        }
                                    }
                                }
    //                        console.log(event.target.checked);
                            })
                        })(i);
                    }


                    that.dvh_flag = true;
                });
        }
///dvh数据统计信息展示
            this.$nextTick(function () {
//                this.structureTable();

                dvhData.dvhInfo(this.doseId).then(res=>{
                    console.log('111111122222223333333333');
                    console.log(res);
                    var dvhArr=res.data.split('\r\n');
                    that.dvhTableRowLen=dvhArr.length-1;
//                console.log(dvhArr.length);
                    var volumeArr=[];
                    for(var i=0;i<dvhArr.length-1;i++){
                        var singleArr=dvhArr[i].split('\/');
                        var cloneTr=$('.DVH_stat table tbody tr').eq(0).clone();
                        $.each(cloneTr.find('td'),function(i,item){
                            switch (i){
                                case 0:
                                    $(this).html(singleArr[0]);
                                    that.dvhTableOrganName.push(singleArr[0]);
                                    break;
                                case 1:
                                    $(this).html((singleArr[1]/1000).toFixed(3));
                                    break;
                                case 2:
                                    $(this).html((singleArr[2]*100).toFixed(0));
                                    break;
                                case 3:
                                    $(this).html((singleArr[3]*100).toFixed(0));
                                    break;
                                case 4:
                                    $(this).html((singleArr[4]*100).toFixed(0));
                                    break;
                            }
                        })
                        $('.DVH_stat table tbody').append(cloneTr);
                        volumeArr.push((singleArr[1]/1000).toFixed(3));
                        that.doseArrMax.push(singleArr[2]);
                        that.doseArrMin.push(singleArr[3]);
                        (function(i){

                        setTimeout(function () {
                            var volume=volumeArr[i]+'cm³';
                            $('#dvhTable tbody').find('tr').eq(i+1).find('td').eq(3).text(volume);
                        },500)
                    })(i);

                }
                that.options.legend.data=that.dvhTableOrganName;
                    var lengendData=that.dvhTableOrganName;
//                that.options.legend.selected={};
//                    for(var m in that.dvhTableOrganName){
//                        that.options.legend.selected[m]=true;
//                    }
                    dvhDataShow(lengendData);//展示dvh数据
                console.log(that.doseArrMax);
                console.log(that.doseArrMin);
                    var max_temp=0;
                    for(var i=0;i<that.doseArrMax.length;i++){
                        if(that.doseArrMax[i]>max_temp){
                            max_temp=that.doseArrMax[i];
                        }
                    }

                    that.step=parseInt(that.imageParams.largestImagePixelValue*that.imageParams.doseGridScaling*100);//算出本套图的最大剂量值
                    // that.step=5000;
                    console.log('step===='+that.step);
                    if(that.step>=7000){
                        that.doseMax=7000;
                        that.dose2=6000;
                        that.dose3=5000;
                        that.dose4=4000;
                        that.doseMin=3000;
                    }else if(that.step>=5000 && that.step<7000){
                        that.doseMax=5000;
                        that.dose2=4000;
                        that.dose3=3000;
                        that.dose4=2000;
                        that.doseMin=1000;
                    }else if(that.step>=3000 && that.step<5000){
                        that.doseMax=2000;
                        that.dose2=1500;
                        that.dose3=1000;
                        that.dose4=500;
                        that.doseMin=0;
                    }else{
                        that.doseMax=1000;
                        that.dose2=800;
                        that.dose3=600;
                        that.dose4=400;
                        that.doseMin=200;
                    }


                    $('.DVH_stat table tbody tr').eq(0).remove();
                    dvhData.hotPre(this.doseId).then(res=>{
//                    console.log(res);
                        var hotPreArr=res.data.split('\r\n');
                        for(var i=0;i<hotPreArr.length;i++) {
                            var singleHotPre = hotPreArr[i].split('\/');
                            var singleHotPreSecond=singleHotPre[2]==undefined?'':(singleHotPre[2]/1000).toFixed(3);
                            $('.DVH_stat table tbody tr').eq(i).find('td').eq(5).html(singleHotPre[1]);
                            $('.DVH_stat table tbody tr').eq(i).find('td').eq(6).html(singleHotPreSecond);
                            $('.DVH_stat table tbody tr').eq(i).find('td').eq(7).html(singleHotPre[3]);
                        }
                    });
                })
            })

        },
        mounted:function(){
            var that=this;
             console.log('imageparams-----------',that.imageParams)
            this.colorPrototype();

            that.volumeOri=that.imageParams.volumeOri;
            that.recentOri=that.imageParams.volumeOri[that.zIndex]
            that.xOri=that.imageParams.rowPixelSpacing*(that.xIndex-1);
            that.yOri=that.imageParams.rowPixelSpacing*(that.yIndex-1);

            that.patientName=that.imageParams.patient.patientName;//姓名
            that.gender=that.imageParams.patient.gender;//性别
            that.patientId=that.imageParams.patient.id;//ID
            that.patientPosition=that.imageParams.patient.patientPosition;//体位
            that.gatherDate=that.imageParams.patient.gatherDate;//检查时间
            that.gatherTime=that.imageParams.patient.gatherTime;//检查时间

            console.log('that.imageParams.patient-------');
            console.log(that.imageParams.patient.patientName);
            // that.hosName=that.imageParams.patient.;
            // that.treatId=that.imageParams.patient.treatId;
            // that.treatInfo=that.imageParams.patient.treatInfo;
            // that.treatIdcheckDes=that.imageParams.patient.
            // that.hospno=that.imageParams.patient.hospno;
            var asp = (this.imageParams.width * this.imageParams.columnPixelSpacing) / (this.imageParams.fileNum * this.imageParams.sliceThickness);//宽高比
            this.aspAll = asp;
            this.allHeight=512/asp;
            $('#dicomImageforDose2,#dicomImageforDose3').css('height',this.allHeight+'px');
            $('canvas#sketchLineX,canvas#sketchLineY,canvas#canvas111,canvas#canvas222').attr('height',this.allHeight);

//        this.sketchLine('65');//勾画线
            var sketchLineCanvas=document.getElementById('sketchLine');
            this.sketchContext = sketchLineCanvas.getContext("2d");
            this.imgDataSketch=this.sketchContext.getImageData(0,0,sketchLineCanvas.width,sketchLineCanvas.height);

            var sketchLineCanvasX = document.getElementById('sketchLineX');
            this.sketchContextX = sketchLineCanvasX.getContext("2d");
            this.imgDataSketchX = this.sketchContextX.getImageData(0, 0, sketchLineCanvasX.width, sketchLineCanvasX.height);

            var sketchLineCanvasY = document.getElementById('sketchLineY');
            this.sketchContextY = sketchLineCanvasY.getContext("2d");
            this.imgDataSketchY = this.sketchContextY.getImageData(0, 0, sketchLineCanvasY.width, sketchLineCanvasY.height);

            window.onresize=function () {
                that.reDrawDvh();//重新绘制dvh直方图
                that.renderBgd();//重新渲染黑色底图
                that.calcMarginLeft();//重新计算dicom位置
                //重新计算dicom父元素位置
                that.calcTOPandLeft('#dicomImageforDose');
                that.calcTOPandLeft('#dicomImageforDose2');
                that.calcTOPandLeft('#dicomImageforDose3');
                //防止小屏幕发生重叠
                that.smallScreen();
            }
            that.smallScreen();//防止小屏幕发生重叠
            this.createIndexedDB()//创建indexedDB数据库
        },
        watch:{
            preAfterFlag:function () {
                // this.readDose(this.doseId);
            },
        },
        computed:{
            drawStart(){
                if(this.dvh_flag) {
                    let myChart_dvh = window.echarts.init(document.getElementById("diagram"));
                    myChart_dvh.setOption(this.options);
                }
            }
        },
        methods:{
            smallScreen(){
                var winWidth=window.innerWidth;
                if(winWidth>1250&&winWidth<1600){
                    $('#dicomImageforDose,#dicomImageforDose2,#dicomImageforDose3').css({
                        'margin-left':'-38px'
                    });
                }
            },
            calcMarginLeft(){
                var dicomWidth=$('#dicomImageforDose')[0].offsetWidth;
                var dicomParentWidth=$('#dicomImageforDose').parent()[0].offsetWidth;
                var disMargin=(dicomParentWidth-dicomWidth)/2;
                $('#dicomImageforDose,#dicomImageforDose2,#dicomImageforDose3').css('margin-left',disMargin+'px')
            },
            calcTOPandLeft(obj){
                var objParW=$(obj).parent()[0].offsetWidth;
                var objParH=$(obj).parent()[0].offsetHeight;
                var objParParW=$(obj).parent().parent().parent()[0].offsetWidth;
                var objParParH=$(obj).parent().parent().parent()[0].offsetHeight;
                var disW=Math.abs(objParW-objParParW)/2;
                var disH=Math.abs(objParH-objParParH)/2;
                $(obj).parent().css({
                    'top':-disH+'px',
                    'left':-disW+'px'
                })
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
            reDrawDvh(){
                $('#diagram').find('div').remove().end().removeAttr('_echarts_instance_');
                let myChart_dvh = window.echarts.init(document.getElementById("diagram"));
                myChart_dvh.setOption(this.options);

            },
            clearObjectStore(db, storeName) {
                var transaction = db.transaction(storeName, 'readwrite');
                var store = transaction.objectStore(storeName);
                store.clear();
            },
            structureTable(){
                var data={
                    "BeamName": [ "Lung" ],
                    "ROIName": [ "GCV", "Target" ],
                    "DisplayColumnName": [ "HighDoseRef", "MinDoseRef", "HeterogeneityIndex", "DoseInterest", "PrescribedVolumn", "TargetVolumn", "Conformity" ],
                    "StatColumnName": [ "Volumn", "MinDose", "MaxDose", "MeanDose", "ColdRef", "ColdVolumn", "ColdVolumnRation", "HotRef", "HotVolumn", "HotVolumnRatio", "InVolumnRatio" ],
                    "BeamData":
                        [
                            {
                                "DVH":
                                    {
                                        "Dose":
                                            [
                                                [ 2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900, 3000 ],
                                                [ 1600, 1700, 1800, 1900, 2000, 2100, 2200, 2300 ],
                                                [ 1500, 1600, 2110, 2500, 2500, 2650, 2750, 2850, 2950, 3000 ],
                                                [ 1600, 1700, 1800, 1900, 2600, 2800, 3000, 3300 ],
                                                [500,600,700,800,900,1000,1100,1200,1300,1400,1500,1600,1700,1800]
                                            ],
                                        "VolumnRatio":
                                            [
                                                [ 1, 0.95, 0.94, 0.9, 0.8, 0.7, 0.6, 0.4, 0.2, 0.01 ],
                                                [ 1, 0.95, 0.88, 0.8, 0.7, 0.6, 0.2, 0.01 ],
                                                [ 1, 0.9, 0.91, 0.96, 0.8, 0.71, 0.62, 0.42, 0.22, 0.06 ],
                                                [ 1, 0.9, 0.8, 0.8, 0.7, 0.5, 0.25, 0.11 ],
                                                [0.1,0.2,0.3,0.4,0.5,0.55,0.58,0.6,0.7,0.75,0.8,0.85,0.9,1]
                                            ]
                                    },
                                "Display":
                                    [
                                        [ 0.05, 0.95, 1.2, 2500, 12.034, 13.424, 0.75 ],
                                        [ 0.05, 0.95, 1.09, 2000, 1.104, 1.104, 0.03 ]
                                    ],
                                "Stat":
                                    [
                                        [ 13.424, 2188.6, 3081.1, 2720.9, 0, 0, 0, 2500, 12.304, 0.9166, 1 ],
                                        [ 1.104, 2074.4, 2462.3, 2288.3, 0, 0, 0, 2000, 1.104, 1, 1 ]
                                    ]
                            }
                        ]
                };
                data.StatColumnName.unshift('Structure');
                for(var i=0;i<data.StatColumnName.length;i++){
                    var htmlStr='<th>'+data.StatColumnName[i]+'</th>';
                    $('.DVH_stat thead tr').append(htmlStr);
                }
                for(var i=0;i<data.BeamData[0].Stat.length;i++){
                    var trStr='<tr><td>'+data.ROIName[i]+'</td></tr>';
                    $('.DVH_stat tbody').append(trStr);
                    for(var j=0;j<data.BeamData[0].Stat[i].length;j++){
                        var curCell='<td>'+data.BeamData[0].Stat[i][j]+'</td>'
                        $('.DVH_stat tbody tr').eq(i).append(curCell);
                    }
                }


            },
            findIndexArr(arrStr,obj,startIndex){//arrStr：要找的數組，obj：在數組中要找的值，index：開始尋找的位置
                if(arrStr.indexOf(obj,startIndex)>-1){
                    var findIndex = arrStr.indexOf(obj,startIndex);
                    this.indexCollect.push(findIndex);
                    this.findIndexArr(arrStr,obj,findIndex+1);
                }
                return this.indexCollect;
            },
            sketchLineData(doseId,lineDB){

                sketchData.getData(doseId).then(res => {
                    var bigData = res.data.split('\r\n');
                    var singleBig = [];
                    for (var i = 0; i < bigData.length; i++) {
                        singleBig[i] = bigData[i].split('|');
                    }
                    //遍历总数组数据存储每张上的勾画线数据
                    for (var j = 0; j < this.imageParams.fileNum; j++) {
                        var line_entry_map = {//每张上的数据存储
                            id: 'line_z_' + (this.imageParams.fileNum-j-1),
                            value: []
                        }
                        for (var i = 0; i < singleBig.length; i++) {
                            if (j == singleBig[i][3]) {
                                var curLineArr = singleBig[i][singleBig[i].length - 1].split('\\');
                                var curLine = {
                                    color:'',
                                    value:[]
                                };
                                curLine.color='rgb('+singleBig[i][2]+')';
                                for (var k = 0; k < curLineArr.length; k += 2) {
                                    var curLineDot = [curLineArr[k], curLineArr[k + 1]];
                                    curLine.value.push(curLineDot);
                                    curLineDot=null
                                }
                                line_entry_map.value.push(curLine);
                                curLineArr.length=0;
                                curLine=null;
                            }
                        }
                        this.addDBSingleData(lineDB, line_entry_map);
                        line_entry_map=null;
                    }
                    bigData.length=0;
                    singleBig.length=0;
                });
            },
            sketchLineDataX(doseId,lineDB){
                sketchData.getDataX(doseId).then(res => {
                    console.log('xxxxxxxxxxxxxxxxxxxxx');
                    var bigData = res.data.split('\r\n');
                    var singleBig = [];
                    for (var i = 0; i < bigData.length; i++) {
                        singleBig[i] = bigData[i].split('|');
                    }
                    console.log(bigData.length);
                    //遍历总数组数据存储每张上的勾画线数据
                    for (var j = 0; j < this.imageParams.width; j++) {
                        var line_entry_map = {//每张上的数据存储
                            id: 'line_x_' + j,
                            value: []
                        }
                        for (var i = 0; i < singleBig.length; i++) {
                            if (j == singleBig[i][3]) {
                                var curLineArr = singleBig[i][singleBig[i].length - 1].split('\\');
                                var curLine = {
                                    color:'',
                                    value:[]
                                };
                                curLine.color='rgb('+singleBig[i][2]+')';
                                for (var k = 0; k < curLineArr.length; k += 2) {
                                    var curLineDot = [curLineArr[k], curLineArr[k + 1]];
                                    curLine.value.push(curLineDot);
                                    curLineDot=null
                                }
                                line_entry_map.value.push(curLine);
                                curLineArr.length=0;
                                curLine=null;
                            }
                        }
                        this.addDBSingleData(lineDB, line_entry_map);
                        line_entry_map=null;
                    }
                    bigData.length=0;
                    singleBig.length=0;
                });
            },
            sketchLineDataY(doseId,lineDB){
                sketchData.getDataY(doseId).then(res => {
                    var bigData = res.data.split('\r\n');
                    var singleBig = [];
                    for (var i = 0; i < bigData.length; i++) {
                        singleBig[i] = bigData[i].split('|');
                    }
                    console.log(bigData.length);
                    //遍历总数组数据存储每张上的勾画线数据
                    for (var j = 0; j < this.imageParams.height; j++) {
                        var line_entry_map = {//每张上的数据存储
                            id: 'line_y_' + j,
                            value: []
                        }
                        for (var i = 0; i < singleBig.length; i++) {
                            if (j == singleBig[i][3]) {
                                var curLineArr = singleBig[i][singleBig[i].length - 1].split('\\');
                                var curLine = {
                                    color:'',
                                    value:[]
                                };
                                curLine.color='rgb('+singleBig[i][2]+')';
                                for (var k = 0; k < curLineArr.length; k += 2) {
                                    var curLineDot = [curLineArr[k], curLineArr[k + 1]];
                                    curLine.value.push(curLineDot);
                                    curLineDot=null
                                }
                                line_entry_map.value.push(curLine);
                                curLineArr.length=0;
                                curLine=null;
                            }
                        }
                        this.addDBSingleData(lineDB, line_entry_map);
                        line_entry_map=null;
                    }
                    bigData.length=0;
                    singleBig.length=0;
                });
            },
            drawSketch(data,axis){
                if(axis=='z'){
                    //canvas画线
                    this.sketchContext.putImageData(this.imgDataSketch,0,0);
                    for(var i=0;i<data.length;i++){
                        //开始一个新的绘制路径
                        this.sketchContext.beginPath();
                        //设置线条颜色为黑色
                        this.sketchContext.strokeStyle = data[i].color;
                        //绘制线段
                        for (var q = 0; q < data[i].value.length; q++) {
                            this.sketchContext.lineTo(data[i].value[q][0], data[i].value[q][1])
                        }
                        //先关闭绘制路径。注意，此时将会使用直线连接当前端点和起始端点。
                        //如果是闭环,加这句,如果不是,则不需要加
                        this.sketchContext.closePath();
                        //通过此函数将以上绘制的图形绘制到画布上
                        this.sketchContext.stroke();
                    }
                    //射野数据
                    var that = this;
                    beamData.getData(this.doseId).then(res => {
                        var beamcolorArr = ['#f00', '#0f0', '#00f', 'orange', 'pink', 'navy', 'yellow'];
                        var beamDataArr = res.data.split('\r\n');
                        for (var i = 0; i < beamDataArr.length; i++) {
                            var beamGArr = beamDataArr[i].split('|');
                            var beamLineArr = beamGArr[beamGArr.length - 1].split('\\');
                            that.sketchContext.strokeStyle = beamcolorArr[i];
                            that.sketchContext.beginPath();
                            for (var j = 0; j < beamLineArr.length; j += 4) {
                                that.sketchContext.moveTo(beamLineArr[j], beamLineArr[j + 1]);
                                that.sketchContext.lineTo(beamLineArr[j + 2], beamLineArr[j + 3]);
                            }
                            //通过此函数将以上绘制的图形绘制到画布上
                            that.sketchContext.stroke();
                            beamGArr.length=0;
                            beamLineArr.length=0;
                        }
                        beamcolorArr.length=0;
                        beamDataArr.length=0;
                    });
                }else if(axis=='x'){
                    //canvas画线
                    this.sketchContextX.putImageData(this.imgDataSketchX,0,0);
                    for(var i=0;i<data.length;i++){
                        //开始一个新的绘制路径
                        this.sketchContextX.beginPath();
                        //设置线条颜色为黑色
                        this.sketchContextX.strokeStyle = data[i].color;
                        //绘制线段
                        for (var q = 0; q < data[i].value.length; q++) {
                            this.sketchContextX.lineTo(data[i].value[q][0]*(512/this.imageParams.width), data[i].value[q][1]*(this.allHeight/this.imageParams.fileNum))
                        }
                        //先关闭绘制路径。注意，此时将会使用直线连接当前端点和起始端点。
                        //如果是闭环,加这句,如果不是,则不需要加
                        this.sketchContextX.closePath();
                        //通过此函数将以上绘制的图形绘制到画布上
                        this.sketchContextX.stroke();
                    }

                }else if(axis=='y'){
                    //canvas画线
                    this.sketchContextY.putImageData(this.imgDataSketchY,0,0);
                    for(var i=0;i<data.length;i++){
                        //开始一个新的绘制路径
                        this.sketchContextY.beginPath();
                        //设置线条颜色为黑色
                        this.sketchContextY.strokeStyle = data[i].color;
                        //绘制线段
                        for (var q = 0; q < data[i].value.length; q++) {
                            this.sketchContextY.lineTo(data[i].value[q][0]*(512/this.imageParams.height), data[i].value[q][1]*(this.allHeight/this.imageParams.fileNum))
                        }
                        //先关闭绘制路径。注意，此时将会使用直线连接当前端点和起始端点。
                        //如果是闭环,加这句,如果不是,则不需要加
                        this.sketchContextY.closePath();
                        //通过此函数将以上绘制的图形绘制到画布上
                        this.sketchContextY.stroke();
                    }
                }
            },
            sketchLine(num,axis) {
                if (axis == 'z') {
                    sketchData.getData(this.doseId).then(res => {
                        var bigData = res.data.split('\r\n');
//                console.log('bigDatalength==='+bigData.length);
                        var singleBig=[];
                        var pieceNumArr=[];
                        for(var i=0;i<bigData.length;i++){
                            singleBig[i]=bigData[i].split('|');
                            pieceNumArr.push(singleBig[i][3]);
                        }

                        //                console.log('piece=='+pieceNumArr.length);
                        this.indexCollect=[];
                        this.indexCollect.length=0;
                        var numString=this.imageParams.fileNum-num+'';//数字转化成字符串，去数组中查找
                        var indexArr=this.findIndexArr(pieceNumArr,numString,0);//先寻找第65张z切面所包含的器官数据行

                        //canvas画线
                        this.sketchContext.putImageData(this.imgDataSketch,0,0);
                        if(indexArr.length>0){

                            for(var i=0;i<indexArr.length;i++){
                                var findSingleArr = bigData[indexArr[i]].split('|');//以|分割找到的行数据
                                var trueDataArr=findSingleArr[findSingleArr.length-1].split('\\');
//                            var singleLineArr=[];
                                //                        console.log('trueDataArr==='+trueDataArr.length);
                                var lineColor=findSingleArr[2];//找到该行的颜色值
                                var targetLine=[];
                                for ( var t = 0; t < trueDataArr.length; t += 2) {
                                    targetLine[t/2] = [parseInt(trueDataArr[t]), parseInt(trueDataArr[t + 1])]
//                                singleLineArr.push(targetLine[t/2]);//把每条线上的点存入单条线的数组中
                                }
//                            line_entry_map.value.push(singleLineArr);//把每条线存入当前张数的value中
                                //开始一个新的绘制路径
                                this.sketchContext.beginPath();
                                //设置线条颜色为黑色
                                //                        this.sketchContext.strokeStyle = "red";
                                this.sketchContext.strokeStyle = 'rgb('+lineColor+')';
                                //线宽
                                //			        context.lineWidth = 3;
                                //绘制线段

                                for (var q = 0; q < targetLine.length; q++) {
                                    this.sketchContext.lineTo(targetLine[q][0], targetLine[q][1])
                                }

                                //先关闭绘制路径。注意，此时将会使用直线连接当前端点和起始端点。
                                //如果是闭环,加这句,如果不是,则不需要加
                                this.sketchContext.closePath();
                                //通过此函数将以上绘制的图形绘制到画布上
                                this.sketchContext.stroke();
                                findSingleArr.length=0;
                                trueDataArr.length=0;
                                lineColor=null;
                                targetLine.length=0;

                            }
                            indexArr.length=0;
                            bigData.length=0;
                            singleBig.length=0;
                            pieceNumArr.length=0;
                            indexArr.length=0;
                        }
//                        this.addDBSingleData('lineDB',line_entry_map);
                        //射野数据
                        var that = this;
                        beamData.getData(this.doseId).then(res => {
                            var beamcolorArr = ['#f00', '#0f0', '#00f', 'orange', 'pink', 'navy', 'yellow'];
                            var beamDataArr = res.data.split('\r\n');
                            for (var i = 0; i < beamDataArr.length; i++) {
                                var beamGArr = beamDataArr[i].split('|');
                                var beamLineArr = beamGArr[beamGArr.length - 1].split('\\');
                                that.sketchContext.strokeStyle = beamcolorArr[i];
                                that.sketchContext.beginPath();
                                for (var j = 0; j < beamLineArr.length; j += 4) {
                                    that.sketchContext.moveTo(beamLineArr[j], beamLineArr[j + 1]);
                                    that.sketchContext.lineTo(beamLineArr[j + 2], beamLineArr[j + 3]);
                                }
                                //通过此函数将以上绘制的图形绘制到画布上
                                that.sketchContext.stroke();
                                beamGArr.length=0;
                                beamLineArr.length=0;
                            }
                            beamcolorArr.length=0;
                            beamDataArr.length=0;
                        });
                    });

                } else if (axis == 'x') {
                    console.log('x轴');
                    sketchData.getDataY(this.doseId).then(res => {
                        console.log('x轴--勾画线')
                        var bigData = res.data.split('\r\n');
//                console.log('bigDatalength==='+bigData.length);
                        var singleBig = [];
                        var pieceNumArr = [];
                        for (var i = 0; i < bigData.length; i++) {
                            singleBig[i] = bigData[i].split('|');
                            pieceNumArr.push(singleBig[i][3]);
                        }
                        //                console.log('piece=='+pieceNumArr.length);
                        this.indexCollect = [];
                        this.indexCollect.length=0;
                        var numString = this.imageParams.width - num + '';//数字转化成字符串，去数组中查找
                        var indexArr = this.findIndexArr(pieceNumArr, numString, 0);//先寻找第65张z切面所包含的器官数据行
                        //canvas画线
                        this.sketchContextX.putImageData(this.imgDataSketchX, 0, 0);
                        if (indexArr.length > 0) {

                            for (var i = 0; i < indexArr.length; i++) {
                                var findSingleArr = bigData[indexArr[i]].split('|');//以|分割找到的行数据
                                var trueDataArr = findSingleArr[findSingleArr.length - 1].split('\\');
                                //                        console.log('trueDataArr==='+trueDataArr.length);
                                var lineColor = findSingleArr[2];//找到该行的颜色值
                                var targetLine = [];
                                for (var t = 0; t < trueDataArr.length; t += 2) {
                                    targetLine[t / 2] = [parseInt(trueDataArr[t]), parseInt(trueDataArr[t + 1])]
                                }

                                //开始一个新的绘制路径
                                this.sketchContextX.beginPath();
                                //设置线条颜色为黑色
                                //                        this.sketchContext.strokeStyle = "red";
                                this.sketchContextX.strokeStyle = 'rgb(' + lineColor + ')';
                                //线宽
                                //			        context.lineWidth = 3;
                                //绘制线段

                                for (var q = 0; q < targetLine.length; q++) {
                                    this.sketchContextX.lineTo((targetLine[q][0]), (targetLine[q][1]) * 250 / 78)
                                }

                                //先关闭绘制路径。注意，此时将会使用直线连接当前端点和起始端点。
                                //如果是闭环,加这句,如果不是,则不需要加
                                this.sketchContextX.closePath();
                                //通过此函数将以上绘制的图形绘制到画布上
                                this.sketchContextX.stroke();
                                findSingleArr.length=0;
                                trueDataArr.length=0;
                                lineColor=null;
                                targetLine.length=0;
                            }
                            indexArr.length=0;
                            bigData.length=0;
                            singleBig.length=0;
                            pieceNumArr.length=0;
                            indexArr.length=0;
                        }
                    });
                } else if (axis == 'y') {
                    console.log('y轴');
                    sketchData.getDataX(this.doseId).then(res => {
                        console.log('y轴--勾画线')
                        var bigData = res.data.split('\r\n');
//                console.log('bigDatalength==='+bigData.length);
                        var singleBig = [];
                        var pieceNumArr = [];
                        for (var i = 0; i < bigData.length; i++) {
                            singleBig[i] = bigData[i].split('|');
                            pieceNumArr.push(singleBig[i][3]);
                        }
                        //                console.log('piece=='+pieceNumArr.length);
                        this.indexCollect = [];
                        var numString =  num + '';//数字转化成字符串，去数组中查找
                        var indexArr = this.findIndexArr(pieceNumArr, numString, 0);//先寻找第65张z切面所包含的器官数据行
                        //canvas画线
                        this.sketchContextY.putImageData(this.imgDataSketchY, 0, 0);
                        if (indexArr.length > 0) {

                            for (var i = 0; i < indexArr.length; i++) {
                                var findSingleArr = bigData[indexArr[i]].split('|');//以|分割找到的行数据
                                var trueDataArr = findSingleArr[findSingleArr.length - 1].split('\\');
                                //                        console.log('trueDataArr==='+trueDataArr.length);
                                var lineColor = findSingleArr[2];//找到该行的颜色值
                                var targetLine = [];
                                for (var t = 0; t < trueDataArr.length; t += 2) {
                                    targetLine[t / 2] = [parseInt(trueDataArr[t]), parseInt(trueDataArr[t + 1])]
                                }

                                //开始一个新的绘制路径
                                this.sketchContextY.beginPath();
                                //设置线条颜色为黑色
                                //                        this.sketchContext.strokeStyle = "red";
                                this.sketchContextY.strokeStyle = 'rgb(' + lineColor + ')';
                                //线宽
                                //			        context.lineWidth = 3;
                                //绘制线段

                                for (var q = 0; q < targetLine.length; q++) {
                                    this.sketchContextY.lineTo((targetLine[q][0]), (targetLine[q][1]) * 250 / 78)
                                }

                                //先关闭绘制路径。注意，此时将会使用直线连接当前端点和起始端点。
                                //如果是闭环,加这句,如果不是,则不需要加
                                this.sketchContextY.closePath();
                                //通过此函数将以上绘制的图形绘制到画布上
                                this.sketchContextY.stroke();
                                findSingleArr.length=0;
                                trueDataArr.length=0;
                                lineColor=null;
                                targetLine.length=0;
                            }
                            indexArr.length=0;
                            bigData.length=0;
                            singleBig.length=0;
                            pieceNumArr.length=0;
                            indexArr.length=0;
                        }
                    });
                }
            },

            renderBgd(){

                var scWidth=$('#content-dose').width();
                var scHeight=$('#content-dose').height();
                this.scWidth=scWidth
                $("#backgroundLayer").width(scWidth)
                $("#backgroundLayer").height(scHeight)
            },

            spreadModal(event){
                $('.imgContainer').css({
                    "overflow":"visible"
                });
                $('#imgInfo').css({
                    "display":"none"
                });
                $('#imgInfo1').css({
                    "display":"none"
                });
                $('#imgInfo2').css({
                    "display":"none"
                });

                var id=event.target.id;
                console.log("id="+id)
                this.renderBgd();
                //黑色背景出现
                $("#backgroundLayer").css({
                    "z-index":"9992",
                });
                $('#imgInfo ul').eq(1).css({
                    'top':'200px'
                })
                $('#imgInfo ul').eq(0).css({
                    'top':'300px'
                })

                //让TIP字体大小均放大2倍
                this.scale1=1/2;
                this.scaleX=1/2;
                this.scaleY=1/2;
                if(id=="z-view"){
                    $('#info').show();
                    $('#info1').hide();
                    $('#info2').hide();
                    //把色条加进来
                    /*var colorInfo=$('#'+id).parent().find('.colorInfoBox').html();
                    $('#dicomImageforDose').append(colorInfo);
                    this.colorBar('colorBar');
                    $('#colorInfo').css('right','-80px');*/

                    $("#dicomImageforDose").css({
                        "z-index":"9999",
                        "transform":"scale(1,1)"
                    });
                    $('.canvasBox').css({
                        'position':'static'
                    });
                    if(this.scWidth<1366){
                        $("#dicomImageforDose").css({
                            "left":"50%",
                        })
                    }
                    if(1366<=this.scWidth && this.scWidth<1600){
                        $("#dicomImageforDose").css({
                            "left":"215px",
                            "top":"20px"
                        })
                    }
                    if(1600<=this.scWidth && this.scWidth<1920){
                        $("#dicomImageforDose").css({
                            "left":"570px",
                            "top":"180px"
                        })
                    }
                    if(this.scWidth>=1920){
                        $("#dicomImageforDose").css({
                            "left":"500px",
                            "top":"200px"
                        })
                    }
                }
                if(id=="x-view"){
                    $('#info').hide();
                    $('#info1').show();
                    $('#info2').hide();
                    //把色条加进来
                    /*var colorInfo2=$('#'+id).parent().find('.colorInfoBox2').html();
                    $('#dicomImageforDose2').append(colorInfo2);
                    this.colorBar('colorBar2');
                    $('#colorInfo2').css('right','-80px');
*/
                    $("#dicomImageforDose2").css({
                        "z-index":"9999",
                        "transform":"scale(1,1)"
                    });
                    $('.canvasBox1').css({
                        'position':'static'
                    });
                    if(this.scWidth<1366){
                        $("#dicomImageforDose2").css({
                            "left":"-150px",
                            "top":"20px"
                        })
                    }
                    if(1366<=this.scWidth && this.scWidth<1600){
                        $("#dicomImageforDose2").css({
                            "left":"-120px",
                            "top":"20px"
                        })
                    }
                    if(1600<=this.scWidth && this.scWidth<1920){
                        $("#dicomImageforDose2").css({
                            "left":"-90px",
                            "top":"190px"
                        })
                    }
                    if(this.scWidth>=1920){
                        $("#dicomImageforDose2").css({
                            "left":"-185px",
                            "top":"200px"
                        })
                    }
                }
                if(id=="y-view"){
                    $('#info').hide();
                    $('#info1').hide();
                    $('#info2').show();
                    //把色条加进来
                    /*var colorInfo3=$('#'+id).parent().find('.colorInfoBox3').html();
                    $('#dicomImageforDose3').append(colorInfo3);
                    this.colorBar('colorBar3');*/
                    // $('#colorInfo3').css('right','-80px');

                    $("#dicomImageforDose3").css({
                        "z-index":"9999",
                        "transform":"scale(1,1)"
                    });
                    $('.canvasBox2').css({
                        'position':'static'
                    });
                    if(this.scWidth<1366){
                        $("#dicomImageforDose3").css({
                            "left":"-550px",
                            "top":"20px"
                        })
                    }
                    if(1366<=this.scWidth && this.scWidth<1600){
                        $("#dicomImageforDose3").css({
                            "left":"-510px",
                            "top":"20px"
                        })
                    }
                    if(1600<=this.scWidth && this.scWidth<1920){
                        $("#dicomImageforDose3").css({
                            "left":"-545px",
                            "top":"190px"
                        })
                    }
                    if(this.scWidth>=1920){
                        $("#dicomImageforDose3").css({
                            "left":"-750px",
                            "top":"200px"
                        })
                    }
                }

            },
            minModal(event){
                $('.imgContainer').css({
                    "overflow":"hidden"
                });
                $('#imgInfo').css({
                    "display":"block"
                });
                $('#imgInfo1').css({
                    "display":"block"
                });
                $('#imgInfo2').css({
                    "display":"block"
                });
                var id=event.target.id;
                var scWidth=document.documentElement.clientWidth;
                //去除放大时加进来的色条
                $('#dicomImageforDose').find('#colorInfo').remove();
                $('#dicomImageforDose2').find('#colorInfo2').remove();
                $('#dicomImageforDose3').find('#colorInfo3').remove();
                $('#imgInfo ul').eq(1).css({
                    'top':'10px'
                })
                $('#imgInfo ul').eq(0).css({
                    'bottom':'20px',
                    'top':'initial'
                })
                //让TIP字体大小均正常缩放
//                this.scale1=200/this.imageParams.height;
//                this.scaleX=280/this.imageParams.width;
//                this.scaleY=1/(Math.ceil(280/this.aspAll)/this.imageParams.fileNum);
                this.scale1=200/512;
                this.scaleX=280/512;
                this.scaleY=280/512;
                $("#dicomImageforDose").css({
                    "z-index":"1",
                    "left":"-0px",
                    "top":"-0px",
                    "transform":"scale("+this.scale1+")"
                });
                $("#dicomImageforDose2").css({
                    "z-index":"1",
                    "left":"-0px",
                    "top":"-0px",
                    "transform":"scale("+this.scaleX+","+this.scaleY+")"
                });
                $("#dicomImageforDose3").css({
                    "z-index":"1",
                    "left":"-0px",
                    "top":"-0px",
                    "transform":"scale("+this.scaleX+","+this.scaleY+")"
                });
                $("#backgroundLayer").css({
                    "z-index":"-1"
                });
                $('.canvasBox,.canvasBox1,.canvasBox2').css({
                    'position':'absolute'
                });
            },

            //渐变颜色条
            colorBar(id){

                var canvas=document.getElementById(id);
                canvas.width=15;
                canvas.height=150;
                var ctx=canvas.getContext('2d');
                ctx.beginPath();
                var gradient = ctx.createLinearGradient(0, 0, 0, 150);
                gradient.addColorStop(0, 'rgb(255,0,0)');
                gradient.addColorStop(0.25, 'rgb(255,255,0)');
                gradient.addColorStop(0.5, 'rgb(0,255,0)');
                gradient.addColorStop(0.75, 'rgb(0,255,255)');
                gradient.addColorStop(1, 'rgb(0,0,255)');
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, 15, 150);
            },
            //剂量显示框定位,更新
            updateTooltip(x, y, dose,val,des,axisDom) {
                var transl = '';
                if(axisDom==canvas000){
                    transl = 'translate(' + (x*this.widthZ +60) + 'px, ' + (y*this.heightZ-40) + 'px) scale('+1/this.scale1+')';
                    tooltipZ.style.webkitTransform = transl;
                    tooltipZ.innerHTML = 'dose:'+dose+'  val:'+val+' des:'+des;
                }else if(axisDom==canvas111){
                    transl = 'translate(' + (x*this.widthXY +30) + 'px, ' + (y*this.heightXY-40) + 'px) scale('+1/this.scaleX+','+1/this.scaleY+')';
                    document.getElementById('tooltipX').style.webkitTransform = transl;
                    document.getElementById('tooltipX').innerHTML = 'dose:'+dose+'  val:'+val+' des:'+des;
                }else if(axisDom==canvas222){
                    transl = 'translate(' + (x*this.widthXY +30) + 'px, ' + (y*this.heightXY-40) + 'px) scale('+1/this.scaleX+','+1/this.scaleY+')';
                    document.getElementById('tooltipY').style.webkitTransform = transl;
                    document.getElementById('tooltipY').innerHTML = 'dose:'+dose+'  val:'+val+' des:'+des;
                }

            },

            //渲染剂量
            render(axis,data){
                console.log(this.imageParams)
                //剂量图信息

                if(axis=='z'){//渲染z轴剂量
                    var canvas = document.getElementById('canvas000');
                    var context = canvas.getContext('2d');
                    var imgData=context.createImageData(this.imageParams.width,this.imageParams.height);
                    canvas.width = this.imageParams.width;
                    canvas.height =this.imageParams.height;
                }else if(axis=='x'){//渲染x轴剂量
                    var canvas = document.getElementById('canvas111');
                    var context = canvas.getContext('2d');
                    var imgData=context.createImageData(this.imageParams.width,this.imageParams.fileNum);
                    canvas.width = this.imageParams.width;
                    canvas.height = this.imageParams.fileNum;

                }else if(axis=='y'){//渲染y轴剂量
                    var canvas = document.getElementById('canvas222');
                    var context = canvas.getContext('2d');
                    var imgData=context.createImageData(this.imageParams.width,this.imageParams.fileNum);
                    canvas.width = this.imageParams.width;
                    canvas.height =this.imageParams.fileNum;
                }
                var doseStartPixel_x=0;
                var doseStartPixel_y=0;
                //清除当前画布已有数据
                this.brr=[];
                console.log("渲染啊");

                new this.gradientColor('#ff0000', '#0000ff', this.step);

                //获取当前index的数据
                var color_data=[];
                var dose_tmp=[];
                for(var i=0;i<data.length;i++) {
                    dose_tmp.push(parseInt(data[i] * this.imageParams.doseGridScaling * 100));//将剂量值数据存进 临时变量
                }
                //根据剂量数据找到对应的颜色数据,并把颜色反转放入新数组
                for (var i = 0; i < dose_tmp.length; i++) {
                    color_data.push(this.colorArr[this.step - dose_tmp[i]])
                }
//                dose_tmp.length=0;
                /*if(axis=='z'){

                    //将数据转换成剂量
                    var zDose=[];
                    for(var i=0;i<arr.length;i++){
                        zDose.push(parseInt(data[i]*0.0012476*100));
                    }
                    //根据剂量数据找到对应的颜色数据,并把颜色反转放入新数组
                    var color_data=[]
                    for (var i = 0; i < zDose.length; i++) {
                        color_data.push(this.colorArr[this.step - zDose[i]])
                    }
                }else if(axis=='x'){
                    arr=this.xDoseData[index];
                    //将数据转换成剂量
                    this.xDose=[];
                    for(var i=0;i<arr.length;i++){
                        this.xDose.push(parseInt(arr[i]*0.0012476*100));
                    }
                    //根据剂量数据找到对应的颜色数据,并把颜色反转放入新数组
                    for (var i = 0; i < this.xDose.length; i++) {
                        number = this.xDose[i];
                        this.brr.push(this.colorArr[this.step - number])
                    }

                }else if(axis=='y'){
                    arr=this.yDoseData[index];
                    //将数据转换成剂量
                    this.yDose=[];
                    for(var i=0;i<arr.length;i++){
                        this.yDose.push(parseInt(arr[i]*0.0012476*100));
                    }
                    //根据剂量数据找到对应的颜色数据,并把颜色反转放入新数组
                    for (var i = 0; i < this.yDose.length; i++) {
                        number = this.yDose[i];
                        this.brr.push(this.colorArr[this.step - number])
                    }
                }
                console.log("每一组x的剂量值的长度="+this.xDose.length)*/
                for (var i = 0; i < color_data.length; i++) {
                    imgData.data[i * 4 + 0] = color_data[i][0];
                    imgData.data[i * 4 + 1] = color_data[i][1];
                    imgData.data[i * 4 + 2] = color_data[i][2];
                    imgData.data[i * 4 + 3] = color_data[i][3];
                }
                color_data.length=0;
                color_data=null;
                dose_tmp = null;
                context.putImageData(imgData, doseStartPixel_x, doseStartPixel_y)
                console.log('this.imageParams======='+this.imageParams);
                console.log(this.imageParams);
                var asp=(this.imageParams.width*this.imageParams.columnPixelSpacing)/(this.imageParams.fileNum*this.imageParams.sliceThickness);//宽高比
                this.aspAll=asp;
                console.log('asp='+asp);
                doseStartPixel_x=null;
                doseStartPixel_y=null;
                canvas=null;
                context=null;
                imgData=null;
                data.length=0;
                data=null;
                this.colorArr.length=0;
//                this.widthXY=280/this.imageParams.width;//xy轴的图从原图渲染到小窗口,宽度需要变化的比例
//                this.heightXY=Math.round(280/asp)/this.imageParams.fileNum;//xy轴的图从原图渲染到小窗口,高度需要变化的比例
//                this.widthZ=200/this.imageParams.width;
//                this.heightZ=200/this.imageParams.height;

                this.widthXY=512/this.imageParams.width;//xy轴的图从原图渲染到小窗口,宽度需要变化的比例
                this.heightXY=Math.round(512/asp)/this.imageParams.fileNum;//xy轴的图从原图渲染到小窗口,高度需要变化的比例
                this.widthZ=512/this.imageParams.width;
                this.heightZ=512/this.imageParams.height;
                asp=null;


                if(axis=='z'){
                    document.getElementById('canvas000').style.transform="scale("+512/this.imageParams.width+","+512/this.imageParams.height+")";
                    document.getElementById('canvas000').style.transformOrigin="0 0";

                }else if(axis=='x'){
                    document.getElementById('canvas111').style.transform="scale("+512/this.imageParams.width+","+this.allHeight/this.imageParams.fileNum+")";
                    document.getElementById('canvas111').style.transformOrigin="0 0";
                }else if(axis=='y'){
                    document.getElementById('canvas222').style.transform="scale("+512/this.imageParams.height+","+this.allHeight/this.imageParams.fileNum+")";
                    document.getElementById('canvas222').style.transformOrigin="0 0";

                }
            },

            //剂量数据
            readDose(id){
                var defer=$.Deferred();
                doseData.getData(id, this.dosageLength).then(response=>{
                    if (response.status == "200") {
//                        $('.dose-progress-tip').hide();//隐藏进度条
//                        $('.dose-mask').hide();//隱藏遮罩层

                        var that=this;

                        var doseDB='doseDB_'+that.imageId;//设置数据库表名
                        var arrDose = response.data.split("\r\n");//截取数据为数组
                        var dose_z=[];//存放每一张z轴的数据

                        //生成z轴的剂量数
                        for (var jz = 0; jz < arrDose.length; jz++) {
                            dose_z[arrDose.length-jz-1] = arrDose[jz].split(",")
                            var dose_entry_map={
                                id:'',
                                value:null
                            };
                            dose_entry_map.id='dose_z_'+(arrDose.length-jz-1);//剂量id
                            dose_entry_map.value=dose_z[arrDose.length-jz-1];//每一张剂量的数据放入value中
                            this.addDBSingleData(doseDB, dose_entry_map)//将剂量数据单张依次存入db数据库
                            dose_entry_map=null;//清空对象
                        }


                        //生成x轴的剂量数组
                        var dose_tmp_x=[];//存放每一张x轴的数据
                        for (var jx = 0; jx < this.imageParams.height; jx++) {
                            dose_tmp_x.length=0;//清空存放x数据的临时变量
                            for (var kx = 0; kx <dose_z.length; kx++) {
                                dose_tmp_x.push.apply(dose_tmp_x, dose_z[kx].slice(this.imageParams.width * jx, this.imageParams.width * (jx + 1)))
                            }
                            var dose_entry_map={
                                id:'',
                                value:null
                            };
                            dose_entry_map.id='dose_x_'+jx;//剂量id
                            dose_entry_map.value=dose_tmp_x;//每一张剂量的数据放入value中
                            this.addDBSingleData(doseDB, dose_entry_map)//将剂量数据单张依次存入db数据库
                            dose_entry_map=null;//清空对象
                            dose_tmp_x.length=0
                        }

                        //生成y的剂量数组
                        var dose_tmp_y=[];//存放每一张y轴的数据
                        for (var jy = 0; jy < this.imageParams.width; jy++) {
                            dose_tmp_y.length=0;
                            for (var ky = 0; ky < dose_z.length; ky++) { //获取每行数据
                                var line = []
                                //获取一行像素点的值
                                for (var my = 0; my < this.imageParams.height; my++) {//获取单像素点数据
                                    //获取行内指定一个像素点的值
                                    line[my] = dose_z[ky][this.imageParams.width * my + jy]
                                }
                                dose_tmp_y.push.apply(dose_tmp_y, line);
                            }
                            var dose_entry_map={
                                id:'',
                                value:null
                            };
                            dose_entry_map.id='dose_y_'+jy;//剂量id
                            dose_entry_map.value=dose_tmp_y;//每一张剂量的数据放入value中
                            this.addDBSingleData(doseDB, dose_entry_map)//将剂量数据单张依次存入db数据库
                            dose_entry_map=null;//清空对象
                            dose_tmp_y.length=0//清空存放x轴单张数据的临时变量
                        }
                        dose_z.length=0;//清空 存放z轴剂量数据的变量
                        arrDose.length=0;//清空存放所有剂量数据的变量

                        var doseIndex='dose_x_'+this.xIndex;
                        console.log('999999------------------doseIndex-----------'+doseIndex)

                        var doseIndex='dose_y_'+this.yIndex;

                        var doseIndex='dose_z_'+this.zIndex;
                        defer.resolve(true);
                    }

                    /*this.render(this.xIndex,"x");
                    this.render(this.yIndex,"y");*/
                })
                /*doseData.getData(id, this.dosageLength).then(response=>{
                    var dose_z=[];
                    var doseDataZ=new Array();
                    if (response.status == "200") {
                        $('.dose-progress-tip').hide();//隐藏进度条
                        $('.dose-mask').hide();//隱藏遮罩层
                        var result=response.data;

                        var arrDose = result.split("\r\n");
                        console.log('length='+arrDose.length)
                        //生成z轴的剂量数
                        for (var jz = 0; jz < arrDose.length; jz++) {
                            dose_z[arrDose.length-jz-1] = arrDose[jz].split(",")
                            // this.zDoseData[jz] = arrDose[jz].split(",")
                        }
                        var dose_entry_map={
                            id:'',
                            value:null
                        };
                        dose_entry_map.id='dose_z';//图像id
                        dose_entry_map.value=dose_z;//每一张图的数据放入value中
                        doseDataZ.push(dose_entry_map);//将剂量对象放入doseData中
                        this.addDBData('doseDB',doseDataZ);

                        this.zDoseData=dose_z

                        //生成x轴的剂量数组
                        for (var jx = 0; jx < this.imageParams.height; jx++) {
                            this.xDoseData[jx] = [];
                            for (var kx = 0; kx < this.zDoseData.length; kx++) {
                                this.xDoseData[jx].push.apply(this.xDoseData[jx], this.zDoseData[kx].slice(this.imageParams.width * jx, this.imageParams.width * (jx + 1)))
                            }
                        }

                        //生成y的剂量数组
                        for (var jy = 0; jy < this.imageParams.width; jy++) {
                            this.yDoseData[jy] = []
                            for (var ky = 0; ky < this.zDoseData.length; ky++) { //获取每行数据
                                var line = []
                                //获取一行像素点的值
                                for (var my = 0; my < this.imageParams.height; my++) {//获取单像素点数据
                                    //获取行内指定一个像素点的值
                                    line[my] = this.zDoseData[ky][this.imageParams.width * my + jy]
                                }
                                this.yDoseData[jy].push.apply(this.yDoseData[jy], line)
                            }
                        }
                    }
                    console.log("zDoseData="+this.zDoseData.length);
                    console.log("xDoseData="+this.xDoseData.length);
                    console.log("yDoseData="+this.yDoseData.length);
                    this.render(this.zIndex,"z");
                    this.render(this.xIndex,"x");
                    this.render(this.yIndex,"y");
//                    console.log('this.zindex==='+this.zIndex);
                })*/
                return defer.promise();
            },

            //图谱模版
            gradientColor(startColor, endColor, step){
                var startRGB = this.gradientColor.prototype.colorRgb(startColor); //转换为rgb数组模式
                console.log("startRGB: " + startRGB)//startRGB: 255,0,0
                var startR = startRGB[0];
                var startG = startRGB[1];
                var startB = startRGB[2];

                var endRGB = this.gradientColor.prototype.colorRgb(endColor);//endRGB: 0,0,255
                console.log("endRGB: " + endRGB)
                var endR = endRGB[0];
                var endG = endRGB[1];
                var endB = endRGB[2];

                //总差值
                var sR = (endR - startR) / step;    //-
                var sG = (endG - startG) / step;    //0
                var sB = (endB - startB) / step;    //+
                console.log("sR: " + sR)
                console.log("sG: " + sG)
                console.log("sB: " + sB)


                var r;
                var g;
                var b;
                var a = 100;
                var d=0;
                if(step>7000){//如果最大剂量值大于7000,则3000以下剂量不可见
                    d=(step-3000)/(step/10);
                }else if(step>5000 && step<=7000){
                    d=(step-2000)/(step/10);
                }else if(step>3000 && step<=5000){
                    d=(step-1000)/(step/10);
                }else if(step<=3000){
                    d=(step-500)/(step/10);
                }
                for(var i = 0; i <= step; i++) {   //计算每一步的hex值
                    if (i < (step/10)){//深红色-->正红色
                        r = 100+Math.round((155*10)*i/step);
                        g = 0;
                        b = 0;
                        a=100
                    }else if((step/10) <= i && i< (step/5) ){//正红色-->黄色
                        r = 255
                        g = Math.round((255*5)*i/step);
                        b = 0
                        a=100
                    }
                    else if((step/5) <= i && i< (step*3/10)){//黄色-->绿色
                        r = Math.round(255-(255*i*10/(step*3)));
                        g = 255;
                        b = 0;
                        a=100
                    }
                    else if((step*3/10) <= i && i < (step * 2)/5){//绿色-->青色
                        r = 0
                        g = 255
                        b = Math.round((255*i*5)/(2*step));
                        a = 100
                    }else if((step * 2)/5 <= i && i < step/2){//青色-->蓝色
                        r = 0
                        g = Math.round(255-(255*i*2/step));
                        b = 255
                        a = 100
                    }
                    else if(step/2 <= i && i < (step*d/10)){//青色-->蓝色
                        r = 0
                        g = 0
                        b = 255
                        a = 100
                    }
                    else{//3000以下的剂量
                        r = 0
                        g = 0
                        b = 0
                        a = 0
                    }
                    //var hex =this.gradientColor.prototype.colorHex('rgba(' + r + ',' + g + ',' + b + ',' + a + ')');
                    this.colorArr.push([r,g,b,a]);
                }
//console.info('this.colorArr============'+this.colorArr.length);
                /*               for(var i = 0; i <= step; i++) {   //计算每一步的hex值
                                   if (i < (step/4)){
                                       r = 255
                                       g = Math.round(((255 * 4) * i/step))
                                       b = 0
                                       a=150
                                   }else if(((step/4)) <= i && i< (step/2)){
                                       r = Math.round(255 - ((255 * 4)*(i - step/4)/step))
                                       g = 255
                                       b = 0
                                       a=150
                                   }else if((step/2) <= i && i < (step * 3)/4){
                                       r = 0
                                       g = 255
                                       b = Math.round(((255 * 4) * (i - step/2)/step))
                                       a = 150
                                   }else{
                                       r = 0
                                       g = Math.round(255 - ((255 * 4)*(i - step*3/4)/step))
                                       b = 255
                                       a = 0
                                   }
                                   //var hex =this.gradientColor.prototype.colorHex('rgba(' + r + ',' + g + ',' + b + ',' + a + ')');
                                   this.colorArr.push([r,g,b,a]);
                               }*/

            },

            //修改原型
            colorPrototype(){

                // 将hex表示方式转换为rgb表示方式(这里返回rgb数组模式)
                this.gradientColor.prototype.colorRgb = function(sColor) {
                    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
                    var sColor = sColor.toLowerCase();
                    if(sColor && reg.test(sColor)) {
                        if(sColor.length === 4) {
                            var sColorNew = "#";
                            for(var i = 1; i < 4; i += 1) {
                                sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
                            }
                            sColor = sColorNew;
                        }    //处理六位的颜色值

                        var sColorChange = [];
                        for(var i = 1; i < 7; i += 2) {
                            sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
                        }
                        return sColorChange;
                    } else {
                        return sColor;
                    }
                },
                    // 将rgb表示方式转换为hex表示方式
                    this.gradientColor.prototype.colorHex = function(rgb) {
                        var _this = rgb;
                        var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
                        if(/^(rgb|RGB)/.test(_this)) {
                            var aColor = _this.replace(/(?:(|)|rgb|RGB)*/g, "").split(",");
                            var strHex = "#";
                            for(var i = 0; i < aColor.length; i++) {
                                var hex = Number(aColor[i]).toString(16);
                                hex = hex < 10 ? '0' + hex : hex; // 保证每个rgb的值为2位

                                if(hex === "0") {
                                    hex += hex;
                                }
                                strHex += hex;
                            }
                            if(strHex.length !== 7) {
                                strHex = _this;
                            }
                            return strHex;
                        } else if(reg.test(_this)) {
                            var aNum = _this.replace(/#/, "").split("");
                            if(aNum.length === 6) {
                                return _this;
                            } else if(aNum.length === 3) {
                                var numHex = "#";
                                for(var i = 0; i < aNum.length; i += 1) {
                                    numHex += (aNum[i] + aNum[i]);
                                }
                                return numHex;
                            }
                        } else {
                            return _this;
                        }
                    }
            },

            //创建db数据库
            createIndexedDB(){
                var imageDB='imageDB_'+this.imageId;
                var doseDB='doseDB_'+this.imageId;
                var lineDB='lineDB_'+this.imageId;
                var that=this;
                var indexedDB2 = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
                window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {
                    READ_WRITE: "readwrite"
                };
                window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

                if(!window.indexedDB) {
                    //您的浏览器不支持稳定版本的IndexedDB。这样的特性是不可用的
                    window.alert("您的浏览器不支持稳定版本的IndexedDB, 这样的特性是不可用的.");
                }
                //新建一个db
                var dbVersion=parseInt(window.localStorage.getItem("dbVersion")) || 1;
//                var dbVersion=storeState.state.dbVersion;
                that.myDB_dose.version=dbVersion;
                console.log('dbVERSION=====',dbVersion)
                var openRequest2 = indexedDB2.open(that.myDB_dose.name, that.myDB_dose.version);
                dbVersion++;
                window.localStorage.setItem("dbVersion",dbVersion);
//                storeState.state.dbVersion=dbVersion;
                openRequest2.onerror = function(e) {
                    console.log(e.target);
                    console.log("Database error: " + e.target.errorCode);
                };
                //如果数据库已经创建
                openRequest2.onsuccess = function(e) {
                    console.log("Database created");
                    that.myDB_dose.db = e.target.result;//将数据存进db中
                    //获取每个轴图像的长度
                    that.zLen = that.imageParams.fileNum;
                    that.xLen = that.imageParams.width;
                    that.yLen = that.imageParams.height;

                    that.zIndex = that.zLen / 2;
                    that.xIndex = that.xLen / 2;
                    that.yIndex = that.yLen / 2;
                    that.colorBar('colorBar');
                    that.colorBar('colorBar2');
                    that.colorBar('colorBar3');
                    that.colorBar('colorBarBgd');
                    var imageFetch = that.fetchStoreByCursorforDownload(that.myDB_dose.db, imageDB);
                    var lineFetch = that.fetchStoreByCursorforDownload(that.myDB_dose.db, lineDB);
                    var doseFetch = that.fetchStoreByCursorforDownload(that.myDB_dose.db, doseDB);
                    var imageFlag;
                    var lineFlag;
                    var doseFlag;
                    $.when(imageFetch).always(function (result1) {
                        imageFlag=result1;
                        $.when(lineFetch).always(function (result2) {
                            lineFlag=result2;
                            $.when(doseFetch).always(function (result3) {
                                doseFlag=result3;
                                var allElementDataFlag=imageFlag && lineFlag && doseFlag;//判断数据库中是否已有足够的数据

                                if (!allElementDataFlag) {
                                    //判断数据库是否放入数据
//                    $.when(that.getDataByKey(that.myDB_dose.db,imageDB,'image_z_0')).fail(function(flag){//库中查询不到数据
                                    //加载底图和剂量图的数据
                                    $.when(that.readImageforDose(that.imageId)).done(function (data) {//进行排序,加载完readImageforDose里面的数据之后才能进行readdose方法
                                        that.sketchLineData(that.doseId, lineDB);//把勾画数据存入DB中
                                        that.sketchLineDataX(that.doseId, lineDB);//把勾画数据存入DB中
                                        that.sketchLineDataY(that.doseId, lineDB);//把勾画数据存入DB中
                                        if(that.imageParams.largestImagePixelValue==undefined ||that.imageParams.largestImagePixelValue==null){
                                          layer.msg('数据有误，无法展示剂量图');
                                          return ;
                                        }
                                        $.when(that.readDose(that.doseId)).done(function(data){//下载剂量数据

                                        //从db数据库调出数据进行图像和剂量的渲染
                                        var lineIndex = 'line_z_' + that.zIndex;
                                        var imageIndex = 'image_z_' + that.zIndex;
                                        var temp_c = 'z';
                                        $.when(that.getDataByKey(that.myDB_dose.db, imageDB, imageIndex)).done(function (data) {
                                            that.ctImage(cornerstone_dose, data, temp_c);
                                            that.loader(temp_c);
                                            //渲染勾画线Z
                                            $.when(that.getDataByKey(that.myDB_dose.db, lineDB, lineIndex)).done(function (data) {
                                                that.drawSketch(data, temp_c);


                                                //获取x轴的图像和剂量值数据
                                                lineIndex = 'line_x_' + that.xIndex;
                                                imageIndex = 'image_x_' + that.xIndex;
                                                temp_c = 'x';
                                                $.when(that.getDataByKey(that.myDB_dose.db, imageDB, imageIndex)).done(function (data) {
                                                    that.ctImage(cornerstone_dose, data, temp_c);
                                                    that.loader(temp_c);

                                                    //渲染勾画线X
                                                    $.when(that.getDataByKey(that.myDB_dose.db, lineDB, lineIndex)).done(function (data) {
                                                        that.drawSketch(data, temp_c);
//

                                                        //获取y轴的图像和剂量值数据
                                                        lineIndex = 'line_y_' + that.yIndex;
                                                        imageIndex = 'image_y_' + that.yIndex;
                                                        temp_c = 'y';
                                                        $.when(that.getDataByKey(that.myDB_dose.db, imageDB, imageIndex)).done(function (data) {
                                                            that.ctImage(cornerstone_dose, data, temp_c);
                                                            that.loader(temp_c);

                                                            //渲染勾画线Y
                                                            $.when(that.getDataByKey(that.myDB_dose.db, lineDB, lineIndex)).done(function (data) {
                                                                that.drawSketch(data, temp_c);


                                                                //渲染z轴剂量
                                                                var doseIndex = 'dose_z_' + that.zIndex;
                                                                temp_c = 'z'
                                                                $.when(that.getDataByKey(that.myDB_dose.db, doseDB, doseIndex)).done(function (data) {
                                                                    that.render(temp_c, data);

                                                                    //渲染x轴剂量
                                                                    doseIndex = 'dose_x_' + that.xIndex;
                                                                    temp_c = 'x'
                                                                    $.when(that.getDataByKey(that.myDB_dose.db, doseDB, doseIndex)).done(function (data) {
                                                                        that.render(temp_c, data);

                                                                        //渲染y轴剂量
                                                                        doseIndex = 'dose_y_' + that.yIndex;
                                                                        temp_c = 'y'
                                                                        $.when(that.getDataByKey(that.myDB_dose.db, doseDB, doseIndex)).done(function (data) {
                                                                            that.render(temp_c, data);
                                                                            $('.dose-progress-tip').hide();//隐藏进度条
                                                                            $('.dose-mask').hide();//隱藏遮罩层
                                                                        });
                                                                    });
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                    });
                                } else {
                                    var lineIndex = 'line_z_' + that.zIndex;
                                    var imageIndex = 'image_z_' + that.zIndex;
                                    var temp_c = 'z'
                                    $.when(that.getDataByKey(that.myDB_dose.db, imageDB, imageIndex)).done(function (data) {
                                        that.ctImage(cornerstone_dose, data, temp_c);
                                        that.loader(temp_c);

                                        //渲染勾画线Z
                                        $.when(that.getDataByKey(that.myDB_dose.db, lineDB, lineIndex)).done(function (result) {
                                            that.drawSketch(result, temp_c);

                                            //获取x轴的图像和剂量值数据
                                            lineIndex = 'line_x_' + that.xIndex;
                                            imageIndex = 'image_x_' + that.xIndex;
                                            temp_c = 'x';
                                            $.when(that.getDataByKey(that.myDB_dose.db, imageDB, imageIndex)).done(function (data) {
                                                that.ctImage(cornerstone_dose, data, temp_c);
                                                that.loader(temp_c);
                                                //渲染勾画线X
                                                $.when(that.getDataByKey(that.myDB_dose.db, lineDB, lineIndex)).done(function (result) {
                                                    that.drawSketch(result, temp_c);

                                                    //获取y轴的图像和剂量值数据
                                                    lineIndex = 'line_y_' + that.yIndex;
                                                    imageIndex = 'image_y_' + that.yIndex;
                                                    temp_c = 'y';
                                                    $.when(that.getDataByKey(that.myDB_dose.db, imageDB, imageIndex)).done(function (data) {
                                                        that.ctImage(cornerstone_dose, data, temp_c);
                                                        that.loader(temp_c);
                                                        //渲染勾画线Y
                                                        $.when(that.getDataByKey(that.myDB_dose.db, lineDB, lineIndex)).done(function (result) {
                                                            that.drawSketch(result, temp_c);

                                                            //渲染z轴剂量
                                                            var doseIndex = 'dose_z_' + that.zIndex;
                                                            temp_c = 'z'
                                                            $.when(that.getDataByKey(that.myDB_dose.db, doseDB, doseIndex)).done(function (data) {
                                                                that.render(temp_c, data);

                                                                //渲染x轴剂量
                                                                doseIndex = 'dose_x_' + that.xIndex;
                                                                temp_c = 'x'
                                                                $.when(that.getDataByKey(that.myDB_dose.db, doseDB, doseIndex)).done(function (data) {
                                                                    that.render(temp_c, data);

                                                                    //渲染y轴剂量
                                                                    doseIndex = 'dose_y_' + that.yIndex;
                                                                    temp_c = 'y'
                                                                    $.when(that.getDataByKey(that.myDB_dose.db, doseDB, doseIndex)).done(function (data) {
                                                                        that.render(temp_c, data);
                                                                        $('.dose-progress-tip .dose-progressing').css('width', '100%');
                                                                        setTimeout(function () {
                                                                            $('.dose-progress-tip').hide();
                                                                            $('.dose-mask').hide();
                                                                        }, 1000);
                                                                    });
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                }
                            })
                        })
                    })
                };

                //如果数据库更新
                openRequest2.onupgradeneeded = function(e) {
                    //创建objectstore表
                    that.myDB_dose.db = e.target.result;
                    if(!that.myDB_dose.db.objectStoreNames.contains(doseDB)) {
                        var store = that.myDB_dose.db.createObjectStore(doseDB, {
                            keyPath: 'id'
                        });
                        //创建索引
                        store.createIndex('id', 'id', {
                            unique: true
                        });
                        // that.readDose(that.doseId)
                    }
                    if(!that.myDB_dose.db.objectStoreNames.contains(imageDB)) {
                        var store = that.myDB_dose.db.createObjectStore(imageDB, {
                            keyPath: 'id'
                        });
                        //创建索引
                        store.createIndex('id', 'id', {
                            unique: true
                        });

                    }
                    if(!that.myDB_dose.db.objectStoreNames.contains(lineDB)) {
                        var store = that.myDB_dose.db.createObjectStore(lineDB, {
                            keyPath: 'id'
                        });
                        //创建索引
                        store.createIndex('id', 'id', {
                            unique: true
                        });

                    }

                    console.log('DB version changed to ' + that.myDB_dose.version);
                };
            },

            //新增单条DB数据
            addDBSingleData(objectStore,entry){//参数一:表名,参数二:需要添加的数据
                var _objectStore=this.myDB_dose.db.transaction(objectStore,"readwrite").objectStore(objectStore);
                _objectStore.add(entry);
            },

            //新增DB数据
            addDBData(objectStore,entry){//参数一:表名,参数二:需要添加的数据
                var _objectStore=this.myDB_dose.db.transaction(objectStore,"readwrite").objectStore(objectStore);
                entry.forEach(function (dose_entry) {
                    _objectStore.add(dose_entry);
                })
            },
            //按key获取DB数据
            getDataByKey(db,storeName,id){
                var transaction=db.transaction(storeName,'readwrite');
                var store=transaction.objectStore(storeName);
                var request=store.get(id);
                var defer=$.Deferred();
                request.onsuccess=function (e) {
                    let entry=e.target.result;//定义变量存放所需id的数据

                    var temp_c='z';//创建变量存放轴的名称
                    if(!entry){
                        defer.reject(false);
                        return ;
                    }
                    if(entry.id.indexOf('image') != -1){//判断,如果是image数据,则渲染图像

                        defer.resolve(entry.value);

                    }else if(entry.id.indexOf('dose') != -1){//判断,如果是dose数据,则渲染图像
                        if(entry.id.indexOf('dose_z') != -1) {
                            temp_c='z';
                            // that.render(temp_c,Data_tmp)
                        }else if(entry.id.indexOf('dose_x') != -1) {
                            temp_c='x';
                            // that.render(temp_c,Data_tmp)
                        }else if(entry.id.indexOf('dose_y') != -1) {
                            temp_c='y';
                            // that.render(temp_c,Data_tmp)
                        }
                        defer.resolve(entry.value);
                    }else if(entry.id.indexOf('line')!=-1){
                        defer.resolve(entry.value);
                    }
                }
                return defer.promise();
            },
            fetchStoreByCursorforDownload(db,storename){
                var store = db.transaction(storename,'readwrite').objectStore(storename);
                var request = store.openCursor();//db为IDBDatabase对象
                var allImageDataNum=this.imageParams.width+this.imageParams.height+this.imageParams.fileNum;
//                if(storename.indexOf('lineDB_')>-1){
//                     var allImageDataNum=this.imageParams.fileNum;
//                }else{
//                     var allImageDataNum=this.imageParams.width+this.imageParams.height+this.imageParams.fileNum;
//                }
                var count=0;
                var defer=$.Deferred();
                request.onsuccess = function(e){
                    var cursor = e.target.result;
                    if(cursor){//必须要检查
                        count++;
                        cursor.continue();//遍历了存储对象中的所有内容
                    }
                    if(!cursor){
                        console.log(count+'游标开始查询'+allImageDataNum)
                        if(count==allImageDataNum){
                            defer.resolve(true);
                        }else{
                            defer.reject(false);
                        }
                    }
                };
                return defer.promise();
            },
            //读取图像数据
            readImageforDose(id) {
                console.log('loading...');
                var type=1;
                var imageDB='imageDB_'+this.imageId;
                var defer=$.Deferred();
                // var doseDB='doseDB_'+this.imageId;
                Download.readImageforDose(id,type,this.fileLength).then(response => {
                    var startTime = new Date().getTime();
                    if(response) {
                      if (response.status == "200") {
                        this.preAfterFlag = 1;//开始加载剂量数据的标示
                        var uint16 = new Uint16Array(response.data); // length为4
//                        console.log(uint16);
                        var width = this.imageParams.width;
                        var height = this.imageParams.height;
                        var fileNum = this.imageParams.fileNum

                        this.zIndex = Math.floor(fileNum / 2);
                        this.xIndex = Math.floor(width / 2);
                        this.yIndex = Math.floor(height / 2);
                        var arr_z_first = [];
                        var arr_tmp = [];
                        //生成 Z 切面 数据
                        for (var i = 0; i < fileNum; i++) {
                          arr_tmp[(fileNum - 1 ) - i] = uint16.slice((width * height) * i, (width * height) * (i + 1))
//                            arr_tmp[ i] = uint16.slice((width * height) * i, (width * height) * (i + 1))
                          var image_entry_map = {
                            id: '',
                            value: null
                          };
                          image_entry_map.id = 'image_z_' + (fileNum - 1 - i );//图像id
//                            image_entry_map.id='image_z_'+( i ) ;//图像id
                          image_entry_map.value = arr_tmp[(fileNum - 1 ) - i];//每一张图的数据放入value中
//                            image_entry_map.value=arr_tmp[i];//每一张图的数据放入value中
                          this.addDBSingleData(imageDB, image_entry_map)
                          if (i == this.zIndex) {
                            arr_z_first = image_entry_map.value;
                            this.ctImage(cornerstone_dose, arr_z_first, 'z');
                            this.loader('z');
                          }
                          image_entry_map = null;

                        }
                        // this.addDBData(imageDB, imageDataZ);
                        //生成 X 切面 数据
                        var arr_x_first = [];
                        var arr_tmp_x = [];
                        var arr_tmp_x2 = [];
                        for (var jx = 0; jx < height; jx++) {
                          if (jx == this.xIndex) {
                            for (var kx = 0; kx < arr_tmp.length; kx++) {
                              //每一像素行数据
                              arr_tmp_x2.push.apply(arr_tmp_x2, arr_tmp[kx].slice(width * jx, width * (jx + 1)))
                            }
                            arr_x_first = arr_tmp_x2;
                            this.ctImage(cornerstone_dose, arr_x_first, 'x');
                            this.loader('x');
                            var image_entry_map = {
                              id: '',
                              value: null
                            };
                            image_entry_map.id = 'image_x_' + jx;//图像id
                            image_entry_map.value = arr_tmp_x2;//每一张图的数据放入value中
                            this.addDBSingleData(imageDB, image_entry_map)

                            image_entry_map = null;
                          } else {
                            arr_tmp_x.length = 0;
                            for (var kx = 0; kx < arr_tmp.length; kx++) {
                              //每一像素行数据
                              arr_tmp_x.push.apply(arr_tmp_x, arr_tmp[kx].slice(width * jx, width * (jx + 1)))
                            }
                          }

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
                          if (jy == this.yIndex) {//先存下来第中间张数的数据
                            for (var ky = 0; ky < arr_tmp.length; ky++) { //获取每行数据
                              // var line = []
                              // arr_tmp_x.length = 0;
                              //获取一行像素点的值
                              for (var my = 0; my < height; my++) {//获取单像素点数据
                                //获取行内指定一个像素点的值
                                arr_tmp_x2[my] = arr_tmp[ky][width * my + jy]
                              }
                              yData_tmp2.push.apply(yData_tmp2, arr_tmp_x2)
                            }
                            arr_y_first = yData_tmp2;
                            console.log('arr_y_first的长度=' + arr_y_first.length)
                            this.ctImage(cornerstone_dose, arr_y_first, 'y');
                            this.loader('y');
                            var image_entry_map = {
                              id: '',
                              value: null
                            };
                            image_entry_map.id = 'image_y_' + jy;//图像id
                            image_entry_map.value = yData_tmp2;//每一张图的数据放入value中
                            this.addDBSingleData(imageDB, image_entry_map)

                            image_entry_map = null;
                          } else {
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
                          }

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


                        var imageIndex = 'image_x_' + this.xIndex;
                        // this.xLen=this.xData.length;
                        // this.getDataByKey(this.myDB_dose.db,imageDB,imageIndex)//获取x轴图形数据

                        imageIndex = 'image_y_' + this.yIndex;
                        // this.yLen=this.yData.length;
                        // this.getDataByKey(this.myDB_dose.db,imageDB,imageIndex)//获取y轴图形数据

                        imageIndex = 'image_z_' + this.zIndex;
                        // this.zLen=this.zData.length;
                        // this.getDataByKey(this.myDB_dose.db,imageDB,imageIndex)//获取z轴图形数据


                        this.colorBar('colorBar');
                        this.colorBar('colorBar2');
                        this.colorBar('colorBar3');
                        var endTime = new Date().getTime()
                        console.log((endTime - startTime) / 1000 + "秒")
                        // uint16.length=0;//清除数据缓存
                        defer.resolve(true);
                      }
                    }
                })
                return defer.promise();
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

            //获取电子密度值
            getElectronDensityValue(ctValue) {
                let compareArray = [
                    [-1000, 0.001],
                    [-992, 0.001],
                    [-976, 0.001],
                    [-480, 0.500],
                    [-96, 0.950],
                    [0, 1.000],
                    [48, 1.050],
                    [128, 1.100],
                    [528, 1.334],
                    [976, 1.603],
                    [1488, 1.850],
                    [1874, 2.100],
                    [2224, 2.400],
                    [2640, 2.700],
                    [2832, 2.830],
                    [3200, 3.180],
                    [4550, 4.500],
                    [10000, 8.100]
                ]

                let e;
                for (let i = 0; i < compareArray.length; i++) {
                    if (ctValue <= compareArray[0][0]) {
                        e = 0.001
                    } else if (ctValue >= compareArray[compareArray.length - 1][0]) {
                        e = 8.100
                    } else if (compareArray[i][0] < ctValue && ctValue <= compareArray[i + 1][0] && (i + 1) < compareArray.length) {
                        e = compareArray[i][1] + (ctValue - compareArray[i][0]) * (compareArray[i + 1][1] - compareArray[i][1]) / (compareArray[i + 1][0] - compareArray[i][0])
                    }
                }

                // console.log(Math.round(e * 1000) / 1000)
                return Math.round(e * 1000) / 1000
            },

            //获取当前鼠标在canvas上的坐标
            getPointOnCanvas(canvas, evt) {
                var bbox = canvas.getBoundingClientRect();
                //console.log(bbox);
                if(canvas==canvas000){
                    return {
                        x : Math.ceil((evt.clientX - bbox.left )*(this.imageParams.width) / (bbox.width)),
                        y : Math.ceil((evt.clientY - bbox.top )*(this.imageParams.height) / (bbox.height))
                    };
                }else{
                    return {
                        x : Math.ceil((evt.clientX - bbox.left )*(this.imageParams.width) / (bbox.width)),
                        y : Math.ceil((evt.clientY - bbox.top )*(this.imageParams.fileNum) / (bbox.height))
                    };
                }

            },

            loader(axis){
                var imageId ="";
                var index=0;
                var len=0;
                var domWindow=""
                var Vue=this;
                var doseCanvas='';
                var tooltip={};
                var doseIndex=''
                //判断是哪个窗口
                if (axis == "z") {
                    domWindow = "#dicomImageforDose";
                    doseCanvas=canvas000;
                    tooltip=tooltipZ
                    imageId = 'ctexample://' + this.zIndex;
                    index = this.zIndex;
                    len = this.zLen;

                    for (var i = 0; i < len; i++) {
                        this.zImageIds[i] = 'ctexample://' + (i);
                    }
                    var element = $('#dicomImageforDose').get(0);

                    cornerstone_dose.enable(element);
                    var imageIds = this.zImageIds;
                }
                if (axis == "x") {
                    domWindow = "#dicomImageforDose2"
                    doseCanvas=canvas111;
                    tooltip=tooltipX
                    imageId = 'ctexample://' + this.xIndex;
                    index = this.xIndex;
                    len = this.xLen;
                    for (var i = 0; i < len; i++) {
                        this.xImageIds[i] = 'ctexample://' + (i);
                    }
                    var element = document.getElementById("dicomImageforDose2");

                    cornerstone_dose.enable(element);
                    var imageIds = this.xImageIds;
                }
                if (axis == "y") {
                    domWindow = "#dicomImageforDose3"
                    doseCanvas=canvas222;
                    tooltip=tooltipY
                    imageId = 'ctexample://' + this.yIndex;
                    index = this.yIndex;
                    len = this.yLen;
                    for (var i = 0; i < len; i++) {
                        this.yImageIds[i] = 'ctexample://' + (i);
                    }
                    var element = document.getElementById("dicomImageforDose3");

                    cornerstone_dose.enable(element);
                    var imageIds = this.yImageIds;
                }

                //鼠标在canvas中移动时候,动态显示剂量
                var x = 0;
                var y = 0;
                var doseValue = [];
                var ctValue=0
                var doseWidth = Vue.imageParams.width;
                var doseHeight=0;
                doseDB='doseDB_'+Vue.imageId
                var imageDB='imageDB_'+Vue.imageId;
                var doseZIndex='';
                var doseXIndex='';
                var doseYIndex='';

                var imageIndex = '';
                doseCanvas.onmousemove=function (e) {
//     console.log("moving");
                    tooltip.style.display = 'block';//显示剂量框

                    doseZIndex='dose_z_'+Vue.zIndex;
                    doseXIndex='dose_x_'+Vue.xIndex;
                    doseYIndex='dose_y_'+Vue.yIndex;
                    imageIndex ='image_z_' + Vue.zIndex;

                    if(doseCanvas==canvas000){//判断,在z轴移动使用剂量高度是512
                        doseHeight=Vue.imageParams.height
                    }else{
                        doseHeight=Vue.imageParams.fileNum//在x,y轴移动,使用的剂量高度是78
                    }
                    //获取当前鼠标在剂量图上的相对
                    x = Vue.getPointOnCanvas(doseCanvas, e).x;
                    y = Vue.getPointOnCanvas(doseCanvas, e).y;
//     console.log(x,y);

                    //如果鼠标移出了图像框,剂量值为0
                    if (Vue.getPointOnCanvas(doseCanvas, e).x <= 0 || Vue.getPointOnCanvas(doseCanvas, e).x > doseWidth
                        || Vue.getPointOnCanvas(doseCanvas, e).y <= 0 || Vue.getPointOnCanvas(doseCanvas, e).y > doseHeight) {
                        doseValue = 0;
                        ctValue=0
                    } else {
                        //从剂量数组中取对应值
                        var index2 = (Vue.getPointOnCanvas(doseCanvas, e).y - 1) * doseWidth + Vue.getPointOnCanvas(doseCanvas, e).x
                        if(doseCanvas==canvas000){
                            imageIndex ='image_z_' + Vue.zIndex;
                            $.when(Vue.getDataByKey(Vue.myDB_dose.db,doseDB,doseZIndex)).done(function (oneData) {
                                doseValue = parseInt(oneData[index2 - 1]*Vue.imageParams.doseGridScaling*100)
                                // console.log(doseValue)
                                $.when(Vue.getDataByKey(Vue.myDB_dose.db,imageDB,imageIndex)).done(function (data) {
                                    ctValue=(data[index2]);
                                    Vue.density=Vue.getElectronDensityValue(ctValue)
                                    // console.log(ctValue)
                                })
                            });
                        }else if(doseCanvas==canvas111){
                            imageIndex ='image_x_' + Vue.xIndex;
                            $.when(Vue.getDataByKey(Vue.myDB_dose.db,doseDB,doseXIndex)).done(function (oneData) {
                                doseValue = parseInt(oneData[index2 - 1]*Vue.imageParams.doseGridScaling*100);
                                $.when(Vue.getDataByKey(Vue.myDB_dose.db,imageDB,imageIndex)).done(function (data) {
                                    ctValue=(data[index2]);
                                    Vue.density=Vue.getElectronDensityValue(ctValue);
                                })
                            });
                        }else if(doseCanvas==canvas222){
                            imageIndex ='image_y_' + Vue.yIndex;
                            $.when(Vue.getDataByKey(Vue.myDB_dose.db,doseDB,doseYIndex)).done(function (oneData) {
                                doseValue = parseInt(oneData[index2 - 1]*Vue.imageParams.doseGridScaling*100);
                                $.when(Vue.getDataByKey(Vue.myDB_dose.db,imageDB,imageIndex)).done(function (data) {
                                    ctValue=(data[index2]);
                                    Vue.density=Vue.getElectronDensityValue(ctValue)
                                })
                            });
                        }
                        Vue.updateTooltip(x,y,doseValue,ctValue,Vue.density,doseCanvas);
//                        console.log("doseCanvas="+doseCanvas.id)
                    }

                    // Vue.updateTooltip(e.clientX, e.clientY, doseValue)
                };
                doseCanvas.onmouseout = function () {
                    if(doseCanvas==canvas000){
                        tooltipZ.style.display = 'none';
                    }else if(doseCanvas==canvas111){
                        tooltipX.style.display = 'none';
                    }else if(doseCanvas==canvas222){
                        tooltipY.style.display = 'none';
                    }

                };
                function updateTheImage(imageIndex) {
                    Vue.flag=1;
                    cornerstone_dose.loadImage(imageIds[imageIndex]).then(function(image) {
                        cornerstone_dose.displayImage(element, image);
                    });
                };
                var imageDB='imageDB_'+Vue.imageId;
                var doseDB='doseDB_'+Vue.imageId;
                var lineDB='lineDB_'+Vue.imageId;
                var imageIndex=0;
                var doseIndex=0;
                var lineIndex=0;
                cornerstone_dose.loadImage(imageId).then(function(image) {
                    cornerstone_dose.displayImage(element, image);
                    //var viewport = cornerstone_dose.getViewport(element);

                    //鼠标滚轮滚动事件
                    Vue.lastTime=new Date().getTime();
                    $(domWindow).on('mousewheel DOMMouseScroll', function (e) {
                        // console.log('axis==============='+axis);
                        Vue.axisG=axis;
                        var curTime=new Date().getTime();
//                      if(curTime-Vue.lastTime>600){
                        if (e.originalEvent.wheelDelta < 0 || e.originalEvent.detail > 0) {//向下滑

                            if(index>0){
                                index--;
                                console.log("这是第"+index+"张影像")
                                // Vue.render(index,axis);
                            }else if(index==0){
                                index=len-1;
                                console.log("这是第"+index+"张影像")
                            }
                        } else {
                            console.log("向上")
                            if( index >=0  && index<(len-1) ){
                                index++;
                                console.log("这是第"+index+"张影像")
                                // Vue.render(index,axis);
                            }else if(index==len-1){
                                index=0;
                                // Vue.render(index,axis);
                                console.log("这是第"+index+"张影像")
                            };
                        }
                        if(axis == 'z'){
                            imageIndex='image_z_'+index;
                            doseIndex='dose_z_'+index;
                            lineIndex='line_z_'+index;
                            Vue.zIndex=index;
                            Vue.recentOri=Vue.volumeOri[Vue.zIndex]
                            // Vue.zDoseIndex='dose_z_'+index;
                        }
                        if(axis == 'x'){
                            imageIndex='image_x_'+index;
                            doseIndex='dose_x_'+index;
                            lineIndex='line_x_'+index;
                            Vue.xIndex=index;
                            Vue.xOri=Vue.imageParams.rowPixelSpacing*(Vue.xIndex);
                        }
                        if(axis == 'y'){
                            imageIndex='image_y_'+index;

                            doseIndex='dose_y_'+index;
                            lineIndex='line_y_'+index;
                            Vue.yIndex=index;
                            Vue.yOri=Vue.imageParams.rowPixelSpacing*(Vue.yIndex);
                        }

                        //渲染图像
                        $.when(Vue.getDataByKey(Vue.myDB_dose.db,imageDB,imageIndex)).done(function (oneData) {
                            Vue.data_tmp=oneData;
                            updateTheImage(index);
                            //渲染勾画线Z
//                            if(axis=='z'){
                            $.when(Vue.getDataByKey(Vue.myDB_dose.db,lineDB,lineIndex)).done(function (result) {
                                Vue.drawSketch(result, axis);


                                //                                渲染剂量
                                $.when(Vue.getDataByKey(Vue.myDB_dose.db, doseDB, doseIndex)).done(function (oneData) {
                                    Vue.render(axis, oneData);
                                    Vue.lastTime=curTime;
                                });
                            });
//                            }else{
//                                //                                渲染剂量
//                                $.when(Vue.getDataByKey(Vue.myDB_dose.db, doseDB, doseIndex)).done(function (oneData) {
//                                    Vue.render(axis, oneData);
//                                    Vue.lastTime=curTime;
//                                });
//                            }
                        });

//                        }

                        return false;
                    });

//                    Vue.scale1=200/Vue.imageParams.height;
//                    Vue.scaleX=280/Vue.imageParams.width;
//                    Vue.scaleY=1/(Math.ceil(280/Vue.aspAll)/Vue.imageParams.fileNum);
                    Vue.scale1=200/512;
                    Vue.scaleX=280/512;
                    Vue.scaleY=280/512;
                    $('#dicomImageforDose').css({
                        'transform':'scale('+Vue.scale1+')',
                        'webkitTransform':'scale('+Vue.scale1+')'
                    });
                    $('#dicomImageforDose2').css({
                        "transform":'scale('+Vue.scaleX+','+Vue.scaleY+')',
                        "webkitTransform":'scale('+Vue.scaleX+','+Vue.scaleY+')',
                    })
                    $('#dicomImageforDose3').css({
                        "transform":'scale('+Vue.scaleX+','+Vue.scaleY+')',
                        "webkitTransform":'scale('+Vue.scaleX+','+Vue.scaleY+')'
                    });
                    Vue.calcTOPandLeft(domWindow);//计算dicomImageforDose、2、3的父元素的位置

                });


                if (axis == 'z') {
//                    this.sketchLine('' + this.zIndex, 'z');//显示靶区勾画线
                } else if (axis == 'x') {
//                    this.sketchLine('' + this.xIndex, 'x');//显示靶区勾画线
                } else if (axis == 'y') {
//                    this.sketchLine('' + this.yIndex, 'y');//显示靶区勾画线
                }

            },

            ctImage(cornerstone_dose,data,axis){
                var index=0;
                var width = 0;
                var height = 0;
                var zIndex=this.zIndex;
                var xIndex=this.xIndex;
                var yIndex=this.yIndex;
                var columnPixelSpacing;
                var rowPixelSpacing;
                var sliceThickness=3;
                var Vue=this;
                var intercept=this.imageParams.intercept;//获取动态截距
                var slope=this.imageParams.slope;
                function getExampleImage(imageId) {
                    //渲染前的所在轴位判断
                    if(Vue.axisG == ""){
                        if(axis=="z" || axis=="zModal"){
                            index=zIndex
                            width = Vue.imageParams.width;
                            height = Vue.imageParams.height;
                            columnPixelSpacing=Vue.imageParams.columnPixelSpacing;
                            rowPixelSpacing=Vue.imageParams.rowPixelSpacing;
                        }
                        if(axis=="x"){
                            index=xIndex;
                            width = Vue.imageParams.width;
                            height = Vue.imageParams.fileNum;
                            columnPixelSpacing= Vue.imageParams.columnPixelSpacing;
                            rowPixelSpacing=sliceThickness;
                        }
                        if(axis=="y"){
                            index=yIndex;
                            width = Vue.imageParams.width;
                            height = Vue.imageParams.fileNum;
                            columnPixelSpacing= Vue.imageParams.columnPixelSpacing;
                            rowPixelSpacing=sliceThickness;
                        }
                    }
                    else{
                        if(Vue.axisG=="z" || Vue.axisG=="zModal"){
                            index=zIndex
                            width = Vue.imageParams.width;
                            height = Vue.imageParams.height;
                            columnPixelSpacing=Vue.imageParams.columnPixelSpacing;
                            rowPixelSpacing=Vue.imageParams.rowPixelSpacing;
                        }
                        if(Vue.axisG=="x"){
                            index=xIndex;
                            width = Vue.imageParams.width;
                            height = Vue.imageParams.fileNum;
                            columnPixelSpacing=Vue.imageParams.columnPixelSpacing;
                            rowPixelSpacing=sliceThickness;
                        }
                        if(Vue.axisG=="y"){
                            index=yIndex;
                            width = Vue.imageParams.width;
                            height = Vue.imageParams.fileNum;
                            columnPixelSpacing=Vue.imageParams.columnPixelSpacing;
                            rowPixelSpacing=sliceThickness;
                        }
                    }

                    function getPixelData(){
                        if(Vue.flag == 1){
                            return Vue.data_tmp;
                        } else {
                            return data;
                        }
                        Vue.data_tmp.length=0;
                    }

                    var image = {
                        imageId: imageId,
                        minPixelValue : 0,//最小像素值
                        maxPixelValue : 4096,//最大像素值
                        slope: slope,//斜率
                        intercept : intercept,//截距
                        windowCenter : 250,//窗位
                        windowWidth : 1000,//窗宽
                        render: cornerstone_dose.renderGrayscaleImage,//渲染灰度图像
                        getPixelData: getPixelData,//返回像素数组
                        rows: height,//行
                        columns: width,//列
                        height: height,//高
                        width: width,//宽
                        color: false,//是否单色
                        columnPixelSpacing: columnPixelSpacing,//像素之间的纵向间隔
                        rowPixelSpacing:rowPixelSpacing,//像素之间的横向间隔
                        sizeInBytes: width * height * 2//字节大小
                    };
                    var deferred = $.Deferred();
                    deferred.resolve(image);
                    return deferred;
                }
                cornerstone_dose.registerImageLoader('ctexample', getExampleImage);

            },
            approve() {
                this.$validator.validateAll().then(success => {
                    if (!success) return;
                    Planning.approve(this.planning).then(response => {
                        showResponse(response, () => this.$router.back())
                    })
                })
            },
            notapprove() {

                swal({
                    title: "评估不通过原因",
                    text: "输入评估不通过原因",
                    type: "input",
                    showCancelButton: true,
                    closeOnConfirm: false,
                    confirmButtonText: "确认",
                    cancelButtonText: "取消",
                    animation: "slide-from-top",
                    inputPlaceholder: "输入评估不通过原因"
                }, inputValue => {
                    if (inputValue === false || inputValue === "") {
                        return false;
                    } else {
                        this.planning.approveReason = inputValue;
                        Planning.notapprove(this.planning).then(response => {
                            showResponse(response, () => this.$router.back())
                            this.$emit('stop')
                        })
                    }

                })

            },
            docapprove() {
                this.$validator.validateAll().then(success => {
                    if (!success) return;
                    Planning.docapprove(this.planning).then(response => {
                        showResponse(response, () => this.$router.back())
                    })
                })
            },
            docnotapprove() {
                swal({
                    title: "评估不通过原因",
                    text: "输入评估不通过原因",
                    type: "input",
                    showCancelButton: true,
                    closeOnConfirm: false,
                    confirmButtonText: "确认",
                    cancelButtonText: "取消",
                    animation: "slide-from-top",
                    inputPlaceholder: "输入评估不通过原因"
                }, inputValue => {
                    if (inputValue === false || inputValue === "") {
                        return false;
                    } else {
                        this.planning.docApproveReason = inputValue;
                        Planning.docNotApprove(this.planning).then(response => {
                            showResponse(response, () => this.$router.back())
                            this.$emit('stop')
                        })
                    }

                })
            },
            verify() {
                this.$validator.validateAll().then(success => {
                    if (!success) return;
                    Planning.verify(this.planning).then(response => {
                        showResponse(response, () => this.$router.back())
                    })
                })
            },
            notverify() {
                swal({
                    title: "验证不通过原因",
                    text: "输入验证不通过原因",
                    type: "input",
                    showCancelButton: true,
                    closeOnConfirm: false,
                    confirmButtonText: "确认",
                    cancelButtonText: "取消",
                    animation: "slide-from-top",
                    inputPlaceholder: "输入验证不通过原因"
                }, inputValue => {
                    if (inputValue === false || inputValue === "") {
                        return false;
                    } else {
                        this.planning.verifyReason = inputValue;
                        Planning.notverify(this.planning).then(response => {
                            showResponse(response, () => this.$router.back())
                            this.$emit('stop')
                        })
                    }

                })

            },

        },

    }
</script>
<style>
    .row h4 {
        text-align: center;
    }
    #diagram{
        width:100%;
        height:330px;
        background: #000;
    }
    .colorLine{
        width:30px;
        height:15px;
        display: inline-block;
        vertical-align: middle;
    }
    .DVH_stat .table thead tr th{
        text-align:center;
    }
    .modifyTableStyle .table{
        margin-bottom:0;
    }
    .modifyTableStyle .table td,.modifyTableStyle .table th {
        padding: 5px;
    }
    span.fa-arrows-alt{
        content: "\F0B2";
        right: 20px;
        top:5px;
        position: absolute;
        z-index:22;
    }

    .evaluePadding{
        padding:10px 0;
    }

    canvas#sketchLine, canvas#sketchLineX, canvas#sketchLineY {
        position: absolute;
        /*top:50%;*/
        /*margin-top:-100px;*/
        /*left:50%;*/
        /*margin-left:-100px;*/
        z-index:999;
    }
    /*进度条展示*/
    .dose-mask{
        position:absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background:rgba(255,255,255,0.5);
        z-index:99;
    }
    .dose-progress-tip {
        position: absolute;
        width: 200px;
        height: 10px;
        border: 1px solid #fff;
        border-radius: 5px;
        z-index: 999;
        top: 50%;
        margin-top: -5px;
        left: 50%;
        margin-left: -300px;
        text-align: center;
    }
    .dose-progress-tip div.text-center{
        position: absolute;
        top:-22px;
        width:100%;
        color:#fff;
        font-size:12px;
    }
    .dose-progress-tip div.text-center i{
        background:#666;
        font-style:normal;
        padding:5px;
    }
    .dose-progress-tip .dose-progressing {
        background: green;
        width: 0;
        height: 8px;
        border-radius: 4px;
    }

    .dose-progress-tip span {
        color: green;
        font-size: 14px;
        line-height: 20px;
    }
    #colorInfo,#colorInfo2,#colorInfo3{
        position:absolute;
        right:20px;
        top:50%;
        margin-top:-70px;
        color:#999;
    }
    #canvas000,#canvas111,#canvas222{
        z-index:9990
    }
</style>
