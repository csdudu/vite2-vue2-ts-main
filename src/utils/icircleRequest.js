import axios from 'axios'
import Cookies from 'js-cookie'
import errMsgObj from './errObj'

// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_ICIRCLE_API, // 服务地址
  timeout: 6000 // 请求超时时间
})
service.interceptors.request.use(
  config => {
    if (Cookies.get('AuthenToken')) {
      config.headers['Authorization'] = Cookies.get('AuthenToken')
    }
    // config.headers['Authorization'] = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0ZpcnN0TG9naW4iOmZhbHNlLCJ1c2VyX25hbWUiOiIxODIxNzE3OTUwMyIsInJvbGVJZCI6bnVsbCwic2NvcGUiOlsiYWxsIl0sImFiaU9uZUlkIjozMzMzMzMzMzMzMzMsInVzZXJUeXBlIjoiQUJJIiwiZXhwIjoxNjE3ODc3ODgzLCJqdGkiOiI2NTJiZjVkOS1jOWIyLTRmOWUtOTc2My05ZGQyMTA0ZjM2YzUiLCJjbGllbnRfaWQiOiIyYjAxYTMxMGVhZmQ0N2YxYThkZDQxYjE0ZGEwZGQzYSJ9.qVOI9-oWcvbdSra3-_zPaPtxwa9PFpFibWGbovGuHWg'
    // config.headers['userType'] = 'ABI'// Cookies.get('userType')
    // config.headers['abiOneId'] = '222222222222'// Cookies.get('abiOneId')
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 200 && res.code !== 200000) {
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
