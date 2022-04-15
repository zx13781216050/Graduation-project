<template>
  <div class="wrapper">
    <swiper ref="mySwiper" v-bind:options="swiperOptions">
      <swiper-slide v-for="(item, index) in 5" v-bind:key="index">
        {{ item }}
      </swiper-slide>

      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
  </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/swiper-bundle.css";
export default {
  components: {
    swiper,
    swiperSlide,
  },
  data() {
    return {
      swiperOptions: {
        loop: true,
        speed: 2000,
        autoplay: {
          delay: 3000,

          stopOnLastSlide: false,
          disableOnInteraction: false,
        },
        // 显示分页
        pagination: {
          el: ".swiper-pagination",
          clickable: true, //允许分页点击跳转
        },
        // 设置点击箭头
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
    };
  },
};
</script>

<style scoped>
.swiper-container {
  background: #f00;
}
.swiper-slide {
  height: 150px;
}
</style>