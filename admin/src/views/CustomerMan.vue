<template>
  <div>
    <el-form size="mini" :inline="true">
      <el-form-item label="客户ID" prop="id">
        <el-input
          v-model="listQuery.search.id"
          placeholder="客户ID"
          clearable
          @keyup.enter.native="handleFilter"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="handleFilter"
          >搜索</el-button
        >
        <el-button icon="el-icon-refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
      <el-row :gutter="10" class="mb8">
        <el-col :span="1.5">
          <el-button
            type="primary"
            icon="el-icon-plus"
            size="mini"
            @click="addHandle"
            >新增</el-button
          >
        </el-col>
      </el-row>
    </el-form>
    <el-row :gutter="10" type="flex">
      <el-col :span="24">
        <el-table
          :data="list"
          size="small"
          height="calc(100vh - 250px)"
          :row-style="{ height: 'calc(10vh - 30px)' }"
        >
          <el-table-column
            prop="Customer_id"
            label="客户ID"
            align="center"
            :show-overflow-tooltip="true"
            :formatter="(r, c, v) => v || '-'"
            min-width="100"
          />
          <el-table-column
            prop="Customer_name"
            label="姓名"
            align="center"
            :show-overflow-tooltip="true"
            :formatter="(r, c, v) => v || '-'"
            min-width="140"
          />

          <el-table-column
            label="性别"
            align="center"
            :show-overflow-tooltip="true"
            min-width="100"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.Customer_sex == 1">男</span>
              <span v-else>女</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="Customer_birthday"
            label="出生日期"
            align="center"
            :show-overflow-tooltip="true"
            :formatter="formatBirthdayTime"
            min-width="130"
          />
          <el-table-column
            prop="Telephone"
            label="联系方式"
            align="center"
            :show-overflow-tooltip="true"
            min-width="130"
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
                @click.stop="detailsHandle(scope.row)"
                >详情
              </el-button>
              <el-button
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click.stop="editHandle(scope.row)"
                >编辑
              </el-button>
              <el-button
                size="mini"
                type="text"
                icon="el-icon-delete"
                @click.stop="deleteHandle(scope.row.Customer_id)"
                >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="float: right"
          :total="total"
          :page="listQuery.page"
          :limit="listQuery.size"
          @current-change="getList"
        />
      </el-col>
    </el-row>
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
          <el-col>
            <upload />
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="formDialog = false" size="mini">
          关闭</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      :title="form.Customer_id ? '编辑' : '新建'"
      width="800px"
      :visible.sync="editFormDialog"
    >
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
              <el-button @click="download">下载</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="submitHandle"
          size="mini"
          v-if="form.Customer_id"
        >
          修改</el-button
        >
        <el-button
          type="primary"
          @click="submitHandle"
          size="mini"
          v-if="!form.Customer_id"
        >
          保存</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mixin } from "@/mixin/mixin";
import Upload from "@/components/upload";

export default {
  mixins: [mixin],
  components: {
    Upload,
  },
  data() {
    return {
      entityName: "customer",
      list: [],
      formDialog: false,
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
      Nation_id: "",
      filename: "",
      listQuery: {
        search: {
          id: null,
        },
      },
    };
  },
  created() {
    this.getList();
    this.getAreaList();
    this.getInstitutList();
    this.getSpecialtyList();
  },
  watch: {},
  methods: {
    //获取文件数据
    getFile(event) {
      this.filename = event.target.files[0].name;
      this.form.Customer_file = event.target.files[0];
    },
    //编辑列表
    editHandle(row) {
      this.editFormDialog = true;
      Object.keys(this.form).forEach((key) => {
        this.form[key] = row[key];
      });
      console.log(this.form.Customer_file);
      this.filename = this.form.Customer_file;
    },
    //新增列表
    addHandle() {
      this.resetForm();
      this.filename = "";
      this.editFormDialog = true;
    },
    download() {
      console.log(typeof this.form.Customer_file);
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
      let formFile = new FormData();
      formFile.append("Customer_id", this.form.Customer_id);
      formFile.append("Customer_name", this.form.Customer_name);
      formFile.append("Customer_sex", this.form.Customer_sex);
      formFile.append("Customer_birthday", this.form.Customer_birthday);
      formFile.append("Customer_stage", this.form.Customer_stage);
      formFile.append("Target_institut", this.form.Target_institut);
      formFile.append("Target_area", this.form.Target_area);
      formFile.append("Target_specialty", this.form.Target_specialty);
      formFile.append("Telephone", this.form.Telephone);
      formFile.append("Education", this.form.Education);
      formFile.append("Customer_file", this.form.Customer_file);
      //this.form.Customer_file = formFile;
      console.log(this.form);
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
      this.getList();
    },
    //获取区域列表
    async getAreaList() {
      if (!this.areaOptions.length) {
        const res = await this.$http.get(`nation/get_list`);
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
          `institut/get_list/${this.form.Target_area}/${this.form.Customer_stage}`
        );
      } else {
        res = await this.$http.get(`institut/get_list`);
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
          `specialty/get_list/${this.form.Target_institut}`
        );
      } else {
        res = await this.$http.get(`specialty/get_list`);
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
.el-button--primary {
  .el-input__inner {
    margin-left: 10px;
  }
}
</style>