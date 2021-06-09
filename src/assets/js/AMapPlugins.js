'use strict'

import { appInPlatform } from '@/assets/js/commH5'
import { fixFloat } from '@/assets/js/NumberUtil'
import * as dd from 'dingtalk-jsapi'

/**
* 定位
* time 定位的超时时间
*/
export function GdLocation(opt, cb) {
  return new Promise(function (resolve, reject) {
    const platform = appInPlatform()
    if (platform === 'H5InOnTap') { // H5在Ontap中定位
      console.log('未支持')
    } else {
      dd.device.geolocation.get({
        targetAccuracy: 500, // 定位精度
        coordinate: 1, // 1：获取高德坐标；0：获取标准坐标；推荐使用高德坐标；标准坐标没有 address 字段
        withReGeocode: true,
        useCache: false, // 默认是true，如果需要频繁获取地理位置，请设置false
        onSuccess: function(result) {
          // alert("定位结果"+JSON.stringify(result))
          const ret = { success: {
            Net_Type: result.netType,
            Loc_Type: '',
            latitude: fixFloat(result.latitude, 6, false),
            longitude: fixFloat(result.longitude, 6, false),
            radius: fixFloat(result.accuracy, 0, false),
            province: result.province,
            city: result.city,
            district: result.district,
            addrDetail: result.address,
            addr: result.province + result.city + result.district + result.road + '(不要用这个)'
            // longitude : Number,
            // latitude : Number,
            // accuracy : Number,
            // address : String,
            // province : String,
            // city : String,
            // district : String,
            // road : String,
            // netType : String,
            // operatorType : String,
            // errorMessage : String,
            // errorCode : Number,
            // isWifiEnabled : Boolean,
            // isGpsEnabled : Boolean,
            // isFromMock : Boolean,
            // provider : wifi|lbs|gps,
            // isMobileEnabled : Boolean
          }}
          console.log('*************定位onSuccess：' + JSON.stringify(ret))
          resolve(ret)
          if (typeof cb === 'function') cb(null, ret.success)
        },
        onFail: function(err) {
          console.log('*************定位onFail：' + JSON.stringify(err))
          const ret = { success: {}, error: err }
          reject(err)
          if (typeof cb === 'function') cb(ret.error, null)
        }
      })
    }
  })
}

let isLocating = false
/**
 * 定位
 * cb回调返回
 */
export function locationWithType(type, cb) {
  const error = null
  const opt = {
    'latitude': 0,
    'longitude': 0
  }
  if (appInPlatform() === '') { // WEB端
    cb(error, { Net_Type: '', Loc_Type: '', latitude: '28.1974770', longitude: '112.9953900', radius: 500,
      province: '湖南省', city: '长沙市', district: '芙蓉区',
      addrDetail: '长沙市一号坐品',
      addr: '长沙市一号坐品(不要用这个)',
      info: '测试返回_长沙市一号坐品' })
    // cb(error, { Net_Type: '', Loc_Type: '', latitude: '31.232454', longitude: '121.476607', radius: 500,
    //   province: '上海市', city: '上海市', district: '黄浦区',
    //   addrDetail: '上海市来福士广场',
    //   addr: '上海市来福士广场(不要用这个)',

    //   info: '测试返回_上海市来福士广场' })
    return
  }
  if (isLocating) {
    console.log('--- is locating ---')
    //   this.latitude = "正在定位...";
    //   this.longitude = "正在定位...";
    // error=LocationResultType.InLocation;
    // cb(error,opt);
  } else {
    isLocating = true
    GdLocation({ time: 30 }, null)
      .then(ret => {
        console.log('zzlocation ret.latitude = ', ret.success.latitude)
        isLocating = false

        cb(error, ret.success)
      })
      .catch(error => {
        console.log('zzlocation errorcode = ', error.code)
        isLocating = false
        if (error.code === '160020') {
          //  "定位权限未开启"
        }
        cb(error, opt)
      })
  }
}
