<template>
  <el-container style="height: 100vh">
    <el-header style="height: 100px"><header-title /></el-header>
    <el-main style="padding: 0">
      <div class="content">
        <div class="title">个人资料</div>
        <div class="img"><img src="../assets/l-x.png" alt="" /></div>
        <div class="form">
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
              <el-col :span="12">
                <el-form-item label="姓名:">
                  <el-input v-model="form.Customer_name" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="性别:">
                  <el-select
                    v-model="form.Customer_sex"
                    placeholder="请选择"
                    clearable
                  >
                    <el-option
                      v-for="item in sexOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="出生时间:">
                  <el-date-picker
                    v-model="form.Customer_birthday"
                    type="datetime"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="留学阶段:">
                  <el-select
                    v-model="form.Customer_stage"
                    placeholder="请选择"
                    @change="areaChange"
                    clearable
                  >
                    <el-option
                      v-for="item in stageOptions"
                      :key="item.id"
                      :label="item.value"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12" style="">
                <el-form-item label="目标区域:">
                  <el-select
                    v-model="form.Target_area"
                    placeholder="请选择"
                    @visible-change="getAreaList"
                    @change="areaChange"
                    clearable
                  >
                    <el-option
                      v-for="item in areaOptions"
                      :key="item.Nation_id"
                      :label="item.Nation_name"
                      :value="item.Nation_id"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="">
                <el-form-item label="目标学院:">
                  <el-select
                    v-model="form.Target_institut"
                    placeholder="请选择"
                    @visible-change="getInstitutList"
                    :no-data-text="
                      form.Target_area ? '无学院' : '请先选择目标区域'
                    "
                    clearable
                  >
                    <el-option
                      v-for="item in institutOptions"
                      :key="item.Institut_id"
                      :label="item.Institut_name"
                      :value="item.Institut_id"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12" style="" v-show="form.Customer_stage == 4">
                <el-form-item label="目标专业:">
                  <el-select
                    v-model="form.Target_specialty"
                    placeholder="请选择"
                    @visible-change="getSpecialtyList"
                    :no-data-text="
                      form.Target_area ? '无专业' : '请先选择目标学院'
                    "
                    clearable
                  >
                    <el-option
                      v-for="item in specialtyOptions"
                      :key="item.Specialty_id"
                      :label="item.Specialty_name"
                      :value="item.Specialty_id"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="">
                <el-form-item label="当前学历:">
                  <el-select
                    v-model="form.Education"
                    placeholder="请选择"
                    clearable
                  >
                    <el-option
                      v-for="item in educateOptions"
                      :key="item.id"
                      :label="item.value"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="">
                <el-form-item label="联系方式:">
                  <el-input v-model="form.Telephone"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24" style="">
                <el-form-item label="已报名方案:">
                  <el-select
                    v-model="form.Project_id"
                    placeholder="无"
                    style="width: 600px"
                    clearable
                  >
                    <el-option
                      v-for="item in projectOptions"
                      :key="item.Project_id"
                      :label="item.Project_name"
                      :value="item.Project_id"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="24" style="">
                <el-form-item label="已报名课程:">
                  <el-select
                    v-model="form.Train_id"
                    multiple
                    placeholder="无"
                    style="width: 600px"
                    clearable
                  >
                    <el-option
                      v-for="item in trainOptions"
                      :key="item.Train_id"
                      :label="item.Train_name"
                      :value="item.Train_id"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="editHandle" size="mini">
              修改</el-button
            >
          </span>
        </div>
      </div>
    </el-main>
    <el-dialog title="编辑" width="800px" :visible.sync="editFormDialog">
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
            <el-form-item label="姓名:">
              <el-input v-model="form.Customer_name" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别:">
              <el-select
                v-model="form.Customer_sex"
                placeholder="请选择"
                clearable
              >
                <el-option
                  v-for="item in sexOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="出生时间:">
              <el-date-picker
                v-model="form.Customer_birthday"
                type="datetime"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="留学阶段:">
              <el-select
                v-model="form.Customer_stage"
                placeholder="请选择"
                @change="areaChange"
                clearable
              >
                <el-option
                  v-for="item in stageOptions"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12" style="">
            <el-form-item label="目标区域:">
              <el-select
                v-model="form.Target_area"
                placeholder="请选择"
                @visible-change="getAreaList"
                @change="areaChange"
                clearable
              >
                <el-option
                  v-for="item in areaOptions"
                  :key="item.Nation_id"
                  :label="item.Nation_name"
                  :value="item.Nation_id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" style="">
            <el-form-item label="目标学院:">
              <el-select
                v-model="form.Target_institut"
                placeholder="请选择"
                @visible-change="getInstitutList"
                :no-data-text="form.Target_area ? '无学院' : '请先选择目标区域'"
                clearable
              >
                <el-option
                  v-for="item in institutOptions"
                  :key="item.Institut_id"
                  :label="item.Institut_name"
                  :value="item.Institut_id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12" style="" v-show="form.Customer_stage == 4">
            <el-form-item label="目标专业:">
              <el-select
                v-model="form.Target_specialty"
                placeholder="请选择"
                @visible-change="getSpecialtyList"
                :no-data-text="form.Target_area ? '无专业' : '请先选择目标学院'"
                clearable
              >
                <el-option
                  v-for="item in specialtyOptions"
                  :key="item.Specialty_id"
                  :label="item.Specialty_name"
                  :value="item.Specialty_id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" style="">
            <el-form-item label="当前学历:">
              <el-select
                v-model="form.Education"
                placeholder="请选择"
                clearable
              >
                <el-option
                  v-for="item in educateOptions"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" style="">
            <el-form-item label="联系方式:">
              <el-input v-model="form.Telephone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="个人资料:">
              <el-button
                @click="$refs.fileInput.click()"
                size="mini"
                style="display: inline"
              >
                <input
                  type="file"
                  ref="fileInput"
                  accept="*"
                  @change="getFile"
                  style="display: none; margin-right: 10px"
                />
                上传
              </el-button>
              <el-input :value="filename"></el-input>
              <el-button @click="download" v-show="filename">下载</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitHandle" size="mini">
          保存</el-button
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
      entityName: "webperson",
      editFormDialog: false,
      form: {
        Customer_id: null,
        Customer_name: null,
        Customer_sex: null,
        Customer_birthday: null,
        Customer_stage: null,
        Target_area: null,
        Target_institut: null,
        Target_specialty: null,
        Telephone: null,
        Education: null,
        Customer_file: null,
        Project_id: null,
        Train_id: null,
      },
      stageOptions: [
        { id: 1, value: "小学" },
        { id: 2, value: "中学" },
        { id: 3, value: "高中" },
        { id: 4, value: "大学" },
      ],
      educateOptions: [
        { id: 1, value: "小学" },
        { id: 2, value: "中学" },
        { id: 3, value: "高中" },
        { id: 4, value: "本科" },
        { id: 5, value: "硕士" },
      ],
      areaOptions: [],
      institutOptions: [],
      sexOptions: [
        { value: 1, label: "男" },
        { value: 2, label: "女" },
      ],
      specialtyOptions: [],
      projectOptions: [],
      trainOptions: [],
      filename: "",
    };
  },
  created() {
    this.getDetail();
    this.getAreaList();
    this.getInstitutList();
    this.getSpecialtyList();
    this.getProjectList();
    this.getTrainList();
  },
  methods: {
    //获取文件数据
    getFile(event) {
      this.filename = event.target.files[0].name;
      this.form.Customer_file = event.target.files[0];
      console.log(this.form.Customer_file);
    },
    //编辑列表
    editHandle() {
      this.editFormDialog = true;
      this.filename = this.form.Customer_file;
    },
    download() {
      if (
        this.form.Customer_file &&
        typeof this.form.Customer_file !== "object"
      ) {
        this.$http({
          method: "post",
          url: `/download/${this.form.Customer_file}`,
          headers: {},
          responseType: "blob", // <= 重点 不写，下载下来的文件会是一个损坏的文件
        }).then((res) => {
          const blob = new Blob([res.data]);
          const fileName = this.form.Customer_file;
          const dlink = document.createElement("a");
          if ("download" in document.createElement("a")) {
            // 非IE下载
            const dlink = document.createElement("a");
            dlink.download = fileName;
            dlink.style.display = "none";
            dlink.href = URL.createObjectURL(blob);
            document.body.appendChild(dlink);
            dlink.click();
            URL.revokeObjectURL(dlink.href); // 释放URL 对象
            document.body.removeChild(dlink);
          } else {
            // IE10+下载
            navigator.msSaveBlob(blob, fileName);
          }
        });
      } else {
        this.$message({
          type: "error",
          message: "无文件",
          duration: 1500,
        });
      }
    },
    //格式化出生日期
    formatBirthdayTime(row) {
      if (!row.Customer_birthday) {
        return "-";
      } else {
        var datetime = row.Customer_birthday;
        return this.formatTime(datetime);
      }
    },
    //提交表单
    async submitHandle() {
      this.form.Customer_birthday = this.formatTime(
        this.form.Customer_birthday
      );
      this.form.User_id = localStorage.User_id;
      let formFile = new FormData();
      formFile.append("Customer_id", this.form.Customer_id);
      formFile.append("Customer_name", this.form.Customer_name);
      formFile.append("Customer_sex", this.form.Customer_sex);
      formFile.append("Customer_birthday", this.form.Customer_birthday);
      formFile.append("Customer_stage", this.form.Customer_stage);
      formFile.append("Target_institut", this.form.Target_institut);
      formFile.append("Target_area", this.form.Target_area);
      formFile.append("Target_specialty", this.form.Target_specialty);
      formFile.append("Project_id", this.form.Project_id);
      formFile.append("Train_id", this.form.Train_id);
      formFile.append("User_id", this.form.User_id);
      formFile.append("Telephone", this.form.Telephone);
      formFile.append("Education", this.form.Education);
      formFile.append("Customer_file", this.form.Customer_file);
      //this.form.Customer_file = formFile;
      console.log(this.form.Customer_file);
      //let data = this.$qs.stringify(this.form);
      const res = await this.$http.patch(
        `${this.entityName}/edit_form`,
        formFile,
        { headers: { "Content-Type": "multipart/form-data;charse=UTF-8" } }
      );

      if (res.data.status == 0) {
        this.editFormDialog = false;
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
      this.getDetail();
    },
    async getDetail() {
      let data = this.$qs.stringify({ username: localStorage.webusername });
      const res = await this.$http.post(`${this.entityName}/get_detail`, data);
      if (res.data.status == 0) {
        this.form = res.data.data;
        if (this.form.Train_id) {
          this.form.Train_id = this.form.Train_id.split(",");
          //转为数字
          this.form.Train_id = this.form.Train_id.map(function (
            val,
            index,
            arr
          ) {
            return val - 0;
          });
        }
      }
    },

    //获取区域列表
    async getAreaList() {
      if (!this.areaOptions.length) {
        const res = await this.$http.get(`webnation/get_list`);
        if (res.data.status == 0) {
          this.areaOptions = res.data.data;
          console.log(this.areaOptions);
        } else {
          this.$message({
            type: "error",
            message: "获取地区数据失败",
            duration: 1500,
          });
        }
      }
    },
    areaChange() {
      this.form.Target_institut = "";
      this.form.Target_specialty = "";
      this.getInstitutList();
    },
    //获取学院列表
    async getInstitutList() {
      let res;
      if (this.form.Target_area && this.form.Customer_stage) {
        res = await this.$http.get(
          `webinstitut/get_list/${this.form.Target_area}/${this.form.Customer_stage}`
        );
      } else {
        res = await this.$http.get(`webinstitut/get_list`);
      }

      if (res.data.status == 0) {
        this.institutOptions = res.data.data;
        console.log(this.areaOptions);
      } else {
        this.$message({
          type: "error",
          message: "获取学院数据失败",
          duration: 1500,
        });
      }
    },
    //获取专业列表
    async getSpecialtyList() {
      let res;
      if (this.form.Target_area && this.form.Customer_stage) {
        res = await this.$http.get(
          `webspecialty/get_list/${this.form.Target_institut}`
        );
      } else {
        res = await this.$http.get(`webspecialty/get_list`);
      }

      if (res.data.status == 0) {
        this.specialtyOptions = res.data.data;
        console.log(this.areaOptions);
      } else {
        this.$message({
          type: "error",
          message: "获取专业数据失败",
          duration: 1500,
        });
      }
    },
    //获取方案列表
    async getProjectList() {
      let res = await this.$http.get(`webproject/get_list`);
      if (res.data.status == 0) {
        this.projectOptions = res.data.data;
      } else {
        this.$message({
          type: "error",
          message: "获取方案数据失败",
          duration: 1500,
        });
      }
    },
    //获取课程列表
    async getTrainList() {
      let res = await this.$http.get(`webtrain/get_list`);
      if (res.data.status == 0) {
        this.trainOptions = res.data.data;
        console.log(this.trainOptions);
      } else {
        this.$message({
          type: "error",
          message: "获取方案数据失败",
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