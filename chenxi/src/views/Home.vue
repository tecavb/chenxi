<template>
  <div>
    <div @click="list" class="orders">订单列表</div>
    <orderlist v-if="show"></orderlist>
    <order></order>
  </div>
</template>
<script>
// @ is an alias to /src
import order from "../components/order/order";
import orderlist from "../components/order/orderlist";
export default {
  data() {
    return {
      show: false
    };
  },
  components: {
    order: order,
    orderlist: orderlist
  },
  methods: {
    list() {
      this.show = !this.show
    }
  }
};
</script>
<style lang="less">
.orders {
  cursor: pointer;
  text-align: right;
  margin-right: 100px;
  color: rgb(17, 81, 255);
}
</style>
