<template>
  <table id="storage">
    <tr>
      <th>
        <input type="checkbox" v-model="all" />产品名
      </th>
      <th>颜色</th>
      <th>数量</th>
      <th>规格</th>
      <th>价格</th>
      <th>备注</th>
      <th>操作</th>
    </tr>
    <tr v-for="item in ary" :key="item.id">
      <td>
        <input type="checkbox" v-model="item.cho" @change="oncho(item.id, item.cho)" />
        {{item.name}}
      </td>
      <td>{{item.color}}</td>
      <td>{{item.count}}</td>
      <td>{{item.size}}</td>
      <td @dblclick="onshow(item.id,'p')">
        <num
          v-if="pri[item.id]"
          @close="onclose(item.id, 'p')"
          @submit="changepri(arguments[0],item.id)"
        ></num>
        ￥{{item.pri}}
      </td>
      <td>{{item.pre}}</td>
      <td>
        <span @click="onshow(item.id,'c')">
          <a>出库</a>
          <num
            v-if="minus[item.id]"
            @close="onclose(item.id,'c')"
            @submit="onminus(item.id,arguments[0])"
          />
        </span>
        <span @click="onshow(item.id,'a')">
          <a>入库</a>
          <num
            v-if="add[item.id]"
            @close="onclose(item.id,'a')"
            @submit="onadd(item.id,arguments[0])"
          />
        </span>
      </td>
    </tr>
  </table>
  <!-- <ul>
        <li v-for="item in ary" :key="item.id">{{item}}</li>
  </ul>-->
</template>
<script>
// @ is an alias to /src
import { storlist } from "../../http/index";
import bus from "../../utils/eventbus";
import num from "./num";
import { storchange } from "../../http/index"; //id,ac,num
import { storpri } from "../../http/index"; //id,pri
import { storcho } from "../../http/index"; //id
import { outstor } from "../../http/index"; //name, fors, color, count, size, pri, pre
export default {
  data() {
    return {
      ary: [],
      minus: [],
      add: [],
      pri: []
    };
  },
  created() {
    this.request();
    bus.$on("addary", this.addary);
  },
  computed: {
    all: {
      get() {
        return this.ary.every(item => item.cho);
      },
      set(data) {
        let i = 0;
        this.ary.forEach(item => {
          item.cho = data;
          setTimeout(() => {
            storcho(item.id, data);
          }, (i = i + 10));
        });
      }
    }
  },
  methods: {
    changepri(pri, id) {
      this.ary.forEach(item => {
        if (item.id == id) {
          item.pri = pri;
        }
      });
      this.pri.splice(id, 1, false);
      storpri(id, pri);
    },
    request() {
      storlist().then(data => {
        data.data.data.forEach(item => {
          if (item.cho == true) {
            this.ary.push(item);
          }
        });
        this.minus = Array(this.ary.length + 1);
        this.add = Array(this.ary.length + 1);
        this.pri = Array(this.ary.length + 1);
      });
    },
    onshow(id, d) {
      d == "c"
        ? this.minus.splice(id, 1, true)
        : d == "a"
        ? this.add.splice(id, 1, true)
        : this.pri.splice(id, 1, true);
    },
    onminus(id, num) {
      this.ary.forEach(item => {
        let n = null;
        if (item.id == id) {
          n = item.count - num;
          item.count = n < 0 ? 0 : n;
          if (n >= 0) {
            outstor(
              item.name,
              "直接售卖",
              item.color,
              num,
              item.size,
              item.pri,
              item.pre
            );
          }else{
            alert('库存不足！')
          }
        }
      });
      storchange(id, "c", num);
    },
    onclose(id, d) {
      d == "c"
        ? this.minus.splice(id, 1, false)
        : d == "a"
        ? this.add.splice(id, 1, false)
        : this.pri.splice(id, 1, false);
    },
    addary(msg) {
      let data;
      this.ary.forEach(item => {
        data = item.id;
      });
      let [name, color, count, size, pri, pre] = msg;
      this.ary.push({
        id: data + 1,
        name: name,
        color: color,
        count: count,
        size: size,
        pri: pri,
        pre: pre,
        cho: true
      });
    },
    onadd(id, num) {
      this.ary.forEach(item => {
        if (item.id == id) {
          item.count = item.count * 1 + num * 1;
        }
      });
      storchange(id, "a", num);
    },
    oncho(id, data) {
      storcho(id, data);
    }
  },
  components: {
    num: num
  }
};
</script>
<style lang="less">
#storage {
  width: 100%;
  tr {
    > td:nth-child(5) {
      position: relative;
    }
    > td:last-child {
      width: 14%;
      > span {
        position: relative;
        > a:hover {
          color: blue;
        }
      }
      > span:last-child {
        margin-left: 10px;
      }
    }
  }
}
</style>