<template>
  <div>
    <div @click="open" class="add">添加产品</div>
    <add v-if="show" @sh='close'></add>
    <storlist></storlist>
  </div>
</template>
<script>
// @ is an alias to /src
import storlist from "../components/storage/storlist";
import add from "../components/storage/add";
export default {
  data() {
    return {
      show:false,
    };
  },
  components: {
    storlist: storlist,
    add:add,
  },
  methods:{
    open(){
      this.show = true;
    },
    close(){
      this.show = false;
    }
  }
};
</script>
<style lang="less">
    .add{
      cursor: pointer;
      float: right;
      margin-right: 100px;
      color: rgb(17, 81, 255);
    }
</style>
