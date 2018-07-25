<template>
  <FormOk ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
    <FormItem label="处方名称" prop="name">
      <InputOk v-model="formValidate.name" placeholder="请输入处方名称" id="recipyName"></InputOk>
    </FormItem>
    <FormItem label="单次剂量" prop="singleDose">
      <InputOk v-model="formValidate.singleDose" placeholder="请输入单次剂量" id="singleDose"></InputOk>
    </FormItem>
    <FormItem label="预期目标" prop="expectTarget">
      <InputOk v-model="formValidate.expectTarget" placeholder="请输入预期目标" id="expectTarget"></InputOk>
    </FormItem>
    <FormItem label="总剂量" prop="allDose">
      <InputOk v-model="formValidate.allDose" placeholder="请输入总剂量" id="allDose"></InputOk>
    </FormItem>
    <FormItem>
      <ButtonOk type="primary" @click="handleSubmit('formValidate')">保存</ButtonOk>
    </FormItem>
  </FormOk>
</template>
<script>
  import FormOk from 'iview/src/components/form'
  import FormItem from 'iview/src/components/form-item'
  import InputOk from 'iview/src/components/input'
  import ButtonOk from 'iview/src/components/button'
  import Message from 'iview'
  export default {

    data () {
      return {
        formValidate: {
          name: '',
          singleDose: '',
          expectTarget: '',
          allDose: ''
        },
        ruleValidate: {
          name: [
            {required: true, message: '处方名称不能为空', trigger: 'blur' }
          ],
          singleDose: [
            {required: true, message: '单次剂量不能为空', trigger: 'blur' },
            { type: 'number', message: '请输入数字格式',min:0, trigger: 'blur', transform(value) {
              return Number(value);
            }}
          ],
          expectTarget: [
            {required: true, message: '预期目标不能为空', trigger: 'blur' },
            { type: 'number', message: '请输入数字格式',min:0, trigger: 'blur', transform(value) {
              return Number(value);
            }}
          ],
          allDose: [
            {required: true, message: '总剂量不能为空', trigger: 'blur' },
            { type: 'number', message: '请输入数字格式',min:0, trigger: 'blur', transform(value) {
              return Number(value);
            }}
          ]
        }
      }
    },
    mounted(){
      var that=this;
      setTimeout(function () {
        that.formValidate.name=$('#recipyName input').val();
        that.formValidate.singleDose=$('#singleDose input').val();
        that.formValidate.expectTarget=$('#expectTarget input').val();
        that.formValidate.allDose=$('#allDose input').val();
      },100)

    },
    methods: {
      handleSubmit (name) {
        var that=this;
        this.$refs[name].validate((valid) => {
          if (valid) {
            that.$emit('childMethod');//执行父组件的方法
          } else {
            layer.msg('表单验证失败!');
          }
        })
      }
    },
    components:{
      FormOk,FormItem,InputOk,ButtonOk,Message
    }
  }
</script>
<style scoped="scoped">
  .ivu-form-item{
    margin-bottom:15px;
  }
</style>

