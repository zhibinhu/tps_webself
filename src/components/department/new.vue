<template>
    <div>
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <router-link to="/">首页</router-link>
            </li>
            <li class="breadcrumb-item">
                <router-link to="/department">医院管理</router-link>
            </li>
            <li class="breadcrumb-item active">新增医院</li>
        </ol>
        <form autocomplete="off" @submit.prevent="submit">
            <div class="card p-2">
                <div class="row" style="margin-top: 20px;margin-left: 0;margin-right: 0;margin-bottom: 0">
                    <div class="col-md-12">
                        <div class="card" style="border: 1px solid #5abfdd;margin-bottom: 10px;">
                            <div class="card-header card-inverse card-info" style="padding: 4px">
                                基本信息
                            </div>

                            <div class="card-block" style="padding: 0;padding-top: 10px;">
                                <div class="form-group row" style="margin-left: 0;margin-right: 0;">
                                    <div class="col-md-1">
                                        <label><span style="color: red;">*</span>医院名</label>
                                    </div>
                                    <div class="col-md-3">
                                        <input type="text" class="form-control" name="name" v-validate="'required'"
                                               v-model="department.name" title="医院名">
                                        <span class="form-control-feedback" style="color: red">{{ errors.first('name') }}</span>
                                    </div>
                                    <label class="col-md-1 form-control-label">别名</label>
                                    <div class="col-md-3">
                                        <input type="text" class="form-control" name="alia" id="alia"
                                               v-model="department.alia" placeholder=""
                                               title="别名">

                                    </div>
                                    <div class="col-md-1">
                                        <label class="">管理员</label>
                                    </div>
                                    <div class="col-md-3">
                                        <input type="text" class="form-control" id="adminName"
                                               v-model="department.adminName" placeholder="">
                                    </div>
                                </div>
                                <div class="form-group row" style="margin-left: 0;margin-right: 0;">
                                    <label class="col-md-1 form-control-label">电话</label>
                                    <div class="col-md-3">
                                        <input type="text" class="form-control" id="adminPhone"
                                               v-model="department.adminPhone" placeholder="">
                                    </div>
                                    <label class="col-md-1 form-control-label">Institution</label>
                                    <div class="col-md-3">
                                        <input type="text" class="form-control" id="Institions"
                                               v-model="department.intuitions" placeholder="">
                                    </div>
                                    <label class="col-md-1 form-control-label" style="width: 80px;padding-right: 0;">合作医院</label>
                                    <div class="col-md-3">
                                        <input class="form-control" id="departmentName" placeholder="合作医院" readonly>
                                        <jstree attach="#departmentName" :treenodes="treenodes"
                                                v-model="department.collaborates" dropdown="down"
                                                :multiple="true"></jstree>
                                    </div>
                                </div>

                                <div class="form-group row" style="margin-left: 0;margin-right: 0;">
                                    <label class="col-md-1 form-control-label">地址</label>
                                    <div class="col-md-11">
                                        <input type="text" class="form-control" id="address"
                                               v-model="department.address" placeholder="">
                                    </div>
                                </div>
                                <div class="form-group row" style="margin-left: 0;margin-right: 0;">
                                    <label class="col-md-1 form-control-label">备注</label>
                                    <div class="col-md-11">
                                        <input type="text" class="form-control" id="memo" v-model="department.memo"
                                               placeholder="">
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
                <div class="row" style="margin-left: 0;margin-right: 0;margin-bottom: 0">
                    <div class="col-md-12">
                        <div class="card"
                             style="border: 1px solid #5abfdd;margin-bottom: 10px;height: 160px;max-height: 160px;overflow: scroll">
                            <div class="card-header card-inverse card-info" style="padding: 4px">
                                机器配置
                                <button type="button" style="float: right;padding-top:0;padding-bottom:0;"
                                        class="text-success font-sm"
                                        @click="department.acceleratorList.length==0 && department.acceleratorList.push({name:'',ray:'',energy:'',doseRate:'',therapyType:''})">
                                    <i class="fa fa-plus"></i></button>
                            </div>
                            <div class="card-block" style="padding: 0;">
                                <table class="table table-bordered" style="margin-bottom: 0;">
                                    <thead>
                                    <tr class="table-info">
                                        <th style="text-align: center;padding: 2px;">名称</th>
                                        <th style="text-align: center;padding: 2px;">射线</th>
                                        <th style="text-align: center;padding: 2px;">能量</th>
                                        <th style="text-align: center;padding: 2px;">剂量率</th>
                                        <th style="text-align: center;padding: 2px;">治疗形式</th>
                                        <th style="text-align: center;width: 80px;padding: 2px;">操作</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="(item,index) in department.acceleratorList">
                                        <td style="padding: 0;"><input type="text" v-model="item.name"
                                                                       style="border: none;width: 100%;text-align: center"
                                                                       placeholder="请输入"></td>
                                        <td style="padding: 0;"><input type="text" v-model="item.ray"
                                                                       style="border: none;width: 100%;text-align: center"
                                                                       placeholder="请输入"></td>
                                        <td style="padding: 0;"><input type="text" v-model="item.energy"
                                                                       style="border: none;width: 100%;text-align: center"
                                                                       placeholder="请输入"></td>
                                        <td style="padding: 0;"><input type="text" v-model="item.doseRate"
                                                                       style="border: none;width: 100%;text-align: center"
                                                                       placeholder="请输入"></td>
                                        <td style="padding: 0;"><input type="text" v-model="item.therapyType"
                                                                       style="border: none;width: 100%;text-align: center"
                                                                       placeholder="请输入"></td>
                                        <td style="padding: 0;" class="text-xs-center">
                                            <a class="text-danger" @click="deleteMachine(index,item)"><i
                                                    class="fa fa-trash-o"></i>删除</a>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-3" v-styling="'parent'" v-show="bool == 0">
                        <fieldset class="form-group">
                            <select class="form-control" title="选择医院" name="parent" v-model="department.parent"
                                    v-validate="'required'" v-on:change="getUser()">
                                <option v-for="item in treenodes" :value="item.id">{{item.name}}</option>
                            </select>

                        </fieldset>
                        <span class="form-control-feedback">{{ errors.first('parent') }}</span>
                    </div>

                </div>
                <div class="px-3" style="text-align: center;margin-top: 20px;margin-bottom: 50px">
                    <a class="btn btn-info rounded" href="javascript:history.back()"><i
                            class="fa fa-arrow-circle-left"></i> 返回</a>
                    <button class="btn btn-info rounded" :disabled="errors.any()"><i class="fa fa-check"
                                                                                     style="color: #fff"></i> 提交
                    </button>
                </div>
            </div>

        </form>
    </div>
