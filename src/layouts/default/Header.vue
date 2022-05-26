<template>
  <header class="flex justify-between fixed left-0 right-0 top-0 h60px" flex="">
    <img class="rounded-50% w60px h60px" src="../../assets/avatars.jpg" alt="logo" />
    <el-input v-model="search" class="w-50 m-2" placeholder="请输入搜索内容" :suffix-icon="Search" />
    <el-menu class="" :default-active="activeIndex" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">前端开发</el-menu-item>
      <el-menu-item index="3">后端开发</el-menu-item>
      <el-menu-item index="4">科学园地</el-menu-item>
    </el-menu>
  </header>
</template>

<script setup lang="ts">
const activeIndex = ref('1')
const search = ref('')
const handleSelect = (index: string) => {
  activeIndex.value = index
}
</script>
<style lang="scss" scoped></style>
