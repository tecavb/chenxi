<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <template v-for="(item,index) in props.row.goods">
            <el-form-item label="商品名称" :key="props.row.goods[index].id">
              <span>{{ props.row.goods[index].name }}</span>
            </el-form-item>
            <el-form-item label="颜色" :key="props.row.goods[index].id">
              <span>{{ props.row.goods[index].color }}</span>
            </el-form-item>
            <el-form-item label="数量" :key="props.row.goods[index].id">
              <span>{{ props.row.goods[index].count }}</span>
            </el-form-item>
            <el-form-item label="规格" :key="props.row.goods[index].id">
              <span>{{ props.row.goods[index].size }}</span>
            </el-form-item>
            <el-form-item label="价格" :key="props.row.goods[index].id">
              <span>{{ props.row.goods[index].pri }}</span>
            </el-form-item>
            <el-form-item label="备注" :key="props.row.goods[index].id">
              <span>{{ props.row.goods[index].pre }}</span>
            </el-form-item>
            <div style="width:100%;height:1px;background:#ebeef5" :key="props.row.goods[index].id"></div>
          </template>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column label="代销商" prop="for"></el-table-column>
    <el-table-column label="时间" prop="time"></el-table-column>
    <el-table-column label="状态">
      <template slot-scope="scope">
        <el-select
          v-model="value[scope.$index]"
          :placeholder="scope.row.state"
          @change="onstate(scope.row.id,value[scope.$index])"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </template>
    </el-table-column>
    <el-table-column label="总价" prop="all"></el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini" type="danger" @click="orderDelete(scope.$index,scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
// @ is an alias to /src
import { orderlist, orderstate, orderdele } from "../http/index";
export default {
  data() {
    return {
      tableData: [],
      options: [
        {
          value: "等待处理",
          label: "等待处理"
        },
        {
          value: "正在处理",
          label: "正在处理"
        },
        {
          value: "等待配送",
          label: "等待配送"
        }
      ],
      value: []
    };
  },
  created() {
    orderlist().then(data => {
      this.tableData = data.data.data.map(item => {
        this.value.push(item.state);
        item.goods = JSON.parse(item.goods);
        item.all = 0;
        item.goods.forEach(ite => {
          item.all += ite.pri * ite.count;
        });
        return item;
      });
    });
  },
  methods: {
    onstate(id, state) {
      orderstate(id, state);
    },
    orderDelete(index, id) {
      this.tableData.splice(index, 1);
      orderdele(id);
    }
  }
};
</script>
<style lang="less">
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>