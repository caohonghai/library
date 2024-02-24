<template>
  <div>
    <el-row :gutter="12">
      <el-col :span="6">
        <el-select
          v-model="searchValue.bookCategory"
          @change="getBookList"
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
      </el-col>
      <el-col :span="6">
        <el-input v-model="searchValue.searchKeyword" placeholder="请输入关键字" />
      </el-col>
    </el-row>
    <div class="mt-4">
      <el-button type="primary" @click="getBookList">查询</el-button>
      <el-button @click="resetSearch">重置</el-button>
    </div>
    <el-table class="mt-4 w-full" v-loading="loading" :data="tableData.list" border>
      <el-table-column v-for="col in column" :key="col.prop" :prop="col.prop" :label="col.label" />
    </el-table>
    <div class="mt-4 flex justify-end">
      <el-pagination
        layout="total, prev, pager, next"
        :total="tableData.total"
        @change="changePage"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { getBookListPromise } from '@/apis/book';
import { getAllCategory } from '@/apis/category';

const column = ref([
  {
    prop: 'bookId',
    label: 'ID',
  },
  {
    prop: 'bookName',
    label: '书名',
  },
  {
    prop: 'bookAuthor',
    label: '作者',
  },
  {
    prop: 'bookPublish',
    label: '出版社',
  },
  {
    prop: 'bookPrice',
    label: '价格',
  },
]);
const loading = ref(false);
const tableData = ref({
  list: [],
  total: 0,
});
// const total = ref(0);
const searchValue = reactive({
  bookCategory: '',
  searchKeyword: '',
});
const allTags = ref([]);
const pageIndex = ref(1);

onMounted(() => {
  loading.value = true;
  Promise.all([getBookListPromise(searchValue, pageIndex.value), getAllCategory()])
    .then((res) => {
      tableData.value = res[0];
      allTags.value = res[1];
    })
    .finally(() => {
      loading.value = false;
    });
});

const getBookList = () => {
  loading.value = true;
  getBookListPromise(searchValue, pageIndex.value)
    .then((res) => {
      tableData.value = res;
    })
    .finally(() => {
      loading.value = false;
    });
};

const resetSearch = () => {
  searchValue.bookCategory = '';
  searchValue.searchKeyword = '';
  getBookList();
};

const changePage = (val) => {
  pageIndex.value = val;
  getBookList();
};
</script>
