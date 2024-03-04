import axios from '@/utils/request';

export const LoginAccount = (payload) =>
  axios.post('/admin/login', payload);

export const logoutAccount = () =>
  axios.post('/admin/logout');

export const registerAccount = (payload) => {
  return axios.post('/admin/register', payload);
};
