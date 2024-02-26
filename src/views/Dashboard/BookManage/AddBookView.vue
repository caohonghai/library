<template>
  <div class="flex justify-center">
    <div class="border w-full lg:w-1/3 p-4 rounded-sm">
      <h1 class="text-xl text-gray-700 text-center">
        添加书籍
      </h1>
      <el-form
        ref="bookForm"
        v-loading="loading"
        :model="bookInfo"
        :rules="rules"
        class="mt-12"
        label-width="80px"
      >
        <el-form-item label="书名" prop="bookName">
          <el-input
            v-model="bookInfo.bookName"
            placeholder="请输入书名"
          />
        </el-form-item>
        <el-form-item label="作者" prop="bookAuthor">
          <el-input
            v-model="bookInfo.bookAuthor"
            placeholder="请输入作者"
          />
        </el-form-item>
        <el-form-item label="出版社" prop="bookPublish">
          <el-input
            v-model="bookInfo.bookPublish"
            placeholder="请输入出版社"
          />
        </el-form-item>
        <el-form-item label="类别" prop="bookCategory">
          <el-select
            v-model="bookInfo.bookCategory"
            clearable
            filterable
            placeholder="请选择类别"
          >
            <el-option
              v-for="item in allTags"
              :key="item.categoryId"
              :label="item.categoryName"
              :value="item.categoryId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="价格" prop="bookPrice">
          <el-input
            v-model.number="bookInfo.bookPrice"
            placeholder="请输入价格"
          />
        </el-form-item>
        <el-form-item label="简介" prop="bookIntroduction">
          <el-input
            v-model="bookInfo.bookIntroduction"
            placeholder="请输入简介"
            maxlength="3000"
            show-word-limit
            type="textarea"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="onSubmit(bookForm)"
          >
            新建
          </el-button>
          <el-button @click="onReset(bookForm)">
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import { getAllCategory } from '@/apis/category';
import { addBookPromise } from '@/apis/book';
import { ElMessage } from 'element-plus';

// ref
const bookForm = ref();
// 表单规则
const rules = reactive({
  bookName: [
    {
      required: true,
      message: '书名不能为空',
      trigger: 'blur',
    },
  ],
  bookAuthor: [
    {
      required: true,
      message: '作者不能为空',
      trigger: 'blur',
    },
  ],
  bookPublish: [
    {
      required: true,
      message: '出版社不能为空',
      trigger: 'blur',
    },
  ],
  bookCategory: [
    {
      required: true,
      message: '类别不能为空',
      trigger: ['change', 'blur'],
    },
  ],
  bookPrice: [
    {
      required: true,
      message: '价格不能为空',
      trigger: 'blur',
    },
    {
      type: 'number',
      message: '价格必须为数字值',
      trigger: 'blur',
    },
    {
      validator: (rule, value, callback) => {
        if (value < 0) {
          callback(new Error('价格不能为负数'));
        } else {
          callback();
        }
      },
      trigger: 'blur',
    },
  ],
  bookIntroduction: [
    {
      required: true,
      message: '简介不能为空',
      trigger: 'blur',
    },
  ],
  desc: [
    {
      required: true,
      message: 'Please input activity form',
      trigger: 'blur',
    },
  ],
});

onMounted(() => {
  getAllTags();
});

const loading = ref(false);
const allTags = ref([]);
// 获取所有标签
const getAllTags = () => {
  loading.value = true;
  getAllCategory()
    .then((res) => {
      allTags.value = res;
    })
    .finally(() => {
      loading.value = false;
    });
};

const bookInfo = reactive({
  bookName: '',
  bookAuthor: '',
  bookPublish: '',
  bookCategory: '',
  bookIntroduction: '',
  bookPrice: '',
});
// 提交表单
const onSubmit = async (form) => {
  if (!form) return;
  await form.validate((valid) => {
    if (valid) {
      addBookPromise(bookInfo).then(() => {
        ElMessage({
          showClose: true,
          message: '添加书籍成功',
          type: 'success',
        });
        onReset(form);
      });
    }
  });
};

const onReset = (form) => {
  if (!form) return;
  form.resetFields();
};
</script>
