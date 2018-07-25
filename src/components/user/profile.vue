<template>
    <div>
        <div class="p-3">
            <div class="h3 m-0">个人资料</div>
        </div>
        <div class="modal fade" id="avatar-modal" aria-hidden="true" aria-labelledby="avatar-modal-label" role="dialog">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <form class="avatar-form" enctype="multipart/form-data">
                        <div class="modal-header">
                            <button class="close" data-dismiss="modal" type="button">&times;</button>
                            <h4 class="modal-title" id="avatar-modal-label">修改头像</h4>
                        </div>
                        <div class="modal-body">
                            <div class="avatar-body">
                                <div class="avatar-upload" style="text-align: center">
                                    <input class="avatar-src" name="avatar_src" type="hidden">
                                    <input class="avatar-data" name="avatar_data" type="hidden">
                                    <label for="avatarInput">图片上传</label>
                                    <input class="avatar-input" id="avatarInput" name="avatar_file" type="file"></div>
                                <div class="row">
                                    <div class="col-md-9">
                                        <div class="avatar-wrapper"></div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="avatar-preview preview-lg"></div>
                                        <div class="avatar-preview preview-md"></div>
                                        <div class="avatar-preview preview-sm"></div>
                                    </div>
                                </div>
                                <div class="row avatar-btns">
                                    <div class="col-md-9">
                                        <div class="btn-group">
                                            <!--<button class="btn" data-method="rotate" data-option="-90" type="button"-->
                                            <!--title="Rotate -90 degrees"><i class="fa fa-undo"></i> 向左旋转-->
                                            <!--</button>-->
                                        </div>
                                        <div class="btn-group">
                                            <!--<button class="btn" data-method="rotate" data-option="90" type="button"-->
                                            <!--title="Rotate 90 degrees"><i class="fa fa-repeat"></i> 向右旋转-->
                                            <!--</button>-->
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <button class="btn btn-success btn-block avatar-save" type="submit">保存修改
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div id="page-wrapper">
            <div class="loading" aria-label="Loading" role="img" tabindex="-1"></div>
        </div>

        <form class="row p-3 bg-white" autocomplete="off" @submit.prevent="done">
            <div class="col-md-3">

                <div id="crop-avatar" class="card mb-3 img-hover">
                    <input value="" type="hidden" id="upload">
                    <div class="avatar-view" title="修改头像" data-toggle="tooltip" data-placement="bottom" data-animation="false">
                        <div id="canvasImage" v-show="image_show == 0">
                            <img :src="url" alt="头像">
                        </div>
                        <div v-show="image_show == 1">
                            <canvas id="myCanvas"></canvas>
                        </div>
                    </div>

                    <div class="card-block">
                        <h3 class="d-inline-block align-middle">{{user.name}}</h3>
                        <span class="badge badge-default">{{user.roleName}}</span>
                        <div class="font-sm text-muted">最近登录为 {{user.visited}}</div>
                    </div>
                </div>

            </div>

            <div class="col-md-9">
                <h4 class="text-themedark">个人信息</h4>
                <div class="sep sep-dashed"></div>
                <label class="form-group d-block" v-styling="'userName'">姓名
                    <input name="userName" v-model="user.userName" v-validate="'required'" class="form-control"
                           placeholder="真实姓名"/>
                    <span class="form-control-feedback">{{ errors.first('userName') }}</span>
                </label>
                <label class="form-group d-block">密码 (无需修改请留空)
                    <input type="password" name="pass" v-model="user.pass" class="form-control" minlength="5"
                           maxlength="32" placeholder="密码">
                </label>
                <label class="form-group d-block" v-styling="'email'">邮箱
                    <input name="email" type="email" v-model="user.email" class="form-control" title="邮箱地址"
                           v-validate="'required|max:32'" placeholder="请输入邮箱地址">
                    <span class="form-control-feedback">{{ errors.first('email') }}</span>
                </label>
                <label class="form-group d-block" v-styling="'phone'">手机号码
                    <input name="phone" v-model="user.phone" v-validate="{rules: { required: true, regex: /^\d{11}$/} }"
                           class="form-control" title="手机号码" placeholder="手机号码">
                    <span class="form-control-feedback">{{ errors.first('phone') }}</span>
                </label>
                <div class="form-group d-block">性别
                    <div class="radio mb-0 mt-2">
                        <label class="ui-radio"><input type="radio" name="gender" value="1" v-model="user.gender"><i
                                class="text-primary"></i> 男</label>
                        <label class="ui-radio"><input type="radio" name="gender" value="0" v-model="user.gender"><i
                                class="text-primary"></i> 女</label>
                    </div>
                </div>
                <label class="form-group d-block">
                    出生日期
                    <DatePicker style="width: 100%" class="patientDate" type="date"  placeholder="请选择出生日期" name="birthday"  v-model="startTime.time"></DatePicker>

                    <!--<input name="birthday" v-model="user.birthday" class="form-control" placeholder="生日"/>-->
                </label>
                <a class="btn btn-info rounded mr-2" href="javascript:history.back()"><i
                        class="fa fa-arrow-circle-left"></i> 返回</a>
                <button class="btn btn-info rounded" :disabled="errors.any()"><i class="fa fa-check"
                                                                                 style="color: #fff"></i> 提交
                </button>
                <div style="margin-bottom: 20px"></div>
            </div>
        </form>

    </div>
    <!-- 头像 -->

