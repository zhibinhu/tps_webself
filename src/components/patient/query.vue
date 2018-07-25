<template>
    <div>
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <router-link to="/">首页</router-link>
            </li>
            <li class="breadcrumb-item">
                <router-link to="/patient">病人管理</router-link>
            </li>
            <li class="breadcrumb-item active">查询病人</li>
        </ol>
        <form class="m-3" autocomplete="off" @submit.prevent="submit">
            <div class="card p-3 mb-3">
                <div class="form-group row" style="margin-top: 10px">


                    <label for="hospitalName" class="col-md-1 form-control-label">病历号</label>
                    <div class="col-md-3">
                        <input type="text" class="form-control" id="hospno" v-model="patient.hospno" placeholder="">
                    </div>
                    <label class="col-md-1 form-control-label">中文名</label>
                    <div class="col-md-3">
                        <input type="text" class="form-control" id="name" v-model="patient.name" placeholder="">
                    </div>

                </div>


                <div class="form-group row">
                    <label class="col-md-1 form-control-label">性别</label>
                    <div class="col-md-3">
                        <fieldset class="form-group">
                            <select class="form-control" id="sex" v-model="patient.sex">
                                <option value="1">男</option>
                                <option value="2">女</option>
                                <option value="3">其他</option>
                            </select>
                        </fieldset>
                    </div>
                    <label class="col-md-1 form-control-label">联系电话</label>
                    <div class="col-md-3">
                        <input type="text" class="form-control" id="phone" v-model="patient.phone" placeholder="">
                    </div>
                </div>


                <div class="form-group row">
                    <label class="col-md-1 form-control-label">所在医院</label>
                    <div class="col-md-3">
                        <fieldset class="form-group">
                            <select class="form-control" title="选择医院" v-model="patient.departmentId"
                                    v-on:change="getUser()">
                                <option v-for="item in departments" :value="item.id">{{item.name}}</option>
                            </select>

                        </fieldset>
                    </div>
                    <label class="col-md-1 form-control-label">主治医生</label>
                    <div class="col-md-3">
                        <fieldset class="form-group">
                            <select class="form-control" title="选择医生" v-model="patient.docId">
                                <option v-for="item in doctors" :value="item.id">{{item.name}}</option>
                            </select>

                        </fieldset>
                    </div>
                </div>


            </div>
            <div class="px-3">
                <a class="btn btn-outline-secondary rounded mr-2" href="javascript:history.back()"><i
                        class="fa fa-arrow-circle-left"></i> 返回</a>
                <button class="btn btn-outline-info rounded" :disabled="errors.any()"><i class="fa fa-check"
                                                                                         style="color: #fff"></i> 查询
                </button>
            </div>
        </form>
    </div>
</template>

<script>
    import {Department, User, Patient} from '../../resources'
    import selectize from '../../widgets/selectize.vue'
    import dict from '../../widgets/dict.vue'
    import {showResponse} from '../../misc/utils'

    export default {
        data: () => ({
            departments: [],
            doctors: [],

            patient: {}
        }),
        beforeRouteEnter(to, from, next) {
            Promise.all([User.departments()]).then(([user]) => {
                next(vm => {
                    vm.departments = user.data.departments;
                    vm.$nextTick(() => vm.$store.state.isLoading = false)
                })
            })

        },
        methods: {
            submit() {
                var vm = this;
                this.$validator.validateAll().then(success => {
                    if (!success) return;
                    Patient.save(vm.patient).then(response => {
                        showResponse(response, () => this.$router.back())
                    })
                })
            },
            getUser() {
                User.doctors(this.patient.departmentId).then(response => {
                    this.doctors = response.data.doctors
                })
            }
        }
    }
</script>
