<template>
  <el-container style="height: 100vh">
    <el-header style="height: 100px"><header-title /></el-header>
    <el-main style="padding: 0">
      <div>
        <carousel />
      </div>
      <div>
        <swiper />
        <hr style="border: 1px solid #d81e06" />
        <news />
      </div>
      <div class="footer">
        <footer2 />
      </div>
    </el-main>

    <dialog-form />
    <login-form />
  </el-container>
</template>

<script>
import HeaderTitle from "../components/HeaderTitle.vue";
import Carousel from "../components/Carousel.vue";
import Swiper from "../components/Swiper.vue";
import Footer2 from "../components/Footer.vue";
import DialogForm from "../components/Person.vue";
import LoginForm from "../components/Login.vue";
import News from "../components/News.vue";
export default {
  components: {
    HeaderTitle,
    Carousel,
    Swiper,
    Footer2,
    DialogForm,
    LoginForm,
    News,
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
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