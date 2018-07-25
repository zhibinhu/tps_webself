<template>
  <div class="app bg-themeblue pt-5">
    <div class="container text-center animated fadeIn bg-themeblue">
      <div class="login-box">
        <div style="height:125px; line-height: 125px;color:#0079fe;font-size: 20px">
          <span style="font-weight: bolder;font-size:36px">神州医疗放疗云</span>
        </div>
        <div class="text-muted mb-2">登录神州医疗放疗云</div>
        <form @submit.prevent="done" class="text-left" autocomplete="off">
          <div class="form-group" v-styling="'name'">
            <input name="name" v-model="name" v-validate="'required'" title="用户名" placeholder="用户名" class="form-control form-control-line" autofocus>
            <span class="form-control-feedback">{{ errors.first('name') }}</span>
          </div>
          <div class="form-group relative" v-styling="'pass'">
            <input name="pass" v-model="pass" v-validate="'required'" title="密码" placeholder="密码" class="form-control form-control-line" type="password">
            <span class="form-control-feedback">{{ errors.first('pass') }}</span>
            <button class="btn btn-outline-primary rounded" :class="{'loading': loading}" :disabled="errors.any() || loading">登 录</button>
          </div>
          <div class="clearfix mb-2">
            <label class="ui-checkbox float-left">
              <input type="checkbox" name="rememberMe"><i class="text-primary"></i> <span class="font-xs align-middle">记住我</span>
            </label>
          </div>
        </form>
        <div class="clearfix">

          <!--<a href="#/logout" class="float-right">忘记密码?</a>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {User, Auth} from '../resources'
//  import storage from 'localStorage'
  let storage = localStorage;
  import toastr from '../misc/toastr.esm'
  import swal from 'sweetalert'
  import {createWebSocket} from '../misc/websocket'
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
      done () {
          this.loading = true
          Auth.login(this.$data).then(response => {
              if (response.data.success) {

                  window.location=(this.$route.query.redirect || '/')

                  createWebSocket();
              }

              toastr.warning(response.data.msg)
              this.loading = false
          }, response => {
              toastr.warning(response)
              this.loading = false
          });
          var vm=this;
          setTimeout(function(){vm.loading = false;},1000);
    },
    mounted() {


      document.body.classList.remove('preloader')
        storage.removeItem('user');
        storage.removeItem('login_token');
    }
  }
</script>

<style>
  .login-box {
    width: 380px;
    border-radius: 40px;
    box-shadow: 0 0 50px rgba(0, 0, 0, .2);
    padding: 30px;
    display: inline-block;
    background-color: #fff
  }
  .login-box button { position: absolute; right: 0; top: -8px }
  @media (max-width: 767px) {
    .login-box { width: 100% }
  }
</style>
