
// 当前使用的时区  根据使用地区修改  8代表东八区
const Offset = 8
export const DbTimeFormat = 'YYYY-MM-DDTHH:mm:ss.SSSZZ'
export const YmdFormat = 'YYYY-MM-DD'
export const YmFormat = 'YYYY-MM'
export const YmFormat2 = 'YYYYMM'
export const MdFormat = 'MM-DD'
export const BzFormat = 'YYYY-MM-DD HH:mm:ss'
export const TimeFormat = 'HH:mm'
export const HmsFormat = 'HH:mm:ss'
export const YmdFormat2 = 'YYYYMMDD'
export const YmdHmFormat = 'YYYY-MM-DD HH:mm'

export const YmdFormatX = 'YYYY/MM/DD'

export const WeekEnName = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
export const WeekCnName = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']

import moment from 'moment';

/*
 获取当前和数据库格式一样的当前时间
 time 需要转换的时间 可以不传
*/
export function getTimeForDb (time) {
  let date
  if (time === undefined || time == null) { date = moment() } else { date = moment(time) }
  const str = date.utcOffset(0).format(DbTimeFormat)
  return str
}

/*
获取指定格式的时间  时区为当前系统时区
time  时间类 或者标准格式的string
可以传空
format "YYYY-MM-DD'T'HH:mm:ss.SSSZZ"
*/
export function getTimeFormFormat (time, format) {
  let date
  if (time === undefined || time == null) { date = moment() } else { date = moment(time) }
  const str = date.format(format)
  return str
}

/*
获取年月日的时间  时区为当前系统时区
time  时间类 或者标准格式的string
可以传空
*/
export function getYmdStrFormDate (time) {
  return getDateOffset(time, YmdFormat, Offset)
}
/*
获取数据库时间 转成 年月日十分秒的时间
*/
export function getFormatDBFormat (time, format) {
  return getDateOffset(time, format, Offset)
}
/*
获取数据库时间 转成 年月日十分秒的时间
*/
export function getFormatDB (time) {
  return getDateOffset(time, 'YYYY-MM-DD HH:mm:ss', Offset)
}
/*
获取指定格式的时间  时区为指定时区
time  时间类 或者标准格式的string 2018-09-09T16:00:00.000+0000
可以传空
format "YYYY-MM-DD'T'HH:mm:ss.SSSZZ"
offset 时区8代表东八区  -8代表西八区
*/
export function getDateOffset (time, format, offset) {
  let date
  if (time === undefined || time == null) { date = moment() } else { date = moment(time) }
  if (offset == null || offset == undefined) { offset = Offset }
  const str = date.utcOffset(offset * 60).format(format)
  return str
}

/**
 *
 * @param {*} time 时间可以为空
 * @param {*} num 加减的数值
 * @param {*} type 加减的类型      简写也可以传这个
 * years        年                   Y
 * quarters     季度                  Q
 * months       月                   M
 * weeks        周                   w
 * days         天                   d
 * hours        小时                  h
 * minutes      分钟                  m
 * seconds      秒                   s
 * milliseconds 毫秒                  ms
 */
export function add (time, num, type) {
  let date
  if (time === undefined || time == null) { date = moment() } else { date = moment(time) }
  date.add(num, type)

  return date.toDate()
}

// 获取Date对象
export function getDate (time, format) {
  let date
  if (format === undefined || format == null) { date = moment(time) } else { date = moment(time, format) }
  return date.toDate()
}

// 从数据库的时间获取Date对象
export function getDateFromDbTime (time) {
  return getDate(time, DbTimeFormat)
}

/**
 * 根据时区获取当前的年月日 去掉了时分秒
 * @param {*} time 传入Date
 */
export function getDateYmd (time) {
  const ttt = moment(time).utcOffset(Offset).startOf('day').toDate()

  return ttt
}

/**
 *  获取Date对象相差数 支持小时 分钟 秒 毫秒
 * 天要另外写方法
 * 传入date 对象
 * 返回time1-time2
 @param {*} type 加减的类型      简写也可以传这个
 * hours        小时                  h
 * minutes      分钟                  m
 * seconds      秒                   s
 * milliseconds 毫秒                  ms
 */
export function getDateCha (time1, time2, type) {
  const m1 = moment(time1)
  const m2 = moment(time2)
  const cha = moment.duration(m1 - m2, 'ms')
  switch (type) {
    case 'h':
    case 'hours':
      return cha.asHours()
    case 'm':
    case 'minutes':
      return cha.asMinutes()
    case 's':
    case 'seconds':
      return cha.asSeconds()
    case 'ms':
    case 'milliseconds':
      return cha.asMilliseconds()
  }
}

