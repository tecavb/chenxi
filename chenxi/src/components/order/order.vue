<template>
  <div>
    <div @click="send" class="order">发送订单</div>
    <table id="order">
      <tr>
        <th>
          <input type="checkbox" v-model="all" />产品名
        </th>
        <th>颜色</th>
        <th>数量</th>
        <th>规格</th>
        <th>价格</th>
        <th>备注</th>
        <th>价格</th>
      </tr>
      <tr v-for="(item,index) in ary" :key="item.id">
        <td>
          <input type="checkbox" v-model="item.cho" />
          {{item.name}}
        </td>
        <td>{{item.color}}</td>
        <td @click="onshow(item.id)" class="en">
          {{item.count}}
          <num
            v-if="count[item.id]"
            @close="onclose(item.id)"
            @submit="changecount(item.id,arguments[0])"
          ></num>
        </td>
        <td>{{item.size}}</td>
        <td>￥{{item.pri}}</td>
        <td>{{item.pre}}</td>
        <td>{{pria[index]}}</td>
      </tr>
    </table>
    <div class="right">
      <span>总价:</span>
      <span>{{priall}}</span>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import num from "../storage/num";
import { storlist, order } from "../../http/index";
export default {
  data() {
    return {
      ary: [],
      count: []
    };
  },
  methods: {
    changecount(id, count) {
      this.ary.forEach(item => {
        if (id == item.id) {
          item.count = count;
        }
      });
    },
    onshow(id) {
      this.count.splice(id, 1, true);
    },
    onclose(id) {
      this.count.splice(id, 1, false);
    },
    send() {
      let ary = [];
      this.ary.forEach(item => {
        if (item.cho == true) {
          ary.push(item);
        }
      });
      order(ary, "dasd").then(
        data => {
          if (data.data.code == 0) {
            alert("发送成功");
          }
        },
        () => {
          alert("稍后重试");
        }
      );
    }
  },
  computed: {
    pria() {
      return this.ary.map(item => item.count * item.pri);
    },
    priall() {
      let num = 0;
      this.ary.forEach(item => {
        if (item.cho == true) {
          num += item.count * item.pri;
        }
      });
      return num;
    },
    all: {
      get() {
        return this.ary.every(item => item.cho);
      },
      set(data) {
        this.ary.forEach(item => {
          item.cho = data;
        });
      }
    }
  },
  created() {
    storlist().then(data => {
      data.data.data.forEach(item => {
        if (item.cho == true) {
          this.ary.push(item);
        }
      });
      this.count = Array(this.ary.length + 1);
    });
  },
  components: {
    num: num
  }
};
</script>
<style lang="less">
.right {
  float: right;
  margin-right: 100px;
}
.order {
  cursor: pointer;
  float: right;
  margin-right: 100px;
  color: red;
}
#order {
  .en {
    position: relative;
  }
  width: 100%;
  right: 0;
  bottom: 0;
  z-index: 99;
}
</style>