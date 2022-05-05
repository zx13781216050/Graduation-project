<template>
  <el-container style="height: 100vh">
    <el-header style="height: 100px"><header-title /></el-header>
    <el-main style="padding: 0">
      <div class="content">
        <el-card :body-style="{ padding: '0px' }">
          <div style="padding: 14px">
            <h1 class="News_title">{{ form.News_title }}</h1>
            <div class="News_author">{{ form.News_author }}</div>
            <div class="News_time">{{ form.News_time }}</div>
            <div class="News_content" v-html="form.News_content"></div>
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
        News_id: null,
        News_title: null,
        News_content: null,
        News_author: null,
        News_time: null,
      },
    };
  },
  created() {
    this.getDetail();
  },
  methods: {
    async getDetail() {
      const res = await this.$http.get(`webnews/get_detail`, {
        params: { News_id: this.$route.query.News_id },
      });
      if (res.data.status == 0) {
        this.form = res.data.data;
        this.form.News_time = this.formatTime2(this.form.News_time);
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
}
.content {
  position: relative;
  width: 60%;
  top: 10%;
  left: 20%;
  .News_title {
    height: 20px;
    line-height: 20px;
  }
  .News_author {
    height: 20px;
    line-height: 20px;
  }
  .News_time {
    font-size: 13px;
    color: #999;
    height: 20px;
    line-height: 20px;
  }
  .News_content {
    line-height: 40px;
  }
}
</style>