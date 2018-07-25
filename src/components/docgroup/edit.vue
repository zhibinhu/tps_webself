<template>
    <div>
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <router-link to="/">首页</router-link>
            </li>
            <li class="breadcrumb-item">
                <router-link to="/docgroup">组管理</router-link>
            </li>
            <li class="breadcrumb-item active">编辑组</li>
        </ol>
        <form class="m-3" autocomplete="off" @submit.prevent="submit">
            <div class="card p-3 mb-3">
                <div class="form-group row" style="margin-top: 10px">
                    <div class="col-md-1">
                        <label class=""><span style="color: red;">*</span>组名</label>
                    </div>
                    <div class="col-md-3">
                        <input type="text" class="form-control" id="name" v-model="docgroup.name" placeholder="">
                    </div>
                </div>
            </div>
            <div class="px-3" style="text-align: center">
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
    import {Docgroup, User} from '../../resources'
    import {showResponse} from '../../misc/utils'


    export default {
        data: () => ({
            docgroup: {

                name: ''
            }
        }),


        beforeRouteEnter(to, from, next) {
            var id = to.params.id;
            Promise.all([Docgroup.get(id)]).then(([docgroup]) => {
                next(vm => {

                    vm.docgroup = docgroup.data;
                    vm.$nextTick(() => vm.$store.state.isLoading = false)
                })
            })
        },
        methods: {
            submit() {
                this.$validator.validateAll().then(success => {
                    if (!success) return;

                    if (this.docgroup.name == null || this.docgroup.name == '') {
                        swal('操作失败!', '组名为空', 'error');
                        return
                    }

                    Docgroup.update(this.docgroup).then(response => {
                        showResponse(response, () => this.$router.back())
                    })
                })
            }
        }
    }
</script>
