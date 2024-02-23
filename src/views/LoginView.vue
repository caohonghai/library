<template>
  <div class="w-full mt-32 flex flex-col items-center">
    <h1 class="text-3xl font-bold">Login</h1>
    <el-form label-position="top" label-width="100px" :model="loginInfo" class="w-60">
      <el-form-item label="用户名">
        <el-input v-model="loginInfo.username" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="loginInfo.password" placeholder="请输入密码" />
      </el-form-item>
      <el-button type="primary" @click="login">登入</el-button>
    </el-form>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { LoginAccount } from '@/apis/login';

const loginInfo = reactive({
  username: '',
  password: '',
});

const login = () => {
  LoginAccount(loginInfo).then((res) => {
    const { token } = res;
    localStorage.setItem('token', token);
  });
};
</script>
