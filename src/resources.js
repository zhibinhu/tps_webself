import querystring from 'querystring'
// import storage from 'localStorage'
const storage = localStorage;
import toastr from './misc/toastr.esm'
import axios from 'axios'
import Vue from 'vue'


 // var url = "http://127.0.0.1:8083";
// var url="http://10.131.104.234:8080";//陈
 // var url="http://localhost:9090";
// var url="http://localhost:8080";
// var url="http://10.131.104.216:8080";//白/
// var url="http://10.131.103.32:8080";//白/
// var url="http://10.131.104.62:8088";//吴/
// var url="http://117.78.42.234:8082/";
// var local = window.location.href;
// if (local.lastIndexOf('127.0.0.1') == -1 && local.lastIndexOf('localhost') == -1) {
//     url = '';
// }
const baseURL = 'http://117.78.42.234:8096'; // 所有请求的根路径
//切换线上环境与测试环境
export const isDev = true
// export const isDev = false
let javaProjectName = ''
export const netURL = 'http://117.78.42.234/'; //线上路径
export const Common={baseURL:baseURL}


export const http = axios.create({
  // baseURL: baseURL,
  timeout: 20000000,
  withCredentials: true,
  // headers: {'X-Requested-With': 'XMLHttpRequest','login_token':storage.getItem('login_token')==undefined?'':storage.getItem('login_token')},
  transformRequest: [data => {
    return querystring.stringify(data)
  }]
})

export const httpUpload = axios.create({
    // baseURL: baseURL,
    timeout: 20000000,
    withCredentials: true,
    // headers: {
    //     'login_token': storage.getItem('login_token') == undefined ? '' : storage.getItem('login_token')
    // }
})

export const httpArrayBuffer = axios.create({
	// baseURL: baseURL,
	timeout: 20000000,
	withCredentials: true,
	// responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
	responseType: 'arraybuffer',
	// headers: {
	// 	'login_token': storage.getItem('login_token') == undefined ? '' : storage.getItem('login_token')
	// }
    // ,
    // onDownloadProgress: function (progressEvent) {
    //     // downloadImg(url,data,method,success)
    // }
})
http.interceptors.request.use(config => {
  config.url= javaProjectName + config.url
  if (isDev) config.url= '/v.api' + config.url
  config.headers.common.login_token = storage.getItem('login_token') == undefined ? '' : storage.getItem('login_token')
  return config
}, error => {
  console.log('err' + error) // for debug
  return Promise.reject(error)
})
//---------------------------------------------------
httpUpload.interceptors.request.use(config => {
  config.url= javaProjectName + config.url
  if (isDev) config.url= '/v.api' + config.url
  config.headers.common.login_token = storage.getItem('login_token') == undefined ? '' : storage.getItem('login_token')
  return config
}, error => {
  console.log('err' + error) // for debug
  return Promise.reject(error)
})
//---------------------------------------------------
httpArrayBuffer.interceptors.request.use(config => {
  config.url= javaProjectName + config.url
  if (isDev) config.url= '/v.api' + config.url
  config.headers.common.login_token = storage.getItem('login_token') == undefined ? '' : storage.getItem('login_token')
  return config
}, error => {
  console.log('err' + error) // for debug
  return Promise.reject(error)
})
// Add a response interceptor handing global errors
http.interceptors.response.use(response => {
  return response
}, error => {
    var response = error.response
    if (!response) {
        return toastr.info('服务器太久没有响应, 请重试!')
    }
    console.log('hhhhhhhhhhhh----------',response)
    // toastr.error(response.data.msg || '请求发生未知错误, 请联系系统管理员 *_*!!')
  return Promise.reject(error)
})

Vue.prototype.$http = http  // 为vue实例添加`$http`属性, 方便组件内随时调用

