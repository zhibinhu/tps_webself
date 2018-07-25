<template>
  <div>
    <div style="position:relative;">
      <!--<div class="dropdown" style="float:right;margin-top: 10px;margin-right: 100px;" v-if="relativeUsers.length > 0">-->
      <!--<button class="btn btn-info dropdown-toggle" type="button" id="chat" data-toggle="dropdown"-->
      <!--aria-haspopup="true" aria-expanded="true">-->
      <!--在线交流-->
      <!--<span class="caret"></span>-->
      <!--</button>-->
      <!--&lt;!&ndash;在线的关联用户&ndash;&gt;-->
      <!--<ul class="dropdown-menu" aria-labelledby="chat">-->
      <!--<li v-for="(item, index) in relativeUsers" @click="inviteChat(item.id, item.name)">-->
      <!--<div class="row">-->
      <!--<div class="col-md-5">-->
      <!--<span v-html="item.name" style="font-size: 16px"></span>-->
      <!--</div>-->
      <!--<div class="col-md-2">-->
      <!--<span class="text-success" style="font-size: 10px" v-if="item.isOnline == 1">在线</span>-->
      <!--<span class="text-danger" style="font-size: 10px" v-if="item.isOnline == 0">离线</span>-->
      <!--</div>-->
      <!--<div class="col-md-5">-->
      <!--<span v-html="item.hospital" style="font-size: 12px"></span>-->
      <!--</div>-->
      <!--</div>-->

      <!--</li>-->
      <!--</ul>-->
      <!--</div>-->
      <div style="position:absolute;right:390px;top:10px;">
        <router-link :to="'/image/detail/'+nowImageId+'?studyUID='+suid" class="btn btn-info rounded" v-if=" ((target.status == 2 &&  target.applyDocid==current)||(target.status == 5 &&  target.docid==current)) ">
          <i class="ms-icon-document">
            <img src="../image/img/chakan.png" alt="">
          </i>查看影像
        </router-link>
      </div>
      <div class="dropdown" style="float:right;margin-top: 10px;margin-right: 50px;"
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
      <div class="dropdown" style="float:right;margin-top: 10px;margin-right: 50px;" v-if="current == target.docid ">
        <div v-if="target.status >= 2">
          <div class="btn btn-info rounded" @click="viewCase(target)">
            <i class="fa fa-pencil"></i>查看病历
          </div>
        </div>
        <div v-else>
          <router-link class="btn btn-info rounded" :to="'/patient/medical/' + target.patientId + '?departmentId=' + target.departmentId">
            <i class="fa fa-pencil"></i>编辑病历
          </router-link>
        </div>
      </div>
      <div class="dropdown" style="float:right;margin-top: 10px;margin-right: 100px;" v-else-if="current == target.applyDocid">
        <router-link class="btn btn-info rounded" :to="'/patient/medical/' + target.patientId">
          <i class="fa fa-pencil"></i>查看病历
        </router-link>
      </div>
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/">首页</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link to="/target">靶区管理</router-link>
        </li>
        <li class="breadcrumb-item active">靶区提交</li>
      </ol>
    </div>


    <div style="margin-bottom: 15px;margin-top: 11px;margin-left:20%;margin-right: 20%">
      <Steps :current="currentNum">
        <Step id="step1" title="靶区提交" content="进行中"></Step>
        <Step id="step2" title="靶区设计" content="待进行"></Step>
        <Step id="step3" title="靶区审核" content="待进行"></Step>
        <Step id="step4" title="靶区完成" content="待进行"></Step>
      </Steps>
    </div>

    <form class="m-3" autocomplete="off" @submit.prevent="submit">
      <input type="hidden" class="form-control" id="id" v-model="target.id">

      <div class="card p-2" style="padding-bottom: 0">
        <div class="row" style="margin-left: 0; margin-right: 0; margin-bottom: 0; display: flex">
          <div style="width: 285px !important; flex: 0 0 auto">
            <div class="row" style="width: 285px !important;">
              <div class="col-md-12">
                <div class="wrapper" style="border: 1px solid rgb(90, 191, 221); border-radius: 6px">
                  <p><span style="display:inline-block;width: 80px;text-align: right;">病历号：</span>{{target.patientHospno}}</p>
                  <p v-if="target.patientName != null">
                    <span style="display:inline-block;width: 80px;text-align: right;">姓名：</span>{{target.patientName}}</p>
                  <p v-if="target.patientName == null">
                    <span style="display:inline-block;width: 80px;text-align: right;">姓名：</span>{{target.patientEngName}}</p>
                  <p><span style="display:inline-block;width: 80px;text-align: right;">就诊医院：</span>{{target.departmentName}}</p>
                  <p v-if="target.applyName != null"><span style="display:inline-block;width: 80px;text-align: right;">提交人：</span>{{target.doctor}}</p>
                  <p v-if="target.applyName != null"><span style="display:inline-block;width: 80px;text-align: right;">接收人：</span>{{target.applyName}}</p>
                  <p><span style="display:inline-block;width: 80px;text-align: right;">当前状态：</span><span v-show="target.status==0">新增</span><span v-show="target.status==1">已保存</span><span v-show="target.status==2 && target.applyDocid == current">待接收</span><span v-show="target.status==2 && target.applyDocid != current">已提交</span><span v-show="target.status==3">已接收</span><span v-show="target.status==4">已拒绝</span><span v-show="target.status==5">待审核</span><span v-show="target.status==6">审核不通过</span><span v-show="target.status==7">已完成</span>
                    <br/>
                    <router-link :to="'/target/timeLine/' + target.id" style="white-space:nowrap;"><i
                      class="fa fa fa-calendar-check-o" style="margin-left: 20px"></i>查看进展详情
                    </router-link>
                  </p>
                </div>

              </div>
            </div>
          </div>
          <div style="flex: 1 1 0">
            <div class="card p-3 mb-3">
              <div class="form-group row" style="margin-top: 10px">
                <div class="col-md-2">
                  <label class=""><span style="color: red;">*</span>提交医院</label>
                </div>
                <div class="col-md-9">

                  <select class="form-control" title="选择医院" v-model="target.appDepartmentid"
                          v-if="target.status == 0 || target.status == 1 || target.status == 4">
                    <option v-for="item in departments" :value="item.id">{{item.name}}</option>
                  </select>

                  <input type="text" class="form-control"
                         v-if="target.status!=0 && target.status!=1 && target.status !=4" readonly
                         v-model="target.appDepartmentName">

                </div>
              </div>
              <div class="form-group row" style="margin-top: 10px">
                <div class="col-md-2">
                  <label class=""><span style="color: red;">*</span>部位</label>
                </div>
                <div class="col-md-9">
                  <select class="form-control" title="选择部位" v-model="target.docgroupId"
                          v-if="target.status == 0 || target.status == 1  || target.status == 4">
                    <option v-for="item in parts" :value="item.id">{{item.name}}</option>
                  </select>

                  <input type="text" class="form-control"
                         v-if="target.status!=0 && target.status!=1 && target.status !=4" readonly
                         v-model="target.groupname">

                </div>
              </div>
              <div class="form-group row">
                <label class="col-md-2 form-control-label"><span style="color: red;">*</span>备注</label>
                <div class="col-md-10">

                  <vue-editor id="editor"
                              useCustomImageHandler
                              @imageAdded="handleImageAdded" v-model="target.memo">
                  </vue-editor>


                </div>

              </div>
            </div>
          </div>
        </div>
      </div>


      <div class="px-3" style="text-align: center;">
        <a class="btn btn-info rounded" href="javascript:history.back()"><i class="fa fa-arrow-circle-left"></i>
          返回</a>


        <button type="button" class="btn btn-info rounded"
                v-if="( (target.status == 0 || target.status==1 || target.status==4)  &&  target.docid==current)"
                v-on:click="saveonly()" :disabled="errors.any()"><i class="fa fa-check" style="color: #fff"></i>
          暂存
        </button>

        <button type="button" class="btn btn-info rounded"
                v-if="((target.status == 0 || target.status==1 || target.status==4) &&  target.docid==current)"
                v-on:click="submittarget()" :disabled="errors.any()"><i class="fa fa-check"
                                                                        style="color: #fff"></i> 提交
        </button>
        <button type="button" class="btn btn-info rounded" v-if="(target.status == 2 &&  target.docid==current)"
                v-on:click="recall()" :disabled="errors.any()"><i class="fa fa-check" style="color: #fff"></i>
          撤回
        </button>

        <button type="button" class="btn btn-info rounded"
                v-if="(target.status == 2 &&  target.applyDocid==current)" v-on:click="receive()"
                :disabled="errors.any()"><i class="fa fa-check" style="color: #fff"></i> 接收
        </button>
        <button type="button" class="btn btn-info rounded"
                v-if="(target.status == 2 &&  target.applyDocid==current)" v-on:click="reassign()"
                :disabled="errors.any()"><i class="fa fa-check" style="color: #fff"></i> 暂不接收
        </button>
        <button type="button" class="btn btn-info rounded"
                v-if="(target.status == 2 &&  target.applyDocid==current)" v-on:click="reject()"
                :disabled="errors.any()"><i class="fa fa-check" style="color: #fff"></i> 拒绝接收
        </button>

        <router-link :to="'/image/detail/'+nowImageId+'?studyUID='+suid" class="btn btn-info rounded" v-if=" ((target.status == 3 ||target.status==6) &&  target.applyDocid==current) ">
          <i class="fa fa-check" style="color:#fff"></i>开始靶区勾画
        </router-link>

        <button type="button" class="btn btn-info rounded"
                v-if=" ((target.status == 3 ||target.status==6) &&  target.applyDocid==current) "
                v-on:click="finish()" :disabled="errors.any()"><i class="fa fa-check" style="color: #fff"></i>
          提交审核
        </button>

        <button type="button" class="btn btn-info rounded" data-toggle="modal" data-target="#login"
                v-if=" (target.status == 5 &&  target.docid==current) "
                v-on:click="check(1)" :disabled="errors.any()"><i class="fa fa-check" style="color: #fff"></i>
          审核通过
        </button>

        <button type="button" class="btn btn-info rounded"
                v-if=" (target.status == 5 &&  target.docid==current) "
                v-on:click="check(0)" :disabled="errors.any()"><i class="fa fa-check" style="color: #fff"></i>
          审核不通过
        </button>

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
  import {Auth, Target, User, Docgroup, Common, Upload, netURL} from '../../resources'
  import {showResponse} from '../../misc/utils'
  import swal from 'sweetalert'
  import {VueEditor} from 'vue2-editor'
  import Steps from 'iview/src/components/steps'
  import Step from 'iview/src/components/steps/step.vue'
  export default {
    props: ['target', 'departments', 'parts','nowImageId','suid'],
    data: () => ({
      name: User.current().name,
      pass: '',
      targetId: 0,
      // departments: [],
      currentNum: -1,
      // parts: [],
      // target: {},
      user: {},
      docgroup: {},
      current: User.current().id,
      currentDep: User.current().departmentId,

      content: '<h2>请在这里输入...</h2>',
      editorOption: {
        placeholder: '请输入备注.',
        readOnly: false
      },
      relativeUsers: [],
      relativeAvatars: {
        applyDocAvatar: '',
        receiveDocAvatar: '',
        controlPhyAvatar: ''
      },
      statusNum: 0,
    }),
    beforeRouteEnter(to, from, next) {
      var id = to.params.id;
      Promise.all([User.departments(), Docgroup.parts(), Target.get(id)]).then(([user, docgroup, target]) => {
        next(vm => {
          vm.targetId = id;
          vm.departments = user.data.departments;
          vm.parts = docgroup.data.parts;
          vm.target = target.data;

          var statusNum = target.data.status;
          console.log('statusNum-------',statusNum);
          if (statusNum == 0 || statusNum == 1) {
            var step = document.getElementsByClassName("ivu-steps-content");
            vm.currentNum = 0;
            step[0].innerHTML = "进行中";
            step[1].innerHTML = "待进行";
            step[2].innerHTML = "待进行";
            step[3].innerHTML = "待进行"
          }
          if (statusNum == 2 || statusNum == 3 || statusNum == 4 || statusNum == 6) {
            var step = document.getElementsByClassName("ivu-steps-content");
            vm.currentNum = 1;
            step[0].innerHTML = "已完成";
            step[1].innerHTML = "进行中";
            step[2].innerHTML = "待进行";
            step[3].innerHTML = "待进行"
          }
          if (statusNum == 5) {
            var step = document.getElementsByClassName("ivu-steps-content");
            vm.currentNum = 2;
            step[0].innerHTML = "已完成";
            step[1].innerHTML = "已完成";
            step[2].innerHTML = "进行中";
            step[3].innerHTML = "待进行"
          }
          if (statusNum == 7) {
            var step = document.getElementsByClassName("ivu-steps-content");
            vm.currentNum = 3;
            step[0].innerHTML = "已完成";
            step[1].innerHTML = "已完成";
            step[2].innerHTML = "已完成";
            step[3].innerHTML = "已完成"
          }

          Target.getRelative(vm.targetId).then((res) => {
            vm.relativeUsers = res.data;
          })

          vm.$nextTick(() => vm.$emit('loaded'))
        })
      })
    },
    mounted() {
      this.updateStatus();
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
//              Target.target(this.target).then(response => {
//                $(".modal-backdrop").css("opacity", "0");
//                $(".modal-backdrop").css("display", "none");
//                showResponse(response, () => setTimeout(function () {
//                  window.location.reload()
//                },10))
//              })
            })
          } else {
            swal(response.data.msg, 'error')
          }
        })
      },
      //查看病例
      viewCase(params) {
        this.$router.push({
          path:'/patient/medical/' + params.patientId
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
          Target.saveonly(this.target).then(response => {
            showResponse(response)
          })
        })
      },
      submittarget() {
        this.$validator.validateAll().then(success => {
          if (!success) return;
          Target.target(this.target).then(response => {
            showResponse(response, () => setTimeout(function () {
              window.location.reload()
            },10))
          })
        })
      },
      receive() {
        Target.receive(this.target).then(response => {
          showResponse(response, () => setTimeout(function () {
            window.location.reload()
          },10))
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
            this.target.rejectReason = inputValue;
            Target.reject(this.target).then(response => {
              showResponse(response, () => window.location.reload())
            })
          }

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
            this.target.cancelReason = inputValue;
            Target.recall(this.target).then(response => {
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
            this.target.reassignReason = inputValue;
            Target.reassign(this.target).then(response => {
              showResponse(response, () => window.location.reload())
            })
          }

        })

      },
      finish() {

        if (this.currentDep != this.target.appDepartmentid && (this.target.status == 0 || this.target.status == 1 || this.target.status == 5)) {
          swal('操作失败', '不能对提交到别的医院的靶区进行完成', 'error')
          return
        }

        Target.finish(this.target).then(response => {
          showResponse(response, () => window.location.reload())
        })

      },
      check(result) {
        if (result == 0) {
          swal({
            title: "审核不通过原因",
            text: "输入审核不通过原因",
            type: "input",
            showCancelButton: true,
            closeOnConfirm: false,
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            animation: "slide-from-top",
            inputPlaceholder: "输入审核不通过原因"
          }, inputValue => {
            if (inputValue === false || inputValue === "") {
              return false;
            } else {
              this.target.checkMemo = inputValue;

              Target.check(this.target, result).then(response => {
                showResponse(response, () => window.location.reload())
              })
            }

          })
        } else {
          console.log('this.target----------',this.target);
          Target.check(this.target, result).then(response => {
//                        showResponse(response, () => setTimeout(function () {
//                            window.location.reload()
//                        },10))
          })
        }
      },
      onEditorBlur(editor) {
      },
      onEditorFocus(editor) {
      },
      onEditorReady(editor) {
      },
      handleImageAdded: function (file, Editor, cursorLocation) {

        var index = file.name.lastIndexOf('.');
        if (file.name.substr(index, 4) == '.bmp' || file.name.substr(index, 4) == '.jpg' || file.name.substr(index, 4) == '.jpeg' || file.name.substr(index, 4) == '.gif' || file.name.substr(index, 4) == '.png') {
          var formData = new FormData();
          formData.append('image', file);
          formData.append('fileType', "record");
          Upload.picUpload(formData).then(result => {
            let url = netURL + result.data; // Get url from response
            Editor.insertEmbed(cursorLocation, 'image', url);
          })

        } else {
          swal("操作失败", "文件不合法, 请上传图片", 'error')
          return
        }

      },
      inviteChat(userId, userName) {
        this.$router.push('/chat/room/' + User.current().id + '/' + userId + '?userName=' + userName);
      },
      updateStatus() {
        var statusNum = this.target.status;
        if (statusNum == 0 || statusNum == 1) {
          var step = document.getElementsByClassName("ivu-steps-content");
          this.currentNum = 0;
          step[0].innerHTML = "进行中";
          step[1].innerHTML = "待进行";
          step[2].innerHTML = "待进行";
          step[3].innerHTML = "待进行"
        }
        if (statusNum == 2 || statusNum == 3 || statusNum == 4 || statusNum == 6) {
          var step = document.getElementsByClassName("ivu-steps-content");
          this.currentNum = 1;
          step[0].innerHTML = "已完成";
          step[1].innerHTML = "进行中";
          step[2].innerHTML = "待进行";
          step[3].innerHTML = "待进行"
        }
        if (statusNum == 5) {
          var step = document.getElementsByClassName("ivu-steps-content");
          this.currentNum = 2;
          step[0].innerHTML = "已完成";
          step[1].innerHTML = "已完成";
          step[2].innerHTML = "进行中";
          step[3].innerHTML = "待进行"
        }
        if (statusNum == 7) {
          var step = document.getElementsByClassName("ivu-steps-content");
          this.currentNum = 3;
          step[0].innerHTML = "已完成";
          step[1].innerHTML = "已完成";
          step[2].innerHTML = "已完成";
          step[3].innerHTML = "已完成"
        }

        let id = this.target.id;
        if (id != null) {
          Target.getRelative(id).then((res) => {
            this.relativeUsers = res.data;
          })
        }
      }
    },
    components: {
      VueEditor,Steps,Step
    }
  }
</script>

<style>

  .ql-container .ql-editor {
    min-height: 18em;
    padding-bottom: 1em;
    max-height: 18em;
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

  .wrapper {
    border: 1px solid #ccc;
    padding-left: 12px;
    padding-right: 12px;
    margin-bottom: 20px;
  }

  .wrapper p {
    margin-bottom: 6px;
  }
  .ms-icon-document>img{
    height: 16px;
    padding-right:3px;
  }
</style>
