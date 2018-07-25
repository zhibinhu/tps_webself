import Treetable from './treetable.esm'
import swal from 'sweetalert'
import toastr from '../misc/toastr.esm'
export function treeify (el, expanded) {
  return new Treetable(el, {
    clickableNodeNames: true,
    expandable: true,
    indent: 35,
    onInitialized () {
      Object.keys(expanded).forEach(n => {
        this.expandNode(n)
      })
    },
    onNodeCollapse () {
      delete expanded[this.id]
    },
    onNodeExpand () {
      expanded[this.id] = 1
    }
  })
}

export function paging (vm, resource, pn, cb) {
  vm.param.pn = typeof pn === 'number' ? pn : 1
  vm.loading = true
  resource.query(vm.param).then(response => {
    vm.page = response.data
    vm.loading = false
    cb && cb()
  })
}

export const del = function (vm, resource, id, items, index) {
  swal({
    type: 'warning',
    title: '您确定删除?',
    text: '',
    showCancelButton: true,
    cancelButtonText: '关闭',
    confirmButtonText: '是的, 我要删除!',
    confirmButtonColor: '#DD6B55',
    showLoaderOnConfirm: true,
    closeOnConfirm: false
  }, confirmed => {
    if (confirmed) {
      vm.loading = true
      resource.delete(id).then(response => {
        vm.loading = false
        if (response.data.success) {
          swal('已删除!', '您指定的记录已被删除.', 'success')
          return items.splice(index, 1)
        }
        swal('删除失败!', response.data.msg, 'error')
      }, response => {
        swal('操作失败', response.data.msg, 'error')
        vm.loading = false
      }).catch(error => {
        swal('操作失败', error, 'error')
        vm.loading = false
      })
    }
  })
}

export const delOne = function (vm, resource, id) {
    swal({
        type: 'warning',
        title: '您确定删除?',
        text: '',
        showCancelButton: true,
        cancelButtonText: '关闭',
        confirmButtonText: '是的, 我要删除!',
        confirmButtonColor: '#DD6B55',
        showLoaderOnConfirm: true,
        closeOnConfirm: false
    }, confirmed => {
        if (confirmed) {
            vm.loading = true
            resource.delete(id).then(response => {
                vm.loading = false
                console.log(JSON.stringify(response.data))
                if (response.data.success) {
                    swal({type: 'success', title: '已删除!', text: '您指定的记录已被删除.'}, confirmed => {
                        if (confirmed) {
                            return vm.$router.back()
                        }
                    })
                } else {
                    swal('删除失败!', response.data.msg, 'error')
                }
            }, response => {
                swal('操作失败', response.data.msg, 'error')
                vm.loading = false
            }).catch(error => {
                swal('操作失败', error, 'error')
                vm.loading = false
            })
        }
    })
}

