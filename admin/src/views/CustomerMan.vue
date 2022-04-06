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
                @click.stop="rebackHandle(scope.row)"
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
  },
};
</script>

<style>
</style>