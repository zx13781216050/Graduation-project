<template>
  <div>
    <el-form size="mini" :inline="true">
      <el-form-item label="专业ID" prop="id">
        <el-input
          v-model="listQuery.search.id"
          placeholder="专业ID"
          clearable
          @keyup.enter.native="handleFilter"
        />
      </el-form-item>
      <el-form-item label="专业名称" prop="name">
        <el-input
          v-model="listQuery.search.name"
          placeholder="专业名称"
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
            prop="Specialty_id"
            label="专业ID"
            align="center"
            :show-overflow-tooltip="true"
            :formatter="(r, c, v) => v || '-'"
            min-width="100"
          />
          <el-table-column
            prop="Specialty_name"
            label="专业名称"
            align="center"
            :show-overflow-tooltip="true"
            min-width="260"
          />
          <el-table-column
            prop="Institut_id"
            label="所属院校"
            align="center"
            :formatter="InstitutFormatter"
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
                @click.stop="deleteHandle(scope.row.Specialty_id)"
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
            <el-form-item label="专业名称:">
              <el-input v-model="form.Specialty_name" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="学院:">
              <el-select
                v-model="form.Institut_id"
                placeholder="请选择"
                clearable
              >
                <el-option
                  v-for="item in institutOptions"
                  :key="item.Institut_id"
                  :label="item.Institut_name"
                  :value="item.Institut_id"
                />
              </el-select>
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
      :title="form.Specialty_id ? '编辑' : '新建'"
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
            <el-form-item label="专业名称:">
              <el-input v-model="form.Specialty_name" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="学院:">
              <el-select
                v-model="form.Institut_id"
                placeholder="请选择"
                clearable
              >
                <el-option
                  v-for="item in institutOptions"
                  :key="item.Institut_id"
                  :label="item.Institut_name"
                  :value="item.Institut_id"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="submitHandle"
          size="mini"
          v-if="form.Specialty_id"
        >
          修改</el-button
        >
        <el-button
          type="primary"
          @click="submitHandle"
          size="mini"
          v-if="!form.Specialty_id"
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
      entityName: "Specialty",
      list: [],
      form: {
        Specialty_id: null,
        Specialty_name: null,
        Institut_id: null,
      },
      formDialog: false,
      editFormDialog: false,
      institutOptions: [],
      listQuery: {
        search: {
          id: null,
        },
      },
    };
  },
  created() {
    this.getList();
    this.getInstitutList();
  },
  watch: {},
  methods: {},
  methods: {
    InstitutFormatter: function (row) {
      let newarr = this.institutOptions.filter((item) => {
        return item.Institut_id == row.Institut_id;
      });
      return newarr[0].Institut_name;
    },
    //获取区域列表
    async getInstitutList() {
      if (!this.institutOptions.length) {
        const res = await this.$http.get(`institut/get_list`);
        if (res.data.status == 0) {
          this.institutOptions = res.data.data;
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