<template>
  <el-container style="height: 100vh">
    <el-header style="height: 100px"><header-title /></el-header>
    <el-main style="padding: 0">
      <div class="content">
        <div class="content">
          <div class="title">课程选择</div>
          <div class="img"><img src="../assets/l-x.png" alt="" /></div>
          <div class="Train">
            <ul v-for="data in list" :key="data.Train_id">
              <li>
                <div class="Train_name" style="width: 300px">
                  {{ data.Train_name }}
                </div>
                <div class="dbutton">
                  <el-button
                    class="button"
                    type="primary"
                    plain
                    @click="signup(data.Train_id)"
                  >
                    报名
                  </el-button>
                  <el-button
                    class="button"
                    type="danger"
                    plain
                    @click="toprojectedetail(data.Train_id)"
                  >
                    详情
                  </el-button>
                </div>
              </li>
            </ul>
          </div>
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
      entityName: "webtrain",
      form: {
        Train_id: null,
        Train_name: null,
        Train_describe: null,
        Train_content: null,
      },
      list: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async signup(id) {
      let data = this.$qs.stringify({
        Train_id: id,
        User_id: localStorage.User_id,
      });
      const res = await this.$http.patch(`webtrain/sign_up`, data);
      if (res.data.status == 0) {
        this.$message({
          type: "success",
          message: "报名成功",
          duration: 1500,
        });
      } else if (res.data.status == 1) {
        this.$message({
          type: "error",
          message: "请先完善个人资料",
          duration: 1500,
        });
      } else if (res.data.status == 2) {
        this.$message({
          type: "error",
          message: "不能重复报名",
          duration: 1500,
        });
      } else {
        this.$message({
          type: "error",
          message: "报名失败",
          duration: 1500,
        });
      }
    },
    totraindetail(id) {
      this.$router.push({
        path: "/traindetail",
        query: {
          Train_id: id,
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
  .Train {
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
          position: absolute;
          margin-top: -55px;
        }
        .el-button + .el-button {
          margin-left: 100px;
        }
        .dbutton {
          margin-left: 300px;
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