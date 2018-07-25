<template>
    <div>
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <router-link to="/">首页</router-link>
            </li>
            <li class="breadcrumb-item">
                <router-link to="/permission">权限管理</router-link>
            </li>
            <li class="breadcrumb-item active">{{permission.name}}</li>
        </ol>
        <form autocomplete="off" @submit.prevent="submit" class="mx-3">
            <div class="card mb-3 p-3 b-0">

                <div class="form-group row">
                    <label class="col-form-label col-sm-2"><span style="color: red;">*</span>名称</label>
                    <div class="col-sm-10">
                        <input name="name" class="form-control" v-model="permission.name" v-validate="'required'"
                               placeholder="名称" title="权限名称">
                        <span class="form-control-feedback">{{ errors.first('name') }}</span>
                    </div>
                </div>

                <div class="form-group row">
                    <label class="col-form-label col-sm-2"><span style="color: red;">*</span>编码(权限唯一标识)</label>
                    <div class="col-sm-10">
                        <input name="code" v-model="permission.code" v-validate="'required|min:2|max:64'"
                               class="form-control" title="编码" placeholder="权限编码">
                        <span class="form-control-feedback">{{ errors.first('code') }}</span>
                    </div>
                </div>

                <div class="form-group row">
                    <label class="col-form-label col-sm-2">图标</label>
                    <div class="col-sm-10 d-flex align-items-center">
                        <input class="form-control" v-model="permission.icon" style="width:150px;">
                        <i :class="permission.icon"></i>
                        <span class="mx-2 text-grey">打开<a href="http://www.yeahzan.com/fa/facss.html" target="_blank">图标网</a>,选择一个图标,填入空格处,如: fa-asterisk</span>
                    </div>
                </div>

                <div class="form-group row">
                    <label class="col-form-label col-sm-2">指定父级权限</label>
                    <div class="col-sm-10">
                        <input class="form-control" id="parent" placeholder="父级权限" readonly>
                        <jstree class="mt-0" attach="#parent" :treenodes="treenodes" v-model="permission.parent"
                                dropdown="down"></jstree>
                    </div>
                </div>

                <div class="form-group row">
                    <label class="col-form-label col-sm-2">排序</label>
                    <div class="col-sm-10">
                        <input name="priority" v-model="permission.priority" class="form-control" type="number"
                               max="9999" min="-9999" placeholder="排序越大越靠前">
                    </div>
                </div>

                <div class="form-group row">
                    <label class="col-form-label col-sm-2">描述</label>
                    <div class="col-sm-10">
                        <textarea name="description" v-model="permission.description" class="form-control"
                                  placeholder="权限描述" rows="2"></textarea>
                    </div>
                </div>
            </div>
            <div class="px-3" style="text-align: center">
                <a class="btn btn-info rounded mr-2" href="javascript:history.back()"><i
                        class="fa fa-arrow-circle-left"></i> 返回</a>
                <button class="btn btn-info rounded" :disabled="errors.any()"><i class="fa fa-check"
                                                                                 style="color: #fff"></i> 提交
                </button>
            </div>

        </form>
    </div>
</template>

<script>
    import jstree from '../../widgets/jstree.vue'
    import {Permission} from '../../resources'
    import {showResponse} from '../../misc/utils'
    import dict from '../../widgets/dict.vue'

    export default {
        data: () => ({
            permission: {},
            treenodes: []
        }),
        beforeRouteEnter(to, from, next) {
            Promise.all([Permission.get(to.params.id), Permission.jstree()]).then(([perm, tree]) => {
                next(vm => {
                    vm.permission = perm.data;
                    vm.treenodes = tree.data;
                    vm.$nextTick(() => vm.$store.state.isLoading = false)
                })
            })
        },
        beforeRouteUpdate(to, from, next) {
            this.$nextTick(() => this.$store.state.isLoading = true);
            Permission.get(to.params.id).then(perm => {
                this.permission = perm.data;
                this.$nextTick(() => {
                  this.$store.state.isLoading = false
                  next()
                });
            })
          next()
        },
        methods: {
            submit() {
                this.$validator.validateAll().then(success => {
                    if (!success) return;
                    Permission.update(this.permission).then(response => {
                        showResponse(response, () => this.$router.back())
                    })
                })
            }
        },
        mounted() {
        },
        components: {jstree, dict}
    }
</script>
