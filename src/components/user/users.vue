<template>
    <div class="d-flex flex-column">
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <router-link to="/">首页</router-link>
            </li>
            <li class="breadcrumb-item">用户</li>
        </ol>
        <div class="row no-gutters flex-grow userMargin">
            <div class="col-md-8 col-lg-3">
                <div id="left" class="bg-white  mx-3 p-3 shadowed" style="min-height:800px!important; ">
                    <div class="input-holder b-ddd rad-3"><i class="ti-search"></i>
                        <input name="keyword" v-model.trim="keyword" class="form-control"
                               :placeholder="'搜索' + typename">
                    </div>
                    <div class="mt-3 px-3 bb-eee">用户</div>
                    <div class="list-group stateful no-border mt-2">

                        <a href="javascript:void(0)" @click="toFirstPage('/users/all')" class="list-group-item user-list-group-item"
                                     active-class="status-primary">
                             <span class="curUserType">
                            <i
                                    class="ti-user"></i>&nbsp;&nbsp;所有用户
                             </span>
                        </a>


                        <a href="javascript:void(0)" @click="toFirstPage('/users/fresh')" class="list-group-item user-list-group-item"
                                     active-class="status-primary">
                            <span class="curUserType">
                            <i
                                    class="ti-face-smile"></i>&nbsp;&nbsp;启用的用户
                            </span>
                        </a>


                        <a href="javascript:void(0)" @click="toFirstPage('/users/ban')" class="list-group-item user-list-group-item"
                                     active-class="status-primary">
                            <span class="curUserType">
                            <i
                                    class="ti-na"></i>&nbsp;&nbsp;禁用的用户
                            </span>
                        </a>

                    </div>
                    <div class="mt-3 px-3 bb-eee">所在医院</div>

                    <div class="list-group stateful no-border mt-2">

                        <select id="checkedHos" class="form-control" title="选择医院" v-model="checkedNames"
                                v-on:change="choose()">
                            <option :value=undefined selected>请选择</option>
                            <option v-for="item in depts" :value="item.id">{{item.name}}</option>
                        </select>

                    </div>

                    <!--<router-link to="/department/new" class="list-group-item text-primary font-sm b-0 mt-2">-->
                        <!--<div class="btn btn-info rounded"><span>┼</span>&nbsp;&nbsp;创建医院</div>-->
                    <!--</router-link>-->
                </div>

            </div>

            <div class="col-md-8 col-lg-9 mt-3 mt-md-0">
                <div class="layer-loading" v-show="loading"><i></i><i></i><i></i></div>
                <div id="right" class="bg-white h-100 mx-3 ml-md-0 shadowed" style="min-height: 800px ">
                    <div class="d-flex justify-content-between align-items-center p-4 text-themedark" v-if="dept">
                        <div class="font-xl">{{typename}} · {{page.totalCount}}</div>

                        <div class="font-sm">
                            <router-link to="/user/add" class="text-primary font-sm">
                                <div class="btn btn-info rounded"><span>┼</span> 添加用户</div>
                            </router-link>

                            <add-user-menu class="hidden-sm-down" :dept="dept" @added="added"></add-user-menu>
                            <!--<dept-menu :dept="dept" @del="del" class="ml-3 text-link"></dept-menu>-->
                        </div>
                    </div>
                    <div class="d-flex justify-content-between align-items-center p-4 text-themedark" v-else>
                        <div class="font-xl">{{typename}} · {{page.totalCount}}</div>
                        <router-link to="/user/add" class="text-primary font-sm">
                            <div class="btn btn-info rounded"><span>┼</span> 添加用户</div>
                        </router-link>
                    </div>

                    <div class="row no-gutters align-items-center py-2 px-4 bt-eee" v-for="(item, index) in page.items"
                         :key="item.id" style="background: white">
                        <router-link class="col d-flex text-grey" :to="'/user/' + item.id">
                            <span class="img rounded" style="margin-bottom: 5px">
                                <img class="img rounded" :src="item.avatar" style="width: 40px;height: 40px"/>
                            </span>
                            <div class="ml-3">
                                <div>{{item.userName}}</div>
                                <div class="text-muted font-xxs">{{item.phone}}</div>
                            </div>
                        </router-link>
                        <div class="col-3 hidden-sm-down">{{item.departmentName}}</div>
                        <div class="col-3 d-flex justify-content-end">
                            <user-menu :roles="roles" :user="item" :index="index"></user-menu>
                        </div>
                    </div>

                    <v-pagination :pageNumChange.sync="pageNumChange" :cur.sync="cur" :all.sync="all"
                                  :count.sync="count" :curIndex_s.sync="curIndex_s" @listen="paging"
                                  style="background: white;margin-top: 10px;"></v-pagination>
                    <div style="margin-bottom: 10px;height: 10px"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {User, Role, Department, netURL} from '../../resources'
    import Pagination from '../../widgets/pagination.vue'
    import {debounce} from '../../misc/utils'
    import AddUserMenu from './add-user-menu.vue'
    import UserMenu from './user-menu.vue'
