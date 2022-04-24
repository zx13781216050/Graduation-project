<template>
  <el-container style="height: 100vh">
    <el-header style="height: 100px"><header-title /></el-header>
    <el-main style="padding: 0">
      <div class="content">
        <div class="content">
          <div class="title">课程选择</div>
          <div class="img"><img src="../assets/l-x.png" alt="" /></div>
          <div class="Project">
            <ul v-for="data in list" :key="data.Projecte_id">
              <li>
                <div class="Project_name" style="width: 300px">
                  {{ data.Project_name }}
                </div>
                <el-button
                  class="button"
                  type="danger"
                  plain
                  @click="toprojectedetail(data.Projecte_id)"
                >
                  详情
                </el-button>
              </li>
            </ul>
          </div>
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
      entityName: "webproject",
      form: {},
      list: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    toprojectedetail(id) {
      this.$router.push({
        path: "/projectdetail",
        query: {
          Projecte_id: id,
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
  .Project {
    position: absolute;
    left: 30%;
    top: 15vh;
    box-shadow: 0px 2px 18px 2px #c0c0c0;
    ul {
      list-style: none;
      li {
        line-height: 70px;
        width: 750px;
        padding-right: 30px;
        border-bottom: 1px #e0e0e0 solid;
        .button {
          float: right;
          margin-top: -55px;
        }
      }
      li:hover {
        // background-color: #e0e0e0;
        // border: 1px red solid;
        font-size: 1.2rem;
        color: red;
      }
    }
  }
}
</style>