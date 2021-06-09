/**
 * Created by FF on 2020/11/24.
 */

/** ********************************************************** String字符串原型扩展方法 ************************************************************/

/**
 * 字符串转换为日期型（原型扩展或重载）
 * @returns {Date} 日期
 */
String.prototype.toDate = String.prototype.toDate || function () {
  var converted = Date.parse(this)
  var myDate = new Date(converted)
  if (isNaN(myDate)) {
    var arys = this.split('-')
    myDate = new Date(arys[0], --arys[1], arys[2])
  }
  return myDate
}

/**
 * yyyyMMdd格式的字符串转换为日期型（原型扩展或重载）
 * @returns {Date} 日期
 */
String.prototype.str2Date = String.prototype.str2Date || function () {
  var y = this.substr(0, 4)
  var m = parseInt(this.substr(4, 2)) - 1
  var d = this.substr(6, 2)
  var myDate = new Date(y, m, d)
  return myDate
}

/**
 * 检查是否含有utf16字符
 * @returns 如果是返回false，否则返回true
 */
String.prototype.isUtf16 = String.prototype.isUtf16 || function () {
  var re = /[\ud800-\udbff][\udc00-\udfff]/g
  var result = re.test(this)
  return result
}

/**
 * RGB转换为16进制
 * @returns {string}
 */
String.prototype.colorHex = String.prototype.colorHex || function () {
  // RGB颜色值的正则
  var reg = /^(rgb|RGB)/
  var color = this
  if (reg.test(color)) {
    var strHex = '#'
    // 把RGB的3个数值变成数组
    var colorArr = color.replace(/(?:\(|\)|rgb|RGB)*/g, '').split(',')
    // 转成16进制
    for (var i = 0; i < colorArr.length; i++) {
      var hex = Number(colorArr[i]).toString(16)
      if (hex === '0') {
        hex += hex
      }
      strHex += hex
    }
    return strHex
  } else {
    return String(color)
  }
}

/**
 * 16进制转换为RGB
 * @returns {string}
 */
String.prototype.colorRgb = String.prototype.colorRgb || function (opacity = 1) {
  // 16进制颜色值的正则
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
  // 把颜色值变成小写
  var color = this.toLowerCase()
  if (reg.test(color)) {
    // 如果只有三位的值，需变成六位，如：#fff => #ffffff
    if (color.length === 4) {
      var colorNew = '#'
      for (var i = 1; i < 4; i += 1) {
        colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1))
      }
      color = colorNew
    }
    // 处理六位的颜色值，转为RGB
    var colorChange = []
    for (var i = 1; i < 7; i += 2) {
      colorChange.push(parseInt('0x' + color.slice(i, i + 2)))
    }
    return 'RGB(' + colorChange.join(',') + ',' + opacity + ')'
  } else {
    return color
  }
}

/** ********************************************************** Array数组原型扩展方法 ************************************************************/

/**
 * 删除数组某个元素
 * @param val
 */
Array.prototype.remove = Array.prototype.remove || function(val) {
  var index = this.indexOf(val)
  if (index > -1) {
    this.splice(index, 1)
  }
}

/** ********************************************************** Date日期原型扩展方法 ************************************************************/

/**
 * 日期格式化（原型扩展或重载）
 * 格式 YYYY/yyyy/YY/yy 表示年份
 * MM/M 月份
 * W/w 星期
 * dd/DD/d/D 日期
 * hh/HH/h/H 时间
 * mm/m 分钟
 * ss/SS/s/S 秒
 * @param {formatStr} 格式模版
 * @type string
 * @returns 日期字符串
 */
Date.prototype.format = Date.prototype.format || function (formatStr) {
  var str = formatStr
  var Week = ['日', '一', '二', '三', '四', '五', '六']
  str = str.replace(/yyyy|YYYY/, this.getFullYear())
  str = str.replace(/yy|YY/, (this.getYear() % 100) > 9 ? (this.getYear() % 100).toString() : '0' + (this.getYear() % 100))
  str = str.replace(/MM/, (this.getMonth() + 1) > 9 ? (this.getMonth() + 1).toString() : '0' + (this.getMonth() + 1))
  str = str.replace(/M/g, this.getMonth() + 1)
  str = str.replace(/w|W/g, Week[this.getDay()])
  str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate())
  str = str.replace(/d|D/g, this.getDate())
  str = str.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString() : '0' + this.getHours())
  str = str.replace(/h|H/g, this.getHours())
  str = str.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes().toString() : '0' + this.getMinutes())
  str = str.replace(/m/g, this.getMinutes())
  str = str.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds().toString() : '0' + this.getSeconds())
  str = str.replace(/s|S/g, this.getSeconds())
  return str
}

Date.prototype.formatStr = Date.prototype.formatStr || function (formatStr, reg) {
  var str = new Date(parseInt(formatStr.replace('/Date(', '').replace(')/', ''), 10))
  const date = str.format(reg || 'yyyy-MM-dd hh:mm')

  return date
}

/**
 * 将指定的天数加到此实例的值上
 * @param value
 * @returns {Date}
 */
Date.prototype.addDays = Date.prototype.addDays || function (value) {
  var date = this.getDate()
  this.setDate(date + value)
  return this
},

