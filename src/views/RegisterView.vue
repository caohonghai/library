<template>
  <div class="w-full mt-32 flex flex-col items-center">
    <h1 class="text-3xl font-bold">Register</h1>
    <el-form
      ref="formRef"
      label-position="top"
      label-width="100px"
      :model="registerInfo"
      :rules="rules"
      class="w-60"
    >
      <el-form-item label="用户名" prop="username">
        <el-input
          v-model="registerInfo.username"
          placeholder="请输入用户名"
        />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="registerInfo.password"
          placeholder="请输入密码"
        />
      </el-form-item>
      <el-form-item label="昵称" prop="nickName">
        <el-input
          v-model="registerInfo.nickName"
          placeholder="请输入昵称"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input
          v-model="registerInfo.email"
          placeholder="请输入邮箱"
        ></el-input>
      </el-form-item>
      <div class="flex justify-center mt-6">
        <el-button
          class="w-full"
          type="primary"
          @click="register(formRef)"
        >
          注册
        </el-button>
        <el-button
          class="w-full"
          type="default"
          @click="login"
        >
          登陆
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import router from '@/router';
import { registerAccount } from '@/apis/account';
import { ElMessage } from 'element-plus';

const registerInfo = reactive({
  usename: '',
  password: '',
  nickName: '',
  email: '',
});

const formRef = ref();

const rules = reactive({
  username: [
    {
      required: true,
      message: '用户名不能为空',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: '密码不能为空',
      trigger: 'blur',
    },
  ],
  nickName: [
    {
      required: true,
      message: '昵称不能为空',
      trigger: 'blur',
    },
  ],
  email: [
    {
      required: true,
      message: '邮箱不能为空',
      trigger: ['change', 'blur'],
    },
  ],
});

const register = async (form) => {
  if (!form) return;
  await form.validate((valid) => {
    if (valid) {
      registerAccount(registerInfo).then(() => {
        ElMessage({
          showClose: true,
          message: '注册成功',
          type: 'success',
        });
        login();
      });
    }
  });
};

const login = () => {
  router.push('/');
};
</script>
