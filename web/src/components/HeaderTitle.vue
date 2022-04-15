<template>
  <div class="body">
    <div class="title">雷诺</div>
    <div class="content">
      <ul>
        <li>首页</li>
        <li>院校专业</li>
        <li>课程培训</li>
        <li>留学方案</li>
        <li>个人资料</li>
        <li>公司介绍</li>
        <li>其他推荐</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {};
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
  line-height: 100px;
  margin-left: 20%;
}
.content {
  margin-left: 10%;
  ul {
    line-height: 150px;
    li {
      color: #cfcfcf;
      display: inline;
      list-style-type: none;
      padding: 0px 10px;
    }
    li:hover {
      color: red;
    }
  }
}
</style>
