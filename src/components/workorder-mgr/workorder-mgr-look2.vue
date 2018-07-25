<!--<template>-->
    <!--<div>-->
        <!--<div class="ibox-content">-->
            <!--<div class="row">-->
                <!--<div id="crop-avatar" class="col-md-6">-->
                    <!--<div class="avatar-view" title="Change Logo Picture">-->
                        <!--<img src="http://static.xuehu365.com/admin/img/2Q5U2FsG.png" alt="Logo">-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->
        <!--<div class="ibox-content">-->
            <!--<div class="row">-->
                <!--<div id="newcrop-avatar" class="col-md-6">-->
                    <!--<img class="card-img-top img-fluid user-thumb" alt="用户头像" :src="users">-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->

        <!--<div class="modal fade" id="avatar-modal" aria-hidden="true" aria-labelledby="avatar-modal-label" role="dialog">-->
            <!--<div class="modal-dialog modal-lg">-->
                <!--<div class="modal-content">-->
                    <!--&lt;!&ndash;<form class="avatar-form" action="###" enctype="multipart/form-data" method="post" >&ndash;&gt;-->
                    <!--<form class="avatar-form" enctype="multipart/form-data"  method="post"  autocomplete="off" @submit.prevent="done" >-->
                        <!--<div class="modal-header">-->
                            <!--<button class="close" data-dismiss="modal" type="button">&times;</button>-->
                            <!--<h4 class="modal-title" id="avatar-modal-label">Change Logo Picture</h4>-->
                        <!--</div>-->
                        <!--<div class="modal-body">-->
                            <!--<div class="avatar-body">-->
                                <!--<div class="avatar-upload" style="text-align: center">-->
                                    <!--<input class="avatar-src" name="avatar_src" type="hidden">-->
                                    <!--<input class="avatar-data" name="avatar_data" type="hidden">-->
                                    <!--<label for="avatarInput">图片上传</label>-->
                                    <!--<input class="avatar-input" id="avatarInput" name="avatar_file" type="file"></div>-->
                                <!--<div class="row">-->
                                    <!--<div class="col-md-9">-->
                                        <!--<div class="avatar-wrapper"></div>-->
                                    <!--</div>-->
                                    <!--<div class="col-md-3">-->
                                        <!--<div class="avatar-preview preview-lg"></div>-->
                                        <!--<div class="avatar-preview preview-md"></div>-->
                                        <!--<div class="avatar-preview preview-sm"></div>-->
                                    <!--</div>-->
                                <!--</div>-->
                                <!--<div class="row avatar-btns">-->
                                    <!--<div class="col-md-9">-->
                                        <!--<div class="btn-group">-->
                                            <!--&lt;!&ndash;<button class="btn" data-method="rotate" data-option="-90" type="button"&ndash;&gt;-->
                                                    <!--&lt;!&ndash;title="Rotate -90 degrees"><i class="fa fa-undo"></i> 向左旋转&ndash;&gt;-->
                                            <!--&lt;!&ndash;</button>&ndash;&gt;-->
                                        <!--</div>-->
                                        <!--<div class="btn-group">-->
                                            <!--&lt;!&ndash;<button class="btn" data-method="rotate" data-option="90" type="button"&ndash;&gt;-->
                                                    <!--&lt;!&ndash;title="Rotate 90 degrees"><i class="fa fa-repeat"></i> 向右旋转&ndash;&gt;-->
                                            <!--&lt;!&ndash;</button>&ndash;&gt;-->
                                        <!--</div>-->
                                    <!--</div>-->
                                    <!--<div class="col-md-3">-->
                                        <!--<button  class="btn btn-success btn-block avatar-save" type="submit">保存修改-->
                                        <!--</button>-->
                                    <!--</div>-->
                                <!--</div>-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--</form>-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->
        <!--<div id="page-wrapper">-->
            <!--<div class="loading" aria-label="Loading" role="img" tabindex="-1"></div>-->
        <!--</div>-->

        <!--<canvas id="myCanvas"></canvas>-->
    <!--</div>-->
