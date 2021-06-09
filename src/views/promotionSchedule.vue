<!--
 * @Author: 杜哥
 * @Date: 2021-05-07
 * @Description:促销日程
-->
<template>
  <div class="base-layout fxc">
    <!-- <Navbar nav-title="促销日程" background="#ffffff"></Navbar> -->
    <com_date_span
      :date="date_span"
      :arrow-flag="arrowFlag"
      @arrowRight="arrowRight"
      @arrowLeft="arrowLeft"
    />
    <ul class="date_grid">
      <li v-for="(item, index) in weekList" :key="index">
        <div class="cont" :class="[{ today: item.today }]">
          <div @click="checkDate(item.date, index)">
            <h3>{{ week_str[index] }}</h3>
            <h4>
              {{ item.date.slice(-2) }}
            </h4>
          </div>
        </div>
        <div class="opt" :class="{ none: item.schedulingCount == 0 }">●</div>
      </li>
    </ul>
    <!-- <div class="scroll main">
      <van-empty v-if="mainList.length==0" description="暂无数据" />
      <ul v-for="(item, index) in mainList" :key="index" class="mainList">
        <li>
          <h4 class="shop">
            <i class="isales isales-icon_shangpu"></i>{{ item.mc }}
          </h4>
          <h5 class="address">
            <i class="isales isales-icon_dingwei"></i>{{ item.addressDetail }}
          </h5>

          <div
            v-for="(iii, index) in item.bcList"
            :key="index"
            class="bc_bar"
          >
            <div class="tit">
              <div class="bc_tit">
                <i class="isales isales-icon_dingshi"></i> 班次 {{ iii.time1 }}-{{
                  iii.time2
                }}
              </div>
              <div class="right" :class="'status' + iii.status">
                {{ mapStatus[iii.status] }}
              </div>
            </div>

            <div class="bc_cont jcsb" @click="jumpDetail(item,iii)">
              <div class="left">
                <h6>
                  <span
                    v-if="iii.startWorkDateTime"
                  >签入：{{ iii.checkInStr }}</span>
                  <span v-else>签入：未签入</span>
                  <div v-if="iii.startWorkTime" class="spilit">
                    <span>{{ iii.checkInMark }}</span>
                  </div>
                </h6>
                <h6>
                  <span
                    v-if="iii.endWorkDateTime"
                  >签出：{{ iii.checkOutStr }}</span>
                  <span v-else>签出：未签出</span>
                  <div v-if="iii.endWorkTime" class="spilit">
                    <span>{{ iii.checkOutMark }}</span>
                  </div>
                </h6>
              </div>

              <div class="right">
                <van-icon v-if="flagJumpDetail(iii,item.ap01,item.ap02)" class="mt-2" name="arrow" />
              </div>
            </div>

            <div class="bc_cont bc_cont2 jcsb" @click="goSalesDetail(item,iii)">
              <div class="left">
                <h6>目标:{{ iii.salesTarget }}</h6>
              </div>
              <div class="right">
                <h6 class="mr-5">达成:{{ iii.targetFinish }}</h6>
                <van-icon class="mt-2" name="arrow" />
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div> -->
  </div>
</template>

<script>
import com_date_span from "./com_date_span.vue";
import { ttt } from "@/utils/test";

// const testList = []
export default {
  components: { com_date_span },
  filters: {},
  mixins: [],
  data() {
    return {
      arrowFlag: true,
      date_span: ["2021-05-31", "2021-06-03"],
      weekList: [
        {
          date: "2021-05-31",
          schedulingCount: 7,
          weekCount: 1,
        },
        {
          date: "2021-06-01",
          schedulingCount: 13,
          weekCount: 2,
          today: true,
        },
        {
          date: "2021-06-02",
          schedulingCount: 15,
          weekCount: 3,
        },
        {
          date: "2021-06-03",
          schedulingCount: 15,
          weekCount: 4,
        },
        {
          date: "2021-06-04",
          schedulingCount: 17,
          weekCount: 5,
        },
        {
          date: "2021-06-05",
          schedulingCount: 17,
          weekCount: 6,
        },
        {
          date: "2021-06-06",
          schedulingCount: 19,
          weekCount: 7,
        },
      ], // 周日期列表
      week_str: ["一", "二", "三", "四", "五", "六", "日"],
      mapStatus: {
        0: "未开始",
        1: "进行中",
        2: "已完成",
        3: "未完成",
        4: "未签入",
      },
      mainList: [],
      isLogin: false, // 是否登录成功
    };
  },

  computed: {},
  watch: {},
  created() {
    console.log("formatNumber :>> ", ttt(2));
    this.init();
  },
  mounted() {},
  methods: {
    init() {
      /* login('MenuPromotionSchedule', (success) => {
        if (success) {
          this.myRole = this.$store.state.sysInfo.userInfo
          this.isLogin = true
          this.initDateSpan()
          this.initWeekCalendar()
          // this.initSchedulePoc()// 登录成功这里调用一次查询
        }
      }) */
    },

    arrowLeft(data) {
      this.date_span = data;
      this.currentDate = data[0];
      this.initWeekCalendar();
    },

    arrowRight(date) {
      this.date_span = date;
      this.currentDate = date[0];
      this.initWeekCalendar();
    },
  },
};
</script>

<style lang='less' scoped>
@import "@/assets/less/_variable.less";
.date_grid {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 5px;
  flex: 0 0 80px;
  li {
    .cont {
      border-radius: 50%;
      width: 45px;
      height: 45px;
      display: flex;
      align-items: center;
      justify-content: center;
      h3,
      h4 {
        font-size: 14px;
      }
      h4 {
        margin-bottom: 0.3em;
      }
      &.today {
        background-color: #aaa;
        div {
          color: #fff;
        }
      }
      &.current {
        background-color: @cc1;
        div {
          color: #fff;
        }
      }
    }
    .opt {
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      font-size: 6px;
      color: #ccc;
      &.none {
        opacity: 0;
      }
    }
  }
}
</style>
