import axios from 'aixos'

// 二次封装
const request = axios.create({
  // 基本地址配置
  baseURL: '/',
  timeout: 10000
})

// 请求拦截器
request.interceptors.request.use((config) => {
  // 设置请求头，或token
  return config
})

// 响应拦截器
request.interceptors.response.use((res) => {

  return res.data.data
}, (err) => {
  // 请求失败
  return err.message
})

export default request