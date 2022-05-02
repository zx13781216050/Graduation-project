<template>
  <div>
    <el-form size="mini" :inline="true">
      <el-form-item label="问题ID" prop="id">
        <el-input
          v-model="listQuery.search.id"
          placeholder="问题ID"
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
            prop="Question_id"
            label="问题ID"
            align="center"
            :show-overflow-tooltip="true"
            :formatter="(r, c, v) => v || '-'"
            min-width="100"
          />
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
                @click.stop="deleteHandle(scope.row.Question_id)"
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
          <el-col :span="24">
            <el-form-item label="问题描述:">
              <el-input v-model="form.Question_describe" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="对应阶段:">
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
    <el-dialog
      :title="form.Question_id ? '编辑' : '新建'"
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
          <el-col :span="24">
            <el-form-item label="问题描述:">
              <el-input v-model="form.Question_describe" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="对应阶段:">
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
        <el-button
          type="primary"
          @click="submitHandle"
          size="mini"
          v-if="form.Question_id"
        >
          修改</el-button
        >
        <el-button
          type="primary"
          @click="submitHandle"
          size="mini"
          v-if="!form.Question_id"
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
      entityName: "Question",
      list: [],
      form: {
        Question_id: null,
        Question_status: null,
        Question_describe: null,
        Feedback: null,
      },
      formDialog: false,
      editFormDialog: false,
      statusOptions: [
        { id: 0, value: "未反馈" },
        { id: 1, value: "已反馈" },
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