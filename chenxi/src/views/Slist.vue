<template>
  <table id="selled">
    <tr>
      <th>产品名</th>
      <th>收货</th>
      <th>颜色</th>
      <th>数量</th>
      <th>规格</th>
      <th>价格</th>
      <th>出库时间</th>
      <th>备注</th>
    </tr>
    <tr v-for="item in ary" :key="item.id">
      <td>{{item.name}}</td>
      <td>{{item.for}}</td>
      <td>{{item.color}}</td>
      <td>{{item.count}}</td>
      <td>{{item.size}}</td>
      <td>￥{{item.pri}}</td>
      <td>{{item.time}}</td>
      <td>{{item.pre}}</td>
    </tr>
  </table>
</template>
<script>
// @ is an alias to /src
import { outlist } from "../http/index";
export default {
  data() {
    return { ary: [] };
  },
  created() {
    outlist().then(data => {
      this.ary = data.data.data;
    });
  },
  components: {}
};
</script>
<style lang="less">
#selled {
  width: 100%;
}
</style>