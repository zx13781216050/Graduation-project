<template>
  <el-container style="height: 100vh">
    <el-header style="height: 100px"><header-title /></el-header>
    <el-main style="padding: 0">
      <div class="content">
        <div class="title">提出问题</div>
        <div class="img"><img src="../assets/l-x.png" alt="" /></div>
        <div class="form">
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="FormaddHandle" size="mini">
              提出问题</el-button
            >
          </span>
          <div>问题反馈</div>
          <div>
            <el-table
              :data="list"
              size="small"
              height="calc(100vh - 250px)"
              :row-style="{ height: 'calc(10vh - 30px)' }"
            >
              <el-table-column
                prop="Question_describe"
                label="问题描述"
                align="center"
                :show-overflow-tooltip="true"
                min-width="260"
              />
              <el-table-column
                label="状态"
                align="center"
                :show-overflow-tooltip="true"
                min-width="100"
              >
                <template slot-scope="scope">
                  <span v-if="scope.row.Question_status == 0">未反馈</span>
                  <span v-else>已反馈</span>
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                align="center"
                class-name="small-padding fixed-width"
                width="300px"
                fixed="right"
              >
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="text"
                    icon="el-icon-document"
                    @click.stop="detailsHandle(scope.row)"
                    >详情
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </el-main>
    <el-dialog title="提出问题" width="800px" :visible.sync="editFormDialog">
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
            <el-form-item label="问题描述:">
              <el-input type="textarea" v-model="form.Question_describe" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitHandle" size="mini">
          提交</el-button
        >
      </span>
    </el-dialog>
    <el-dialog title="详情" width="800px" :visible.sync="formDialog">
      <el-form
        ref="form"
        :model="form"
        label-position="left"
        label-width="120px"
        style="padding: 0 20px"
        size="mini"
        :disabled="true"
      >
        <el-row :gutter="10">
          <el-col :span="24">
            <el-form-item label="问题描述:">
              <el-input type="textarea" v-model="form.Question_describe" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态:">
              <el-select
                v-model="form.Question_status"
                placeholder="请选择"
                clearable
              >
                <el-option
                  v-for="item in statusOptions"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="问题反馈:">
              <el-input type="textarea" v-model="form.Feedback" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="formDialog = false" size="mini">
          关闭</el-button
        >
      </span>
    </el-dialog>
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
      entityName: "webuser",
      list: [],
      formDialog: false,
      form: {
        Question_id: null,
        Question_status: null,
        Question_describe: null,
        Feedback: null,
        User_id: null,
      },
      editFormDialog: false,
      statusOptions: [
        { id: 0, value: "未反馈" },
        { id: 1, value: "已反馈" },
      ],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      const res = await this.$http.get(`${this.entityName}/get_list`, {
        params: { User_id: localStorage.User_id },
      });
      if (res.data.status == 0) {
        this.list = res.data.data;
        // this.$message({
        //     type: "success",
        //     message: "获取数据成功",
        // });
      } else {
        this.$message({
          type: "error",
          message: "获取数据失败",
          duration: 1500,
        });
      }
    },
    FormaddHandle() {
      if (localStorage.User_id) {
        this.addHandle();
      } else {
        this.$message({
          type: "error",
          message: "请先登录",
          duration: 1500,
        });
      }
    },
    async submitHandle() {
      this.form.User_id = localStorage.User_id;
      let data = this.$qs.stringify(this.form);
      const res = await this.$http.post(`${this.entityName}/quest`, data);
      if (res.data.status == 0) {
        this.$message({
          type: "success",
          message: res.data.message,
          duration: 1500,
        });
        this.form.Question_describe = "";
        this.editFormDialog = false;
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