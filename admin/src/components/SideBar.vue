<template>
  <el-menu
    mode="vertical"
    unique-opened
    theme="dark"
    router
    :collapse="false"
    :default-openeds="arrroute"
    background-color="#304156"
    text-color="#bfcbd9"
    active-text-color="#409eff"
  >
    <sidebar-item></sidebar-item>
  </el-menu>
</template>

<script>
import SidebarItem from "./SidebarItem";
export default {
  name: "sidebar",
  components: { SidebarItem },
  data() {
    return {
      arrroute: [],
      openeds: [this.arrroute],
    };
  },
  created() {
    this.change();
  },
  watch: {
    // arrroute() {
    //   this.setchange();
    // },
  },
  methods: {
    change() {
      //console.log(this.$route.path.slice(0, this.$route.path.lastIndexOf("/")));
      this.arrroute.push(
        this.$route.path.slice(0, this.$route.path.lastIndexOf("/"))
      );
    },
  },
};
</script>

<style scoped>
</style>

