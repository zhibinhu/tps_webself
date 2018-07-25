<template>
    <div>
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <router-link to="/">首页</router-link>
            </li>
            <li class="breadcrumb-item">
                <router-link to="/holiday">用户管理</router-link>
            </li>
            <li class="breadcrumb-item active">修改节假日</li>
        </ol>
        <form class="m-3" autocomplete="off" @submit.prevent="submit">
            <div class="card p-3 mb-3">
                <div class="form-group row" style="margin-top: 10px">
                    <div class="col-md-1">
                        <label class=""><span style="color:red;">*</span>开始时间</label>
                    </div>
                    <div class="col-md-3">
                        <DatePicker style="width:100%;" v-validate="'required'"  id="start" class="patientDate" type="date"  placeholder="请选择开始时间"  v-model="startTime.time"></DatePicker>

                        <!--<date-picker :date="startTime" :option="option" v-model="holiday.startdate"-->
                                     <!--id="start"></date-picker>-->
                    </div>
                </div>

                <div class="form-group row" style="margin-top: 10px">
                    <div class="col-md-1">
                        <label class=""><span style="color:red;">*</span>结束时间</label>
                    </div>
                    <div class="col-md-3">
                        <DatePicker style="width:100%;" v-validate="'required'" class="patientDate" type="date"  placeholder="请选择结束时间"  v-model="endtime.time"></DatePicker>
                        <!--<date-picker :date="endtime" :option="option" v-model="holiday.enddate"></date-picker>-->
                    </div>
                </div>

                <div class="form-group row" style="margin-top: 10px">
                    <div class="col-md-1">
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
                    <div class="col-md-1">
                        <label class="">备注</label>
                    </div>
                    <div class="col-md-3">
                        <input type="text" class="form-control" id="memo" v-model="holiday.memo" placeholder="">
                    </div>
                </div>

            </div>
            <div class="px-3">
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

//            option: {
//                type: 'day',
//                week: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
//                month: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
//                format: 'YYYY-MM-DD',
//                placeholder: '点击选择日期',
//                inputStyle: {
//                    'display': 'inline-block',
//                    'padding': '8px',
//                    'line-height': '22px',
//                    'font-size': '16px',
//                    'border': '1px solid #cfdadd',
//                    'border-radius': '2px',
//                    'color': '#5F5F5F',
//                    'width': '248px'
//                },
//                buttons: {
//                    ok: '确定',
//                    cancel: '取消'
//                },
//                overlayOpacity: 0.5, // 0.5 as default
//                dismissible: true // true as default
//            },


            holiday: {},
            start: ''
        }),
        beforeRouteEnter(to, from, next) {
            var id = to.params.id;
            Promise.all([Holiday.get(id)]).then(([holiday]) => {
                next(vm => {
                    let startdate = holiday.data.startdate;
                    let enddate = holiday.data.enddate;
                    let startdates = startdate.split(" ");
                    let enddates = enddate.split(" ");
                    holiday.data.startdate = startdates[0];
                    holiday.data.enddate = enddates[0];
                    vm.holiday = holiday.data;
                    vm.startTime.time = holiday.data.startdate;
                    vm.endtime.time = holiday.data.enddate;
                    vm.$nextTick(() => vm.$store.state.isLoading = false)
                })
            })
        },
        methods: {
            submit() {
                this.$validator.validateAll().then(success => {
                    if (!success) return;
                    this.holiday.startdate = this.todate(this.startTime.time);
                    this.holiday.enddate = this.todate(this.endtime.time);
                    Holiday.update(this.holiday).then(response => {
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
