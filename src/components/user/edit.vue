<template>
    <div>
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <router-link to="/">首页</router-link>
            </li>
            <li class="breadcrumb-item">
                <router-link to="/users">用户</router-link>
            </li>
            <li class="breadcrumb-item active">编辑用户</li>
        </ol>
        <form autocomplete="off" @submit.prevent="submit()" class="mx-3 allLableStyle">
            <div class="card mb-3 p-3 b-0 col-12">

                <div class="form-group row">
                    <div class="col-md-2">
                        <label class="col-form-label "><span style="color: red;">*</span>用户名</label>
                    </div>

                    <div class="col-md-3">
                        <input name="name" class="form-control" v-model="user.name" v-validate="'required|min:2|max:32'"
                               placeholder="用户名" title="用户名">
                        <span class="form-control-feedback">{{ errors.first('name') }}</span>
                    </div>

                    <div class="col-md-2">
                        <label class="col-form-label "><span style="color: red;">*</span>密码</label>
                    </div>
                    <div class="col-md-3">
                        <input type="password" name="pass" v-model="user.pass" class="form-control"
                               v-validate="'max:32'" placeholder="密码" title="用户密码">
                        <span class="form-control-feedback">{{ errors.first('pass') }}</span>
                    </div>

                </div>


                <div class="form-group row">
                    <div class="col-md-2">
                        <label class="col-form-label "><span style="color: red;">*</span>姓名</label>
                    </div>
                    <div class="col-md-3">
                        <input name="userName" v-model="user.userName" class="form-control"
                               v-validate="'required|max:32'" placeholder="姓名" title="姓名">
                        <span class="form-control-feedback">{{ errors.first('userName') }}</span>
                    </div>

                    <div class="col-md-2">
                        <label class="col-form-label "><span style="color: red;">*</span>手机号</label>
                    </div>
                    <div class="col-md-3">
                        <input name="phone" v-model="user.phone" class="form-control" data-vv-delay="400"
                               placeholder="手机号" title="手机号"
                               v-validate="{rules: {required: true,regex: /^\d{11}$/} }">
                        <span class="form-control-feedback">{{ errors.first('phone') }}</span>
                    </div>

                </div>

                <div class="form-group row">
                    <div class="col-md-2">
                        <label class="col-form-label ">邮箱</label>
                    </div>
                    <div class="col-md-3">
                        <input name="email" v-model="user.email" class="form-control" placeholder="邮箱" title="邮箱">

                    </div>

                    <div class="col-md-2">
                        <label class="col-form-label ">出生日期</label>
                    </div>
                    <div class="col-md-3">
                        <DatePicker style="width: 100%;" class="patientDate" type="date"  placeholder="请选择出生日期"  v-model="user.birthday"></DatePicker>
                    </div>
                </div>

                <div class="form-group row">
                    <div class="col-md-2">
                        <label class="col-form-label "><span style="color: red;">*</span>所属医院</label>
                    </div>
                    <div class="col-md-3">

                        <select class="form-control" title="选择医院" v-model="user.departmentId" v-validate="'required'">
                            <option v-for="item in depts" :value="item.id">{{item.name}}</option>
                        </select>

                    </div>
                    <div class="col-md-2">
                        <label class="col-form-label ">组别</label>
                    </div>
                    <div class="col-md-3">
                        <select class="form-control" title="选择组别" v-model="user.docgroupId">
                            <option v-for="item in parts" :value="item.id">{{item.name}}</option>
                        </select>
                    </div>

                </div>


                <div class="form-group row">
                    <div class="col-md-2">
                        <label class="col-form-label "><span style="color: red;">*</span>选择角色</label>
                    </div>
                    <div class="col-md-3">
                        <select class="form-control" title="选择角色" v-model="user.roleId" v-on:change="change()">
                            <option v-for="item in roles" :value="item.id">{{item.name}}</option>
                        </select>
                    </div>
                    <div class="col-md-2">
                        <label class="col-form-label ">职位</label>
                    </div>
                    <div class="col-md-3">
                        <input name="position" v-model="user.position" class="form-control" placeholder="职位" title="职位">

                    </div>
                </div>


                <div class="form-group row" v-if="flag1==true">
                    <div class="col-md-2">
                        <label class="col-form-label ">靶区数量</label>
                    </div>
                    <div class="col-md-3">
                        <input name="position" v-model="user.targetLimit" class="form-control" placeholder="每月靶区勾划数量上限"
                               title="每月靶区勾划数量上限">

                    </div>
                    <div class="col-md-2">
                        <label class="col-form-label ">拒绝数量</label>
                    </div>
                    <div class="col-md-3">
                        <input name="position" v-model="user.targetRejectLimit" class="form-control"
                               placeholder="每月拒绝靶区勾划数量上限" title="每月拒绝靶区勾划数量上限">

                    </div>


                </div>

                <div class="form-group row" v-if="flag2==true">

                    <div class="col-md-2">
                        <label class="col-form-label ">计划数量</label>
                    </div>
                    <div class="col-md-3">
                        <input name="position" v-model="user.planLimit" class="form-control" placeholder="每月计划设计数量上限"
                               title="每月计划设计数量上限">

                    </div>

                    <div class="col-md-2">
                        <label class="col-form-label ">拒绝数量</label>
                    </div>
                    <div class="col-md-3">
                        <input name="position" v-model="user.planRejectLimit" class="form-control"
                               placeholder="每月拒绝计划设计数量上限" title="每月拒绝计划设计数量上限">

                    </div>
                </div>


            </div>
            <div class="px-3" style="text-align:center ">
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
    import DateSelect from '../../widgets/dateselect.vue'
    import {User, Docgroup} from '../../resources'
    import {showResponse} from '../../misc/utils'