export const Auth = {
    authorizationCheck() { // 登录验证
        return new Promise((resolve, reject) => {
            try {
                http.get('/authorization-check/'+(storage.getItem('login_token')==undefined?'':storage.getItem('login_token')))
                    .then(response => {

                        if (response==undefined||response.data.message == 'fail') {
                            toastr.error('会话已过期, 请重新登录.')
                            // storage.removeItem('user');
                            // storage.removeItem('login_token');
                          resolve('304')
                        } else {
                          resolve(response)
                        }
                    }).catch(err => {
                    reject(err)
                })

            } catch (e) { // 验证失败后台会抛出401异常, 注销当前用户
                toastr.error('会话已过期, 请重新登录.')
              resolve('304')
                // storage.removeItem('user')
                // storage.removeItem('login_token');
                // reject(response)
            }
        })
    },
  login: (data) => {
    return new Promise((resolve, reject) => {
      http.post('/login', data).then(response => {
        if (response.data.success) {
          storage.setItem('user', JSON.stringify(response.data.user));
          storage.setItem('isAdmin', JSON.stringify(response.data.user.roleId));
          storage.setItem('login_token',response.data.login_token);
        }
        resolve(response)
      }).catch(err => {
        reject(err)
      })
    })
  },

    validationInformation: params => http.get('/validationInformation', {params}),

  logout: (to, from, next) => {
    var dbVersion=storage.getItem('dbVersion');
    storage.clear();
    storage.setItem('dbVersion',dbVersion);//不能清除数据库版本号
    // http.get('/logout')
    next('/login')
  },
  isLogin() {
    try {
      return User.current()
    } catch (e) {
      toastr.error('用户信息出错，请重新登录!')
    }
  }
}
//上传
export const Upload = ({
    picUpload: (data) => httpUpload.post("/upload/pic", data).catch((err) => {swal("操作失败", "上传失败,请稍候再试!", 'error')}),
    picUpload2: (data) => httpUpload.post("/upload/pic2", data).catch((err) => {swal("操作失败", "上传失败,请稍候再试!", 'error')}),
    fileUpload: (data) => httpUpload.post("/upload/file", data).catch((err) => {swal("操作失败", "上传失败,请稍候再试!", 'error')}),
    machineModelUpload: (data) => httpUpload.post("/upload/machinemodel", data).catch((err) => {swal("操作失败", "上传失败,请稍候再试!", 'error')}),
})
//下载
export const CancelToken1 = axios.CancelToken;
export var cancelPlan=function(){};
export var cancelforDose =function(){};
export var cancelforDoseLoad =function(){};
export const Download = ({
	readImage: (id = '', type='',progress='') => httpArrayBuffer.get('/download/read?id=' + id + '&type=' + type+'',{
    onDownloadProgress: function (progressEvent) {
        if(progress>0){
            //影响详情页进度条
            var percent=Math.ceil((progressEvent.loaded/progress).toFixed(2)*100)+'%';
            // console.log(percent);
            $('.progress-tip .progressing').css('width',percent);
            $('.progress-tip span').html(percent);
            if(percent>='99%'){
                $('.progress-tip').html('请稍等，马上展现...').css({
                    'border':0,
                    'color':'green',
                    'font-size':'16px'
                });

            }
            //计划详情页进度条
            // var halfPer=Math.ceil((progressEvent.loaded/progress).toFixed(2)*100*1/2)+'%';
            // $('.dose-progress-tip .dose-progressing').css('width',halfPer);
            // $('.dose-progress-tip span').html(halfPer);
            // console.log('halfPer===='+halfPer);

        } else {
            $('.progress-tip').html('暂无影像数据').css({
                'color':'#fff',
                 'border':0
            });
        }

    }}),
    readImageforDose: (id = '', type='',progress='') => httpArrayBuffer.get('/download/read?id=' + id + '&type=' + type+'',{
        onDownloadProgress: function (progressEvent) {
            if(progress>0){

                //计划详情页进度条
                var halfPer=Math.ceil((progressEvent.loaded/progress).toFixed(2)*100*1/2)+'%';
                $('.dose-progress-tip .dose-progressing').css('width',halfPer);
                $('.dose-progress-tip span').html(halfPer);

            } else {
                $('.progress-tip').html('暂无影像数据').css({
                    'color':'#fff',
                    'border':0
                });
            }

        },
      cancelToken: new CancelToken1(function(c){
        //这个executor函数接受一个cancel function作为参数
        cancelforDose = c;//用于执行取消请求的操作
      })
    }).catch(function(thrown) {
      if (axios.isCancel(thrown)) {
        console.log('Request canceled for dose', thrown.message);
      } else {
        // handle error
      }
    }),
    readImageforPlan: (id = '', type='',progress='') => httpArrayBuffer.get('/download/read?id=' + id + '&type=' + type+'',{
        onDownloadProgress: function (progressEvent) {
            if(progress>0){
                //计划详情页进度条
                var planPer=Math.ceil((progressEvent.loaded/progress).toFixed(2)*100)+'%';
                $('.design-progress-tip .design-progressing').css('width',planPer);
                $('.design-progress-tip span').html(planPer);
                var planShowDiv=window.sessionStorage.getItem('planShowDiv');
                console.log('planShowDiv-------',planShowDiv);
                if(parseInt(planPer)>=99){
                    $('.design-progress-tip').html('请稍等，马上展现...').css({
                        'border':0,
                        'color':'green',
                        'font-size':'16px'
                    });
                }

            } else {
                $('.design-progress-tip').html('暂无影像数据').css({
                    'color':'#fff',
                    'border':0
                });
            }

        },
      cancelToken: new CancelToken1(function(c){
        //这个executor函数接受一个cancel function作为参数
        cancelPlan = c;//用于执行取消请求的操作
      })
    }).catch(function(thrown) {
      if (axios.isCancel(thrown)) {
        console.log('Request canceled', thrown.message);
      } else {
        // handle error
      }
    }),
    readImage2: (id = '', type='',progress='') => httpArrayBuffer.get('/download/read?id=' + id + '&type=' + type+'',{
        onDownloadProgress: function (progressEvent) {
            if(progress>0){
                //影响详情页进度条
                var percent=Math.ceil((progressEvent.loaded/progress).toFixed(2)*100)+'%';
                // console.log(percent);
                $('.progress-tip2 .progressing').css('width',percent);
                $('.progress-tip2 span').html(percent);
                if(percent>='99%'){
                    $('.progress-tip2').html('请稍等，马上展现...').css({
                        'border':0,
                        'color':'green',
                        'font-size':'16px'
                    });

                }
                //计划详情页进度条
                var halfPer=Math.ceil((progressEvent.loaded/progress).toFixed(2)*100*1/2)+'%';
                $('.dose-progress-tip2 .dose-progressing').css('width',halfPer);
                $('.dose-progress-tip2 span').html(halfPer);
                // console.log('halfPer===='+halfPer);

            } else {
                $('.progress-tip2').html('暂无影像数据').css({
                    'color':'#fff',
                    'border':0
                });
            }

        }})
        // .catch((err) => {swal("操作失败", "下载影片失败,请稍候再试!", 'error')}),
})

