<template>
  <div>
    <el-form size="mini" :inline="true">
      <el-form-item label="公告ID" prop="id">
        <el-input
          v-model="listQuery.search.id"
          placeholder="公告ID"
          clearable
          @keyup.enter.native="handleFilter"
        />
      </el-form-item>
      <el-form-item label="公告标题" prop="name">
        <el-input
          v-model="listQuery.search.name"
          placeholder="公告标题"
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
            prop="Notice_id"
            label="ID"
            align="center"
            :show-overflow-tooltip="true"
            :formatter="(r, c, v) => v || '-'"
            min-width="100"
          />
          <el-table-column
            prop="Notice_title"
            label="公告标题"
            align="center"
            :show-overflow-tooltip="true"
            :formatter="(r, c, v) => v || '-'"
            min-width="140"
          />

          <el-table-column
            prop="Notice_author"
            label="发布人"
            align="center"
            :show-overflow-tooltip="true"
            min-width="260"
          />
          <el-table-column
            prop="Notice_time"
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
                @click.stop="deleteHandle(scope.row.Notice_id)"
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
            <el-form-item label="公告标题:">
              <el-input v-model="form.Notice_title" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="发布人:">
              <el-input v-model="form.Notice_author" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="公告内容:">
              <quill-editor
                :content="form.Notice_content"
                :disable="false"
                @getContent="getGoodContent"
              ></quill-editor>
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
      :title="form.Notice_id ? '编辑' : '新建'"
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
            <el-form-item label="公告标题:">
              <el-input v-model="form.Notice_title" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发布人:">
              <el-input v-model="form.Notice_author" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="公告内容:">
              <quill-editor
                :content="form.Notice_content"
                :disable="true"
                @getContent="getGoodContent"
              ></quill-editor>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="submitHandle"
          size="mini"
          v-if="form.Notice_id"
        >
          修改</el-button
        >
        <el-button
          type="primary"
          @click="submitHandle"
          size="mini"
          v-if="!form.Notice_id"
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

      entityName: "Notice",
      list: [],
      form: {
        Notice_id: null,
        Notice_title: null,
        Notice_content: null,
        Notice_author: null,
        Notice_time: null,
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
    getGoodContent(e) {
      this.form.Notice_content = e;
    },
    //格式化日期
    formatNewTime(row) {
      if (!row.Notice_time) {
        return "-";
      } else {
        var datetime = row.Notice_time;
        return this.formatTime2(datetime);
      }
    },
    //提交表单
    async submitHandle() {
      this.form.Notice_time = this.formatTime2(this.form.Notice_time);
      let data = this.$qs.stringify(this.form, { arrayFormat: "indices" });
      const res = await this.$http.put(`${this.entityName}/edit_form`, data);
      if (res.data.status == 0) {
        this.editFormDialog = false;
        this.form.Notice_content = "";
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