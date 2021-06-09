<!-- 随机出题的demo duge -->
<template>
  <div class="home">
    <van-icon class-prefix="isales" name="peopleb2ren" />
    <slide-up-down :active="arrowFlag" :duration="300">
      <div class="ss" v-for="item in vvv">Only show this if "active” is</div>
    </slide-up-down>
    <h1 @click="vvv = vvv + 1">111增加列表元素{{ vvv }}</h1>
    <h1 @click="arrowFlag = !arrowFlag">{{ arrowFlag }}</h1>

    <img src="/images/music.svg" alt="" />
    <i class="isales isales-icon_liwu" />
    <i class="iconfont icon-message-voice-right"></i>
    <h1 @click="jumpH">12页面跳转测试</h1>

    <hr />
    <!-- <com_date_span :date="date_span.date" :arrowFlag="arrowFlag" 
        @arrowRight= "arrowRight" 
        @arrowLeft="arrowLeft" />
{{date_span.date}}
{{para0}} -->
    <van-button type="primary" @click="add">添加1道随机题目</van-button>
    <table class="list">
      <tr v-for="item in list" :key="item.packageName">
        <td>{{ item.packageName }}</td>
        <td>{{ item.packageNum }}</td>
      </tr>
    </table>
    <van-button type="primary" @click="submit">提交答案</van-button>

    <div class="jcsb" style="padding: 15px">
      <van-stepper v-model="num" :min="0" />
      <van-stepper v-model="num" :min="0" theme="round" />
      <van-switch v-model="arrowFlag" />
    </div>

    <center class="cont">
      <div>
        <!-- <van-image
                    width="150"
                    height="150"
                    src="https://ignite-upload.oss-cn-shanghai.aliyuncs.com/dev/7d4a4065-f994-479f-807f-581207e3ed56583207bc57656115baac31975550d1f3.png"
                    fit="cover"
                /> -->
        <h1>下面这个二维码是动态生成的：</h1>
        <div id="qrcode"></div>
      </div>
      <div class="h50"></div>
      <h1 class="tip" @click="scanH">在钉钉中点击这里可以打开二维码扫码</h1>

      <div class="h50"></div>
      <h1 class="tip" @click="phoneH">拨打电话</h1>
    </center>

    <van-action-sheet v-model="show" :actions="currentOption" @select="onSelect" />
    <MyFooter :active="1"></MyFooter>
  </div>
</template>

<script>
import {
  getDateCha,
  getWeekIndex,
  getWeekDayCN,
  add,
  getTimeFormFormat,
} from "@/assets/js/DateUtil";
import com_date_span from "../com_date_span.vue";
import MyFooter from "@/components/MyFooter.vue";
import SlideUpDown from "vue-slide-up-down";

