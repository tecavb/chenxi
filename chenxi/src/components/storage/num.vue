<template>
  <span id="num" ref="n">
    <input type="number" v-model="n" @blur="close" v-focus />
    <span @click="submit">Y</span>
  </span>
</template>
<script>
// @ is an alias to /src
// import { storchange } from "../../http/index";
// import { storpri } from "../../http/index";
export default {
  // props: ["item", "p"],
  data() {
    return {
      n: 1
    };
  },
  methods: {
    // minus(num, p) {
    //   if (p == "c") {
    //     let n = this.item.count - num;
    //     this.item.count = n < 0 ? 0 : n;
    //     storchange(this.item.id, p, num);
    //   } else if (p == "a") {
    //     this.item.count = this.item.count * 1 + num * 1;
    //     storchange(this.item.id, p, num);
    //   } else {
    //     this.item.pri = num;
    //     storpri(this.item.id, num)
    //   }
    // },
    submit() {
      if(this.n <= 0) return
      this.$emit("submit", this.n);
    },
    close() {
      setTimeout(() => {
        this.$emit("close");
      }, 200);
    }
  }
};
</script>
<style lang="less">
#num {
  position: absolute;
  left: 10px;
  z-index: 999;
  width: 35px;
  span {
    display: inline-block;
    width: 100%;
    background: #fff;
    cursor: pointer;
  }
  input {
    outline: none;
    width: 100%;
  }
}
</style>