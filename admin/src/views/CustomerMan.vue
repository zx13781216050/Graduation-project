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
          ref="table"
          @selection-change="(s) => (listSelection = s)"
          size="small"
          height="calc(100vh - 272px)"
          @row-click="
            (row) =>
              $refs.table.toggleRowSelection(row, !listSelection.includes(row))
          "
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
            prop="Customer_sex"
            label="性别"
            align="center"
            :show-overflow-tooltip="true"
            :formatter="(r, c, v) => v || '-'"
            min-width="100"
          />
          <el-table-column
            prop="Customer_birthday"
            label="出生日期"
            align="center"
            :show-overflow-tooltip="true"
            :formatter="formatBirthdayTime"
            min-width="130"
          />

          <el-table-column
            prop="Customer_stage"
            label="留学阶段"
            align="center"
            :show-overflow-tooltip="true"
            min-width="130"
          />
          <el-table-column
            prop="Target_area"
            label="目标地区"
            align="center"
            :show-overflow-tooltip="true"
            min-width="100"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.state">已回复</span>
              <span v-else>未回复</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="Target_institut"
            label="目标院校"
            align="center"
            :show-overflow-tooltip="true"
            min-width="130"
          />
          <el-table-column
            prop="Target_specialty"
            label="目标专业"
            align="center"
            :show-overflow-tooltip="true"
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
            prop="Education"
            label="当前学历"
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
                @click.stop="handleDelete(scope.row)"
                >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-dialog
      v-el-drag-dialog
      title="详情"
      width="800px"
      :visible.sync="formDialog"
    >
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
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="姓名:" prop="Customer_name">
              <el-input v-model="form.Customer_name" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别:" prop="Customer_sex">
              <el-input v-model="form.Customer_sex" />
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
          <el-col :span="12">
            <el-form-item label="留学阶段:" prop="Customer_stage">
              <el-input v-model="form.Customer_stage" />
            </el-form-item>
          </el-col>
          <el-col :span="12" style="">
            <el-form-item label="目标区域:" prop="Target_area">
              <el-input v-model="form.Target_area" />
            </el-form-item>
          </el-col>
          <el-col :span="12" style="">
            <el-form-item label="目标学院:" prop="Target_institut">
              <el-input v-model="form.Target_institut" />
            </el-form-item>
          </el-col>
          <el-col :span="12" style="">
            <el-form-item label="目标专业:" prop="Target_specialty">
              <el-input v-model="form.Target_specialty"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" style="">
            <el-form-item label="学历:" prop="Education">
              <el-input v-model="form.Education"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" style="">
            <el-form-item label="联系方式:" prop="Telephone">
              <el-input v-model="form.Telephone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          :loading="editSubmitting"
          @click="formDialog = false"
          size="mini"
        >
          关闭</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      v-el-drag-dialog
      :title="form.Customer_id ? '编辑' : '新建'"
      width="800px"
      :visible.sync="editFormDialog"
    >
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
            <el-form-item label="性别:" prop="Customer_sex">
              <el-input v-model="form.Customer_sex" />
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
          <el-col :span="12">
            <el-form-item label="留学阶段:" prop="Customer_stage">
              <el-input v-model="form.Customer_stage" />
            </el-form-item>
          </el-col>
          <el-col :span="12" style="">
            <el-form-item label="目标区域:" prop="Target_area">
              <el-input v-model="form.Target_area" />
            </el-form-item>
          </el-col>
          <el-col :span="12" style="">
            <el-form-item label="目标学院:" prop="Target_institut">
              <el-input v-model="form.Target_institut" />
            </el-form-item>
          </el-col>
          <el-col :span="12" style="">
            <el-form-item label="目标专业:" prop="Target_specialty">
              <el-input v-model="form.Target_specialty"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" style="">
            <el-form-item label="学历:" prop="Education">
              <el-input v-model="form.Education"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" style="">
            <el-form-item label="联系方式:" prop="Telephone">
              <el-input v-model="form.Telephone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          :loading="editSubmitting"
          @click="submitHandle"
          size="mini"
          v-if="form.Customer_id"
        >
          修改</el-button
        >
        <el-button
          type="primary"
          :loading="editSubmitting"
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

export default {
  mixins: [mixin],
  data() {
    return {
      entityName: "customer",
      list: "",
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
      },
      listQuery: {
        search: {
          id: null,
        },
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    formatBirthdayTime(row) {
      if (!row.Customer_birthday) {
        return "-";
      } else {
        var datetime = row.Customer_birthday;
        return this.formatTime(datetime);
      }
    },
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
  },
};
</script>

<style>
</style>