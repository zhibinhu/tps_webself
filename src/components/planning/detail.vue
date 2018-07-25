<template>
  <div>
    <div style="position:relative;">
      <div style="position:absolute;right:390px;top:10px;">
        <router-link :to="'/image/detail/'+nowImageId+'?studyUID='+suid" class="btn btn-info rounded" v-if=" ((planning.status == 2)||(planning.status == 4)||(planning.status == 5) ||(planning.status == 9)) ">
          <i class="ms-icon-document">
            <img src="../image/img/chakan.png" alt="">
          </i>查看影像
        </router-link>
      </div>
      <div class="dropdown" style="float:right;margin-top: 10px;margin-right: 100px;"
           v-if="relativeUsers.length > 0">
        <button class="btn btn-info dropdown-toggle rounded" type="button" id="chat" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="true">
          在线交流
          <span class="caret"></span>
        </button>
        <!--在线的关联用户-->
        <ul class="dropdown-menu" aria-labelledby="chat">
          <li v-for="(item, index) in relativeUsers" @click="inviteChat(item.id, item.name)" style="white-space:nowrap;padding-left:2px;cursor:pointer;">
            <span v-html="item.name" style="font-size: 16px"></span>
            <span class="text-success" style="font-size: 10px" v-if="item.isOnline == 1">在线</span>
            <span class="text-danger" style="font-size: 10px" v-if="item.isOnline == 0">离线</span>
            <span v-html="item.hospital" style="font-size: 12px"></span>
          </li>
        </ul>
      </div>
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/">首页</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link to="/planning">计划申请</router-link>
        </li>
        <li class="breadcrumb-item active">计划详情</li>
      </ol>
    </div>

    <div style="margin-bottom: 15px;margin-top: 11px;margin-left:10%;margin-right: 10%">
      <Steps :current="currentNum">
        <Step id="step1" title="靶区勾画" content="已完成"></Step>
        <Step id="step2" title="计划设计" content="已完成"></Step>
        <Step id="step3" title="计划评估" content="已完成"></Step>
        <Step id="step4" title="计划验证" content="已完成"></Step>
        <Step id="step5" title="计划完成" content="已完成"></Step>
      </Steps>
    </div>


    <form autocomplete="off" @submit.prevent="submit" style="">
      <input type="hidden" class="form-control" id="id" v-model="planning.id">
      <input type="hidden" class="form-control" id="templateName" v-model="planning.templateName">
      <input type="hidden" class="form-control" id="cancelReason" v-model="planning.cancelReason">

      <div class="card p-2" style="padding-bottom: 0">
        <div class="row" style="margin-left: 0;margin-right: 0;margin-bottom: 0;display: flex">
          <div class="" style="width: 285px!important;flex: none">
            <div class="row" style="width: 285px!important;">
              <div class="col-md-12">
                <div class="wrapper"
                     style="border: 1px solid #5abfdd; border-radius: 6px;">
                  <p><span style="display:inline-block;width: 80px;text-align: right;">病例号：</span>{{planning.patientHospno}}</p>
                  <p><span style="display:inline-block;width: 80px;text-align: right;">姓名：</span>{{planning.patientName | min-short}}</p>
                  <p><span style="display:inline-block;width: 80px;text-align: right;">性别：</span>{{planning.sex}}</p>
                  <p><span style="display:inline-block;width: 80px;text-align: right;">就诊医院：</span>{{planning.departmentName}}</p>
                  <p><span style="display:inline-block;width: 80px;text-align: right;">诊断结果： </span>{{planning.diagnose}} </p>
                  <p><span style="display:inline-block;width: 80px;text-align: right;">提交人： </span>{{planning.applyName}}</p>
                  <p><span style="display:inline-block;width: 80px;text-align: right;">接收人： </span>{{planning.physicsName}}</p>
                  <p><span style="display:inline-block;width: 80px;text-align: right;">当前状态：</span>
                    <span v-show="planning.status==0">新增</span>
                    <span v-show="planning.status==1">已保存</span>
                    <span v-show="planning.status==2">已提交</span>
                    <span v-show="planning.status==3">已接收 </span>
                    <span v-show="planning.status==4">待上级评估</span>
                    <span v-show="planning.status==5">待验证</span>
                    <span v-show="planning.status==6">已完成</span>
                    <span v-show="planning.status==7">已拒绝</span>
                    <span v-show="planning.status==8">已作废</span>
                    <span v-show="planning.status==9">待本院评估</span>
                    <span v-show="planning.status==15">评估不通过</span>
                    <span v-show="planning.status==16">验证不通过</span>

                    <router-link :to="'/planning/timeLine/' + planning.id" style="white-space:nowrap;"><i
                      class="fa fa fa-calendar-check-o" style="margin-left: 20px"></i>查看进展详情
                    </router-link>

                  </p>
                </div>
              </div>
              <div class="col-md-12">
                <div class="wrapper"
                     style="border: 1px solid #5abfdd; border-radius: 6px;padding-top:10px;padding-bottom:10px;">

                  <div class="form-group row" style="margin-bottom: 6px;">
                    <label for="exampleSelect1" class="col-sm-5"
                           style="line-height: 29px">治疗类型</label>
                    <div class="col-sm-7" style="padding-left: 0;padding-right: 10px">
                      <select id="threapType" class="form-control" v-model="planning.treatType"
                              v-if="planning.status==0 || planning.status==1">

                      </select>
                      <input type="text" class="form-control"
                             v-if="planning.status!=0 && planning.status!=1" readonly
                             v-model="planning.treatType">
                    </div>
                  </div>
                  <div class="form-group row" style="margin-bottom: 6px;">
                    <label for="exampleSelect1" class="col-sm-5"
                           style="line-height: 29px">提交医院</label>
                    <div class="col-sm-7" style="padding-left: 0;padding-right: 10px">

                      <select class="form-control" title="选择医院" v-model="planning.appDepartmentid"
                              v-if="planning.status==0 || planning.status==1">
                        <option v-for="item in departments" :value="item.id">{{item.name}}
                        </option>
                      </select>

                      <input type="text" class="form-control"
                             v-if="planning.status!=0 && planning.status!=1" readonly
                             v-model="planning.departmentName">

                    </div>
                  </div>

                  <div class="form-group row" style="margin-bottom: 6px;">
                    <label for="exampleSelect1" class="col-sm-5"
                           style="line-height: 29px">部位</label>
                    <div class="col-sm-7" style="padding-left: 0;padding-right: 10px">
                      <select class="form-control" title="选择部位" v-model="planning.docgroupId"
                              v-if="planning.status==0 || planning.status==1">
                        <option v-for="item in parts" :value="item.id">{{item.name}}</option>
                      </select>
                      <input type="text" class="form-control"
                             v-if="planning.status!=0 && planning.status!=1" readonly
                             v-model="planning.groupname">
                    </div>
                  </div>

                  <div class="form-group row" style="margin-bottom: 2px;">
                    <label for="exampleSelect1" class="col-sm-5"
                           style="line-height: 29px">治疗机器</label>
                    <div class="col-sm-7" style="padding-left: 0;padding-right: 10px">


                      <select class="form-control" title="选择机器"
                              v-if="planning.status==0 || planning.status==1">
                        <option v-for="item in machines" :value="planning.machineId">{{item}}
                        </option>
                      </select>

                      <input type="text" class="form-control"
                             v-if="planning.status!=0 && planning.status!=1" readonly
                             v-model="planning.machineName">


                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="" style="flex: 1">

            <!--新内容-->
            <div class="row">
              <div class="col-md-2">诊断：</div>
              <div class="col-md-10">
                <textarea class="form-control" width="100%" rows="5" placeholder="请输入诊断内容" :disabled="planning.status != 0 && planning.status != 1" v-model="planning.memo"></textarea>
              </div>
              <div class="col-md-12" style="margin-top:10px;">
                <div class="card"
                     style="border: 1px solid #eee;margin-bottom: 10px;min-height:84px;">
                  <div class="card-header card-inverse recipe" style="padding: 4px;color:#333;">
                    治疗处方
                    <button type="button" v-if="planning.status==0 || planning.status==1"
                            class="font-sm pull-right"
                            @click="templateTargetList.push({targetName:'',totalDose:'',targetTimes:'',id:''})">
                      <!--@click="planning.planningTargetList.push({targetName:'',totalDose:'',targetVolume:'',targetSplitDose:'',targetTimes:'',targetActual:'',id:''})">-->
                      <i class="fa fa-plus"></i></button>
                    <!--<button type="button" v-if="current.type==0 && targetflag == true"-->
                    <!--class="font-sm pull-right" @click="showtargethistory()"><i-->
                    <!--class="fa fa-header">查看历史记录</i></button>-->
                    <!--<button type="button" v-if="current.type==0 && targetflag == false"-->
                    <!--class="font-sm pull-right" @click="showtargetnow()"><i-->
                    <!--class="fa fa-repeat">查看当前记录</i></button>-->
                  </div>
                  <div class="card-block" id="removeBorder" style="padding: 0;">
                    <table class="table table-bordered" style="margin-bottom: 0;">
                      <thead>
                      <tr class="">
                        <th style="text-align: center;padding: 2px;">靶区</th>
                        <th style="text-align: center;padding: 2px;">总剂量(Gy)</th>
                        <th style="text-align: center;padding: 2px;">分次数</th>
                        <th style="text-align: center;width: 80px;padding: 2px;" v-if="(planning.status==0 || planning.status==1) && targetflag == true">操作</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="(item,index) in planning.planningTargetList">
                        <td style="padding: 0;">
                          <input type="text"
                                 v-if="(planning.status==0 || planning.status==1) && targetflag == true"
                                 v-model="item.targetName"
                                 style="border: none;width: 100%;text-align: center"
                                 placeholder="请输入">
                          <input type="text"
                                 v-if="(planning.status!=0 && planning.status!=1) || targetflag == false"
                                 readonly v-model="item.targetName"
                                 style="border: none;width: 100%;text-align: center"
                                 placeholder="请输入">
                        </td>
                        <td style="padding: 0;">
                          <input type="text"
                                 v-if="(planning.status==0 || planning.status==1) && targetflag == true"
                                 v-model="item.totalDose"
                                 style="border: none;width: 100%;text-align: center"
                                 placeholder="请输入">
                          <input type="text"
                                 v-if="(planning.status!=0 && planning.status!=1) || targetflag == false"
                                 readonly v-model="item.totalDose"
                                 style="border: none;width: 100%;text-align: center"
                                 placeholder="请输入">
                        </td>
                        <td style="padding: 0;">
                          <input type="text"
                                 v-if="(planning.status==0 || planning.status==1) && targetflag == true"
                                 v-model="item.targetTimes"
                                 style="border: none;width: 100%;text-align: center"
                                 placeholder="请输入">
                          <input type="text"
                                 v-if="(planning.status!=0 && planning.status!=1) || targetflag == false"
                                 readonly v-model="item.targetTimes"
                                 style="border: none;width: 100%;text-align: center"
                                 placeholder="请输入">
                        </td>
                        <td style="padding: 0;" class="text-xs-center" v-if="(planning.status==0 || planning.status==1) && targetflag == true">
                          <a style="color:#666;padding-left:10px;"
                             v-if="(planning.status==0 || planning.status==1) && targetflag == true"
                             @click="planning.planningTargetList.splice(index,1)"><i
                            class="fa fa-trash-o"></i></a>
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div class="col-md-2 scanMethod">扫描方式：</div>
              <div class="col-md-10 scanMethod">
                <label for="check00" class="form-control pull-left" style="width:auto;"><input :disabled="planning.status != 0 && planning.status != 1" @click.stop="daGou" type="checkbox" id="check00"/>平扫</label>
                <label for="check01" class="form-control pull-left" style="width:auto;"><input :disabled="planning.status != 0 && planning.status != 1" @click.stop="daGou" type="checkbox" id="check01"/>增强</label>
                <label for="check02" class="form-control pull-left" style="width:auto;"><input :disabled="planning.status != 0 && planning.status != 1" @click.stop="daGou" type="checkbox" id="check02"/>4D-CT</label>
              </div>
              <div class="col-md-2 stableTypeNowrap">固定装置类型：</div>
              <div class="col-md-10 stableType">
                <label for="check10" class="form-control pull-left" style="width:auto;"><input :disabled="planning.status != 0 && planning.status != 1" @click.stop="daGouType" type="checkbox" id="check10"/>头肩膜</label>
                <label for="check11" class="form-control pull-left" style="width:auto;"><input :disabled="planning.status != 0 && planning.status != 1" @click.stop="daGouType" type="checkbox" id="check11"/>体膜</label>
                <label for="check12" class="form-control pull-left" style="width:auto;"><input :disabled="planning.status != 0 && planning.status != 1" @click.stop="daGouType" type="checkbox" id="check12"/>乳腺托架</label>
              </div>
              <div class="col-md-12">
                <h4 class="organDoseTit" style="text-align:left;">危及器官剂量</h4>
                <div style="max-height:300px;overflow-y:scroll;">
                  <table class="table organDoseTable" ref="organDoseTable">
                    <thead>
                    <tr>
                      <th>器官</th>
                      <th>剂量限值(Gy)(临床要求)</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td>脑干</td>
                      <td><input type="text" class="form-control" :disabled="planning.status != 0 && planning.status != 1"/></td>
                    </tr>
                    <tr>
                      <td>左晶体</td>
                      <td><input type="text" class="form-control" :disabled="planning.status != 0 && planning.status != 1" /></td>
                    </tr>
                    <tr>
                      <td>右晶体</td>
                      <td><input type="text" class="form-control" :disabled="planning.status != 0 && planning.status != 1" /></td>
                    </tr>
                    <tr>
                      <td>左视神经</td>
                      <td><input type="text" class="form-control" :disabled="planning.status != 0 && planning.status != 1" /></td>
                    </tr>
                    <tr>
                      <td>脊髓</td>
                      <td><input type="text" class="form-control" :disabled="planning.status != 0 && planning.status != 1" /></td>
                    </tr>
                    <tr>
                      <td>腮腺</td>
                      <td><input type="text" class="form-control" :disabled="planning.status != 0 && planning.status != 1" /></td>
                    </tr>
                    <tr>
                      <td>左肺</td>
                      <td><input type="text" class="form-control" :disabled="planning.status != 0 && planning.status != 1" /></td>
                    </tr>
                    <tr>
                      <td>右肺</td>
                      <td><input type="text" class="form-control" :disabled="planning.status != 0 && planning.status != 1" /></td>
                    </tr>
                    <tr>
                      <td>食管</td>
                      <td><input type="text" class="form-control" :disabled="planning.status != 0 && planning.status != 1" /></td>
                    </tr>
                    <tr>
                      <td>胃</td>
                      <td><input type="text" class="form-control" :disabled="planning.status != 0 && planning.status != 1" /></td>
                    </tr>
                    <tr>
                      <td>心脏</td>
                      <td><input type="text" class="form-control" :disabled="planning.status != 0 && planning.status != 1" /></td>
                    </tr>
                    <tr>
                      <td>左肾</td>
                      <td><input type="text" class="form-control" :disabled="planning.status != 0 && planning.status != 1"/></td>
                    </tr>
                    <tr>
                      <td>右肾</td>
                      <td><input type="text" class="form-control" :disabled="planning.status != 0 && planning.status != 1" /></td>
                    </tr>
                    <tr>
                      <td>肝</td>
                      <td><input type="text" class="form-control" :disabled="planning.status != 0 && planning.status != 1" /></td>
                    </tr>
                    <tr>
                      <td>直肠</td>
                      <td><input type="text" class="form-control" :disabled="planning.status != 0 && planning.status != 1" /></td>
                    </tr>
                    <tr>
                      <td>膀胱</td>
                      <td><input type="text" class="form-control" :disabled="planning.status != 0 && planning.status != 1" /></td>
                    </tr>
                    <tr>
                      <td>小肠</td>
                      <td><input type="text" class="form-control" :disabled="planning.status != 0 && planning.status != 1" /></td>
                    </tr>
                    <tr>
                      <td>股骨头</td>
                      <td><input type="text" class="form-control" :disabled="planning.status != 0 && planning.status != 1" /></td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="px-3" style="text-align: center;margin-bottom: 40px;">
          <a class="btn btn-info rounded" href="javascript:history.back()"><i
            class="fa fa-arrow-circle-left"></i> 返回</a>
          <!--<button type="button" class="btn btn-info rounded" v-if="current.type==0"-->
          <!--v-on:click="template();return false;" :disabled="errors.any()"><i class="fa fa-check"-->
          <!--style="color: #fff"></i>-->
          <!--保存到模板-->
          <!--</button>-->

          <button type="button" class="btn btn-info rounded"
                  v-if="current.type==0 && (planning.status == 0 || planning.status == 1)"
                  :disabled="errors.any()" v-on:click="saveonly()"><i class="fa fa-check"
                                                                      style="color: #fff"></i> 暂存
          </button>
          <button type="button" class="btn btn-info rounded"
                  v-if="current.type==0 && (planning.status == 0 || planning.status == 1)"
                  :disabled="errors.any()" v-on:click="submit()"><i class="fa fa-check"
                                                                    style="color: #fff"></i> 提交
          </button>

          <button type="button" class="btn btn-info rounded" v-if="current.type==0 && planning.status == 2"
                  :disabled="errors.any()" v-on:click="recall()"><i class="fa fa-check"
                                                                    style="color: #fff"></i> 撤回
          </button>
          <button type="button" class="btn btn-info rounded" v-if="current.type==1 && planning.status == 2"
                  :disabled="errors.any()" v-on:click="receive()"><i class="fa fa-check"
                                                                     style="color: #fff"></i> 接收
          </button>
          <button type="button" class="btn btn-info rounded" v-if="current.type==1 && planning.status == 2"
                  :disabled="errors.any()" v-on:click="reassign()"><i class="fa fa-check"
                                                                      style="color: #fff"></i> 暂不接收
          </button>
          <button type="button" class="btn btn-info rounded" v-if="current.type==1 && planning.status == 2"
                  :disabled="errors.any()" v-on:click="reject()"><i class="fa fa-check"
                                                                    style="color: #fff"></i> 拒绝接收
          </button>

          <button type="button" class="btn btn-info rounded"
                  v-if="current.type==1 && (planning.status == 3 || planning.status == 15 || planning.status == 16)"
                  :disabled="errors.any()" v-on:click="estimate()"><i class="fa fa-check"
                                                                      style="color: #fff"></i> 提交评估
          </button>
          <button type="button" class="btn btn-info rounded" data-toggle="modal" data-target="#login"
                  v-if="current.type==0 &&  planning.status == 4 && planning.applyDocid==current.id"
                  :disabled="errors.any()" v-on:click="approve()"><i class="fa fa-check"
                                                                     style="color: #fff"></i> 评估通过
          </button>
          <button type="button" class="btn btn-info rounded"
                  v-if="current.type==0 &&  planning.status == 4 && planning.applyDocid==current.id"
                  :disabled="errors.any()" v-on:click="notapprove()"><i class="fa fa-check"
                                                                        style="color: #fff"></i> 评估不通过
          </button>


          <button type="button" class="btn btn-info rounded" data-toggle="modal" data-target="#login"
                  v-if="current.type==1 &&  planning.status == 5 && current.departmentId == planning.departmentId"
                  :disabled="errors.any()" v-on:click="verify()"><i class="fa fa-check"
                                                                    style="color: #fff"></i> 验证通过
          </button>
          <button type="button" class="btn btn-info rounded"
                  v-if="current.type==1 &&  planning.status == 5 && current.departmentId == planning.departmentId"
                  :disabled="errors.any()" v-on:click="notverify()"><i class="fa fa-check"
                                                                       style="color: #fff"></i> 验证不通过
          </button>

          <button type="button" class="btn btn-info rounded"
                  v-if="current.type==0 &&  planning.status == 9 && planning.docid == current.id"
                  :disabled="errors.any()" v-on:click="docapprove()"><i class="fa fa-check"
                                                                        style="color: #fff"></i> 符合治疗要求
          </button>
          <button type="button" class="btn btn-info rounded"
                  v-if="current.type==0 &&  planning.status == 9 && planning.docid == current.id"
                  :disabled="errors.any()" v-on:click="docnotapprove()"><i class="fa fa-check"
                                                                           style="color: #fff"></i> 不符治疗要求
          </button>

          <button type="button" class="btn btn-info rounded"
                  v-if="current.type==0 && (planning.status == 0 || planning.status == 1 )"
                  v-on:click="cancel()"><i class="fa fa-check" style="color: #fff"></i> 作废
          </button>
        </div>
      </div>
    </form>
    <!-- 登录窗口 -->
    <div id="login" class="modal fade">
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
            <form class="form-group" @submit.prevent="done">
              <div class="form-group">
                <label for="">用户名</label>
                <input class="form-control" type="text" v-model="name" placeholder="">
              </div>
              <div class="form-group">
                <label for="">密码</label>
                <input class="form-control" type="password" v-model="pass" placeholder="">
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
</template>

