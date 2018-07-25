<template>
    <div class="app bg-themeblue pt-5">
        <div class="container text-center animated fadeIn bg-themeblue">
            <div class="login-box">
                <div class="mb-2" style="width: 82px;height: 82px;margin: auto;font-size: 0px">
                    <img src="../../static/img/WechatIMG50.png" alt="" />
                </div>
                <div class="mb-2" style="color: #fff;font-weight: 800;font-size: 18px">神飞云放疗平台</div>
                <form @submit.prevent="done" class="text-left" autocomplete="off">
                    <div class="form-group" v-styling="'name'">
                        <input name="name" v-model="name" v-validate="'required'" title="用户名" placeholder="用户名"
                               class="form-control" autofocus>
                        <span class="form-control-feedback">{{ errors.first('name') }}</span>
                    </div>
                    <div class="form-group relative" v-styling="'pass'">
                        <input name="pass" v-model="pass" v-validate="'required'" title="密码" placeholder="密码"
                               class="form-control" type="password">
                        <span class="form-control-feedback">{{ errors.first('pass') }}</span>
                        <button :disabled="errors.any() || loading">登 录
                        </button>
                    </div>
                    <div class="clearfix mb-2">
                        <label class="ui-checkbox float-left">
                            <input type="checkbox" name="rememberMe"><i class="text-primary"></i> <span style="color: #fff"
                                class="font-xs align-middle">记住我</span>
                        </label>
                        <!--<span class="float-right">-->
                        <!--<a class="btn bg-facebook text-white rounded btn-icon"><i class="fa fa-qq"></i></a>-->
                        <!--<a class="btn bg-googleplus text-white rounded btn-icon"><i class="fa fa-wechat"></i></a>-->
                        <!--</span>-->
                    </div>
                </form>
                <div class="clearfix">

                    <!--<a href="#/logout" class="float-right">忘记密码?</a>-->
                </div>
            </div>
            <!--<div class="text-muted pt-2">v0.1</div>-->
        </div>
    </div>
</template>

<script>
    import {User, Auth} from '../resources'
    //  import storage from 'localStorage'
    let storage = localStorage;
    import toastr from '../misc/toastr.esm'
    import swal from 'sweetalert'

    export default {
        name: 'login',
        data: () => ({
            name: '',
            pass: '',
            rememberMe: false,
            loading: false
        }),
        beforeRouteEnter(to, from, next) {
            next()
        },
        methods: {
            done() {
              var this$1 = this;
              this$1.loading = true
                Auth.login(this$1.$data).then(response => {
                    if (response.data.success) {

//                      this$1.$router.push(this$1.$route.query.redirect || '/')
                      this$1.$router.push({path: this$1.$route.query.redirect || '/'})
                      let msg=response.data.msg==undefined?'登录成功！':response.data.msg;
                      toastr.warning(msg);
                      this$1.loading = false

                        // console.log("即将开启websocket");
                        // createWebSocket(response.data.user.id);
                    }else {
                      let msg=response.data.msg==undefined || response.data.msg=='找不到用户!' ?'用户名或密码错误！':response.data.msg;
                      toastr.warning(msg);
                      this$1.loading = false
                    }
//console.log('response.data----------',response.data);
                }).catch(err => {
                  toastr.warning('网络错误！请稍后再试！');
                  console.log(err)
                })

                setTimeout(function () {
                  this$1.loading = false;
                }, 1000);
            }
        },
        mounted() {


            document.body.classList.remove('preloader')
            var dbVersion=storage.getItem('dbVersion');
            storage.clear()
            storage.setItem('dbVersion',dbVersion);//不能清除数据库版本号
        }
    }
</script>

<style>
    .login-box {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 400px;
        margin: -220px 0 0 -200px;
        padding: 40px;
    }

    .login-box button {
        background-color: #1bace1;
        width: 100%;
        height: 36px;
        color: #fff;
        cursor: pointer;
        border-radius: 2px;
        border: 0;
        outline: none;
        margin-top: 12px;
        font-size: 16px;
        font-weight: normal;
    }

    @media (max-width: 767px) {
        .login-box {
            width: 100%
        }
    }
</style>
