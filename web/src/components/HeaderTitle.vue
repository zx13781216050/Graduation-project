<template>
  <div class="body">
    <div class="title">雷诺</div>
    <div class="content">
      <div @click="ToHome">首页</div>
      <div @click="ToInstitute">院校专业</div>
      <div @click="ToTrain">课程培训</div>
      <div @click="ToProject">留学方案</div>
      <!-- <div @click="FormDialog">我要申请</div> -->
      <div @click="ToPerson">个人资料</div>
      <div @click="ToNews">新闻资讯</div>
      <div>公司介绍</div>
      <div style="color: #d81e06; font-size: 2rem">xxx-xxxx-xxx</div>
      <div class="login">
        <div v-if="username">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                ><div @click="loginout">退出</div></el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
          <span> {{ username }} </span>
        </div>
        <div v-else>
          <span @click="FormDialog2"> 登录 </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return { username: localStorage.webusername };
  },
  methods: {
    ToPerson() {
      if (!localStorage.webtoken) {
        this.FormDialog2();
      } else {
        this.$router.push({ path: "/person" });
      }
    },
    ToInstitute() {
      this.$router.push({ path: "/institut" });
    },
    ToHome() {
      this.$router.push({ path: "/" });
    },
    ToNews() {
      this.$router.push({ path: "/news" });
    },
    ToTrain() {
      this.$router.push({ path: "/train" });
    },
    ToProject() {
      this.$router.push({ path: "/project" });
    },
    FormDialog2() {
      this.$eventBus.$emit("dialog2", true);
    },
    FormDialog() {
      this.$eventBus.$emit("dialog", true);
    },
    loginout() {
      window.localStorage.removeItem("webusername");
      window.localStorage.removeItem("webtoken");
      window.history.go(0);
    },
  },
  beforeDestory() {
    this.$eventBus.$off("dialog");
    this.$eventBus.$off("dialog2");
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
  .login {
    float: right;
  }
}
</style>