//工单管理
export const Workorder = resource('/workorder', http, {
    workorderList: params => http.get('/workorders/param', {params}),
    //查看
    workorder: (id = '') => http.get('/workorder?id=' + id),
    //在线交流
    workordercontents:params => http.get('/workordercontents', {params}),
    //无数据的时候提交接口
    workorderPost: params => http.post('/workorder', params),
    //有数据的时候提交接口
    workordercontentPost: params => http.post('/workordercontent', params),
    //查看所有工单类型
    workordertype: params => http.get('/workordertype', {params}),

})
//短信记录
export const Sms = resource('/sms', http, {
    getSms: params => http.get('/sms/smses/', { params }),
    // getSms:  (id = '') => http.get('/sms/' + id),

})
export const Department = resource('/department', http, {
  treetable: () => http.get('/department/treetable'),
  jstree: (selected) => http.get('/department/jstree', {params: {selected: selected}}),  // 获取所有部门
    nojstree: (selected) => http.get('/department/nojstree', {params: {selected: selected}}),
  tree: (map) => http.get('/department/tree?map=' + !!map),  // map为true时额外返回一个{id -> 部门}的映射对象
  all: () => http.get('/department/all'),  // 获取所有部门
    create: (data) => jsonRequest('/department/create', 'post', data),
    updateDep: (data) => jsonRequest('/department/updateDep', 'put', data)

})
export const Machine = resource('/machine', http, {
    machines: (id = '') => http.get('/machine/machines?id=' + id),
    machinesbyplanning: (id = '') => http.get('/machine/machinesbyplanning?id=' + id)
})
export const LinearAccelerator=resource('/linearAccelerator',http, {
    deleteMachine: params => http.delete('/linearAccelerator', {params})
});////删除机器
export const PlanningTemplate = resource('/planningtemplate', http, {
    templates: (id = '') => http.get('/planningtemplate/templates?id=' + id),
    usetemplate: (id = '') => http.get('/planningtemplate/usetemplate?id=' + id),
    plantemplate: (data) => jsonRequest('/planningtemplate/plantemplate', 'put', data),
    updatetemplate: (data) => jsonRequest('/planningtemplate/updatetemplate', 'put', data)
})

