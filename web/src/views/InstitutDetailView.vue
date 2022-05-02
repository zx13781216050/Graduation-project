<template>
  <el-container style="height: 100vh">
    <el-header style="height: 100px"><header-title /></el-header>
    <el-main style="padding: 0">
      <div class="content">
        <el-card :body-style="{ padding: '0px' }">
          <div style="padding: 14px">
            <h1 class="Institut_name">{{ form.Institut_name }}</h1>
            <div class="Introduce" v-html="form.Introduce"></div>
          </div>
        </el-card>
      </div>
    </el-main>
    <login-form />
  </el-container>
</template>

<script>
import HeaderTitle from "../components/HeaderTitle.vue";
import LoginForm from "../components/Login.vue";
export default {
  components: {
    HeaderTitle,
    LoginForm,
  },

  data() {
    return {
      form: {
        Institut_id: null,
        Institut_name: null,
        Nation_id: null,
        Stage_id: null,
        Toefl: null,
        Sat: null,
        Ielts: null,
        Introduce: null,
      },
    };
  },
  created() {
    this.getDetail();
    this.getSpecialty();
  },
  methods: {
    async getDetail() {
      console.log(this.$route.query.Institut_id);
      const res = await this.$http.get(`webinstitut/get_detail`, {
        params: { Institut_id: this.$route.query.Institut_id },
      });
      if (res.data.status == 0) {
        this.form = res.data.data;
      } else {
        this.$message({
          type: "error",
          message: "获取数据失败",
          duration: 1500,
        });
      }
    },
    async getSpecialty() {},
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
  .el-card {
    width: 80%;
    margin: 100px auto;
  }
}
.Introduce {
  width: 80%;
  line-height: 40px;
  margin: 0 auto;
}
</style>