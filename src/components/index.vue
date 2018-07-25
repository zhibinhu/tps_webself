<template>
    <div>
        <app-quickview></app-quickview>
        <!--<app-settings></app-settings>-->
        <app-search></app-search>
        <app-aside></app-aside>

        <div class="app-content">
            <app-header></app-header>

            <div class="layer-loading" v-show="isLoading"><i></i><i></i><i></i></div>

            <!--<transition name="scale" mode="out-in" appear>-->
            <router-view class="app-content-view" :style="{height:div_h+'px'}" style="overflow-y:auto;overflow-x: hidden;" ></router-view>
            <!--</transition>-->

            <!--<div class="app-footer">-->
            <!--<small>© 神州飞云&copy;版权所有</small>-->
            <!--<span class="float-right">-->
            <!--<small>APP_VERSION</small>-->
            <!--<a href><i class="fa fa-long-arrow-up"></i></a>-->
            <!--</span>-->
            <!--</div>-->
        </div>
        <div id="toast-container"></div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import AppQuickview from './partials/app.quickview.vue'
    import AppSettings from './partials/app.settings.vue'
    import AppSearch from './partials/app.search.vue'
    import AppHeader from './partials/app.header.vue'
    import AppAside from './partials/app.aside.vue'
    import {Auth, User} from '../resources'
    import {createWebSocket} from '../misc/websocket'

    export default {
        data: () => ({
            transitionName: 'slide-left',
//            loading: 1,
            div_h:100
        }),
        beforeRouteEnter(to, form, next) {
            // 进入首页前先进行登录验证
            Auth.authorizationCheck().then(response => {
              if(response == '304'){
                next(vm => {
                  vm.$router.push('/login')
                })
              } else {
                next()
              }
            }).catch(err => {
              console.log(err)
              next(vm=>{
                vm.$router.push('/login')
              })

            })
        },
        beforeRouteUpdate(to, from, next) {
//            this.loading = 1  // 路由变化时显示加载动画
          this.$store.state.isLoading = true
          this.getWinHeight();
            next()
        },
        methods: {
            // 子组件加载完成应向上触发`loaded`事件, 在这里捕获后隐藏加载动画. (有没有更好的实现办法?)
//            loaded(state) {
//                this.loading = state
//            },
          getWinHeight(){
                var h = window.innerHeight
                    || document.documentElement.clientHeight
                    || document.body.clientHeight;
                this.div_h = h - 60;
            }
        },
      computed: {
        ...mapState(['isLoading'])
      },
        components: {AppHeader, AppAside, AppSearch, AppSettings, AppQuickview},
        created(){
            this.getWinHeight();
            createWebSocket(User.current().id)//实例化websocket
        }
    }
</script>
