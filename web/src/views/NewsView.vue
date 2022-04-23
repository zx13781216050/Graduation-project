<template>
  <el-container style="height: 100vh">
    <el-header style="height: 100px"><header-title /></el-header>
    <el-main style="padding: 0">
      <div class="content">
        <div class="title">新闻资讯</div>
        <div class="img"><img src="../assets/l-x.png" alt="" /></div>
        <div class="card">
          <el-row>
            <el-col
              :span="5"
              v-for="o in newsOption"
              :key="o"
              style="margin: 10px"
            >
              <el-card :body-style="{ padding: '0px' }">
                <img
                  src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                  class="image"
                />
                <div style="padding: 14px">
                  <div class="news_title">
                    {{ o.News_title }}
                  </div>

                  <div class="bottom clearfix">
                    <time class="time">{{ o.News_time }}</time>
                    <el-button
                      type="text"
                      class="button"
                      @click="tonewsdetail(o.News_id)"
                      >详情</el-button
                    >
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import HeaderTitle from "../components/HeaderTitle.vue";
import { mixin } from "@/mixin/mixin";

export default {
  mixins: [mixin],

  components: {
    HeaderTitle,
  },
  data() {
    return {
      entityName: "webnews",
      currentDate: new Date(),
      list: "",
      newsOption: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      const res = await this.$http.get(`webnews/get_list`);
      if (res.data.status == 0) {
        this.newsOption = res.data.data.map((element, i) => {
          element.News_time = this.formatTime(element.News_time);
          return element;
        });
        this.newsOption = this.newsOption.reverse();
        // this.$message({
        //   type: "success",
        //   message: "获取数据成功",
        // });
      } else {
        this.$message({
          type: "error",
          message: "获取数据失败",
          duration: 1500,
        });
      }
    },
    tonewsdetail(id) {
      this.$router.push({
        path: "/newsdetail",
        query: {
          News_id: id,
        },
      });
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
  .button {
    padding: 0;
    float: right;
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
  .card {
    position: absolute;
    width: 60%;
    left: 25%;
    top: 20vh;
    line-height: 20px;
    .news_title {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .time {
      font-size: 13px;
      color: #999;
    }

    .bottom {
      margin-top: 13px;
      line-height: 12px;
    }

    .image {
      width: 100%;
      display: block;
    }

    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }

    .clearfix:after {
      clear: both;
    }
  }
}
</style>