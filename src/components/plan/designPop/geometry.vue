<template>
    <div>
        <div class="geometryBox">
            <div class="row">
                <div class="col-md-6 col-sm-6">
                    <p>床(deg)</p>
                    <input type="number" class="form-control" id="bed" value="0" max="100" min="0" />
                </div>
                <div class="col-md-6 col-sm-6">
                    <p>准直器(deg)</p>
                    <input type="number" class="form-control" id="colli" value="0" max="100" min="0" />
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 col-sm-6">
                    <p>机架(deg)</p>
                    <input type="number" class="form-control" id="gantry" value="0" max="100" min="0" />
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
        props:["portalId"],
        data(){
            return {

            }
        },
        mounted(){
            this.backGeometry();
            $('#bed,#colli,#gantry').blur(function () {
               var thisVal=$.trim($(this).val());
               if(thisVal==''){
                   $(this).val(0);
               }
            });
        },
        methods:{
            backPos() {
                this.getGeometry();
                $('.buye .setDotParams').val('-1');
                this.$store.state.mySelectVal=-1;
                $('#myModalSet').modal('hide');
            },
            getGeometry(){
                var geometryParams={};
                geometryParams.id=this.portalId;
                geometryParams.bed=$('#bed').val();
                geometryParams.collimator=$('#colli').val();
                geometryParams.gantry=$('#gantry').val();
                geometryParams.userId=User.current().id;
                console.log('geometryParams---------',geometryParams)
                Portal.getGeometry(geometryParams).then(res=>{
                    console.log('res------------',res);
                    if(res.data.msg=='success'){
                        layer.msg('操作成功！')
                    }
                })
            },
            backGeometry(){
                Portal.backGeometry(this.portalId).then(res=>{
                    console.log('backGbackGeometry------',res);
                    if(res.data.data) {
                        if (res.data.data.bed) {
                            $('#bed').val(res.data.data.bed);
                        } else {
                            $('#bed').val(0);
                        }
                        if (res.data.data.collimator) {
                            $('#colli').val(res.data.data.collimator);
                        } else {
                            $('#colli').val(0);
                        }
                        if (res.data.data.gantry) {
                            $('#gantry').val(res.data.data.gantry);
                        } else {
                            $('#gantry').val(0);
                        }
                    }
                })
            }
        }
    }

</script>

<style>
    .geometryBox p{
        padding:10px 0 5px 0;
    }
</style>