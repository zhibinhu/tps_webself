<template>
    <div>
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <router-link to="/">首页</router-link>
            </li>
            <li class="breadcrumb-item active">权限管理</li>
        </ol>

        <div class="row no-gutters flex-grow">
            <div class="col-md-5">
                <div class="bg-white h-100 mx-3 p-3 shadowed">
                    <div class="d-flex justify-content-between py-3">
                        <span class="text-muted">部门列表</span>
                        <router-link to="/permission/new"><span class="img img-xxs rounded bg-blue">┼</span> 新增权限
                        </router-link>
                    </div>
                    <tree :treenodes="treenodes"></tree>
                </div>
            </div>

            <div class="col-md-7 mt-3 mt-md-0">
                <div class="layer-loading" v-show="loading"><i></i><i></i><i></i></div>
                <div class="bg-white h-100 mx-3 p-3 ml-md-0 shadowed">
                    <div class="d-flex justify-content-between py-3">
                        <span class="text-muted">没有选择部门</span>
                        <a href="#/permission/new">
                            <span class="img img-xxs rounded bg-blue">┼</span> 新增权限</a>
                    </div>
                    <form autocomplete="off" @submit.prevent="submit" class="mx-3 mb-3">
                        <div class="form-group row" v-styling="'name'">
                            <label class="col-form-label col-sm-2">部门名称</label>
                            <div class="col-sm-10">
                                <input name="name" v-model="department.name" v-validate="'required'" title="部门名称"
                                       class="form-control" placeholder="部门名称" maxlength="32">
                                <span class="form-control-feedback">{{ errors.first('name') }}</span>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-form-label col-sm-2">负责人</label>
                            <div class="col-sm-10 d-flex align-items-center">
                                <selectize v-model="department.leader"></selectize>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-form-label col-sm-2">上级部门</label>
                            <div class="col-sm-10">
                                <input class="form-control" id="departmentName" placeholder="上级部门" readonly>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-form-label col-sm-2">优先级</label>
                            <div class="col-sm-10">
                                <input name="priority" v-model="department.priority" class="form-control" type="number"
                                       placeholder="优先级" maxlength="5">
                            </div>
                        </div>
                        <div class="px-3">
                            <button class="btn btn-outline-info rounded" :disabled="errors.any()"><i
                                    class="fa fa-cloud-upload"></i> 保存
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import selectize from '../../widgets/selectize.vue'
    import {Department} from '../../resources'
    import {del} from '../../misc/utils'
    import tree from './tree.vue'

    export default {
        data: () => ({
            department: {},
            treenodes: [],
            loading: false,
        }),
        beforeRouteEnter(to, from, next) {
            Department.tree().then(response => {
                next(vm => {
                    vm.treenodes = response.data
                    vm.$nextTick(() => vm.$store.state.isLoading = false)
                })
            })
        },
        beforeRouteUpdate(to, from) {

        },
        methods: {
            remove(id, index) {
            }
        },
        components: {selectize, tree}
    }
</script>
