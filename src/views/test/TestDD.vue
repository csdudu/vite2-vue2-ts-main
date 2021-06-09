<template>
  <div class="testdd">
    <Navbar nav-title="钉钉功能测试" />
    <div>登录人钉钉信息：{{ ddUserInfo }}</div>
    <div>
      钉钉UserId:{{ ddUserId }}
      <van-button text="人脸识别" @click="startFaceall(true,true)" />
      <van-button text="人脸识别[不启动活动检测]" @click="startFaceall(true,false)" />
    </div>
    <div>识别信息：{{ datetime }}:{{ 'photoStatus：' + faceInfo }}</div>
    <div>
      <van-button text="人脸识别(未开通过)" @click="startFaceall(false,true)" />
      <van-button text="人脸识别[不启动活动检测]" @click="startFaceall(true,false)" />
    </div>
    <div>识别信息：{{ datetime }}:{{ 'photoStatus：' + faceInfo }}</div>
    <div></div>
    <div>
      <van-button text="定位" @click="startLocation" />
    </div>
    <div>定位信息：{{ locationInfo }}</div>
    <div></div>
  </div>
</template>
<script>
import { login, getdetectFace } from '@/api/icircle'
import { locationWithType } from '@/assets/js/AMapPlugins'
import * as dd from 'dingtalk-jsapi'
import { getTimeFormFormat } from '@/assets/js/DateUtil'
// 人脸识别

export default {
  data () {
    return {
      ddUserInfo: {},
      faceInfo: {},
      locationInfo: {},
      ddUserId: '',
      datetime: '',
      newres: null
    }
  },
  computed: {},
  watch: {},
  created () {
    console.log('@@@@@@@@@startFace page created')
    login('k1', (success) => {
      console.log('TestDD login:' + success)
      if (success) {
        dd.biz.user.get({ // 获取钉钉用户信息
          onSuccess: (info) => {
            this.ddUserInfo = info
            this.ddUserId = info.emplId
            console.log('钉钉鉴权dd.biz.usersuccess:' + JSON.stringify(info))
          },
          onFail: (err) => {
            this.ddUserInfo = err
            console.log('钉钉鉴权dd.biz.usererror:' + JSON.stringify(err))
          }
        })
      }
    })
  },
  mounted () {

  },
  beforeCreate () { },
  beforeMount () { },
  beforeUpdate () { },
  updated () { },
  beforeDestroy () { },
  destroyed () { },
  activated () { },
  beforeRouteUpdate (to, from, next) {
    next(vm => {
      console.log('promotionSchedule>>>>>>beforeRouteUpdateto', to)
      console.log('promotionSchedule>>>>>>beforeRouteUpdatefrom', from)
      console.log('promotionSchedule>>>>>>beforeRouteUpdatenext', next)
    })
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      console.log('promotionSchedule>>>>>>beforeRouteEnterto', to)
      console.log('promotionSchedule>>>>>>beforeRouteEnterfrom', from)
      console.log('promotionSchedule>>>>>>beforeRouteEnternext', next)
    })
  },
  methods: {
    startFaceall (hasFace, needFacePose) {
      if (/webOS|iPad|BlackBerry|Windows/i.test(navigator.userAgent)) {
        this.startFace(hasFace, needFacePose)
      } else if (/Android|iPhone/i.test(navigator.userAgent)) {
        this.startFace1(hasFace, needFacePose)
      }
    },
    /** 人脸识别 */
    startFace (hasFace, needFacePose) {
      const userId = this.ddUserId
      const appId = process.env.VUE_APP_DD_AGENTID_MenuPromotionSchedule
      this.$commH5.startDingFace(hasFace, { emplId: userId }, appId, needFacePose).then(ret => {
        if (ret.photoStatus == 1 || ret.photoStatus == 3) { // 验证成功
          console.log('@@@@@@@@@startFace')
          this.faceInfo = ret.photoStatus
          console.log('startFace.detectFace onSuccess:', JSON.stringify(ret))
          this.$toast('人脸处理成功')
        } else if (ret.photoStatus == 2) {
          this.faceInfo = ret.photoStatus
          this.$toast('人脸处理失败')
        }
      }).catch(err => {
        console.log('@@@@@@@@@startFace=catch')
        this.$toast('人脸处理失败,' + err)
      })
    },

    startFace1 (hasFace, needFacePose) {
      const corpId = process.env.VUE_APP_DD_CORPID
      const appId = process.env.VUE_APP_DD_AGENTID_MenuPromotionSchedule
      const userId = this.ddUserId
      console.log(`startFace...corpId:${corpId},appId:${appId},userId:${userId}`)
      const detectFaceParams = {
        corpId: corpId,
        userId: userId,
        appId: appId,
        hasFace: hasFace, // 当前是否已录入人脸
        needBeauty: false, // 是否需要美颜
        needFacePose: needFacePose // 是否需要活体检测
        // spaceTitle: '人脸识别测试'
      }
      new Promise(async(res, rej) => {
        this.newres = null
        await this.newFace(detectFaceParams).then(() => {
          if (this.newres) {
            if (this.newres.type == 1) {
              if (this.newres.sucres.photoStatus == 1 || this.newres.sucres.photoStatus == 3) {
                this.faceInfo = this.newres.sucres.photoStatus
                this.$toast('人脸识别成功')
              } else if (this.newres.sucres.photoStatus == 2) {
                this.faceInfo = this.newres.sucres.photoStatus
                this.$toast('人脸识别失败')
              }
            } else if (this.newres.type == 0) {
              this.faceInfo = this.newres.failerr
              this.$toast('人脸识别失败回调成功')
            } else {
              this.$toast('回调不成功')
            }
          }
        })
        if (this.newres === null) {
          this.faceInfo = 2
          this.$toast('人脸识别失败')
        }
        res()
      })
    },
    newFace(detectFaceParams) {
      return new Promise(async(resolve, reject) => {
        await getdetectFace(detectFaceParams).then(res => {
          this.newres = res
          // this.datetime = getTimeFormFormat(new Date(), 'YYYY-MM-DD HH:mm:ss')
        }).catch(err => {
          console.log('ERR---------->', err)
          this.$toast('操作失败')
        })
        resolve()
      })
    },
    // 开始定位
    startLocation () {
      locationWithType(null, (err, ret) => {
        console.log('@@@@@@@@@@startLocation' + JSON.stringify(ret))
        if (err) {
          this.locationInfo = err
          console.error('error:' + err)
        } else {
          this.locationInfo = ret
        }
      })
    }
  }
}
</script>
<style lang='less' scoped>
.testdd {
  width: 100%;
  height: 100%;
}
</style>
