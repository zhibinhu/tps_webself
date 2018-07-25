<template>
    <div>
        <div class="leadDoorBox">
            <div class="leadCoor">X(cm)</div>
            <div class="row">
                <div class="col-md-6 col-sm-6">
                    <span class="pull-left coorName">x1</span>
                    <input type="number" placeholder="4" max="100" min="1" id="inputRelat1" @keyup="relatx2" class="form-control pull-right"/>
                </div>
                <div class="col-md-6 col-sm-6">
                    <span class="pull-left coorName">x2</span>
                    <input type="number" placeholder="4" max="100" min="1" id="inputRelat2" @keyup="relatx1" class="form-control pull-right" />
                </div>
            </div>
            <div class="leadCoor">Y(cm)</div>
            <div class="row">
                <div class="col-md-6 col-sm-6">
                    <span class="pull-left coorName">y1</span>
                    <input type="number" placeholder="6" max="100" min="1" id="inputRelaty1" @keyup="relaty2" class="form-control pull-right" />
                </div>
                <div class="col-md-6 col-sm-6">
                    <span class="pull-left coorName">y2</span>
                    <input type="number" placeholder="6" max="100" min="1" id="inputRelaty2" @keyup="relaty1" class="form-control pull-right" />
                </div>
            </div>
            <div class="text-center">
                <button class="btn btn-info btn-sm relatOrNot" @click="relatOrNot">非对称</button>
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
        props:['portalId','zIndex'],
        data(){
            return {
                clickRelate:0,
            }
        },
        mounted(){
              this.backLeadDoor();//回显铅门参数
        },
        methods:{
            relatx2(){
              var relateBtn=$('button.relatOrNot').text();
              if(relateBtn=='非对称'){
                  $('#inputRelat2').val($(event.target).val());
              }
            },
            relatx1(){
                var relateBtn=$('button.relatOrNot').text();
                if(relateBtn=='非对称'){
                    $('#inputRelat1').val($(event.target).val());
                }
            },
            relaty2(){
                var relateBtn=$('button.relatOrNot').text();
                if(relateBtn=='非对称'){
                    $('#inputRelaty2').val($(event.target).val());
                }
            },
            relaty1(){
                var relateBtn=$('button.relatOrNot').text();
                if(relateBtn=='非对称'){
                    $('#inputRelaty1').val($(event.target).val());
                }
            },
            relatOrNot(e){
                this.clickRelate++;
                if(this.clickRelate%2==1){
                    $(e.target).text('对称')
                    //X/Y此时是无关联状态

                }else{
                    $(e.target).text('非对称');
                }
            },
            backPos() {
                this.confirmLeadDoor();
                $('.buye .setDotParams').val('-1');
                this.$store.state.mySelectVal=-1;
                $('#myModalSet').modal('hide');
            },
            confirmLeadDoor(){
                var paramsLeadDoor={};
                var inputRelat1Val=$.trim($('#inputRelat1').val());
                var inputRelat2Val=$.trim($('#inputRelat2').val());
                var inputRelaty1Val=$.trim($('#inputRelaty1').val());
                var inputRelaty2Val=$.trim($('#inputRelaty2').val());

                paramsLeadDoor.id=this.portalId;
                paramsLeadDoor.position='('+inputRelat1Val+','+inputRelat2Val+','+inputRelaty1Val+','+inputRelaty2Val+')';
                paramsLeadDoor.sliceIndex=this.zIndex;
                console.log('paramsLeadDoor---------,',paramsLeadDoor);
                Portal.getLeadDoor(paramsLeadDoor).then(res=>{
                    console.log('res-leadDoorConfirm===========',res);
                    layer.msg(res.data.msg);
                })

            },
            backLeadDoor(){
                Portal.backLeadDoor(this.portalId).then(res=>{
                     console.log('resleadDoor--------',res);
                     if(res.data.data) {
                         var posData = res.data.data.position;
                         var posDataArr = posData.split(',');
                         $('#inputRelat1').val(posDataArr[0].substring(1));
                         $('#inputRelat2').val(posDataArr[1]);
                         $('#inputRelaty1').val(posDataArr[2]);
                         $('#inputRelaty2').val(posDataArr[3].substring(0, posDataArr[3].length - 1));
                     }
                })
            }
        }

    }
</script>
<style>
    .leadDoorBox .leadCoor{
        padding:10px 0 5px 0;
    }
    .leadDoorBox input{
        width:90%;
    }
    .leadDoorBox span.coorName{
        line-height:35px;
    }
    .leadDoorBox .relatOrNot{
        margin:10px;
    }
</style>