export default {
  name: "Home",
  components: { com_date_span, MyFooter, SlideUpDown },
  data() {
    return {
      img: "@img/aaa.png",
      loading: false,
      posiList: [],
      arrowFlag: true,
      vvv: 2,
      date_span: {
        date: ["2019-01-01", "2020-01-01"],
      },
      para0: "111",
      num: 5,
      url: "111",
      show: false,
      actions: [],
      currentItem: {},
      list: [
        { packageName: "哈啤1", packageNum: 5 },
        { packageName: "哈啤2", packageNum: 8 },
        { packageName: "哈啤3", packageNum: 10 },
        { packageName: "哈啤4", packageNum: 5 },
        { packageName: "哈啤5", packageNum: 8 },
      ],

      configDetailReqs: [
        {
          configDetail: {
            id: 228,
            sequence: 2,
            answerType: 3,
            optionContent: "选项2-1;选项2-2;选项2-3",
            description: "题目2",
          },
          resultDetailResp: {
            textValue: "这是答案",
          },
        },

        {
          configDetail: {
            id: 229,
            sequence: 1,
            answerType: 2,
            optionContent: "选项1-1;选项1-2;选项1-3",
            description: "题目1",
          },
          resultDetailResp: {
            textValue: "这是答案",
          },
        },

        {
          configDetail: {
            id: 230,
            sequence: 3,
            answerType: 3,
            optionContent: "选项3-4;选项3-5;选项3-6",
            description: "题目3",
          },
          resultDetailResp: {
            textValue: "这是答案",
          },
        },
      ],
    };
  },
  computed: {
    currentOption() {
      if (_.isEmpty(this.currentItem)) {
        return [];
      } else {
        let arr = _.split(this.currentItem.optionContent, ";");
        return _.map(arr, (item) => {
          return { name: item };
        });
        console.log("🚀 ~ arr2", arr2);
      }
    },
  },
  created() {
    console.log(import.meta.env.VITE_APP_BASE_URL, import.meta.env.VITE_APP_OBJ);

    // this.init();
    // this.initPosition();
    /* setTimeout(
            ()=>{
                let qrcode = new QRCode(document.getElementById("qrcode"), {
                    text: "111754.cn",
                    width: 128,
                    height: 128,
                    colorDark : "#000000",
                    colorLight : "#ffffff",
                    correctLevel : QRCode.CorrectLevel.H
                });
            },
        200); */
  },
  methods: {
    testH() {
      console.log("🚀 ~ this.loading", _.random(0, 99));
    },
    loadingH() {
      this.loading = true;
      console.log("🚀 ~ this.loading", this.loading);
    },
    timeDiff(strTime) {
      let m2 = moment(moment().format("YYYY-MM-DD") + " " + strTime);
      let val = getDateCha(moment(), m2, "m");
      console.log("🚀 ~ val", val);
      return val;
    },
    jumpH() {
      let _url =
        "http://s.z-l.co/b/?qr=OjIxMywxMDkwNiw2LDAxMDcwMTMwMDEwMDEgICAgICAgLDIwMjEwNTIyMTQzMDMxNTI0&sign=33efd9d1e7779e1facbe0cb7ab699daa";
      window.location.href = _url;
    },
    initPosition() {},

    phoneH() {},
    scanH() {},
    init() {
      /* let list = _.map(this.configDetailReqs, (item) => {
        let {
          configDetail: { id, sequence, answerType, optionContent, description },
          resultDetailResp: { textValue },
        } = item;
        return {
          id,
          sequence,
          answerType,
          optionContent,
          description,
          textValue,
        };
      });
      console.log("重组后的list :>> ", list);
      this.list = _.orderBy(list, ["sequence"]); */
    },

    add() {
      let ran = _.random(200);
      let obj = {
        configDetail: {
          id: ran,
          sequence: ran,
          answerType: 3,
          optionContent: `选项${ran}-1;选项${ran}-2;选项${ran}-3`,
          description: `题目${ran}`,
        },
        resultDetailResp: {
          textValue: "这是答案",
        },
      };
      this.configDetailReqs.push(obj);
      this.init();
    },

    submit() {
      let list = _.map(this.list, (item) => {
        let { id, sequence, answerType, optionContent, description, textValue } = item;
        return {
          configDetail: {
            id,
            sequence,
            answerType,
            optionContent,
            description,
          },
          resultDetailResp: {
            textValue,
          },
        };
      });

      console.log("list :>> ", list);
    },
    clickH(item) {
      console.log("🚀 ~ item", item);
      this.show = true;
      this.currentItem = item;
    },
    onSelect(item) {
      console.log("🚀 ~ item", item);
      this.currentItem.textValue = item.name;
      this.show = false;
    },
  },
};
</script>
<style lang='less' scoped>
.img {
  width: 150px;
  height: 150px;
  background-color: #909;
  background-size: cover;
  background-image: url("@img/aaa.png");
}
.isales {
  font-size: 20px;
}
.list {
  width: 100%;
  td,
  th {
    padding: 5px;
    border: 1px #ccc solid;
  }
  span {
    display: block;
    padding: 5px;
  }
}
.ss {
  font-size: 20px;
  line-height: 200%;
  border: 1px #ccc solid;
}
</style>
