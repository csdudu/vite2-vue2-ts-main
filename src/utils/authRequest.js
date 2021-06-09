import axios from 'axios'
import errMsgObj from './errObj'

// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_AUTH_API, // 服务地址
  timeout: 6000 // 请求超时时间
})
service.interceptors.response.use(
  response => {
    const res = response
    if (res.status !== 200 && res.status !== 200000) {
      return Promise.reject(res.message)
    } else {
      return res.data
    }
  },
  error => {
    let errMsg = '网络请求出错'
    if (error.response) {
      const { data } = error.response
      errMsg = errMsgObj[data.status] || errMsgObj[data.code] || '网络请求出错'
    }
    return Promise.reject(errMsg)
  }
)

export default service