export const protect = function (vm, resource, id, isLock) {
    if (isLock == 1) {
        swal({
            type: 'warning',
            title: '关闭保护后可执行删除,您确定要关闭吗?',
            text: '',
            showCancelButton: true,
            cancelButtonText: '取消',
            confirmButtonText: '关闭',
            confirmButtonColor: '#DD6B55',
            showLoaderOnConfirm: true,
            closeOnConfirm: false
        }, confirmed => {
            if (confirmed) {
                vm.loading = true
                resource.protect({"id": id, "isLock": isLock}).then(response => {
                    vm.loading = false
                    console.log(JSON.stringify(response.data))
                    if (response.data.success) {
                        swal({type: 'success', title: '已关闭保护!', text: '该记录的保护已关闭.'}, confirmed => {
                            if (confirmed) {
                                return vm.reload(id)
                            }
                        })
                    } else {
                        swal('删除失败!', response.data.msg, 'error')
                    }
                }, response => {
                    swal('操作失败', response.data.msg, 'error')
                    vm.loading = false
                }).catch(error => {
                    swal('操作失败', error, 'error')
                    vm.loading = false
                })
            }
        })
    } else {
        swal({
            type: 'warning',
            title: '开启保护后无法执行删除,您确定要开启吗?',
            text: '',
            showCancelButton: true,
            cancelButtonText: '取消',
            confirmButtonText: '确认',
            confirmButtonColor: '#DD6B55',
            showLoaderOnConfirm: true,
            closeOnConfirm: false
        }, confirmed => {
            if (confirmed) {
                vm.loading = true
                resource.protect({"id": id, "isLock": isLock}).then(response => {
                    vm.loading = false
                    console.log(JSON.stringify(response.data))
                    if (response.data.success) {
                        swal({type: 'success', title: '已开启保护!', text: '该记录的保护已开启.'}, confirmed => {
                            if (confirmed) {
                                return vm.reload(id)
                            }
                        })
                    } else {
                        swal('删除失败!', response.data.msg, 'error')
                    }
                }, response => {
                    swal('操作失败', response.data.msg, 'error')
                    vm.loading = false
                }).catch(error => {
                    swal('操作失败', error, 'error')
                    vm.loading = false
                })
            }
        })
    }
}
// 发起交流邀请（给发起人看）
export const inviteChat = function (vm, resource, recordId, currentId, anotherId, name, type) {
    // 注明交流类型及消息类型
    let inviteType;
    let chatType;
    if (type === 'target') {
        inviteType = "靶区勾画";
        chatType = 0;
    } else if (type === 'planning') {
        inviteType = "计划设计";
        chatType = 5;
    }
    swal({
        type: 'warning',
        title: '',
        text: '您确定邀请' + name + "进行" + inviteType + "的在线交流吗?",
        showCancelButton: true,
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        cancelButtonColor: '#DD422B',
        confirmButtonColor: '#5edd54',
        showLoaderOnConfirm: true,
        closeOnConfirm: false
    }, confirmed => {
        if (confirmed) {
            vm.loading = true;
            resource.invite({currentId: currentId, anotherId: anotherId, type: chatType, taskId: recordId}).then(response => {
                vm.loading = false;
                if (response.data.code === 1) {
                    swal({type: 'success', title: '邀请成功', text: '您的' + inviteType + '交流邀请已经发送成功!'});
                } else {
                    swal({type: 'error', title: '邀请失败', text: response.data.msg});
                }
            }, response => {
                swal('操作失败', response.data.msg, 'error');
                vm.loading = false
            }).catch(error => {
                swal('操作失败', error, 'error');
                vm.loading = false
            })
        }
    })
};
// 接受交流邀请（给目标人看）
export const receiveChat = function (vm, resource, recordId, currentId, anotherId, name, type, chatId) {
    // 注明交流类型及消息类型
    let inviteType;
    let chatType;
    if (type === '0') {
        inviteType = "靶区勾画";
        chatType = 1;
    } else if (type === '5') {
        inviteType = "计划设计";
        chatType = 6;
    }
    swal({
        type: 'warning',
        title: '新的在线交流邀请',
        text: name + '向您发起了' + inviteType + '的在线交流邀请，要现在接受吗？',
        showCancelButton: true,
        cancelButtonText: '搁置',
        confirmButtonText: '接受',
        confirmButtonColor: '#5edd54',
        showLoaderOnConfirm: true,
        closeOnConfirm: true
    }, confirmed => {
        if (confirmed) {
            vm.loading = true;
            resource.receive({currentId: currentId, anotherId: anotherId, type: chatType, chatId: chatId, taskId: recordId}).then(response => {
                vm.loading = false;
                if (response.data.code === 1) {
                    let roomType;
                    if (chatType === 1) {
                        chatType = 2;
                        roomType = 'target';
                    } else if (chatType === 6) {
                        chatType = 7;
                        roomType = 'planning';
                    }
                    resource.enter({currentId: currentId, anotherId: anotherId, type: chatType, chatId: chatId, taskId: recordId}).then(res => {
                        if (res.data.code === 1) {
                            window.location.href = 'http://localhost:3000/#/chat/' + currentId + '/' + anotherId + '?userName=' + name + '&roomType=' + roomType;
                        } else {
                            swal({type: 'error', title: '进入聊天室失败', text: res.data.msg});
                        }
                    });
                } else {
                    swal({type: 'error', title: '接受失败', text: '您已无法接受' + inviteType + '交流邀请!'});
                }
            }, response => {
                swal('操作失败', response.data.msg, 'error');
                vm.loading = false
            }).catch(error => {
                swal('操作失败', error, 'error');
                vm.loading = false
            })
        }
    })
};
// 目标人进入房间（给发起人看）
export const enterChatRoom = function (vm, resource, recordId, currentId, anotherId, name, type, chatId) {
    // 注明交流类型及消息类型
    let inviteType;
    let roomType;
    if (type === '2') {
        inviteType = "靶区勾画";
        roomType = 'target';
    } else if (type === '7') {
        inviteType = "计划设计";
        roomType = 'planning';
    }
    swal({
        type: 'warning',
        title: name + '已进入聊天室',
        text: '您现在是否要进入' + inviteType + '聊天室？',
        showCancelButton: true,
        cancelButtonText: '搁置',
        confirmButtonText: '进入',
        confirmButtonColor: '#5edd54',
        showLoaderOnConfirm: true,
        closeOnConfirm: true
    }, confirmed => {
        if (confirmed) {
            vm.loading = true;
            window.location.href = 'http://localhost:3000/#/chat/' + currentId + '/' + anotherId + '?userName=' + name + '&roomType=' + roomType;
        }
    })
}
// 接收到新的聊天信息


