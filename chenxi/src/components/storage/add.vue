<template>
  <div id="addstor">
    <div>
      产品名
      <input type="text" v-model="name" />
      颜色
      <input type="text" v-model="color" />
      数量
      <input type="number" v-model="count" />
      大小
      <input type="text" v-model="size" />
      价格
      <input type="number" v-model="pri" />
      备注
      <input type="text" v-model="pre" />
      <input type="submit" @click="submit" />
      <input type="button" value="返回" @click="close" />
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import { storadd } from "../../http/index";
import bus from "../../utils/eventbus"
export default {
  prop: ["sh"],
  data() {
    return { name: "", color: "", count: "1", size: "正常", pri: "", pre: "" };
  },
  components: {},
  methods: {
    close() {
      this.$emit("sh");
    },
    submit() {
      let ary = [this.name,this.color,this.count,this.size,this.pri,this.pre]
      storadd(...ary);
      this.$emit("sh");
      bus.$emit('addary',ary)
    }
  }
};
</script>
<style lang="less">
#addstor {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(238, 238, 238, 0.8);
  z-index: 60;
  > div {
    > input {
      display: block;
      width: 100%;
    }
    width: 200px;
    height: 200px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -100px;
    margin-left: -100px;
  }
}
</style>