/**
 * 将指定的星期数加到此实例的值上
 * @param value
 * @returns {Date}
 */
Date.prototype.addWeeks = Date.prototype.addWeeks || function (value) {
  return this.addDays(value * 7)
},

/**
 * 将指定的月份数加到此实例的值上
 * @param value
 * @returns {Date}
 */
Date.prototype.addMonths = Date.prototype.addMonths || function (value) {
  var month = this.getMonth()
  this.setMonth(month + value)
  return this
},

/**
 * 将指定的年份数加到此实例的值上
 * @param value
 * @returns {Date}
 */
Date.prototype.addYears = Date.prototype.addYears || function (value) {
  var year = this.getFullYear()
  this.setFullYear(year + value)
  return this
}

/**
 * 比较日期差（原型扩展或重载）
 * @param {strInterval} 日期类型:'y、m、d、h、n、s、w'
 * @param {dtEnd} 格式为日期型或者 有效日期格式字符串
 * @type int
 * @returns 比较结果
 */
Date.prototype.dateDiff = Date.prototype.dateDiff || function (strInterval, dtEnd) {
  var dtStart = this
  if (typeof dtEnd === 'string') { // 如果是字符串转换为日期型
    dtEnd = dtEnd.toDate()
  }
  switch (strInterval) {
    case 's' :
      return parseInt((dtEnd - dtStart) / 1000)
    case 'n' :
      return parseInt((dtEnd - dtStart) / 60000)
    case 'h' :
      return parseInt((dtEnd - dtStart) / 3600000)
    case 'd' :
      return parseInt((dtEnd - dtStart) / 86400000)
    case 'w' :
      return parseInt((dtEnd - dtStart) / (86400000 * 7))
    case 'm' :
      return (dtEnd.getMonth() + 1) + ((dtEnd.getFullYear() - dtStart.getFullYear()) * 12) - (dtStart.getMonth() + 1)
    case 'y' :
      return dtEnd.getFullYear() - dtStart.getFullYear()
  }
}

/** ********************************************************** Number数字原型扩展方法 ************************************************************/

/**
 * 数字格式变成货币数字格式
 * @returns
 */
Number.prototype.toCurrency = Number.prototype.toCurrency || function (point) {
  if (this) {
    var point = point !== undefined ? point : 2
    var minus = Number(this) < 0 ? '-' : ''
    var str = Math.abs(Number(this)).toFixed(point).toString()
    var pointNum = ''
    if (str.indexOf('.') !== -1) {
      pointNum = '.' + str.split('.')[1]
      str = str.split('.')[0]
    }
    var n = str.length % 3
    if (n) {
      return minus + str.slice(0, n) + str.slice(n).replace(/(\d{3})/g, ',$1') + pointNum
    } else {
      return minus + str.replace(/(\d{3})/g, ',$1').slice(1) + pointNum
    }
  } else {
    return this === 0 ? this : ''
  }
}

/**
 * 数字格式变成百分比格式
 * @returns 默认保留两位小数
 */
Number.prototype.toPercent = Number.prototype.toPercent || function () {
  if (this) {
    return (this * 100).toFixed(2) + '%'
  } else {
    return this === 0 ? '0.00%' : ''
  }
}

/**
 * 转换数字为货币格式
 * @param places 保留小数位数
 * @param symbol 货币前的符号（比如$,￥）
 * @param thousand 每3位数间隔的标志
 * @param decimal 小数点位置的符号，默认为"."可更改
 * @returns {string}
 */
Number.prototype.formatMoney = function (places, symbol, thousand, decimal) {
  places = !isNaN(places = Math.abs(places)) ? places : 2
  symbol = symbol !== undefined ? symbol : ''
  thousand = thousand || ','
  decimal = decimal || '.'
  var number = this
  var negative = number < 0 ? '-' : ''
  var i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + ''
  var j = (j = i.length) > 3 ? j % 3 : 0
  return symbol + negative + (j ? i.substr(0, j) + thousand : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : '')
}

/**
 * 数字补全-年月日
 * @param num Number
 * @returns 如果4 ,返回'04'
 */
Number.prototype.toNumber = function (num) {
  if (num < 10) {
    return `0${num}`
  } else {
    return `${num}`
  }
}

/** ********************************************************** Promise 原型扩展方法 ************************************************************/

// 无论promise对象最后状态如何都会执行
Promise.prototype.finally = Promise.prototype.finally || function (callback) {
  const P = this.constructor
  return this.then(
    value => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  )
}

/**
 * 图片压缩方法
 * @param {*} file 图片
 * @param {*} size 压缩大小，单位kb，1M = 1024
 * 返回 Promise 对象
 */
File.compressAccurately = function (file, size) {
  const imageConversion = require('image-conversion')
  const compressAccurately = function (item) {
    if (item.size / 1024 < size) {
      return Promise.resolve(item)
    } else {
      return imageConversion.compressAccurately(item, size)
    }
  }

  if (Array.isArray(file)) {
    const list = []
    for (let index = 0; index < file.length; index++) {
      const item = file[index]
      const prom = compressAccurately(item)
      list.push(prom)
    }
    return Promise.all(list)
  } else {
    return compressAccurately(file)
  }
}