//    import DeptMenu from './dept-menu.vue'
    import paginations from '../../widgets/paginations.vue'

    var page_backup = null;  // 初始化分页数据备份
    var dept_map = null;     // 部门Map数据

    var mapAttr = function (e) {
        e.opened = false;
        e.children.map(mapAttr);
        return e
    }

    export default {
        data: () => ({
            loading: 0,   // 列表加载指示
            keyword: '',  // 搜索关键字
            type: '',     // 过滤用户类型
            dept: '',     // 过滤部门(ID)
            depts: [],    // 部门树
            roles: [],    // 所有角色
            page: {},     // 分页对象
            cur: 1,
            all: 1,
            curIndex_s: 1,
            count: 0,
            checkedNames: User.current().departmentId,
            pageNumChange: 0,
            pagingFlag:false,
            user: User.current()
        }),
        mounted: function () {
            if ($("#left").height() > $("#right").height()) {
                $("#right").css("height", $("#left").height());
            } else {
                $("#left").css("height", $("#right").height());
            }

        },
        beforeRouteEnter(to, from, next) {
            var user = User.current();
            if (user.roleName == '医院管理员') {
                to.params.dept = user.departmentId;
            }
            Promise.all([User.query(to.params), Department.tree(true), Role.all()]).then(([users, depts, roles]) => {
                next(vm => {
                    vm.depts = depts.data.tree.map(mapAttr);
                    vm.roles = roles.data;
                    dept_map = depts.data.map;  // 备份部门数据
                    vm.type = to.params.type || 'all';
                    vm.dept = to.params.dept;
                    vm.page = users.data;
                    let array = users.data.items;
                    for (let i = 0; i < array.length; i++) {
                        let t = array[i].avatar;
                        let url
                        if(t.substr(0,7) != 'http://') url = netURL + t;
                        array[i].avatar = url;
                    }
                    vm.page.items = array;
                    vm.all = parseInt(vm.page.totalCount % vm.page.pageSize == 0 ? vm.page.totalCount / vm.page.pageSize : vm.page.totalCount / vm.page.pageSize + 1);
                    vm.count = vm.page.totalCount;

                    if (vm.type === 'all') {  // 备份默认数据
                        page_backup = users.data
                        console.log('pageBACKUP------',page_backup)
                    }

                    vm.$nextTick(() => {
                        vm.$store.state.isLoading = false
                        vm.loading = 0
                    })
                })
            })
        },
        beforeRouteUpdate(to, from, next) {
            this.type = to.params.type || 'all';
            this.dept = to.params.dept || this.dept;
            this.$store.state.isLoading = false
            this.curIndex_s = 1;
            this.paging(1, next);
        },
        methods: {
            paging(pn, cb) {  // 分页查询用户
                this.loading = 1;
//                console.log(this.type,'------',this.dept)
                var backInfo={};
                User.query({
                        keyword: this.keyword,
                        type: this.type,
                        dept: this.dept,
                        pn: pn || 1
                    }).then(response => {
                    let backInfoMation=response.data;
//                console.log('lengthj---' + array.length);
//                console.log('backInfoMation----',backInfoMation);
                    this.page.totalCount = backInfoMation.totalCount;
                    let array = backInfoMation.items;
                    for (let i = 0; i < array.length; i++) {
                        let t = array[i].avatar;
                        let url = netURL + t;
                        array[i].avatar = url;
                    }
                    this.page.items = array;
                    this.all = parseInt(this.page.totalCount % this.page.pageSize == 0 ? this.page.totalCount / this.page.pageSize : this.page.totalCount / this.page.pageSize + 1);
                    this.count = this.page.totalCount;
                    this.loading = 0;
                    cb && cb()
                })


            },
            paging_delayed: debounce(function () {

                this.paging(1)
            }, 400), // 分页查询用户, 但有400毫秒延迟
            added(user) {  // 添加用户到部门成功
                user.roleName = this.roles.find(e => e.id === user.roleId)['name'];
                user.departmentName = dept_map[user.departmentId].name;
                this.page.items.unshift(user);
                this.page.totalCount++;
                this.loading = 1;
                this.paging_delayed()
            },
            del(dept) {  // 删除部门
                Department.tree().then(response => {
                    this.depts = response.data.tree.map(mapAttr);
                    dept_map = response.data.map  // 备份部门数据
                })
            },

            choose() {
                if (null != this.checkedNames || $('#checkedHos').find('option:selected').text()=='请选择') {

                    this.dept = this.checkedNames
                    if (this.user.roleName == '医院管理员') {
                        $('#checkedHos').attr('disabled', 'disabled')
                    }
                    this.paging(1)
                }
            },
            winReload() {
                window.location.reload();
            },
           toFirstPage(route) {
                this.pageNumChange++;
                $(event.target).parent().addClass('router-link-exact-active status-primary').siblings('a').removeClass('router-link-exact-active status-primary');
                var that=this;
                that.dept = that.checkedNames;
                this.$router.push(route);
                that.paging(1)
            }

        },
        watch: {
            keyword(v) {
//                if (!v && this.type === 'all' && page_backup) { // 已经备份过原始数据, 直接使用跳过查询
//                    console.log('page-backup-------',page_backup);
//                    return this.page = page_backup
//                }
                this.loading = 1;
                this.paging_delayed()
            }
        },
        computed: {
            typename() {
                if (this.type === 'dept') {
                    return dept_map[this.dept].name
                }
                return {all: '所有用户', fresh: '正常的用户', ban: '停用的用户'}[this.type]

            }
        },
        components: {
            Pagination, 'v-pagination': paginations, UserMenu, AddUserMenu, Children: {
                name: 'children',
                props: ['depts'],
                template: `<div class="list-group stateful no-border" v-if="depts.length">
          <template v-for="item in depts">
          <router-link :to="'/users/dept/' + item.id" active-class="status-warning" class="list-group-item"
            :class="{'opened': item.opened}" :style="{paddingLeft: item.level * 1.25 + 'rem'}" :key="item.id">
            <span>{{item.name}}</span>
            <span class="expander text-link" v-if="item.children.length" @click.prevent="item.opened = !item.opened"></span>
          </router-link>
          <children :depts="item.children"></children>
          </template>
        </div>`
            }
        }

    }


</script>

<style>
    .list-group-item .expander {
        position: absolute;
        right: 1rem;
        line-height: 1
    }

    .list-group-item .expander::before {
        font-family: themify;
        content: '\E65D'
    }

    .list-group-item.opened > .expander::before {
        content: '\E65F'
    }

    .list-group > .list-group {
        display: none
    }

    .list-group-item.opened + .list-group {
        display: block
    }

    .user-list-group-item {
        padding: 0;
    }

    .user-list-group-item span.curUserType {
        padding: 0.75rem 1.25rem;
        display: block;
        width: 100%;
    }

    .userMargin {
        margin-top: 10px;
    }
</style>
