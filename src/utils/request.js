import axios from 'axios';
import { ElMessage } from 'element-plus'
import router from '@/router'

const request = axios.create({
    baseURL: 'http://118.31.67.142:18080/',
    timeout: 30 * 1000,
})

request.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token') || '';
        const tokenHead = localStorage.getItem('tokenHead') || '';
        config.headers['Authorization'] = tokenHead + token;
        return config
    },
    (error) => {
        return Promise.reject(error)
    },
)

request.interceptors.response.use(
    (response) => {
        const { code } = response.data
        if (code === 200) {
            const { data } = response.data
            return data
        } else {
            const { message } = response.data
            ElMessage({
                showClose: true,
                message,
                type: 'error',
            })
            if (code === 401) {
                localStorage.removeItem('token')
                localStorage.removeItem('tokenHead')
                router.push('/')
            }
            return Promise.reject(message)
        }
    },
    (error) => {
        const { status } = error.response
        switch (status) {
            case 401:
                // toast('Login expired, please log in again!', {
                //     toastId: new Date().getTime().toString(),
                //     type: 'error',
                // })
                localStorage.removeItem('token')
                // TODO: 后续换成其他方式
                window.location.reload()
                break
        }
        return Promise.reject(error)
    },
)

export default request