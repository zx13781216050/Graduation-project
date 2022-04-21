
<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="data in imgOptions" :key="data.name">
        <div class="background">
          <img :src="data.url" alt="" />
        </div>
        <div class="name">{{ data.name }}</div>
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
    return {
      imgOptions: [
        { url: require("../assets/ma.webp"), name: "麻省理工学院" },
        { url: require("../assets/ha.jpeg"), name: "哈佛大学" },
        { url: require("../assets/jian.jpeg"), name: "剑桥大学" },
        { url: require("../assets/niu.jpeg"), name: "牛津大学" },
        { url: require("../assets/si.jpeg"), name: "斯坦福大学" },
      ],
    };
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