<template>
  <div class="body">
    <div class="title">雷诺</div>
    <div class="content">
      <div>首页</div>
      <div>院校专业</div>
      <div>课程培训</div>
      <div>留学方案</div>
      <div @click="FormDialog">我要申请</div>
      <div>公司介绍</div>
      <div style="color: #d81e06; font-size: 2rem">xxx-xxxx-xxx</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    ToPerson() {
      this.$router.push({ path: "/person" });
    },
    FormDialog() {
      this.$eventBus.$emit("dialog", true);
    },
  },
};
</script>

<style lang="scss" scoped>
.body {
  position: relative;
}
.title {
  color: #fff;
  font-size: 3rem;
  font-family: "Lucida Calligraphy", cursive, serif, sans-serif;
  position: absolute;
  line-height: 80px;
  margin-left: 20%;
}
.content {
  margin-left: 10%;
  div {
    display: inline-block;
    padding: 0px 10px;
    color: #cfcfcf;
  }
  div:hover {
    color: red;
  }
}
</style>