export const Permission = resource('/permission', http, {
  treetable: () => http.get('/permission/treetable'),
  perms: () => http.get('/permission/menus'),
  jstree: () => http.get('/permission/jstree'),
  tree: () => http.get('/permission/tree')
})

export const User = resource('/user', http, {
  current: request => {

    if (request) {
      return http.get('/user/current')
    }
    var value = storage.getItem('user')
    if (value) {
      return JSON.parse(value)
    }
  },
  query: params => http.get('/user/query', {params}),
  /*
   * 搜索用户
   * keyword        搜索关键字
   * type           过滤用户类型
   * dept           过滤部门ID
   * include        需包含的用户
   * excludeCurrent 是否排除当前用户
   */
  search: params => http.get('/user/search', {params}),
    //toupdate: params => http.put('user/toupdate', {params}),
  roles: (id = '') => http.get('/user/roles?id=' + id),  // 获取所有用户
    departments: (id = '') => http.get('/user/departments?id=' + id),
    allDepartments: () => http.get('/user/allDepartments'),

    doctors: (id = '') => http.get('/user/doctors?id=' + id),
  profile (user) {
    if (user) {
      return http.put('/user/profile', user)
    }
    return http.get('/user/profile')
  },
  status: (id, status) => http.put('/user/status', {id, status}),  // 更新状态
  role: (id, roleId) => http.put('/user/role', {id, roleId}),      // 更新角色
  partial: (params) => http.put('/user/partial', params)           // 局部更新用户信息
})

export const Role = resource('/role', http, {
  owns: (id) => http.get('/role/owns?id=' + id || ''),     // 获取角色所有权限ID
  perms: (id) => http.get('/role/perms?id=' + id),         // 获取角色所有权限字符串
  put_perms: (params) => http.put('/role/perms', params),  // 保存角色权限更改
  all: () => http.get('/role/all'),                        // 获取所有角色
  map: () => http.get('/role/map')                         // 获取 角色ID=>角色 的映射对象
})


export const Patient = resource('/patient', http, {
    findall: params => http.get('/patient/findall', {params}),
})

export const Docgroup = resource('/docgroup', http, {
    parts: (id = '') => http.get('/docgroup/parts?id='+id)
})

export const Holiday = resource('/holiday', http, {

})

export const MachineModel = resource('/machinemodel', http, {

})

export const Medical = resource('/medical', http, {
    getByPatId: (id = '') => http.get('/medical/getByPatId?id=' + id),
    getById: (id = '') => http.get('/medical/getById?id=' + id),
    earliestDiagnosis: (id = '') => http.get('/medical/earliestDiagnosis?id=' + id),//查看最早诊断
    all: params => http.get('/medical/getList?id=' , {params})

})

export const Image = resource('/image', http, {
    getFileNum: params => http.get('/image/getFileNum' , {params}),
    download: (id = '') => http.get('/image/download?id=' + id),
    detail: (id = '') => http.get('/image/detail?id=' + id),
    // downloadplan: (id = '') => http.get('image/downloadplan?id=' + id),
    getInfo: (id = '') => http.get('/image/' + id),
    getBySuid: params => http.get('/image/suids', {params}),
    delete: (id = '') => http.delete('image/' + id),
    protect: (params) => http.post('/image/protect', params),
    showOneImg: (id = '') => http.get('/image/oneImg/' + id),
    patientImages: params => http.get('/image/patient', {params}),
    delineation:(params) => http.put('/image/smart',params),
    delineationX:(params) =>http.post('/download/smart/x',params),//获取自动勾画X切面勾画数据
    delineationY:(params) =>http.post('/download/smart/y',params),//获取自动勾画Y切面勾画数据
    getSuid:(patientId='') => http.get('/image/suid/'+patientId)
})

