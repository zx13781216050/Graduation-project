<template>
  <div class="login-container">
    <el-card header="雷诺教育客户管理系统" class="login-card">
      <el-form ref="form" :model="model" :rules="rules">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="model.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login('form')">登录</el-button>
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
      rules: {
        username: {
          required: true,
          message: "用户名不能为空",
          trigger: "blur",
        },
        password: {
          required: true,
          message: "密码不能为空",
          trigger: "blur",
        },
      },
    };
  },
  methods: {
    async login(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loginIn();
        }
      });
    },
    async loginIn() {
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
          message: res.data.message,
          duration: 1500,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
}
.login-container {
  position: relative;
  width: 100%;
  height: 100vh;
  background-image: url(../assets/login.jpeg);
  background-size: 100% 100%;
}
.login-card {
  position: absolute;
  width: 25rem;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>