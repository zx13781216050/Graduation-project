<template>
  <div>
    <el-form size="mini" :inline="true">
      <el-form-item label="用户ID" prop="id">
        <el-input
          v-model="listQuery.search.id"
          placeholder="用户ID"
          clearable
          @keyup.enter.native="handleFilter"
        />
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input
          v-model="listQuery.search.name"
          placeholder="姓名"
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
            prop="User_id"
            label="用户ID"
            align="center"
            :show-overflow-tooltip="true"
            :formatter="(r, c, v) => v || '-'"
            min-width="100"
          />
          <el-table-column
            prop="Real_name"
            label="姓名"
            align="center"
            :show-overflow-tooltip="true"
            min-width="260"
          />
          <el-table-column
            label="性别"
            align="center"
            :show-overflow-tooltip="true"
            min-width="100"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.User_sex == 1">男</span>
              <span v-else>女</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="username"
            label="用户名"
            align="center"
            :show-overflow-tooltip="true"
            min-width="260"
          />
          <el-table-column
            prop="Role_id"
            label="角色"
            align="center"
            :formatter="RoleFormatter"
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
                @click.stop="deleteHandle(scope.row.User_id)"
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
              <el-input v-model="form.Real_name" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别:">
              <el-select v-model="form.User_sex" placeholder="请选择" clearable>
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
            <el-form-item label="联系方式:">
              <el-input v-model="form.Telephone" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户名:">
              <el-input v-model="form.username" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="角色:">
              <el-select v-model="form.Role_id" placeholder="请选择" clearable>
                <el-option
                  v-for="item in roleOptions"
                  :key="item.Role_id"
                  :label="item.Role_name"
                  :value="item.Role_id"
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
      :title="form.user_id ? '编辑' : '新建'"
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
              <el-input v-model="form.Real_name" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别:">
              <el-select v-model="form.User_sex" placeholder="请选择" clearable>
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
            <el-form-item label="联系方式:">
              <el-input v-model="form.Telephone" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户名:">
              <el-input v-model="form.username" />
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="!form.User_id">
            <el-form-item label="初始密码:">
              <el-input v-model="form.password" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="角色:">
              <el-select v-model="form.Role_id" placeholder="请选择" clearable>
                <el-option
                  v-for="item in roleOptions"
                  :key="item.Role_id"
                  :label="item.Role_name"
                  :value="item.Role_id"
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
          v-if="form.User_id"
        >
          修改</el-button
        >
        <el-button
          type="primary"
          @click="submitHandle"
          size="mini"
          v-if="!form.User_id"
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
      entityName: "user",
      list: [],
      form: {
        User_id: null,
        Real_name: null,
        User_sex: null,
        Telephone: null,
        username: null,
        password: null,
        Role_id: null,
      },
      formDialog: false,
      editFormDialog: false,
      roleOptions: [],
      sexOptions: [
        { value: 1, label: "男" },
        { value: 2, label: "女" },
      ],
      roleOptions: [],
      listQuery: {
        search: {
          id: null,
        },
      },
    };
  },
  created() {
    this.getList();
    this.getRole();
  },
  mounted() {},
  watch: {},
  methods: {
    RoleFormatter(row) {
      let newarr = this.roleOptions.filter((item) => {
        return item.Role_id == row.Role_id;
      });
      return newarr[0].Role_name;
    },
    //获取区域列表
    async getRole() {
      if (!this.roleOptions.length) {
        const res = await this.$http.get(`role/get_list`);
        if (res.data.status == 0) {
          this.roleOptions = res.data.data;
        } else {
          this.$message({
            type: "error",
            message: "获取数据失败",
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