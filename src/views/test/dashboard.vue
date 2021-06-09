<template>
  <div class="about">
    <van-cell is-link title="基础用法" @click="show = true" />
    <van-action-sheet v-model="show" :actions="actions" @select="onSelect" />
    <van-icon name="bianji1" class-prefix="isales" />
    <van-icon size="30px" name="dingwei1" class-prefix="isales" />
    {{ currentDateCN }}
    <van-picker
      v-model="currentDateCN"
      show-toolbar
      title="请选择"
      :columns="columns"

      @confirm="onConfirm"
      @change="onChange"
    />

    <Navbar nav-title="代码规范用例" />
    <h3>STR总销量 (HL)-M1对比</h3>
    <div class="legend">
      <div class="item"> <i class="i1"></i><h3>月目标</h3> </div>
      <div class="item"> <i class="i2"></i><h3>月累计</h3> </div>
      <div class="item"> <i class="i3 low"></i><h3>达成率</h3> </div>
    </div>
    <chart_bar_line
      ref="chart3"
      name="chart3"
    />

    <h3>拜访达成率</h3>
    <chart_bar
      ref="chart4"
      name="chart4"
      :para="para1"
    />
    <!-- <h1>eCharts圆形对位</h1>
    <div class="chart_demo">

      <chart_pie
        ref="chart5"
        name="chart5"
        :para="list_chart_pie"
      />
      <div class="rr">这是中间文字</div>
    </div> -->

    <h1>dashboard</h1>

    <h1>一行四个充满</h1>

    <ul class="list1">
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>6</li>
      <li>7</li>
      <li>8</li>
      <li>9</li>
      <li>10</li>
      <li>11</li>
      <li>12</li>
      <li>13</li>
      <li>14</li>
    </ul>

    <div class="h30"></div>
    <h1>左右布局</h1>
    <div class="jcsb">
      <div class="left">左</div>
      <div class="right">右</div>
    </div>
    <div class="h30"></div>

    <div class="wid330">这是一个尺寸为330px的块</div>
    <div class="wid330" style="width:330px; height:330px; background:#356">这是用了style的块</div>

    <h1>h1标题 32px</h1>
    <h2>h2标题 30px</h2>
    <h3>h3标题 28px</h3>
    <h4>h4标题 24px</h4>
    <p>普通尺寸文字 14px</p>
    <!-- <van-tabbar v-model="active">
<van-tabbar-item icon="home-o">标签</van-tabbar-item>
<van-tabbar-item icon="search">标签</van-tabbar-item>
<van-tabbar-item icon="friends-o">标签</van-tabbar-item>
<van-tabbar-item icon="setting-o">标签</van-tabbar-item>
van-tabbar> -->
    <van-button type="primary">主要按钮</van-button>
    <van-button type="primary" round>圆角按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="warning" round>警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>

    <van-button plain type="primary">primary 朴素按钮</van-button>

    <van-button disabled type="primary">primary 禁用状态</van-button>

    <van-checkbox v-model="checked">复选框</van-checkbox>
    <van-switch v-model="checked" />

    <van-search
      v-model="value"
      shape="round"
      placeholder="这是默认搜索"
    />

    <div class="h10"></div>

    <van-search v-model="value" placeholder="请输入售点名称/售点地址" show-action shape="round">
      <van-icon slot="action" class-prefix="isales" name="shaixuan1" />
    </van-search>

    这是调用iconfont的标准用法,默认字体大小24px：
    <van-icon class-prefix="isales" name="peopleb2ren" />

    <div class="h20"></div>
    <aa href="/sprWorkH5/workplan">这是A链接的HTML写法</aa>

    <com_list
      ref="listA"
      class="listA"
      :list="listA"
      :finished="finished"
      :func="func"
      api=""
      :form="{}"
    >
      <!-- <div
            slot-scope="ttt"
            class="aa_cont"
            :class="'handle' + ttt.item.attrs.contest_status"
        ></div> -->
      <div
        slot-scope="ttt"
      >{{ ttt.item }}</div>
    </com_list>
  </div>
</template>
<script>
const moment = require('moment')
import Vue from 'vue'
import { Cell, Switch, Tabbar, TabbarItem } from 'vant'
import chart_pie from '@/components/chart/chart_pie'
import chart_bar from '@/components/chart/chart_bar'
import chart_bar_line from '@/components/chart/chart_bar_line'
// import test_btn from '@/components/test_btn'
import com_list from '@/components/com_list'

Vue.use(Switch)
Vue.use(Tabbar)
Vue.use(TabbarItem)

const NOW = new Date()
console.log('NOW :>> ', NOW)

const mm = moment().subtract(1, 'years').toDate()
console.log('moment() :>> ', mm)

