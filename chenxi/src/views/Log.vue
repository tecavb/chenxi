<template>
  <div id="log">
    用户名
    <input type="text" v-model="name" />
    密码
    <input type="text" v-model="pass" />
    <input type="submit" value="登录" @click="submit" />
  </div>
</template>
<script>
// @ is an alias to /src
import { log, verify } from "../http/index";
export default {
  data() {
    return {
      name: "",
      pass: ""
    };
  },
  beforeRouteLeave(to, from, next) {
    history.go();
    next();
  },
  methods: {
    submit() {
      verify(this.name).then(data => {
        if (data.data.code == 0) {
          log(this.name, this.pass)
            .then(data => {
              if (data.data.code == 0) {
                alert("登录成功");
                history.go(-1);
                localStorage.setItem("token", data.data.token);
              } else {
                alert("用户名或密码错误");
              }
            })
            .catch(() => {
              alert("网络故障");
            });
        } else {
          alert("账号已登录");
        }
      });
    }
  },
  components: {}
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