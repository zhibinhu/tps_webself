<template>
    <div>
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <router-link to="/">首页</router-link>
            </li>
            <li class="breadcrumb-item active">权限管理</li>
        </ol>

        <div class="card mx-3">
            <div class="p-3">
                <div class="text-muted mb-3">系统权限列表</div>
                <router-link to="/permission/new"><span class="img img-xxs rounded bg-blue">┼</span> 新增权限</router-link>
            </div>

            <div class="d-flex py-2 px-4 text-muted">
                <span class="mr-auto">权限名</span>
                <span class="column">编码</span>
                <span class="column text-center">操作</span>
            </div>
            <tree class="px-3" :treenodes="treenodes"></tree>
        </div>
    </div>
</template>
<script>
    import {Permission} from '../../resources'
    import {del} from '../../misc/utils'
    import tree from './tree.vue'

    export default {
        data: () => ({
            loading: false,
            treenodes: []
        }),
        beforeRouteEnter(to, from, next) {
            Permission.tree().then(response => {
                next(vm => {
                    vm.treenodes = response.data;
                    vm.$nextTick(() => vm.$store.state.isLoading = false)
                })
            })
        },
        methods: {
            remove(id, index) {
            }
        },
        components: {tree}
    }
</script>
<style>
    .column {
        width: calc(100vw / 5)
    }
</style>
