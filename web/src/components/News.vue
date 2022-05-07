<template>
  <div class="body">
    <div class="title">热门资讯</div>
    <div class="img">
      <img src="../assets/l-x.png" style="width: 1250px" alt="" />
    </div>
    <div class="content">
      <div class="leftul">
        <ul v-for="data in newsOption" :key="data.News_id">
          <li @click="toNewsDetail(data.News_id)">
            <a>
              <div>《&nbsp;</div>
              <div class="news_title" style="width: 300px">
                {{ data.News_title }}
              </div>
              <div>&nbsp;&nbsp;&nbsp;</div>
              <div>{{ data.News_time }}</div>
            </a>
          </li>
        </ul>
      </div>

      <div class="rightul">
        <ul v-for="data in newsOption" :key="data.News_id">
          <li>
            <a>
              <div>《&nbsp;</div>
              <div class="news_title" style="width: 300px">
                {{ data.News_title }}
              </div>
              <div>&nbsp;&nbsp;&nbsp;</div>
              <div>{{ data.News_time }}</div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mixin } from "@/mixin/mixin";

export default {
  mixins: [mixin],
  entityName: "webnews",
  data() {
    return {
      newsOption: [],
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    toNewsDetail(id) {
      this.$router.push({
        path: "/newsdetail",
        query: {
          News_id: id,
        },
      });
    },
    async getList() {
      const res = await this.$http.get(`webnews/get_list`);
      if (res.data.status == 0) {
        this.newsOption = res.data.data.map((element, i) => {
          element.News_time = this.formatTime(element.News_time);
          return element;
        });
        this.newsOption = this.newsOption.slice(0, 5).reverse();
        this.$message({
          type: "success",
          message: "获取数据成功",
        });
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
.body {
  position: relative;
}
.title {
  position: absolute;
  font-size: 1.5rem;
  left: 17%;
}
.img {
  position: absolute;
  left: 17%;
  top: 5vh;
}
.content {
  position: absolute;
  left: 23%;
  top: 15vh;
  .leftul {
    float: left;
    padding-right: 50px;
    border-right: 1px dashed #dd2830;
  }
  .rightul {
    float: right;
  }
  ul {
    li {
      list-style: none;
      height: 30px;
      line-height: 30px;
      div {
        display: inline-block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    li:hover {
      color: #d81e06;
    }
  }
}
</style>