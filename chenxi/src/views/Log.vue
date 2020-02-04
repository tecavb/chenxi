<template>
  <div id="log">
    用户名
    <input type="text" v-model="name" />
    密码
    <input type="password" v-model="pass" />
    <input type="submit" value="登录" @click="submit" />
  </div>
</template>
<script>
// @ is an alias to /src
import { log } from "../http/index";
export default {
  data() {
    return {
      name: "",
      pass: ""
    };
  },
  beforeRouteLeave(to, from, next) {
    setTimeout(() => {
      history.go();
    }, 120);
    next();
  },
  methods: {
    submit() {
      log(this.name, this.pass)
        .then(data => {
          if (data.data.code == 0) {
            alert("登录成功");
            history.pushState(null, "", "/about#/about");
            history.go();
            localStorage.setItem("token", data.data.token);
            localStorage.setItem("name", this.name);
          } else {
            alert("用户名或密码错误");
          }
        })
        .catch(() => {
          alert("网络故障");
        });
    }
  }
};
</script>
<style lang="less">
#log {
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