<template>
  <div id="app">
    <div v-if="show">
      <router-link to="/login" tag="span" class="login">注册</router-link>
      <router-link to="/log" tag="span" class="login">登录</router-link>
    </div>
    <div v-else style="float:right;">
      <span style="fontSize:14px;color:blue;">欢迎{{name}}</span>
      <span @click="logout" style="cursor: pointer;">退出登录</span>
    </div>
    <div id="nav">
      <router-link to="/home" v-if="order" tag="span">发送订单</router-link>
      <router-link to="/about" tag="span">库存</router-link>
      <router-link to="/slist" v-if="sell" tag="span">已出库</router-link>
      <router-link to="/order" v-if="sell" tag="span">订单列表</router-link>
    </div>
    <router-view />
  </div>
</template>
<script>
import { token } from "./http/index";
export default {
  data() {
    return { show: true, order: false, sell: false, name: "" };
  },
  created() {
    let t = localStorage.getItem("token");
    let n = localStorage.getItem("name");
    this.name = n;
    token(t).then(data => {
      if (data.data.code == 0) {
        this.show = false;
        if (/2$/.test(t)) {
          this.order = true;
        }
        if (/1$/.test(t)) {
          this.sell = true;
        }
      }
    });
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      history.go();
    }
  }
};
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
}
.router-link-exact-active {
  color: red;
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
  > span {
    cursor: pointer;
    padding: 0 2px;
  }
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
