<template>
  <div class="home-model tcenter">
    <div class="ttt">
      <span>1</span>
      <span>2</span>
      <span>3</span>
    </div>
    <van-notice-bar
      text="Technology is the common soul of the people who developed it."
      left-icon="volume-o"
    />
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
    </van-swipe>
    <van-divider />
    <van-button class="flex mt10" type="primary" @click="$router.push('/about')"
      >home,点击跳转about</van-button
    >
    <div class="flex flex_center single">
      store的count数据 <span class="ml20 f30 t2">{{ $store.state.moduleMain.count }}</span>
    </div>
    <van-button class="flex mt10" type="primary" @click="onClickAdd">add +</van-button>
    <van-button class="flex mt10" type="primary" @click="onClickSub">dec -</van-button>

    <MyFooter :active="0"></MyFooter>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MyFooter from "@/components/MyFooter.vue";
// import moment from "moment";
// import _ from "lodash";

@Component({
  name: "Home",
  components: { MyFooter },
})
export default class Home extends Vue {
  private signToShow: Boolean = false; //
  private num: number = 0;
  private active: number = 0;
  private activeTab: number = 0;

  created() {
    let ran = _.random(0, 999);
    let mm = moment();
    console.log("🚀 ~ mm11", mm.format("MM-DD"));
    console.log("🚀 ~ ran!!", _.split("1,2,3,4", ","));
  }

  mounted() {
    this.num = this.$store.state.moduleMain.count;
  }

  onClickAdd() {
    this.$store.commit("moduleMain/increment");
  }

  onClickSub() {
    this.$store.commit("moduleMain/subtraction");
  }
}
</script>

<style lang='less' scoped>
.ttt {
  display: flex;
  justify-content: space-between;
  height: 50px;
  span {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f68;
    border: 1px #ccc solid;
  }
}
.home-model {
  width: 100%;
  height: 100vh;
  padding: 0px;
}

.my-swipe .van-swipe-item {
  font-size: 20px;
  line-height: 150px;
  color: #fff;
  text-align: center;
  background-color: #07c160;
}

.single {
  width: 100%;
  height: 50px;
  margin-top: 20px;
}

.tt1 {
  width: 350px;
  height: 150px;
  background-color: #f9f;
}
</style>
















