<!--
 * @Author:      changh
 * @DateTime:    2018-12-25
 * @Description: 主页面
 -->
<template>
  <div class="clearfix container">
    <TopbarVue :currentData='currentData' @changeSwiper='changeSwiper($event)'></TopbarVue>

    <div class="swiper-container" >
      <div class="swiper-wrapper">
          <div class="swiper-slide">
            <echartsVue></echartsVue>
          </div>
          <div class="swiper-slide">
            <!-- <room></room> -->
          </div>
          <div class="swiper-slide">
            <technician></technician>
          </div>
      </div>
    </div>

    <bottomBar></bottomBar>
  </div>
</template>
<style lang="less" scoped>
  .container{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .swiper-container{
    flex: 1;
    width: 100%;
    position: relative;
  }

  .slide-items-main{
    height: 100%;
    overflow-y: auto;
  }


</style>

<script>
  import {
          urls,
          baseUrl} from '@Util/axiosConfig';
  import comUtil from '@Util/comUtil';
  import { pieOptions } from '@Util/charts';
  import TopbarVue from '@Components/TopbarVue'
  import bottomBar from '@Components/bottomBar'
  import echartsVue from '@Components/echartsVue'
  import room from '@Components/room'
  import technician from '@Components/technician'


  export default {
    data(){
      return{
        currentData: 0,

        active: 1,
        show1: true,
        text1: '阿斯顿发斯蒂芬',
        show: false,

        mySwiper: null,
      }
    },
    created() {
      // 获取小程序传递过来的token
      // let current = this.$route.query.current;
      let current = {"holderId":"100","wxRoleType":"1","storeName":"千思","holderType":"1",
      "holdGroup":"2","address":"成都市武侯区复城国际T4#1603","fphone":"","sessionId":"7cc391f32ef741618f7d323693fe1dbd"}

      localStorage.setItem('currentInfo', JSON.stringify(current))

    },
    mounted(){
      let that = this;
      this.mySwiper = new Swiper ('.swiper-container', {
        initialSlide: 0,
        direction: 'horizontal', // 垂直切换选项
        loop: false, // 循环模式选项
        on: {
          slideChange: function (e) {
            that.currentData = this.activeIndex;
          },
        },
      })



    },
    methods: {

      changeSwiper(e){
        this.mySwiper.slideTo(e,1000,false);
        this.currentData = e;
      },



    },
    components:{
      bottomBar,
      TopbarVue,
      echartsVue,
      room,
      technician
    }
  }
</script>
