<template>
    <div>
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <router-link to="/">首页</router-link>
            </li>
            <li class="breadcrumb-item active">数据备份</li>
        </ol>
        <div class="row" style="margin-left: 15px;margin-bottom: 12px">
            <div class="col-md-1">
                <button type="button" class="btn btn-info rounded" @click="save"><i class="fa fa-plus"
                                                                                    style="color: #fff"></i> 新增备份
                </button>
            </div>
        </div>
        <div class="card mx-3 logCardBackground">
            <div class="layer-loading" v-show="loading"><i></i><i></i><i></i></div>

            <table class="table table-advanced table-hover treetable">
                <thead>
                <tr>
                    <th>id</th>
                    <th>备份时间</th>
                    <th>备份路径</th>
                    <th>备份文件名</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in backupList" :key="item.id">
                    <td class="hidden-sm-down">{{item.id}}</td>
                    <td class="hidden-sm-down">{{item.fileTime}}</td>
                    <td class="hidden-lg-down">{{item.filePath}}</td>
                    <td class="hidden-lg-down">{{item.fileName}}</td>
                </tr>
                </tbody>
            </table>
            <!--<v-pagination :pageNumChange.sync="pageNumChange" :cur.sync="cur" :all.sync="all" :count.sync="count"-->
            <!--:curIndex_s.sync="curIndex_s" @listen="paging"></v-pagination>-->
        </div>
    </div>
</template>
<script>
    import {Backup} from '../../resources'
    import Pagination from '../../widgets/pagination.vue'
    import paginations from '../../widgets/paginations.vue'
    import swal from 'sweetalert'

    var page_backup = null  // 初始化分页数据备份

    export default {
        data: () => ({
            loading: 0,
            keyword: '',
            start: '',
            end: '',
            backupList: {},
            listSize: 0,
            cur: 1,
            all: 1,
            count: 0,
            curIndex_s: 1,
            pageNumChange: 0
        }),
        beforeRouteEnter(to, from, next) {
            Backup.query().then((data) => {
                next(vm => {
                    if (data.data.data != null) {
                        vm.backupList = data.data.data;
                        vm.listSize = vm.backupList.length;
                    }
                    vm.$nextTick(() => vm.$store.state.isLoading = false)
                })
            })
        },
        beforeRouteUpdate(to, from, next) {
            this.$store.state.isLoading = false
          next()
        },
        methods: {
            // 新增备份
            save() {
                let length = this.backupList.length;
                console.log("backupList.length=" + length);
                if (length != undefined) {
                    Backup.execute({length: this.backupList.length}).then((res) => {
                        this.alert(res);
                    });
                } else {
                    Backup.execute({}).then((res) => {
                        this.alert(res);
                    });
                }
            },
            // 手动刷新
            reload() {
                window.location.reload();
            },
            // 提示框
            alert(res) {
                if (res.data.code == 1) {
                    swal({type: 'success', title: '备份成功!'}, confirmed => {
                        if (confirmed) {
                            this.reload();
                        }
                    })
                } else {
                    swal({type: 'error', title: '备份失败!'});
                }
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
