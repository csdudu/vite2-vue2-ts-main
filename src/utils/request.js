import api from '@/api/apiList'
import { isObjectNull } from '@/assets/js/EmptyUtil'
import { getUUID } from '@/assets/js/uuidUtil'
import store from '@/store/index'
import axios from 'axios'
import Cookies from 'js-cookie'
const config = {
  HOST: '', // process.env.VUE_APP_BASE_API
  UploadHost: 'https://bees-server-dev.ab-inbev.cn/commUp'
}

// 微服务接口
const baseURL = config.HOST
const uploadURL = config.UploadHost

const basicServerUrl = ['UploadImg', 'BusinessOCR', 'FoodOCR']
const cancelTokenCollection = {}
const errorResult = {
  result: false,
  message: '网络错误或无法连接网络!'
}
// 创建 axios 实例
const service = axios.create({
  baseURL: config.HOST, // api base_url
  timeout: 6000 // 请求超时时间
})

const err = (error) => {
  if (error.response) {
    if (error.response.status !== 200) {
      // console.log(error)
      return
    }
  }
  return Promise.reject(error)
}

// request interceptor
service.interceptors.request.use(config => {
  if (Cookies.get('AuthenToken')) {
    config.headers['Authorization'] = Cookies.get('AuthenToken')
  }
  // config.headers['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0ZpcnN0TG9naW4iOmZhbHNlLCJ1c2VyX25hbWUiOiJkMmMxMzE4MmY0NzUzZTBkYWNkZTFjZTg5M2ZmNWQyYyIsInJvbGVJZCI6IjQ2Iiwic2NvcGUiOlsiYWxsIl0sImFiaU9uZUlkIjoyMjIyMjIyMjIyMjIsInVzZXJUeXBlIjoiQUJJIiwiZXhwIjoxNjE4NTUzMzUxLCJqdGkiOiJocUQ2aWRCS1g3SHRsTFV5ZnUzanE3R0VhZDAiLCJjbGllbnRfaWQiOiIyYjAxYTMxMGVhZmQ0N2YxYThkZDQxYjE0ZGEwZGQzYSJ9.Fu_jmxnFx12ATrPe-xE23lVtstV9gUHWuFEAsqHIZDA'
  return config
}, err)

// response interceptor
service.interceptors.response.use((response) => {
  return response.data
}, err)

export {
  service as axios
}

