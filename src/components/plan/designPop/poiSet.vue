<template>
    <div>
        <div class="poiBox">
            <div class="row">
                <div class="col-md-6 col-sm-6 text-left">
                    <p class="titPad">颜色显示</p>
                    <p>
                        <select class="form-control" id="selectColor" ref="selectColor" @click="changeColor">
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
                    </p>
                </div>
                <div class="col-md-6 col-sm-6 text-left">
                    <p class="titPad">直径</p>
                    <div class="pull-right input-group">
                        <input type="number" value="50" ref="maxDiameter" min="1" class="form-control" id="diameter" @blur="changeDiameter"/>
                        <span class="input-group-addon" id="basic-addon2">mm</span>
                    </div>
                </div>
            </div>
            <div class="titPad">DICOM坐标</div>
            <div class="row coorDes">
                <div class="col-md-4 col-sm-4">
                    <span>X:</span><input type="text" class="form-control pull-right coordinate"/>
                </div>
                <div class="col-md-4 col-sm-4">
                    <span>Y:</span><input type="text" class="form-control pull-right coordinate"/>
                </div>
                <div class="col-md-4 col-sm-4">
                    <span>Z:</span><input type="text" class="form-control pull-right coordinate"/>
                </div>
            </div>
            <div class="titPad">POI坐标</div>
            <div class="row coorDes">
                <div class="col-md-4 col-sm-4">
                    <span>X:</span><input type="text" class="form-control pull-right coordinate"/>
                </div>
                <div class="col-md-4 col-sm-4">
                    <span>Y:</span><input type="text" class="form-control pull-right coordinate"/>
                </div>
                <div class="col-md-4 col-sm-4">
                    <span>Z:</span><input type="text" class="form-control pull-right coordinate"/>
                </div>
            </div>
        </div>
        <div class="text-right" style="padding-top:10px;">
            <button type="button" class="btn btn-info" data-dismiss="modal"  @click="backPos">确认</button>
        </div>
    </div>
</template>
<script>

    export default {
        props:["poiNumAbs","poiColor","curPoiR","poiMaxR","drawScale"],
        data(){
            return {
                message:'helloWorld',
                maxDiameter:0,
                poiSetMessage:{
                   color:'',
                   diameter:''
                },

            }
        },
        mounted(){
            this.poiSetMessage.color=$('#selectColor').find('option:selected').val();
            this.$refs.maxDiameter.max=this.poiMaxR;
            this.$refs.maxDiameter.value=this.curPoiR;
            this.poiSetMessage.diameter=$('#diameter').val();
            this.$refs.selectColor.value=this.poiColor;
            this.poiSetMessage.color=this.poiColor;
//            alert(this.$refs.maxDiameter.max)
        },
        methods:{
            changeColor(e){
              let newColor=$(e.target).find('option:selected').val();
              this.poiSetMessage.color=newColor;
            },
            changeDiameter(e){
                let newDiameter=$(e.target).val();
                if(parseInt(newDiameter)>parseInt($(e.target).attr('max'))){
                    var maxD=parseInt($(e.target).attr('max'));
                    $(e.target).val(maxD);
                    newDiameter=maxD;
                }
                this.poiSetMessage.diameter=newDiameter;
            },
            backPos() {
                $('.buye .setDotParams').val('-1');
                this.$emit('passPoiMessage',this.poiSetMessage);
                this.$parent.updatePoiSet(this.poiSetMessage.color,this.poiSetMessage.diameter);//更新父组件中的设置
                this.$parent.initPoiCircle(this.poiNumAbs,true,this.poiSetMessage.color,this.drawScale);//重绘新的感兴趣球
                this.$parent.backPos();
            },
        }
    }



</script>









<style>
    .poiBox .titPad{
       padding:10px 0 5px 0;
    }
   .poiBox .coordinate{
       width:80%;
       vertical-align: middle;
    }
    .coorDes span{
        float:left;
        line-height: 35px;
    }
</style>