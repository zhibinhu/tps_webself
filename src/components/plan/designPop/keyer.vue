<template>
    <div>
        <div class="keyerBox">
            <div class="bigTitle">多叶光栅</div>
            <div class="row">
                 <button class="btn btn-sm pull-left keyTit redBtn" @click="noAuto1">手动</button>
                 <div class="pull-right input-group">
                    <input type="number" min="1" max="100" id="distance" class="form-control" placeholder="" aria-describedby="basic-addon2">
                    <span class="input-group-addon" id="basic-addon2">mm</span>
                    <span class="input-group-addon" id="basic-addon3">边界</span>
                 </div>
            </div>
            <div class="bigTitle">楔形板</div>
            <div class="row">
                <div class="col-md-4 col-sm-4">
                    <span class="pull-left keyTit">类型</span>
                    <select class="form-control pull-right" id="boardType" @change="changeType">
                        <option value="物理">物理</option>
                        <option value="动态">动态</option>
                    </select>
                </div>
                <div class="col-md-4 col-sm-4">
                    <span class="pull-left keyTit">角度</span>
                    <select class="form-control pull-right" id="angleSelect">
                        <option value="">请选择</option>
                        <option value="15">15deg</option>
                        <option value="30">30deg</option>
                        <option value="45">45deg</option>
                        <option value="60">60deg</option>
                    </select>
                    <p class="form-control"  id="angleInput" style="display:none;line-height:35px;border:0;padding:0">
                    <input type="number" max="60" min="0" class="form-control pull-left" style="width:65px;"/>
                    <span class="pull-left">deg</span>
                    </p>
                </div>
                <div class="col-md-4 col-sm-4">
                    <span class="pull-left keyTit">方向</span>
                    <select class="form-control pull-right" id="direction">
                        <option value="">请选择</option>
                        <option value="薄">薄</option>
                        <option value="厚">厚</option>
                    </select>
                </div>

            </div>
            <div class="bigTitle">补偿膜</div>
            <div class="row">
                <button class="btn btn-sm pull-left keyTit redBtn" @click="noAuto2">手动</button>
                <div class="pull-right input-group">
                    <input type="number" min="1" max="100" class="form-control" id="strong" disabled="disabled" placeholder="" aria-describedby="basic-addon2">
                    <span class="input-group-addon">mm</span>
                    <span class="input-group-addon">厚度</span>
                </div>
            </div>
        </div>
        <div class="text-right" style="padding-top:10px;">
            <button type="button" class="btn btn-info" data-dismiss="modal"  @click="backPos">确认</button>
        </div>
    </div>