<script>
  import {Planning, Auth, User, Docgroup, Machine, PlanningTemplate} from '../../resources'
  import {showResponse} from '../../misc/utils'
  import swal from 'sweetalert'
  import Steps from 'iview/src/components/steps'
  import Step from 'iview/src/components/steps/step.vue'

  var template = null

  export default {
    props: ['planning', 'departments', 'parts', 'templates', 'templateTargetList', 'templateOrganList','nowImageId','suid'],
    data: () => ({
      // departments: [],
      // parts: [],
      // machines: [],
      // templates: [],
      // planning: {
      //     planningTargetList: [{
      //         targetName: '',
      //         totalDose: '',
      //         targetVolume: '',
      //         targetSplitDose: '',
      //         targetTimes: '',
      //         targetActual: '',
      //         id: ''
      //     }],
      //     planningOrganList: [{organName: '', dose: '', organActual: '', id: ''}]
      //
      // },
      name: User.current().name,
      pass: '',
      user: {},
      docgroup: {},
      machine: {},
      planningtemplate: {},
      current: User.current(),
      targetflag: true,
      organflag: true,
      // templateTargetList: [],
      // templateOrganList: [],
      currentNum: -1,
      relativeUsers: [],
      enableShow:false,
      machines:[]
    }),
    components:{Steps,Step},
    beforeRouteEnter(to, from, next) {
      var id = to.params.id;
      Promise.all([User.departments(), Docgroup.parts(), PlanningTemplate.templates(), Planning.get(id), Machine.machinesbyplanning(id)]).then(([user, docgroup, planningtemplate, planning, machine]) => {
        next(vm => {
          vm.departments = user.data.departments;
          vm.parts = docgroup.data.parts;
          template = planning.data.templateid;
          vm.templates = planningtemplate.data.templates;

          vm.templateTargetList = planning.data.planningTargetList;
          vm.templateOrganList = planning.data.planningOrganList;

          vm.planning = planning.data;

          let departmentId = vm.planning.departmentId;
          if (User.current().roleId != -1) {
            for (let i = 0; i < vm.departments.length; i++) {
              let department = vm.departments[i];
              let collaborates = department.collaborates;
              if (collaborates.indexOf(departmentId) >= 0) {
                vm.planning.appDepartmentid = department.id;
              }
            }
          }

//                    vm.machines = [{id:vm.planning.machineId, name:vm.planning.machineName}]
          vm.machines = machine.data.machines;

          for (let i = 0; i < vm.machines.length; i++) {
            let machine = vm.machines[i];
            if (machine.departmentId == departmentId) {
              vm.planning.machineId = machine.id;
              break;
            }
          }

          var statusNum = planning.data.status
          if ((statusNum >= 0 && statusNum < 4) || statusNum == 7) {
            var step = document.getElementsByClassName("ivu-steps-content");
            vm.currentNum = 1;
            step[0].innerHTML = "已完成";
            step[1].innerHTML = "进行中";
            step[2].innerHTML = "待进行";
            step[3].innerHTML = "待进行";
            step[4].innerHTML = "待进行"
          }
          if (statusNum == 4 || statusNum == 15 || statusNum == 16 || statusNum == 9) {
            var step = document.getElementsByClassName("ivu-steps-content");
            vm.currentNum = 2;
            step[0].innerHTML = "已完成";
            step[1].innerHTML = "已完成";
            step[2].innerHTML = "进行中";
            step[3].innerHTML = "待进行";
            step[4].innerHTML = "待进行"
          }
          if (statusNum == 5) {
            var step = document.getElementsByClassName("ivu-steps-content");
            vm.currentNum = 3;
            step[0].innerHTML = "已完成";
            step[1].innerHTML = "已完成";
            step[2].innerHTML = "已完成";
            step[3].innerHTML = "进行中";
            step[4].innerHTML = "待进行"
          }
          if (statusNum == 6 || statusNum == 8) {
            var step = document.getElementsByClassName("ivu-steps-content");
            vm.currentNum = 4;
            step[0].innerHTML = "已完成";
            step[1].innerHTML = "已完成";
            step[2].innerHTML = "已完成";
            step[3].innerHTML = "已完成";
            step[4].innerHTML = "已完成"
          }

          Planning.getRelative(vm.planning.id).then((res) => {
            vm.relativeUsers = res.data;
          })

          vm.$nextTick(() => vm.$emit('loaded'))

        })
      })
    },
    mounted() {
      console.log('current----------',this.current);
      console.log('vmplanning-------',this.planning)
      console.log('iiiiiiiiiiiiiii',this.$refs.organDoseTable);
//            alert(this.planning.status)
      var statusNum = this.planning.status
      if ((statusNum >= 0 && statusNum < 4) || statusNum == 7) {
        var step = document.getElementsByClassName("ivu-steps-content");
        this.currentNum = 1;
        step[0].innerHTML = "已完成";
        step[1].innerHTML = "进行中";
        step[2].innerHTML = "待进行";
        step[3].innerHTML = "待进行";
        step[4].innerHTML = "待进行"
      }
      if (statusNum == 4 || statusNum == 15 || statusNum == 16 || statusNum == 9) {
        var step = document.getElementsByClassName("ivu-steps-content");
        this.currentNum = 2;
        step[0].innerHTML = "已完成";
        step[1].innerHTML = "已完成";
        step[2].innerHTML = "进行中";
        step[3].innerHTML = "待进行";
        step[4].innerHTML = "待进行"
      }
      if (statusNum == 5) {
        var step = document.getElementsByClassName("ivu-steps-content");
        this.currentNum = 3;
        step[0].innerHTML = "已完成";
        step[1].innerHTML = "已完成";
        step[2].innerHTML = "已完成";
        step[3].innerHTML = "进行中";
        step[4].innerHTML = "待进行"
      }
      if (statusNum == 6 || statusNum == 8) {
        var step = document.getElementsByClassName("ivu-steps-content");
        this.currentNum = 4;
        step[0].innerHTML = "已完成";
        step[1].innerHTML = "已完成";
        step[2].innerHTML = "已完成";
        step[3].innerHTML = "已完成";
        step[4].innerHTML = "已完成"
      }
      //在线交流
      Planning.getRelative(this.planning.id).then((res) => {
        this.relativeUsers = res.data;
      })
      ////危急器官表格初始内容填充
      for(var i=0;i<this.planning.planningOrganList.length;i++){
        for(var j=0;j<$('.organDoseTable tbody tr').length;j++){
          if(this.planning.planningOrganList[i].organName==$('.organDoseTable tbody tr').eq(j).find('td').eq(0).text()){
            $('.organDoseTable tbody tr').eq(j).find('td').eq(1).find('input').val(this.planning.planningOrganList[i].dose);
          }
        }
      }
      ////扫描模式勾选填充
      var scanModeStr=this.planning.scanMode;
      if(scanModeStr!=undefined) {
        if (scanModeStr.indexOf('0') > -1) {
          $('.scanMethod label').eq(0).find('input')[0].checked = 'checked';
        }
        if (scanModeStr.indexOf('1') > -1) {
          $('.scanMethod label').eq(1).find('input')[0].checked = 'checked';
        }
        if (scanModeStr.indexOf('2') > -1) {
          $('.scanMethod label').eq(2).find('input')[0].checked = 'checked';
        }
      }
      ////固定装置类型勾选填充
      var immobilizationDeviceType=this.planning.immobilizationDeviceType;
      if(immobilizationDeviceType) {
        if (immobilizationDeviceType.indexOf('0') > -1) {
          $('.stableType label').eq(0).find('input')[0].checked = 'checked';
        }
        if (immobilizationDeviceType.indexOf('1') > -1) {
          $('.stableType label').eq(1).find('input')[0].checked = 'checked';
        }
        if (immobilizationDeviceType.indexOf('2') > -1) {
          $('.stableType label').eq(2).find('input')[0].checked = 'checked';
        }
      }
      ////治疗类型填充
      this.planning.treatType=this.planning.treatType==undefined?'':this.planning.treatType;
      var threapTypeArr=this.planning.therapyType.split(',');
      var _option='<option value="">请选择</option>';
      for(var i=0;i<threapTypeArr.length;i++){
        _option+='<option value="'+threapTypeArr[i]+'">'+threapTypeArr[i]+'</option>';
      }
      $('#threapType').html(_option);
      ////固定装置类型填充
      this.machines=this.planning.machineName.split(',');



    },
    methods: {
      //医生签字
      done() {
        Auth.validationInformation({name: this.name, pass: this.pass}).then(response => {
          console.log("response", response)
          if (response.data.code == 1) {
            this.$validator.validateAll().then(success => {
              if (!success) return;
              // this.target.modifierId = response.data.data.id;
              $(".modal-backdrop").css("opacity", "0");
              $(".modal-backdrop").css("display", "none");

              swal({type: 'success', title: '操作成功', text: '您的操作已经执行成功!'},()=>{
                window.location.reload()
              });

//              Planning.planning(this.planning).then(response => {
//                $(".modal-backdrop").css("opacity", "0");
//                $(".modal-backdrop").css("display", "none");
//                showResponse(response, () => setTimeout(function () {
//                  window.location.reload()
//                },10))
//              })
            })
          } else {
//            alert(JSON.stringify(response));
            swal(response.data.msg, 'error')
          }
        })
      },
      setStep(index) {
        for (var i = 2; i <= index; i++) {
          $("#step" + i + "Li").addClass("blue").removeClass("gray");
          $("#step" + i + "Img").attr("src", "../static/img/step/blue_blue.png");
        }
        for (var i = index + 1; i <= 5; i++) {
          $("#step" + i + "Li").addClass("gray").removeClass("blue");
          $("#step" + i + "Img").attr("src", "../static/img/step/gray_gray.png");
        }
        $("#step" + (index + 1) + "Img").attr("src", "../static/img/step/blue_gray.png");
      },
      saveonly() {
        this.$validator.validateAll().then(success => {
          if (!success) return;
          if (this.targetflag == false) {
            showtargetnow()
          }
          if (this.organflag == false) {
            showorgannow()
          }
          Planning.saveonly(this.planning).then(response => {
            showResponse(response, () => this.$router.back())
          })
        })
      },
      daGou(){
        var arr=[];
        for(var i=0;i<$('.scanMethod label').length;i++){
          if($('.scanMethod label').eq(i).find('input')[0].checked){
            var target=$('.scanMethod label').eq(i).find('input').attr('id').substring(6,7);
            arr.push(target);
          }
        }
        var scanMode=arr.join(',');
        this.planning.scanMode=scanMode;
        console.log('scanMode---',scanMode);
      },
      daGouType(){
        var arr=[];
        for(var i=0;i<$('.stableType label').length;i++){
          if($('.stableType label').eq(i).find('input')[0].checked){
            var target=$('.stableType label').eq(i).find('input').attr('id').substring(6,7);
            arr.push(target);
          }
        }
        var immobilizationDeviceType=arr.join(',');
        this.planning.immobilizationDeviceType=immobilizationDeviceType;
      },
      submit() {
        this.$validator.validateAll().then(success => {
          if (!success) return;
          if (this.targetflag == false) {
            showtargetnow()
          }
          if (this.organflag == false) {
            showorgannow()
          }
          if($('#threapType').find('option:selected').text()=='请选择'){
            swal('操作失败!', '请选择治疗类型', 'error')
            return
          }
          for (var c in this.planning.planningTargetList) {
            if (this.planning.planningTargetList[c].targetName == '') {
              swal('操作失败!', '靶区名为空', 'error')
              return
            }
            if (this.planning.planningTargetList[c].totalDose == '') {
              swal('操作失败!', '总剂量为空', 'error')
              return
            }
            if (this.planning.planningTargetList[c].targetTimes == '') {
              swal('操作失败!', '分次数为空', 'error')
              return
            }
          }

//                    for (var c in this.planning.planningOrganList) {
//                        if (this.planning.planningOrganList[c].organName == '') {
//                            swal('操作失败!', '危及器官名为空', 'error')
//                            return
//                        }
//                }
          for(var i=0;i<$('.organDoseTable tbody tr').length;i++){
            if($.trim($('.organDoseTable tbody tr').eq(i).find('td').eq(1).find('input').val())!=''){
              var organList={};
              organList.organName=$('.organDoseTable tbody tr').eq(i).find('td').eq(0).text();
              organList.dose=$.trim($('.organDoseTable tbody tr').eq(i).find('td').eq(1).find('input').val());
              this.planning.planningOrganList.push(organList);
            }
          }

//console.log('this.planning===========',this.planning);
          Planning.planning(this.planning).then(response => {
//            console.log('this.planning===========',this.planning);
            var planPage=this.$store.state.planPage;
//            console.log('planPage============',planPage);
            for(var i=0;i<planPage.items.length;i++){
              if(planPage.items[i].id==this.planning.id){
                this.$store.state.planPage.items[i].status=2;
                this.$store.state.planPage.items[i].physicsName=this.planning.physicsName;
              }
            }
            showResponse(response, () => this.$router.back())
          })
        })
      },
      recall() {
        swal({
          title: "撤回原因",
          text: "输入撤回原因",
          type: "input",
          showCancelButton: true,
          closeOnConfirm: false,
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          animation: "slide-from-top",
          inputPlaceholder: "输入撤回原因"
        }, inputValue => {
          if (inputValue === false || inputValue === "") {
            return false;
          } else {
            this.planning.recallReason = inputValue;
            Planning.recall(this.planning).then(response => {
              showResponse(response);
              this.$router.back()
            })
          }

        })
      },
      receive() {
        this.$validator.validateAll().then(success => {
          if (!success) return;
          Planning.receive(this.planning).then(response => {
            showResponse(response, () => window.location.reload());
          })
        })
      },
      estimate() {
        this.$validator.validateAll().then(success => {
          if (!success) return;
          Planning.estimate(this.planning).then(response => {
            showResponse(response, () => window.location.reload())
          })
        })
      },
      approve() {
        this.$validator.validateAll().then(success => {
          if (!success) return;
          Planning.approve(this.planning).then(response => {
//                        showResponse(response, () => window.location.reload())
          })
        })
      },
      docapprove() {
        this.$validator.validateAll().then(success => {
          if (!success) return;
          Planning.docapprove(this.planning).then(response => {
            showResponse(response, () => window.location.reload())
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
              showResponse(response, () => window.location.reload())
            })
          }

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
              showResponse(response, () => window.location.reload())
            })
          }

        })
      },
      verify() {
        this.$validator.validateAll().then(success => {
          if (!success) return;
          Planning.verify(this.planning).then(response => {
//                        showResponse(response, () => window.location.reload())
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
              showResponse(response, () => window.location.reload())
            })
          }

        })

      },
      getMachine() {
        Machine.machines(this.planning.appDepartmentid).then(response => {
          this.machines = response.data.machines
        })
      },
      showtargethistory() {
        Planning.showtargethistory(this.planning.id).then(response => {
          this.planning.planningTargetList = response.data.targetList;
          this.targetflag = false
        })
      },
      showtargetnow() {
        this.planning.planningTargetList = this.templateTargetList;
        this.targetflag = true
      },
      showorganhistory() {
        Planning.showorganhistory(this.planning.id).then(response => {
          this.planning.planningOrganList = response.data.organList;
          this.organflag = false
        })
      },
      showorgannow() {
        this.planning.planningOrganList = this.templateOrganList;
        this.organflag = true
      },
      usetemplate() {
        if (template == null || (template != null && this.planning.status == 0)) {
          if (this.planning.templateid != null) {
            PlanningTemplate.usetemplate(this.planning.templateid).then(response => {
              this.planning.suggest = response.data.template.suggest;
              this.planning.memo = response.data.template.memo;
              this.planning.tech = response.data.template.tech;

              this.templateTargetList = response.data.template.templateTargetList;
              this.templateOrganList = response.data.template.templateOrganList;

              this.planning.planningTargetList = response.data.template.templateTargetList;
              this.planning.planningOrganList = response.data.template.templateOrganList
            })
          }

        }


      },
      cancel() {
        swal({
          title: "作废原因",
          text: "输入作废原因",
          type: "input",
          showCancelButton: true,
          closeOnConfirm: false,
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          animation: "slide-from-top",
          inputPlaceholder: "输入作废原因"
        }, inputValue => {
          if (inputValue === false || inputValue === "") {
            return false;
          } else {
            this.planning.cancelReason = inputValue;
            Planning.cancel(this.planning).then(response => {
              showResponse(response, () => window.location.reload())
            })
          }

        })
      },

      reassign() {

        swal({
          title: "重新安排原因",
          text: "输入重新安排原因",
          type: "input",
          showCancelButton: true,
          closeOnConfirm: false,
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          animation: "slide-from-top",
          inputPlaceholder: "输入重新安排原因"
        }, inputValue => {
          if (inputValue === false || inputValue === "") {
            return false;
          } else {
            this.planning.reassignReason = inputValue;
            Planning.reassign(this.planning).then(response => {
              showResponse(response, () => window.location.reload())
            })
          }

        })


      },


      reject() {
        swal({
          title: "拒绝原因",
          text: "输入拒绝原因",
          type: "input",
          showCancelButton: true,
          closeOnConfirm: false,
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          animation: "slide-from-top",
          inputPlaceholder: "输入拒绝原因"
        }, inputValue => {
          if (inputValue === false || inputValue === "") {
            return false;
          } else {
            this.planning.rejectReason = inputValue;
            Planning.reject(this.planning).then(response => {
              showResponse(response, () => window.location.reload())
            })
          }

        })
      },
      template() {
        swal({
          title: "模板名称",
          text: "输入模板名称",
          type: "input",
          showCancelButton: true,
          closeOnConfirm: false,
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          animation: "slide-from-top",
          inputPlaceholder: "输入模板名称"
        }, inputValue => {
          if (inputValue === false || inputValue === "") {
            return false;
          } else {
            this.planning.templateName = inputValue;
            Planning.plantemplate(this.planning).then(response => {
              showResponse(response)
            })
          }

        })
      },
      inviteChat(userId, userName) {
        this.$router.push('/chat/room/' + User.current().id + '/' + userId + '?userName=' + userName);
      }
    },
    created() {

    }
  }
