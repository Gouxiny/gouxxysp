<template>
  <div class="site-page--login">
        <div class="site-page--login-form">
      <div class="site-page--login-img">
        </div>
          <div class="UserName-div">
            <Input class="UserName" v-model="username" placeholder="请输入用户名" style="width: 300px"></Input>
          </div>
          <div class="PassWord-div">
            <Input class="PassWord" v-model="password" placeholder="请输入密码" style="width: 300px"></Input>
          </div>
          <div class="submitBt">
            <Button type="primary" shape="circle">登录</Button>
            <Button type="primary" shape="circle">注册</Button>
          </div>
      </div>

  </div>
</template>

<script>
  export default{
    data(){
      return{
      username:'',
      password:''
      }
    }
  }
</script>

<style>
  .submitBt{
    margin-top: 12%;
  }
  .site-page--login-form{
        float: right;
        margin-right: 39%;
        margin-top: 13%;
        background-color: white;
        height: 485px;
        width: 27%;
  }
   .PassWord-div{
     margin-top: 12%;
   }
   .UserName-div{

   }
  .site-page--login{
    background: url("~@/assets/imgs/loginimg.jpeg") no-repeat;
    background-position: center;
    background-size: cover;
    width: auto;
    height: 820px;
  }
  .site-page--login-img{
    width: 48%;
    height: 36%;
    margin-left: 32%;
    float: left;
    background: url("~@/assets/imgs/logo.png") no-repeat;
    background-size: contain;
  }
  .PassWord{
    margin-top: 10px;
  }
  button{

  }
</style>
