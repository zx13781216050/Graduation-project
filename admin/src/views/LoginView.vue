<template>
  <div class="login-container">
    <el-card header="请先登录" class="login-card">
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="model.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
var qs = require("qs");
export default {
  data() {
    return {
      model: {},
    };
  },
  methods: {
    async login() {
      let data = qs.stringify({
        username: this.model.username,
        password: this.model.password,
      });
      const res = await this.$http.post("login", data);
      localStorage.token = res.data.token;

      if (res.data.status == 0) {
        this.$router.push("/");
        this.$store.commit("setusername", res.data.username);
        console.log(this.$store.state.username);
        this.$notify({
          title: "提示",
          type: "success",
          message: "登录成功",
        });
      } else {
        this.$notify.error({
          title: "提示",
          message: "账号或密码错误",
          duration: 1500,
        });
      }
    },
  },
};
</script>

<style>
.login-card {
  width: 25rem;
  margin: 5rem auto;
}
</style>