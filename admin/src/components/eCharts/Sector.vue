<template>
  <div ref="Sectorchart" style="width: 40vw; height: 40vh"></div>
</template>

<script>
export default {
  props: {
    dataList: {
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
      let myChart = this.$echarts.init(this.$refs.Sectorchart);
      // 绘制图表
      myChart.setOption({
        title: {
          show: true, // 显示策略，默认值true,可选为：true（显示） | false（隐藏）
          text: " 2021年中国出国留学年龄分布",
        },
        legend: {
          top: "bottom",
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        series: [
          {
            name: "Nightingale Chart",
            type: "pie",
            radius: [40, 150],
            center: ["50%", "50%"],
            roseType: "area",
            itemStyle: {
              borderRadius: 8,
            },
            data: [
              { value: 2, name: "12岁以下" },
              { value: 3, name: "12-14岁" },
              { value: 10, name: "15-17岁" },
              { value: 48, name: "18-21岁" },
              { value: 27, name: "22-24岁" },
              { value: 10, name: "25岁及以上" },
            ],
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