//    import myDatepicker from 'vue-datepicker'
    import DatePicker from 'iview/src/components/date-picker'
    import swal from 'sweetalert'

    export default {
        data: () => ({

            flag1: false,
            flag2: false,

            startTime: {
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


            currentId: User.current().roleId,
            loading: 1,
            depts: [],
            parts: [],
            roles: [],
            user: {},
            owns: []
        }),
        beforeRouteEnter(to, from, next) {
            var id = to.params.id;
            Promise.all([User.get(id), Docgroup.parts(), User.roles(id), User.allDepartments()]).then(([user, docgroup, roles, depts]) => {
                next(vm => {
                    let birthday = user.data.birthday;
                    if (birthday != null && birthday != '') {
                        let birthdaies = birthday.split(" ");
                        user.data.birthday = birthdaies[0]
                    }
                    vm.depts = depts.data.departments;
                    vm.roles = roles.data.roles;
                    vm.user = user.data;
//console.log('user----',vm.user);
                    if (vm.user.targetLimit == 0) {
                        vm.user.targetLimit = null
                    }
                    if (vm.user.planLimit == 0) {
                        vm.user.planLimit = null
                    }
                    if (vm.user.targetRejectLimit == 0) {
                        vm.user.targetRejectLimit = null
                    }
                    if (vm.user.planRejectLimit == 0) {
                        vm.user.planRejectLimit = null
                    }

                    if (vm.user.roleName == '医生') {
                        vm.flag1 = true;
                        vm.flag2 = false
                    } else if (vm.user.roleName == '物理师') {
                        vm.flag2 = true;
                        vm.flag1 = false
                    }
                    vm.parts = docgroup.data.parts;
                    vm.startTime.time = user.data.birthday;
                    vm.owns = roles.data.owns || [];
                    vm.$nextTick(() => vm.$store.state.isLoading = false)
                })
            })
        },
        beforeRouteUpdate(to, from, next) {
            var id = to.params.id;
            Promise.all([User.get(id), User.roles(id), User.allDepartments()]).then(([user, roles, depts]) => {
                this.depts = depts.data.departments;
                this.roles = roles.data.roles;
                this.owns = roles.data.owns;
                this.user = user.data
              next()
            })
          next()
        },
        methods: {
            submit() {
                this.$validator.validateAll().then(success => {
                    if (!success) return;

                    if (this.user.pass == null || this.user.pass == '') {
                        swal('操作失败!', '密码为空', 'error');
                        return
                    }
                    if (this.user.departmentId == null || this.user.departmentId == '') {
                        swal('操作失败!', '所在医院为空', 'error');
                        return
                    }
                    if (this.user.roleId == null || this.user.departmentId == '') {
                        swal('操作失败!', '角色为空', 'error');
                        return
                    }

                    if (this.user.targetLimit == null || this.user.targetLimit == '') {
                        this.user.targetLimit = 0
                    }
                    if (this.user.targetRejectLimit == null || this.user.targetRejectLimit == '') {
                        this.user.targetRejectLimit = 0
                    }
                    if (this.user.planLimit == null || this.user.planLimit == '') {
                        this.user.planLimit = 0
                    }
                    if (this.user.planRejectLimit == null || this.user.planRejectLimit == '') {
                        this.user.planRejectLimit = 0
                    }

                    this.user.roles = this.owns;
                    this.user.birthday = this.startTime.time;
                    User.update(this.user).then(response => {
                        showResponse(response, () => this.$router.back())
                    })

                })
            },
            change() {
                var id = this.user.roleId;
                for (var c in this.roles) {

                    if (this.roles[c].id == id) {
                        if (this.roles[c].name == "医生") {
                            this.flag1 = true;
                            this.flag2 = false;
                        } else if (this.roles[c].name == "物理师") {
                            this.flag2 = true;
                            this.flag1 = false;
                        } else {
                            this.flag2 = false;
                            this.flag1 = false
                        }
                        break
                    }
                }


            }
        },
        components: {DatePicker}
    }
</script>
<style>
    .allLableStyle .col-md-2{
        text-align:right;
    }
</style>
