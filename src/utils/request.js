import axios from 'axios'

// 处理错误
const msg = {
  401: '未授权',
  403: '禁止访问',
  404: '找不到，请求地址不正确',
  500: '服务器出错'
}

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
  // 判断，功能成功
  if (res.data.code === 20000) {
    // 功能成功
    return res.data.data
  } else {
    // 功能失败
    return Promise.reject(res.data.message)
  }
}, (err) => {
  let message = '未知错误，请联系管理员解决~'
  // 判断是否是服务器返回的
  if (err.response) {
    // 判断是什么错误
    // 401: 为授权
    // 404: 找不到
    // 403: 禁止访问
    // 500: 服务器错误
    if (msg[err.response.status]) {
      message = msg[err.response.status]
    }
  } else {
    // 超时
    if (err.message.indexOf('NetWork Err')) {
      message = '暂无网络，请检查网络连接！！！'
    } else if (err.message.indexOf('timeout')) {
      message = '网络延迟，请重试一下试试~~~'
    }
  }
  // 返回
  return Promise.reject(message)
})

export default request