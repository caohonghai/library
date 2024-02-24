import axios from '@/utils/request';

export const addCategory = (categoryName) =>
    axios.post('/category/addBookCategory?categoryName=' + categoryName);

export const getAllCategory = () =>
    axios.get('/category/findAllBookCategory');

export const deleteCategory = (bookCategoryId) =>
    axios.delete('/category/deleteCategory/' + bookCategoryId);