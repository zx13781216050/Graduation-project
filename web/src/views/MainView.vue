<template>
  <el-container style="height: 100vh">
    <el-header style="height: 120px"><header-title /></el-header>
    <el-main style="padding: 0"><carousel /></el-main>
  </el-container>
</template>

<script>
import HeaderTitle from "../components/HeaderTitle.vue";
import Carousel from "../components/Carousel.vue";

export default {
  components: {
    HeaderTitle,
    Carousel,
    Swiper,
  },
};
</script>

<style>
.el-header {
  background-color: #222222;
  color: #333;
  text-align: center;
  line-height: 120px;
}

.el-main {
  background-color: #ffffff;
  color: #333;
  text-align: center;
  line-height: 160px;
}
</style>