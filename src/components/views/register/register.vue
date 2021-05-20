<template>
  <div class="site-page-register">
        <div class="site-page-register-form">
          <div class="site-page-register-img"></div>
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80"     style="margin-left: 19%;" >
            <Form-item label="姓名" prop="name" style="width: 72%;">
                <Input v-model="formValidate.name" placeholder="请输入姓名"></Input>
            </Form-item>
            <Form-item label="邮箱" prop="mail" style="width: 72%;">
                <Input v-model="formValidate.mail" placeholder="请输入邮箱"></Input>
            </Form-item>
            <Form-item label="城市" prop="city" style="width: 72%;">
                <Select v-model="formValidate.city" placeholder="请选择所在地">
                    <Option value="beijing">北京市</Option>
                    <Option value="shanghai">上海市</Option>
                    <Option value="shenzhen">深圳市</Option>
                </Select>
            </Form-item>
           <Form-item label="性别" prop="gender" style="width: 72%;">
                <Radio-group v-model="formValidate.gender">
                    <Radio label="male">男</Radio>
                    <Radio label="female">女</Radio>
                </Radio-group>
            </Form-item>
            <Form-item label="爱好" prop="interest" style="width: 72%;">
                <Checkbox-group v-model="formValidate.interest">
                    <Checkbox label="吃饭"></Checkbox>
                    <Checkbox label="睡觉"></Checkbox>
                    <Checkbox label="跑步"></Checkbox>
                    <Checkbox label="看电影"></Checkbox>
                </Checkbox-group>
            </Form-item>
            <Form-item label="介绍" prop="desc" style="width: 72%;">
                <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
            </Form-item>
            <Form-item style="width: 72%;">
                <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                <Button type="primary" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
            </Form-item>
          </Form>
      </div>

  </div>
</template>

<script>
  export default {
    data () {
      return {
          formValidate: {
              name: '',
              mail: '',
              city: '',
              gender: '',
              interest: [],
              date: '',
              time: '',
              desc: ''
          },
          ruleValidate: {
              name: [
                  { required: true, message: '姓名不能为空', trigger: 'blur' }
              ],
              mail: [
                  { required: true, message: '邮箱不能为空', trigger: 'blur' },
                  { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
              ],
              city: [
                  { required: true, message: '请选择城市', trigger: 'change' }
              ],
              gender: [
                  { required: true, message: '请选择性别', trigger: 'change' }
              ],
              interest: [
                  { required: true, type: 'array', min: 1, message: '至少选择一个爱好', trigger: 'change' },
                  { type: 'array', max: 2, message: '最多选择两个爱好', trigger: 'change' }
              ],
              date: [
                  { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
              ],
              time: [
                  { required: true, type: 'date', message: '请选择时间', trigger: 'change' }
              ],
              desc: [
                  { required: true, message: '请输入个人介绍', trigger: 'blur' },
                  { type: 'string', min: 20, message: '介绍不能少于20字', trigger: 'blur' }
              ]
            }
          }
        },
        methods: {
          handleSubmit (name) {
              this.$refs[name].validate((valid) => {
                  if (valid) {
                      this.$Message.success('提交成功!');
                  } else {
                      this.$Message.error('表单验证失败!');
                  }
              })
          },
          handleReset (name) {
              this.$refs[name].resetFields();
          }
        }
      }
</script>

<style>
  .site-page-register-img{
    width: 48%;
    height: 36%;
    margin-left: 32%;
    background: url("~@/assets/imgs/logo.png") no-repeat;
    background-size: contain;
  }
  .site-page-register-form{
    float: right;
    margin-right: 35%;
    margin-top: 3%;
    background-color: white;
    height: 723px;
    width: 35%;
  }
  .site-page-register{
    background: url("~@/assets/imgs/loginimg.jpeg") no-repeat;
    background-position: center;
    background-size: cover;
    width: auto;
    height: 820px;
  }
  .submitBt{
    margin-top: 10%;
  }
</style>
