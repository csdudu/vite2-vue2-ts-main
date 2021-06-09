
export function isObjectNull(opt) {
  return opt === null || opt == undefined || opt == 'undefined'
}

export function isStringNull(opt) {
  return opt === null || opt == undefined || opt === '' || opt === 'undefined'
}
export function isStringNull2(opt) {
  return opt === null || opt == undefined || opt === '' || opt === 'undefined'
}

export function formatNullStr(opt) {
  if (isObjectNull(opt)) { return '' }
  return opt
}

export function callBack(cb) {
  if (!isObjectNull(cb) && typeof cb === 'function') {
    cb()
  }
}
/**
 * 调用模版
let test = '我的{0}是{1}';
let result = format(test,"id","城市之光");
返回"我的id是城市之光"
 */
export function stringFormat() {
  if (arguments.length == 0) { return '' }

  let s = arguments[0]
  if (arguments.length == 1) { return s }
  for (let i = 0; i < arguments.length - 1; i++) {
    s = s.replace(new RegExp('\\{' + i + '\\}', 'g'), arguments[i + 1])
  }
  return s
}
