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
          v-loading="listLoading"
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
            prop="id"
            label="编号"
            align="center"
            :show-overflow-tooltip="true"
            :formatter="(r, c, v) => v || '-'"
            min-width="100"
          />
          <el-table-column
            prop="title"
            label="主题"
            align="center"
            :show-overflow-tooltip="true"
            :formatter="(r, c, v) => v || '-'"
            min-width="140"
          />
          <el-table-column
            prop="ownerName"
            label="咨询人"
            align="center"
            :show-overflow-tooltip="true"
            :formatter="(r, c, v) => v || '-'"
            min-width="100"
          />
          <el-table-column
            prop="consulttime"
            label="咨询时间"
            align="center"
            :show-overflow-tooltip="true"
            :formatter="formatConsultTime"
            min-width="130"
          />

          <el-table-column
            prop="replyTime"
            label="回复时间"
            align="center"
            :show-overflow-tooltip="true"
            :formatter="formatReplyTime"
            min-width="130"
          />
          <!-- <el-table-column
            label="标签"
            align="center"
            :show-overflow-tooltip="true"
            :formatter="(r, c, v) => v || '-'"
            min-width="100"
          >
            <template slot-scope="scope">
              <div v-for="item in labelList" :key="item.id">
                <span v-if="scope.row.labelId == item.id">{{
                  item.label
                }}</span>
              </div>
            </template></el-table-column
          > -->
          <el-table-column
            prop="state"
            label="状态"
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
            label="操作"
            align="center"
            class-name="small-padding fixed-width"
            width="300px"
            fixed="right"
          >
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.state && !scope.row.recommend"
                size="mini"
                type="text"
                icon="el-icon-star-off"
                @click.stop="recommendHandle(scope.row)"
                >精选
              </el-button>
              <el-button
                v-else-if="scope.row.state && scope.row.recommend"
                size="mini"
                type="text"
                icon="el-icon-star-on"
                @click.stop="recommendHandle(scope.row)"
                >取消精选
              </el-button>
              <el-button
                size="mini"
                type="text"
                icon="el-icon-document"
                @click.stop="detailsHandle(scope.row)"
                >详情
              </el-button>
              <el-button
                v-if="!scope.row.recommend"
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click.stop="rebackHandle(scope.row)"
                >回复
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
      listQuery: {
        search: {
          id: null,
        },
      },
    };
  },
};
</script>

<style>
</style>