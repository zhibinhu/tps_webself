<template>
    <div>
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <router-link to="/">首页</router-link>
            </li>
            <li class="breadcrumb-item active">短信记录</li>
        </ol>
        <div class="row" style="margin-left: 15px;margin-bottom: 12px">
            <!--<label for="hospitalName" style="width:75px;">接收/发送:</label>-->
            <!--<div class="col-md-3">-->
                <!--<select class="form-control" v-model="type">-->
                    <!--<option value="">请选择</option>-->
                    <!--<option value="1">发送</option>-->
                    <!--<option value="2">接收</option>-->
                <!--</select>-->
            <!--</div>-->
            <label for="hospitalName" style="width:75px;">业务分类:</label>
            <div class="col-md-3">
                <select class="form-control" v-model="template">
                    <option value="">请选择</option>
                    <option value="1">靶区勾画</option>
                    <option value="2">计划申请</option>
                    <option value="3">计划验证</option>
                    <option value="4">验证码模版</option>
                </select>
            </div>
            <label for="hospitalName" style="width:75px;">手机号码:</label>
            <div class="col-md-3">
                <input type="text" class="form-control" v-model="phone"/>
            </div>
            <div style="height:10px;width:100%;">
            </div>
            <label for="hospitalName" style="width:75px;">发送时间:</label>
            <div class="col-md-3">
                <input type="date" name="date" class="form-control" v-model="start"/>
            </div>
            <span style="height:40px;line-height:40px;">---</span>
            <div class="col-md-3">
                <input type="date" name="date" class="form-control" v-model="end"/>
            </div>
            <div class="col-md-1">
                <button type="button" class="btn btn-info rounded" @click="query(1)"><i class="fa fa-search"
                                                                                        style="color: #fff"></i> 查询
                </button>
            </div>
        </div>
        <div class="card mx-3 logCardBackground">
            <div class="layer-loading" v-show="loading"><i></i><i></i><i></i></div>
            <table class="table table-advanced table-hover treetable">
                <thead>
                <tr>
                    <th>id</th>
                    <th>电话</th>
                    <th>短信内容</th>
                    <th>短信状态</th>
                    <th>业务分类</th>
                    <th>发送时间</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in SmsList.rows" :key="item.id">
                    <td class="hidden-sm-down">{{item.id}}</td>
                    <td class="hidden-sm-down">{{item.phone}}</td>
                    <td class="hidden-sm-down">{{item.content}}</td>
                    <td class="hidden-sm-down" v-if="item.status=== 1">发送成功</td>
                    <td class="hidden-sm-down" v-if="item.status=== 0">发送失败</td>
                    <td class="hidden-sm-down" v-if="item.template===1">靶区勾画</td>
                    <td class="hidden-sm-down" v-if="item.template===2">计划申请</td>
                    <td class="hidden-sm-down" v-if="item.template===3">计划验证</td>
                    <td class="hidden-sm-down" v-if="item.template===4">验证码</td>
                    <td class="hidden-sm-down" v-if="item.template == null">{{item.template}}</td>
                    <td class="hidden-lg-down">{{item.created}}</td>
                </tr>
                </tbody>
            </table>
            <!--分页-->
            <v-pagination :pageNumChange.sync="pageNumChange" :cur.sync="cur" :all.sync="all" :count.sync="count"
                          :curIndex_s.sync="curIndex_s" @listen="paging"></v-pagination>
        </div>
    </div>
</template>
<script>
    import {
        del,
    } from '../../misc/utils'
    import {
        Docgroup,
        Sms
    } from '../../resources'
    import Pagination from '../../widgets/pagination.vue'
    import paginations from '../../widgets/paginations.vue'
    import {
        debounce
    } from '../../misc/utils'

    var page_backup = null; // 初始化分页数据备份

    export default {
        data: () => ({
            loading: 0,
            keyword: '',
            pageSize: '10',
            cur: 1,
            all: 1,
            curIndex_s: 1,
            count: 0,
            type: '',
            start: '',
            end: '',
            template: '',
            phone: '',
            SmsList: [],
            page: {},
            pageNumChange: 0
        }),
        beforeRouteEnter(to, from, next) {
            Sms.getSms({
                currentPage: '1',
                pageSize: '10'
            }).then((res) => {
                next(vm => {
                    vm.SmsList = res.data.data;
                    vm.all = parseInt(vm.SmsList.total % vm.pageSize == 0 ? vm.SmsList.total / vm.pageSize : vm.SmsList.total / vm.pageSize + 1);
                    vm.count = vm.SmsList.total;
                    vm.$nextTick(() => vm.$store.state.isLoading = false);

                })
            })
        },
        beforeRouteUpdate(to, from, next) {
            this.$store.state.isLoading = false
            this.paging(1,next)
        },
        created() {
            this._getSms()
        },
        methods: {
            queryData() {
                this._getSms();
                this.paging()
            },
            _getSms() {
                Sms.getSms({
                    currentPage: '1',
                    pageSize: '10',
                    start: this.start,
                    end: this.end,
                    type: this.type,
                    template: this.template,
                    phone: this.phone
                }).then((res) => {
                    this.SmsList = res.data.data;
                    this.all = parseInt(this.SmsList.total % this.pageSize == 0 ? this.SmsList.total / this.pageSize : this.SmsList.total / this.pageSize + 1);
                    this.count = this.SmsList.total
                })
            },
            paging(pn, cb) { // 分页查询
                this.loading = 1;
                Sms.getSms({
                    currentPage: '1',
                    pageSize: '10',
                    currentPage: pn || 1,
                    start: this.start,
                    end: this.end,
                    type: this.type,
                    template: this.template,
                    phone: this.phone
                }).then(response => {
                    this.SmsList = response.data.data;
                    this.all = parseInt(this.SmsList.total % this.pageSize == 0 ? this.SmsList.total / this.pageSize : this.SmsList.total / this.pageSize + 1);
                    this.count = this.SmsList.total;
                    this.loading = 0;
                    cb && cb();
                })
            },
            paging_delayed: debounce(function () {
                this.paging(1)
            }, 400),
            edit(id) {
                this.$router.push('/docgroup/' + id)
            },
            remove(id, index) {
                del(this, Docgroup, id, page.items, index)
            },
            query(id) {

                this.curIndex_s = id;
                this.paging(1);
                this.pageNumChange++;
            }

        },
        watch: {
            keyword(v) {
                if (!v && page_backup) { // 已经备份过原始数据, 直接使用跳过查询
                    return this.page = page_backup
                }

                this.loading = 1;
                this.paging_delayed()
            }
        },
        components: {Pagination, 'v-pagination': paginations}
    }
</script>
