<template>
  <el-menu :router="true" mode="vertical" default-active="1" class="el-menu-vertical-demo">
    <el-menu-item-group title="读书">
      <el-menu-item index="/my/bookcase"><i class="el-icon-message"></i>我的</el-menu-item>
      <el-menu-item index="/my/following"><i class="el-icon-message"></i>友邻</el-menu-item>
    </el-menu-item-group>
    <el-menu-item-group title="探索">
      <el-menu-item index="/doulist/36699814"><i class="el-icon-message"></i>豆列</el-menu-item>
      <el-menu-item index="3"><i class="el-icon-message"></i>热门</el-menu-item>
      <el-menu-item index="4"><i class="el-icon-message"></i>牛人</el-menu-item>
    </el-menu-item-group>
    <el-menu-item-group title="帮助">
      <el-menu-item index="3"><i class="el-icon-message"></i>使用</el-menu-item>
      <el-menu-item index="4"><i class="el-icon-message"></i>关于</el-menu-item>
    </el-menu-item-group>
  </el-menu>
</template>

<script>

export default {
  name: 'side-menu',
  data () {
    return {
    }
  },
  mounted() {

  }
}
</script>

<style scoped>

</style>
