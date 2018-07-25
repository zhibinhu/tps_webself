<template>
    <div class="row m-text">
        <div class="col-md-12" @keyup.enter="inputing">
            <vue-editor id="editor" useCustomImageHandler placeholder="按 Enter 发送"
                        v-model="message" @imageAdded="handleImageAdded"></vue-editor>
            <p class="float-right"><button class="btn btn-info rounded" @click="inputing">发送</button></p>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery'
    import {VueEditor} from 'vue2-editor'
    import {Upload,netURL} from "../../resources";

    export default {
        data: () => ({
            message: '',
            sendType: 0,
            picValue: ''
        }),
        methods: {
            inputing(e) {
                let str = this.message;
                let strings = str.replace('<p><br></p>','');
                // 执行保存操作
                this.$emit('insert', strings);
                this.message = '';
                // 清空编辑框
                $('.ql-editor').html('<p></p>');
            },
            changeType(type) {
                this.sendType = type;
            },
            handleImageAdded: function (file, Editor, cursorLocation) {

                let index = file.name.lastIndexOf('.');
                if (file.name.substr(index, 4) == '.bmp' || file.name.substr(index, 4) == '.jpg' || file.name.substr(index, 4) == '.jpeg' || file.name.substr(index, 4) == '.gif' || file.name.substr(index, 4) == '.png' ||
                    file.name.substr(index, 4) == '.BMP' || file.name.substr(index, 4) == '.JPG' || file.name.substr(index, 4) == '.JPEG' || file.name.substr(index, 4) == '.GIF' || file.name.substr(index, 4) == '.PNG') {
                    let formData = new FormData();
                    formData.append('image', file)
                    formData.append('fileType', 'chat')
                    Upload.picUpload(formData).then(result => {
                        let url = netURL + result.data // Get url from response
                        console.log('-----------------' + url)
                        Editor.insertEmbed(cursorLocation, 'image', url);
                    })
                } else {
                    swal("操作失败", "文件不合法, 请上传图片", 'error')
                    return
                }


            }
        },
        components: {VueEditor}
    }
</script>

<style>
    .m-text {
        height: 160px;
        border-top: solid 1px #ddd;
    }

    .m-text button {
        margin-top: 10px;
    }

    .m-text #editor {
        height: 350px;
    }
</style>