</template>
<script>
    import {Portal} from '../../../resources';
    export default {
        props:["portalId"],
        data(){
            return {
                clickNum1:0,
                clickNum2:0
            }
        },
        mounted(){
          this.backTzq();//回显调制器
        },
        methods:{
            changeType(){
                let thisVal=$(event.target).find('option:selected').val();
                if(thisVal=="物理"){
                    $('#angleSelect').show();
                    $('#angleInput').hide();
                }else{
                    $('#angleSelect').hide();
                    $('#angleInput').show();
                }
            },
            noAuto1(e){
                this.clickNum1++;
                if(this.clickNum1%2==1) {
                    $(e.target).css({
                        'background': 'green'
                    })
                    $(e.target).parent().find('input').attr('disabled','disabled');
                }else{
                    $(e.target).css({
                        'background': 'red'
                    })
                    $(e.target).parent().find('input').removeAttr('disabled');
                }
            },
            noAuto2(e){
                this.clickNum2++;
                if(this.clickNum2%2==1) {
                    $(e.target).css({
                        'background': 'green'
                    })
                    $(e.target).parent().find('input').removeAttr('disabled')
                }else{
                    $(e.target).css({
                        'background': 'red'
                    })
                    $(e.target).parent().find('input').attr('disabled','disabled');
                }
            },
            backPos() {
                this.confirmTzq();
                $('.buye .setDotParams').val('-1');
                this.$store.state.mySelectVal=-1;
                $('#myModalSet').modal('hide');
            },
            backTzq(){
                //回显多页光栅
               Portal.backMic(this.portalId).then(res=>{
                   console.log('backMic--------',res);
                   if(res.data.data) {
                       var MicVal = res.data.data.distance;
                       if (MicVal) {
                           $('#distance').val(MicVal);
                       }
                   }
               });
               //回显楔形版
               Portal.backPlate(this.portalId).then(res=>{
                   console.log('backPlate-----',res);
                   if(res.data.data) {
                       var plateType = res.data.data.type;
                       var angle = res.data.data.angle;
                       var direction = res.data.data.direction;
                       if (plateType) {
                           $('#boardType').val(plateType);
                           if (plateType == '物理') {
                               $('#angleInput').hide();
                               $('#angleSelect').show().val(angle);
                           } else {
                               $('#angleInput').show().find('input').val(angle);
                               $('#angleSelect').hide();
                           }
                       }
                       if (direction) {
                           $('#direction').val(direction);
                       }
                   }
               })
                //回显补偿膜
                Portal.backCompensation(this.portalId).then(res=>{
                    console.log('rescompensation=-------',res);
                    if(res.data.data) {
                        if (res.data.data.height) {
                            $('#strong').val(res.data.data.height);
                        }
                    }
                })
            },
            confirmTzq(){
                //确认多页光栅
                var parmsMic={};
                parmsMic.id=this.portalId;
                parmsMic.distance=$.trim($('input#distance').val());
                Portal.getMic(parmsMic).then(res=>{
                    console.log('resMIC------',res);
                })
                //确认楔形板
                var paramsPlate={};
                paramsPlate.id=this.portalId;
                paramsPlate.type=$('#boardType').find('option:selected').text();
                if($('#angleInput')[0].style.display=='none'){
                    if($('#angleSelect').find('option:selected').text()!='请选择') {
                        paramsPlate.angle = parseInt($('#angleSelect').find('option:selected').text());
                    }else{
                        paramsPlate.angle='';
                    }
                }else{
                    paramsPlate.angle=$.trim($('#angleInput input').val());
                }
                if($('#direction').find('option:selected').text()!='请选择') {
                    paramsPlate.direction = $('#direction').find('option:selected').text();
                }else{
                    paramsPlate.direction='';
                }
                console.log('paramsPlate--------',paramsPlate);
                Portal.confirmPlate(paramsPlate).then(res=>{
                    console.log('paramsPlate-------',res);
                })
                //确认补偿膜
                var paramsCompensation={};
                paramsCompensation.id=this.portalId;
                paramsCompensation.height=$.trim($('#strong').val());
                paramsCompensation.name='';
                paramsCompensation.type='';
                console.log('paramsCompensation=========',paramsCompensation);
                Portal.confirmCompensation(paramsCompensation).then(res=>{
                    console.log('resCompsationConfirm-------',res);
                })
                //确认三项均已返回结果
              Promise.all([Portal.getMic(parmsMic),Portal.confirmPlate(paramsPlate),Portal.confirmCompensation(paramsCompensation)]).then(([a,b,c])=>{
                 console.log('a-------',a,'b-------',b,'c----------',c);
                 if(a.data.code==0 && b.data.code==0 && c.data.code==0){
                   layer.msg(a.data.msg+',无法更新调制器！');
                 }
                 if(a.data.code==1 && b.data.code==1 && c.data.code==1){
                   layer.msg('调制器更新成功！');
                 }
              });
            }
        }

    }
</script>

<style>
    .keyerBox .row{
     margin-left:0;
     margin-right:0;
    }
    .keyerBox .bigTitle{
        padding:10px 0 5px 0;
    }
    .keyerBox .redBtn{
        background:red;
        color:#fff;
        cursor: pointer;
    }
    .keyerBox .input-group{
        width:80%;
    }
    .keyerBox select{
        width:70%;
    }
    .keyerBox .keyTit{
        line-height:35px;
    }
</style>
