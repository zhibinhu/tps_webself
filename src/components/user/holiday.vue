<template>
    <div>
        <div class="p-3">
            <div class="h3 m-0">节假日配置</div>
        </div>
        <form class="m-3" autocomplete="off" @submit.prevent="submit">
            <div class="card p-3 mb-3">
                <div class="form-group row" style="margin-top: 10px">
                    <div class="col-md-1">
                        <label class="">开始日期</label>
                    </div>
                    <div class="col-md-3">
                        <date-select class="col-sm-4" v-model="user.birthday"></date-select>
                    </div>
                </div>
            </div>
            <div class="px-3" style="text-align: center">
                <a class="btn btn-outline-secondary rounded mr-2" href="javascript:history.back()"><i
                        class="fa fa-arrow-circle-left"></i> 返回</a>
                <button class="btn btn-info rounded" :disabled="errors.any()"><i class="fa fa-check"
                                                                                 style="color: #fff"></i> 提交
                </button>
            </div>
        </form>
    </div>
</template>

<script>
    import {Docgroup} from '../../resources'
    import {showResponse} from '../../misc/utils'


    export default {
        data: () => ({
            docgroup: {

                name: ''
            }
        }),
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.$store.state.isLoading = false
            })
        },
        methods: {
            submit() {
                this.$validator.validateAll().then(success => {
                    if (!success) return
                    Docgroup.save(this.docgroup).then(response => {
                        showResponse(response, () => this.$router.back())
                    })
                })
            }
        }
    }
</script>
