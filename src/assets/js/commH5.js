import router from '@/router'
import * as dd from 'dingtalk-jsapi'
import detectFace from 'dingtalk-jsapi/api/biz/ATMBle/detectFace'
/**
 * 当前H5运行在哪个环境下
 * H5InDD=钉钉,H5InOnTap=Ontap,""=web
 */
export function appInPlatform() {
  // alert(process.env.NODE_ENV);
  const wjb = typeof WebViewJavascriptBridge
  const wjbFlag = wjb != undefined && wjb != 'undefined'
  if (dd.env.platform != 'notInDingTalk') {
    return 'H5InDD'
  } else if (wjbFlag && WebViewJavascriptBridge.env_platform === 'OntapInAPP') {
    return 'H5InOnTap'
  } else {
    return ''// web
  }
}
/**
 * 框架核心方法(钉钉H5相关)
 */
export default {
  /**
   * 是否使用自己的顶部标题栏
   * @returns
   */
  isUseNavApp() {
    const app = appInPlatform()
    if (app === '') {
      return true
    } else {
      return false
    }
  },
  /**
   * 当前H5运行在哪个环境下
   * appFromDD=钉钉,appFromOnTap=Ontap,""=web
   */
  appInPlatform() {
    const wjb = typeof WebViewJavascriptBridge
    const wjbFlag = wjb != undefined && wjb != 'undefined'
    if (dd.env.platform != 'notInDingTalk') {
      return 'H5InDD'
    } else if (wjbFlag && WebViewJavascriptBridge.env_platform === 'OntapInAPP') {
      return 'H5InOnTap'
    } else {
      return ''// web
    }
  },
  /**
     * 当前页面标题
     * @param {*} title
     */
  setTitle(title) {
    try {
      window.document.title = title
      if (appInPlatform() === 'H5InDD') {
        dd.biz.navigation.setTitle({
          title: title
        })
      }
    } catch (error) {
      console.log('error:setTitle' + error)
    }
  },
  /**
     * 恢复顶部右边按钮
     */
  setTopRightReset() {
    dd.biz.navigation.setRight({ show: false })
  },
  /**
     * 顶部右边按钮
     * @param {*} opt {text:按钮名}
     */
  setTopRight(opt, cb) {
    const optDef = {
      show: true,
      control: true,
      text: '按钮名',
      onSuccess: (result) => {
        if (typeof cb === 'function') cb(null, result)
      },
      onFail: (err) => {
        if (typeof cb === 'function') cb(err, null)
      }
    }
    Object.assign(optDef, opt)
    dd.biz.navigation.setRight(optDef)
  },
  /** 扫描二维码 */
  scanQR(cb) {
    return new Promise(function (resolve, reject) {
      dd.biz.util.scan({
        type: 'qrCode', // type 为 all、qrCode、barCode，默认是all。
        onSuccess: function (data) {
          // onSuccess将在扫码成功之后回调
          /* data结构
                      { 'text': String}
                    */
          resolve(data.text)
          if (typeof cb === 'function') cb(null, data.text)
        },
        onFail: function (err) {
          reject(err)
          if (typeof cb === 'function') cb(err, null)
        }
      })
    })
  },
  /** 钉钉拍照，测试使用 */
  uploadImageFromCamera(cb) {
    return new Promise(function (resolve, reject) {
      dd.biz.util.uploadImageFromCamera({
        onSuccess: function (result) {
          resolve(result)
          if (typeof cb === 'function') cb(null, result)
        },
        onFail: function (err) {
          reject(err)
          if (typeof cb === 'function') cb(err, null)
        }
      })
    })
  },
  /** 钉钉关闭 */
  navigationClose() {
    return new Promise((resolve, reject) => {
      if (this.isUseNavApp()) {
        router.go(-1)
      } else {
        dd.biz.navigation.close({
          onSuccess: function (result) {
            resolve(result)
          },
          onFail: function (err) {
            reject(err)
          }
        })
      }
    })
  },
  /** 钉钉返回 */
  goBack() {
    return new Promise((resolve, reject) => {
      if (this.isUseNavApp()) {
        router.go(-1)
      } else {
        dd.biz.navigation.goBack({
          onSuccess: function (result) {
            resolve(result)
          },
          onFail: function (err) {
            reject(err)
          }
        })
      }
    })
  },
  navigationSetMenu(items, onSuccess, onFail) {
    dd.biz.navigation.setMenu({
      items: items,
      onSuccess: onSuccess,
      onFail: onFail
    })
  },
  openLink(url) {
    if (this.isUseNavApp()) {
      window.location.href = url
    } else {
      dd.ready(() => {
        dd.biz.util.openLink({ url })
      })
    }
  },
  /** 钉钉用户信息 */
  getDingUserInfo() {
    return new Promise((resolve, reject) => {
      console.log('created=getDingUserInfo=222')
      dd.biz.user.get({ // 获取钉钉用户信息
        onSuccess: (info) => {
          console.log('created=getDingUserInfo=2.1')
          resolve(info)
          console.log('钉钉鉴权dd.biz.usersuccess:' + JSON.stringify(info))
        },
        onFail: (err) => {
          console.log('created=getDingUserInfo=3')
          reject(err)
          console.log('钉钉鉴权dd.biz.usererror:' + JSON.stringify(err))
        }
      })
    })
  },
  /** 人脸识别 */
  startDingFace(hasFace, ddUserInfo, appId, needFacePose) {
    const corpId = process.env.VUE_APP_DD_CORPID
    const userId = ddUserInfo.emplId
    console.log(`startFace...corpId:${corpId},appId:${appId},userId:${userId}`)
    return new Promise((resolve, reject) => {
      detectFace({
        corpId: corpId,
        userId: userId,
        appId: appId,
        hasFace: hasFace, // 当前是否已录入人脸
        needBeauty: false, // 是否需要美颜
        needFacePose: needFacePose, // 是否需要活体检测
        spaceTitle: '人脸识别',
        onFail: (err) => {
          // photoStatus=1:人脸验证/录入成功 2:人脸验证/录入失败
          // 3:动作活体验证通过（在系统识别到作弊后会转为动作活体验证）（取 1或3 作为结果判断是否验证通过）
          // :{ "photoStatus": 1, "faceSessionId": "25122329d7c42af99c3f2aab13d04662" }
          console.log('startFace.detectFace onFail:' + JSON.stringify(err))
          reject(err)
        },
        onSuccess: (res) => {
          console.log('startFace.detectFace onSuccess:' + JSON.stringify(res))
          resolve(res)
        }
      }).catch(err => {
        console.log('startFace.detectFace onFail:' + JSON.stringify(err))
        reject(err)
      })
    })
  },
  /** 跳转到地图 */
  startToMap(longitude, latitude, title) {
    dd.biz.map.view({
      latitude: latitude, // 纬度，非必须
      longitude: longitude, // 经度，非必须
      title: title,
      onSuccess: function (res) {
        console.log('startMap onFail:' + JSON.stringify(res))
      },
      onFail: function (err) {
        console.log('startMap onFail:' + JSON.stringify(err))
      }
    }).catch(err => {
      console.log('startMap catch:' + JSON.stringify(err))
    })
  },
  /** 是否iphone */
  isPhone() {
    // const flag = /webOS|iPhone|iPad|BlackBerry|Windows/i.test(navigator.userAgent)
    const flag = /iPhone|iPad|ios/i.test(navigator.userAgent)
    return flag
  },
  /** 是否Android */
  isAndroid() {
    const flag = /Android|android/i.test(navigator.userAgent)
    return flag
  },

  /** 弹出toast和vant单例toast区分 */
  utToastShow(_this, opt) {
    try {
      this.appVue(_this).utToast(opt)
    } catch (err) {
      console.error('>>>>>>err' + err)
      console.error('>>>>>>err1' + _this)
      console.error('>>>>>>err2' + _this.$parent)
      console.error('>>>>>>err3' + _this.$parent.$parent)
      console.error('>>>>>>err4' + _this.$parent.$parent.$parent)
      console.error('>>>>>>err', this.appVue(_this))
      console.error('>>>>>>err' + this.appVue(_this).data)
    }
  },
  /** 得到app.vue实例，必须在vue页面使用 */
  appVue(_this) {
    return _this.$parent.$parent
  },
  /** 手机震动 */
  startVibrate() {
    console.log('手机开始震动')
    dd.device.notification.vibrate({
      duration: 300, // 震动时间，android可配置 iOS忽略
      onSuccess: function(result) {
      },
      onFail: function(err) {}
    })
  }
}

