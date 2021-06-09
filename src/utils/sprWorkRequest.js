import axios from 'axios'
import Cookies from 'js-cookie'
import errMsgObj from './errObj'

// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_SPR_WORK_API, // 服务地址
  timeout: 20000 // 请求超时时间
})
service.interceptors.request.use(
  config => {
    if (Cookies.get('AuthenToken')) {
      config.headers['Authorization'] = Cookies.get('AuthenToken')
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 200 && res.code !== 20000 && res.code !== 200000) {
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
