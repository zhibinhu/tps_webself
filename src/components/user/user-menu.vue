<template>
    <div class="selectize" :class="index > 5 ? 'dropup' : 'dropdown'" ref="dropdown">

        <a v-if="!user.status" data-toggle="dropdown" class="text-link">已禁用 <i class="fa fa-angle-down"></i></a>
        <span v-else-if="user.admin && !current.admin" class="text-muted"><span>{{user.roleName}}</span></span>
        <a v-else data-toggle="dropdown" class="text-link">{{user.roleName}} <i class="fa fa-angle-down"></i></a>

        <div class="dropdown-menu dropdown-menu-right">
            <div class="dropdown-title"><i class="ti-angle-left left" v-show="action != 'main'"
                                           @click="action = 'main'"></i>{{actions[action]}}
            </div>

            <div class="selectize-items" v-if="user.status && action == 'main'">
                <div v-if="user.roleId != -1">
                    <label class="selectize-item" v-for="item in roles" :key="item.id" :id="item.id">
                        <input type="radio" :value="item.id" v-model="user.roleId" @change="role(item)">
                        <span class="info">{{item.name}}</span>
                    </label>
                </div>
                <div v-else>
                    <label class="selectize-item">系统管理员</label>
                </div>
                <hr class="my-0 mx-3">
                <label class="selectize-item" @click.stop="action = 'ban'" v-show="user.id != 1">禁用用户</label>
            </div>

            <div class="selectize-items" v-if="!user.status && action == 'main'">
                <label class="selectize-item" @click.stop="action = 'unban'" v-show="user.id != 1">启用用户</label>
            </div>

            <div class="selectize-items font-sm p-3" v-if="action == 'ban'">
                <div class="mb-2">您确定要停用当前用户账号吗？</div>
                <ul class="text-grey pl-4">
                    <li>被停用的用户账号将无法登录系统</li>
                    <li>账号信息仍保留，方便工作交接和管理</li>
                    <li>账号可以恢复</li>
                </ul>
                <a class="btn btn-danger btn-block text-white" @click.stop="ban(0)">确定</a>
            </div>

            <div class="selectize-items font-sm p-3" v-if="action == 'del'">
                <p>确定要删除用户吗？</p>
                <a class="btn btn-danger btn-block text-white" @click.stop="del">确定</a>
            </div>

            <div class="selectize-items font-sm p-3" v-if="action == 'unban'">
                <p>您确定要启用当前用户帐号吗？</p>
                <p class="text-grey">该账号的角色将恢复为默认</p>
                <a class="btn btn-info btn-block text-white" @click.stop="ban(1)">确定</a>
            </div>
        </div>
    </div>
</template>

<script>
    import {User} from '../../resources'
    import toastr from '../../misc/toastr.esm'
    import swal from 'sweetalert'

    export default {
        name: 'usermenu',
        props: ['user', 'index', 'roles'],
        data() {
            return {
                initial: this.user.roleId,
                current: User.current(),
                actions: {
                    main: '用户菜单',
                    unban: '启用用户',
                    ban: '停用用户'
                },
                action: 'main'
            }
        },
        methods: {
            role(role) {  // 更改用户角色
                User.role(this.user.id, role.id).then(response => {
                    if (response.data.success) {
                        this.user.roleName = role.name;
                        swal('操作成功', '角色修改成功', 'success');
                        return this.close()
                    }
                    this.winReload();
                    swal('操作成功', response.data.msg, 'success');
                    this.user.roleId = this.initial
                })
            },
            del(exec) {
                User.delete(this.user.id).then(response => {
                    if (response.data.success) {
                        toastr.success('删除用户成功!', '', {timeOut: '1000'});
                        this.action = 'menu';
                        this.close()
                    }
                })
            },
            ban(status) { // 启用用户
                User.status(this.user.id, status).then(response => {
                    if (response.data.success) {
                        toastr.success(this.actions[this.action] + '成功!', '', {timeOut: '1000'});
                        this.user.status = status;
                        this.action = 'menu';
                        this.close();
                        this.winReload()
                    }
                })
            },
            close() {
                this.$refs.dropdown.classList.remove('show');
                this.action = 'main'
            },
            winReload() {
                window.location.reload();
            }
        }
    }
</script>
