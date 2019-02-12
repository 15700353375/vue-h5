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
            <echartsVue :currentData='currentData'></echartsVue>
          </div>
          <div class="swiper-slide">
            <room :currentData='currentData'></room>
          </div>
          <div class="swiper-slide">
            <technician :currentData='currentData'></technician>
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
        mySwiper: null,
      }
    },
    beforeCreate(){

    },
    created() {
      let current = this.$route.query.current;
      let userInfo = this.$route.query.userInfo;
      console.log(current,userInfo)
      if(current && userInfo){
        localStorage.setItem('currentInfo', current)
        localStorage.setItem('userInfo', userInfo)
      }
      // current = {"holderId":'100',"wxRoleType":'1',"storeName":"千思","holderType":'1',"holdGroup":'2',"address":"成都市武侯区复城国际T4#1603","fphone":"","sessionId":"d54e6848fccb449a9d4fc2c07633b0c6"}
      // current = JSON.stringify(current)

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
