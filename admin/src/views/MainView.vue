<template>
  <el-container style="height: 100vh; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu router default-active="$route.path">
        <el-menu-item index="/index_view">首页</el-menu-item>
        <el-submenu index="1">
          <template slot="title"
            ><i class="el-icon-message"></i>客户信息</template
          >
          <el-menu-item-group>
            <el-menu-item index="/customer/customer_man"
              >客户信息管理</el-menu-item
            >
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"
            ><i class="el-icon-message"></i>留学方案</template
          >
          <el-menu-item-group>
            <el-menu-item index="/overseas/overseas_man"
              >留学方案管理</el-menu-item
            >
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"
            ><i class="el-icon-message"></i>课程培训</template
          >
          <el-menu-item-group>
            <el-menu-item index="/train/train_man">课程培训管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title"
            ><i class="el-icon-message"></i>问题反馈</template
          >
          <el-menu-item-group>
            <el-menu-item index="/quest/quest_man">问题列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title"
            ><i class="el-icon-message"></i>日志管理</template
          >
          <el-menu-item-group>
            <el-menu-item index="/journal/journal_man">日志管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="6">
          <template slot="title"
            ><i class="el-icon-message"></i>新闻公告</template
          >
          <el-menu-item-group>
            <el-menu-item index="/notice/news_man">新闻管理</el-menu-item>
            <el-menu-item index="/notice/notice_man">公告管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="7">
          <template slot="title"
            ><i class="el-icon-message"></i>权限分配</template
          >
          <el-menu-item-group>
            <el-menu-item index="/notice/news_man">权限分配</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>{{ this.$store.state.username }}</span>
      </el-header>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>