export default {
  components: {
    vanCell: Cell,
    chart_pie,
    chart_bar,
    chart_bar_line,
    com_list
  },
  props: {},
  data() {
    return {
      show: false,
      actions: [{ name: '选项一' }, { name: '选项二' }, { name: '选项三' }],
      currentDateCN: [
        { 'value': 2021, 'text': '2021年' },
        { 'value': 2, 'text': '2月' },
        { 'value': 1, 'text': '第1周' }
      ],
      columns: [
        {
          'defaultIndex': 1,
          'values': [
            { 'value': 2020, 'text': '2020年' },
            { 'value': 2021, 'text': '2021年' }
          ]
        },
        {
          'defaultIndex': 1,
          'values': [
            { 'value': 1, 'text': '1月' },
            { 'value': 2, 'text': '2月' },
            { 'value': 3, 'text': '3月' },
            { 'value': 4, 'text': '4月' },
            { 'value': 5, 'text': '5月' },
            { 'value': 6, 'text': '6月' },
            { 'value': 7, 'text': '7月' },
            { 'value': 8, 'text': '8月' },
            { 'value': 9, 'text': '9月' },
            { 'value': 10, 'text': '10月' },
            { 'value': 11, 'text': '11月' },
            { 'value': 12, 'text': '12月' }
          ]
        },
        { 'values': [
          { 'value': 1, 'text': '第1周' },
          { 'value': 2, 'text': '第2周' },
          { 'value': 3, 'text': '第3周' },
          { 'value': 4, 'text': '第4周' },
          { 'value': 5, 'text': '第5周' },
          { 'value': 6, 'text': '第6周' }
        ]
        }
      ],
      minDate: moment().subtract(2, 'years').toDate(),
      maxDate: moment().toDate(),
      currentDate: moment().toDate(),

      para1: {
        key: ['潘启玉', '唐登华', '周世林', '雷瑜', '张琴'],
        val: [125, 110, 112, 120, 89]
      },
      finished: false,
      listA: [],
      active: 1,
      checked: true,
      value: null,
      list_chart_pie: [
        { value: 100, name: '直接访问' },
        { value: 100, name: '邮件营销' },
        { value: 100, name: '联盟广告' }

      ]
    }
  },
  computed: {},
  watch: {},
  created() {
    var date = moment()
    // var dow = date.day();
    // var monday1 = date.subtract(dow-1, 'days').format('YYYY-MM-DD')
    const day1 = moment('2021-5-5 17:00')
    const day2 = moment()
    console.log('🚀 ~ day2', day2)
    // let dd = this_day.add(0,'months').format('YYYY-MM-DD')

    /* setInterval(
      ()=>{
        this.para1 = {
          key:["a","b","c","d","e"],
          val:[
            _.random(6, 10),
            _.random(2, 15),
            _.random(6, 10),
            _.random(2, 15),
            _.random(6, 10)
          ],
        }
      },
    5000); */
  },
  mounted() {

  },
  beforeCreate() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  activated() {},
  methods: {
    onSelect(item) {
      console.log('🚀 ~ item', item)
    },
    onConfirm(n1, v) {
      console.log('n1 :>> ', n1, v)
    },
    onChange(n2, v) {
      console.log('n2 :>> ', n2, v)
    },
    clickH() {
      console.log('BTN!!!!! :>> ')
    },
    func(page) {
      if (page == 3) {
        this.finished = true
      }
      for (let iii = 0; iii < 5; iii++) {
        this.listA.push(_.random(0, 999))
        console.log('🚀 ~ listA', listA)
        console.log('🚀 ~ listA', listA)
        console.log('🚀 ~ func ~ listA', listA)
      }
      console.log(page, '===this.listA :>> ', this.listA)
    }
  }
}
</script>
<style lang='less' scoped>
  #chart3{width: 100%; height: 240px;}
  #chart4{width: 100%; height: 240px;}
  .chart_demo{
    position: relative;width: 300px; height: 300px;
    #chart5{width: 300px; height: 300px; background-color: #faf;}
    .rr{
      left: 50%; top: 50%; transform: translate(-50%, -50%);
      position: absolute; width: 100px; height: 100px; border-radius: 50%; background-color: #ffa;
      display: flex; align-items: center; justify-content: center;
    }
  }

  .list1{
    width: 100%; background-color: #f34;
    display: flex; justify-content: space-between; flex-wrap: wrap;
    li+li{margin-left: 10px;}
    li:nth-child(4n+1){margin-left: 0px;}
    li:last-child{margin-right:auto}
    li{background-color: #090; width:76px; height: 50px;
    font-size: 20px; color: #fff; margin-bottom: 10px;
      &.blank{height: 0; background-color: none;margin-bottom: 0;}
      &:nth-last-child(3){background-color: #920;}
    }
  }
  .wid330{
    width: 340px; height: 340px; background-color: #069;
    font-size: 20px; color: #fff; display: flex; align-items: center; justify-content: center;
  }
  .about{
    padding: 20px;
    h1{font-size: 40px; margin-bottom: 0.5em;}
    background-color: #dee;
    .van-button{
      margin-right: 10px; margin-bottom: 20px;
    }
    .van-search{width: 100%;}
  }
  .van-switch{font-size: 14px; border-width: 1px;}
</style>
