import Vue from 'vue'
require('es6-promise').polyfill()
import VeeValidate from 'vee-validate'
import validators from './misc/validators'
import directives from './misc/directives'
import messages from './misc/vee-validate-messages'
import router from './routers'
import App from './app.vue'

//import vuex
import store from './vuex'
// import stylesheets
import 'iview/dist/styles/iview.css';    // 使用 CSS
import 'font-awesome/css/font-awesome.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jstree/dist/themes/default/style.min.css'
import '../static/themify-icons/themify-icons.css'

import '../static/cropper/cropper.min.css'
import '../static/sitelogo/sitelogo.css'
import '../static/css/animate.css'
import '../static/css/plugins.css'
import '../static/css/style.css'
import '../static/css/theme-dark.css'
import '../static/css/newStyle.css'
// import javascripts
// import 'jquery'
// import 'jstree/dist/jstree.min'
// import 'tether/dist/js/tether.min'
import 'bootstrap/js/src/dropdown'
import 'bootstrap/js/src/modal'
import 'bootstrap/js/src/util'
import 'bootstrap/js/src/tab'
import 'bootstrap/js/src/tooltip'

// import  'cropperjs/src/js/cropper'
// import  'cropperjs/dist/cropper'
//import iview
// import iView from 'iview';


// Vue.use(iView);


// register custom validators
Object.keys(validators).forEach(v => VeeValidate.Validator.extend(v, validators[v]))

// register custom directives
Object.keys(directives).forEach(d => Vue.directive(d, directives[d]))

// register custom global utility functions
// Object.assign(Vue.prototype, utils)

// prevent auto hiding when click a dropdown-menu inside `.selectize` class
$(document).on('click.bs.dropdown.data-api', '.selectize .dropdown-menu', e => e.stopPropagation())

Vue.filter('time-date', function (value) {
    if (!value) return ''
    value = value.toString()
    return value.substring(0,16)
})

Vue.filter('to-short', function (value) {
    if (!value) return ''
    value = value.toString()
    if(value.length > 20) {
        //return value.substring(0,10)+"..."
        return value
    } else {
        return value
    }
})


Vue.filter('min-short', function (value) {
    if (!value) return ''
    value = value.toString()
    if(value.length > 4) {
        return value.substring(0,4)+"..."
    } else {
        return value
    }
})

Vue.use(VeeValidate, {
  locale: 'zhCN',
  dictionary: {
    zhCN: {messages}  // 注册VeeValidate中文提示
  }
})


new Vue({
  el: '#tpsApp',
  router,
  store,
  components: { App },
  template: '<App/>'
})

