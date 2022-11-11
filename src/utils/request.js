import axios from 'axios' 

const http = axios.create({
    // 通用请求的地址前缀
    baseURL: '/api',
    timeout: 5000,   // 超时时间
})
// 请求拦截器
http.interceptors.request.use(function (config) {
    return config
}, function (error) {
    return Promise.reject(error)
})

// 响应拦截器
http.interceptors.response.use(function (response) {
    return response
}, function (error) {
    return Promise.reject(error)
})
export default http