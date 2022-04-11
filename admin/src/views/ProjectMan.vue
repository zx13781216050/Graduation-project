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
            prop="Project_id"
            label="ID"
            align="center"
            :show-overflow-tooltip="true"
            :formatter="(r, c, v) => v || '-'"
            min-width="100"
          />
          <el-table-column
            prop="Project_name"
            label="方案名称"
            align="center"
            :show-overflow-tooltip="true"
            :formatter="(r, c, v) => v || '-'"
            min-width="140"
          />

          <el-table-column
            prop="Project_describe"
            label="方案描述"
            align="center"
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
                @click.stop="deleteHandle(scope.row.Project_id)"
                >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
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
            <el-form-item label="方案名称:">
              <el-input v-model="form.Project_name" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="对应阶段:">
              <el-select v-model="form.Stage_id" placeholder="请选择" clearable>
                <el-option
                  v-for="item in educateOptions"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="方案描述:">
              <el-input v-model="form.Project_describe" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="方案内容:">
              <el-input type="textarea" v-model="form.Project_content" />
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
            <el-form-item label="方案名称:">
              <el-input v-model="form.Project_name" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="对应阶段:">
              <el-select v-model="form.Stage_id" placeholder="请选择" clearable>
                <el-option
                  v-for="item in educateOptions"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="方案描述:">
              <el-input v-model="form.Project_describe" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="方案内容:">
              <el-input type="textarea" v-model="form.Project_content" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="submitHandle"
          size="mini"
          v-if="form.Project_id"
        >
          修改</el-button
        >
        <el-button
          type="primary"
          @click="submitHandle"
          size="mini"
          v-if="!form.Project_id"
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
      entityName: "Project",
      list: "",
      form: {
        Project_id: null,
        Project_name: null,
        Project_describe: null,
        Project_content: null,
        Stage_id: null,
      },
      formDialog: false,
      editFormDialog: false,
      educateOptions: [
        { id: 1, value: "小学" },
        { id: 2, value: "中学" },
        { id: 3, value: "高中" },
        { id: 4, value: "本科" },
        { id: 5, value: "硕士" },
      ],
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
  watch: {},
  methods: {},
};
</script>

<style>
</style>