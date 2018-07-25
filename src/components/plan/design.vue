<template>
    <div>
        <div class="buye">
            <h2 style="position:relative;">布野<div id="test" style="width:1in;height:1in;position:absolute;top:0;left:100px;background:red;opacity: 0;"></div></h2>
            <div class="row">
                <div class="col-md-3">
                    <div class="controlArea">
                        <!--感兴趣点-->
                        <div class="conArea1">
                            <span class="area1Tit">感兴趣点</span>
                            <p class="dotAdd">
                                <input type="text" class="form-control pull-left addDot" id="addDot"  v-model="poi.name"/>
                                <input type="button" class="btn btn-info pull-left addDotBtn" id="addDotBtn" value="添加" @click="addPoi"/>
                            </p>
                            <p class="dotDel">
                                <select class="form-control pull-left delDot" id="delDot" @change="showPortal">
                                    <option value="-1">请选择</option>
                                </select>
                                <input type="button" value="删除" class="btn btn-info pull-left" @click="deletePoi"/>
                            </p>
                            <p class="setDot">
                                <select class="form-control setDotParams" @change="setShowPoi">
                                    <option value="-1">请选择设置</option>
                                    <option value="0">POI</option>
                                </select>
                            </p>
                        </div>
                        <!---射野-->
                        <div class="conArea2">
                            <span class="area2Tit">射野</span>
                            <!--<p class="dotAdd">-->
                                <!--<input type="text" class="form-control pull-left addDot" id="addPortal"/>-->

                            <!--</p>-->
                            <div class="dotDel">
                                <select class="form-control delDot" id="delField" ref="delField" @change="getPortalId">
                                    <option value="-1">请选择</option>
                                </select>
                                <p class="clearfix text-center">
                                  <input type="button" class="btn btn-info pull-left addDotBtn" id="addPortalBtn" value="添加" @click="addPortal" style="margin-right:10px;"/>
                                  <input type="button" value="删除" class="btn btn-info pull-left"  @click="delPortal"/>
                                </p>
                            </div>
                            <p class="setDot">
                                <select class="form-control setDotParams" disabled="disabled" id="setParams" @change="setShowYe">
                                    <option value="-1">请选择设置</option>
                                    <option value="1">性能参数</option>
                                    <option value="2">几何参数</option>
                                    <option value="3">铅门参数</option>
                                    <option value="4">调制器</option>
                                </select>
                            </p>
                        </div>
                        <div class="text-center" style="padding:10px 0;">
                            <!--<button class="btn btn-info btn-sm" @click="savePoi">保存</button>-->
                        </div>
                    </div>
                </div>
                <div class="col-md-9">
                    <div class="imageArea">
                        <div class="myAction">
                            <button class="btn btn-info btn-sm" id="moving" data-toggle="tooltip" data-placement="top" data-animation="false" title="请点击放大后操作" @click="startGoing(2)">平移</button>
                            <!--<button class="btn btn-info btn-sm">翻转</button>-->
                            <button class="btn btn-info btn-sm" id="scaling" data-toggle="tooltip" data-placement="top" data-animation="false" title="请点击放大后操作" @click="startGoing(3)">缩放</button>
                            <button class="btn btn-info btn-sm" id="winding" @click="startGoing(1)">窗宽窗位</button>
                            <button class="btn btn-info btn-sm" id="lung">肺窗</button>
                            <button class="btn btn-info btn-sm" id="bone">骨窗</button>
                            <button class="btn btn-info btn-sm" id="softTissue">软组织窗</button>
                        </div>
                        <div class="imageBox" id="imageBox">
                            <!--进度条-->
                            <div class="design-progress-tip">
                                <div class="text-center"><i>正在加载数据中...</i></div>
                                <div class="design-progressing"></div>
                                <span></span>
                            </div>
                            <!--黑色背景-->
                            <div class="bgLayer">
                               <a href="javascript:void(0)" class="backToSmall" @click="toSmall">&lt;back</a>
                            </div>
                            <!--每個图像区域-->
                            <div class="image1 commonStyle">
                                <i class="fa fa-arrows-alt bigger" @click="toBigger"></i>
                                <div class="canvasBox">
                                    <div id="dicomImagePlanZ" style="width:500px;height:500px;position:relative;">
                                        <canvas id="drawPoiZ" width="500" height="500" @click="showPoint" @mousemove="showCursorLine"></canvas>
                                        <div id="cursorX"></div>
                                        <div id="cursorY"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="image2 commonStyle">
                                <i class="fa fa-arrows-alt bigger" @click="toBigger"></i>
                                <div class="canvasBox">
                                    <div id="dicomImagePlanX"></div>
                                </div>
                            </div>
                            <div class="image3 commonStyle">
                                <i class="fa fa-arrows-alt bigger" @click="toBigger"></i>
                                <div class="canvasBox">
                                    <div  id="dicomImagePlanY"></div>
                                </div>
                            </div>
                            <div class="image4 commonStyle">
                                <i class="fa fa-arrows-alt bigger"></i>
                            </div>
                            <div class="image5 commonStyle">
                                <i class="fa fa-arrows-alt bigger"></i>
                            </div>
                            <div class="image6 commonStyle">
                                <i class="fa fa-arrows-alt bigger"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--编辑处方-->
            <div class="recipeTable">
                <h4 style="font-size:18px;margin-bottom: 10px;">射野列表
                    <select class="form-control" id="poiList" style="width:150px;display: inline-block;margin-left:50px;" @change="showPortalList">
                        <option value="-1">请选择Poi</option>
                    </select>
                </h4>
                <table class="table" id="portalTable" width="100%">
                    <thead>
                    <tr>
                        <th>名称</th>
                        <th>处方</th>
                        <th>机架角度</th>
                        <th>床角</th>
                        <th>准直器角度</th>
                        <th>有无楔形板</th>
                        <th>楔形板角度</th>
                        <th>射野权重</th>
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
                <div>

                    <button type="button" class="btn btn-secondary btn-info borderRright pull-left" @click="calculationDose">计算剂量</button>
                    <div class="dropup specialLeft">
                        <button type="button" class="btn btn-secondary btn-info dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">编辑权重</button>
                        <div class="dropdown-menu" data-stopPropagation="true">
                            <table class="table" id="weightTable">
                                   <thead>
                                      <tr>
                                          <th style="white-space: nowrap;">名称</th>
                                          <th style="white-space: nowrap;">处方</th>
                                          <th>权重%</th>
                                      </tr>
                                   </thead>
                                   <tbody>
                                      <tr>
                                          <td>1</td>
                                          <td>2</td>
                                          <td><input type="text" class="form-control" style="width:80px;"/></td>
                                      </tr>
                                   </tbody>
                            </table>
                            <button class="btn btn-info btn-sm pull-right" style="margin-right:10px;" @click="confirmWeight">确认</button>
                            <button class="btn btn-info btn-sm pull-left" id="averageWeight" style="margin-left:10px;" disabled="disabled" @click="averageWeight">等分权重</button>
                        </div>
                    </div>
                    <div class="dropup specialLeft">
                      <button type="button" class="btn btn-secondary btn-info borderRright pull-left dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">编辑处方</button>
                      <div class="dropdown-menu recipyArea" data-stopPropagation="true" style="width:280px;padding:10px;">
                          <edit-prescription v-if="showOrHideFlag" @childMethod="confirmRecipy"></edit-prescription>
                          <!--<div class="row noMargin">-->
                              <!--<div class="col-md-3 text-right">处方名称</div>-->
                              <!--<div class="col-md-9">-->
                                <!--<input v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('recipyname') }" name="recipyname" type="text" class="form-control" id="recipyName" placeholder="请输入名称"/>-->
                                <!--<span v-show="errors.has('recipyname')" class="help is-danger">{{ errors.first('recipyname') }}</span>-->
                              <!--</div>-->
                          <!--</div>-->
                          <!--<div class="row noMargin">-->
                            <!--<div class="col-md-3 text-right">单次剂量</div>-->
                            <!--<div class="col-md-9">-->
                              <!--<input v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('singledose') }" type="number" class="form-control" id="singleDose" name="singledose" placeholder="请输入一个数字"/>-->
                              <!--<span v-show="errors.has('singledose')" class="help is-danger">{{ errors.first('singledose') }}</span>-->
                            <!--</div>-->
                          <!--</div>-->
                          <!--<div class="row noMargin">-->
                            <!--<div class="col-md-3 text-right">预期目标</div>-->
                            <!--<div class="col-md-9">-->
                              <!--<input v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('expecttarget') }" name="expecttarget" type="number" class="form-control" id="guessTarget" placeholder="请输入一个数字"/>-->
                              <!--<span v-show="errors.has('expecttarget')" class="help is-danger">{{ errors.first('expecttarget') }}</span>-->
                            <!--</div>-->
                          <!--</div>-->
                          <!--<div class="row noMargin">-->
                            <!--<div class="col-md-3 text-right">总剂量</div>-->
                            <!--<div class="col-md-9">-->
                              <!--<input v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('alldose') }" type="number" class="form-control" name="alldose" id="allDose" placeholder="请输入一个数字"/>-->
                              <!--<span v-show="errors.has('alldose')" class="help is-danger">{{ errors.first('alldose') }}</span>-->
                            <!--</div>-->
                          <!--</div>-->

                          <!--<button class="btn btn-info btn-sm pull-right" style="margin-right:10px;" :disabled="errors.any()" @click="confirmRecipy">保存</button>-->
                      </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal -->
        <div class="modal fade" id="myModalSet" tabindex="-1" role="dialog" data-backdrop="static" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header" style="background:#1E9FFF;color:#fff;padding:0 15px;">
                        <h4 class="modal-title" id="myModalLabel">{{popTit}}</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="backPos"><span aria-hidden="true">&times;</span></button>
                    </div>
                    <div class="modal-body">
                        <div v-if="this.$store.state.mySelectVal==0">
                            <!--poi参数-->
                            <poi-set :poiNumAbs="poiNumAbs" :drawScale="drawScale" :poiColor="poiColor" :curPoiR="curPoiR" :poiMaxR="poiMaxR" @passPoiMessage="passPoiMessage"></poi-set>
                        </div>
                        <div v-if="this.$store.state.mySelectVal==1">
                            <!--性能参数-->
                            <charac-ter :portalId="portalId" :poiId="portal.poiId" :planningId="planningId"></charac-ter>
                        </div>
                        <div v-if="this.$store.state.mySelectVal==2">
                            <!--几何参数-->
                            <geome-try :portalId="portalId"></geome-try>
                        </div>
                        <div v-if="this.$store.state.mySelectVal==3">
                            <!--铅门参数-->
                            <lead-door :portalId="portalId" :zIndex="zIndex"></lead-door>
                        </div>
                        <div v-if="this.$store.state.mySelectVal==4">
                            <!--调制器-->
                            <key-er :portalId="portalId"></key-er>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    var cornerstone_plan = require("./../../../static/js/cornerstone_plan.js")
    import{Download,poi,Portal,User,Plan } from '../../resources'
    import poiSet from './designPop/poiSet.vue'
    import characTer from './designPop/character.vue'
    import geomeTry from './designPop/geometry.vue'
    import leadDoor from './designPop/leadDoor.vue'
    import keyEr from './designPop/keyer.vue'
    import swal from 'sweetalert';
    import editPrescription from './designPop/editPrescription.vue';
    export default {
        props:["imageId","imageParams","fileLength","planningId","myPlanId"],
        data(){
            return {
                message:'hello world',
                myDB_plan:{
                    'name':'CTImage',
                    'version':1,
                    'db':null
                },
                zLen:0,
                xLen:0,
                yLen:0,
                zIndex:0,
                xIndex:0,
                yIndex:0,
                haveCanvasFlag:false,
                zImageIds:[],
                xImageIds:[],
                yImageIds:[],
                data_tmp:[],
                axisG:'',
                popTit:'',
                moveFlag:1,
                curIndex:0,
                scaleSize:0,
                portal:{
                    poiId:0
                },
                poi:{
                   planningId:'',
                   sliceIndex:39
                },
                poiPosition:39,//poi中心点所处层位置
                poiRx:250,//poi球心x坐标
                poiRy:250,//poi球心y坐标
                poiR:50,//poi球心直径mm
                numIndex:0,//poi球穿过的层数
                poiColor:'rgb(232,145,5)',//poi球园颜色
                poiNumAbs:0,//Poi的第多少层
                upIndex:0,//poi贯穿的起始层
                downIndex:0,//poi贯穿的结束层
                poiMaxR:0,//Poi最大直径
                clickLayer:0,//poi初次绘制时的层级
                drawScale:0,//poi初次绘制时的缩放比例
                poiParams:{
                    planningId:0,
                    poiData:[]
                },//点击保存后要传到后台的poi对象
                poiLists:[],//存儲从后台返回的poi数据及新增的poi数据
                curPoiR:0,//当前选中的poi名称的直径
/////////////射野模块变量
                portalId:'',//照射野ID
                calculationDoseContents:[],//计算剂量所需数组
                showOrHideFlag:true,//判断编辑处方内容是否存在
            }
        },
        mounted(){
            ////计算生成图的宽高大小及比例和显示结果的关系：
            console.log('imageParams------',this.imageParams)
            var WHbili=(this.imageParams.width*this.imageParams.rowPixelSpacing)/(this.imageParams.fileNum*this.imageParams.sliceThickness);
            if(WHbili>1){
                var rightDicomWidth=500;
                var rightDicomHeight=parseInt(500/WHbili);

            }else{
                var rightDicomWidth=parseInt(500/WHbili)
                var rightDicomHeight=500
            }
            console.log('rightDicomWidth---',rightDicomWidth,'rightDicomHeight-------',rightDicomHeight)
            $('#dicomImagePlanX,#dicomImagePlanY').css({
                "width":rightDicomWidth+'px',
                "height":rightDicomHeight+'px'
            });
            this.createIndexedDB();
            $('[data-toggle="tooltip"]').tooltip();//工具栏提示

//            var screenW=window.screen.availWidth;
//            var screenH=window.screen.availHeight;
//
//            var screenInchW=screenW/96;//计算出屏幕宽度是多少英寸
//            var screenInchH=screenH/96;//计算出屏幕高度是多少英寸
//
//            var mmW=screenInchW*25.4;//计算出宽度上是多少毫米
//            var mmH=screenInchH*25.4;//计算出高度上是多少毫米
//
//            var pxW=screenW/mmW+'px';//计算出横向是每毫米是多少像素
//            var pxH=screenH/mmW+'px';//计算出纵向是每毫米是多少像素
            //或者pxW也可以直接这样算如下：
//            var pxW1=Math.round($('#test').width()/25.4)+'px';//每毫米占多少像素
//            var pxH1=Math.round($('#test').height()/25.4)+'px';//每毫米占多少像素

            //根据poi的位置判断poi的最大直径限制
//            if(this.poiPosition>=0 && this.poiPosition<this.imageParams.fileNum/2) {
//                this.poiMaxR = Math.floor((2*this.poiPosition+1) * this.imageParams.sliceThickness);//poi的最大直径限制
//            }else if(this.poiPosition==this.imageParams.fileNum/2){
//                this.poiMaxR=Math.floor((2*this.poiPosition)*this.imageParams.sliceThickness);//poi的最大直径限制
//            }else{
//                this.poiMaxR=Math.floor((2*(this.imageParams.fileNum-this.poiPosition)+1) * this.imageParams.sliceThickness);//poi的最大直径限制
//            }
//            this.computePosAndSize(this.poiMaxR,true,this.poiColor);//初始化计算出来感兴趣球的大小和位置
            this.showPoiList();//初始化展示之前添加的poi
            this.poiParams.planningId=this.planningId;
            this.$nextTick(function () {

                $('.dropdown-toggle').dropdown();//编辑权重下拉
                $('.dropdown-menu .table,#averageWeight,.recipyArea').on('click',function (e) {
                    e.stopPropagation();
                })
            })
        },
        destroyed(){
            this.myDB_plan.db.close();
        },
        methods: {
            calculationDose(){
              var poiId=$('#poiList').find('option:selected').val();
              if(poiId==-1){
                layer.msg('请先选择poi')
                return false;
              }else {
                Plan.getInfo(this.myPlanId).then(res => {
                  console.log('res-----plan.getInfo----', res);
                  var paramsCalculationDose = {};
                  paramsCalculationDose.hospitalName = res.data.hospitalAlia;
                  paramsCalculationDose.patientId = res.data.patientId;
                  paramsCalculationDose.portals = JSON.stringify(this.calculationDoseContents);
                  //计算剂量
                  console.log('paramsCalculationDose----', paramsCalculationDose)
                  Portal.calculationDose(paramsCalculationDose).then(res => {
                    console.log('res-----calculationDose-----', res);
                  })
                })
              }
            },
            confirmRecipy(){
              //保存处方
              var poiId=$('#poiList').find('option:selected').val();
              if(poiId=='-1'){
                $(document).click();
                return false;
              }else {
//                var recipyName=$.trim($('#recipyName').val());
//                var singleDose=$.trim($('#singleDose').val());
//                var guessTarget=$.trim($('#guessTarget').val());
//                var allDose=$.trim($('#allDose').val());
//                if(recipyName=='' || singleDose=='' || guessTarget=='' || allDose==''){
//                  layer.msg('所有输入框都不能为空');
//                  return false;
//                }

                var paramsRecipy = {};
                paramsRecipy.id=$('#poiList').find('option:selected').attr('prescriptionId')?$('#poiList').find('option:selected').attr('prescriptionId'):'';
                paramsRecipy.poiId = $('#poiList').find('option:selected').val();
                paramsRecipy.roiId = '';
                paramsRecipy.name = $.trim($('#recipyName').find('input').val());
                paramsRecipy.singleDose = $.trim($('#singleDose').find('input').val());
                paramsRecipy.result = $.trim($('#expectTarget').find('input').val());
                paramsRecipy.times = $.trim($('#allDose').find('input').val())
                paramsRecipy.creatUser=User.current().id;

                Portal.saveRecipy(paramsRecipy).then(res => {
                    console.log('res-saveRecipy----------',res);
                    if(res.data.msg=='success'){
                      layer.msg('编辑成功');
                      $('#poiList').find('option:selected').attr('prescriptionid',res.data.data.id);
                      for(var i=0;i<$('.recipeTable table#portalTable tbody tr').length;i++){
                        $('.recipeTable table#portalTable tbody tr').eq(i).find('td').eq(1).html(paramsRecipy.name);
                      }
                    }else{
                      layer.msg('编辑失败');
                    }
                })
                $(document).click();
              }

            },
            averageWeight(){
                var trLen=$('#weightTable tbody').find('tr').length-1;
                var singleVal=Math.round((100/trLen)*100)/100;
                $('#weightTable tbody tr').find('input').val(singleVal);
            },
            confirmWeight(){
                var allWeight=0;
                for(var i=1;i<$('#weightTable tbody tr').length;i++){
                   var inputVal = $('#weightTable tbody tr').eq(i).find('input').val();
                    allWeight+=inputVal*1;
                }
                if(Math.round(allWeight)!=100){
                    layer.msg('各个射野权重之和必须是100!');
                    return false;
                }else if($('#poiList').find('option:selected').val()==-1){
                    layer.msg('请先选择poi');
                   return false;
                }else{
                    var arrPortal=[];
                    for(var i=1;i<$('#weightTable tbody tr').length;i++){
                        var inputVal = $('#weightTable tbody tr').eq(i).find('input').val();
                        var inputId=$('#weightTable tbody tr').eq(i).find('input').attr('id');
                        var inputDose=$('#weightTable tbody tr').eq(i).find('input').attr('dir');
                        $('#portalTable tbody tr').eq(i).find('td:last-child').text(inputVal);
                        var obj={};
                        obj.id=inputId;
                        obj.portalDose=inputDose*inputVal/100;
                        obj.weight=inputVal;
                        arrPortal.push(obj);
                    }
                    var paramsPortalStr=JSON.stringify(arrPortal);
                    var paramsPortalWeight={portals:paramsPortalStr};
                    console.log('arrPortal------------',paramsPortalWeight);
                    Portal.confirmPortalWeight(paramsPortalWeight).then(res=>{
                        console.log('confirmWeight------------',res);
                        if(res.data.msg=='success'){
                            layer.msg('编辑权重成功！')
                        }
                    })




                }
            },
            showPortalList(){
              var poiId=$('#poiList').find('option:selected').val();
              var that=this;
              if(poiId==-1){
                  $('.recipeTable table#portalTable tbody').find('tr:first-child').nextAll('tr').remove();
                  $('.recipeTable table#weightTable tbody').find('tr:first-child').nextAll('tr').remove();
                  $('#averageWeight').attr('disabled','disabled');
              }else{
                  that.showOrHideFlag=false;
                  that.calculationDoseContents=[];
                  $('#averageWeight').removeAttr('disabled');
                  Portal.getPortalList(poiId).then(res=>{
                      console.log('res------portaliLIST--------',res);
                      var resData=res.data.data.portals.portalList;
                      $('.recipeTable table#portalTable tbody').find('tr:first-child').nextAll('tr').remove();
                      $('.recipeTable table#weightTable tbody').find('tr:first-child').nextAll('tr').remove();
                      resData.forEach(function (item,index) {
                          var firstTr=$('.recipeTable table#portalTable tbody').find('tr:first-child').clone().show();
                          var portalsforCalculationDose={};
                          var energy=res.data.data.portals.energy[index]?res.data.data.portals.energy[index].name:'';
                          portalsforCalculationDose.energy=energy;
                          firstTr.find('td').each(function(i,single){//射野列表
                            var ssd=item.ssd?item.ssd+'':'';
                            var sad=item.sad?item.sad+'':'';
                            var doseRate=item.doseRate?item.doseRate+'':'';
                            portalsforCalculationDose.ssd=ssd;
                            portalsforCalculationDose.sad=sad;
                            portalsforCalculationDose.doseRate=doseRate;
                              switch (i) {
                                  case 0:
                                      $(this).html(index+1);
                                      break;
                                  case 1:
                                      var prescription=res.data.data.prescription==null?'':res.data.data.prescription.name;
                                      $(this).html(prescription);
                                      break;
                                  case 2:
                                      var gantry=item.gantry==null?'':item.gantry+'';
                                      portalsforCalculationDose.gantry=gantry;
                                      $(this).html(gantry);
                                      break;
                                  case 3:
                                      var bed=item.bed==null?'':item.bed+'';
                                      portalsforCalculationDose.bed=bed;
                                      $(this).html(bed);
                                      break;
                                  case 4:
                                      var collimator=item.collimator==null?'':item.collimator+'';
                                      portalsforCalculationDose.collimator=collimator;
                                      $(this).html(collimator );
                                      break;
                                  case 5:
                                      var wedgePlateHaveOrNot=res.data.data.portals.wedgePlate && res.data.data.portals.wedgePlate.angle?'有':'无';
//                                      console.log('res.data.data------------------------',res.data.data);
                                      $(this).html(wedgePlateHaveOrNot);
                                      break;
                                  case 6:
                                      var angle=res.data.data.portals.wedgePlate && res.data.data.portals.wedgePlate.angle>=0?res.data.data.portals.wedgePlate.angle:'';
                                      $(this).html(angle);
                                      break;
                                  case 7:
                                      var weight=item.weight?item.weight:'';
                                      $(this).html(weight);
                                      break;
                              }
                          });
                          var weightTr=$('#weightTable tbody').find('tr:first-child').clone().show();
                          weightTr.find('td').each(function (w,col) {//权重列表
                              switch (w){
                                  case 0:
                                      $(this).html(index+1);
                                      break;
                                  case 1:
                                      var prescription=res.data.data.prescription==null?'':res.data.data.prescription.name;
                                      $(this).html(prescription);
                                      break;
                                  case 2:
                                      var weight=item.weight?item.weight:'';
                                      var dose=item.dose?item.dose:'';
                                      $(this).find('input').val(weight).attr('dir',dose).attr('id',item.id);
                                      break;
                              }
                          })
                          $('.recipeTable table#portalTable tbody').append(firstTr);
                          $('.recipeTable table#weightTable tbody').append(weightTr);
                          that.calculationDoseContents.push(portalsforCalculationDose);
                      })
                      $('.recipeTable table#portalTable tbody').find('tr:first-child').hide();
                      $('.recipeTable table#weightTable tbody').find('tr:first-child').hide();
                  })
                //回显编辑处方
                var prescriptionId=$('#poiList').find('option:selected').attr('prescriptionid')?$('#poiList').find('option:selected').attr('prescriptionid'):'';
                Portal.backfillRecipy(prescriptionId).then(res=>{
                  console.log('res-----backfillRecipy-----',res);
                  that.showOrHideFlag=true;
                  setTimeout(function () {
                    if(!res.data.data){
                      $('#recipyName input').val('');
                      $('#singleDose input').val('');
                      $('#expectTarget input').val('');
                      $('#allDose input').val('');
                      return ;
                    }else{
                      $('#recipyName input').val(res.data.data.name);
                      $('#singleDose input').val(res.data.data.singleDose);
                      $('#expectTarget input').val(res.data.data.result);
                      $('#allDose input').val(res.data.data.times);
                    }
                  },1)

                })
              }
            },
            getPortalId(e){
                var portalId=$('select#delField').find('option:selected').val();
                if(portalId!=-1){
                    this.portalId=portalId;
                    $('#setParams').removeAttr('disabled');
                }else{
                    this.portalId='';
                    $('#setParams').attr('disabled','disabled');
                }

            },
            showPortal(){
                var thisPoiId=$('select#delDot').find('option:selected').val();
                this.portal.poiId=thisPoiId;
                this.portal.planningId=this.planningId;
                if(thisPoiId==-1){
                    $('select#delField').html('<option value="-1">请选择</option>');
                    return;
                }else{
                    $('select#delField').html('<option value="-1">请选择</option>');
                    Portal.getByPoi(thisPoiId).then(res=>{
                        console.log('portal-----------',res);
                        if(res.data.data) {
                            var firstOption = $('select#delField').find('option').eq(0);
                            for (var i = 0; i < res.data.data.portals.length; i++) {
                                $('select#delField').append('<option value="' + res.data.data.portals[i].id + '">' + (i + 1) + '</option>');
                            }
                        }
                    })
                }
            },
            addPortal(){
                var dotInput=$('.dotDel select#delField').find('option').length-1;
                var existedFlag=false;
                var poiSelected=$('select#delDot').find('option:selected').val();
                if(poiSelected==-1){
                    layer.msg('请选择该射野的感兴趣点名称');
                    return ;
                }
                console.log(poiSelected);
//                this.portal.poiId=poiSelected;
              if(dotInput>=7){
                layer.msg('每个感兴趣点最多可添加7个射野！')
                return ;
              }else {
                this.portal.planningId = this.planningId;
                $('#addPortalBtn').attr('disabled', 'disabled');
                Portal.save(this.portal).then(res => {
                  console.log('ressssssssssssssss', res);
                  layer.msg('射野添加成功！')
                  var firstOption = $('.dotDel select#delField').find('option').eq(0);
                  $('.dotDel select#delField').append('<option value="' + res.data.data + '">' + (++dotInput) + '</option>');
                  $('#addPortalBtn').removeAttr('disabled');
                });
              }
            },
            delPortal(){
                var thisPoiId=$('select#delDot').find('option:selected').val();
                var portalId=$('.dotDel select#delField').find('option:selected').val();
                var delSelect=$('.dotDel select#delField').find('option:selected').text();
                if(portalId=='-1'){
                    layer.msg('请选择要删除的射野序号');
                    return ;
                }else {
                    swal({
                            type: 'warning',
                            title: '确定要删除吗?',
                            text: '点击确认后可执行彻底删除',
                            showCancelButton: true,
                            cancelButtonText: '取消',
                            confirmButtonText: '确认',
                            confirmButtonColor: '#DD6B55',
                            showLoaderOnConfirm: true,
                            closeOnConfirm: false
                        }, confirmed => {
                            if (confirmed) {
                                Portal.delete(portalId).then(res => {
                                    if (res.data.msg == 'success') {
                                        swal({
                                            type: 'success',
                                            title: '删除成功'
                                        })
                                        //先删除poi名称列表中的这个值
                                        $('select#delField').html('<option value="-1">请选择</option>');
                                        Portal.getByPoi(thisPoiId).then(res=>{
                                            console.log('portal-----------',res);
                                            var firstOption=$('select#delField').find('option').eq(0);
                                            if(res.data.data) {
                                                for (var i = 0; i < res.data.data.portals.length; i++) {
                                                    $('select#delField').append('<option value="' + res.data.data.portals[i].id + '">' + (i + 1) + '</option>');
                                                }
                                            }
                                        })
                                        $('#setParams').attr('disabled','disabled');
                                    }
                                })
                            }
                        }
                    )}
            },
            showCursorLine(e){
                var x = this.getCanvasPos(drawPoiZ,e).x;
                var y = this.getCanvasPos(drawPoiZ,e).y;
                var nowScale=parseFloat((this.scaleSize / 100).toFixed(2));
                var finish=$('#delDot').find('option:selected').attr('finish');
                if(finish){
                    cursorX.style.display='none';///隐藏红色标尺线
                    cursorY.style.display='none';
                }else{
                    cursorX.style.display='block';//展示红色标尺线
                    cursorY.style.display='block';
                }
                if($('.canvasBox').eq(0).attr('biggerMoveFlag')) {//如果canvasBox被放大了，且放大了nowScale倍
                    cursorX.style.top = y / (1 + nowScale) + 'px';
                    cursorY.style.left = x / (1 + nowScale) + 'px';
                }else{///默认状态下canvasBox的缩放比例缩小了0.5倍
                    cursorX.style.top = y /(1-0.5)+ 'px';
                    cursorY.style.left = x / (1-0.5) + 'px';
                }
            },
            showPoint(e){
                var x = this.getCanvasPos(drawPoiZ,e).x;
                var y = this.getCanvasPos(drawPoiZ,e).y;
                console.log(x,y);
                var selectedDot=$('#delDot').find('option:selected').val();
                var dotName=$('#delDot').find('option:selected').text();
                var finish=$('#delDot').find('option:selected').attr('finish');
                var biggerMoveFlag=$('.canvasBox').eq(0).attr('biggerMoveFlag')
                if(biggerMoveFlag) {
                    if(this.moveFlag==1) {
                        if (selectedDot == '-1') {
                            layer.msg('请先选择poi名称再点击该点');
                            return false;
                        } else if (finish) {
                            layer.msg('该名称的感兴趣点已绘制过啦');
                            return false;
                        } else {
                            var curpos = this.zIndex;
                            var thisPoiData={};
                            var existedPoiFlag=0;
                            this.poiRx = x;
                            this.poiRy = y;
                            var nowScale = parseFloat((this.scaleSize / 100).toFixed(2));
                            this.drawScale = nowScale;
                            this.computePosAndSize(curpos);//设置绘制感兴趣球直径大小
                            this.clickLayer = this.zIndex;
                            let thisPosZ=this.imageParams.volumeOri[0]+this.zIndex*3;
                            thisPoiData.id=selectedDot;
                            for(var i=0;i<this.poiLists.length;i++){
                                if(selectedDot==this.poiLists[i].id && this.poiLists[i].position){
                                    existedPoiFlag=1;//判断是否已存在同名ID 1.存在且有所有值
//                                    alert(1);
                                    continue;
                                }else if(selectedDot==this.poiLists[i].id && !this.poiLists[i].position){
//                                    alert(2)
                                    existedPoiFlag=2;///2.存在且值不全
                                    this.poiLists[i].name=dotName;
                                    this.poiLists[i].color = this.poiColor;
                                    this.poiLists[i].drawScale = this.drawScale;
                                    this.poiLists[i].sliceIndex = this.zIndex;
                                    this.poiLists[i].diameter = this.poiR;
                                    this.poiLists[i].position = "" + this.poiRx.toFixed(2) + "," + this.poiRy.toFixed(2) + "," + thisPosZ + "";
                                    this.poiParams.poiData.push(this.poiLists[i]);
                                    this.initPoiCircle();//重绘所有poi
                                    $('#delDot').find('option:selected').attr('finish', true);
                                    cursorX.style.display='none';///隐藏红色标尺线
                                    cursorY.style.display='none';
                                }
                            }
                            if(existedPoiFlag===0) {///3.之前不存在此ID
//                                alert(0)
                                thisPoiData.name=dotName;
                                thisPoiData.color = this.poiColor;
                                thisPoiData.drawScale = this.drawScale;
                                thisPoiData.sliceIndex = this.zIndex;
                                thisPoiData.diameter = this.poiR;
                                thisPoiData.position = "" + this.poiRx.toFixed(2) + "," + this.poiRy.toFixed(2) + "," + thisPosZ + "";
//                                this.poiParams.poiData=JSON.parse(this.poiParams.poiData);
                                this.poiParams.poiData.push(thisPoiData);
                                this.poiLists.push(thisPoiData);
//                                console.log('poilists-poilists-------',this.poiLists);
                                this.initPoiCircle();//重绘所有poi
                                $('#delDot').find('option:selected').attr('finish', true);
                                cursorX.style.display='none';///隐藏红色标尺线
                                cursorY.style.display='none';
                            }else if(existedPoiFlag===1){
                                layer.msg('此名称下的感兴趣点已绘制过了');
                            }
                            console.log(this.poiLists);
                        }
                    }else{
                        layer.msg('请点击‘窗宽窗位’按钮后点击CT图像');
                        return false;
                    }
                }else{
                    layer.msg('请放大CT图后再进行点击');
                    return false;
                }
            },
            updatePoiSet(color,diameter){
                var selectedDot=$('#delDot').find('option:selected').val();
                var dotName=$('#delDot').find('option:selected').text();
                for(var i=0;i<this.poiParams.poiData.length;i++){
                   if(this.poiParams.poiData[i].id==selectedDot){
                       this.poiParams.poiData[i].color=color;
                       this.poiParams.poiData[i].diameter=diameter;
                       var thisPoiData={};
                       thisPoiData.name=dotName;
                       thisPoiData.id=this.poiParams.poiData[i].id;
                       thisPoiData.color = this.poiParams.poiData[i].color;
                       thisPoiData.drawScale = this.poiParams.poiData[i].drawScale;
                       thisPoiData.sliceIndex = this.poiParams.poiData[i].sliceIndex;
                       thisPoiData.diameter = this.poiParams.poiData[i].diameter;
                       thisPoiData.position = this.poiParams.poiData[i].position;
                       this.poiParams.poiData.splice(i,1);
                       this.poiParams.poiData.push(thisPoiData);
                   }
                }
                for(var i=0;i<this.poiLists.length;i++){
                    if(this.poiLists[i].id==selectedDot){
                        this.poiLists[i].color=color;
                        this.poiLists[i].diameter=diameter;
                    }
                }
                this.savePoi();
            },
            savePoi(){
                this.poiParams.poiData = typeof (this.poiParams.poiData)!='string'?JSON.stringify(this.poiParams.poiData):this.poiParams.poiData;
                console.log('---------',this.poiParams,'------');
                poi.update(this.poiParams).then(res=>{
                    console.log('poipoipoi-----result----',res)
//                        layer.msg('您还没有创建任何新的感兴趣点');
                  layer.msg('poi设置成功！')
                  if(res.data.code==0){
                        this.poiParams.poiData=JSON.parse(this.poiParams.poiData);
//                        this.poiParams.poiData.length=0;
                        return false;
                    }
//                    if(res.data.msg=='success'){
//                        swal({
//                            type:'success',
//                            title:'保存成功'
//                        })
                    this.poiParams.poiData=JSON.parse(this.poiParams.poiData);
//                        this.poiParams.poiData=[];
//                        this.poiParams.poiData.length=0;
//                    }
                })
            },
            initPoiCircle(){
                var drawpoiZ=document.getElementById('drawPoiZ');
                var ctx=drawpoiZ.getContext('2d');
                ctx.clearRect(0, 0, drawpoiZ.width, drawpoiZ.height);//先清除原来画的感兴趣圆圈
                for(var i=0;i<this.poiLists.length;i++) {
                    var numIndex=Math.round(this.poiLists[i].diameter/this.imageParams.sliceThickness);//感兴趣球总共占据多少层
                    numIndex=numIndex%2==0?numIndex+1:numIndex;
                    var upIndex=this.poiLists[i].sliceIndex+(numIndex-1)/2;
                    var downIndex=this.poiLists[i].sliceIndex-(numIndex-1)/2;
                    for(var m=downIndex,ylen=(numIndex - 1) / 2;m<=upIndex,ylen>=-(numIndex - 1) / 2;m++,ylen--){
                        if(m==this.zIndex) {
                            console.log('poipoi------------------,',this.poiLists);
                            if(this.poiLists[i].color && this.poiLists[i].position) {
                                this.drawPoiZScroll(ylen, false, this.poiLists[i].color, this.poiLists[i].drawScale, this.poiLists[i].position, this.poiLists[i].diameter);
                            }
                        }
                    }
                }
            },
            computePosAndSize(pos){
                this.poiPosition=pos;
                console.log('haha---'+pos)
                if(this.poiPosition>=0 && this.poiPosition<this.imageParams.fileNum/2) {
                    this.poiMaxR = Math.floor((2*this.poiPosition+1) * this.imageParams.sliceThickness);//poi的最大直径限制
                }else if(this.poiPosition==this.imageParams.fileNum/2){
                    this.poiMaxR=Math.floor((2*this.poiPosition)*this.imageParams.sliceThickness);//poi的最大直径限制
                }else{
                    this.poiMaxR=Math.floor((2*(this.imageParams.fileNum-this.poiPosition)+1) * this.imageParams.sliceThickness);//poi的最大直径限制
                }
                console.log('zhijing---',this.poiMaxR);
                this.poiR=this.poiMaxR;//默认展示最大直径的圆球
                var pxIndex=this.imageParams.sliceThickness/this.imageParams.rowPixelSpacing;//每层厚占多少像素
                var numIndex=Math.round(this.poiR/this.imageParams.sliceThickness);
                this.numIndex=numIndex%2==0?numIndex+1:numIndex;

                this.upIndex=this.poiPosition+(this.numIndex-1)/2;
                this.downIndex=this.poiPosition-(this.numIndex-1)/2;

            },
            passPoiMessage(param){
                console.log(param);
                this.poiColor=param.color;
                this.poiR=param.diameter;
                var pxIndex=this.imageParams.sliceThickness/this.imageParams.rowPixelSpacing;//每层厚占多少像素
                var numIndex=Math.round(this.poiR/this.imageParams.sliceThickness);//感兴趣球总共占据多少层
                this.numIndex=numIndex%2==0?numIndex+1:numIndex;
                this.upIndex=this.clickLayer+(this.numIndex-1)/2;
                this.downIndex=this.clickLayer-(this.numIndex-1)/2;
                var pos=this.zIndex;
                if(this.upIndex>=pos && this.downIndex<=pos) {
                    if(pos>=this.clickLayer){//如果poi球心在中间层以上
                        var disPos=pos-this.clickLayer;
                        this.initPoiCircle(disPos,true,this.poiColor,this.drawScale);///
                    }else{//如果poi球心在中间层以下
                        var disPos=this.clickLayer-pos;
                        this.initPoiCircle(disPos,true,this.poiColor,this.drawScale);
                    }
                }else{
                    //如果新的poi不贯穿当前层
                    var drawpoiZ=document.getElementById('drawPoiZ');
                    var ctx=drawpoiZ.getContext('2d');
                    ctx.clearRect(0, 0, drawpoiZ.width, drawpoiZ.height);
                }
//                alert('change'+this.numIndex);
            },
            drawPoiZScroll(ylen,flag,color,drawScale,position,diameter){
                var drawPoiZ=document.getElementById('drawPoiZ');
                var ctx=drawPoiZ.getContext('2d');
                var posArr=position.split(',');
                //如果canvasBox被放大了，且放大了drawScale倍
                var cx = posArr[0]/(1+drawScale);
                var cy = posArr[1]/(1+drawScale);
//                if (flag) {
//                    var cy = posArr[1]/(1+drawScale) - ylen * this.imageParams.sliceThickness;
//                } else {
//                    var cy = posArr[1]/(1+drawScale) + ylen * this.imageParams.sliceThickness;
//                }

//                console.log(diameter+'直径');
                var cr=Math.sqrt((diameter/2)*(diameter/2)/this.imageParams.rowPixelSpacing/this.imageParams.rowPixelSpacing-ylen*this.imageParams.sliceThickness*ylen*this.imageParams.sliceThickness);
                ctx.beginPath();
                ctx.strokeStyle=color;
//                console.log(cx+','+cy+','+cr);
                ctx.arc(cx,cy,cr,0,2*Math.PI,false);
                ctx.stroke();
                ctx.closePath();

            },
            addPoi(){
                var dotInput=$.trim($('input#addDot').val());
                var existedFlag=false;
                for(var i=0;i<$('.dotDel select.delDot#delDot').find('option').length;i++){
                    if($('.dotDel select.delDot#delDot').find('option').eq(i).text()==dotInput){
                        existedFlag=true;
                    }
                }
                $(event.target).attr('disabled','disabled');
                if(dotInput==''){
                    layer.msg('请输入添加的poi名称');
                    $(event.target).removeAttr('disabled');
                    return ;
                }else if(existedFlag){
                    layer.msg('下述列表中已存在该名称，请重新输入');
                    $(event.target).removeAttr('disabled');
                    return ;
                }
                this.poi.planningId=this.planningId;
//                this.poi.name=dotInput;
                console.info(this.poi);
                poi.save(this.poi).then(res=>{
                    console.log('ressssssssssssssss',res);
                    var firstOption=$('.dotDel select.delDot#delDot').find('option').eq(0);
                    var firstOptionforPortal=$('#poiList').find('option').eq(0);
                    $('<option value="'+res.data.data+'">'+dotInput+'</option>').insertAfter(firstOption);
                    $('<option value="'+res.data.data+'">'+dotInput+'</option>').insertAfter(firstOptionforPortal);
                    $('#addDotBtn').removeAttr('disabled');
                });
                //绘制感兴趣球点

            },
            showPoiList(){
                poi.getByPlanning(this.planningId).then(res=>{
                    console.log('uuuuuuuu',res,'uuuuuuuuu')
                    var firstOption=$('.dotDel select.delDot#delDot').find('option').eq(0);
                    var firstOptionChoose=$('select#poiList').find('option').eq(0);
                    var drawPoiZ=document.getElementById('drawPoiZ');
                    var ctx=drawPoiZ.getContext('2d');
                    for(var i=0;i<res.data.data.pois.length;i++){
                        let prescriptionId=res.data.data.prescription[i]?res.data.data.prescription[i].id:''
                        $('<option value="'+res.data.data.pois[i].id+'" prescriptionId="'+prescriptionId+'">'+res.data.data.pois[i].name+'</option>').insertAfter(firstOption);
                        $('<option value="'+res.data.data.pois[i].id+'" prescriptionId="'+prescriptionId+'">'+res.data.data.pois[i].name+'</option>').insertAfter(firstOptionChoose);//展示射野列表可选择的poi
                        this.poiLists.push(res.data.data.pois[i]);/////把请求过来的感兴趣点数据存起来
                        if(res.data.data.pois[i].position){///循环展示初始层上所有的感兴趣园
                            this.poiParams.poiData.push(res.data.data.pois[i]);
                            var cxy=res.data.data.pois[i].position.split(',');//position为感兴趣球心位置
                            if (res.data.data.pois[i].sliceIndex==this.imageParams.fileNum/2) {
                                var cx = cxy[0]/(1+res.data.data.pois[i].drawScale);
                                var cy = cxy[1]/(1+res.data.data.pois[i].drawScale);
                                var cr=res.data.data.pois[i].diameter/this.imageParams.rowPixelSpacing/2;
                            } else {
                                var diameter=res.data.data.pois[i].diameter;
                                var numIndex=Math.round(diameter/this.imageParams.sliceThickness);//感兴趣球总共占据多少层
                                numIndex=numIndex%2==0?numIndex+1:numIndex;
                                var upIndex=res.data.data.pois[i].sliceIndex+(numIndex-1)/2;
                                var downIndex=res.data.data.pois[i].sliceIndex-(numIndex-1)/2;
                                if(res.data.data.pois[i].sliceIndex>=downIndex && res.data.data.pois[i].sliceIndex<=upIndex){
                                    var cx = cxy[0]/(1+res.data.data.pois[i].drawScale);
                                    var cy = cxy[1]/(1+res.data.data.pois[i].drawScale);
//                                    var cy = cxy[1]/(1+res.data.data[i].drawScale) + (res.data.data[i].sliceIndex-this.imageParams.fileNum/2) * this.imageParams.sliceThickness;
                                    var cr=Math.sqrt((diameter/2)*(diameter/2)/this.imageParams.rowPixelSpacing/this.imageParams.rowPixelSpacing-(res.data.data.pois[i].sliceIndex-this.imageParams.fileNum/2) * this.imageParams.sliceThickness*(res.data.data.pois[i].sliceIndex-this.imageParams.fileNum/2) * this.imageParams.sliceThickness);
                                }
                            }
                            ctx.beginPath();
                            ctx.strokeStyle=res.data.data.pois[i].color;
                            console.log(cx+','+cy+','+cr);
                            ctx.arc(cx,cy,cr,0,2*Math.PI,false);
                            ctx.stroke();
                            ctx.closePath();
                        }
                    }
                })
            },
            deletePoi(){
                let delSelect=$('.dotDel select#delDot').find('option:selected').text();
                let delSelectPoiId=$('.dotDel select#delDot').find('option:selected').val();
                let that=this;
                if(delSelect=='请选择'){
                    layer.msg('请选择您要删除的感兴趣点名称');
                    return ;
                }else{
                    swal({
                            type: 'warning',
                            title: '确定要删除吗?',
                            text: '点击确认后可执行彻底删除',
                            showCancelButton: true,
                            cancelButtonText: '取消',
                            confirmButtonText: '确认',
                            confirmButtonColor: '#DD6B55',
                            showLoaderOnConfirm: true,
                            closeOnConfirm: false
                        }, confirmed => {
                        if (confirmed) {

                            poi.delete(delSelectPoiId).then(res=>{
                                console.log('jjjjjjjjjj',res,'jjjjjjjjjj');
                                if(res.data.msg=='success'){
                                    swal({
                                        type:'success',
                                        title:'删除成功！',
                                    });
                                    //先删除poi名称列表中的这个值
                                    for(var i=0;i<$('.dotDel select.delDot#delDot').find('option').length;i++){
                                        if($('.dotDel select.delDot#delDot').find('option').eq(i).text()==delSelect){
                                            $('.dotDel select.delDot#delDot').find('option').eq(i).remove();
                                        }
                                    };
                                    //删除获取射野列表的poi列表中的这个值
                                    for(var i=0;i<$('#poiList').find('option').length;i++){
                                      if($('#poiList').find('option').eq(i).text()==delSelect){
                                        $('#poiList').find('option').eq(i).remove();
                                      }
                                    }
                                    for(var i=0;i<that.poiLists.length;i++){
                                        if(delSelectPoiId==that.poiLists[i].id){
                                            that.poiLists.splice(i,1);//删除所存储的本条poi数据
                                        }
                                    }
                                    ///删除保存poi的列表中的这个值
                                for(var i=0;i<this.poiParams.poiData.length;i++){
                                        if(this.poiParams.poiData[i].position && this.poiParams.poiData[i].name==delSelect){
                                            this.poiParams.poiData.splice(i,1);
                                        }
                                }
                                    $('select#delField').html('<option value="-1">请选择</option>');//删除该poi下的所有射野
                                    that.initPoiCircle();
                                }
                            })
                        }
                    });

                }
            },
            getCanvasPos(canvas,e) {//获取鼠标在canvas上的坐标
                var rect = canvas.getBoundingClientRect();
                return {
                    x: (e.pageX - rect.left),
                    y: (e.pageY - rect.top)
                };
            },
            toBigger(e) {
                $('.bgLayer').show();
                $('.bgLayer a.backToSmall').show();
                var cBoxLeft = $(e.target).parent().find('.canvasBox')[0].offsetWidth / 2;
                var cBoxTop = $(e.target).parent().find('.canvasBox')[0].offsetHeight / 2;
                $(e.target).parent().find('.canvasBox').css({
                    'transform': 'scale(1)',
                    'left': '50%',
                    'top': '50%',
                    'margin-left': -cBoxLeft + 'px',
                    'margin-top': -cBoxTop + 'px',
                    'z-index': 3
                });
                $(e.target).hide().parent().css({
                    'z-index': 3,
                    'border': 0,
                    'position': 'static'
                });
                this.curIndex = $(e.target).parent().index('.commonStyle');
//                alert(this.curIndex);
                $(e.target).parents('.imageBox').find('.canvasBox').eq(this.curIndex).attr('biggerMoveFlag',true);
            },
            toSmall(e) {
                $('.buye .bgLayer').hide();
                $('.buye .imageBox .canvasBox').removeAttr('style');
                $(e.target).hide();
                $('.commonStyle i.bigger').show();
                $('.buye .commonStyle').css({
                    'position': 'relative',
                    'border': '1px solid #fff',
                    'z-index': 1
                })
                $('.canvasBox').removeAttr('biggerMoveFlag');
                this.moveFlag=1;//解绑平移、缩放功能
                var thisCanvas = document.getElementsByTagName('canvas');
                for (var i = 0; i < thisCanvas.length; i++) {
                    thisCanvas[i].style.cursor = 'default';//恢复鼠标样式
                }
            },
            setShowPoi(e) {
                this.popTit = $(e.target).find('option:selected').text();
                this.$store.state.mySelectVal = parseInt($(e.target).val());

                if ($(e.target).val() != -1) {
                    var delVal=$('.dotDel select#delDot').find('option:selected').val();
                    if(delVal!=-1){
                        for(var i=0;i<this.poiLists.length;i++){
                            if(delVal==this.poiLists[i].id){
                                this.curPoiR=this.poiLists[i].diameter||100;///修改直径的值
                                this.poiColor=this.poiLists[i].color ||'rgb(232,145,5)';
                                this.computePosAndSize(this.poiLists[i].sliceIndex);////确定最大直径
                            }
                        }
                        $('#myModalSet').modal('show');
                    }else{
                        layer.msg('请先选择您要设置的poi名称');
                    }
                }
            },
            setShowYe(e) {
                var thisPoiId=$('select#delDot').find('option:selected').val();
                this.popTit = $(e.target).find('option:selected').text();
                this.$store.state.mySelectVal = parseInt($(e.target).val());
                if(this.$store.state.mySelectVal==1) {
                    Portal.getByPoi(thisPoiId).then(res => {
//                    console.log('portal-----------', res);
                        if (res.data.data) {
                            if (res.data.data.acceleratorName == undefined) {
                                layer.msg('请先到医院界面添加机器配置！')
//                            return false;
                            }
                            if ($(e.target).val() != -1) {
                                $('#myModalSet').modal('show');
                            }
                        }
                    });
                }else if(this.$store.state.mySelectVal==2){
                    if ($(e.target).val() != -1) {
                        $('#myModalSet').modal('show');
                    }
                }else if(this.$store.state.mySelectVal==3){
                    if ($(e.target).val() != -1) {
                        $('#myModalSet').modal('show');
                    }
                }else if(this.$store.state.mySelectVal==4){
                    if ($(e.target).val() != -1) {
                        $('#myModalSet').modal('show');
                    }
                }
            },
            backPos() {
                $('.buye .setDotParams').val('-1');
                this.$store.state.mySelectVal=-1;
                $('#myModalSet').modal('hide');
            },
            //创建db数据库
            createIndexedDB() {
                var imageDB = 'imageDB_' + this.imageId;
                var poiDB = 'poiDB_'+this.planningId;
                var that = this;
                var indexedDB2 = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
                window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {
                    READ_WRITE: "readwrite"
                };
                window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

                if (!window.indexedDB) {
                    //您的浏览器不支持稳定版本的IndexedDB。这样的特性是不可用的
                    window.alert("您的浏览器不支持稳定版本的IndexedDB, 这样的特性是不可用的.");
                }
                //新建一个db
                var dbVersion = parseInt(window.localStorage.getItem("dbVersion")) || 1;
//                var dbVersion=storeState.state.dbVersion;
                that.myDB_plan.version = dbVersion;
                console.log('dbVERSION=====', dbVersion)
                var openRequest2 = indexedDB2.open(that.myDB_plan.name, that.myDB_plan.version);
//                storeState.state.dbVersion=dbVersion;
                dbVersion++;
                window.localStorage.setItem("dbVersion", dbVersion);

                openRequest2.onerror = function (e) {
                    console.log(e.target);
                    console.log("Database error: " + e.target.errorCode);
                };
                //如果数据库已经创建
                openRequest2.onsuccess = function (e) {
                    console.log("Database created");
                    that.myDB_plan.db = e.target.result;//将数据存进db中
                    //获取每个轴图像的长度
                    that.zLen = that.imageParams.fileNum;
                    that.xLen = that.imageParams.width;
                    that.yLen = that.imageParams.height;

                    that.zIndex = that.zLen / 2;
                    that.xIndex = that.xLen / 2;
                    that.yIndex = that.yLen / 2;

                    var imageFetch = that.fetchStoreByCursorforDownload(that.myDB_plan.db, imageDB);
                    var imageFlag;
                    $.when(imageFetch).always(function (result1) {
                        imageFlag = result1;
                        var allElementDataFlag = imageFlag;//判断数据库中是否已有足够的数据

                        if (!allElementDataFlag) {
                           that.clearObjectStore(that.myDB_plan.db,imageDB);//清空不完整的表数据
                            //加载底图的数据
                            $.when(that.readImageforPlan(that.imageId)).done(function (data) {//进行排序,加载完readImageforDose里面的数据之后才能进行readdose方法

                                //从db数据库调出数据进行图像渲染
                                var imageIndex = 'image_z_' + that.zIndex;
                                var temp_c = 'z'
                                $.when(that.getDataByKey(that.myDB_plan.db, imageDB, imageIndex)).done(function (data) {
                                    that.ctImageGrey(cornerstone_plan, data, temp_c);
                                    that.loader(temp_c);

                                    //获取x轴的图像数据
                                    imageIndex = 'image_x_' + that.xIndex;
                                    temp_c = 'x';
                                    $.when(that.getDataByKey(that.myDB_plan.db, imageDB, imageIndex)).done(function (data) {
                                        that.ctImageGrey(cornerstone_plan, data, temp_c);
                                        that.loader(temp_c);

                                        //获取y轴的图像数据
                                        imageIndex = 'image_y_' + that.yIndex;
                                        temp_c = 'y';
                                        $.when(that.getDataByKey(that.myDB_plan.db, imageDB, imageIndex)).done(function (data) {
                                            that.ctImageGrey(cornerstone_plan, data, temp_c);
                                            that.loader(temp_c);
                                            $('.design-progress-tip').hide();//隐藏进度条

                                        });
                                    });
                                });
                            });
                        } else {
                            var imageIndex = 'image_z_' + that.zIndex;
                            var temp_c = 'z'
                            $.when(that.getDataByKey(that.myDB_plan.db, imageDB, imageIndex)).done(function (data) {
                                that.ctImageGrey(cornerstone_plan, data, temp_c);
                                that.loader(temp_c);

                                //获取x轴的图像数据
                                imageIndex = 'image_x_' + that.xIndex;
                                temp_c = 'x';
                                $.when(that.getDataByKey(that.myDB_plan.db, imageDB, imageIndex)).done(function (data) {
                                    that.ctImageGrey(cornerstone_plan, data, temp_c);
                                    that.loader(temp_c);

                                    //获取y轴的图像数据
                                    imageIndex = 'image_y_' + that.yIndex;
                                    temp_c = 'y';
                                    $.when(that.getDataByKey(that.myDB_plan.db, imageDB, imageIndex)).done(function (data) {
                                        that.ctImageGrey(cornerstone_plan, data, temp_c);
                                        that.loader(temp_c);
                                        $('.design-progress-tip .design-progressing').css('width', '100%');
                                        setTimeout(function () {
                                            $('.design-progress-tip').hide();//隐藏进度条
                                            $('.design-mask').hide();
                                        }, 1000);

                                    });
                                });
                            });
                        }
                    })
                };

                //如果数据库更新
                openRequest2.onupgradeneeded = function (e) {
                    //创建objectstore表
                    that.myDB_plan.db = e.target.result;

                    if (!that.myDB_plan.db.objectStoreNames.contains(imageDB)) {
                        var store = that.myDB_plan.db.createObjectStore(imageDB, {
                            keyPath: 'id'
                        });
                        //创建索引
                        store.createIndex('id', 'id', {
                            unique: true
                        });

                    }
                    if (!that.myDB_plan.db.objectStoreNames.contains(poiDB)) {
                        var store = that.myDB_plan.db.createObjectStore(poiDB, {
                            keyPath: 'id'
                        });
                        //创建索引
                        store.createIndex('id', 'id', {
                            unique: true
                        });

                    }
                    console.log('DB version changed to ' + that.myDB_plan.version);

                };
            },
            fetchStoreByCursorforDownload(db, storename) {
                var store = db.transaction(storename, 'readwrite').objectStore(storename);
                var request = store.openCursor();//db为IDBDatabase对象
                var allImageDataNum = this.imageParams.width + this.imageParams.height + this.imageParams.fileNum;
                var count = 0;
                var defer = $.Deferred();
                request.onsuccess = function (e) {
                    var cursor = e.target.result;
                    if (cursor) {//必须要检查
                        count++;
                        cursor.continue();//遍历了存储对象中的所有内容
                    }
                    if (!cursor) {
                        console.log(count + '游标开始查询' + allImageDataNum)
                        if (count == allImageDataNum) {
                            defer.resolve(true);
                        } else {
                            defer.reject(false);
                        }
                    }
                };
                return defer.promise();
            },
            //按key获取DB数据
            getDataByKey(db, storeName, id) {
                var transaction = db.transaction(storeName, 'readwrite');
                var store = transaction.objectStore(storeName);
                var request = store.get(id);
                var defer = $.Deferred();
                request.onsuccess = function (e) {
                    let entry = e.target.result;//定义变量存放所需id的数据

                    var temp_c = 'z';//创建变量存放轴的名称
                    if (!entry) {
                        defer.reject(false);
                        return;
                    }
                    if (entry.id.indexOf('image') != -1) {//判断,如果是image数据,则渲染图像
                        defer.resolve(entry.value);
                    }
                }
                return defer.promise();
            },
            //新增单条DB数据
            addDBSingleData(objectStore, entry) {//参数一:表名,参数二:需要添加的数据
                var _objectStore = this.myDB_plan.db.transaction(objectStore, "readwrite").objectStore(objectStore);
                _objectStore.add(entry);
            },
          //删除一张表的数据
          clearObjectStore(db,storeName){
              var transaction=db.transaction(storeName,'readwrite');
              var store=transaction.objectStore(storeName);
              store.clear();
            },
            startGoing(paramFlag) {
                var flagNum=0;
                for(var i=0;i<$('.canvasBox').length;i++){
                    if(!$('.canvasBox').eq(i).attr('biggerMoveFlag')){
                        flagNum++;
                    }
                }
                if(flagNum>=3){ ////如果都没有放大就返回false;
                    return false;
                }
                if (paramFlag == 2) {
                    this.moveFlag = 2;
//                    this.scaleFlag = 2;
                    $('.imageArea *').on('mouseover.MOVE', this.bindMove);//绑定平移功能
                    $('.imageArea *').off('.SCALE');//解绑缩放功能
                    var thisCanvas = document.getElementsByTagName('canvas');
                    for (var i = 0; i < thisCanvas.length; i++) {
                        thisCanvas[i].style.cursor = 'move';
                    }
                    console.log('this.moveFlag888===' + this.moveFlag);
                    return false;
                } else if (paramFlag == 3) {
//                    this.scaleFlag = 3;
                    this.moveFlag = 3;
                    $('.imageArea *').on('mouseover.SCALE', this.bindMove);//绑定缩放功能
                    $('.imageArea *').off('.MOVE');//解绑平移功能
                    var thisCanvas = document.getElementsByTagName('canvas');
                    for (var i = 0; i < thisCanvas.length; i++) {
                        thisCanvas[i].style.cursor = 's-resize';
                    }
                    return false;
                } else if (paramFlag == 1) {
                    this.moveFlag = 1;
//                    this.scaleFlag = 1;
                    var that = this;
                    var thisCanvas = document.getElementsByTagName('canvas');
                    for (var i = 0; i < thisCanvas.length; i++) {
                        thisCanvas[i].style.cursor = 'default';
                    }
                }
                $('.imageArea *').off('mouseover.MOVE', this.bindMove);//解绑平移功能
                $('.imageArea *').off('mouseover.SCALE', this.bindScale);//解绑缩放功能
                return false;
            },
        bindMove(e) {   //            绑定平移方法
            e.stopPropagation();
            var parentObj = document.getElementById('imageBox');
            var parentObjWidth = parentObj.offsetWidth;
            var parentObjHeight = parentObj.offsetHeight;
            var obj = $(parentObj).find('.commonStyle').eq(this.curIndex).find('.canvasBox')[0];
            if (this.moveFlag == 2 || this.moveFlag==3) {
                this.moveObj(obj, parentObjWidth, parentObjHeight);
            }
        },
            moveObj(obj, parentObjWidth, parentObjHeight) {
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

                            if (that.moveFlag == 3) {
                                if (that.scaleSize < 0) {
                                    that.scaleSize = 0;
                                    var currentScale = parseFloat((that.scaleSize / 100).toFixed(2));
                                } else if (that.scaleSize > 400) {
                                    that.scaleSize = 400;
                                    var currentScale = parseFloat((that.scaleSize / 100).toFixed(2));
                                } else {
                                    that.scaleSize -= deltY;
                                    var currentScale = parseFloat((that.scaleSize / 100).toFixed(2));

                                    var nowScale=parseFloat((that.scaleSize / 100).toFixed(2));
                                    console.log('nowScale==='+nowScale);//下面设置的9/10，表示将有1/10的部分不能被拖出窗口
                                    console.log(-9*(nowScale/2+1)*obj.offsetWidth/10);
                                    console.log((parentObjWidth-obj.offsetWidth*(1-nowScale)/10));
//                                    newPosX=newPosX<=(parentObjWidth*3/8-obj.offsetWidth*(9/10)-(1/2)*nowScale*obj.offsetWidth)?(parentObjWidth*3/8-obj.offsetWidth*(9/10)-(1/2)*nowScale*obj.offsetWidth):newPosX>=(parentObjWidth*5/8-20+(1/2)*nowScale*obj.offsetWidth)?(parentObjWidth*5/8-20+(1/2)*nowScale*obj.offsetWidth):newPosX;
//                                    newPosY=newPosY<=(parentObjHeight*3/8-obj.offsetHeight*(9/10)-(1/2)*nowScale*obj.offsetHeight)?(parentObjHeight*3/8-obj.offsetHeight*(9/10)-(1/2)*nowScale*obj.offsetHeight):newPosY>=(parentObjHeight*5/8-20+(1/2)*nowScale*obj.offsetHeight)?(parentObjHeight*5/8-20+(1/2)*nowScale*obj.offsetHeight):newPosY;
                                    newPosX=newPosX<=-9*(nowScale/2+1)*obj.offsetWidth/10?-9*(nowScale/2+1)*obj.offsetWidth/10:newPosX>=(parentObjWidth-obj.offsetWidth*(1-nowScale)/10)?(parentObjWidth-obj.offsetWidth*(1-nowScale)/10):newPosX;
                                    newPosY=newPosY<=-9*(nowScale/2+1)*obj.offsetHeight/10?-9*(nowScale/2+1)*obj.offsetHeight/10:newPosY>=(parentObjHeight-obj.offsetHeight*(1-nowScale)/10)?(parentObjHeight-obj.offsetHeight*(1-nowScale)/10):newPosY;
                                    obj.style.left = newPosX + 'px';
                                    obj.style.top = newPosY + 'px';
                                    console.log(newPosX,'px')
                                    obj.style.marginLeft = 0;
                                    obj.style.marginTop = 0;
                                }
                                obj.style.transform = 'scale(' + (1 + currentScale) + ')';


                                startX = moveX;
                                startY = moveY;

                                posX = newPosX;
                                posY = newPosY;
                            } else {
                                /////放大4倍后的位移限制：不小于1倍時的x再減去放大后寬度的一半，同理其他；
                                var nowScale=parseFloat((that.scaleSize / 100).toFixed(2));
                                newPosX=newPosX<=-9*(nowScale/2+1)*obj.offsetWidth/10?-9*(nowScale/2+1)*obj.offsetWidth/10:newPosX>=(parentObjWidth-obj.offsetWidth*(1-nowScale)/10)?(parentObjWidth-obj.offsetWidth*(1-nowScale)/10):newPosX;
                                newPosY=newPosY<=-9*(nowScale/2+1)*obj.offsetHeight/10?-9*(nowScale/2+1)*obj.offsetHeight/10:newPosY>=(parentObjHeight-obj.offsetHeight*(1-nowScale)/10)?(parentObjHeight-obj.offsetHeight*(1-nowScale)/10):newPosY;
//                                newPosX=newPosX<=(parentObjWidth*3/8-obj.offsetWidth*(9/10)-(1/2)*nowScale*obj.offsetWidth)?(parentObjWidth*3/8-obj.offsetWidth*(9/10)-(1/2)*nowScale*obj.offsetWidth):newPosX>=(parentObjWidth*5/8-20+(1/2)*nowScale*obj.offsetWidth)?(parentObjWidth*5/8-20+(1/2)*nowScale*obj.offsetWidth):newPosX;
//                                newPosY=newPosY<=(parentObjHeight*3/8-obj.offsetHeight*(9/10)-(1/2)*nowScale*obj.offsetHeight)?(parentObjHeight*3/8-obj.offsetHeight*(9/10)-(1/2)*nowScale*obj.offsetHeight):newPosY>=(parentObjHeight*5/8-20+(1/2)*nowScale*obj.offsetHeight)?(parentObjHeight*5/8-20+(1/2)*nowScale*obj.offsetHeight):newPosY;
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
            //读取图像数据
            readImageforPlan(id) {
                console.log('loading...');
                var type=1;
                var imageDB='imageDB_'+this.imageId;
                var defer=$.Deferred();
                Download.readImageforPlan(id,type,this.fileLength).then(response => {
                    var startTime = new Date().getTime();
                    if(response) {
                      if (response.status == "200") {
                        var uint16 = new Uint16Array(response.data); // length为4

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
//                                this.ctImageGrey(cornerstone_plan, arr_z_first, 'z');
//                                this.loader('z');
                          }
                          image_entry_map = null;

                        }
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
//                                this.ctImageGrey(cornerstone_plan, arr_x_first, 'x');
//                                this.loader('x');
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
//                                this.ctImageGrey(cornerstone_plan, arr_y_first, 'y');
//                                this.loader('y');
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

                        var endTime = new Date().getTime()
                        console.log((endTime - startTime) / 1000 + "秒")
                        // uint16.length=0;//清除数据缓存
                        defer.resolve(true);
                      }
                    }
                })
                return defer.promise();
            },
            ctImageGrey(cornerstone_plan, data, axis) {
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
                        render: cornerstone_plan.renderGrayscaleImage,//渲染灰度图像
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

                cornerstone_plan.registerImageLoader('ctexample', getExampleImageGrey);

            },
            loader(axis) {
                var imageId = "";
                var index = 0;
                var len = 0;
                var domWindow = ""
                var Vue = this;
                var domCanvas = {}
                //判断是哪个窗口
                if (axis == "z") {
                    domWindow = "#dicomImagePlanZ";
                    imageId = 'ctexample://' + this.zIndex;
                    index = this.zIndex;
                    len = this.zLen;

                    for (var i = 0; i < len; i++) {
                        this.zImageIds[i] = 'ctexample://' + (i);
                    }
                    var element = document.getElementById("dicomImagePlanZ");
                    cornerstone_plan.enable(element);
                    var imageIds = this.zImageIds;
                }
                if (axis == "x") {
                    domWindow = "#dicomImagePlanX"
                    imageId = 'ctexample://' + this.xIndex;
                    index = this.xIndex;
                    len = this.xLen;
                    for (var i = 0; i < len; i++) {
                        this.xImageIds[i] = 'ctexample://' + (i);
                    }
                    var element = document.getElementById("dicomImagePlanX");

                    cornerstone_plan.enable(element);
                    var imageIds = this.xImageIds;
                }
                if (axis == "y") {
                    domWindow = "#dicomImagePlanY"
                    imageId = 'ctexample://' + this.yIndex;
                    index = this.yIndex;
                    len = this.yLen;
                    for (var i = 0; i < len; i++) {
                        this.yImageIds[i] = 'ctexample://' + (i);
                    }
                    var element = document.getElementById("dicomImagePlanY");

                    cornerstone_plan.enable(element);
                    var imageIds = this.yImageIds;
                }


//                function updateTheImage(imageIndex) {
//                    Vue.flag=1;
//                    cornerstone_plan.loadImage(imageIds[imageIndex]).then(function(imageGrey) {
//                        cornerstone_plan.displayImage(element, image);
//                    });
//                };
                var imageDB = 'imageDB_' + Vue.imageId;
                var imageIndex = 0;
                var x = 0;
                var y = 0;
                cornerstone_plan.loadImage(imageId).then(function (image) {
                    cornerstone_plan.displayImage(element, image);
                    var viewport = cornerstone_plan.getViewport(element);
                    $('#softTissue').click(function (e) {
                        if (Vue.axisG == axis) {
                            var viewport = cornerstone_plan.getViewport(element);
                            viewport.voi.windowWidth = 400;
                            viewport.voi.windowCenter = 20;
                            cornerstone_plan.setViewport(element, viewport);
                        } else {
                            return;
                        }
                    });

                    //自定义窗宽窗位点击方法
                    $('#lung').click(function (e) {
                        if (Vue.axisG == axis) {//先判断当前轴是否等于主轴,只渲染当前主轴的图像
                            var viewport = cornerstone_plan.getViewport(element);
                            viewport.voi.windowWidth = 1600;
                            viewport.voi.windowCenter = -600;
                            cornerstone_plan.setViewport(element, viewport);
                        } else {
                            return;
                        }
                    });
                    $('#bone').click(function (e) {
                        if (Vue.axisG == axis) {
                            //throw Error("ddd")
                            //console.log("按下的图像id="+imageId+"--当前轴位="+axis+"--全局轴位"+Vue.axisG)
                            var viewport = cornerstone_plan.getViewport(element);
                            viewport.voi.windowWidth = 2000;
                            viewport.voi.windowCenter = 300;
                            cornerstone_plan.setViewport(element, viewport);
                        } else {
                            return;
                        }

                    });
                    element.onmousedown=function (e) {////点击对应影像图窗口高亮该窗口，并加载当前轴张数下的对应影像图
                        Vue.axisG=axis;
                        if (axis == 'z') {
                            var imageIndex = 'image_z_' + Vue.zIndex;
                            var index=Vue.zIndex;
                        }
                        if (axis == 'x') {
                            var imageIndex = 'image_x_' + Vue.xIndex;
                            var index=Vue.xIndex;e
                        }
                        if (axis == 'y') {
                            var imageIndex = 'image_y_' + Vue.yIndex;
                            var index=Vue.yIndex;
                        }
//                        渲染图像
                        $.when(Vue.getDataByKey(Vue.myDB_plan.db, imageDB, imageIndex)).done(function (oneData) {
//                            updateTheImage(index);
                            Vue.flag = 1;
                            Vue.data_tmp = oneData;
                            cornerstone_plan.loadImage(imageIds[index]).then(function (imageGrey) {
                                cornerstone_plan.displayImage(element, imageGrey);
                            });
                        });
                        //改变选中的某个影像图外框
                        $(this).parents('.commonStyle').css({
                            'border':'3px solid green'
                        }).siblings('.commonStyle').css({
                            'border':'1px solid #fff'
                        });
                        ///改变窗宽窗位
                        var lastX = e.pageX;
                        var lastY = e.pageY;
                        document.onmousemove=function (e) {
                            var deltaX = e.pageX - lastX,
                                deltaY = e.pageY - lastY;
                            lastX = e.pageX;
                            lastY = e.pageY;
                            if(Vue.moveFlag==1) {
                                viewport.voi.windowWidth += (deltaX / viewport.scale);
                                viewport.voi.windowCenter += (deltaY / viewport.scale);
                                cornerstone_plan.setViewport(element, viewport);
                            }
                        };

                        document.onmouseup=function (e) {
                            document.onmousemove=null;
                            document.onmouseup=null;
                        };
                    };
                    //鼠标滚轮滚动事件
                    Vue.upIndex=Vue.poiPosition+(Vue.numIndex-1)/2;
                    Vue.downIndex=Vue.poiPosition-(Vue.numIndex-1)/2;
                    var drawpoiZ=document.getElementById('drawPoiZ');
                    var ctx=drawpoiZ.getContext('2d');

                    $(domWindow).on('mousewheel DOMMouseScroll', function (e) {
                        Vue.axisG = axis;
                        if (e.originalEvent.wheelDelta < 0 || e.originalEvent.detail > 0) {//向下滑

                            if (index > 0) {
                                index--;
                                console.log("这是第" + index + "张影像")
                            } else if (index == 0) {
                                index = len - 1;
                                console.log("这是第" + index + "张影像")
                            }
                            if(axis=='z') {
//                                console.log(Vue.poiLists);
                                ctx.clearRect(0, 0, drawpoiZ.width, drawpoiZ.height);//先清除原来画的感兴趣圆圈
                                for(var i=0;i<Vue.poiLists.length;i++){
                                    if(Vue.poiLists[i].position) {
                                        var numIndex = Math.round(Vue.poiLists[i].diameter / Vue.imageParams.sliceThickness);//感兴趣球总共占据多少层
                                        numIndex = numIndex % 2 == 0 ? numIndex + 1 : numIndex;
                                        var upIndex = Vue.poiLists[i].sliceIndex + (numIndex - 1) / 2;
                                        var downIndex = Vue.poiLists[i].sliceIndex - (numIndex - 1) / 2;
                                        for (var m = downIndex, ylen = (numIndex - 1) / 2; m <= upIndex, ylen >= -(numIndex - 1) / 2; m++, ylen--) {
                                            if (m == index) {
                                                Vue.drawPoiZScroll(ylen, false, Vue.poiLists[i].color, Vue.poiLists[i].drawScale, Vue.poiLists[i].position, Vue.poiLists[i].diameter);
                                            }
                                        }
                                    }
                                }
//                                for(var m=Vue.downIndex,ylen=(Vue.numIndex - 1) / 2;m<=Vue.upIndex,ylen>=-(Vue.numIndex - 1) / 2;m++,ylen--){
//                                    if(m==index) {
//                                        Vue.drawPoiZ(ylen, false,Vue.poiColor,Vue.drawScale);
//                                        Vue.poiNumAbs--;
//                                    }
//                                }
                            }

                        } else {
                            console.log("向上")
                            if (index >= 0 && index < (len - 1)) {
                                index++;
                                console.log("这是第" + index + "张影像")
                            } else if (index == len - 1) {
                                index = 0;
                                console.log("这是第" + index + "张影像")
                            };
                            if(axis=='z') {
                                ctx.clearRect(0, 0, drawpoiZ.width, drawpoiZ.height);//先清除原来画的感兴趣圆圈
                                for(var i=0;i<Vue.poiLists.length;i++){
                                    if(Vue.poiLists[i].position) {
                                        var numIndex = Math.round(Vue.poiLists[i].diameter / Vue.imageParams.sliceThickness);//感兴趣球总共占据多少层
                                        numIndex = numIndex % 2 == 0 ? numIndex + 1 : numIndex;
                                        var upIndex = Vue.poiLists[i].sliceIndex + (numIndex - 1) / 2;
                                        var downIndex = Vue.poiLists[i].sliceIndex - (numIndex - 1) / 2;
                                        for (var m = downIndex, ylen = (numIndex - 1) / 2; m <= upIndex, ylen >= -(numIndex - 1) / 2; m++, ylen--) {
                                            if (m == index) {
                                                Vue.drawPoiZScroll(ylen, false, Vue.poiLists[i].color, Vue.poiLists[i].drawScale, Vue.poiLists[i].position, Vue.poiLists[i].diameter);
                                            }
                                        }
                                    }
                                }
//                                for(var m=Vue.downIndex,ylen=-(Vue.numIndex - 1) / 2;m<=Vue.upIndex,ylen<=(Vue.numIndex - 1) / 2;m++,ylen++){
//                                    if(m==index) {
//                                        Vue.drawPoiZ(ylen, true,Vue.poiColor,Vue.drawScale);
//                                        Vue.poiNumAbs++;
//                                    }
//                                }
                            }

                        }
                        if (axis == 'z') {
                            imageIndex = 'image_z_' + index;
                            Vue.zIndex = index;
                        }
                        if (axis == 'x') {
                            imageIndex = 'image_x_' + index;
                            Vue.xIndex = index;
                        }
                        if (axis == 'y') {
                            imageIndex = 'image_y_' + index;
                            Vue.yIndex = index;
                        }


                        //渲染图像
                        $.when(Vue.getDataByKey(Vue.myDB_plan.db, imageDB, imageIndex)).done(function (oneData) {
//                            updateTheImage(index);
                            Vue.flag = 1;
                            Vue.data_tmp = oneData;
                            cornerstone_plan.loadImage(imageIds[index]).then(function (imageGrey) {
                                cornerstone_plan.displayImage(element, imageGrey);
                            });
                        });

                        $(this).parents('.commonStyle').css({
                            'border':'3px solid green'
                        }).siblings('.commonStyle').css({
                            'border':'1px solid #fff'
                        })
                        return false;
                    });

                });
                if ($('#dicomImagePlanY').find('canvas').length > 0) {
                    this.haveCanvasFlag = true;//判断3个底图canvas是否已加载完毕，再设定x/y切面的位置
                }
            },

        },
        components:{poiSet,characTer,geomeTry,leadDoor,keyEr,editPrescription}
    }
