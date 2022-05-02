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
export default {
  data() {
    return {
      model: {},
    };
  },
  methods: {
    async login() {
      let data = this.$qs.stringify(this.model);
      const res = await this.$http.post("user/login", data);

      if (res.data.status == 0) {
        localStorage.username = res.data.username;
        localStorage.token = res.data.token;
        this.$store.commit("setusername", res.data.username);
        this.$store.commit("settoken", res.data.token);
        this.$nextTick(() => {
          this.$router.push("/home");
        });

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