// 通过axios发送请求 (post,get,put,delete)
const ajax = {
  /** 统一返回接口 */
  SwaggerResult: {
    resultOK: 200000
  },
  /**
   * 按URL初始入请示baseURL
   * @param {*} myConfig
   * @param {*} urlConfig
   */
  _initServerBase(myConfig, urlConfig) {
    const serverBase = urlConfig.server
    if (serverBase) {
      myConfig.baseURL = process.env[serverBase]
    }
    // myConfig.baseURL = 'http://localhost:8080'
    // myConfig.baseURL = 'http://10.10.0.187:8080'
    if (process.env.NODE_ENV === 'development') { // 测试环境不走网关加一个abiOneId头
      myConfig.headers['abiOneid'] = store.state.sysInfo.userInfo.abiOneId
    }
  },
  /**
   * get 请求--获取用户信息（专用接口处理-请勿使用）
   * @param urlKey 对应API 中的urlkey
   * @param paramObj  发送ajax 传递的参数对象
   * @param config  发送ajax 传递的header对象
   * @returns {promise} 返回promise对象
   */
  getUser(urlKey, paramObj, config) {
    const myConfig = {
      params: paramObj,
      method: 'GET',
      baseURL: baseURL,
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': config.headers.Authorization
      }
    }

    return service.get(api[urlKey].path.replace(/{.*?}/, paramObj), myConfig).then(res => {
      // console.log(`*************接口名:${api[urlKey].path}**************\n**************请求参数:${JSON.stringify(paramObj)}\n**************请求结果:${JSON.stringify(res)}\n`)
      if (!res.data || res.data.code !== '001_0000') {
        console.warn(`接口名: ${api[urlKey].path}, 错误信息: ${res.data}`)
        res.data.result = false
      } else {
        res.data.result = true
      }
      return res.data
    }).catch(() => {
      console.error(`接口名: ${api[urlKey].path}, 错误信息: `, 'error')
      return errorResult
    }).finally(() => {
    })
  },

  /**
   * get 请求
   * @param urlKey 对应API 中的urlkey
   * @param paramObj  发送ajax 传递的参数对象
   * @returns {promise} 返回promise对象
   */
  get(urlKey, paramObj, config = null) {
    // console.log('?>>>>>>>' + JSON.stringify(store.getters))
    const myConfig = {
      params: null,
      method: 'GET',
      baseURL: basicServerUrl.indexOf(urlKey) > -1 ? uploadURL : baseURL,
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json;charset=UTF-8',
        // 'userId': ((config && config.headers && config.headers.userId) ? config.headers.userId : store.getters['sysInfo/getUserInfo'].id),
        'Authorization': store.getters['sysInfo/getToken'] || sessionStorage.getItem('token')
      }
    }
    this._initServerBase(myConfig, api[urlKey])
    if (typeof paramObj === 'object') {
      myConfig.params = paramObj
    }

    return service.get(api[urlKey].path.replace(/{.*?}/, paramObj), myConfig).then(res => {
      // console.log(`*************接口名:${api[urlKey].path}**************\n**************请求参数:${JSON.stringify(paramObj)}\n**************请求结果:${JSON.stringify(res)}\n`)
      // if (!res.data || res.data.code !== '001_0000') {
      //   console.warn(`接口名: ${api[urlKey].path}, 错误信息: ${res.data}`)
      //   res.data.result = false
      // } else {
      //   res.data.result = true
      // }
      return res
    }).catch(() => {
      console.error(`接口名: ${api[urlKey].path}, 错误信息: `, 'error')
      return errorResult
    }).finally(() => {
    })
  },

  /**
   * post 请求
   * @param urlKey 对应API 中的urlkey
   * @param paramObj  发送ajax 传递的参数对象
   * @returns {promise} 返回promise对象
   */
  post(urlKey, paramObj, config = null) {
    const myConfig = {
      cancelToken: new axios.CancelToken(function (cancel) {
        cancelTokenCollection[urlKey] = cancel
      }),
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json;charset=UTF-8'
        // 'userId': store.getters['sysInfo/getUserInfo'].id,
        // 'Authorization': store.getters['sysInfo/getToken'] || sessionStorage.getItem('token')
      },
      baseURL: basicServerUrl.indexOf(urlKey) > -1 ? uploadURL : baseURL
    }
    this._initServerBase(myConfig, api[urlKey])
    if (config) {
      if (config.headers) {
        myConfig.headers = Object.assign(myConfig.headers, config.headers)
      }

      if (config.baseURL) {
        myConfig.baseURL = config.baseURL
      }
    }

    // querystring.stringify(paramObj)
    return service.post(api[urlKey].path, paramObj, myConfig).then(res => {
      // console.log(`*************接口名:${api[urlKey].path}**************\n**************请求参数:${JSON.stringify(paramObj)}\n**************请求结果:${JSON.stringify(res)}\n`)
      // if (!res.data || res.data.code !== "001_0000") {
      //   console.warn(`接口名: ${api[urlKey].path}, 错误信息: ${JSON.stringify(res.data)}`);
      //   res.data.result=false;
      // }
      // else{
      //   res.data.result=true;
      // }
      return res
    }).catch((err) => {
      console.error(`接口名: ${api[urlKey].path}, 错误信息: \n`, JSON.stringify(err))
      return errorResult
    }).finally(() => {
    })
  },
  /**
   * put 请求
   * @param urlKey 对应API 中的urlkey
   * @param paramObj  发送ajax 传递的参数对象
   * @returns {promise} 返回promise对象
   */
  put(urlKey, paramObj, config = null) {
    const myConfig = {
      cancelToken: new axios.CancelToken(function (cancel) {
        cancelTokenCollection[urlKey] = cancel
      }),
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json;charset=UTF-8'
      // 'userId': store.getters['sysInfo/getUserInfo'].id,
      // 'Authorization': store.getters['sysInfo/getToken'] || sessionStorage.getItem('token')
      },
      baseURL: basicServerUrl.indexOf(urlKey) > -1 ? uploadURL : baseURL
    }
    this._initServerBase(myConfig, api[urlKey])
    if (config) {
      if (config.headers) {
        myConfig.headers = Object.assign(myConfig.headers, config.headers)
      }

      if (config.baseURL) {
        myConfig.baseURL = config.baseURL
      }
    }

    // querystring.stringify(paramObj)
    return service.put(api[urlKey].path, paramObj, myConfig).then(res => {
    // console.log(`*************接口名:${api[urlKey].path}**************\n**************请求参数:${JSON.stringify(paramObj)}\n**************请求结果:${JSON.stringify(res)}\n`)
    // if (!res.data || res.data.code !== "001_0000") {
    //   console.warn(`接口名: ${api[urlKey].path}, 错误信息: ${JSON.stringify(res.data)}`);
    //   res.data.result=false;
    // }
    // else{
    //   res.data.result=true;
    // }
      return res
    }).catch((err) => {
      console.error(`接口名: ${api[urlKey].path}, 错误信息: \n`, JSON.stringify(err))
      return errorResult
    }).finally(() => {
    })
  },
  /**
   * delete 请求
   * @param urlKey 对应API 中的urlkey
   * @param paramObj  发送ajax 传递的参数对象
   * @returns {promise} 返回promise对象
   */
  delete(urlKey, paramObj, config = null) {
    const myConfig = {
      cancelToken: new axios.CancelToken(function (cancel) {
        cancelTokenCollection[urlKey] = cancel
      }),
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json;charset=UTF-8'
      // 'userId': store.getters['sysInfo/getUserInfo'].id,
      // 'Authorization': store.getters['sysInfo/getToken'] || sessionStorage.getItem('token')
      },
      baseURL: basicServerUrl.indexOf(urlKey) > -1 ? uploadURL : baseURL
    }
    this._initServerBase(myConfig, api[urlKey])
    if (typeof paramObj === 'object') {
      myConfig.params = paramObj
    }
    if (config) {
      if (config.headers) {
        myConfig.headers = Object.assign(myConfig.headers, config.headers)
      }

      if (config.baseURL) {
        myConfig.baseURL = config.baseURL
      }
    }

    // querystring.stringify(paramObj)
    return service.delete(api[urlKey].path, myConfig).then(res => {
    // console.log(`*************接口名:${api[urlKey].path}**************\n**************请求参数:${JSON.stringify(paramObj)}\n**************请求结果:${JSON.stringify(res)}\n`)
    // if (!res.data || res.data.code !== "001_0000") {
    //   console.warn(`接口名: ${api[urlKey].path}, 错误信息: ${JSON.stringify(res.data)}`);
    //   res.data.result=false;
    // }
    // else{
    //   res.data.result=true;
    // }
      return res
    }).catch((err) => {
      console.error(`接口名: ${api[urlKey].path}, 错误信息: \n`, JSON.stringify(err))
      return errorResult
    }).finally(() => {
    })
  },
  /**
   * patch 请求
   * @param urlKey 对应API 中的urlkey
   * @param paramObj  发送ajax 传递的参数对象
   * @returns {promise} 返回promise对象
   */
  patch(urlKey, paramObj, config = null) {
    const myConfig = {
      cancelToken: new axios.CancelToken(function (cancel) {
        cancelTokenCollection[urlKey] = cancel
      }),
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json;charset=UTF-8',
        // 'userId': store.getters['sysInfo/getUserInfo'].id,
        'Authorization': store.getters['sysInfo/getToken'] || sessionStorage.getItem('token')
      },
      baseURL: basicServerUrl.indexOf(urlKey) > -1 ? uploadURL : baseURL
    }
    this._initServerBase(myConfig, api[urlKey])

    if (config) {
      if (config.headers) {
        myConfig.headers = Object.assign(myConfig.headers, config.headers)
      }
    }

    // querystring.stringify(paramObj)
    return service.patch(api[urlKey].path, paramObj, myConfig).then(res => {
      if (!res.data || res.data.code !== '001_0000') {
        console.warn(`接口名: ${api[urlKey].path}, 错误信息: ${res.data}`)
        res.data.result = false
      } else {
        res.data.result = true
      }
      return res.data
    }).catch((err) => {
      console.error(`接口名: ${api[urlKey].path}, 错误信息: \n`, JSON.stringify(err))
      return errorResult
    }).finally(() => {
    })
  },

  /**
   * export 导出
   * @param urlKey 对应API 中的urlkey
   * @param paramObj  传递的参数对象
   */
  // export (urlKey, paramObj) {
  //   return config.HOST + api[urlKey].path + (paramObj ? '?' + querystring.stringify(paramObj) : '')
  // },

  /**
   * 处理并发请求的助手函数
   * @param iterable  是一个可以迭代的参数如数组等
   */
  all(iterable) {
    return axios.all(iterable).then(
      axios.spread((...res) => {
        return res
      })
    )
  },

  /**
   * 终止 ajax 请求， 如 xhr 的 abort 方法
   * @param urlKey 对应API 中的urlkey
   */
  cancel(urlKey) {
    if (!cancelTokenCollection[urlKey]) {
      return
    }
    cancelTokenCollection[urlKey]()
  },

  /**
   * 读取服务器文件
   * @param file
   * @param callback
   */
  readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest()
    rawFile.overrideMimeType('application/json')
    rawFile.open('GET', file, true)
    rawFile.onreadystatechange = function () {
      if (rawFile.readyState === 4 && rawFile.status + '' === '200') {
        callback(rawFile.responseText)
      }
    }
    rawFile.send(null)
  },

  /**
   * 上传文件
   * @param urlKey
   * @param paramObj
   * @returns {*|promise}
   */
  uploadFile: function (urlKey, paramObj) {
    const myConfig = {
      cancelToken: new axios.CancelToken(function (cancel) {
        cancelTokenCollection[urlKey] = cancel
      }),
      headers: {
        'Content-Type': 'multipart/form-data',
        // 'userId': store.getters['sysInfo/getUserInfo'].id || sessionStorage.getItem('userId'),
        'Authorization': store.getters['sysInfo/getToken'] || sessionStorage.getItem('token')
      },
      baseURL: basicServerUrl.indexOf(urlKey) > -1 ? uploadURL : baseURL
    }
    return service.post(api[urlKey].path, paramObj, myConfig).then(res => {
      if (!res.data && typeof res.data === 'object' && res.data === 'error') {
        console.warn(`接口名: ${api[urlKey].path}, 错误信息: ${res.data}`)
      }
      return res.data
    }).catch((err) => {
      console.error(`接口名: ${api[urlKey].path}, 错误信息: `, err)
      return err
    })
  },

  /**
   * cb 返回图片地址,服务器数据集
   */
  uploadImg: function (file, cb) {
    let imageName = file.file.name
    if (imageName) {
      imageName = getUUID() + imageName.substring(imageName.lastIndexOf('.'))
    } else {
      imageName = getUUID() + '.png'
    }
    let imageType = file.file.type
    if (!imageType) {
      imageType = 'image/png'
    }
    const fileNew = new File([file.file], imageName, { type: imageType })
    const formData = new FormData() // 构造一个 FormData，把后台需要发送的参数添加
    formData.append('uploadFile', fileNew) // 接口需要传的参数
    const config = {
      // headers:{
      //   "Content-Type":"image/png",
      // },
      baseURL: process.env.VUE_APP_BASE_API,
      Authorization: Cookies.get('AuthenToken')
    }
    return this.post('UploadImg', formData, config)
      .then((res) => {
        console.log('uploadImg>>>' + JSON.stringify(res))
        if (typeof cb === 'function') {
          cb(res.data, res)
        }
        return res
      }).catch(error => {
        console.log('uploadImg error>>>' + JSON.stringify(error))
        if (typeof cb === 'function') {
          cb(null, error)
        }
        return error
      })
  },

  formatResult(result) {
    if (isObjectNull(result)) {
      return errorResult
    }
    if (result.code === '001_0000') {
      result.result = true
    } else {
      if (result.status === 404) {
        result.message = errorResult.message
      }
      result.result = false
    }

    return result
  }
}
export default ajax
