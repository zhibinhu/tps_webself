<template>
    <div>
        <ol class="breadcrumb">
            <li class="breadcrumb-item">        <router-link to="/">首页</router-link>      </li>
            <li class="breadcrumb-item">
                <router-link to="/target">靶区勾画</router-link>
            </li>
            <!--<li class="breadcrumb-item">-->
            <!--<a href="javascript:history.back()"> 工单管理</a>-->
            <!--</li>-->
            <li class="breadcrumb-item active" v-show='code!=0'>工单查看</li>
            <li class="breadcrumb-item active" v-show='code==0'>工单新增</li>
        </ol>
        <form class="m-3" autocomplete="off" @submit.prevent="submit">
            <div class="card p-3 mb-3">
                <div class="form-group row" style="margin-top: 10px">
                    <div class="col-md-1">
                        <label class="" style="width:87px;">工单标题</label>
                    </div>
                    <div class="col-md-3" v-show='code!=0'>
                        {{worList.orderTitle}}
                    </div>
                    <div class="col-md-3" v-show='code==0'>
                        <input type="text" name="text" class="form-control" v-model="orderTitle"/>
                    </div>
                    <label for="hospitalName" style="width:87px;" v-show='code!=0'>工单编号</label>
                    <!--<label for="hospitalName" style="width:87px;" v-show='code==0'>工单类型</label>-->
                    <div class="col-md-3" v-show='code!=0'>
                        {{worList.id}}
                    </div>
                    <div class="col-md-3" v-show='code==0'>
                        <!--<select class="form-control" v-model="typeId">-->
                        <!--<option v-for="(iteam,index) in typeLists" :value="iteam.id"  :key="index" :label="iteam.typeName">-->
                        <!--{{iteam.typeName}}-->
                        <!--</option>-->
                        <!--</select>-->
                        <!--&lt;!&ndash;<span>Selected：{{ typeId }}</span>&ndash;&gt;-->
                    </div>
                    <label style="width:87px;" v-show='code!=0'>提交时间:</label>
                    <div class="col-md-3" v-show='code!=0'>
                        {{worList.gmtCreate}}
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-md-1" style="width:87px;" v-show='code!=0'>工单内容</label>
                    <div class="col-md-10" v-show='code!=0'>
                        {{worList.orderContent}}
                    </div>
                </div>
                <div style="border:1px solid #99DCF3;margin:20px 0;" v-show='code!=0'>
                    <label style="background: #F5F6FA;width:100%;padding:5px 20px;">沟通记录</label>
                    <div style="padding:0 30px;border-bottom:1px solid #b4dbed ;height:auto;margin-top: 20px" v-for="(item, index) in it">
                        <div style="display: inline;margin-top: 5%;">
                            <img :src="item.avatar" style="position: absolute;border-radius:15px;border: none;" width="50px" height="50px" />
                        </div>
                        <div style="display: inline;margin-top: 5%;">
                            <li style="margin-left: 70px;list-style-type:none">{{ item.userName}} :
                                <p v-html="item.replayContent" style="display: inline"></p>
                            </li>
                            <li style="margin-left: 70px;list-style-type:none">{{item.gmtCreate}}</li>

                            <br style="background:#b4dbed">
                        </div>
                    </div>
                </div>
                <div style="border:1px solid #99DCF3;">
                    <label style="background: #F5F6FA;width:100%;padding:5px 20px;">我要反馈</label>
                    <p style="padding:0 30px;">
                        <!--<quill-editor style="height:300px;" ref="myTextEditor" v-model="replayContent"-->
                        <!--:config="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"-->
                        <!--@ready="onEditorReady($event)">-->
                        <!--</quill-editor>-->
                        <vue-editor id="editor"
                                    useCustomImageHandler
                                    @imageAdded="handleImageAdded"  ref="myTextEditor" v-model="replayContent">
                        </vue-editor>
                    </p>
                </div>
            </div>
            <div class="px-3" style="text-align: center;margin-bottom: 40px;"
            >
                <a class="btn btn-info rounded mr-2" href="javascript:history.back()"><i
                        class="fa fa-arrow-circle-left"></i> 返回</a>
                <button class="btn btn-info rounded" :disabled="errors.any()"><i class="fa fa-check"></i> 提交
                </button>
            </div>
        </form>
    </div>
