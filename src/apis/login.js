import axios from '@/utils/request';

export const LoginAccount = (payload) =>
    axios.post('/admin/login', payload);
