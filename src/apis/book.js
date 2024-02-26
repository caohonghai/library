import axios from '@/utils/request';

export const addBookPromise = (payload) =>
  axios.post('/book/addBook', payload);

export const getBookListPromise = (payload, pageIndex) =>
  axios.post(`/book/listBooks/${pageIndex}/8`, payload);
