import Vue from 'vue'
import VueRouter from 'vue-router'
import {Auth} from './resources'
import toastr from './misc/toastr.esm'

Vue.use(VueRouter)

toastr.options.positionClass = 'toast-bottom-left'
toastr.options.containerId = 'toast-container'
toastr.options.newestOnTop = false
toastr.options.closeButton = true
toastr.options.extendedTimeOut = 2000 // How long the toast will display after a user hovers over it
toastr.options.timeOut = 2000 // How long the toast will display without user interaction

const routes = [
    {
        path: '/',
        component: require('./components/index.vue'),
        children: [
            {path: '', component: resolve => require(['./components/dashboard.vue'], resolve)},
            {path: '/users/:type?/:dept?', component: resolve => require(['./components/user/users.vue'], resolve)},
            {path: '/user/add', component: resolve => require(['./components/user/new.vue'], resolve)},
            {path: '/user/profile', component: resolve => require(['./components/user/profile.vue'], resolve)},
            {path: '/holiday', component: resolve => require(['./components/holiday/list.vue'], resolve)},
            {path: '/holiday/new', component: resolve => require(['./components/holiday/new.vue'], resolve)},
            {path: '/holiday/:id', component: resolve => require(['./components/holiday/edit.vue'], resolve)},
            {path: '/user/:id', component: resolve => require(['./components/user/edit.vue'], resolve)},
            {path: '/role/:id?', component: resolve => require(['./components/role/roles.vue'], resolve)},
            {path: '/roles/:id?', component: resolve => require(['./components/role/roles.vue'], resolve)},

            {path: '/permission', component: resolve => require(['./components/permission/list.vue'], resolve)},
            {path: '/permissions', component: resolve => require(['./components/permission/lists.vue'], resolve)},
            {path: '/permission/new', component: resolve => require(['./components/permission/new.vue'], resolve)},
            {path: '/permission/:id', component: resolve => require(['./components/permission/edit.vue'], resolve)},
            {path: '/department', component: resolve => require(['./components/department/list.vue'], resolve)},
            {path: '/departments', component: resolve => require(['./components/department/lists.vue'], resolve)},
            {path: '/department/new', component: resolve => require(['./components/department/new.vue'], resolve)},
            {path: '/department/:id', component: resolve => require(['./components/department/edit.vue'], resolve)},


            {path: '/patient', component: resolve => require(['./components/patient/list.vue'], resolve)},
            {path: '/patient/query', component: resolve => require(['./components/patient/query.vue'], resolve)},
            {path: '/patient/:id', component: resolve => require(['./components/patient/patient_edit.vue'], resolve)},
            {
                path: '/patient/medical/:id',
                component: resolve => require(['./components/patient/medical.vue'], resolve)
            }, // 这里的id对应`code`属性
            {path: '/docgroup', component: resolve => require(['./components/docgroup/list.vue'], resolve)},
            {path: '/docgroup/new', component: resolve => require(['./components/docgroup/new.vue'], resolve)},
            {path: '/docgroup/:id', component: resolve => require(['./components/docgroup/edit.vue'], resolve)},
            {path: '/target', component: resolve => require(['./components/target/list.vue'], resolve)},
            {path: '/target/detail/:id', component: resolve => require(['./components/target/patient_target.vue'], resolve)},
            {path: '/planning', component: resolve => require(['./components/planning/list.vue'], resolve)},
            {
                path: '/planning/detail/:id',
                component: resolve => require(['./components/planning/patient_planning.vue'], resolve)
            },
            {path: '/image', component: resolve => require(['./components/image/list.vue'], resolve)},
            {
                path: '/image/detail/:id',
                component: resolve => require(['./components/image/detail.vue'], resolve)
            },
            {path: '/plan', component: resolve => require(['./components/plan/list.vue'], resolve)},
            {path: '/plan/detail/:id', component: resolve => require(['./components/plan/detail.vue'], resolve)},
            {path: '/pdf', component: resolve => require(['./components/pdf/list.vue'], resolve)},
            {
                path: '/planning/timeLine/:id',
                component: resolve => require(['./components/planning/timeLine.vue'], resolve)
            },
            {
                path: '/target/timeLine/:id',
                component: resolve => require(['./components/target/timeLine.vue'], resolve)
            },
            //日志管理
            {path: '/log', component: resolve => require(['./components/log/log.vue'], resolve)},
            //系统日志
            {path: '/syslog', component: resolve => require(['./components/syslog/syslog.vue'], resolve)},
            //报表-完成计划图表
            {path: '/fill', component: resolve => require(['./components/fill/fill.vue'], resolve)},
            //报表-完成计划列表
            {path: '/fill-list', component: resolve => require(['./components/fill/fill-list.vue'], resolve)},
            //报表-系统资源
            {path: '/fill-system', component: resolve => require(['./components/fill/fill-system.vue'], resolve)},
            //工单管理
            {
                path: '/workorder',
                component: resolve => require(['./components/workorder-mgr/workorder-mgr.vue'], resolve)
            },
            //工单管理---查看页面
            {
                path: '/workorder.view/:id',
                component: resolve => require(['./components/workorder-mgr/workorder-mgr-look.vue'], resolve)
            },
            //工单管理---靶区在线交流
            {
                path: '/workordercontent2',
                component: resolve => require(['./components/workorder-mgr/workorder-mgr-look2.vue'], resolve)
            },
            //工单管理---计划在线交流
            {
                path: '/workordercontent1',
                component: resolve => require(['./components/workorder-mgr/workorder-mgr-look_yuliu.vue'], resolve)
            },
            //短信管理
            {path: '/sms', component: resolve => require(['./components/sms/sms.vue'], resolve)},

            //通知管理
            {path: '/notice', component: resolve => require(['./components/notice/list.vue'], resolve)},
            {path: '/notice/detail/:id', component: resolve => require(['./components/notice/detail.vue'], resolve)},

            //沟通管理
            {path: '/chat', component: resolve => require(['./components/chat/list.vue'], resolve)},
            {path: '/chat/room/:id1/:id2', component: resolve => require(['./components/chat/chat.vue'], resolve)},

            //数据备份
            {path: '/backup', component: resolve => require(['./components/backup/backup.vue'], resolve)},

        ]
    },
    {path: '/login', component: resolve => require(['./components/login.vue'], resolve)},
    {path: '/logout', beforeEnter: Auth.logout},
    {path: '*', component: resolve => require(['./components/error/404.vue'], resolve)}
]

// 不需要鉴权的路径
const permissive = ['/login', '/logout']

const router = new VueRouter({
    linkActiveClass: 'active',
    routes: routes,
    mode: 'hash'
})

router.beforeEach((to, from, next) => {
    if (permissive.includes(to.path) || Auth.isLogin()) {
        next();
    } else {
      // toastr.info('您需要先登录.')
      next({
        path: '/login',
        query: {redirect: to.path}
      })
    }

})

export default router
