export function ttt(number) {
  number = number.toString()
  return number[1] ? number : '00' + number
}
