<template>
  <div id="login">
    用户名
    <input type="text" v-model="name" />
    密码
    <input type="text" v-model="pass" />
    手机号
    <input type="number" v-model="num" />
    验证码
    <input type="text" v-model="ver" />
    <input type="submit" value="注册" @click="submit" />
  </div>
</template>
<script>
// @ is an alias to /src
import { login } from "../http/index";
export default {
  data() {
    return {
      name: "",
      pass: "",
      num: "",
      ver: ""
    };
  },
  methods: {
    submit() {
      login(this.name, this.pass, this.num, this.ver).then(data=>{
          let d = data.data.code
          if(d == '00'){
              alert('用户名重复')
          }else if(d == '11'){
              alert('验证码错误')
          }else{
              alert('注册成功')
          }
      });
    }
  }
};
</script>
<style lang="less">
#login {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: left;
  [type="submit"] {
    float: right;
    cursor: pointer;
  }
  input {
    display: block;
    margin: 10px 0;
  }
}
</style>