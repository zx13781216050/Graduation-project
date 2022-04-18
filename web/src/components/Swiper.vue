
<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="data in 5" :key="data">
        <div class="background">
          <img src="../assets/ma.webp" alt="" />
        </div>
        <div class="name">麻省理工学院</div>
      </div>
    </div>
  </div>
</template>
 
 
 

<script>
// 引入swiper插件的js
import Swiper from "swiper";
import "swiper/swiper-bundle.css";
export default {
  name: "index",
  data() {
    return {};
  },
  created() {},
  mounted() {
    this.myswiper();
  },
  methods: {
    myswiper: function () {
      var swiper = new Swiper(".swiper-container", {
        slidesPerView: 3,
        spaceBetween: 30,
        centeredSlides: true,
        loop: true,
      });
    },
  },
};
</script>
 

<style lang="scss" scoped>
.swiper-container {
  position: relative;
  margin-top: 2rem;
  margin-bottom: 2rem;
  width: 70%;
  height: 400px;
}
.swiper-slide {
  text-align: center;
  font-size: 18px;
  border: 1px #a9a9a9 solid;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  transition: 300ms;
  transform: scale(0.8);
  .background {
    img {
      width: 100%;
    }
  }
  .name {
    font-size: 2rem;
    margin-top: -100px;
  }
}
.swiper-slide-active,
.swiper-slide-duplicate-active {
  transform: scale(1);
}
</style>