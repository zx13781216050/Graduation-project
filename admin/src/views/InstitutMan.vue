<template>
  <div>
    <el-form size="mini" :inline="true">
      <el-form-item label="学院ID" prop="id">
        <el-input
          v-model="listQuery.search.id"
          placeholder="学院ID"
          clearable
          @keyup.enter.native="handleFilter"
        />
      </el-form-item>
      <el-form-item label="院校名字" prop="name">
        <el-input
          v-model="listQuery.search.name"
          placeholder="院校名字"
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
            prop="Institut_id"
            label="院校ID"
            align="center"
            :show-overflow-tooltip="true"
            :formatter="(r, c, v) => v || '-'"
            min-width="100"
          />
          <el-table-column
            prop="Institut_name"
            label="院校名字"
            align="center"
            :show-overflow-tooltip="true"
            min-width="260"
          />
          <el-table-column
            prop="Nation_id"
            label="所属国家"
            align="center"
            :formatter="areaFormatter"
            :show-overflow-tooltip="true"
            min-width="260"
          />
          <el-table-column
            prop="Stage_id"
            label="性质"
            align="center"
            :formatter="stageFormatter"
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
                @click.stop="deleteHandle(scope.row.Institut_id)"
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
    <el-dialog title="详情" width="1000px" :visible.sync="formDialog">
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
            <el-form-item label="学院名字:">
              <el-input v-model="form.Institut_name" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属国家:">
              <el-select
                v-model="form.Nation_id"
                placeholder="请选择"
                clearable
              >
                <el-option
                  v-for="item in areaOptions"
                  :key="item.Nation_id"
                  :label="item.Nation_name"
                  :value="item.Nation_id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性质:">
              <el-select v-model="form.Stage_id" placeholder="请选择" clearable>
                <el-option
                  v-for="item in stageOptions"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="托福:">
              <el-input v-model="form.Toefl" />
            </el-form-item>
            <el-form-item label="SAT:">
              <el-input v-model="form.Sat" />
            </el-form-item>
            <el-form-item label="雅思:">
              <el-input v-model="form.Ielts" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="院校介绍:">
              <quill-editor
                :content="form.Introduce"
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
      :title="form.Institut_id ? '编辑' : '新建'"
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
            <el-form-item label="学院名字:">
              <el-input v-model="form.Institut_name" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属国家:">
              <el-select
                v-model="form.Nation_id"
                placeholder="请选择"
                clearable
              >
                <el-option
                  v-for="item in areaOptions"
                  :key="item.Nation_id"
                  :label="item.Nation_name"
                  :value="item.Nation_id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性质:">
              <el-select v-model="form.Stage_id" placeholder="请选择" clearable>
                <el-option
                  v-for="item in stageOptions"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="托福:">
              <el-input v-model="form.Toefl" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="SAT:">
              <el-input v-model="form.Sat" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="雅思:">
              <el-input v-model="form.Ielts" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="院校介绍:">
              <quill-editor
                :content="form.Introduce"
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
          v-if="form.Institut_id"
        >
          修改</el-button
        >
        <el-button
          type="primary"
          @click="submitHandle"
          size="mini"
          v-if="!form.Institut_id"
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
      entityName: "Institut",
      list: [],
      form: {
        Institut_id: null,
        Institut_name: null,
        Nation_id: null,
        Stage_id: null,
        Toefl: null,
        Sat: null,
        Ielts: null,
        Introduce: null,
      },
      stageOptions: [
        { id: 1, value: "小学" },
        { id: 2, value: "中学" },
        { id: 3, value: "高中" },
        { id: 4, value: "大学" },
      ],
      formDialog: false,
      editFormDialog: false,
      areaOptions: [],
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
  },
  watch: {},
  methods: {},
  methods: {
    getGoodContent(e) {
      this.form.Introduce = e;
    },
    //提交表单
    async submitHandle() {
      let data = this.$qs.stringify(this.form, { arrayFormat: "indices" });
      const res = await this.$http.put(`${this.entityName}/edit_form`, data);
      if (res.data.status == 0) {
        this.editFormDialog = false;
        this.form.Introduce = "";
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
    stageFormatter: function (row) {
      switch (row.Stage_id) {
        case 1:
          return "小学";
        case 2:
          return "中学";
        case 3:
          return "高中";
        case 4:
          return "大学";
      }
    },
    areaFormatter: function (row) {
      let newarr = this.areaOptions.filter((item) => {
        return item.Nation_id == row.Nation_id;
      });
      return newarr[0].Nation_name;
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
  },
};
</script>

<style>
</style>