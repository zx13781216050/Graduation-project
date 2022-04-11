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
            prop="News_id"
            label="ID"
            align="center"
            :show-overflow-tooltip="true"
            :formatter="(r, c, v) => v || '-'"
            min-width="100"
          />
          <el-table-column
            prop="News_title"
            label="新闻名称"
            align="center"
            :show-overflow-tooltip="true"
            :formatter="(r, c, v) => v || '-'"
            min-width="140"
          />

          <el-table-column
            prop="News_author"
            label="发布人"
            align="center"
            :show-overflow-tooltip="true"
            min-width="260"
          />
          <el-table-column
            prop="News_time"
            label="发布时间"
            align="center"
            :show-overflow-tooltip="true"
            :formatter="formatNewTime"
            min-width="140"
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
                @click.stop="deleteHandle(scope.row.News_id)"
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
            <el-form-item label="新闻标题:">
              <el-input v-model="form.News_title" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="发布人:">
              <el-input v-model="form.News_author" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="新闻内容:">
              <el-input type="textarea" v-model="form.News_content" />
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
      width="1000px"
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
            <el-form-item label="新闻标题:">
              <el-input v-model="form.News_title" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发布人:">
              <el-input v-model="form.News_author" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="新闻内容:">
              <quill-editor v-model="form.News_content" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="submitHandle"
          size="mini"
          v-if="form.News_id"
        >
          修改</el-button
        >
        <el-button
          type="primary"
          @click="submitHandle"
          size="mini"
          v-if="!form.News_id"
        >
          保存</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mixin } from "@/mixin/mixin";

import QuillEditor from "../components/quillEditor.vue";
export default {
  mixins: [mixin],
  components: {
    QuillEditor,
  },
  data() {
    return {
      content: null,

      entityName: "News",
      list: "",
      form: {
        News_id: null,
        News_title: null,
        News_content: null,
        News_author: null,
        News_time: null,
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
  mounted() {},

  watch: {},
  methods: {
    //格式化日期
    formatNewTime(row) {
      if (!row.News_time) {
        return "-";
      } else {
        var datetime = row.News_time;
        return this.formatTime2(datetime);
      }
    },
    //提交表单
    async submitHandle() {
      this.form.News_time = this.formatTime2(this.form.News_time);
      this.form.News_content = this.$qs.stringify(this.form.News_content);
      let data = this.$qs.stringify(this.form, { arrayFormat: "indices" });
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