/**
 * Created by Nandy on 2016/9/12.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory()
  : typeof define === 'function' && define.amd ? define(factory)
  : (global.VueValidator = factory())
}(this, function () {
  'use strict'

  var VueParsley = {}

  VueParsley.install = function (Vue, options) {

    Vue.directive('parsley-validate', {

      bind: function (el, binding, vnode, old) {
        if (el.tagName !== 'FORM') {
          return console.error('VueParsley should be binding with FORM Element.')
        }
        el.parsley = $(el).parsley()
        console.log(el.parsley)
      },

      unbind: function (el, binding, vnode, old) {
        el.parsley.destroy()
      }
    })
  }
  return VueParsley
}))
