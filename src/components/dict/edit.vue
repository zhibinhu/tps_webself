<template>
    <div>
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <router-link to="/">首页</router-link>
            </li>
            <li class="breadcrumb-item">
                <router-link to="/dict">字典管理</router-link>
            </li>
            <li class="breadcrumb-item active">{{code}}</li>
        </ol>
        <form autocomplete="off" @submit.prevent="submit" class="mx-3">
            <div class="card mb-3 p-3 b-0">
                <div class="mb-3">
                    <h4 class="card-title">必填项</h4>
                    <span class="text-muted">These fileds are <code>required</code>.</span>
                </div>
                <div class="row">
                    <label class="form-group col-lg-7">字典编码
                        <input name="code" v-model="code" class="form-control" placeholder="字典编码" readonly>
                    </label>
                </div>
                <label class="form-group">字典描述<input name="description" v-model="description" class="form-control"
                                                     placeholder="描述" maxlength="256"></label>
                <div class="form-group">
                    <button class="btn btn-outline-info btn-add" type="button" @click="add"><i
                            class="fa fa-plus-square"></i> 添加键值对
                    </button>
                </div>
                <div class="row">
                    <label class="col-5 col-md-5 col-lg-3">键</label>
                    <label class="col-7 col-md-6 col-lg-4">值</label>
                    <label class="hidden-md-down col-lg-4 col-xl-3">注释</label>
                    <label class="hidden-lg-down col-xl-1">排序</label>
                    <label class="hidden-sm-down col-md-1">操作</label>
                </div>
                <div class="row" v-for="(item, index) in dicts">
                    <div class="form-group col-5 col-md-5 col-lg-3" v-styling="'key' + index">
                        <input :name="'key' + index" v-model="item.key" class="form-control" title="键"
                               v-validate="'required|max:32'" placeholder="键">
                        <span class="form-control-feedback">{{ errors.first('key' + index) }}</span>
                    </div>
                    <div class="form-group col-7 col-md-6 col-lg-4" v-styling="'value' + index">
                        <input :name="'value' + index" v-model="item.value" class="form-control" title="值"
                               v-validate="'required|max:64'" placeholder="值">
                        <span class="form-control-feedback">{{ errors.first('value' + index) }}</span>
                    </div>
                    <div class="form-group hidden-md-down col-lg-4 col-xl-3">
                        <input :name="'comment' + index" v-model="item.comment" class="form-control" maxlength="255"
                               placeholder="注释">
                    </div>
                    <div class="form-group hidden-lg-down col-xl-1">
                        <input :name="'priority' + index" v-model="item.priority" class="form-control" type="number"
                               max="99999" placeholder="排序">
                    </div>
                    <div class="form-group hidden-sm-down col-md-1">
                        <button type="button" class="btn btn-outline-info" @click="remove(index)"
                                :disabled="dicts.length <= 1"><i class="fa fa-trash-o"></i></button>
                    </div>
                </div>
            </div>
            <div class="px-3">
                <a class="btn btn-outline-secondary rounded mr-2" href="javascript:history.back()"><i
                        class="fa fa-arrow-circle-left"></i> 返回</a>
                <button class="btn btn-outline-info rounded" :disabled="errors.any()"><i class="fa fa-cloud-upload"></i>
                    提交
                </button>
            </div>
        </form>
    </div>
</template>

<script>
    import {Dict} from '../../resources'
    import {showResponse} from '../../misc/utils'

    export default {
        data: () => ({
            dicts: [],
            description: '',
            code: ''
        }),
        beforeRouteEnter(to, from, next) {
            Dict.get(to.params.id).then(response => {
                let dicts = response.data;
                let dict = dicts[0];
                next(vm => {
                    vm.description = dict.description;
                    vm.code = dict.code;
                    vm.dicts = dicts;
                    vm.$nextTick(() => vm.$store.state.isLoading = false)
                })
            })
        },
        methods: {
            add() {
                this.dicts.unshift({
                    priority: this.dicts[0].priority + 1,
                    comment: '',
                    value: '',
                    key: ''
                })
            },
            remove(index) {
                this.dicts.splice(index, 1)
            },
            submit() {
                this.$validator.validateAll().then(success => {
                    if (!success) return;
                    Dict.update(this.$data).then(response => {
                        showResponse(response, () => this.$router.back())
                    })
                })
            }
        },
        beforeRouteUpdate(to, from, next) {
            Dict.get(to.params.id).then(response => {
                let dicts = response.data;
                let dict = dicts[0];
                this.dicts = dicts;
                this.code = dict.code;
                this.description = dict.description
              next()
            });
            next()
        }
    }
</script>
