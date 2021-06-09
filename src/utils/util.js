/*
 * @Author: wangjun
 * @Date: 2021-03-09 11:44:47
 * @LastEditors: your name
 * @LastEditTime: 2021-03-09 11:54:26
 * @Description: file content
 */
// 数字强制转为2位数,如1为01
export function formatNumber(number) {
  number = number.toString()
  return number[1] ? number : '0' + number
}
// 获取当前时间 返回格式 map,
// date为时间(new Date()),n为负数表示几天前,n为正数表示几天后
export function formatTime(date, n) {
  if (n) {
    date.setDate(date.getDate() + n)
  }
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  const weekDayIndex = date.getDay()
  let weekDayStr = ''
  switch (weekDayIndex) {
    case 0:
      weekDayStr = '星期日'
      break
    case 1:
      weekDayStr = '星期一'
      break
    case 2:
      weekDayStr = '星期二'
      break
    case 3:
      weekDayStr = '星期三'
      break
    case 4:
      weekDayStr = '星期四'
      break
    case 5:
      weekDayStr = '星期五'
      break
    case 6:
      weekDayStr = '星期六'
      break
  }
  let festStr = ''
  const fesvIndex = [month, day].map(formatNumber).join('')
  var fesvJson = {
    '0101': '元旦',
    '0214': '情人节',
    '0308': '妇女节',
    '0312': '植树节',
    '0315': '消费者权益日',
    '0401': '愚人节',
    '0501': '劳动节',
    '0504': '青年节',
    '0512': '护士节',
    '0601': '儿童节',
    '0701': '建党节',
    '0801': '建军节',
    '0910': '教师节',
    '0928': '孔子诞辰',
    '1001': '国庆节',
    '1006': '老人节',
    '1024': '联合国日',
    '1224': '平安夜',
    '1225': '圣诞节'
  }
  if (fesvJson[fesvIndex]) {
    festStr = fesvJson[fesvIndex]
  }
  return {
    year: year,
    month: month,
    day: day,
    hour: hour,
    minute: minute,
    second: second,
    weekDayIndex: weekDayIndex,
    weekDayStr: weekDayStr,
    festStr: festStr
  }
}

// 获取当前日期,返回格式为 yy-mm-dd,
// 参数date 为new Date(),n为负数表示几天前,n为正数表示几天后
export function formatDateStr(date, n, m) {
  if (n) {
    // n > 0 || n == 0 ? date => date + seconds : date => date - seconds
    date.setDate(date.getDate() + n)
  }
  if (m) {
    date.setHours(date.getHours(), date.getMinutes() + parseFloat(m))
  }
  // console.log(date)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join('-')
}

// 获取当前日期,返回格式为 yy-mm-dd hh:mm:ss,
export function formatDateTimeStr(date, n) {
  if (n) {
    date.setDate(date.getDate() + n)
  }
  const year = formatNumber(date.getFullYear())
  const month = formatNumber(date.getMonth() + 1)
  const day = formatNumber(date.getDate())

  const hour = formatNumber(date.getHours())
  const minute = formatNumber(date.getMinutes())
  const second = formatNumber(date.getSeconds())
  return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
}

// 将日期转为 'x月x日 周x'
export function formatDate(date, n) {
  if (n) {
    date.setDate(date.getDate() + n)
  }
  const month = date.getMonth() + 1
  const day = date.getDate()
  const weekDayIndex = date.getDay()
  let weekDayStr = ''
  switch (weekDayIndex) {
    case 0:
      weekDayStr = '周日'
      break
    case 1:
      weekDayStr = '周一'
      break
    case 2:
      weekDayStr = '周二'
      break
    case 3:
      weekDayStr = '周三'
      break
    case 4:
      weekDayStr = '周四'
      break
    case 5:
      weekDayStr = '周五'
      break
    case 6:
      weekDayStr = '周六'
      break
  }
  return `${month}月${day}日 ${weekDayStr}`
}

export function handleDate(date) {
  const divisionLine = '-'
  // console.log(date)
  const year = date.getFullYear()
  let month = date.getMonth() + 1
  let strDate = date.getDate()
  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate
  }
  return year + divisionLine + month + divisionLine + strDate
}

export function handleDateWeek(date) {
  let week = ''
  const day = date.getDay()
  if (day === 1) {
    week = '星期一'
  } else if (day === 2) {
    week = '星期二'
  } else if (day === 3) {
    week = '星期三'
  } else if (day === 4) {
    week = '星期四'
  } else if (day === 5) {
    week = '星期五'
  } else if (day === 6) {
    week = '星期六'
  } else {
    week = '星期日'
  }
  return week
}

export function stringToDate(dateStr, separator) {
  if (!separator) {
    separator = '-'
  }
  var dateArr = dateStr.split(separator)
  var year = parseInt(dateArr[0])
  var month
  // 处理月份为04这样的情况
  if (dateArr[1].indexOf('0') === 0) {
    month = parseInt(dateArr[1].substring(1))
  } else {
    month = parseInt(dateArr[1])
  }
  var day = parseInt(dateArr[2])
  var date = new Date(year, month - 1, day)
  return date
}

export function isNumber(val) {
  var Ival = val || 0
  var regPos = /^\d+(\.\d+)?$/ // 非负浮点数
  var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/ // 负浮点数
  if (regPos.test(Ival) || regNeg.test(Ival)) {
    return true
  } else {
    return false
  }
}
/** 图片压缩大小（KB） */
export const CompressAccuratelyFizeSize = 500
/**
* 图片压缩方法
* @param {*} file 图片
* @param {*} size 压缩大小，单位kb，1M = 1024
* 返回 Promise 对象
*/
export function compressAccurately(file, size) {
  const imageConversion = require('image-conversion')
  const compressAccuratelys = function (item) {
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
      const prom = compressAccuratelys(item)
      list.push(prom)
    }
    return Promise.all(list)
  } else {
    return compressAccuratelys(file)
  }
}

/** 获取URL中?后的所有参数 */
export function urlParams() {
  const url = window.location.href
  const theRequest = {}
  const idx = url.indexOf('?')
  if (idx !== -1) {
    const str = url.substr(idx + 1)
    const strs = str.split('&')
    for (let i = 0; i < strs.length; i++) {
      const objK = strs[i].split('=')[0]
      const objV = decodeURIComponent(strs[i].split('=')[1])
      theRequest[objK] = objV
    }
  }
  return theRequest
}

// 渠道、业态数据处理
export function listToData(list, pId, id, name, leve) {
  const obj = {}
  const slist = []
  let maxLevel = 0
  let minLevel = 100
  list.forEach(item => {
    const section = obj[item[id]] || {}
    section.id = item[id]
    section.text = item[name]
    section.level = item[leve]
    obj[item[id]] = section
    if (maxLevel < item[leve]) {
      maxLevel = item[leve]
    }
    if (minLevel > item[leve]) {
      minLevel = item[leve]
    }

    const section1 = obj[item[pId]] || { children: [] }
    if (!section1.children) {
      section1.children = []
    }
    section1.children.push(section)
    obj[item[pId]] = section1
    slist.push(section)
  })
  const rList = []
  for (let i = 0; i < slist.length; i++) {
    const item = slist[i]
    if (item.level !== maxLevel && !item.children) {
      let slevel = item.level
      let sItem = item
      while (slevel < maxLevel) {
        sItem.children = [{ text: '' }]
        slevel++
        sItem = sItem.children[0]
      }
    }
    if (item.level === minLevel) {
      rList.push(item)
    }
  }
  return rList
}
