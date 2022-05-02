<template>
  <div class="body">
    <div class="brokenline">
      <el-card>
        <broken-line :dataList="trend" />
      </el-card>
    </div>
    <div class="sector-strip">
      <el-card>
        <sector />
      </el-card>
      <el-card>
        <strip :dataList="parties" :partiesName="partiesName" />
      </el-card>
    </div>
  </div>
</template>

<script>
import BrokenLine from "./../components/eCharts/BrokenLine.vue";
import Sector from "./../components/eCharts/Sector.vue";
import Strip from "./../components/eCharts/Strip.vue";
export default {
  components: { BrokenLine, Sector, Strip },
  data() {
    return {
      trend: [
        {
          name: "法国",
          type: "line",
          data: [2, 3, 5, 9, 6, 5],
        },
        {
          name: "英国",
          type: "line",
          data: [15, 19, 27, 35, 30, 32],
        },
        {
          name: "美国",
          type: "line",
          data: [20, 25, 31, 38, 31, 32],
        },
        {
          name: "德国",
          type: "line",
          data: [3, 5, 10, 18, 15, 15],
        },
        {
          name: "日本",
          type: "line",
          data: [10, 13, 15, 22, 14, 16],
        },
        {
          name: "新加坡",
          type: "line",
          data: [7, 10, 14, 20, 16, 15],
        },
      ],
      parties: [2763, 3032, 3396, 3745, 4296, 2553],
      partiesName: [2015, 2016, 2017, 2018, 2019, 2020],
    };
  },
};
</script>

<style lang="scss" scoped>
.body {
}
.brokenline {
  margin: 10px;
}
.sector-strip {
  display: flex;
  justify-content: space-between;
}
</style>