<template>
    <div>
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <router-link to="/">首页</router-link>
            </li>
            <li class="breadcrumb-item active">权限管理</li>
        </ol>
        <div class="card mx-3 b-0">
            <div class="layer-loading" v-show="loading"><i></i><i></i><i></i></div>
            <div class="text-muted p-3 pb-0">系统权限列表.</div>
            <form action="/permission" class="form-inline px-3 mb-3" autocomplete="off" @submit.prevent="paging">
                <button type="button" class="btn btn-info rounded" title="expandAll" @click="toggle">展开全部</button>
                <button type="button" class="btn btn-info rounded" style="margin-left: 10px" title="collapseAll"
                        @click="toggle">折叠全部
                </button>
                <router-link class="btn btn-info rounded rounded ml-auto" to="/permission/new">
                    <i class="fa fa-plus"></i> 新增
                </router-link>
            </form>

            <table class="table table-advanced table-hover treetable" ref="treetable">
                <thead>
                <tr>
                    <th>名称</th>
                    <th class="hidden-sm-down">编码</th>
                    <th class="hidden-lg-down">优先级</th>
                    <th class="text-xs-center">操作</th>
                </tr>
                </thead>
                <tbody>
                <tr :data-id="item.id" :data-parent="item.parent" v-for="(item, index) in items" :key="item.id">
                    <td><a class="text-link" @click.stop="edit(item.id)"><i :class="item.icon"></i>{{item.name}}</a>
                    </td>
                    <td class="hidden-sm-down">{{item.code}}</td>
                    <td class="hidden-lg-down">{{item.priority}}</td>
                    <td class="text-xs-center">
                        <router-link :to="'/permission/' + item.id"><i class="fa fa fa-pencil"></i>编辑</router-link>
                        <router-link class="text-grey" :to="'/permission/new?parent=' + item.id"><i
                                class="fa fa-angle-double-down"></i>添加下级
                        </router-link>
                        <a class="text-danger" @click="remove(item.id, index)"><i class="fa fa-trash-o"></i>删除</a>
                    </td>
                </tr>
                </tbody>
            </table>
            <div style="margin-bottom: 20px;text-align: center;">

            </div>
        </div>
    </div>
</template>
<script>
    import {Permission} from '../../resources'
    import {del, treeify} from '../../misc/utils'
    let storage = localStorage;
    import $ from 'jquery'

    var stored = storage.getItem('permissionExpanded');  // get stored expanded nodes
    var expanded = stored ? JSON.parse(stored) : {};

    export default {
        data: () => ({
            loading: false,
            items: []
        }),
        beforeRouteEnter(to, from, next) {
            Permission.treetable().then(response => {
                next(vm => {
                    vm.items = response.data;
                    vm.$nextTick(() => {
                        vm.$treetable = treeify(vm.$refs.treetable, expanded);
                        vm.$store.state.isLoading = false
                    })
                })
            })
        },
        methods: {
            toggle(e) {
                var $this = $(e.target);
                $this.addClass('active').siblings().removeClass('active');
                this.$treetable[e.target.title]()
            },
            edit(id) {
                this.$router.push('/permission/' + id)
            },
            remove(id, index) {
                del(this, Permission, id, this.items, index)
            }
        },
        destroyed() {
            storage.setItem('permissionExpanded', JSON.stringify(expanded))
        }
    }
</script>
