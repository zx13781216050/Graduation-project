<template>
  <el-container style="height: 100vh">
    <el-header style="height: 100px"><header-title /></el-header>
    <el-main style="padding: 0">
      <div class="content">
        <div>个人资料</div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import HeaderTitle from "../components/HeaderTitle.vue";
import Carousel from "../components/Carousel.vue";
import Swiper from "../components/Swiper.vue";
export default {
  components: {
    HeaderTitle,
    Carousel,
    Swiper,
  },
};
</script>

<style scoped>
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