<!--</template>-->

<!--<script>-->
    <!--import storage from 'sessionStorage'-->
    <!--import 'bootstrap/js/src/tooltip'-->
    <!--import 'cropperjs/src/cropper.min.js'-->

    <!--export default {-->
        <!--data: () => ({-->
            <!--loading: 1,     // 加载指示-->
            <!--users:"",-->
        <!--}),-->
        <!--methods: {-->
            <!--done()-->
            <!--{-->
<!--//                let file = $("#avatarInput")[0].files[0];-->
<!--//                    var reader = new FileReader()-->
<!--//                reader.readAsDataURL(file)-->
<!--//                return reader.onload = (e) => {-->
<!--//                        file.url = e.target.result-->
<!--//                        this.users = e.target.result-->
<!--//                    console.log(e.target.result)-->

<!--//                    }-->


            <!--},-->
        <!--},-->
        <!--mounted() {-->

            <!--this.$emit('loaded');-->
            <!--this.$nextTick(function () {-->
                <!--(function (factory) {-->
                    <!--if (typeof define === 'function' && define.amd) {-->
                        <!--define(['jquery'], factory);-->
                    <!--} else if (typeof exports === 'object') {-->
                        <!--// Node / CommonJS-->
                        <!--factory(require('jquery'));-->
                    <!--} else {-->
                        <!--factory(jQuery);-->
                    <!--}-->
                <!--})(function ($) {-->

                    <!--'use strict';-->

                    <!--var console = window.console || {-->
                        <!--log: function () {-->
                        <!--}-->
                    <!--};-->

                    <!--function CropAvatar($element) {-->
                        <!--this.$container = $element;-->

                        <!--this.$avatarView = this.$container.find('.avatar-view');-->
                        <!--this.$avatar = this.$avatarView.find('img');-->
                        <!--this.$avatarModal = $("body").find('#avatar-modal');-->
                        <!--this.$loading = $("#page-wrapper").find('.loading');-->

                        <!--this.$avatarForm = this.$avatarModal.find('.avatar-form');-->
                        <!--this.$avatarUpload = this.$avatarForm.find('.avatar-upload');-->
                        <!--this.$avatarSrc = this.$avatarForm.find('.avatar-src');-->
                        <!--this.$avatarData = this.$avatarForm.find('.avatar-data');-->
                        <!--this.$avatarInput = this.$avatarForm.find('.avatar-input');-->
                        <!--this.$avatarSave = this.$avatarForm.find('.avatar-save');-->
                        <!--this.$avatarBtns = this.$avatarForm.find('.avatar-btns');-->

                        <!--this.$avatarWrapper = this.$avatarModal.find('.avatar-wrapper');-->
                        <!--this.$avatarPreview = this.$avatarModal.find('.avatar-preview');-->

                        <!--this.init();-->
                    <!--}-->

                    <!--CropAvatar.prototype = {-->
                        <!--constructor: CropAvatar,-->
                        <!--support: {-->
                            <!--fileList: !!$('<input type="file">').prop('files'),-->
                            <!--blobURLs: !!window.URL && URL.createObjectURL,-->
                            <!--formData: !!window.FormData-->
                        <!--},-->

                        <!--init: function () {-->
                            <!--this.support.datauri = this.support.fileList && this.support.blobURLs;-->

                            <!--if (!this.support.formData) {-->
                                <!--this.initIframe();-->
                            <!--}-->

                            <!--this.initTooltip();-->
                            <!--this.initModal();-->
                            <!--this.addListener();-->
                        <!--},-->

                        <!--addListener: function () {-->
                            <!--this.$avatarView.on('click', $.proxy(this.click, this));-->
                            <!--this.$avatarInput.on('change', $.proxy(this.change, this));-->
                            <!--this.$avatarForm.on('submit', $.proxy(this.submit, this));-->
                            <!--this.$avatarBtns.on('click', $.proxy(this.rotate, this));-->
                        <!--},-->

                        <!--initTooltip: function () {-->
                            <!--this.$avatarView.tooltip({-->
                                <!--placement: 'bottom'-->
                            <!--});-->
                        <!--},-->

                        <!--initModal: function () {-->
                            <!--this.$avatarModal.modal({-->
                                <!--show: false-->
                            <!--});-->
                        <!--},-->

                        <!--initPreview: function () {-->

                            <!--console.log("this.$avatar: " + this.$avatar)-->
                            <!--var url = this.$avatar.attr('src');-->
                            <!--this.$avatarPreview.empty().html('<img src="' + url + '">');-->
                        <!--},-->

                        <!--initIframe: function () {-->
                            <!--var target = 'upload-iframe-' + (new Date()).getTime(),-->
                                <!--$iframe = $('<iframe>').attr({-->
                                    <!--name: target,-->
                                    <!--src: ''-->
                                <!--}),-->
                                <!--_this = this;-->

                            <!--// Ready ifrmae-->
                            <!--$iframe.one('load', function () {-->

                                <!--// respond response-->
                                <!--$iframe.on('load', function () {-->
                                    <!--var data;-->

                                    <!--try {-->
                                        <!--data = $(this).contents().find('body').text();-->
                                    <!--} catch (e) {-->
                                        <!--console.log(e.message);-->
                                    <!--}-->

                                    <!--if (data) {-->
                                        <!--try {-->
                                            <!--data = $.parseJSON(data);-->
                                        <!--} catch (e) {-->
                                            <!--console.log(e.message);-->
                                        <!--}-->

                                        <!--_this.submitDone(data);-->
                                    <!--} else {-->
                                        <!--_this.submitFail('Image upload failed!');-->
                                    <!--}-->

                                    <!--_this.submitEnd();-->

                                <!--});-->
                            <!--});-->

                            <!--this.$iframe = $iframe;-->
                            <!--this.$avatarForm.attr('target', target).after($iframe.hide());-->
                        <!--},-->

                        <!--click: function () {-->
                            <!--this.$avatarModal.modal('show');-->
                            <!--console.log(123456789)-->
                            <!--this.initPreview();-->
                            <!--this.$avatarModal.on('shown.bs.modal', function (e) {-->
                                <!--// 关键代码，如没将modal设置为 block，则$modala_dialog.height() 为零-->
                                <!--$('#avatar-modal').css('display', 'block');-->
                                <!--var modalHeight = $(window).height() / 2 - $('#avatar-modal .modal-dialog').height() / 2;-->
<!--//                                console.log($(window).height());-->
<!--//                                console.log($('#avatar-modal .modal-dialog').height());-->
                                <!--$('#avatar-modal').find('.modal-dialog').css({-->
                                    <!--'margin-top': modalHeight  + 'px'-->
                                <!--});-->
                            <!--});-->
                        <!--},-->

                        <!--change: function () {-->
                            <!--var files,-->
                                <!--file;-->

                            <!--if (this.support.datauri) {-->
                                <!--files = this.$avatarInput.prop('files');-->

                                <!--if (files.length > 0) {-->
                                    <!--file = files[0];-->

                                    <!--if (this.isImageFile(file)) {-->

                                        <!--if (this.url) {-->
                                            <!--URL.revokeObjectURL(this.url); // Revoke the old one-->
                                        <!--}-->

                                        <!--this.url = URL.createObjectURL(file);-->
                                        <!--this.startCropper();-->
                                    <!--}-->
                                <!--}-->
                            <!--} else {-->
                                <!--file = this.$avatarInput.val();-->

                                <!--if (this.isImageFile(file)) {-->
                                    <!--this.syncUpload();-->
                                <!--}-->
                            <!--}-->
                        <!--},-->

                        <!--submit: function () {-->
                            <!--console.log(222222222222222222222222222222222)-->
                            <!--if (!this.$avatarSrc.val() && !this.$avatarInput.val()) {-->
                                <!--return false;-->
                            <!--}-->

                            <!--if (this.support.formData) {-->
                                <!--this.ajaxUpload();-->
                                <!--return false;-->
                            <!--}-->
                        <!--},-->

                        <!--rotate: function (e) {-->
                            <!--var data;-->
                            <!--var imgCurWidth=$('.cropper-canvas>img').width();-->
                            <!--var imgCurHeight=$('.cropper-canvas>img').height();-->
                            <!--$('.cropper-canvas>img').css("height",imgCurWidth+"px");-->
                            <!--$('.cropper-canvas>img').css("width",imgCurHeight+"px");-->
                            <!--var imgCurWidths=$('.cropper-canvas>img').width();-->
                            <!--var imgCurHeights=$('.cropper-canvas>img').height();-->
<!--//                            console.log(imgCurWidths)-->
<!--//                            console.log(imgCurHeights)-->
                            <!--if (this.active) {-->
                                <!--data = $(e.target).data();-->

                                <!--if (data.method) {-->
                                    <!--this.$img.cropper(data.method, data.option);-->
                                    <!--var imgCurWidths=$('.cropper-canvas>img').width();-->
                                    <!--var imgCurHeights=$('.cropper-canvas>img').height();-->
                                    <!--console.log(imgCurWidths)-->
                                    <!--console.log(imgCurHeights)-->
                                <!--}-->
                            <!--}-->
                        <!--},-->

                        <!--isImageFile: function (file) {-->
                            <!--if (file.type) {-->
                                <!--return /^image\/\w+$/.test(file.type);-->
                            <!--} else {-->
                                <!--return /\.(jpg|jpeg|png|gif)$/.test(file);-->
                            <!--}-->
                        <!--},-->

                        <!--startCropper: function () {-->
                            <!--var _this = this;-->

                            <!--if (this.active) {-->
                                <!--this.$img.cropper('replace', this.url);-->
                            <!--} else {-->
                                <!--this.$img = $('<img src="' + this.url + '">');-->
                                <!--this.$avatarWrapper.empty().html(this.$img);-->
                                <!--this.$img.cropper({-->
                                    <!--aspectRatio: 1,-->
                                    <!--preview: this.$avatarPreview,-->
                                    <!--strict: false,-->
                                    <!--crop: function (data) {-->
                                        <!--var json = [-->
<!--//                                            "{'x':" + data.x,-->
<!--//                                            "'y':" + data.y,-->
<!--//                                            "'height':" + data.height,-->
<!--//                                            "'width':" + data.width,-->
<!--//                                            "'rotate':" + data.rotate + "}"-->
                                            <!--'{"x":' + data.x,-->
                                            <!--'"y":' + data.y,-->
                                            <!--'"height":' + data.height,-->
                                            <!--'"width":' + data.width,-->
                                            <!--'"rotate":' + data.rotate + '}'-->
                                        <!--].join();-->

                                        <!--_this.$avatarData.val(json);-->
                                    <!--}-->
                                <!--});-->
                                <!--this.active = true;-->
                            <!--}-->
                        <!--},-->

                        <!--stopCropper: function () {-->
                            <!--if (this.active) {-->
                                <!--this.$img.cropper('destroy');-->
                                <!--this.$img.remove();-->
                                <!--this.active = false;-->
                            <!--}-->
                        <!--},-->
                        <!--getBigPicData:function () {-->
<!--//                            var url = this.$avatarForm.attr('action'),-->
<!--//                                data = new FormData(this.$avatarForm[0]),-->
<!--//                                _this = this;-->
<!--//                            var cutData=_this.$avatarData.val();-->
<!--//                            console.log(cutData)-->
<!--//                            console.log('cutData=='+cutData)-->
<!--//                            console.log('1111111111')-->
<!--//                            var cutData2=JSON.parse(cutData);-->
<!--////                            console.log(typeof cutData2);-->
<!--//                            console.log(cutData2);-->
<!--//                            var myCavas=document.getElementById('myCanvas');-->
<!--//                            var ctx=myCavas.getContext('2d');-->
<!--//                            var imgCurWidth=$('.cropper-canvas>img').width();-->
<!--//                            var imgCurHeight=$('.cropper-canvas>img').height();-->
<!--//                            var imgCur=$('.cropper-canvas>img')[0];-->
<!--//-->
<!--//                            var cutDataX=cutData2.width/2.5;-->
<!--//                            var cutDataY=cutData2.height/2.5;-->
<!--//                            myCavas.width=cutData2.width;-->
<!--//                            myCavas.height=cutData2.height;-->
                        <!--},-->
                        <!--ajaxUpload: function () {-->
                            <!--let file = $("#avatarInput")[0].files[0];-->
                            <!--var url = this.$avatarForm.attr('action'),-->
                                <!--data = new FormData(this.$avatarForm[0]),-->
                                <!--_this = this;-->
                            <!--var cutData=_this.$avatarData.val();-->
                            <!--var cutData2=JSON.parse(cutData);-->
                            <!--var myCavas=document.getElementById('myCanvas');-->
                            <!--var ctx=myCavas.getContext('2d');-->
                            <!--var imgCurWidth=$('.cropper-canvas>img').width();-->
                            <!--var imgCurHeight=$('.cropper-canvas>img').height();-->
                            <!--var imgCur=$('.cropper-canvas>img')[0];-->

                            <!--var cutDataX=cutData2.width/2.5;-->
                            <!--var cutDataY=cutData2.height/2.5;-->
                            <!--myCavas.width=cutData2.width;-->
                            <!--myCavas.height=cutData2.height;-->

                            <!--ctx.drawImage(imgCur,cutData2.x,cutData2.y,cutData2.width,cutData2.height,0,0,cutData2.width,cutData2.height);-->


                        <!--},-->

                        <!--syncUpload: function () {-->
                            <!--this.$avatarSave.click();-->
                        <!--},-->

                        <!--submitStart: function () {-->
                            <!--this.$loading.fadeIn();-->
                        <!--},-->

                        <!--submitDone: function (data) {-->
                            <!--if ($.isPlainObject(data)) {-->
                                <!--if (data.result) {-->
                                    <!--this.url = data.result;-->
                                    <!--if (this.support.datauri || this.uploaded) {-->
                                        <!--this.uploaded = false;-->
                                        <!--this.cropDone();-->
                                    <!--} else {-->
                                        <!--this.uploaded = true;-->
                                        <!--this.$avatarSrc.val(this.url);-->
                                        <!--this.startCropper();-->
                                    <!--}-->
                                    <!--this.$avatarInput.val('');-->
                                <!--} else if (data.message) {-->
                                    <!--this.alert(data.message);-->
                                <!--}-->
                            <!--} else {-->
                                <!--this.alert('Failed to response');-->
                            <!--}-->
                        <!--},-->

                        <!--submitFail: function (msg) {-->
                            <!--this.alert(msg);-->
                            <!--console.log(msg)-->
                        <!--},-->

                        <!--submitEnd: function () {-->
                            <!--this.$loading.fadeOut();-->
                        <!--},-->

                        <!--cropDone: function () {-->
                            <!--this.$avatarForm.get(0).reset();-->
                            <!--this.$avatar.attr('src', this.url);-->
                            <!--this.stopCropper();-->
                            <!--this.$avatarModal.modal('hide');-->
                        <!--},-->

                        <!--alert: function (msg) {-->
                            <!--var $alert = [-->
                                <!--'<div class="alert alert-danger avater-alert">',-->
                                <!--'<button type="button" class="close" data-dismiss="alert">&times;</button>',-->
                                <!--msg,-->
                                <!--'</div>'-->
                            <!--].join('');-->
                            <!--console.log("&#45;&#45;&#45;&#45;55555555555&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;")-->
                            <!--console.log(msg)-->
                            <!--this.$avatarUpload.after($alert);-->
                        <!--}-->
                    <!--};-->

                    <!--$(function () {-->
                        <!--return new CropAvatar($('#crop-avatar'));-->
                    <!--});-->

                <!--});-->


            <!--})-->
        <!--},-->

    <!--}-->


<!--</script>-->
