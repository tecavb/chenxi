<template>
  <div id="app">
    <div v-if="show">
      <router-link to="/login" tag="span" class="login">注册</router-link>
      <router-link to="/log" tag="span" class="login">登录</router-link>
    </div>
    <div id="nav">
      <router-link to="/">发送订单</router-link>|
      <router-link to="/about">库存</router-link>|
      <router-link to="/slist">已出库</router-link>
    </div>
    <router-view />
  </div>
</template>
<script>
import { token } from "./http/index";
export default {
  data() {
    return { show: true };
  },
  created() {
    let t = localStorage.getItem("token");
    token(t).then(data => {
      if (data.data.code == 0) {
        this.show = false;
      } else {
        this.show = true;
      }
    });
  }
};
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.login {
  margin-top: 20px;
  margin-right: 100px;
  cursor: pointer;
  float: right;
}
.log {
  margin-top: 20px;
  margin-right: 10px;
  cursor: pointer;
  float: right;
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
