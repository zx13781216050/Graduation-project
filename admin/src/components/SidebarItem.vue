<template>
  <div class="menu-wrapper">
    <!--$router.options.routes获取router的内容-->
    <!-- 循环router,获取第一层item -->
    <template v-for="item in $router.options.routes">
      <el-submenu :index="item.path" :key="item.path" v-if="!item.hidden">
        <template slot="title">
          <span>{{ item.name }}</span>
        </template>
        <!-- 循环第二层children获取第三层child -->
        <template v-for="child in item.children">
          <!-- 判断是否存在第三层，如果存在则显示 -->
          <div
            v-if="child.children != null && child.children.length > 0"
            :key="child.path"
          >
            <!-- 展示第三层 -->
            <el-submenu :index="child.path" :key="child.path">
              <template slot="title">{{ child.name }}</template>
              <template v-for="child1 in child.children">
                <router-link
                  v-if="
                    child1.path != null &&
                    child1.path.indexOf('http') != 0 &&
                    child1.path != ''
                  "
                  :to="child.path + '/' + child1.path"
                  :key="child1.path"
                >
                  <el-menu-item :index="child1.path">{{
                    child1.name
                  }}</el-menu-item>
                </router-link>
              </template>
            </el-submenu>
          </div>
          <!-- 如果第三层不存在则只展示第二层 -->
          <div v-else :key="child.path">
            <router-link
              v-if="
                child.path != null &&
                child.path.indexOf('http') != 0 &&
                child.path != ''
              "
              :to="item.path + '/' + child.path"
              :key="child.name"
            >
              <el-menu-item :index="child.path">
                <span>{{ child.name }}</span>
              </el-menu-item>
            </router-link>
          </div>
        </template>
      </el-submenu>
    </template>
  </div>
</template>

<script>
export default {
  name: "SidebarItem",
  props: {
    routes: {
      type: Array,
    },
  },
  data() {
    return {
      status: 0,
    };
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>

