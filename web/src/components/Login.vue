<template>
  <div>
    <el-dialog title="登录" width="800px" :visible.sync="showDialog">
      <el-form
        ref="form"
        :model="form"
        label-position="left"
        label-width="120px"
        style="padding: 0 20px"
        size="mini"
      >
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="用户名:">
              <el-input v-model="form.username" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="密码:">
              <el-input v-model="form.password" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="toReg" size="mini"> 注册</el-button>
        <el-button type="primary" @click="onSubmit('login')" size="mini">
          登录提交</el-button
        >
      </span>
    </el-dialog>
    <el-dialog title="注册" width="800px" :visible.sync="regShowDialog">
      <el-form
        ref="form"
        :model="form"
        label-position="left"
        label-width="120px"
        style="padding: 0 20px"
        size="mini"
      >
        <el-row :gutter="10">
          <el-col :span="24">
            <el-form-item label="用户名:">
              <el-input v-model="form.username" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="密码:">
              <el-input v-model="form.password" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="再次输入密码:">
              <el-input v-model="form.repassword" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="toLogin" size="mini"> 登录</el-button>
        <el-button type="primary" @click="onSubmit()" size="mini">
          注册提交</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      showDialog: false,
      regShowDialog: false,
    };
  },
  created() {},
  mounted() {
    this.$eventBus.$on("dialog2", (showDialog) => {
      this.showDialog = showDialog;
      console.log(showDialog);
    });
  },
  methods: {
    async onSubmit(e) {
      let data = this.$qs.stringify(this.form);
      let res;
      if (e) {
        res = await this.$http.post(`webuser/login`, data);
      } else {
        res = await this.$http.post(`webuser/reguser`, data);
      }
      localStorage.token = res.data.token;
      if (res.data.status == 0) {
        if (e) {
          this.showDialog = false;
          this.regShowDialog = false;
        } else {
          this.showDialog = true;
          this.regShowDialog = false;
        }
        localStorage.token = res.data.token;
        localStorage.username = res.data.username;
        this.$router.go(0);
        this.$notify({
          title: "提示",
          type: "success",
          message: res.data.message,
        });
      } else {
        this.$notify.error({
          title: "提示",
          message: res.data.message,
          duration: 1500,
        });
      }
    },
    async toLogin() {
      this.showDialog = true;
      this.regShowDialog = false;
    },
    async toReg() {
      this.showDialog = false;
      this.regShowDialog = true;
    },
  },
};
</script>

<style>
</style>