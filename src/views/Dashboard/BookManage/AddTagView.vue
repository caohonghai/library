<template>
  <div>
    <el-button type="primary" @click="addTag">新建标签</el-button>
    <el-table class="mt-4 w-full" v-loading="loading" :data="tableData" height="450" border>
      <el-table-column prop="categoryId" label="类别编号" width="180" />
      <el-table-column prop="categoryName" label="类别名称" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ElMessageBox, ElMessage } from 'element-plus';
import { addCategory, getAllCategory, deleteCategory } from '@/apis/category';
import { ref, onMounted } from 'vue';

const loading = ref(false);
const tableData = ref([]);

onMounted(() => {
  getAllTags();
});

// 获取所有标签
const getAllTags = () => {
  loading.value = true;
  getAllCategory()
    .then((res) => {
      tableData.value = res;
    })
    .finally(() => {
      loading.value = false;
    });
};

// 新建标签
const addTag = () => {
  ElMessageBox.prompt('请输入新标签名称', '新建标签', {
    confirmButtonText: '提交',
    cancelButtonText: '取消',
    inputPattern: /\S+/,
    inputErrorMessage: '标签名称不能为空',
  })
    .then(({ value }) => {
      addCategory(value).then(() => {
        ElMessage({
          showClose: true,
          message: '添加标签成功',
          type: 'success',
        });
        getAllTags();
      });
    })
    .catch(() => {});
};

// 删除标签
const handleDelete = (row) => {
  ElMessageBox.confirm('此操作将永久删除该标签, 是否继续?', '删除标签', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      deleteCategory(row.categoryId).then(() => {
        ElMessage({
          showClose: true,
          message: '删除成功',
          type: 'success',
        });
        getAllTags();
      });
    })
    .catch(() => {});
};
</script>