export const Plan = resource('/plan', http, {
    getFileNums: params => http.get('/plan/getFileNum' , {params}),
    getInfo: (id = '') => http.get('/plan/' + id),
    download: (id = '') => http.get('/plan/download?id=' + id),
    delete: (id = '') => http.delete('/plan/' + id),
    protect: (params) => http.post('/plan/protect', params),
    getBySuid: params => http.get('/plan/suid', {params})
})
export const Pdf = resource('/pdf', http, {

})


export const Target = resource('/target', http, {
    status: (id, status) => http.put('/target/status', {id, status}) , // 更新状态
    reject: (data) => http.put('/target/reject', data),
    recall: (data) => http.put('/target/recall', data),
    reassign: (data) => http.put('/target/reassign', data),
    saveonly: (data) => http.put('/target/saveonly', data),
    target: (data) => http.put('/target/target', data),
    receive: (data) => http.put('/target/receive', data),
    finish: (data) => http.put('/target/finish', data),
    check: (data, result) => http.put('/target/check/' + result, data),
    copy: (id) => http.put('/target/copy', {id}) ,

    refuse:(id = '')  => http.put('/target/refuse?id=' + id),
    phyreceive:(id = '')  => http.put('/target/phyreceive?id=' + id),

    gettimeline: (id = '') => http.get('/target/gettimeline?id=' + id),
    getRelative: (id = '') => http.get('/target/relative?id=' + id),
    getBySuid: (suid = '') => http.get('/target/suid?suid=' + suid),
    limitTime:(id='')=>http.post('/target/limit/'+id),
})

export const Planning = resource('/planning', http, {
    status: (id, status) => http.put('/planning/status', {id, status}),  // 更新状态
    planning: (data) => jsonRequest('/planning/planning', 'put', data),
    saveonly: (data) => jsonRequest('/planning/saveonly', 'put', data),
    plantemplate: (data) => jsonRequest('/planning/plantemplate', 'put', data),
    cancel: (data) => http.put('/planning/cancel', data),

    notverify: (data) => http.put('/planning/notverify', data),
    verify: (data) => http.put('/planning/verify', data),
    notapprove: (data) => http.put('/planning/notapprove', data),
    approve: (data) => http.put('/planning/approve', data),
    docNotApprove: (data) => http.put('/planning/docNotApprove', data),
    docapprove: (data) => http.put('/planning/docApprove', data),
    estimate: (data) => http.put('/planning/estimate', data),
    receive: (data) => http.put('/planning/receive', data),
    reject: (data) => http.put('/planning/reject', data),
    reassign: (data) => http.put('/planning/reassign', data),
    recall: (data) => http.put('/planning/recall', data),

    showtargethistory: (id = '') => http.get('/planning/showtargethistory?id=' + id),
    showtargetnow: (id = '') => http.get('/planning/showtargetnow?id=' + id),
    showorganhistory: (id = '') => http.get('/planning/showorganhistory?id=' + id),
    showorgannow: (id = '') => http.get('/planning/showorgannow?id=' + id),
    copy: (id) => http.put('/planning/copy', {id}),
    gettimeline: (id = '') => http.get('/planning/gettimeline?id=' + id),
    getRelative: (id = '') => http.get('/planning/relative?id=' + id),
    getByTarget: (targetId = '') => http.get('/planning/getByTarget/' + targetId)
})


export const Dict = resource('/dict', http, {
    // save 与 update 方法需要传递复杂的JSON对象
    // 因此不能以默认的`application/x-www-form-urlencoded`方式传递参与
    // 要修改为`application/json`并以JSON字符串传递, 后端才可以接收整个JSON对象
    save: (data) => jsonRequest('/dict', 'post', data),
    update: (data) => jsonRequest('/dict', 'put', data),
    bycode: (code) => http.get('/dict/bycode?code=' + code)  // 按字典编码查询单个字典对象
})

//日志管理
export const Log = resource('/log', http, {
    getLog: params => http.get('/log/list', { params }),

})
//系统日志
export const SysLog = resource('/syslog', http, {
    getLog: params => http.get('/sys/log/list', { params }),

})

