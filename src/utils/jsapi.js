import { dingtalkJSAPIAuth, dingtalkLogin } from '@/api/common';
import * as dd from 'dingtalk-jsapi';

const dev = process.env.NODE_ENV === 'development';
/**
 * dev、test环境的corpId都是ABI Developer, agentId为对应环境的bees m1的agentId
 * uat -> 百威钉钉
 * prod -> 百销通
 */
const CONFIG_MAP = {
  'https://bees-server-dev.ab-inbev.cn': { corpId: 'ding6f4b84fb3eb710d94ac5d6980864d335', agentId: '1124779756' },
  'https://bees-server-test.ab-inbev.cn': { corpId: 'ding6f4b84fb3eb710d94ac5d6980864d335', agentId: '1128487082' },
  'https://bees-server-uat.ab-inbev.cn': { corpId: 'ding9124169acab08b18f2c783f7214b6d69', agentId: '1110940988' },
  'https://bees-server.ab-inbev.cn': { corpId: 'dingd40f4e99578ff9a924f2f5cc6abecb85', agentId: '1143013268' },
};
export const config = CONFIG_MAP[process.env.VUE_APP_BASE_API] || {
  corpId: 'ding6f4b84fb3eb710d94ac5d6980864d335',
  agentId: '1124779756',
};

export default {
  /**
   * 是否在钉钉容器内
   */
  isInDingtalk: () => {
    return dd.env.version !== undefined;
  },
  navigation: {
    setTitle(title) {
      dd.ready(() => {
        dd.biz.navigation.setTitle({ title });
      });
    },
    setRightShare() {
      dd.ready(() => {
        dd.biz.navigation.setRight({
          control: true,
          text: '分享',
          onSuccess: () => {
            dd.biz.util.share({ type: 0 });
          },
        });
      });
    },
    close() {
      dd.ready(() => {
        dd.biz.navigation.close();
      });
    },
  },
  util: {
    getUserInfo() {
      return new Promise((resolve, reject) => {
        if (dev) {
          resolve({
            profileName: 'M1',
            source: 'dingtalk',
            token_type: 'Bearer',
            userName: '康 洁锐',
            userId: '28050152',
            token:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsib2F1dGgyLXJlc291cmNlIl0sInNjb3BlIjpbInVzZXIiXSwiZXhwIjoxNjEwOTk2NTI4LCJhdXRob3JpdGllcyI6WyJjbGllbnRfY3JlZGVudGlhbHMiXSwianRpIjoiMTJjMzJjZDItZWZiNi00NTc4LTgyYjMtZmMzNGRhZDFlYmU3IiwiY2xpZW50X2lkIjoiMmIwMWEzMTBlYWZkNDdmMWE4ZGQ0MWIxNGRhMGRkM2EifQ.DpKbqP--kqyxQNj1Z_NZ9HhCuXTAOKXP89oU6I4T2Y4',
          });
          return;
        }
        dd.ready(() => {
          dd.runtime.permission.requestAuthCode({
            corpId: config.corpId,
            onSuccess: async (info) => {
              // 通过该免登授权码可以获取用户身份
              const authCode = info.code;
              const res = await dingtalkLogin({ agentId: config.agentId, authCode }).catch(() => null);
              if (res && res.code === 200000) {
                const { tokenType, userId, accessToken } = res.data;
                const userInfo = {
                  profileName: '',
                  source: 'dingtalk',
                  token_type: tokenType,
                  userName: '',
                  userId,
                  token: accessToken,
                };
                resolve(userInfo);
              } else {
                reject({ message: `请求登录接口失败，${res.message}` });
              }
            },
            onFail: (err) => {
              reject({ message: `获取免登授权码失败，${JSON.stringify(err)}` });
            },
          });
        });
      });
    },
    openLink(url) {
      dd.ready(() => {
        dd.biz.util.openLink({ url });
      });
    },
  },
  device: {
    location: {
      get() {
        return new Promise((resolve, reject) => {
          if (dev) {
            resolve({
              latitude: 31.235981,
              longitude: 121.47318,
              addr: '西藏中路525号雅居乐国际广场',
              province: '上海市',
              city: '上海市',
              district: '黄浦区',
            });
            return;
          }
          const href = window.location.href;
          const url = href.slice(0, href.indexOf('#'));
          dingtalkJSAPIAuth({ agentId: config.agentId, url })
            .then((res) => {
              if (res && res.code === 200000) {
                const { timeStamp, nonceStr, signature } = res.data;
                dd.config({
                  agentId: config.agentId,
                  corpId: config.corpId,
                  timeStamp,
                  nonceStr,
                  signature,
                  type: 0,
                  jsApiList: ['device.geolocation.get'],
                });
                dd.ready(() => {
                  dd.device.geolocation.get({
                    targetAccuracy: 200, // 期望定位精度半径(单位米)
                    coordinate: 1, // 获取高德坐标
                    withReGeocode: true, // 是否需要带有逆地理编码信息。
                    useCache: true, // 默认是true，如果需要频繁获取地理位置，请设置false
                    onSuccess: (result) => {
                      const { latitude, longitude, address, province, city, district } = result;
                      resolve({
                        latitude,
                        longitude,
                        addr: address,
                        province,
                        city,
                        district,
                      });
                    },
                    onFail: () => {
                      reject({ message: '定位失败，请开打位置授权，并确保网络通畅' });
                    },
                  });
                });
              } else {
                reject({ message: `请求获取jsapi鉴权参数失败，${JSON.stringify(res)}` });
              }
            })
            .catch((e) => {
              reject({ message: `请求获取jsapi鉴权参数失败，${JSON.stringify(e)}` });
            });
        });
      },
    },
  },
};
