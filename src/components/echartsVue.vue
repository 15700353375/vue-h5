<!--
 * @Author:      changh
 * @DateTime:    2018-12-27
 * @Description: 营业数据
 -->

<template>
<div id="minirefresh" class="minirefresh-wrap">
    <div class="minirefresh-scroll">
      <div class="echarts-container">
        <div class="statistical-title">
              <span class='text-title'>营业信息</span>
              <span class='text-right'>2016-12-13 19:16:18 统计</span>
            </div>
            <div class='echarts-main clearfix'>
              <div id="inventoryChart" style="width: 100%;height:300px;" />
              <div class="echarts-total clearfix">
                <div class="echarts-total-item">
                  <div class='item-label'>今日营业</div>
                  <div class='item-value'>￥89895</div>
                </div>
                <div class="echarts-total-item">
                  <div class='item-label'>已买单</div>
                  <div class='item-value color-success'>￥8895</div>
                </div>
                <div class="echarts-total-item">
                  <div class='item-label'>未买单</div>
                  <div class='item-value color-warning'>￥895</div>
                </div>
              </div>
            </div>

            <div class="statistical-title marginT-20">
              <span class='text-title'>收款方式</span>
            </div>

            <div class='list-block-main clearfix'>
              <div class='clearfix'>
                <div class='list-block'
                      v-for="(item,index) in buyList"
                      :key="index" >
                      <div class='clearfix' v-if="item.label">
                        <div class='list-block-label' > {{item.label}}</div>
                        <div class='list-block-value' >￥ {{item.value}}</div>
                        <div class='list-block-percent' >{{item.percent}}</div>
                      </div>
                      <div class='list-block-label' v-else>-</div>
                </div>
              </div>
              <div class='list-block-total'> 总计： <span class='total-value'>￥6546451</span> </div>
            </div>

            <div class='statistical-title'>
              <span class='text-title'>营业信息</span>
              <span class='text-right'>2016-12-13 19:16:18 统计</span>
            </div>

            <div class='echarts-main clearfix'>
              <div id="inventoryChart2" style="width: 100%;height:300px;" />
              <div class="echarts-total clearfix">
                <div class="echarts-total-item">
                  <div class='item-label'>今日营业</div>
                  <div class='item-value'>￥89895</div>
                </div>
                <div class="echarts-total-item">
                  <div class='item-label'>已买单</div>
                  <div class='item-value color-success'>￥8895</div>
                </div>
                <div class="echarts-total-item">
                  <div class='item-label'>未买单</div>
                  <div class='item-value color-warning'>￥895</div>
                </div>
              </div>
            </div>

            <div class="statistical-title marginT-20">
              <span class='text-title'>收款方式</span>
            </div>

            <div class='list-block-main clearfix'>
              <div class='clearfix'>
                <div class='list-block'
                      v-for="(item,index) in buyList"
                      :key="index" >
                      <div class='clearfix' v-if="item.label">
                        <div class='list-block-label' > {{item.label}}</div>
                        <div class='list-block-value' >￥ {{item.value}}</div>
                        <div class='list-block-percent' >{{item.percent}}</div>
                      </div>
                      <div class='list-block-label' v-else>-</div>
                </div>
              </div>
              <div class='list-block-total'> 总计： <span class='total-value'>￥6546451</span> </div>
            </div>

            <div class='statistical-title'>
              <span class='text-title'>收款合计</span>
            </div>
            <div class='oper-block-box clearfix'>
              <div class='list-block-main clearfix'>
                <div class='clearfix'>
                  <div class='list-block'
                        v-for="(item,index) in buyList"
                        :key="index" >
                        <div class='clearfix' v-if="item.label">
                          <div class='list-block-label' > {{item.label}}</div>
                          <div class='list-block-value' >￥ {{item.value}}</div>
                          <div class='list-block-percent' >{{item.percent}}</div>
                        </div>
                        <div class='list-block-label' v-else>-</div>
                  </div>
                </div>
                <div class='list-block-total'> 收款合计： <span class='total-value'>￥6546451</span> </div>
              </div>
            </div>

          </div>
        </div>
</div>

</template>




<script>
  //加载相关依赖
  import { mapState } from 'vuex';
  import axios from 'axios'
  import {urls} from '@Util/axiosConfig';
  import { pieOptions } from '@Util/charts';
  import MiniRefreshTools from 'minirefresh';
  export default {
    props: ['navData'],
    data() {
      return {
        echartsArr: [],
        pieOptions: pieOptions,

        buyList: [
          {
            label: '免单',
            percent: '30%',
            value: 3455,
          },
          {
            label: '支付宝',
            percent: '30%',
            value: 8954
          },
          {
            label: '微信',
            percent: '30%',
            value: 6754
          },
          {
            label: '现金',
            percent: '30%',
            value: 347
          },
          {
            label: '抹零',
            percent: '30%',
            value: 47
          },
          {
            label: '银行卡',
            percent: '30%',
            value: 347
          },
        ]

      }
    },
    mounted(){
      let num = this.buyList.length % 4;
      if (num) {
        for (var i = 0; i < num; i++) {
          this.buyList.push({
            label: '',
            value: ''
          })
        }
      }

      let list = [
                  {value:335, name:'直接访问'},
                  {value:310, name:'邮件营销'},
                  {value:234, name:'联盟广告'},
                  {value:135, name:'视频广告'},
                  {value:1548, name:'搜索引擎'}
              ]

      this.pieOptions.series[0].data = list

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

      this.getData();


      this.drawChart1()
      this.drawChart2()
    },
    computed: mapState({
      // 名字
      username: state => state.login.userInfo.username,


    }),
    methods: {
      goPage(url){
        this.$router.push({name: url})
      },



      getData(){
        // this.$ajaxGet(urls.in_theaters).then(res => {
        //   if(res){
        //     debugger;
        //   }           
        // })

        let parmas = {
          username: 'changh3',
          password: 'ch123456'
        }
         this.$ajaxPost(urls.LOGIN, parmas).then((res) =>{
            if(res){              
              debugger;
            }
        });

      },

       // 柱状图分析
      drawChart1(){
        if (!document.querySelector('#inventoryChart')) {
          return
        }
        // 基于准备好的dom，初始化echarts实例
        let inventoryChart = echarts.init(document.querySelector('#inventoryChart'));

        inventoryChart.setOption(this.pieOptions)

        this.echartsArr.push(inventoryChart);

      },

      // 柱状图分析
      drawChart2(){
        if (!document.querySelector('#inventoryChart2')) {
          return
        }
        // 基于准备好的dom，初始化echarts实例
        let inventoryChart = echarts.init(document.querySelector('#inventoryChart2'));

        inventoryChart.setOption(this.pieOptions)

        this.echartsArr.push(inventoryChart);

      },


    },
    components: {

    }
  }

</script>