</template>
<script>
    import {
        Department,
        User,
        Patient,
        Workorder,
        Common,
        Upload,netURL
    } from '../../resources'
    import selectize from '../../widgets/selectize.vue'
    import dict from '../../widgets/dict.vue'
    import {
        showResponse
    } from '../../misc/utils'
    import {cloudshowResponse} from '../../misc/utils'
    //    import {
    //        quillEditor
    //    } from 'vue-quill-editor'
    import {VueEditor} from 'vue2-editor'

    export default {
        data: () => ({
            medical: {
                diagnose: ''
            },
            content: '',
            editorOption: {
                // something config
            },
            patient: {
                name: ''
            },
            worList: {},
            orderId: '',
            id: "",
            obj: {},
            code: '',
            it: [],
            typeId: '',
            typeLists: [],
            typeName: '',
            worContentObj: {},
            orderTitle: '',
            orderContent: "",
            createUserId: User.current().id,
            replayUserId: '',
            acceptUserId: '',
            replayContent: '',
            orderTitle: '',
            createUserId: '',
            acceptUserId: '',
            orderType: ''
        }),
        beforeRouteEnter(to, from, next) {
            let dataparam = to.params.id
            let dataparams = dataparam.split("-")

            let replayUserId = dataparams[0]
            let planTargetId = dataparams[1]
            let createUserId = User.current().id
            Promise.all([Workorder.workordercontents({
                createUserId: createUserId,
                replayUserId: replayUserId,
                planTargetId: planTargetId,
                orderType: 1
            })]).then((data) => {
                next(vm => {
                    vm.replayUserId = replayUserId
                    vm.planTargetId = planTargetId
                    vm.createUserId = createUserId
                    vm.orderType = 1
                    vm.patient = data
                    vm.code = data[0].data.code
                    if (data[0].data.code > 0) {
                        let array = data[0].data.data
                        if (array) {
                            vm.orderId = array[0].orderId
                            vm.replayUserId = array[0].replayUserId
                            for (let i = 0; i < array.length; i++) {
                                let times = array[i].gmtCreate
                                let srcurl = netURL + array[i].avatar;
                                array[i].avatar = srcurl;
                            }
                            vm.it = array;
                        }

                        let id = vm.orderId
                        Workorder.get(id).then((data) => {
                            if (data.data.code > 0) {
                                vm.worList = data.data.workOrder
                                let orderContent = vm.worList.orderContent

                                let rescontent = orderContent.replace(/<.*?>/ig, "")

                                vm.worList.orderContent = rescontent
                            }
                        })

                        for (let i = 0; i < data.length; i++) {
                            vm.worList = data[i].data.data
                        }
                        vm.$nextTick(() => vm.$store.state.isLoading = false)
                    } else {
                        Workorder.workordertype().then((data) => {

                            let types = data.data.data;
                            vm.typeLists = types;
                            vm.$nextTick(() => vm.$store.state.isLoading = false)
                        })

                    }

                })
            })

        },

        methods: {
            // 有数据的时候提交接口
            postworkorderContent() {
                //let replayContent = this.replayContent.replace(/<.*?>/ig, "")
                let replayContent = this.replayContent
                Workorder.workordercontentPost({
                    orderId: this.orderId,
                    createUserId: this.createUserId,
                    replayUserId: this.replayUserId,
                    orderType: this.orderType,
                    replayContent: replayContent,
                    planTargetId: this.planTargetId
                }).then((response) => {
                    if (response.data.code < 0) return
                    cloudshowResponse(response, () => this.$router.back())
                })
            },
            //无数据的时候提交的接口
            postworkorder() {
                let replayContent = this.replayContent.replace(/<.*?>/ig, "")
//                console.log(this.orderTitle, replayContent, this.orderType + "@@@", this.createUserId, this.replayUserId, '=====zzzzzzzzzz====')
                Workorder.workorderPost({
                    orderTitle: this.orderTitle,
                    orderContent: replayContent,
                    orderType: this.orderType,
                    createUserId: this.createUserId,
                    acceptUserId: this.replayUserId,
                    planTargetId: this.planTargetId
                }).then((response) => {
                    if (response.data.code < 0) return
                    cloudshowResponse(response, () => this.$router.back())
                })
            },
            workContent() {
                let id = this.id
                this.worContentObj.orderId = id
                this.worContentObj.replayUserId = User.current().id
            },
            onEditorBlur(editor) {
                console.log('editor blur!', editor)
            },
            onEditorFocus(editor) {
                console.log('editor focus!', editor)
            },
            onEditorReady(editor) {
                console.log('editor ready!', editor)
            },
            submit() {
                this.$validator.validateAll().then(success => {
                    if (!success) return
                    // alert(this.code)
                    if (this.code == 1) {
                        this.postworkorderContent()
                    } else if (this.code == 0) {
                        this.postworkorder()
                    }
                })
            },
            handleImageAdded: function (file, Editor, cursorLocation) {
                // An example of using FormData
                // NOTE: Your key could be different such as:
                // formData.append('file', file)

                var index = file.name.lastIndexOf('.');
                if (file.name.substr(index, 4) == '.bmp' || file.name.substr(index, 4) == '.jpg' || file.name.substr(index, 4) == '.jpeg' || file.name.substr(index, 4) == '.gif' || file.name.substr(index, 4) == '.png') {
                    var formData = new FormData();
                    formData.append('image', file)
                    formData.append('fileType', 'chat')

                    Upload.picUpload(formData).then(result => {
                        let url = netURL + result.data // Get url from response
                        Editor.insertEmbed(cursorLocation, 'image', url);
                    })
                } else {
                    swal("操作失败", "文件不合法, 请上传图片", 'error')
                    return
                }


            }
        },
        components: {
            selectize,
            dict,
            VueEditor
//            quillEditor
        }
    }
</script>
<style>
    .ql-editor ql-blank{
        min-height: 20em;
    }
</style>
