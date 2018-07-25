<template>
  <div>
    <div>
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/">首页</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link to="/patient">病人管理</router-link>
        </li>
        <li class="breadcrumb-item active">上传病历</li>
      </ol>
    </div>

    <div>
      <form class="m-3" autocomplete="off" @submit.prevent="">
        <input type="hidden" class="form-control" id="patid" v-model="medical.patid">
        <div class="card p-3 mb-3">
          <div class="row">
            <div class="col-md-12" style="">
              <div class="row">
                <div class="col-md-12">
                  <div class="wrapper">
                    <div class="form-group row" style="margin-top: 10px">
                      <div class="col-md-1">
                        <label class=""><span style="color: red;">*</span>诊断</label>
                      </div>
                      <div class="col-md-11">
                        <input type="text" class="form-control" id="diagnose"
                               v-model="medical.diagnose" placeholder="" name="diagnose" v-validate="'required'">
                      </div>
                    </div>
                    <div class="form-group row" style="margin-top: 10px">
                      <div class="col-md-1">
                        <label class=""><span style="color: red;">*</span>病历</label>
                      </div>
                      <div class="col-md-11">

                        <vue-editor id="editor"
                                    useCustomImageHandler
                                    @imageAdded="handleImageAdded" v-model="medical.memo" name="vueEditor" v-validate="'required'">
                        </vue-editor>


                      </div>
                    </div>
                    <div class="form-group row" style="margin-top: 10px">
                      <div class="col-md-2">
                        <label class="">上传文件</label>
                      </div>
                      <div class="col-md-10">
                        <div class="input_wrap">
                          <input class="upload_name" type="file" ref="input" @change="selectedFile"/>
                          <a href="#" class="contents"></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="px-3" style="text-align:center">
          <a class="btn btn-info rounded" href="javascript:history.back()"><i
            class="fa fa-arrow-circle-left"></i> 返回</a>
          <button class="btn btn-info rounded" data-toggle="modal" data-target="#login" v-if="isLocal == 1 && patient.status != 2" :disabled="errors.any()"> <i
            class="fa fa-check" style="color: #fff"></i>提交</button>
        </div>
      </form>
    </div>


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
  import {Auth, Medical, Common, Upload, User,Patient, netURL} from '../../resources'
  import {showResponse} from '../../misc/utils'
  import {VueEditor} from 'vue2-editor'
  import axios from 'axios'

  export default {
    data: () => ({
      medical: {
        diagnose: ''
      },
      patient: {},
      content: '<h2>请在这里输入...</h2>',
      editorOption: {
        // something config
      },
      isLocal: 1,
      patientId: 0,
      name: User.current().name,
      pass: ''

    }),
    beforeRouteEnter(to, from, next) {
      var id = to.params.id;
      Promise.all([Medical.getByPatId(id)]).then(([medical]) => {
        next(vm => {
          let url = medical.data.attachPath;
          let fileName = medical.data.attachName
          vm.patientId = id;
          vm.medical = medical.data;
          $('.contents').html(fileName);
          $('.contents').attr('href',url);
          Patient.get(id).then(res => {
            vm.patient = res.data;
            User.departments().then(user => {
              //上级医生查看下级病人时，隐藏提交按钮
              if (User.current().roleId == -1 || user.data.departments[0].id != res.data.departmentId) {
                vm.isLocal = 0;
              }
            })
          })
          vm.$nextTick(() => vm.$store.state.isLoading = false)
        })
      })
    },
    methods: {
      //上传文件
      selectedFile (e) {
        let files = e.target.files[0];
        if(files){
          let isnext = false;
          let fileName = files.name;
          let size = files.size/1024;
          let fileEnd = fileName.substring(fileName.indexOf('.'));
          let filemaxsize = 1024 * 5;
          if(fileEnd == '.doc' || fileEnd == '.docx'){
            isnext = true;
          }
          if(!isnext) {
            swal('不接受此文件类型！请上传doc或docx文件');
            e.target.value = '';
            return false;
          }
          if(size > filemaxsize) {
            swal('附件大小不能大于' + filemaxsize / 1024 + 'M！');
            e.target.value = "";
            return false;
          }
          $('.contents').html(fileName);
          //读取文件
          let formData = new FormData();
          formData.append('file', files);
          formData.append('fileType', 'medical');
          Upload.fileUpload(formData).then(result => {
            let url = netURL + result.data;
            this.medical.attachPath = url;
            this.medical.attachName = fileName;
          });
        }else {
          return false;
        }
      },
      done() {
        Auth.validationInformation({name: this.name, pass: this.pass}).then(response => {
          console.log("response", response)
          if (response.data.code == 1) {
            this.$validator.validateAll().then(success => {
              if (!success) return;
              this.medical.modifierId = response.data.data.id;
              Medical.save(this.medical).then(response => {
                $(".modal-backdrop").css("opacity", "0");
                $(".modal-backdrop").css("display", "none");
                showResponse(response, () => this.$router.back())
              })
            })
          } else {
            swal(response.data.msg, 'error')
          }
        })
      },
      onEditorBlur(editor) {
        console.log('editor blur!', editor)
      },
      onEditorFocus(editor) {
        console.log('editor focus!', editor)
      },
      onEditorReady(editor) {
        console.log('editor ready!', editor)
      },
      handleImageAdded: function (file, Editor, cursorLocation) {

        var index = file.name.lastIndexOf('.');
        if (file.name.substr(index, 4) == '.bmp' || file.name.substr(index, 4) == '.jpg' || file.name.substr(index, 4) == '.jpeg' || file.name.substr(index, 4) == '.gif' || file.name.substr(index, 4) == '.png') {
          var formData = new FormData();
          formData.append('image', file);
          formData.append('fileType', "record");

          Upload.picUpload(formData).then(result => {
//                        console.log(result.data);
            let url = netURL + result.data; // Get url from response
            Editor.insertEmbed(cursorLocation, 'image', url);
          })

        } else {
          swal("操作失败", "文件不合法, 请上传图片", 'error');
          return
        }


      }
    },
    components: {
      VueEditor
    }
  }
</script>
<style>
  [v-cloak] {
    display: none;
  }
  .input_wrap{
    height: 30px;
    line-height: 30px;
    overflow: hidden;
  }
  .upload_name{
    width: 80px;
    height: 30px;
    line-height: 24px;
    float: left;
    overflow: hidden;
  }
  .contents{
    float: left;
    margin-left: 20px;
  }

  table table th {
    padding: 0;
  }

  table tbody td {
    padding: 0;
  }

  .ql-container .ql-editor {
    min-height: 18em;
    padding-bottom: 1em;
    max-height: 18em;
  }
</style>
