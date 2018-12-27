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
            <room></room>
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
  import MiniRefreshTools from 'minirefresh';

  export default {
    data(){
      return{
        currentData: 0,

        echartsArr: [],
        active: 1,
        show1: true,
        text1: '阿斯顿发斯蒂芬',
        show: false,
        pieOptions: pieOptions,
        option: {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                // orient: 'horizontal',
                x: 'left',
                data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
            },
            series: [
                {
                    name:'访问来源',
                    type:'pie',
                    radius: ['30%', '40%'],
                    avoidLabelOverlap: false,
                    // 是否开启动画
                    hoverAnimation: true,
                    hoverOffset: 5,
                    labelLine: {
                      show: true,
                      length: 10,
                      length2: 8,
                    },
                    label: {
                      normal: {
                        formatter: '{b}: {per|{d}%}  ',
                        rich: {
                          b: {
                            fontSize: 16,
                            lineHeight: 33
                          },
                          per: {
                            color: '#eee',
                            backgroundColor: '#334455',
                            padding: [2, 2],
                            borderRadius: 2
                          }
                        }
                      }
                    },
                    data:[
                        {value:335, name:'直接访问'},
                        {value:310, name:'邮件营销'},
                        {value:234, name:'联盟广告'},
                        {value:135, name:'视频广告'},
                        {value:1548, name:'搜索引擎'}
                    ]
                }
            ]
        },

        mySwiper: null,
      }
    },
    mounted(){
      let that = this;
      this.mySwiper = new Swiper ('.swiper-container', {
        initialSlide: 0,
        direction: 'horizontal', // 垂直切换选项
        loop: false, // 循环模式选项
        on: {
          slideChange: function (e) {
            // debugger
            console.log(this.activeIndex);
            that.currentData = this.activeIndex;
          },
        },
      })

      var miniRefresh = new MiniRefresh({
          container: '#minirefresh',
          down: {
              callback: function() {
                setTimeout(()=>{
                  // 结束下拉刷新
                  miniRefresh.endDownLoading();
                },3000)
              }
          },
          up: {

              callback: function() {
                miniRefresh.endUpLoading(true);
              }
          }
      });



      this.drawChart1()
      this.drawChart2()

    },
    methods: {

      changeSwiper(e){
        this.mySwiper.slideTo(e,1000,false);
        this.currentData = e;
      },
       // 柱状图分析
      drawChart1(){
        if (!document.querySelector('#inventoryChart')) {
          return
        }
        // 基于准备好的dom，初始化echarts实例
        let inventoryChart = echarts.init(document.querySelector('#inventoryChart'));

        inventoryChart.setOption(this.option)

        this.echartsArr.push(inventoryChart);

      },

      // 柱状图分析
      drawChart2(){
        if (!document.querySelector('#inventoryChart2')) {
          return
        }
        // 基于准备好的dom，初始化echarts实例
        let inventoryChart = echarts.init(document.querySelector('#inventoryChart2'));

        inventoryChart.setOption(this.option)

        this.echartsArr.push(inventoryChart);

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
