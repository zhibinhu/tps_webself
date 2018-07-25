<template>
    <div>
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <router-link to="/">首页</router-link>
            </li>
            <li class="breadcrumb-item">
                <router-link to="/holiday">用户管理</router-link>
            </li>
            <li class="breadcrumb-item active">新建节假日</li>
        </ol>
        <form class="m-3" autocomplete="off" @submit.prevent="submit">
            <div class="card p-3 mb-3">
                <div class="form-group row" style="margin-top: 10px">
                    <div class="col-md-2">
                        <label class=""><span style="color:red;">*</span>开始时间</label>
                    </div>
                    <div class="col-md-3">
                        <!--<date-picker :date="startTime" :option="option" v-model="holiday.startdate"></date-picker>-->
                        <DatePicker class="patientDate" type="date" v-validate="'required'"  placeholder="请选择开始时间" style="width:100%;" name="startDate" v-model="startTime.time"></DatePicker>
                        <span class="form-control-feedback">{{ errors.first('startDate') }}</span>
                    </div>
                </div>

                <div class="form-group row" style="margin-top: 10px">
                    <div class="col-md-2">
                        <label class=""><span style="color:red;">*</span>结束时间</label>
                    </div>
                    <div class="col-md-3">
                        <!--<date-picker :date="endtime" :option="option" v-model="holiday.enddate"></date-picker>-->
                        <DatePicker class="patientDate" type="date" v-validate="'required'"  placeholder="请选择结束时间" style="width:100%;" name="endDate" v-model="endtime.time"></DatePicker>
                        <span class="form-control-feedback">{{ errors.first('endDate') }}</span>
                    </div>
                </div>

                <div class="form-group row" style="margin-top: 10px">
                    <div class="col-md-2">
                        <label class="">类型</label>
                    </div>
                    <div class="col-md-3">
                        <select class="form-control" v-model="holiday.type">
                            <option value="1">节假日</option>
                            <option value="0">工作时间</option>

                        </select>
                    </div>
                </div>

                <div class="form-group row" style="margin-top: 10px">
                    <div class="col-md-2">
                        <label class="">备注</label>
                    </div>
                    <div class="col-md-3">
                        <input type="text" class="form-control" id="memo" v-model="holiday.memo" placeholder="">
                    </div>
                </div>

            </div>
            <div class="px-3" style="text-align: center">
                <a class="btn btn-info rounded" href="javascript:history.back()"><i class="fa fa-arrow-circle-left"></i>
                    返回</a>
                <button class="btn btn-info rounded" :disabled="errors.any()"><i class="fa fa-check"
                                                                                 style="color: #fff"></i> 提交
                </button>
            </div>
        </form>
    </div>
</template>

<script>
    import {Holiday} from '../../resources'
    import {showResponse} from '../../misc/utils'
//    import myDatepicker from 'vue-datepicker'
    import DatePicker from 'iview/src/components/date-picker'
    export default {
        data: () => ({
            startTime: {
                time: ''
            },
            endtime: {
                time: ''
            },

            option: {
                type: 'day',
                week: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                month: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                format: 'YYYY-MM-DD',
                placeholder: '点击选择日期',
                inputStyle: {
                    'display': 'inline-block',
                    'padding': '8px',
                    'line-height': '22px',
                    'font-size': '16px',
                    'border': '1px solid #cfdadd',
                    'border-radius': '2px',
                    'color': '#5F5F5F',
                    'width': '248px'
                },
                buttons: {
                    ok: '确定',
                    cancel: '取消'
                },
                overlayOpacity: 0.5, // 0.5 as default
                dismissible: true // true as default
            },


            holiday: {
                startdate: '',
                enddate: ''
            }
        }),
        beforeRouteEnter(to, from, next) {
            next(vm => {
              vm.$store.state.isLoading = false
            })
        },
        methods: {
            submit() {
                this.$validator.validateAll().then(success => {
                    if (!success) return;
//                    console.log('this.startTime.time----',this.startTime.time);
                    var dateStart=this.todate(this.startTime.time);
                    var dateEnd=this.todate(this.endtime.time);

                    this.holiday.startdate = dateStart;
                    this.holiday.enddate = dateEnd;
                    Holiday.save(this.holiday).then(response => {
                        showResponse(response, () => this.$router.back())
                    })
                })
            },
          todate(num) { //Fri Oct 31 18:00:00 UTC+0800 2008
              num = num + "";
              var date = "";
              var month = new Array();
              month["Jan"] = 1; month["Feb"] = 2; month["Mar"] = 3; month["Apr"] = 4; month["May"] = 5; month["Jun"] = 6;
              month["Jul"] = 7; month["Aug"] = 8; month["Sep"] = 9; month["Oct"] = 10; month["Nov"] = 11; month["Dec"] = 12;
              var week = new Array();
              week["Mon"] = "一"; week["Tue"] = "二"; week["Wed"] = "三"; week["Thu"] = "四"; week["Fri"] = "五"; week["Sat"] = "六"; week["Sun"] = "日";
              var str = num.split(" ");
              date = str[3] + "-";
              date = date + month[str[1]] + "-" + str[2];
              return date;
            }

        },
        components: {DatePicker}
    }
</script>