/**
 *  获取Date对象相差实际天数
 * 传入date 对象
 * 返回相差天数
 */
export function getDateChaYmd (time1, time2) {
  time1 = getDateYmd(time1)
  time2 = getDateYmd(time2)
  const m1 = moment(time1)
  const m2 = moment(time2)
  const cha = moment.duration(m1 - m2, 'ms')
  return cha.asDays()
}

/**
 * 获取本周开始时间  标准格式
 * 返回的是0时区的时间字符串
 */
export function getStartOfWeek (date) {
  const ttt = moment(date).startOf('isoWeek').toDate()
  return getTimeForDb(getDateYmd(ttt))
}

/**
 * 计算时、分时间差（相差分钟）
 */
export function timeDifference (startTime, endTime) {
  var start1 = startTime.split(':')
  var startAll = parseInt(start1[0] * 60) + parseInt(start1[1])

  var end1 = endTime.split(':')
  var endAll = parseInt(end1[0] * 60) + parseInt(end1[1])

  return timeDifference(endAll - startAll)
}

/**
 * 获取本周结束时间  标准格式
 * 返回的是0时区的时间字符串
 */
export function getEndOfWeek (date) {
  let ttt = moment(date).startOf('isoWeek').toDate()
  ttt = add(ttt, 7, 'd')
  return getTimeForDb(getDateYmd(ttt))
}

/**
 * 获取本周开始时间  年月日
 */
export function getStartOfWeekYmd (date) {
  const ttt = moment(date).startOf('isoWeek').toDate()
  return getTimeFormFormat(ttt, YmdFormat)
}

/**
 * 获取本周结束时间  年月日
 */
export function getEndOfWeekYmd (date) {
  const ttt = moment(date).endOf('isoWeek').toDate()
  return getTimeFormFormat(ttt, YmdFormat)
}

/**
 * 获取本月开始时间  年月日时分秒
 */
export function getStartOfMonth (time) {
  let date
  if (time === undefined || time == null) { date = moment() } else { date = moment(time) }
  date = moment(date).startOf('month').toDate()
  return getTimeForDb(getDateYmd(date))
}

/**
 * 获取本月结束时间  年月日时分秒
 */
export function getEndOfMonth (time) {
  let date
  if (time === undefined || time == null) { date = moment() } else { date = moment(time) }
  date = moment(date).endOf('month').toDate()
  return getTimeForDb(getDateYmd(date))
}
/**
 * 获取本月开始时间  年月日
 */
export function getStartOfMonthYmd (time) {
  let date
  if (time === undefined || time == null) { date = moment() } else { date = moment(time) }
  const str = date.startOf('month').format(YmdFormat)
  return str
}

export function getEndOfMonthYmd (time) {
  let date
  if (time === undefined || time == null) { date = moment() } else { date = moment(time) }
  const str = date.endOf('month').format(YmdFormat)
  return str
}
export function getCNWeek (time) {
  let str = time.replace('Monday', '星期一')
  str = str.replace('Tuesday', '星期二')
  str = str.replace('Wednesday', '星期三')
  str = str.replace('Thursday', '星期四')
  str = str.replace('Friday', '星期五')
  str = str.replace('Saturday', '星期六')
  str = str.replace('Sunday', '星期日')

  return str
}

/**
 * 时间差（1天5时26分30秒）
 * @param {*} time1
 * @param {*} time2
 */
export function dateDiff (time1, time2, language) {
  const m1 = moment(time1)
  const m2 = moment(time2)
  const TotalMilliseconds = moment.duration(m1 - m2, 'ms')
  const timeSpan = {}
  timeSpan.Days = parseInt(TotalMilliseconds / 1000 / 60 / 60 / 24)
  timeSpan.TotalHours = parseInt(TotalMilliseconds / 1000 / 60 / 60) + ''
  timeSpan.Hours = timeSpan.TotalHours % 24
  timeSpan.TotalMinutes = parseInt(TotalMilliseconds / 1000 / 60)
  timeSpan.Minutes = timeSpan.TotalMinutes % 60 + ''
  timeSpan.TotalSeconds = parseInt(TotalMilliseconds / 1000)
  timeSpan.Seconds = timeSpan.TotalSeconds % 60
  timeSpan.TotalMilliseconds = TotalMilliseconds
  timeSpan.Milliseconds = TotalMilliseconds % 1000
  let diffstr = ''
  if (!language) {
    language = { day: '天', hour: '时', minute: '分', seconds: '秒' }
  }
  if (timeSpan.Days > 0) {
    diffstr += `${timeSpan.Days}` + language.day
  }
  if (timeSpan.Hours > 0) {
    diffstr += `${timeSpan.Hours}` + language.hour
  }
  if (timeSpan.Minutes > 0) {
    diffstr += `${timeSpan.Minutes}` + language.minute
  }
  if (timeSpan.Seconds > 0) {
    diffstr += `${timeSpan.Seconds}` + language.seconds
  }
  return diffstr
}

