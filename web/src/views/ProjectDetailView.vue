<template>
  <el-container style="height: 100vh">
    <el-header style="height: 100px"><header-title /></el-header>
    <el-main style="padding: 0">
      <div class="content">
        <el-card :body-style="{ padding: '0px' }">
          <div style="padding: 14px">
            <h1 class="Project_name">{{ form.Project_name }}</h1>
            <div class="Project_describe">
              <span style="font-weight: 600">课程简介：</span>
              {{ form.Project_describe }}
            </div>
            <div class="Project_content" v-html="form.Project_content"></div>
          </div>
        </el-card>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import HeaderTitle from "../components/HeaderTitle.vue";
export default {
  components: {
    HeaderTitle,
  },

  data() {
    return {
      form: {
        Project_id: null,
        Project_name: null,
        Project_describe: null,
        Project_content: null,
      },
    };
  },
  created() {
    this.getDetail();
  },
  methods: {
    async getDetail() {
      console.log(this.$route.query.Project_id);
      const res = await this.$http.get(`webproject/get_detail`, {
        params: { Project_id: this.$route.query.Project_id },
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
.Project_describe {
  width: 80%;
  line-height: 40px;
  margin: 0 auto;
  font-weight: 300;
}
.Project_content {
  width: 80%;
  line-height: 40px;
  margin: 0 auto;
}
</style>