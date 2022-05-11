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
      <el-form-item label="客户姓名" prop="name">
        <el-input
          v-model="listQuery.search.name"
          placeholder="客户姓名"
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
            label="客户姓名"
            align="center"
            :show-overflow-tooltip="true"
            :formatter="(r, c, v) => v || '-'"
            min-width="100"
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
                icon="el-icon-edit"
                @click.stop="editHandle(scope.row)"
                >查看志愿
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
    <el-dialog title="客户志愿" width="800px" :visible.sync="editFormDialog">
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-position="left"
        label-width="120px"
        style="padding: 0 20px"
        size="mini"
        :disabled="true"
      >
        <el-form-item label="姓名:">
          <el-input v-model="form.Customer_name" />
        </el-form-item>
      </el-form>
      <el-form
        v-for="(item, index) in form.choiceList"
        :ref="`form${index}`"
        :key="index"
        :model="item"
      >
        <el-row
          ><h3>第{{ item.Choice_type }}志愿</h3></el-row
        >
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="目标区域:">
              <el-select
                v-model="item.Nation_id"
                placeholder="请选择"
                :disabled="true"
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
                v-model="item.Institut_id"
                placeholder="请选择"
                :no-data-text="form.Target_area ? '无学院' : '请先选择目标区域'"
                :disabled="true"
                clearable
              >
                <el-option
                  v-for="data in institutOptions"
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
                v-model="item.Specialty_id"
                placeholder="请选择"
                :no-data-text="form.Target_area ? '无专业' : '请先选择目标学院'"
                :disabled="true"
              >
                <el-option
                  v-for="data in specialtyOptions"
                  :key="data.Specialty_id"
                  :label="data.Specialty_name"
                  :value="data.Specialty_id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <el-button type="primary" @click="editChoice(item)" size="mini"
                >修改</el-button
              >
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
    <el-dialog title="志愿修改" width="600px" :visible.sync="editChoiceDialog">
      <el-form
        ref="choiceForm"
        :model="choiceForm"
        :rules="rules"
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
                @change="areaChange(choiceForm)"
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
                @change="institutChange(choiceForm)"
                :no-data-text="
                  choiceForm.Nation_id ? '无学院' : '请先选择目标区域'
                "
                clearable
              >
                <el-option
                  v-for="data in institutOptions"
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
                  v-for="data in specialtyOptions"
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
      editFormDialog: false,
      editChoiceDialog: false,
      form: {
        Customer_id: null,
        Customer_name: null,
        choiceList: [
          {
            Customer_id: null,
            Nation_id: null,
            Institut_id: null,
            Specialty_id: null,
            Choice_type: null,
          },
        ],
      },
      choiceForm: {
        Customer_id: null,
        Nation_id: null,
        Institut_id: null,
        Specialty_id: null,
        Choice_type: null,
      },
      areaOptions: [],
      institutOptions: [],
      specialtyOptions: [],
      Nation_id: "",
      listQuery: {
        search: {
          id: null,
        },
      },
      rules: {},
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
    editChoice(row) {
      this.choiceForm = row;
      this.editChoiceDialog = true;
    },
    saveChoice(e) {
      this.form.choiceList[e.Choice_type - 1] = e;
      this.editChoiceDialog = false;
    },
    async createForm() {
      let data = this.$qs.stringify(this.form, {
        arrayFormat: "repeat",
      });
      const res = await this.$http.post(`${this.entityName}/edit_choice`, data);
      if (res.data.status == 0) {
        this.$notify({
          title: "提示",
          type: "success",
          message: res.data.message,
        });
        this.editFormDialog = false;
      } else {
        this.$notify.error({
          title: "提示",
          message: res.data.message,
          duration: 1500,
        });
      }
      this.getList();
    },
    async getList() {
      const res = await this.$http.get(`${this.entityName}/choice`);
      if (res.data.status == 0) {
        this.list = res.data.data;
        this.$message({
          type: "success",
          message: res.data.message,
        });
      } else {
        this.$message({
          type: "error",
          message: res.data.message,
          duration: 1500,
        });
      }
    },
    //编辑列表
    async editHandle(row) {
      const res = await this.$http.get(`${this.entityName}/get_choice`, {
        params: { id: row.Customer_id },
      });
      if (res.data.status == 0) {
        this.$message({
          type: "success",
          message: res.data.message,
        });
        this.form = row;
        this.form.choiceList = res.data.data;
        this.editFormDialog = true;
      } else {
        this.$message({
          type: "error",
          message: res.data.message,
          duration: 1500,
        });
      }
    },
    //获取区域列表
    async getAreaList() {
      if (!this.areaOptions.length) {
        const res = await this.$http.get(`nation/get_list`);
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
    areaChange(choiceForm) {
      this.form.choiceList[choiceForm.Choice_type - 1].Institut_id = "";
      this.form.choiceList[choiceForm.Choice_type - 1].Specialty_id = "";
      this.getInstitutList();
    },
    institutChange(choiceForm) {
      this.form.choiceList[choiceForm.Choice_type - 1].Specialty_id = "";
      this.getSpecialtyList();
    },
    //获取学院列表
    async getInstitutList() {
      let res;
      if (this.choiceForm.Nation_id) {
        res = await this.$http.get(
          `institut/get_list/${this.choiceForm.Nation_id}`
        );
      } else {
        res = await this.$http.get(`institut/get_list`);
      }
      if (res.data.status == 0) {
        this.institutOptions = res.data.data;
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
      if (this.choiceForm.Nation_id) {
        res = await this.$http.get(
          `specialty/get_list/${this.choiceForm.Institut_id}`
        );
      } else {
        res = await this.$http.get(`specialty/get_list`);
      }

      if (res.data.status == 0) {
        this.specialtyOptions = res.data.data;
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