//报表管理
export const Fills = resource('/fills', http, {
    //获取柱图
    getHosBar: params => http.get('/chart/graph', {params}),
    //获取环形图数据(一个患者算一条)
    getHosCircle: params => http.get('/chart/circle', {params}),
    //获取环形图数据(一个患者可算多条)
    getHosCircle1: () => http.get('/chart/havingCircle'),
    //获取本周每日完成计划数
    getWeekCount: () => http.get('/chart/week'),
    //医院统计数据
    getHosInfo: () => http.get('/chart/hosInfo'),
    //在线用户数据
    getLoadData: params => http.get('/chart/loadData', {params}),
    //获取列表数据
    getHosList: params => http.get('/chart/table', {params}),
    //获取申请医院名称
    getNames: () => http.get('/chart/getNames'),
    //获取计划完成年份
    getYears: () => http.get('/chart/getYears')
})

//通知管理
export const Notice = resource('/notice', http, {
    //获取通知列表
    getNoticeList: params => http.get('/notice/list', {params}),
    //获取未读通知个数
    getUnreadCount: () => http.get('/notice/count'),
    //获取某条通知
    getNotice: (id = '') => http.get('/notice/' + id),
    //删除一条通知
    deleteNotice: (id = '') => http.delete('/notice/' + id),
    //清空通知
    deleteAll: params => http.delete('/notice/deleteAll', {params}),
    //改变单条通知状态
    changeStatus: (ids, status) => http.put('/notice/status', {ids, status}),
    //改变所有通知状态
    changeAllStatus: (status) => http.put('/notice/statuses', {status})
});

//在线交流
export const Chat = resource('/chat', http, {
    // 沟通列表
    listInfo: (params) => http.get('/chat/list', {params}),
    // 获取最近消息
    getRecent: (params) => http.get('/chat/recent', {params}),
    // 新增一条消息
    saveNew: (params) => http.post('/chat/save', params),
    // 更新消息参数
    update: (params) => http.put('/chat/update', params),
    // 检查离线消息
    checkOffline: (params) => http.get('/chat/checkOffline', {params}),
    // 发起交流邀请
    invite: (params) => http.post('/chat/invite', params),
    // 接受交流邀请
    receive: (params) => http.put('/chat/receive', params),
    // 目标人进入聊天室 切换状态
    enter: (params) => http.put('/chat/enter', params),
});

//备份管理
export const Backup = resource('/backup', http, {
    execute: (params) => http.post('/backup/save', {params})
});

/**m
 * send reqeust with Content-Type: `application/json`
 * @param path request path
 * @param method  request method
 * @param data JSON data
 * @returns {AxiosPromise}
 */
export const jsonRequest = function (path, method, data) {
  return http[method](path, data, {
    headers: {'Content-Type': 'application/json'},
    transformRequest: [data => {
      return JSON.stringify(data)
    }]
  })
}

/**
 * create vue-resource's resource like object
 *
 * Default Actions
 *   get: {method: 'GET'}
 *   save: {method: 'POST'}
 *   query: {method: 'GET'}
 *   update: {method: 'PUT'}
 *   delete: {method: 'DELETE'}
 *
 * @param path the resource path
 * @param http axios instance
 * @param actions custom actions
 * @returns the resource object
 */
function resource (path, http, actions) {
  var obj = {
    get: id => http.get(path + '/' + id),
    save: obj => http.post(path, obj),
    query: params => http.get(path, {params}),
    update: obj => http.put(path, obj),
      submit: obj => http.put(path, obj),

      delete: id => http.delete(path + '/' + id)

  }
  return Object.assign(obj, actions)
}

export const dvhData=resource('/dvhData',http,{
    getData:(id='') => http.get('/download/dvh?id='+id),
    dvhInfo:(id='')=>http.get('/download/dvhInfo?id='+id),//dvh统计信息
    hotPre:(id='')=>http.get('/download/dvh/hotPre?id='+id)
})

export const headData=resource('/headData',http,{
    getData:params => http.get('/download/wdwd',{params})
})

