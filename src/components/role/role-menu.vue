<template>
    <div class="selectize" :class="['drop' + (dropup ? 'up' : 'down')]" ref="dropdown">
        <a data-toggle="dropdown" class="list-group-item text-primary font-sm b-0"  @click="showOrHide">
            <span class="img img-xxs rounded bg-blue mr-2">┼</span> 创建角色
        </a>


        <form class="dropdown-menu mt-1" :class="['dropdown-menu-' + direction]" autocomplete="off"
              @submit.prevent="submit">
            <div class="dropdown-title"><i class="ti-angle-left left" v-show="action.match(/edit|del/)"
                                           @click="action = 'main'"></i>{{actions[action]}}
            </div>

            <div class="selectize-items font-sm p-3" v-if="action.match(/add/)">
                <div class="form-group" v-styling="'name'">
                    <input class="form-control" name="name" v-model="name" v-validate="'required'" placeholder="名称"
                           maxlength="32" tabindex="-1">
                </div>
                <div class="form-group">
                    <textarea class="form-control" v-model="description" placeholder="备注"
                              style="resize: none"></textarea>
                </div>
                <p class="text-grey">角色名称全局唯一不能重复。</p>
                <button class="btn btn-danger btn-block text-white" :disabled="errors.any() || loading">确定</button>
            </div>

            <!--<div class="selectize-items font-sm p-3" v-if="action.match(/edit/)">-->
                <!--<div class="form-group" v-styling="'name'">-->
                    <!--<input class="form-control" name="name" v-model="me.name" v-validate="'required'" placeholder="名称"-->
                           <!--maxlength="32" tabindex="-1">-->
                <!--</div>-->
                <!--<div class="form-group">-->
                    <!--<textarea class="form-control" v-model="me.description" placeholder="备注"-->
                              <!--style="resize: none"></textarea>-->
                <!--</div>-->
                <!--<p class="text-grey">角色名称全局唯一不能重复。</p>-->
                <!--<button class="btn btn-danger btn-block text-white" :disabled="errors.any() || loading">确定</button>-->
            <!--</div>-->

            <!--<div class="selectize-items font-sm" v-if="action == 'main'">-->
                <!--<div class="selectize-items font-sm p-3">-->
                    <!--<div class="form-group" v-styling="'name'">-->
                        <!--<input class="form-control" name="name" v-model="me.name" v-validate="'required'"-->
                               <!--placeholder="名称" maxlength="32" tabindex="-1">-->
                    <!--</div>-->
                    <!--<div class="form-group">-->
                        <!--<textarea class="form-control" v-model="me.description" placeholder="备注"-->
                                  <!--style="resize: none"></textarea>-->
                    <!--</div>-->
                    <!--<p class="text-grey">角色名称全局唯一不能重复。</p>-->
                    <!--<button class="btn btn-danger btn-block text-white" :disabled="errors.any() || loading">确定</button>-->
                <!--</div>-->
            <!--</div>-->

            <!--<div class="selectize-items font-sm p-3" v-if="action == 'del'">-->
                <!--<p>确定要永远删除这个角色吗？</p>-->
                <!--<a class="btn btn-danger btn-block text-white" @click.stop="del">确定</a>-->
            <!--</div>-->

        </form>
    </div>
</template>

<script>
    import {Role} from '../../resources'
    import toastr from '../../misc/toastr.esm'
    import swal from 'sweetalert'

    export default {
        name: 'rolemenu',
        props: [
            'direction',  // 菜单左右方向
            'dropup',     // 菜单向上
            'initial',    // 初始操作(覆盖action)
            'icon',       // 按钮图标
            'role'        // 当前角色
        ],
        data() {
            return {
                loading: false,
                actions: {        // 所有菜单操作
                    main: '角色菜单',
                    edit: '编辑角色',
                    add: '创建角色',
                    del: '删除角色'
                },
                me:{},
                action: 'main',    // 当前操作
                description: '',
                name: ''

            }
        },
        created() {
            this.action = this.initial || 'main';  // 覆盖action初始值
            if (this.role) {                      // copy角色数据
                this.me = Object.assign({}, this.role)
            }

        },
        methods: {
            showOrHide(e){
                    this.name='';
                    this.description='';
                    this.me={};
            },
            submit(e) {  // 创建角色
                this.loading = true;
                this.me.name=this.name;
                this.me.description=this.description;
//                console.log('this.me----',this.me);
//                Role[this.action == 'edit' ? 'update' : 'save'](this.action == 'edit' ? this.me:this.meAdd).then(response => {
                Role.save(this.me).then(response => {
                    this.loading = false;
                    if (!response.data.success) {
                        if($.trim($('.selectize-items input').val())=='') {
                            return toastr.error(response.data.errors.NotBlank);
                        }else{
                            return toastr.error(response.data.msg);
                        }
                    }
                    this.me = response.data.role;
                    this.$emit(this.action, this.me)
                    this.close();
                    swal({type: 'success', title: '操作成功', text: '请为新角色划分权限!'});

                }).catch(error => {
                    this.loading = false
                })
            },
            close() {
                this.$refs.dropdown.classList.remove('show');

            }
        },
        watch: {
            role(v) {
                this.me = Object.assign({}, v)
            }
        }
    }
</script>
