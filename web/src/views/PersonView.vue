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
                  <el-input v-model="form.Customer_name" style="width: 50%" />
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
                    style="width: 50%"
                    type="datetime"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>

              <el-col :span="12" style="">
                <el-form-item label="当前学历:">
                  <el-select
                    v-model="form.Education"
                    placeholder="无"
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
                  <el-input
                    v-model="form.Telephone"
                    style="width: 50%"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="">
                <el-form-item label="已报名方案:">
                  <el-select
                    v-model="form.Project_id"
                    placeholder="无"
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
                    style="width: 80%"
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
          <div style="line-height: 30px">
            <h1>个人志愿</h1>
          </div>
          <div>
            <el-table
              :data="choiceList"
              size="small"
              height="calc(100vh - 250px)"
              :row-style="{ height: 'calc(10vh - 30px)' }"
            >
              <el-table-column
                prop="Nation_id"
                label="国家"
                align="center"
                :formatter="areaFormatter"
                :show-overflow-tooltip="true"
                min-width="260"
              />
              <el-table-column
                prop="Institut_id"
                label="学院"
                align="center"
                :formatter="InstitutFormatter"
                :show-overflow-tooltip="true"
                min-width="260"
              />
              <el-table-column
                prop="Specialty_id"
                label="专业"
                align="center"
                :formatter="SpecialtyFormatter"
                :show-overflow-tooltip="true"
                min-width="260"
              />
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
                    @click.stop="lookChoice(scope.row)"
                    >查看志愿
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </el-main>
    <el-dialog title="编辑" width="800px" :visible.sync="editFormDialog">
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-position="left"
        label-width="120px"
        style="padding: 0 20px"
        size="mini"
      >
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="姓名:" prop="Customer_name">
              <el-input v-model="form.Customer_name" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别:" prop="Customer_name">
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
            <el-form-item label="出生时间:" prop="Customer_birthday">
              <el-date-picker
                v-model="form.Customer_birthday"
                type="datetime"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12" style="">
            <el-form-item label="当前学历:" prop="Education">
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
          <el-col :span="12">
            <el-form-item label="留学阶段:" prop="Customer_stage">
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
            <el-form-item label="联系方式:" prop="Telephone">
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
    <el-dialog
      title="志愿修改"
      width="600px"
      :visible.sync="editChoiceDialog"
      @close="closeDialog"
    >
      <el-form
        ref="choiceForm"
        :model="choiceForm"
        label-position="left"
        label-width="120px"
        style="padding: 0 20px"
        size="mini"
      >
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="目标区域:">
              <el-select
                v-model="choiceForm.Nation_id"
                placeholder="请选择"
                @visible-change="getAreaList"
                @change="areaChange()"
                clearable
              >
                <el-option
                  v-for="data in areaOptions"
                  :key="data.Nation_id"
                  :label="data.Nation_name"
                  :value="data.Nation_id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="目标学院:">
              <el-select
                v-model="choiceForm.Institut_id"
                placeholder="请选择"
                @visible-change="getInstitutList"
                @change="institutChange()"
                :no-data-text="
                  choiceForm.Nation_id ? '无学院' : '请先选择目标区域'
                "
                clearable
              >
                <el-option
                  v-for="data in institutOptions2"
                  :key="data.Institut_id"
                  :label="data.Institut_name"
                  :value="data.Institut_id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="目标专业:">
              <el-select
                v-model="choiceForm.Specialty_id"
                placeholder="请选择"
                @visible-change="getSpecialtyList"
                :no-data-text="
                  choiceForm.Institut_id ? '无专业' : '请先选择目标学院'
                "
                clearable
              >
                <el-option
                  v-for="data in specialtyOptions2"
                  :key="data.Specialty_id"
                  :label="data.Specialty_name"
                  :value="data.Specialty_id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12"
            ><el-form-item>
              <el-button
                type="primary"
                @click="saveChoice(choiceForm)"
                size="mini"
                >保存</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
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
      editChoiceDialog: false,
      form: {
        Customer_id: null,
        Customer_name: null,
        Customer_sex: null,
        Customer_birthday: null,
        Customer_stage: null,
        Telephone: null,
        Education: null,
        Customer_file: null,
        Project_id: null,
        Train_id: null,
      },
      choiceList: [
        {
          Customer_id: null,
          Nation_id: null,
          Institut_id: null,
          Specialty_id: null,
          Choice_type: null,
        },
      ],
      choiceForm: {
        Customer_id: null,
        Nation_id: null,
        Institut_id: null,
        Specialty_id: null,
        Choice_type: null,
      },
      stageOptions: [
        { id: 1, value: "小学" },
        { id: 2, value: "中学" },
        { id: 3, value: "高中" },
        { id: 4, value: "本科" },
        { id: 5, value: "研究生" },
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
      institutOptions2: [],
      sexOptions: [
        { value: 1, label: "男" },
        { value: 2, label: "女" },
      ],
      specialtyOptions: [],
      specialtyOptions2: [],
      projectOptions: [],
      trainOptions: [],
      filename: "",
      rules: {
        Customer_name: {
          required: true,
          message: "姓名不能为空",
          trigger: "blur",
        },
        Customer_sex: {
          required: true,
          message: "性别不能为空",
          trigger: "blur",
        },
        Customer_birthday: {
          required: true,
          message: "出生日期不能为空",
          trigger: "blur",
        },
        Customer_stage: {
          required: true,
          message: "留学阶段不能为空",
          trigger: "blur",
        },
        Education: {
          required: true,
          message: "当前学历不能为空",
          trigger: "blur",
        },
      },
    };
  },
  created() {
    this.getDetail();
    this.getChoiceList();
    this.getAreaList();
    this.getInstitutList();
    this.getSpecialtyList();
    this.getProjectList();
    this.getTrainList();
  },
  methods: {
    closeDialog() {
      this.choiceForm = "";
      this.getChoiceList();
      this.getInstitutList();
      this.getSpecialtyList();
    },
    lookChoice(row) {
      this.choiceForm = row;
      this.editChoiceDialog = true;
    },
    async saveChoice() {
      let data = this.$qs.stringify(this.choiceForm);
      const res = await this.$http.post(`webuser/edit_choice`, data);
      if (res.data.status == 0) {
        this.$notify({
          title: "提示",
          type: "success",
          message: res.data.message,
        });
        this.editChoiceDialog = false;
      } else {
        this.$notify.error({
          title: "提示",
          message: res.data.message,
          duration: 1500,
        });
      }
      this.getChoiceList();
      this.getInstitutList();
      this.getSpecialtyList();
    },
    //编辑列表
    async getChoiceList() {
      const res = await this.$http.get(`webuser/get_choice`, {
        params: { id: localStorage.User_id },
      });
      if (res.data.status == 0) {
        this.choiceList = res.data.data;
      } else {
        this.$message({
          type: "error",
          message: res.data.message,
          duration: 1500,
        });
      }
    },
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
    areaFormatter: function (row) {
      let newarr = this.areaOptions.filter((item) => {
        return item.Nation_id == row.Nation_id;
      });
      if (newarr[0]) {
        return newarr[0].Nation_name;
      }
    },
    InstitutFormatter: function (row) {
      let newarr = this.institutOptions.filter((item) => {
        return item.Institut_id == row.Institut_id;
      });
      if (newarr[0]) {
        return newarr[0].Institut_name;
      }
    },
    SpecialtyFormatter: function (row) {
      let newarr = this.specialtyOptions.filter((item) => {
        return item.Specialty_id == row.Specialty_id;
      });
      if (newarr[0]) {
        return newarr[0].Specialty_name;
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
      this.getChoiceList();
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
    //获取区域列表
    async getAreaList() {
      if (!this.areaOptions.length) {
        const res = await this.$http.get(`webnation/get_list`);
        if (res.data.status == 0) {
          this.areaOptions = res.data.data;
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
      this.choiceForm.Institut_id = "";
      this.choiceForm.Specialty_id = "";
      this.getInstitutList();
    },
    institutChange() {
      this.choiceForm.Specialty_id = "";
      this.getSpecialtyList();
    },
    //获取学院列表
    async getInstitutList() {
      let res;
      if (this.choiceForm.Nation_id) {
        res = await this.$http.get(
          `webinstitut/get_list/${this.choiceForm.Nation_id}`,
          { params: { Nation_id: this.choiceForm.Nation_id } }
        );
        if (res.data.status == 0) {
          this.institutOptions2 = res.data.data;
        } else {
          this.$message({
            type: "error",
            message: "获取学院数据失败",
            duration: 1500,
          });
        }
      } else {
        res = await this.$http.get(`webinstitut/get_list`);
        if (res.data.status == 0) {
          this.institutOptions = res.data.data;
          this.institutOptions2 = res.data.data;
        } else {
          this.$message({
            type: "error",
            message: "获取学院数据失败",
            duration: 1500,
          });
        }
      }
    },
    //获取专业列表
    async getSpecialtyList() {
      let res;
      if (this.choiceForm.Nation_id) {
        res = await this.$http.get(`webspecialty/get_list`, {
          params: { Institut_id: this.choiceForm.Institut_id },
        });
        if (res.data.status == 0) {
          this.specialtyOptions2 = res.data.data;
        } else {
          this.$message({
            type: "error",
            message: "获取专业数据失败",
            duration: 1500,
          });
        }
      } else {
        res = await this.$http.get(`webspecialty/get_list`);
        if (res.data.status == 0) {
          this.specialtyOptions = res.data.data;
          this.specialtyOptions2 = res.data.data;
        } else {
          this.$message({
            type: "error",
            message: "获取专业数据失败",
            duration: 1500,
          });
        }
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
    width: 60%;
    left: 20%;
    top: 20vh;
  }
}
</style>