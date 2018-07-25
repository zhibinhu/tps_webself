<template>
    <div>
        <ol class="breadcrumb">
            <li class="breadcrumb-item">        <router-link to="/">首页</router-link>      </li>
            <li class="breadcrumb-item">
                <router-link to="/plan">计划管理</router-link>
            </li>
            <li class="breadcrumb-item active">计划详情</li>
        </ol>
        <div style="margin-left: 10px">
            <div class="col-md-5">
                <a href="javascript:void(0);" class="btn btn-primary planTab" :class="{curShow:curShowFlag}" @click="changePlanShow(0)">计划管理</a>
                <a href="javascript:void(0);" class="btn btn-primary planTab" :class="{curShow:curShowFlag1}" @click="changePlanShow(1)">计划设计</a>
                <a href="javascript:void(0);" class="btn btn-primary planTab" :class="{curShow:curShowFlag2}" @click="changePlanShow(2)">计划评估</a>
            </div>
        </div>
        <div class="planManage">
            <div class="patentInfos">
                <table>
                    <tr>
                        <td rowspan="2" class="head"><span>患者信息</span></td>
                        <td>患者姓名：<span v-html="planInfo.name"></span></td>
                        <td>诊断：<span v-html="planInfo.diagnose"></span></td>
                        <td>所在医院：<span v-html="planInfo.hospital"></span></td>
                    </tr>
                    <tr>
                        <td>患者病历号：<span v-html="planInfo.hospno"></span></td>
                        <td>年龄：<span v-html="planInfo.age"></span></td>
                        <td>主管大夫：<span v-html="planInfo.doctor"></span></td>
                    </tr>
                </table>
            </div>
            <div class="managePlan" v-show="planShow == 0">
                <div class="pull-left leftImg">
                    <img :src=this.imagePath alt=""/>
                </div>
                <div class="pull-left rightAction">
                    <p>
                        <button :id="planInfo.id+'-1'" class="btn btn-info" :title="downloadTitle"
                                @click="download(planInfo.id)">下载
                        </button>
                        <button class="btn btn-info" data-toggle="modal" data-target="#auth" :title="deleteTitle"
                                :disabled="isThisLock">删除
                        </button>
                    </p>
                    <p>
                        <button class="btn btn-info">发送</button>
                        <button class="btn btn-info" @click="protect(planInfo.id, planInfo.isLock)" id="protect"
                                :title="protectTitle" :disabled="notProtected">保护
                        </button>
                    </p>
                </div>
            </div>
            <div v-if="planShowDiv==1">
                <plan-design :imageId="imageId" :imageParams="imageParams" :myPlanId="myPlanId" :fileLength="fileLength" :planningId="planningId"></plan-design>
            </div>
            <div v-if="planShowDiv == 2">
                <!--<plan-estimate :fileLength="fileLength" :dosageLength="dosageLength" :doseId="planInfo.id" :imageId="imageId" v-show="planShow==1" ></plan-estimate>-->
                <planEstimate :fileLength="fileLength" :dosageLength="dosageLength" :doseId="planInfo.id" :imageId="imageId" :imageParams="imageParams"></planEstimate>
            </div>

            <!--验证窗口-->
            <div id="auth" class="modal fade">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-body">
                            <button class="close" data-dismiss="modal">
                                <span>&times;</span>
                            </button>
                        </div>
                        <div class="modal-title">
                            <h1 class="text-center">签字确认</h1>
                        </div>
                        <div class="modal-body">
                            <form class="form-group" @submit.prevent="remove(planInfo.id)">
                                <div class="form-group">
                                    <label>用户名</label>
                                    <input class="form-control" type="text" v-model="username" placeholder=""/>
                                </div>
                                <div class="form-group">
                                    <label>密码</label>
                                    <input class="form-control" type="password" v-model="password" placeholder=""/>
                                </div>
                                <div style="text-align: center">
                                    <button class="btn btn-primary" type="submit">确认</button>
                                    &nbsp; &nbsp; &nbsp; &nbsp;
                                    <button class="btn btn-danger" data-dismiss="modal">取消</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {Plan, Auth,cancelPlan,cancelforDose,cancelforDoseLoad} from '../../resources'
    import {delOne, protect} from '../../misc/utils'
    import planDesign from './design.vue'
    import planEstimate from './dosage.vue'

    export default {
        data: () => ({
            planShow: 0,
            planShowDiv:0,
            designShow:0,
            designShowDiv:0,
            imagePath: '',
            isThisLock: true,
            notProtected: true,
            downloadTitle: '',
            deleteTitle: '',
            protectTitle: '',
            planInfo: {
                id: 0,
                name: '',
                age: '',
                diagnose: '',
                hospno: '',
                hospital: '',
                doctor: '',
                isLock: 0
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
                volumeOri:0,
                patient:{
                    patientName:'',
                    gender:'',
                    id:'',
                    patientPosition:0,
                    gatherDate:'',
                    gatherTime:''
                }
            },
            planningId:'',
            myPlanId:'',
            imageId:"",
            username: '',
            password: '',
            curShowFlag:true,
            curShowFlag1:false,
            curShowFlag2:false,
            fileLength:0,//底图总字节数
            dosageLength:0 //剂量图总字节数
        }),
        beforeRouteEnter(to, from, next) {
            let id = to.params.id;

            Plan.getInfo(id).then(res => {
                console.log('res')
                console.log(res)
                next(vm => {
                    vm.imageId=res.data.imageId;
                    vm.planningId=res.data.planningId;
                    vm.myPlanId=id;
                    vm.planInfo.id = id;
                    vm.planInfo.name = res.data.name;
                    vm.planInfo.age = res.data.age;
                    vm.planInfo.diagnose = res.data.diagnose;
                    vm.planInfo.hospno = res.data.hospno;
                    vm.planInfo.hospital = res.data.hospital;
                    vm.planInfo.doctor = res.data.doctor;
                    vm.planInfo.isLock = res.data.isLock;
                    vm.dosageLength=res.data.dosageLength;
                    vm.fileLength=res.data.fileLength;

                    vm.imageParams.fileNum = res.data.fileNum;
                    vm.imageParams.width = res.data.width;
                    vm.imageParams.height = res.data.height;
                    vm.imageParams.rowPixelSpacing = res.data.rowPixelSpacing;
                    vm.imageParams.columnPixelSpacing = res.data.columnPixelSpacing;
                    vm.imageParams.intercept = res.data.intercept;
                    vm.imageParams.slope = res.data.slope;
                    vm.imageParams.windowWidth = res.data.windowWidth;
                    vm.imageParams.windowCenter = res.data.windowCenter;
                    vm.imageParams.doseGridScaling=res.data.doseGridScaling;
                    vm.imageParams.largestImagePixelValue=res.data.largestImagePixelValue;
                    if (vm.planInfo.isLock == 1) {

                        vm.imageParams.sliceThickness = res.data.sliceThickness;

                        vm.imageParams.volumeOri = res.data.volumeOri;

                        // vm.patient.gender=res.data.patient.gender;
                        // vm.imageParams.patient.created=res.data.patient.created;
                        vm.imageParams.patient.patientName = res.data.patient.patientName;
                        vm.imageParams.patient.gender = res.data.patient.gender;
                        vm.imageParams.patient.id = res.data.patient.id;
                        vm.imageParams.patient.patientPosition = res.data.patient.patientPosition;
                        vm.imageParams.patient.gatherDate = res.data.gather.gatherDate;
                        vm.imageParams.patient.gatherTime = res.data.gather.gatherTime;

                        if (vm.planInfo.isLock == 1) {
                            // vm.patient.gender=res.data.patient.gender;
                            vm.imageParams.patient.hospno = res.data.patient.hospno;
                            vm.imageParams.patient.id = res.data.patient.id;
                            vm.imageParams.patient.patientName = res.data.patient.patientName;
                            vm.imageParams.patient.treatId = res.data.patient.treatId;
                            vm.imageParams.patient.treatInfo = res.data.patient.treatInfo;
                            vm.imageParams.patient.gender = res.data.patient.gender;
                            vm.isThisLock = true;
                            vm.deleteTitle = '保护关闭后可删除';
                            vm.protectTitle = '计划保护已开启';
                        } else {
                            vm.isThisLock = false;
                            vm.protectTitle = '计划保护已关闭';
                            $("#protect").css('background', '#6e6e6c')
                        }

                        if (res.data.canProtect == 1) {
                            vm.notProtected = false;
                        } else {
                            vm.protectTitle = '您没有修改保护状态的权限';
                        }

                        if (res.data.isLocal == 0) {
                            vm.isThisLock = true;
                            vm.deleteTitle = '您不能修改此医院的计划数据';
                            vm.notProtected = true;
                            vm.protectTitle = '您不能修改此医院的计划数据';
                        }

                        vm.$nextTick(() => vm.$store.state.isLoading = false)
                    }
                });
            })
        },
        destroyed(){
            window.location.reload();
        },
        mounted() {
            this.imagePath = 'static/img/placeholder1.png';
        },
        methods: {
            //切换页签
            changePlanShow(status) {
                this.designShow = status;
                this.planShow = status;
                this.curShowFlag=false;
                this.curShowFlag1=false;
                this.curShowFlag2=false;
                if (status == 1) {
                    this.planShowDiv=1;
                    this.curShowFlag1=true;
                    cancelforDose('上次的剂量底图请求已取消');
                    cancelforDoseLoad('上次的剂量请求已取消');
                }else if(status==2){
                    this.planShowDiv=2;
                    this.curShowFlag2=true;
                    cancelPlan('上次的CT图请求已取消');
                }else{
                    this.planShowDiv=0;
                    this.curShowFlag=true;
                    cancelPlan('上次的CT图请求已取消');
                    cancelforDose('上次的剂量底图请求已取消');
                    cancelforDoseLoad('上次的剂量请求已取消');
                }
            },
            //计划下载
            download(id) {
                let downloadId1 = id + "-1";
                $("#" + downloadId1).attr("disabled", true);
                this.downloadTitle = '正在下载中......';
                Plan.download(id).then(response => {
                    $("#" + downloadId1).attr("disabled", false);
                    this.downloadTitle = '';
                })
            },
            //计划逻辑删除
            remove(id) {
                Auth.validationInformation({name: this.username, pass: this.password}).then(response => {
                    console.log(JSON.stringify(response))
                    if (response.data.result.code == 1) {
                        this.$validator.validateAll().then(success => {
                            if (!success) return
                            $(".modal-backdrop").css("opacity", "0");
                            $(".modal-backdrop").css("display", "none");
                            delOne(this, Plan, id)
                        })
                    } else {
                        swal(response.data.result.msg, 'error')
                    }
                })
            },
            //计划保护
            protect(id, isLock) {
                protect(this, Plan, id, isLock)
            },
            //计划详情重载
            reload(id) {
                Plan.getInfo(id).then((res) => {
                    this.planInfo.isLock = res.data.isLock;

                    if (this.planInfo.isLock == 1) {
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
        },
        components: {planEstimate,planDesign}
    }
</script>
<style>
    .btn.planTab {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        margin-left: 10px;
        border:0;
        box-shadow: 0 0 5px #ccc;
        padding:0.5rem 2rem;
        background:#fff;
        color:#333;
    }
    .btn.planTab.curShow{
        background:#54a0ff;
        color:#fff;
    }
    .rightAction p button.btn-info{
        background-color:#54a0ff;
        padding:0.5rem 2rem;
    }

    .planManage {
        padding: 10px;
        background:#fff;
        box-shadow: 0 0 5px #ccc;
        overflow: hidden;
        margin:5px;
        margin-top:0;
    }

    .planManage h3 {
        font-size: 16px;
        color: #333;
        font-weight: normal;
        border-bottom: 1px solid #eee;
        line-height: 25px;
    }

    .planManage p.patInfo {
        line-height: 20px;
        font-size: 14px;
        padding-left: 10px;
        padding-top: 10px;
    }

    .planManage p.patInfo span {
        padding-right: 20px;
    }

    .managePlan {
        padding: 10px;
        overflow:hidden;
    }

    .managePlan .leftImg {
        width: 512px;
        height: 512px;
        background: #ccc;
        border-radius: 10px;
    }

    .managePlan .rightAction {
        padding-left: 10px;
        padding-top: 100px;

    }

    .managePlan .rightAction button.btn {
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