/**
 * ckWeekDay是否和weekBaseDate在同一周
 * @param {*} weekBaseDate 为周的基准
 * @param {*} ckWeekDay
 */
export function isThisWeek (weekBaseDate, ckWeekDay) {
  const start = getStartOfWeek(weekBaseDate)
  const end = getEndOfWeek(weekBaseDate)
  const day = moment(ckWeekDay, DbTimeFormat)
  console.log('>>>>>>>>isThisWeek##weekBaseDate=' + weekBaseDate + '=start=' + start + '=start=' + end + '=ckWeekDay=' + ckWeekDay + '==' + day.isBetween(start, end))
  return day.isBetween(start, end)
}

/*
 判断ckWeekDay是否在weekBaseDate所属这一周(判断是否是同一周)
 *weekBaseDate 基准日期
 *ckWeekDay 需要判断的日期
*/
export function isSameWeekYmd (weekBaseDate, ckWeekDay) {
  const start = getStartOfWeekYmd(weekBaseDate)
  const end = getEndOfWeekYmd(weekBaseDate)
  const curDay = getTimeFormFormat(ckWeekDay, YmdFormat)
  if (getDateChaYmd(start, curDay) <= 0 && getDateChaYmd(end, curDay) >= 0) {
    return true
  } else {
    return false
  }
}

/*
 *判断ckWeekDay是否在weekBaseDate所属这一个月(判断是否在同一个月份)
 *weekBaseDate 基准日期
 *ckWeekDay 需要判断的日期
*/
export function isSameMonthYmd (weekBaseDate, ckWeekDay) {
  const start = getStartOfMonthYmd(weekBaseDate)
  const end = getEndOfMonthYmd(weekBaseDate)
  const curDay = getTimeFormFormat(ckWeekDay, YmdFormat)
  if (getDateChaYmd(start, curDay) <= 0 && getDateChaYmd(end, curDay) >= 0) {
    return true
  } else {
    return false
  }
}

/**
 * ckWeekDay是否和weekBaseDate在同一月
 * @param {*} weekBaseDate 为周的基准
 * @param {*} ckWeekDay
 */
export function isThisMonth (weekBaseDate, ckWeekDay) {
  const start = getStartOfMonth(weekBaseDate)
  const end = getEndOfMonth(weekBaseDate)
  const day = moment(ckWeekDay, DbTimeFormat)
  console.log('>>>>>>>>isThisMonth##weekBaseDate=' + weekBaseDate + '=start=' + start + '=start=' + end + '=ckWeekDay=' + ckWeekDay + '==' + day.isBetween(start, end))
  return day.isBetween(start, end)
}

/**
 * 获取i本周开始时间  标准格式
 * 返回的是0时区的时间字符串
 */
export function getStartOfWeekByNext (date, i) {
  let ttt = moment(date).startOf('isoWeek').toDate()
  ttt = add(ttt, 7 * i, 'd')
  return getTimeForDb(getDateYmd(ttt))
}

/**
 * 获取i本周结束时间  标准格式
 * 返回的是0时区的时间字符串
 */
export function getEndOfWeekByNext (date, i) {
  let ttt = moment(date).startOf('isoWeek').toDate()
  ttt = add(ttt, 7, 'd')
  ttt = add(ttt, 7 * i, 'd')
  return getTimeForDb(getDateYmd(ttt))
}
/**
 * 日期是周几
 * @param {*} time
 */
export function getCNWeekSim (time) {
  let str = time.replace('Monday', '周一')
  str = str.replace('Tuesday', '周二')
  str = str.replace('Wednesday', '周三')
  str = str.replace('Thursday', '周四')
  str = str.replace('Friday', '周五')
  str = str.replace('Saturday', '周六')
  str = str.replace('Sunday', '周日')

  return str
}

/**
 * 获取本周星期几  0代表星期一 6代表星期天
 */
export function getWeekIndex (time) {
  let date
  if (time === undefined || time == null) { date = moment() } else { date = moment(time) }
  const str = date.format('dddd')
  for (let i = 0; i < WeekEnName.length; i++) {
    if (WeekEnName[i] == str) {
      return i
    }
  }
  return 0
}
/** 得到时间是周几(周日为0，按中国改成7) */
export function getWeekDayCN (time) {
  let date
  if (time === undefined || time == null) { date = moment() } else { date = moment(time) }
  let weekday = date.day()
  if (weekday == 0) { // 周日为0，按中国改成7
    weekday = 7
  }
  return weekday
}
