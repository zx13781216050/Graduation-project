<template>
  <div ref="chart" style="width: 40vw; height: 40vh"></div>
</template>

<script>
export default {
  props: {
    dataList: {
      type: Array,
      default: () => {},
    },
    partiesName: {
      type: Array,
      default: () => {},
    },
  },
  data() {
    return {};
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      //修改第一个bar颜色
      let temp = this.dataList[0];
      this.dataList[0] = {
        value: temp,
        itemStyle: {
          color: "#b38a2f",
        },
      };

      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(this.$refs.chart);
      // 绘制图表
      myChart.setOption({
        color: ["#65edf7"],
        title: {
          show: true, // 显示策略，默认值true,可选为：true（显示） | false（隐藏）
          text: "2015-2020年中国留学服务行业市场规模",
          subtext: "亿元",
          //color: "#fff",
          subtextStyle: {
            //color: "#fff",
          },
        },
        tooltip: {
          trigger: "axis",
        },
        grid: {
          left: "0",
          top: "50px",
          right: "20px",
          bottom: "0",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: this.partiesName,
          //修改刻度标签
          axisLabel: {
            fontSize: 10,
            color: "#fff",
          },
        },
        yAxis: {
          type: "value",
          data: ["亿元"],
          //修改刻度标签
          //   axisLabel: {
          //     color: "#fff",
          //   },
          //y轴线样式
          axisLine: {
            lineStyle: {
              color: "rgba(0,0,0,0.5)",
            },
          },
          //分割线样式
          splitLine: {
            lineStyle: {
              color: "rgba(0,0,0,0.1)",
            },
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: ["rgba(10,10,10,0.1)"],
            },
          },
        },

        series: [
          {
            name: "亿元",
            data: this.dataList,
            type: "bar",
          },
        ],
      });

      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },
  },
};
</script>

<style>
</style>