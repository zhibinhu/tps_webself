<template>
  <div>
    <ol class="breadcrumb">
      <li class="breadcrumb-item">
        <router-link to="/">首页</router-link>
      </li>
      <li class="breadcrumb-item">
        <router-link to="/patient">病人管理</router-link>
      </li>
      <li class="breadcrumb-item active">编辑信息</li>
    </ol>
    <form class="m-3" autocomplete="off" @submit.prevent="submit">
      <div class="card p-3 mb-3">
        <div class="form-group row" style="margin-top: 10px">
          <div class="col-md-2" style="text-align: right;">
            <label class="col-form-label">病人编号</label>
          </div>
          <div class="col-md-3">
            <input type="text" class="form-control" id="internalHospno" v-model="patientChild.internalHospno"
                   readonly placeholder="">
          </div>
          <div class="col-md-2" style="text-align: right;">
            <label class="col-form-label"><span style="color: red;">*</span>病历号</label>
          </div>
          <div class="col-md-3">
            <input class="form-control" id="hospno" name="hospno" v-model="patientChild.hospno"
                   v-validate="'required' " placeholder="">
            <span class="form-control-feedback">{{ errors.first('hospno') }}</span>
          </div>
        </div>

        <div class="form-group row">
          <div class="col-md-2" style="text-align: right;">
            <label class="col-form-label"><span style="color: red;">*</span>中文名</label>
          </div>
          <div class="col-md-3">
            <input type="text" class="form-control" id="name" name="chinese_name" v-model="patientChild.name" placeholder=""
                   v-validate="'required'">
            <span class="form-control-feedback">{{ errors.first('chinese_name') }}</span>
          </div>
          <div class="col-md-2" style="text-align: right;">
            <label class="col-form-label" >英文名</label>
          </div>
          <div class="col-md-3">
            <input type="text" class="form-control" id="engname" v-model="patientChild.engname" placeholder="">
          </div>
        </div>

        <div class="form-group row" style="padding-bottom: 0">
          <div class="col-md-2" style="text-align: right;">
            <label class="col-form-label">性别</label>
          </div>
          <div class="col-md-3">
            <fieldset class="form-group">
              <select class="form-control" id="sex" v-model="patientChild.sex">
                <option value="男">男</option>
                <option value="女">女</option>
                <option value="其他">其他</option>
              </select>
            </fieldset>
          </div>
          <div class="col-md-2" style="text-align: right;">
            <label class="col-form-label"><span style="color: red;">*</span>出生日期</label>
          </div>
          <div class="col-md-3">
            <DatePicker class="patientDate" type="date" name="birthday" v-validate="'required'" placeholder="请选择出生日期" v-model="patientChild.birthday"></DatePicker>
            <span class="form-control-feedback">{{ errors.first('birthday') }}</span>
          </div>
        </div>

        <div class="form-group row">
          <div class="col-md-2" style="text-align: right;">
            <label class="col-form-label"><span style="color: red;">*</span>联系电话</label>
          </div>
          <div class="col-md-3">
            <input type="text" class="form-control" id="phone" name="telephone" v-model="patientChild.phone" v-validate="{rules: {required: true,regex: /^\d{11}$/} }" placeholder="">
            <span class="form-control-feedback">{{ errors.first('telephone') }}</span>
          </div>
          <div class="col-md-2" style="text-align: right;">
            <label class="col-form-label">电子邮箱</label>
          </div>
          <div class="col-md-3">
            <input type="text" class="form-control" id="email" v-model="patientChild.email" placeholder="">
          </div>
        </div>

        <div class="form-group row">
          <div class="col-md-2" style="text-align: right;">
            <label class="col-form-label">紧急联系人</label>
          </div>
          <div class="col-md-3">
            <input type="text" class="form-control" id="relator" v-model="patientChild.relator" placeholder="">
          </div>
          <div class="col-md-2" style="text-align: right;">
            <label class="col-form-label">紧急联系电话</label>
          </div>
          <div class="col-md-3">
            <input type="text" class="form-control" id="relatorPhone" v-model="patientChild.relatorPhone"
                   placeholder="">
          </div>
        </div>

        <div class="form-group row" style="padding-bottom: 0">
          <div class="col-md-2" style="text-align: right;">
            <label class="col-form-label"><span style="color: red;">*</span>所在医院</label>
          </div>
          <div class="col-md-3">
            <input type="text" class="form-control" name="departmentId" readonly="readonly"
                   v-model="patientChild.departmentName"/>
          </div>
          <div class="col-md-2" style="text-align: right;">
            <label class="col-form-label"><span style="color: red;">*</span>主治医生</label>
          </div>
          <div class="col-md-3">
            <fieldset class="form-group">
              <div v-if="doctors.length">
                <select id="doc_select" class="form-control" title="选择医生" v-model="patientChild.docId" :disabled="patientChild.status == 2">
                  <option v-for="item in doctors" :value="item.id"
                          :selected="{selected: item.id == patientChild.docId}">{{item.userName}}
                  </option>
                </select>
              </div>
            </fieldset>
          </div>
        </div>

        <div class="form-group row">
          <div class="col-md-2" style="text-align: right;">
            <label class="col-form-label">身份证号</label>
          </div>
          <div class="col-md-3">
            <input type="text" class="form-control" id="idcard" v-model="patientChild.idcard" placeholder="">
          </div>

          <div class="col-md-2" style="text-align: right;">
            <label class="col-form-label" >地址</label>
          </div>
          <div class="col-md-3">
            <input type="text" class="form-control" id="address" v-model="patientChild.address" placeholder="">
          </div>
        </div>
      </div>
      <div class="px-3" style="text-align:center">
        <a class="btn btn-info rounded" href="javascript:history.back()"><i class="fa fa-arrow-circle-left"></i>
          返回</a>
        <button class="btn btn-info rounded" v-if="isLocal == 1 && patientChild.status != 2" :disabled="errors.any()"><i class="fa fa-check"
                                                                                                                    style="color: #fff"></i>
          提交
        </button>
      </div>
    </form>
  </div>