export const pause = function (vm, resource, id, items, index, name) {
    swal({
        type: 'warning',
        title: '您确定'+name+"?",
        text: '',
        showCancelButton: true,
        cancelButtonText: '关闭',
        confirmButtonText: '是的, 我要'+name+'!',
        confirmButtonColor: '#DD6B55',
        showLoaderOnConfirm: true,
        closeOnConfirm: false
    }, confirmed => {
        if (confirmed) {
            vm.loading = true
            resource.delete(id).then(response => {
                vm.loading = false
                if (response.data.success) {
                    swal('已'+name+'!', '您指定的记录已被'+name, 'success')
                    return items.splice(index, 1)
                }
                swal(name+'失败!', response.data.msg, 'error')
            }, response => {
                swal(name+'失败', response.data.msg, 'error')
                vm.loading = false
            }).catch(error => {
                swal(name+'失败', error, 'error')
                vm.loading = false
            })
        }
    })
}


/* 模态框 */
export class Modal {
    constructor (el, options) {
        this.el = el
        this.options = options
    }

    // TODO: 添加动画效果
    show (cb) {
        document.body.classList.add('modal-open')
        this.el.style.display = 'block'
        setTimeout(() => {
            this.el.classList.add('show')
            cb && cb()
        })
        this.el.addEventListener('click', (e) => {
            if (e.target !== this.el) return
            this.hide()
        })
    }

    hide () {
        this.el.classList.remove('show')
        setTimeout(() => {
            document.body.classList.remove('modal-open')
            this.el.style.display = 'none'
        }, 300)
    }
}

/* 生成当前时间戳对应的62进制形式短链接 */
export const shorten = function () {
    var DIGITS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    var seq = new Date().getTime()
    var len = DIGITS.length
    var arr = []
    do {
        arr.unshift(DIGITS.charAt(seq % len))
        seq = parseInt(seq / len)
    } while (seq != 0)
    return arr.join('')
}

/* 格式化文件大小 */
export const filesize = function (bytes) {
    var unit = 'B'
    if (bytes > 1024) {
        bytes /= 1024
        unit = 'KB'
    }
    if (bytes > 1024) {
        bytes /= 1024
        unit = ' MB'
    }
    return Number(bytes.toFixed(1)) + ' ' + unit
}

export const cloudshowResponse = function (response, success, fail) {
    if (response.data.code >0) {
        return swal({type: 'success', title: '操作成功', text: '您的操作已经执行成功!'}, () => {
            success && success()
        })
    }
    if (response.data.errors) {
        toastr.warning(Object.keys(response.data.errors).map(k => response.data.errors[k]).join('<br>'))
    }
    if (response.data.msg) {
        swal('操作失败', response.data.msg, 'error')
    }
    fail && fail()
}

export const showResponse = function (response, success, fail) {
  if (response.data.success) {
    return swal({type: 'success', title: '操作成功', text: '您的操作已经执行成功!'}, () => {
      success && success()
    })
  }
  if (response.data.errors) {
    toastr.warning(Object.keys(response.data.errors).map(k => response.data.errors[k]).join('<br>'))
  }
  if (response.data.msg) {
    swal('操作失败', response.data.msg, 'error')
  }
  fail && fail()
}

/* 触发DOM事件 */
export const triggerEvent = function (el, name, data) {
    var evt = document.createEvent('Event')
    evt.initEvent(name, true, true)
    if (data) {
        Object.assign(evt, data)
    }
    el.dispatchEvent(evt)
}

export const closest = function (el, selector, ctx = document) {
  if (!el) return null
  while (el = el.parentNode) {
    if (el === ctx || matches(el, selector))
      return el
  }
}

export const matches = function (el, selector) {
  if (!el) return false
  selector = selector.split('.')
  var tag = selector.shift().toUpperCase(),
      re = new RegExp('\\s(' + selector.join('|') + ')(?=\\s)', 'g')
  return (
      (tag === '' || el.nodeName.toUpperCase() == tag) &&
      (!selector.length || ((' ' + el.className + ' ').match(re) || []).length == selector.length)
  )
}

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
export const debounce = function (func, wait, immediate) {
  var timeout, args, context, timestamp, result

  var later = function () {
    var last = Date.now() - timestamp

    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }
  return function () {
    context = this
    args = arguments
    timestamp = Date.now()
    var callnow = immediate && !timeout
    if (!timeout) timeout = setTimeout(later, wait)
    if (callnow) {
      result = func.apply(context, args)
      context = args = null
    }
    return result
  }
}
