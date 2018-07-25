<template>
    <div>
        <div class="characterBox">
            <div class="row">
                <div class="col-md-6 col-sm-6">
                    <span class="titline">照射野ID</span>
                    <input type="text" class="form-control pull-right" v-model="portalId" disabled="disabled"/>
                </div>
                <div class="col-md-6 col-sm-6">
                    <span class="titline">等中心</span>
                    <select class="form-control pull-right" id="center">
                        <option value="">请选择</option>
                    </select>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 col-sm-6">
                    <span class="titline">能量</span>
                    <select class="form-control pull-right" id="energy">
                        <option value="">请选择</option>
                    </select>
                </div>
                <div class="col-md-6 col-sm-6">
                    <span class="titline">颜色显示</span>
                    <select class="form-control pull-right" id="color">
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
            </div>
            <div class="row">
                <div class="col-md-6 col-sm-6">
                    <span class="titline">机器</span>
                    <input class="form-control pull-right" id="machineName"/>
                </div>
                <div class="col-md-6 col-sm-6">
                    <span class="titline">治疗形式</span>
                    <select class="form-control pull-right" id="therapyType" @change="showSd">
                        <option value="-1">请选择</option>

                    </select>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 col-sm-6">
                    <span class="titline">射线</span>
                    <select class="form-control pull-right" id="ray">
                        <option value="">请选择</option>
                    </select>
                </div>
                <div class="col-md-6 col-sm-6">
                    <span class="titline">剂量率</span>
                    <select class="form-control pull-right" id="doseRate">
                        <option value="">请选择</option>
                    </select>
                </div>
            </div>
            <div class="row" id="showOrHideSd">
                <div class="col-md-6 col-sm-6 pull-left">
                    <span class="titline">源皮距</span>
                    <input type="number" id="originSkin" class="form-control pull-right" value="90" max="1000" min="0"/>
                </div>
                <div class="col-md-6 col-sm-6 pull-right">
                    <span class="titline">源轴距</span>
                    <input type="number" id="originAxis" class="form-control pull-right" value="100" max="1000" min="0"/>
                </div>
            </div>
        </div>
        <div class="text-right" style="padding-top:10px;">
            <button type="button" class="btn btn-info" data-dismiss="modal"  @click="backPos">确认</button>
        </div>
    </div>
</template>


<script>
    import {Portal,User} from '../../../resources'
    export default {
        props:["portalId","poiId","planningId"],
        data(){
            return{


            }
        },
       mounted(){
            this.fillDotParams();
            $('#originSkin,#originAxis').keyup(function () {
               var thisVal=$.trim($(this).val());
               if(thisVal==''){
                   $(this).val(0);
               }
            });

        },
        methods:{
            backLastData(){
                  Portal.getBility(this.portalId).then(res=>{
                      console.log('res,,,,,,,,',res);
                      if(res.data.data) {
                          $('#center').val(res.data.data.portal.poiId);
                          if (res.data.data.energy) {
                              $('#energy').val(res.data.data.energy.name);
                          }
                          if (res.data.data.portal.color) {
                              $('#color').val(res.data.data.portal.color);
                          } else {
                              $('#color').val('rgb(232,145,5)');
                          }
                          if (res.data.data.portal.therapyType) {
                              $('#therapyType').val(res.data.data.portal.therapyType);
                              $('#showOrHideSd').show();
                              if (res.data.data.portal.ssd) {
                                $('#originSkin').val(res.data.data.portal.ssd);
                              } else {
                                $('#originSkin').val(90);
                              }
                              if (res.data.data.portal.sad) {
                                $('#originAxis').val(res.data.data.portal.sad);
                              } else {
                                $('#originAxis').val(100);
                              }
                          }
                          if (res.data.data.ray) {
                              $('#ray').val(res.data.data.ray.name);
                          }
                          if (res.data.data.portal.doseRate) {
                              $('#doseRate').val(res.data.data.portal.doseRate);
                          }

                      }
                  })
            },
            backPos() {
                var params={};
                params.id=this.portalId;
                params.poiId=$('#center').val();
                params.planningId=this.planningId;
                params.energy=$('#energy').find('option:selected').text()=='请选择'?null:$('#energy').find('option:selected').text();
                params.color=$('#color').find('option:selected').val();
                params.therapyType=$('#therapyType').find('option:selected').text()=='请选择'?null:$('#therapyType').find('option:selected').text();
                params.doseRate=$('#doseRate').find('option:selected').text()=='请选择'?null:$('#doseRate').find('option:selected').text();
                params.ssd=$('#therapyType').find('option:selected').text()!='请选择'?$('#originSkin').val():'';
                params.sad=$('#therapyType').find('option:selected').text()!='请选择'?$('#originAxis').val():'';
                params.userId=User.current().id;
                params.ray=$('#ray').find('option:selected').text()=='请选择'?null:$('#ray').find('option:selected').text();
                console.log('params--------',params);
                Portal.confirmPerformance(params).then(res => {
                    console.log('rrrrrr,,,,,,,,,', res);
                    if(res.data.msg=='success'){
                        layer.msg('操作成功！')
                    }

                })
                $('.buye .setDotParams').val('-1');
                this.$store.state.mySelectVal=-1;
                $('#myModalSet').modal('hide');
            },
            fillDotParams(){
//                alert(this.poiId);
                Portal.getByPoi(this.poiId).then(res=>{
                    console.log('portal-----------',res);
                    if(res.data.data) {
                        if (res.data.data.acceleratorName == undefined) {
                            return;
                        }
                        $('#machineName').val(res.data.data.acceleratorName);
                        ///等中心
                        var delDotSelect=$('#delDot').html();
                        $('#center').html(delDotSelect);
                        $('#center').find('option').eq(0).remove();
                        for (var i = 0; i < res.data.data.doseRates.length; i++) {
                            $('#doseRate').append('<option value="'+res.data.data.doseRates[i]+'">' + res.data.data.doseRates[i] + '</option>');
                        }
                        for (var i = 0; i < res.data.data.energies.length; i++) {
                            $('#energy').append('<option value="'+ res.data.data.energies[i]+'">' + res.data.data.energies[i] + '</option>')
                        }
                        for (var i = 0; i < res.data.data.rays.length; i++) {
                            $('#ray').append('<option  value="'+res.data.data.rays[i]+'">' + res.data.data.rays[i] + '</option>')
                        }
                        for (var i = 0; i < res.data.data.therapyTypes.length; i++) {
                            $('#therapyType').append('<option value="'+res.data.data.therapyTypes[i]+'">' + res.data.data.therapyTypes[i] + '</option>')
                        }
                    }
                    this.backLastData();//回显性能参数上次设置的数据
                });
            },
            showSd(event){
              var curVal=$(event.target).find('option:selected').val();
              if(curVal!=-1){
                $('#showOrHideSd').show();
              }else{
                $('#showOrHideSd').hide();
              }
          }
        }
    }

</script>



<style>
    .characterBox input,.characterBox select{
        width:70%;
    }
    .characterBox span.titline{
        line-height:35px;
        float:left;
    }
    .characterBox .row{
        padding:10px 0;
        overflow:hidden;
    }
  #showOrHideSd{
    display:none;
  }
</style>
