(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory()
      : typeof define === 'function' && define.amd ? define(factory)
      : (global.VueValidator = factory())
}(this, function () {
  'use strict'

  /**
   * 获取变量的字符串值
   */
  function toString (value) {
    return value === undefined || value === null ? '' : value.toString().trim()
  }

  const ruleset = {

    /**
     * 必填(选)验证
     */
    required: function (value, input) {
      value = toString(value)   // value需要转换成字符串, 下面用来计算length, 不然数字或者0都会是invalid
      var valid = !!value.length,
          isCheckable = input.tagName === 'SELECT' ||
              ['radio', 'checkbox'].indexOf(input.type) > -1
      return {
        valid: valid,
        msg: valid ? '' : (isCheckable ? '请选择' : '请填写此项')
      }
    },

    /**
     * 最小长度验证
     * @param param {String} 最少输入多少个字
     */
    minlength: function (value, input, param) {
      value = toString(value)   // value需要转换成字符串, 下面用来计算length, 不然数字或者0都会是invalid
      var valid = value.length >= parseInt(param)
      return {
        valid: valid,
        msg: (valid ? '' : `请最少填写${param}个字符`)
      }
    },

    /**
     * 最大长度验证, 主要针对 IE9 下 textarea 的 maxlength 无效的情况
     * @param param {String} 最多输入多少个字
     */
    maxlength: function (value, input, param) {
      value = toString(value)   // value需要转换成字符串, 下面用来计算length, 不然数字或者0都会是invalid
      var valid = value.length <= parseInt(param)
      return {
        valid: valid,
        msg: (valid ? '' : `请最多填写${param}个字符`)
      }
    },

    /**
     * 邮箱格式
     */
    emailType: function (value, input) {
      value = toString(value)   // value需要转换成字符串, 为空则直接返回
      var pattern = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/,
          valid = pattern.test(value)
      return {
        valid: valid,
        msg: (valid ? '' : '邮箱格式不正确')
      }
    },

    /**
     * 手机格式
     */
    phoneType: function (value, input) {
      value = toString(value) // value需要转换成字符串, 为空则直接返回
      var pattern = /^1[34578]\d{9}$/,
          valid = pattern.test(value)
      return {
        valid: valid,
        msg: (valid ? '' : '手机格式不正确')
      }
    },

    /**
     * 固定电话格式
     */
    telType: function (value, input) {
      value = toString(value)   // value需要转换成字符串, 为空则直接返回
      var pattern = /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/,
          valid = pattern.test(value)
      return {
        valid: valid,
        msg: (valid ? '' : '固定电话格式不正确')
      }
    },

    /**
     * 数字格式
     */
    numberType: function (value, input) {
      let valid = false,
          msg = '请输入数字'
      if (isNaN(value)) return {valid, msg}
      var min = parseFloat(input.getAttribute('min'))
      var max = parseFloat(input.getAttribute('max'))
      min = isNaN(min) ? -Infinity : min
      max = isNaN(max) ? Infinity : max
      msg = value < min ? `输入值最小为${min}` :
          value > max ? `输入值最大为${max}` : ''
      return {
        valid: !msg,
        msg: msg
      }
    },

    /**
     * 整数格式
     */
    integerType: function (value, input) {
      if (!/^\d*$/.test(toString(value))) {
        return {
          valid: false,
          msg: '请输入整数'
        }
      }
      return ruleset.numberType(value, input)
    }
  }

  /**
   * 对所有表单项进行一次检查
   */
  function checkAll (context, elements, ns) {

    var promise,        // 包含异步检查的表单项检查结果
        valid = true,   // 默认返回
        // 逐个检查
        results = elements.map(function (e) {
          return checkItem(context, e, context[e.name], ns)
        })

    for (var i = 0; i < results.length; i++) {

      if (results[i] instanceof Promise) {
        promise = results[i]
        continue   // 异步检查结果后面再说
      }
      if (results[i].valid === false) {
        valid = false
        elements[i].focus()
        break
      }
    }

    if (valid && promise) { // 同步结果通过, 且需要等待异步
      return promise.then(function (result) {
        return result.valid
      })
    }
    return valid
  }

  function next (el, tag) {
    var elem = el.nextElementSibling
    while (elem !== null && elem.tagName !== tag) {
      elem = elem.nextElementSibling
    }
    return elem
  }

  /**
   * 检查指定表单是否符合规范并返回检查结果
   */
  function checkItem (context, element, value, ns) {

    var rule,           // 规则名, 比如 required, minlength
        promise,        // 异步验证结果
        result = {},         // 验证结果

        // 将验证的结果同步到 ViewModel 中
        // Vue2.0 directive没有了vm实例, 且非standalone版本不能使用Vue.compile函数
        // 因此这里直接操作dom展示错误消息
        validate = function (result) {
          context.$set(context[ns], element.name, result)
          var ul = element.parentNode.querySelector(defaults.errorContainer),
              el = document.createElement(defaults.errorEl)
          if (!ul) {
            ul = document.createElement(defaults.errorContainer)
            ul.className = 'parsley-errors-list'
            element.parentNode.appendChild(ul)
          }
          ul.innerHTML = ''
          if (result.valid) {
            element.parentNode.classList.remove(defaults.errorClass)
            element.parentNode.classList.add(defaults.successClass)
          } else {
            element.parentNode.classList.add(defaults.errorClass)
            el.innerHTML = result.msg
            ul.appendChild(el)
          }
        }

    // 对于不可见表单项, 默认不做检查
    if (!element.offsetHeight && element.getAttribute('force-valid') === null) {
      return result
    }

    // 检查每项规则
    for (rule in element.rules) {
      if (!toString(value) && rule !== 'required') {
        continue  // 对于非required验证, 跳过空值
      }
      result = checkRule(rule, value, element, element.rules[rule])
      if (result instanceof Promise) {  // 异步检查规则返回 Promise
        promise = result
        continue  // 继续进行同步的检查, 完成所有后再处理
      }
      if (!result.valid) {  // 同步检查不通过, 直接返回错误, 结束检查
        break
      }
    }
    if (result.valid && promise) {  // 浏览器端同步验证通过, 且需要异步验证时
      result = promise.then(function (asyncResult) {
        validate(asyncResult)
        return asyncResult
      })
    } else {  // 无需等待异步验证
      validate(result)
    }
    return result
  }

  /**
   * 检查当前值是否符合某项规范
   * @return {Object} 检查结果。字段如下：
   *      valid: 布尔型, 是否符合规范
   *      msg: 错误提示, 如果有
   */
  function checkRule (rule, value, element, param) {
    if (typeof ruleset[rule] !== 'function') {
      throw '验证规则 ' + rule + ' 不存在！'
    }
    return ruleset[rule](value, element, param)
  }

  /********************************************************************
   *
   * Vue.js 表单验证组件
   *
   * 表单验证规则集, 每条规则是一个函数
   *
   * 函数参数分别是：
   *     value {String} 用户填写或选择的值
   *     input {Node} 相关联的 input 元素
   *     param {String} 该规则对应的参数, 例如最少输入的字数
   *
   * 函数返回值是一个对象, 包含两个属性：
   *     valid {Bool} 是否符合规则
   *     msg {String} 不符合规则时的错误消息
   *
   * 如果验证过程是异步的, 可以返回一个 Promise,
   * 该 Promise 被 resolve 的值是上面格式的对象
   *
   *******************************************************************/
  var VueValidator = {}

  var defaults = {
    errorContainer: 'ul',
    successClass: 'has-success',
    errorClass: 'has-error',
    errorEl: 'li'
  }

  // ==================================================================
  //
  // 注册 Vue.js directive
  //
  // ==================================================================
  VueValidator.install = function (Vue, options) {

    Object.assign(defaults, options)

    Vue.directive('validator', {

      /**
       * 初始化验证规则
       */
      bind: function (el, binding, vnode) {

        if (el.tagName !== 'FORM') {
          return console.error('v-validator must binding with FORM elements!')
        }

        var context = vnode.context,  // 当前Vue Component实例
            ns = binding.expression,  // validator 实例的 Namespace
            map = {}                 // model -> item 的对应

        // 找到 form 内绑定了数据的表单元素
        var elements = [].slice.call(vnode.elm).filter(function (e) {
          return '_value' in e
              && ['INPUT', 'SELECT', 'TEXTAREA'].indexOf(e.tagName) > -1
              && el.contains(e)

        })

        elements.forEach(function (e) {
          // 建立规则
          e.rules = getRules(e)
          // 处理 radio 和 checkbox
          var type = e.type,
              name = e.name
          if (type !== 'radio' && type !== 'checkbox') {
            return
          }
          if (map[name]) { // 这次处理的item和以前的有重复
            map[name].duplicated = true
          } else {
            map[name] = e
          }
        })

        // 过滤掉 radio 和 checkbox 重复的 item
        elements = elements.filter(function (e) {
          return !e.duplicated
        })

        // 建立检查结果对象
        // vm.$set(ns, {})

        elements.forEach(function (elem) {
          // 初始化
          initItem(elem, context, ns, Vue)
        })

        // 获取整个表单的状态
        // Vue.util.defineReactive(cotnext[ns], '$valid', false)
        Object.defineProperty(context[ns], '$valid', {
          get: function () {
            return checkAllStates(context, elements, ns)
          }
        })
      },

      /* 移出事件绑定 */
      unbind: function () { }
    })
  }

  // 注册自定义规则
  VueValidator.addRule = function (ruleName, func) {
    ruleset[ruleName] = func
  }

  function checkAllStates (context, elements, ns) {
    for (var i = 0, len = elements.length; i < len; i++) {
      if (!context[ns][elements[i].name].valid)
        return false
    }
    return true
  }

  /**
   * 对一个表单项进行初始化
   */
  function initItem (element, context, ns) {

    // 监控model变化并验证
    context.$watch(element.name, function (value) {
      checkItem(context, element, value, ns)
    })

    // 建立错误提示容器和指令
    context.$set(context[ns], element.name, {
      valid: undefined,
      msg: ''
    })

    // 表单元素的错误样式
    /** TODO: 使用 compile 的方法处理样式, 中文输入时有 bug, 改用 watch 的方式
     item.input.setAttribute(':class', "{'error': !" + ns + "." + item.model + ".valid}")
     vm.$compile(item.input)
     */
    context.$watch(ns + '.' + element.model + '.valid', function (valid) {
      // item.input.classList[valid === true ? 'remove': 'add']('error')
      var cls = element.input.className
      if (valid === true) {
        element.input.className = cls.replace(/\berror\b/, '')
      } else {
        element.input.className = cls + ' error'
      }
    })
  }

  /**
   * 从一个 item 获取规则
   * 可以从 input 元素属性获取
   */
  function getRules (element) {
    var rules = {},
        rule,
        param,
        elementType
    for (rule in ruleset) {
      if (!ruleset.hasOwnProperty(rule)) {
        return
      }
      elementType = element.getAttribute('data-type') || element.type
      if (/(\w+)Type$/.test(rule) && (elementType + 'Type') === rule) { // type验证
        rules[rule] = true
        continue
      }
      param = element.getAttribute(rule)
      if (param !== null) {
        rules[rule] = param || true
      }
    }
    return rules
  }

  return VueValidator
}))
