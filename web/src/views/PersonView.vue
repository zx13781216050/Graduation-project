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
            </el-row>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button
              type="primary"
              @click="editFormDialog = true"
              size="mini"
            >
              修改</el-button
            >
          </span>
        </div>
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
            </el-row>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitHandle" size="mini">
              保存</el-button
            >
          </span>
        </el-dialog>
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
    };
  },
  created() {
    this.getDetail();
    this.getAreaList();
    this.getInstitutList();
    this.getSpecialtyList();
  },
  methods: {
    //格式化出生日期
    formatBirthdayTime(row) {
      if (!row.Customer_birthday) {
        return "-";
      } else {
        var datetime = row.Customer_birthday;
        return this.formatTime(datetime);
      }
    },
    async getDetail() {
      let data = this.$qs.stringify({ username: localStorage.username });
      const res = await this.$http.post(`${this.entityName}/get_detail`, data);
      this.form = res.data.data;
    },
    //提交表单
    async submitHandle() {
      this.form.Customer_birthday = this.formatTime(
        this.form.Customer_birthday
      );
      let data = this.$qs.stringify(this.form);
      const res = await this.$http.put(`${this.entityName}/edit_form`, data);

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
      this.getList();
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
  background-color: #ffffff;
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
    position: absolute;
    width: 40%;
    left: 30%;
    top: 20vh;
  }
}
</style>