</template>

<script>
  import {Medical, User, Patient} from '../../resources'
  import {showResponse} from '../../misc/utils'
  import DatePicker from 'iview/src/components/date-picker'
  //    import myDatepicker from 'vue-datepicker'

  export default {
    props: ['patient', 'startTime', 'doctor', 'isLocal'],
    data: () => ({
//            option: {
//                type: 'day',
//                week: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
//                month: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
//                format: 'YYYY-MM-DD',
//                placeholder: '点击选择日期',
//                inputStyle: {
//                    'display': 'inline-block',
//                    'line-height': '22px',
//                    'font-size': '16px',
//                    'border': '0px solid #cfdadd',
//                    'border-radius': '2px',
//                    'color': '#5F5F5F',
//                    'width': '100%'
//                },
//                buttons: {
//                    ok: '确定',
//                    cancel: '取消'
//                },
//                overlayOpacity: 0.5, // 0.5 as default
//                dismissible: true // true as default
//            },
      docterName:'',
      user: User.current(),
      departments: [],
      patientId: 0,
      patientChild:{},
      numberOfTimes: 1,
      doctors: []
      // isLocal: 1
    }),
    mounted() {
      this.patientChild = this.patient
      console.log('doctors--------',this.doctor,this.patient);
      Object.assign(this.patientChild,this.patient);
      this.patientChild.name=this.patientChild.name?this.patientChild.name:'';
      this.patientChild.phone=this.patientChild.phone?this.patientChild.phone:'';
      console.log('this.patientChild--------------',this.patientChild);
      if (this.doctor.id == undefined) {
        this.getUser();
      } else {
        this.doctors = this.doctor;
      }
    },
    methods: {
      submit() {
        console.log('this.patientChild222--------------',this.patientChild);
        this.$validator.validateAll().then(success => {
          if (!success) return;
          this.patientChild.birthday = $('.patientDate input').val();
//                    this.patient.birthday = this.startTime.time;
          console.log('dgfsgd', this.patientChild.birthday)
          console.log('ccccc', this.patientChild)
          Patient.update(this.patientChild).then(response => {
            showResponse(response, () => this.$router.back())
          })
        })
      },
      getUser() {
        console.log("this.patient=========");
        console.log(JSON.stringify(this.patientChild));
        User.doctors(this.patientChild.departmentId).then(response => {
          this.doctors = response.data.doctors
          console.log('this.doctors=========');
          console.log(this.doctors);
        })
      },
      checkDiagnosis() {
        if (this.numberOfTimes == 1) {
          this.numberOfTimes = 0;
          var test = window.location.href;
          var ads = test.split("#");
          var patientId = this.patientId;
          Medical.earliestDiagnosis(patientId).then(response => {
            if (response.status == '200') {
              var data = response.data;
              console.log(data);
              var time = data.createTime;
              var riqi = '';
              if (time != null && time != '' && time != undefined) {
                console.log(1111);
                var shijian = time.split(" ");
                var ymd = shijian[0].split('-');
                var year = ymd[0];
                var month = ymd[1];
                riqi = year + '年' + month + '月';
              }
              var msg = "您曾在" + data.departmentName + riqi + "进行" + data.diagnose + "治疗";
              swal({
                title: msg,
                text: "是否查看？",
                type: "info",
                showCancelButton: true,
                closeOnConfirm: false,
                confirmButtonText: "确认",
                cancelButtonText: "取消",
                animation: "slide-from-top",
              }, function () {
                $(".sweet-overlay").css("display", "none");
                $(".showSweetAlert").css("display", "none");
                return window.location.href = ads[0] + '#/patient/medical/' + patientId;
              })
            }
          })
        }
      }
    },
    components: {DatePicker}

  }
</script>
<style>
  .patientDate{
    width:100%;
  }
  .patientDate i.ivu-input-icon{
    top:5px;
  }
  .patientDate .ivu-input-icon-normal+.ivu-input{
    height:40px;
    width:100%;
    border-radius:0.125rem;
    font-size:14px;
  }
</style>

