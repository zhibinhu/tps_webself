<template>
    <nav class="app-header navbar navbar-toggleable-sm">
        <div class="logo">
            <router-link class="navbar-brand" to="/" style="width:280px;height:52px;padding-top: 10px;">
                <img :src="imgUrl" style="width: auto;height: auto;max-width: 100%;max-height: 100%"/>
            </router-link>
        </div>
        <a class="nav-item hidden-md-up" title="拉出菜单" @click="pushAside"><i class="fa fa-bars"></i></a>
        <a class="nav-item hidden-sm-down" title="展开菜单" @click="toggleAside"><i class="fa fa-bars"></i></a>

        <div style="position:absolute;right:130px;">
            <span class="hidden-sm-down ml-1">
                <input v-model="noticeCount" hidden/>
                <router-link to="/notice" style="color: #fff">
                    <i class="fa fa-envelope-open-o" v-if="this.noticeCount <= 0"></i>
                    <i class="fa fa-envelope" v-else>
                        <span id="message" class="text-danger" style="padding-left: 5px; font-weight: bold">({{noticeCount}})</span>
                    </i>
                </router-link>
            </span>
        </div>

        <div class="dropdown ml-auto">
            <a class="nav-item p-0" data-toggle="dropdown">
        <span class="d-inline-block relative" v-show="num ==0">
          <img :src="avatar" class="rounded-circle thumb-xxs">
        </span>
                <span class="hidden-sm-down ml-1" style="color: #fff">{{user.name}} <i class="fa fa-angle-down"></i></span>
            </a>
            <div class="dropdown-menu dropdown-menu-right pt-0 m-0">

                <router-link class="dropdown-item py-2" to="/user/profile"><i class="fa fa-edit"></i> 个人资料</router-link>

                <router-link class="dropdown-item py-2" to="/holiday"><i class="fa fa-edit"></i> 节假日配置</router-link>

                <div class="dropdown-divider"></div>
                <router-link class="dropdown-item py-2" to="/logout"><i class="fa fa-sign-out"></i> 退出登录</router-link>
            </div>
        </div>

    </nav>

</template>

<script>
    import {User,Notice,netURL} from '../../resources'

    function hander(e) {
        var left = e.pageX || e.clientX;
        if (left > 220) {
            document.body.classList.remove('aside-pushed');
            document.querySelector('#app').removeEventListener('click', hander, true)
        }
    }

    export default {
        props: ['avatars', 'num'],
        data: () => ({
            user: User.current(),
            avatar: '',
            imgUrl: ""
        }),
        mounted() {
          let vm = this
          vm.imgUrl = "static/img/logos/new-logo2.png";
          User.profile().then(response => {
            vm.user = response.data.user;
            if (response.data.user.avatar != null && response.data.user.avatar != "") {
              var fileNames = response.data.user.avatar;
              vm.avatar = netURL + fileNames;
            } else {
              vm.avatar = vm.weburl
            }
          })
        },
        computed: {
            noticeCount: {
                get: function () {
                    if (this.$store.state.noticeCount == -1) {
                        Notice.getUnreadCount().then((res) => {
                            let count = res.data.data;
                            this.$store.state.noticeCount = count;
                        })
                    }
                    return this.$store.state.noticeCount;
                }
            }
        },
        methods: {
            toggleAside:
                () => document.body.classList.toggle('aside-folded'),
            pushAside() {
                var pushed = document.body.className.indexOf('aside-pushed');
                if (pushed === -1) {
                    document.querySelector('#app').addEventListener('click', hander);
                    document.body.classList.add('aside-pushed')
                } else {
                    document.querySelector('#app').removeEventListener('click', hander);
                    document.body.classList.remove('aside-pushed')
                }
            }
        }
    }
</script>