export const doseData=resource('/doseData',http,{
    getData:(id='', progress='') => http.get('/download/plan/dose?id=' + id,{
        onDownloadProgress: function (progressEvent) {
            //展示剂量进度条
            var halfPer=Math.ceil((progressEvent.loaded/progress).toFixed(2)*100*1/2)+50+'%';
            // console.log(percent);
            $('.dose-progress-tip .dose-progressing').css('width',halfPer);
            $('.dose-progress-tip span').html(halfPer);
            // console.log('perperper=='+halfPer);
            if(halfPer>='99%'){
                $('.dose-progress-tip').html('请稍等，马上展现...').css({
                    'border':0,
                    'color':'green',
                    'font-size':'16px',
                    'background':'#eee',
                    'padding':'5px',
                    'width':'auto',
                    'height':'auto'
                });

            }
        },
      cancelToken: new CancelToken1(function(c){
        //这个executor函数接受一个cancel function作为参数
        cancelforDoseLoad = c;//用于执行取消请求的操作
      })
    }).catch(function(thrown) {
      if (axios.isCancel(thrown)) {
        console.log('Request canceled for doseload', thrown.message);
      } else {
        // handle error
      }
    })
})
export const sketchData=resource('/sketchData',http,{
    getData:(id = '') => http.get('/download/target/sketch?id=' + id),//Z切面勾划线
    getDataX:(id = '') => http.get('/download/target/sketch/x?id=' + id),//X切面勾划线
    getDataY:(id = '') => http.get('/download/target/sketch/y?id=' + id)//y切面勾划线
})

export const beamData=resource('/beamData',http, {
    getData: (id = '') => http.get('/download/plan/beam?id=' + id)//射野树居
});
////靶区勾画保存和查询
export const Sketch=resource('/Sketch',http,{
    saveSketchData: (params) => http.post('/sketch/saveAll', params),
    querySketchData:(imageId='')=>http.get('/sketch/getByCondition?imageId='+imageId),
    deleteSketchLine:(imageId='',roiName='')=>http.delete('/sketch/delete?imageId='+imageId+'&roiName='+roiName)
});

////感興趣点接口调用
export const poi=resource('/poi',http,{
    getByPlanning:(id='')=>http.get('/poi/planning?id='+id),
});
export const Portal=resource('/portal',http,{
  //通过poiid获取射野列表
  getByPoi:(poiId='')=>http.get('/portal/poi?poiId='+poiId),
  //添加射野并保存
  save:obj=>http.post('/portal/',obj),
  //确认性能参数
  confirmPerformance:(params)=>http.put('/portal/performance',params),
  //获取几何参数
  getGeometry:(params)=>http.put('/portal/geometry',params),
  //回填几何参数
  backGeometry:(portalId='')=>http.get('/portal/'+portalId),
  //获取射野性能参数
  getBility:(portalId='')=>http.get('/portal/performanceParamsById/'+portalId),
  //铅门参数回显
  backLeadDoor:(portalId='')=>http.get('/leadDoor/portal/'+portalId),
  //铅门参数修改确认
  getLeadDoor:(params)=>http.post('/leadDoor/editParams',params),
  //多页光栅修改
  getMic:(params)=>http.post('/modulator/mlc',params),
  //多页光栅回显
  backMic:(portalId='')=>http.get('/modulator/portal/mlc/'+portalId),
  //楔形板回显
  backPlate:(portalId='')=>http.get('/modulator/portal/wedgePlate/'+portalId),
  //楔形板确认
  confirmPlate:(params)=>http.post('/modulator/wedgePlate',params),
  //补偿膜回显
  backCompensation:(portalId='')=>http.get('/modulator/portal/compensationFile/'+portalId),
  //补偿膜确认
  confirmCompensation:(params)=>http.post('/modulator/compensationFilm',params),
  //获取射野列表
  getPortalList:(poiId='')=>http.get('/prescription/portalList/'+poiId),
  //编辑确认射野权重
  confirmPortalWeight:(params)=>http.post('/prescription/editPrescriptionWeight',params),
  //回显编辑处方
  backfillRecipy:(prescriptionId='')=>http.get('/prescription/getById?id='+prescriptionId),
  //保存处方
  saveRecipy:(params)=>http.post('/prescription',params),
  //计算剂量
  calculationDose:(params)=>http.post('/prescription/calculationDose',params)

});
