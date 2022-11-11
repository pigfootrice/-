<template>
  <div>
    <el-row>
      <el-col :span="8" style="padding-right: 10px">
        <el-card class="box-card">
          <div class="user">
            <img src="../assets/images/user.jpeg" alt="" />
            <div class="userinfo">
              <p class="name">差不多泪点</p>
              <p class="access">系统管理员</p>
            </div>
          </div>
          <div class="login-info">
            <p>上次登录时间:<span>nnnn</span></p>
            <p>上次登录地点:<span>adress</span></p>
          </div>
        </el-card>
        <el-card class="box-card" style="padding-bottom: 50px">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column
              v-for="(val, key) in tableLabel"
              :prop="key"
              :label="val"
            >
            </el-table-column>
          </el-table>
        </el-card>
        <div class="grid-content bg-purple"></div
      ></el-col>
      <el-col :span="16" style="padding-left: 10px">
        <div class="num">
          <el-card
            v-for="item in countData"
            :key="item.name"
            :body-style="{ display: 'flex', padding: '0' }"
          >
            <i
              class="icon"
              :class="`el-icon-${item.icon}`"
              :style="{ background: item.color }"
            ></i>
            <div class="detail">
              <p class="price">￥{{ item.value }}</p>
              <p class="desc">{{ item.name }}</p>
            </div>
          </el-card>
        </div>
        <el-card style="height: 280px">
          <!-- 折线图 -->
          <div ref="echarts1" style="height: 280px"></div>
        </el-card>
        <div class="graph">
          <el-card style="height: 260px">
            <div ref="echarts2" style="height: 260px"></div>
          </el-card>
          <el-card style="height: 260px">
            <div ref="echarts3" style="height: 230px"></div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getData } from "@/api";
import * as echarts from "echarts";
export default {
  data() {
    return {
      tableData: [],
      tableLabel: {
        name: "品牌",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 1234,
          icon: "star-on",
          color: "orange",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "skyblue",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 1234,
          icon: "star-on",
          color: "orange",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "skyblue",
        },
      ],
    };
  },
  mounted() {
    getData().then(({ data }) => {
      const { tableData } = data.data;
      this.tableData = tableData;
      // 获取 折线图的dom节点
      const echarts1 = echarts.init(this.$refs.echarts1);
      var echarts1Option = {};
      const { orderData, userData, videoData } = data.data;
      const xAxis = Object.keys(orderData.data[0]);
      const xAxisData = { data: xAxis };
      echarts1Option.xAxis = xAxisData;
      echarts1Option.yAxis = {};
      echarts1Option.legend = xAxisData;
      echarts1Option.series = [];
      (echarts1Option.tooltip = {
        trigger: "axis",
      }),
        xAxis.forEach((key) => {
          echarts1Option.series.push({
            name: key,
            data: orderData.data.map((item) => item[key]),
            type: "line",
          });
        });
      echarts1.setOption(echarts1Option);

      // 柱状图
      const echarts2 = echarts.init(this.$refs.echarts2);
      const echarts2Option = {
        legend: {
          // 图例文字颜色
          textStyle: {
            color: "#333",
          },
        },
        grid: {
          left: "20%",
        },
        // 提示框
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category", // 类目轴
          data: userData.map((item) => item.date),
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
          axisLabel: {
            interval: 0,
            color: "#333",
          },
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
          },
        ],
        color: ["#2ec7c9", "#b6a2de"],
        series: [
          {
            name: "新增用户",
            data: userData.map((item) => item.new),
            type: "bar",
          },
          {
            name: "活跃用户",
            data: userData.map((item) => item.active),
            type: "bar",
          },
        ],
      };
      echarts2.setOption(echarts2Option);

      // 饼状图
      const echarts3 = echarts.init(this.$refs.echarts3);
      const echarts3Option = {
        tooltip: {
          trigger: "item",
        },
        color: [
          "#0f78f4",
          "#dd536b",
          "#9462e5",
          "#a6a6a6",
          "#e1bb22",
          "#39c362",
          "#3ed1cf",
        ],
        series: [
          {
            data: videoData,
            type: "pie",
          },
        ],
      };
      echarts3.setOption(echarts3Option);
    });
  },
};
</script>

<style lang="less" scoped>
.user {
  display: flex;
  align-items: center;
  img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    margin-right: 40px;
  }
  .name {
    font-size: 20px;
    margin-bottom: 20px;
  }
  .access {
    font-size: 15px;
    color: #aaa;
  }
}
.login-info {
  padding-top: 15px;
  border-top: 1px solid #ccc;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  span {
    padding-left: 70px;
  }
  p {
    line-height: 25px;
    font-size: 14px;
    color: #aaa;
  }
}
.box-card {
  margin-bottom: 20px;
}

.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .icon {
    width: 80px;
    height: 80px;
    font-size: 30px;
    text-align: center;
    line-height: 80px;
    color: #fff;
  }
  .detail {
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .price {
      font-size: 30px;
      margin-bottom: 10px;
      line-height: 30px;
      height: 30px;
    }
    .desc {
      font-size: 14px;
      color: #999;
      text-align: center;
    }
  }
  .el-card {
    width: 32%;
    margin-bottom: 20px;
  }
}
.graph {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  .el-card {
    width: 48%;
  }
}
</style>
