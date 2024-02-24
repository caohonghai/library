<template>
  <el-container>
    <el-aside width="200px"><AsideMenu /> </el-aside>

    <el-container>
      <el-header class="flex flex-row items-center justify-between border-b">
        <h1 class="text-2xl text-gray-400">图书管理后台</h1>
        <el-link :underline="false" @click="logout">退出登录</el-link>
      </el-header>
      <el-main> <router-view></router-view> </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import AsideMenu from '@/components/AsideMenu.vue';

const logout = () => {
  console.log('logout');
};
</script>
