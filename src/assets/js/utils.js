export default {
  /**
   * 设置cookie信息
   * @param cname 键的名称
   * @param cvalue 键对应的值
   * @param exdays 保存时间(天数) (保存时间默认1天，不可以为0,'', null或undefine，会导致百度浏览器cookie没有存储token)
   */
  setCookie(cname, cvalue, exdays = 1) {
    var d = new Date()
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
    var expires = 'expires=' + d.toUTCString()
    document.cookie = cname + '=' + cvalue + '; path=/;' + expires
  },

  /**
   * 获取cookie信息
   * @param cname cookie存的键值
   * @returns {*}
   */
  getCookie(cname) {
    var ca = document.cookie.split(';')
    var cokies = []
    var obj = []
    for (var i = 0; i < ca.length; i++) {
      obj = ca[i].split('=')
      if (obj[0].replace(/(^\s*)|(\s*$)/g, '') === cname && obj[1]) {
        return obj[1]
      }
    }
    return ''
  },

  /**
   * 删除cookie
   * @param cname cookie存的键值
   */
  delCookie(cname) {
    this.setCookie(cname, '', -1)
  },

  /**
   * 当前浏览器检测:FF Chrome IE11 IE10 IE9  Edge
   * @returns {*}
   */
  getCurBrowser: function() {
    var webInfo = navigator.userAgent
    var chromeVendor = navigator.vendor
    if (webInfo.indexOf('OPR') !== -1) {
      return 'Opera'
    } else if (webInfo.indexOf('Edge') !== -1) {
      return 'Edge'
    } else if (webInfo.indexOf('Firefox') !== -1) {
      return 'FF'
    } else if (webInfo.indexOf('MSIE 9.0') !== -1) {
      return 'IE9'
    } else if (webInfo.indexOf('MSIE 10.0') !== -1) {
      return 'IE10'
    } else if (webInfo.indexOf('Trident') !== -1 && webInfo.indexOf('MSIE') === -1) {
      return 'IE11'
    } else if (
      (chromeVendor != '' &&
        chromeVendor != undefined &&
        chromeVendor != null &&
        chromeVendor.indexOf('Google') !== -1) ||
      webInfo.indexOf('Chrome') !== -1
    ) {
      return 'Chrome'
    } else if (webInfo.indexOf('Safari') !== -1) {
      return 'Safari'
    } else {
      return 'other'
    }
  },

  /**
   * 获取文件类型
   * @param fileName
   * @returns {*}
   */
  getFileType(fileName) {
    var extName = fileName.substr(fileName.lastIndexOf('.') + 1)
    switch (extName) {
      case 'txt':
        return 'txt'
      case 'rar':
        return 'rar'
      case 'zip':
        return 'zip'
      case 'doc':
      case 'docx':
        return 'doc'
      case 'ppt':
      case 'pptx':
        return 'ppt'
      case 'xls':
      case 'xlsx':
        return 'xls'
      case 'pdf':
        return 'pdf'
      case 'gif':
      case 'img':
      case 'jpeg':
      case 'jpg':
      case 'png':
      case 'svg':
        return 'img'
      default:
        return 'unKnown'
    }
  },

  /**
   * 获取文件类型对应的iconfont类名
   * @param fileName
   * @returns {*}
   */
  getFileTypeIcon(fileName) {
    var fileType = this.getFileType(fileName)
    var fileTypeIcon = {
      txt: 'icon-txt',
      rar: 'icon-rar',
      zip: 'icon-zip',
      doc: 'icon-word',
      ppt: 'icon-ppt',
      xls: 'icon-excel',
      pdf: 'icon-pdf',
      img: 'icon-pic',
      unKnown: 'icon-other-file'
    }
    return fileTypeIcon[fileType]
  },
  /**
   * 数字转中文(仅支持整数)
   * @param num String/Number
   */
  numberToChinese(num) {
    // 定义转换中文
    var chnNumChar = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
    var chnUnitSection = ['', '万', '亿', '万亿', '亿亿']
    var chnUnitChar = ['', '十', '百', '千']

    var section = parseInt(num) || 0

    var strIns = ''
    var chnStr = ''
    var unitPos = 0
    var zero = true
    while (section > 0) {
      var v = section % 10
      if (v === 0) {
        if (!zero) {
          zero = true
          chnStr = chnNumChar[v] + chnStr
        }
      } else {
        zero = false
        strIns = chnNumChar[v]
        strIns += chnUnitChar[unitPos]
        chnStr = strIns + chnStr
      }
      unitPos++
      section = Math.floor(section / 10)
    }
    return chnStr
  },
  /**
   * 兼容360兼容模式的onresize事件绑定
   * @param {function} callback 业务代码函数回调
   * @param {object} option 一些选项，option.inherit：是否需要继承已有的onresize
   */
  compatible360Resize(callback, option = {}) {
    // 缓存之前存在的 window.onresize
    const prevFunc = window.onresize

    // 避免360兼容模式resize失效
    let resize360Timer = null
    let resizeFucCache = null
    let resizeReady = false

    window.onresize = ev => {
      // 如果需要继承以前的resize则继承调用
      if (option.inherit && prevFunc) prevFunc(ev)

      // 业务代码...
      callback()

      // 兼容360安全模式兼容模式 onresize
      if (!resizeReady) {
        if (resize360Timer) {
          clearTimeout(resize360Timer)
        }
        resize360Timer = setTimeout(() => {
          window.onresize = resizeFucCache
          resizeReady = true
        }, 250)
      }
    }

    // 避免360兼容模式resize失效
    resizeFucCache = window.onresize
  },

  // 经纬度转换成三角函数中度分表形式。
  rad(d) {
    return (d * Math.PI) / 180.0
  },

  // 根据经纬度计算距离，参数分别为第一点的纬度，经度；第二点的纬度，经度
  getDistance(lat1, lng1, lat2, lng2) {
    const radLat1 = this.rad(lat1)
    const radLat2 = this.rad(lat2)
    const a = radLat1 - radLat2
    const b = this.rad(lng1) - this.rad(lng2)
    let s =
      2 *
      Math.asin(
        Math.sqrt(
          Math.pow(Math.sin(a / 2), 2) +
            Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)
        )
      )
    s = s * 6378.137 // EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000 // 输出为公里

    const distance = s
    let distance_str = ''

    if (parseInt(distance) >= 1) {
      distance_str = distance.toFixed(1) + 'km'
    } else {
      distance_str = parseInt(distance * 1000) + 'm'
    }

    // console.info('lyj 距离是', s);
    // console.info('lyj 距离是', distance_str);
    return distance_str
  },

  // 根据经纬度计算距离，参数分别为第一点的纬度，经度；第二点的纬度，经度
  getDistancem(lat1, lng1, lat2, lng2) {
    const radLat1 = this.rad(lat1)
    const radLat2 = this.rad(lat2)
    const a = radLat1 - radLat2
    const b = this.rad(lng1) - this.rad(lng2)
    let s =
      2 *
      Math.asin(
        Math.sqrt(
          Math.pow(Math.sin(a / 2), 2) +
            Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)
        )
      )
    s = s * 6378.137 // EARTH_RADIUS;
    s = Math.round(s * 10000)

    const distance = s
    return distance
  },

  // 将秒转化为年月日
  getDateStr(seconds) {
    var date = new Date(seconds * 1000)
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    if (month < 10) month = '0' + month
    var day = date.getDate()
    if (day < 10) day = '0' + day
    var currentTime = year + '-' + month + '-' + day
    return currentTime
  }
}
