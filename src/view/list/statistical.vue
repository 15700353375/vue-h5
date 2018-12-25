<!--
 * @Author:      cyzeng
 * @DateTime:    2017-06-16 23:09:45
 * @Description: 登录页面
 -->
<template>
  <div class="clearfix container">
    <TopbarVue :currentData='currentData' @changeSwiper='changeSwiper($event)'></TopbarVue>

    <div class="swiper-container" >
      <div class="swiper-wrapper">
          <div class="swiper-slide">
            <div id="minirefresh" class="minirefresh-wrap">
                <div class="minirefresh-scroll">
                  <div class="clearfix slide-items-main">
                    <div id="inventoryChart" style="width: 100%;height:500px;" />
                    <h2>cgvsdf</h2>
                    <h2>cgvsdf</h2>
                    <h2>cgvsdf</h2>
                    <h2>cgvsdf</h2>
                    <h2>cgvsdf</h2>
                    <h2>cgvsdf</h2>
                    <div id="inventoryChart2" style="width: 100%;height:500px;" />
                  </div>
                </div>
            </div>

          </div>
          <div class="swiper-slide">
            <div class="clearfix slide-items-main">
              <h1 style="line-height:40px;" v-for="(item, index) in 15" :key='index'>房间状态房间状态</h1>
            </div>
          </div>
          <div class="swiper-slide slide-items-main">
            <div class="clearfix" >
              <h1 style="line-height:40px;" v-for="(item, index) in 20" :key='index'>技师状态</h1>
            </div>
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
                setTimeout(()=>{
                  // 结束下拉刷新
                  miniRefresh.endUpLoading(true);
                },3000)
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
      TopbarVue
    }
  }
</script>
