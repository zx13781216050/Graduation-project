<template>
  <el-dialog title="详情" width="800px" :visible.sync="showDialog">
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
          <el-form-item label="当前学历:">
            <el-select v-model="form.Education" placeholder="请选择" clearable>
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
      <el-button type="primary" @click="onSubmit" size="mini"> 提交</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      entityName: "webperson",
      showDialog: false,
      form: {
        Customer_id: null,
        Customer_name: null,
        Customer_sex: null,
        Customer_birthday: null,
        Customer_stage: null,
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
    this.getAreaList();
    this.getInstitutList();
    this.getSpecialtyList();
  },
  mounted() {
    this.$eventBus.$on("dialog", (showDialog) => {
      this.showDialog = showDialog;
      console.log(showDialog);
    });
  },
  methods: {
    async onSubmit() {
      let data = this.$qs.stringify(this.form);
      const res = await this.$http.put(`${this.entityName}/edit_form`, data);

      if (res.data.status == 0) {
        this.showDialog = false;
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

<style>
</style>