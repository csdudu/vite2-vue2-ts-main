'use strict'

import { isObjectNull } from './EmptyUtil'

const EARTH_RADIUS = 6378137.0 // 单位M
const PI = Math.PI

function getRad(d) {
  return d * PI / 180.0
}

/**
 * caculate the great circle distance
 * @param {Object} lat1
 * @param {Object} lng1
 * @param {Object} lat2
 * @param {Object} lng2
 */
export function getGreatCircleDistance(lat1, lng1, lat2, lng2) {
  // console.log("getGreatCircleDistance-------A:"+lat1+" "+lng1+" "+lat2+" "+lng2+" ");
  if (checkNum(lat1) && checkNum(lat2) && checkNum(lng1) && checkNum(lng2)) {
    const radLat1 = getRad(lat1)
    const radLat2 = getRad(lat2)

    const a = radLat1 - radLat2
    const b = getRad(lng1) - getRad(lng2)
    // console.log("getGreatCircleDistance-------AA-B:"+a+"  "+b);
    let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)))
    s = s * EARTH_RADIUS
    s = Math.round(s * 10000) / 10000.0

    // console.log(lat1+" "+lng1+" "+lat2+" "+lng2+" "+s);
    // console.log("getGreatCircleDistance-------A最小值s:"+s);
    return s
  } else {
    // console.log(lat1+" "+lng1+" "+lat2+" "+lng2);
    return -1
  }
}

export function getGreatCircleDistanceArr(arrList, lat2, lng2, radius) {
  if (checkNum(lat2) && checkNum(lng2)) {
    let min = -1
    for (let index = 0; index < arrList.length; index++) {
      let radiusNew = radius
      if (!isObjectNull(arrList[index].radius)) { // 售点初始坐标中的定位精度
        if (!isObjectNull(radius)) {
          radiusNew = radius + arrList[index].radius
        } else {
          radiusNew = arrList[index].radius
        }
      }
      const distance = getDistance(arrList[index].lat, arrList[index].lon, lat2, lng2, radiusNew)
      // let modal = weex.requireModule("modal");
      // modal.alert({ message:"msgls=radiusNew:"+radiusNew+"==radius:"+radius+"==arrList[index].radius:"+arrList[index].radius+"="+distance});
      // console.log("getGreatCircleDistance-------B:"+arrList[index].lat+" "+arrList[index].lon+" "+lat2+" "+lng2+" ");
      // let radLat1 =getRad(arrList[index].lat);
      // let radLat2 = getRad(lat2);
      // let a = radLat1 - radLat2;
      // let b = getRad(arrList[index].lon) - getRad(lng2);
      // // console.log("getGreatCircleDistance-------BA-B:"+a+"  "+b);
      // let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
      // s = s * EARTH_RADIUS;
      // s = Math.round(s * 10000) / 10000.0;
      // // console.log("getGreatCircleDistance-------B最小值s:"+s);
      if (distance >= 0) {
        if (min < 0) { min = distance } else {
          min = Math.min(min, distance)
        }
      }
    }
    return min
  } else {
    // console.log(lat1+" "+lng1+" "+lat2+" "+lng2);
    return -1
  }
}

/**
 * caculate the great circle distance
 * 根据定位精度获取偏差  偏差结果将减去定位精度
 * @param {Object} lat1
 * @param {Object} lng1
 * @param {Object} lat2
 * @param {Object} lng2
 */
export function getDistance(lat1, lng1, lat2, lng2, radius) {
  if (isObjectNull(radius)) { radius = 0 }
  let distance = getGreatCircleDistance(lat1, lng1, lat2, lng2)
  console.log('PocD:distance=' + distance + '  radius=' + radius)
  if (distance >= radius) { distance = distance - radius } else if (distance >= 0) { distance = 0 }
  return Math.round(distance)
}

function checkNum(num) {
  if (num === null || num === undefined || num === 0) { return false } else { return true }
}

export function checkAccountLon(item) {
  if (checkNum(item.Latitude) || checkNum(item.Latitude_LBS)) {
    return true
  } else {
    return false
  }
}
/** 根据距离换算成米，公里 */
export function calcDistance(distance) {
  if (distance < 1000) {
    return distance + 'm'
  } else {
    return parseFloat(distance / 1000).toFixed(2) + 'km'
  }
}
