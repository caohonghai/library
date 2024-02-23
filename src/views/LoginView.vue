<template>
  <div class="w-full mt-32 flex flex-col items-center">
    <h1 class="text-3xl font-bold">Login</h1>
    <el-form label-position="top" label-width="100px" :model="formLabelAlign" class="w-60">
      <el-form-item label="用户名">
        <el-input v-model="formLabelAlign.username" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="formLabelAlign.password" placeholder="请输入密码" />
      </el-form-item>
      <el-button type="primary" @click="login">登入</el-button>
    </el-form>
  </div>
</template>

<script setup>
import { reactive } from 'vue';

const formLabelAlign = reactive({
  username: '',
  password: '',
});

const login = () => {
  console.log(formLabelAlign);
};
</script>
