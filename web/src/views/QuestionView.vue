<template>
  <el-container style="height: 100vh">
    <el-header style="height: 100px"><header-title /></el-header>
    <el-main style="padding: 0">
      <div class="content">
        <div class="title">提出问题</div>
        <div class="img"><img src="../assets/l-x.png" alt="" /></div>
        <div class="form">
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
                <el-form-item label="问题内容:">
                  <el-input
                    type="textarea"
                    v-model="form.Question_describe"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitHandle" size="mini">
              提交</el-button
            >
          </span>
        </div>
      </div>
    </el-main>
    <login-form />
  </el-container>
</template>

<script>
import HeaderTitle from "../components/HeaderTitle.vue";
import LoginForm from "../components/Login.vue";
import { mixin } from "@/mixin/mixin";

export default {
  mixins: [mixin],
  components: {
    HeaderTitle,
    LoginForm,
  },
  data() {
    return {
      form: {
        Question_describe: null,
      },
    };
  },
  created() {},
  methods: {
    async submitHandle() {
      let data = this.$qs.stringify(this.form);
      const res = await this.$http.post(`webuser/quest`, data);
      if (res.data.status == 0) {
        this.$message({
          type: "success",
          message: res.data.message,
          duration: 1500,
        });
        this.form.Question_describe = "";
      } else {
        this.$message({
          type: "error",
          message: res.data.message,
          duration: 1500,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.el-header {
  background-color: #222222;
  color: #333;
  text-align: center;
  line-height: 120px;
}

.el-main {
  background-color: #f6f6f6;
  color: #333;
  text-align: center;
  line-height: 160px;
}
.content {
  position: relative;
  .title {
    position: absolute;
    font-size: 1.5rem;
    left: 30%;
  }
  .img {
    position: absolute;
    left: 30%;
    top: 5vh;
  }
  .form {
    box-shadow: 0px 2px 18px 2px #c0c0c0;
    background-color: #fff;
    padding-top: 5vh;
    position: absolute;
    width: 40%;
    left: 30%;
    top: 20vh;
  }
}
</style>