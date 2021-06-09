import { isObjectNull } from './EmptyUtil'

export function formatNumber(str, defaultNum) {
  if (isObjectNull(defaultNum)) { defaultNum = 0 }
  if (isObjectNull(str)) { return defaultNum }
  const tmp = Number(str)
  if (isNaN(tmp)) { return defaultNum } else { return tmp }
}

export function getPercentString(n) {
  const tmp = formatNumber(n)
  return fixFloat((tmp * 100), 2, true) + '%'
}
// 求百分比
export function getPercentNumStr(num, total) {
  num = parseFloat(num)
  total = parseFloat(total)
  if (isNaN(num) || isNaN(total)) {
    return '-'
  }
  return total <= 0 ? '0' : (Math.round(num / total * 10000) / 100.00)
}
/**
 * 保留float型的小数位数 去掉末尾的0
 * num 保留的位数  默认2位
 * isRound 是否四舍五入
 */
export function fixFloat(f, num, isRound) {
  if (isObjectNull(num)) { num = 2 }
  if (isObjectNull(isRound)) { isRound = false }
  const ppp = Math.pow(10, num)
  const tmpFloat = f * ppp
  let tmpInt = 0
  if (isRound) { tmpInt = Math.round(tmpFloat) } else { tmpInt = Math.floor(tmpFloat) }
  return (tmpInt / ppp)
}
