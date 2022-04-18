<template>
  <div class="block">
    <el-carousel height="65vh">
      <el-carousel-item v-for="item in imageOptions" :key="item.id">
        <h3 class="small">
          <div>
            <img :src="item.url" alt="" style="width: 100%" />
          </div>
        </h3>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageOptions: [
        { id: 1, url: require("../assets/s3.webp") },
        { id: 2, url: require("../assets/s2.webp") },
        { id: 3, url: require("../assets/s3.webp") },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.el-carousel__item h3 {
  line-height: 60vh;
  margin: 0;
}
</style>
