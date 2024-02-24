<template>
  <el-container>
    <el-aside width="200px"><AsideMenu /> </el-aside>

    <el-container>
      <el-header class="flex flex-row items-center border-b"
        ><h1 class="text-2xl text-gray-400">图书管理仪表盘</h1></el-header
      >
      <el-main> <router-view></router-view> </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import AsideMenu from '@/components/AsideMenu.vue';
</script>