</script>
<style>
    .buye h2{
        font-size:20px;
        color:#666;
        padding-left:10px;
        line-height:26px;
        margin:10px 10px 0 10px;
    }
    .buye .area1Tit,.buye .area2Tit{
        position:absolute;
        background:#efefef;
        left:20px;
        top:-10px;
        padding:0 10px;
    }
    .buye .controlArea{
        background:#efefef;
        margin:10px;
        padding:5px;
    }
    .buye .imageArea{
        margin:10px 0;
    }
    .buye .conArea1,.buye .conArea2{
        position:relative;
        padding:10px;
        margin:5px;
        border:1px solid #ccc;
        border-radius:5px;
    }
    .buye .conArea2{
        margin-top:20px;
    }
    .buye .dotAdd{
        margin-top:10px;
    }
    .buye .dotAdd,.buye .dotDel{
        overflow:hidden;
        padding-bottom:10px;
    }
    .buye .setDot{
       clear:both;
    }
    .buye .dotAdd .addDot,.buye .dotDel .delDot{
        width:70%;
        margin-right:5px;
        margin-bottom:5px;
    }
    .buye p.setDot select{
        width:70%;
    }
    select#delField{
        margin-top:10px;
    }
    /*****右侧图像区域样式*******/
    .buye .myAction{
        padding-bottom:5px;
    }
    .buye .imageBox{
        position:relative;
        overflow:hidden;
    }
    .buye .bgLayer{
        position:absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
        z-index:3;
        background:#000;
        display:none;
        align-content: center;
        justify-content: center;
    }
    .buye .bgLayer .backToSmall{
        color:#999;
        position:absolute;
        top:10px;
        left:10px;
        font-size:14px;
    }
    .buye .commonStyle{
        width:33.333%;
        border:1px solid #fff;
        box-sizing: border-box;
        float:left;
        min-height:350px;
        background:black;
        position: relative;
        display:flex;
        align-items:center;
        justify-content:center;
    }
    .buye .commonStyle i.bigger{
        position: absolute;
        right:10px;
        top:10px;
        cursor:pointer;
    }
    .buye .commonStyle .canvasBox{
        transform: scale(0.5);
        position:absolute;

    }
    .buye .canvasBox canvas{
        background: #fff;
    }
    /*******进度条******/
    .design-progress-tip {
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
    .design-progress-tip div.text-center{
        position: absolute;
        top:-22px;
        width:100%;
        color:#fff;
        font-size:12px;
    }
    .design-progress-tip div.text-center i{
        background:#666;
        font-style:normal;
        padding:5px;
    }
    .design-progress-tip .design-progressing {
        background: green;
        width: 0;
        height: 8px;
        border-radius: 4px;
    }

    .design-progress-tip span {
        color: green;
        font-size: 14px;
        line-height: 20px;
    }
    /******poi******/
    #drawPoiZ{
        position:absolute;
        top:0;
        left:0;
        background:none;
        z-index:5;
    }
    #cursorX,#cursorY{
        position:absolute;
        z-index:4;
        background:red;
    }
    #cursorX{
        border:0;
        left:0;
        width:100%;
        height:1px;
    }
    #cursorY{
        border:0;
        top:0;
        height:100%;
        width:1px;
    }
   .btn-info.borderRright{
        border-right:1px solid #fff !important;
        border-right-color:#fff !important;
        z-index: 99;
        margin-right:0px;
        float:left;
    }
    .specialLeft.dropup{
        margin-left:10px;
        float:left;
    }
  .dropdown-menu .row.noMargin{
    margin-left:0;
    margin-right:0;
    margin-bottom:10px;
    line-height:35px;
  }
  .row.noMargin .text-right{
    white-space: nowrap;
    padding:0;
  }
</style>
