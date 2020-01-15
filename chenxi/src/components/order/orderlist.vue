<template>
  <table id="orderl">
    <tr>
      <th>订单时间</th>
      <th>货物名称</th>
      <th>总价</th>
      <th>删除订单</th>
    </tr>
    <tr v-for="(item,ind) in ary" :key="item.id">
      <td>{{item.time}}</td>
      <td>
        <span
          v-for="(ite,index) in JSON.parse(item.goods)"
          :key="ite.id"
          :title="ite.size+'￥'+ite.pri+'数量'+ite.count+ite.pre"
        >{{index+1}}.{{ite.color}}{{ite.name}}</span>
      </td>
      <td>{{priall[ind]}}</td>
      <td @click="dele(ind,item.id)">删除</td>
    </tr>
  </table>
</template>
<script>
// @ is an alias to /src
import { orderlist, orderdele, token } from "../../http/index";
export default {
  data() {
    return {
      ary: []
    };
  },
  created() {
    orderlist().then(data => {
      this.ary = [];
      data.data.data.forEach(item => {
        if (item.for == "dasd") {
          this.ary.push(item);
        }
      });
    });
  },
  computed: {
    priall() {
      let num = [];
      this.ary.forEach(item => {
        let n = JSON.parse(item.goods).map(item => {
          return item.pri * item.count;
        });
        num.push(
          n.reduce((a, b) => {
            return a + b;
          })
        );
      });
      return num;
    }
  },
  methods: {
    dele(idx, id) {
      let t = localStorage.getItem("token");
      token(t).then(data => {
        if (data.data.code == 0) {
          if (confirm("请与本厂商议后再取消订单") == true) {
            this.ary.splice(idx, 1);
            orderdele(id);
          }
        }else{
          history.pushState(null,'','/#/log')
          history.go()
          alert('请确认登陆状态')
        }
      });
    }
  },
  components: {}
};
</script>
<style lang="less">
#orderl {
  border: 1px solid #eee;
  position: absolute;
  background-color: #fff;
  z-index: 999;
  tr {
    td:last-child {
      color: blue;
      cursor: pointer;
    }
  }
}
</style>