</template>

<script>
    import DateSelect from '../../widgets/dateselect.vue'
    import {User, Upload, netURL} from '../../resources'
//    import myDatepicker from 'vue-datepicker'
    import DatePicker from 'iview/src/components/date-picker'
    import swal from 'sweetalert'
    import {VueEditor} from 'vue2-editor'

    import 'bootstrap/js/src/tooltip'
    import '../../../static/cropper/cropper.min'
    let storage = localStorage
    export default {
        data: () => ({
            startTime: {
                time: ''
            },
            endtime: {
                time: ''
            },
//            option: {
//                type: 'day',
//                week: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
//                month: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
//                format: 'YYYY-MM-DD',
//                placeholder: '点击选择日期',
//                inputStyle: {
//                    'display': 'inline-block',
//                    'padding': '8px',
//                    'line-height': '22px',
//                    'font-size': '16px',
//                    'border': '1px solid #cfdadd',
//                    'border-radius': '2px',
//                    'color': '#5F5F5F',
//                    width: '248px'
//                },
//                buttons: {
//                    ok: '确定',
//                    cancel: '取消'
//                },
//                overlayOpacity: 0.5, // 0.5 as default
//                dismissible: true // true as default
//            },
            user: {},
            role: {},
            loading: 1,     // 加载指示
            url: '',
            birth: '',
            avatars: '',
            email: '',
            picture: '',
            num: 0,
            weburl: 'static/img/icon-1.png',
            image_show: 0,
            showQueue: false,   // 显示上传队列
            queueing: false,    // 是否正在上传
            loading: false,     // 加载指示
            queue: [],
            params: {
                parent: 0       // 父文件 (当前目录)
            },
            imagesrc: '' //canvers 画图值

        }),
        beforeRouteEnter(to, from, next) {
            User.profile().then(response => {
                next(vm => {
                    vm.user = response.data.user;
                    if (response.data.user.avatar != null && response.data.user.avatar != "") {
                        var fileNames = response.data.user.avatar;
//                        var imageNames = fileNames.split(";");
//                        var fileName = imageNames[0];
                        vm.url = netURL + fileNames;
                    } else {
                        vm.url = vm.weburl
                    }
                    vm.startTime.time = response.data.user.birthday;
                    let birth = response.data.user.birthday;

                    if (birth != null && birth != '') {
                        vm.birth = 1
                    } else {
                        vm.birth = 0
                    }
                    vm.$nextTick(() => vm.$store.state.isLoading = false)
                })
            })
        },
        watch: {
            imagesrc: function () {
                window.localStorage.setItem('headImageSrc', this.imagesrc);
            }
        },
        methods: {
            change(e) {
                var options = {
                    data: {
                        parent: this.params.parent   // 父文件 (所属目录)
                    }
                };
                Array.from(e.target.files).forEach(file => {
                    // 如果为图片文件, 读取DataURL显示图片
                    if (file.type.startsWith('image/')) {
                        var reader = new FileReader();
                        reader.readAsDataURL(file);
                        return reader.onload = (e) => {
                            file.url = e.target.result;
                            this.user.avatar = e.target.result;
                            this.picture = e.target.result
                        }
                    } else {
                        swal('操作失败', '请上传图像文件', 'error');
                        return
                    }


                });
                this.showQueue = true

            },
            abort(file, index) {
                this.queue.splice(index, 1);
                file.xhr.abort()
            }
            ,
            fileClick(file) {
                console.log(file)
            }
            ,
            done() {
                let file = $("#upload").val();
                if (file != null && file != '') {
                    var formData = new FormData();
                    formData.append('image', file);
                    formData.append('fileType', 'icon');
                    Upload.picUpload2(formData).then(result => {
                        var fileNames = result.data;
                        console.log(result.data);
//                        var imageNames = fileNames.split("upload");
//                        var fileName = imageNames[0];
//                        var fileName1 = imageNames[1].substring(1);
//                        this.url = fileNames;
                        this.user.avatar = fileNames;
                        this.user.birthday=this.todate(this.startTime.time);
//                        console.log('this.user-------------',this.user);
                        User.profile(this.user).then(response => {
                            if (response.data.success) {
//                                this.user.avatar = this.picture;
//                                this.avatars = this.picture;
                                this.num = 1;
                                window.location.reload();
//                                storage.setItem('user', user);
                                swal('用户信息更新成功', '', 'success')
                            }
                        })
                    })
                } else {
                    this.user.avatar = this.url;
                  this.user.birthday=this.todate(this.startTime.time);
//                  console.log('this.user-------------',this.user);
                  User.profile(this.user).then(response => {
                        if (response.data.success) {
                            this.user.avatar = this.url;
                            swal('用户信息更新成功', '', 'success')
                        }
                    })
                }
            },
          todate(num) { //Fri Oct 31 18:00:00 UTC+0800 2008
            num = num + "";
            var date = "";
            var month = new Array();
            month["Jan"] = 1; month["Feb"] = 2; month["Mar"] = 3; month["Apr"] = 4; month["May"] = 5; month["Jun"] = 6;
            month["Jul"] = 7; month["Aug"] = 8; month["Sep"] = 9; month["Oct"] = 10; month["Nov"] = 11; month["Dec"] = 12;
            var week = new Array();
            week["Mon"] = "一"; week["Tue"] = "二"; week["Wed"] = "三"; week["Thu"] = "四"; week["Fri"] = "五"; week["Sat"] = "六"; week["Sun"] = "日";
            var str = num.split(" ");
            date = str[3] + "-";
            date = date + month[str[1]] + "-" + str[2];
            return date;
          }

        },
        mounted() {
            var vm = this;
            this.$emit('loaded');
            $('.avatar-view').mouseover(function(){
                    $(this).tooltip();
             })//提示
            this.$nextTick(function () {
                (function (factory) {
                    if (typeof define === 'function' && define.amd) {
                        define(['jquery'], factory);
                    } else if (typeof exports === 'object') {
                        // Node / CommonJS
                        factory(require('jquery'));
                    } else {
                        factory(jQuery);
                    }
                })(function ($) {

                    'use strict';

                    var console = window.console || {
                        log: function () {
                        }
                    };

                    function CropAvatar($element) {
                        this.$container = $element;

                        this.$avatarView = this.$container.find('.avatar-view');
                        this.$avatar = this.$avatarView.find('img');
                        this.$avatarModal = $("body").find('#avatar-modal');
                        this.$loading = $("#page-wrapper").find('.loading');

                        this.$avatarForm = this.$avatarModal.find('.avatar-form');
                        this.$avatarUpload = this.$avatarForm.find('.avatar-upload');
                        this.$avatarSrc = this.$avatarForm.find('.avatar-src');
                        this.$avatarData = this.$avatarForm.find('.avatar-data');
                        this.$avatarInput = this.$avatarForm.find('.avatar-input');
                        this.$avatarSave = this.$avatarForm.find('.avatar-save');
                        this.$avatarBtns = this.$avatarForm.find('.avatar-btns');

                        this.$avatarWrapper = this.$avatarModal.find('.avatar-wrapper');
                        this.$avatarPreview = this.$avatarModal.find('.avatar-preview');

                        this.init();
                    }

                    CropAvatar.prototype = {
                        constructor: CropAvatar,
                        support: {
                            fileList: !!$('<input type="file">').prop('files'),
                            blobURLs: !!window.URL && URL.createObjectURL,
                            formData: !!window.FormData
                        },

                        init: function () {
                            this.support.datauri = this.support.fileList && this.support.blobURLs;

                            if (!this.support.formData) {
                                this.initIframe();
                            }

//                            this.initTooltip();
                            this.initModal();
                            this.addListener();
                        },

                        addListener: function () {
                            this.$avatarView.on('click', $.proxy(this.click, this));
                            this.$avatarInput.on('change', $.proxy(this.change, this));
                            this.$avatarForm.on('submit', $.proxy(this.submit, this));
                            this.$avatarBtns.on('click', $.proxy(this.rotate, this));
                        },

                        initTooltip: function () {
                            this.$avatarView.tooltip({
                                placement: 'bottom'
                            });
                        },

                        initModal: function () {
                            this.$avatarModal.modal({
                                show: false
                            });
                        },
                        initPreview: function () {
                            var url = this.$avatar.attr('src');
                            if (this.url != null) {
                                url = this.url;
                            }
                            this.$avatarPreview.empty().html('<img height="100%" src="' + url + '">');
                        },
                        initIframe: function () {
                            var target = 'upload-iframe-' + (new Date()).getTime(),
                                $iframe = $('<iframe>').attr({
                                    name: target,
                                    src: ''
                                }),
                                _this = this;
                            // Ready ifrmae
                            $iframe.one('load', function () {
                                // respond response
                                $iframe.on('load', function () {
                                    var data;
                                    try {
                                        data = $(this).contents().find('body').text();
                                    } catch (e) {
                                        console.log(e.message);
                                    }
                                    if (data) {
                                        try {
                                            data = $.parseJSON(data);
                                        } catch (e) {
                                            console.log(e.message);
                                        }
                                        _this.submitDone(data);
                                    } else {
                                        _this.submitFail('Image upload failed!');
                                    }

                                    _this.submitEnd();

                                });
                            });

                            this.$avatarForm.attr('target', target).after($iframe.hide());
                        },

                        click: function () {
                            this.$avatarModal.modal('show');
                            this.initPreview();
                            this.$avatarModal.on('shown.bs.modal', function (e) {
                                // 关键代码，如没将modal设置为 block，则$modala_dialog.height() 为零
                                $('#avatar-modal').css('display', 'block');
                                var modalHeight = $(window).height() / 2 - $('#avatar-modal .modal-dialog').height() / 2;
                                $('#avatar-modal').find('.modal-dialog').css({
                                    'margin-top': modalHeight + 'px'
                                });
                            });
                        },

                        change: function () {
                            var files,
                                file;

                            if (this.support.datauri) {
                                files = this.$avatarInput.prop('files');

                                if (files.length > 0) {
                                    file = files[0];

                                    if (this.isImageFile(file)) {

                                        if (this.url) {
                                            URL.revokeObjectURL(this.url); // Revoke the old one
                                        }

                                        this.url = URL.createObjectURL(file);
                                        this.startCropper();
                                    }
                                }
                            } else {
                                file = this.$avatarInput.val();

                                if (this.isImageFile(file)) {
                                    this.syncUpload();
                                }
                            }
                        },

                        submit: function (e) {
                            if (!this.$avatarSrc.val() && !this.$avatarInput.val()) {
                                return false;
                            }
                            if (this.support.formData) {
                                e.preventDefault();//阻止默认提交
                                this.ajaxUpload();
                                vm.imagesrc = $('#canvasImage img').attr('src');
                                return false;
                            }

                        },

                        rotate: function (e) {
                            var data;
                            var imgCurWidth = $('.cropper-canvas>img').width();
                            var imgCurHeight = $('.cropper-canvas>img').height();

                            if (this.active) {
                                data = $(e.target).data();

                                if (data.method) {
                                    this.$img.cropper(data.method, data.option);

                                }
                            }
                        },

                        isImageFile: function (file) {
                            if (file.type) {
                                return /^image\/\w+$/.test(file.type);
                            } else {
                                return /\.(jpg|jpeg|png|gif)$/.test(file);
                            }
                        },

                        startCropper: function () {
                            var _this = this;

                            if (this.active) {
                                this.$img.cropper('replace', this.url);
                            } else {
                                this.$img = $('<img src="' + this.url + '">');
                                this.$avatarWrapper.empty().html(this.$img);
                                this.$img.cropper({
                                    aspectRatio: 1,
                                    preview: this.$avatarPreview,
                                    strict: false,
                                    crop: function (data) {
                                        var json = [
                                            '{"x":' + data.x,
                                            '"y":' + data.y,
                                            '"height":' + data.height,
                                            '"width":' + data.width,
                                            '"rotate":' + data.rotate + '}'
                                        ].join();

                                        _this.$avatarData.val(json);
                                    }
                                });
                                this.active = true;
                            }
                        },

                        stopCropper: function () {
                            if (this.active) {
                                this.$img.cropper('destroy');
                                this.$img.remove();
                                this.active = false;
                            }
                        },
                        ajaxUpload: function () {
                            vm.image_show = 1;
                            let file = $("#avatarInput")[0].files[0];
                            var url = this.$avatarForm.attr('action'),
                                data = new FormData(this.$avatarForm[0]),
                                _this = this;
                            var cutData = _this.$avatarData.val();
                            var cutData2 = JSON.parse(cutData);
                            var myCavas = document.getElementById('myCanvas');
                            var ctx = myCavas.getContext('2d');
                            var imgCurWidth = $('.cropper-canvas>img').width();
                            var imgCurHeight = $('.cropper-canvas>img').height();
                            var imgCur = $('.cropper-canvas>img')[0];

                            myCavas.width = cutData2.width;
                            myCavas.height = cutData2.height;
                            ctx.drawImage(imgCur, cutData2.x, cutData2.y, cutData2.width, cutData2.height, 0, 0, cutData2.width, cutData2.height);
                            // ctx.drawImage(imgCur,cutData2.x,cutData2.y,cutData2.width,cutData2.height,0,0,214,214);
                            $("#avatar-modal").modal("hide")


                            var mycanvas = document.getElementById("myCanvas");
                            vm.image_show = 0;
                            var image = mycanvas.toDataURL("image/png");
                            $("#canvasImage").html("<img id='imagecanvas' src='" + image + "' alt='from canvas'/>");
                            $("#upload").val(image)
                        },

                        syncUpload: function () {
                            this.$avatarSave.click();
                        },

                        submitStart: function () {
                            this.$loading.fadeIn();
                        },

                        submitDone: function (data) {
                            if ($.isPlainObject(data)) {
                                if (data.result) {
                                    this.url = data.result;
                                    if (this.support.datauri || this.uploaded) {
                                        this.uploaded = false;
                                        this.cropDone();
                                    } else {
                                        this.uploaded = true;
                                        this.$avatarSrc.val(this.url);
                                        this.startCropper();
                                    }
                                    this.$avatarInput.val('');
                                } else if (data.message) {
                                    this.alert(data.message);
                                }
                            } else {
                                this.alert('Failed to response');
                            }
                        },

                        submitFail: function (msg) {
                            this.alert(msg);
                            console.log(msg)
                        },

                        submitEnd: function () {
                            this.$loading.fadeOut();
                        },

                        cropDone: function () {
                            this.$avatarForm.get(0).reset();
                            this.$avatar.attr('src', this.url);
                            this.stopCropper();
                            this.$avatarModal.modal('hide');
                        },

                        alert: function (msg) {
                            var $alert = [
                                '<div class="alert alert-danger avater-alert">',
                                '<button type="button" class="close" data-dismiss="alert">&times;</button>',
                                msg,
                                '</div>'
                            ].join('');
                            this.$avatarUpload.after($alert);
                        }
                    };

                    $(function () {
                        return new CropAvatar($('#crop-avatar'));
                    });

                });


            })
        },

        components: {
            DatePicker, DateSelect, VueEditor,
        }
    }
</script>

<style scoped>
    .img-mask:hover {
        background: rgba(0, 0, 0, .6);
    }

    .img-mask:hover, .img-hover:hover .img-mask {
        opacity: 1;
        visibility: visible;
    }

    .img-mask {
        color: #fff !important;
        border-radius: .25rem .25rem 0 0;
        background: rgba(0, 0, 0, .3);
        width: 100%;
        padding: 10px;
        margin: 0;
        opacity: 0;
        visibility: hidden;
        text-align: center;
        position: absolute;
        transition: all .3s ease-in-out;
    }
</style>
