<!--
 * @Author: 杜哥
 * @Date: 2021-05-10
 * @Description:组件-日期段显示
-->
<template>
  <div class="date_span">
    <div class="sp">
      <van-icon v-if="arrowFlag" name="arrow-left" @click="arrowLeft" />
      <div class="val">{{ myDate[0] }}</div>
    </div>
    <van-icon name="minus" />
    <div class="sp">
      <div class="val">{{ myDate[1] }}</div>
      <van-icon v-if="arrowFlag" name="arrow" @click="arrowRight" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    date: {
      type: Array,
    },
    arrowFlag: {
      type: Boolean,
      default: false,
    },
  },
  created() {},
  components: {},
  filters: {
    getFullStr(date) {
      let str = _.split(date, "-");
      return `${str[0]}年${str[1]}月${str[2]}日`;
    },
  },
  computed: {
    myDate() {
      let dd = this.date;
      if (dd) {
        let arr1 = _.split(dd[0], "-");
        let arr2 = _.split(dd[1], "-");
        let str1 = `${arr1[0]}年${arr1[1]}月${arr1[2]}日`;
        let str2 = `${arr2[0]}年${arr2[1]}月${arr2[2]}日`;

        // duge:这个arr1[1]&&arr2[1]的判断是因为分割字串导致渲染时有轻微延迟，必须判断一下，否则画面中会出现undefine字样
        if (arr1[1] && arr2[1]) {
          return [str1, str2];
        } else {
          return [null, null];
        }
      }
    },
  },
  watch: {},
  mounted() {},
  methods: {
    arrowLeft() {},
    arrowRight() {},
  },
};
</script>

<style lang='less' scoped>
@import "@/assets/less/_variable.less";
.date_span {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 15px;
  flex: 0 0 50px;
  height: 50px;
  border-top: 1px #ccc solid;
  .sp {
    display: flex;
    align-items: center;

    .val {
      font-size: 15px;
      margin: 0 0.3em;
    }
    .van-icon {
      font-size: 18px;
      margin-right: 0.3em;
      color: #999;
    }
  }
}
</style>
