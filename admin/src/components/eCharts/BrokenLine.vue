<template>
  <div ref="BrokenLineChart" style="width: 100%; height: 30vh"></div>
</template>

<script>
export default {
  props: {
    dataList: {
      type: Array,
      default: () => {},
    },
    legendData: {
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
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(this.$refs.BrokenLineChart);
      // 绘制图表
      myChart.setOption({
        title: {
          show: true, // 显示策略，默认值true,可选为：true（显示） | false（隐藏）
          text: "2016-2021中国留学生各国数量统计",
        },

        tooltip: {
          trigger: "axis",
          axisLabel: {
            color: "#000000",
          },
        },
        legend: {
          data: this.legendData,
          textStyle: {
            color: "#000000",
          },
        },
        grid: {
          left: "3%",
          right: "7%",
          top: "12%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          type: "showTip",
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["2016", "2017", "2018", "2019", "2020", "2021"],
          //修改刻度标签
          // axisLabel: {
          //   color: "#fff",
          // },
        },
        yAxis: {
          type: "value",
          //修改刻度标签
          // axisLabel: {
          //   color: "#fff",
          // },
          //分割线样式
          splitLine: {
            lineStyle: {
              color: "rgba(0,0,0,0.1)",
            },
          },
        },
        series: this.dataList,
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