<template>
  <el-scrollbar>
    <el-menu
      class="h-screen"
      :default-openeds="['/dashboard/bookManage']"
      default-active="/dashboard/bookManage/addBook"
      router
    >
      <template v-for="(menu, idx) in routes" :key="idx">
        <el-sub-menu :index="menu.path" v-if="menu.children">
          <template #title> {{ menu.meta.title }} </template>
          <el-menu-item-group v-for="(item, index) in menu.children" :key="index">
            <el-menu-item :index="item.path">{{ item.meta.title }}</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <el-menu-item-group v-else>
          <el-menu-item :index="menu.path">{{ menu.meta.title }}</el-menu-item>
        </el-menu-item-group>
      </template>
    </el-menu>
  </el-scrollbar>
</template>

<script setup>
import router from '@/router';
import { ref } from 'vue';

// 拿到 router 那边的信息 生成侧边栏
const routes = ref(router.options.routes[1].children);
</script>