</template>
<script>
    import {Department, User} from '../../resources'
    import jstree from '../../widgets/jstree.vue'
    import {showResponse} from '../../misc/utils'
    import toastr from '../../misc/toastr.esm'
    import swal from 'sweetalert'

    export default {
        data: () => ({
            department: {
                leader: User.current().id,
                parent: '',
                name: '',
                acceleratorList: []
            },
            treenodes: [],
            bool: 1

        }),
        beforeRouteEnter(to, from, next) {
            console.log('to.query.parent-----',to.query.parent)
            Department.jstree(to.query.parent).then(tree => {
                next(vm => {
                    vm.treenodes = tree.data;
                    vm.department.parent = to.query.parent;
                    vm.$nextTick(() => vm.$store.state.isLoading = false)
                })
            })
        },
        watch: {
            'department.name': function (newValue, oldValue) {
                this.department.parent = this.department.name
            }
        },
        methods: {
            getUser() {

            },
            submit() {
                this.$validator.validateAll().then(success => {
                    if (!success) return;
                    if (this.department.acceleratorList.length > 0) {
                        for (var c in this.department.acceleratorList) {
                            if (this.department.acceleratorList[c].name == '') {
                                swal('操作失败', '机器配置的名称为空', 'error');
                                return
                            }
                            if (this.department.acceleratorList[c].ray == '') {
                                swal('操作失败', '机器配置的射线为空', 'error');
                                return
                            }
                            if (this.department.acceleratorList[c].energy == '') {
                                swal('操作失败', '机器配置的能量为空', 'error');
                                return
                            }
                            if (this.department.acceleratorList[c].doseRate == '') {
                                swal('操作失败', '机器配置的剂量率为空', 'error');
                                return
                            }
                            if (this.department.acceleratorList[c].therapyType == '') {
                                swal('操作失败', '机器配置的治疗形式为空', 'error');
                                return
                            }
                        }
                    }

                    Department.create(this.department).then(response => {
                        showResponse(response, () => this.$router.back())
                    })
                })
            },
            deleteMachine(index,item) {
                var that = this;
                if (item.id) {
                    swal({
                        type: 'warning',
                        title: '确定要删除吗?',
                        text: '点击确认后可执行彻底删除',
                        showCancelButton: true,
                        cancelButtonText: '取消',
                        confirmButtonText: '确认',
                        confirmButtonColor: '#DD6B55',
                        showLoaderOnConfirm: true,
                        closeOnConfirm: false
                    }, confirmed => {
                        if (confirmed) {
                            LinearAccelerator.deleteMachine({"accelerator": JSON.stringify(item)}).then(res => {
                                console.log('del-----', res);
                                if (res.data.msg == 'success') {
                                    swal({
                                        type: 'success',
                                        title: '删除成功！',
                                    });
                                    that.department.acceleratorList.splice(index, 1);
                                }
                            })

                        }
                    });
                }else{
                    that.department.acceleratorList.splice(index, 1);
                }
            }
        },
        components: {jstree}
    }
</script>