</script>
<style>
  .wrapper {
    border: 1px solid #ccc;
    padding-left: 12px;
    padding-right: 12px;
    margin-bottom: 20px;
  }

  table table th {
    padding: 0;
  }

  table tbody td {
    padding: 0;
  }

  .wrapper p {
    margin-bottom: 6px;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  li {
    margin: 0;
    padding: 0;
  }

  #myTab li {
    width: 20%;
    float: left;
    height: 40px;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  #myTab li img {
    float: left;
    height: 40px;
  }

  #myTab li a {
    color: white;
    text-align: center;
    position: relative;
    display: block;
    padding: 10px 15px;
  }

  .blue {
    background: #0f9af2;
  }

  .gray {
    background: #dfdfdf;
  }

  .tabPaneUl {
    width: 700px;
    margin: 0 auto;
    list-style: none;
  }

  .tabPaneUl li {
    height: 40px;
    line-height: 40px;
  }

  .tab-pane {
    margin-top: 50px;
  }
  .organDoseTable tr td{
    vertical-align: middle;
  }
  .scanMethod{
    padding:10px 15px;
    line-height:35px;
  }
  h4.organDoseTit{
    font-size:20px;
    padding-top:10px;
    padding-bottom:10px;
  }
  .stableTypeNowrap{
    white-space: nowrap;
  }
  .recipe{
    background:#eee;
    color:#495060;
  }
  .recipe .font-sm{
    color:#666;
  }
  #removeBorder .table tbody tr:last-child{
    border-bottom:0;
  }
  #removeBorder .table tbody tr:last-child>td{
    border-bottom:0;
  }
  #removeBorder .table-bordered{
    border-bottom: 0;
  }
  .ms-icon-document>img{
    height: 16px;
    padding-right:3px;
  }
</style>
