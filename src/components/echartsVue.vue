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
            <!-- <div class="clearfix echartsData"> -->
              <div class='echarts-main clearfix'>
                <div id="inventoryChart" style="width: 100%;height: 100%;" />
              </div>

              <!-- 浴足客流量 -->
              <div class="echarts-total clearfix">
                <div class="echarts-total-item">
                  <div class='item-label'>浴足总客流</div>
                  <div class='item-value color-info'>￥{{customerDataTotal}}</div>
                </div>
                <div class="echarts-total-item">
                  <div class='item-label'>已买单</div>
                  <div class='item-value color-success'>￥{{customerData.paidMQty}}</div>
                </div>
                <div class="echarts-total-item">
                  <div class='item-label'>未买单</div>
                  <div class='item-value color-warning'>￥{{customerData.notPaidMQty}}</div>
                </div>
                <div class="echarts-total-item">
                  <div class='item-label'>等待</div>
                  <div class='item-value'>￥{{customerData.waitMQty}}</div>
                </div>
              </div>

              <!-- 棋牌客流量 -->
              <!-- holderType = 1 时，才有棋牌客流 -->
              <div v-if="holderType == 1" class="echarts-total echarts-total2 clearfix">
                <div class="echarts-total-item">
                  <div class='item-label'>棋牌总客流</div>
                  <div class='item-value color-info'>￥{{customerDataTotal2}}</div>
                </div>
                <div class="echarts-total-item">
                  <div class='item-label'>已买单</div>
                  <div class='item-value color-success'>￥{{customerData.paidTQty}}</div>
                </div>
                <div class="echarts-total-item">
                  <div class='item-label'>未买单</div>
                  <div class='item-value color-warning'>￥{{customerData.notPaidTQty}}</div>
                </div>
              </div>

              <!-- 营业额 -->
              <div class="echarts-total echarts-total2 clearfix">
                <div class="echarts-total-item">
                  <div class='item-label'>今日营业额</div>
                  <div class='item-value color-info'>￥{{customerTotalMoney}}</div>
                </div>
                <div class="echarts-total-item">
                  <div class='item-label'>已买单</div>
                  <div class='item-value color-success'>￥{{customerData.paidMoney}}</div>
                </div>
                <div class="echarts-total-item">
                  <div class='item-label'>未买单</div>
                  <div class='item-value color-warning'>￥{{customerData.notPaidMoney}}</div>
                </div>
              </div>
            <!-- </div> -->

            <div class="statistical-title marginT-20">
              <span class='text-title'>收款方式</span>
            </div>

            <div class='list-block-main clearfix'>
              <div class='clearfix'>
                <div class='list-block'
                      v-for="(item,index) in paymentMethods"
                      :key="index" >
                      <div class='clearfix' v-if="item.payName">
                        <div class='list-block-label' > {{item.payName}}</div>
                        <div class='list-block-value' >￥ {{item.moneySum}}</div>
                        <div class='list-block-percent' >{{item.percent}}</div>
                      </div>
                      <div class='clearfix' v-else>
                        <div class='list-block-label' ></div>
                        <div class='list-block-label' > - </div>
                      </div>
                </div>
              </div>
              <div class='list-block-total'> 总计： <span class='total-value'>￥{{paymentTotalMoney}}</span> </div>
            </div>

            <div class='statistical-title'>
              <span class='text-title'>会员卡信息</span>
            </div>

            <div class='echarts-main clearfix marginB-20'>
              <div id="inventoryChart2" style="width: 100%;height:100%;" />
            </div>

            

            <div class='statistical-title'>
              <span class='text-title'>收款合计</span>
            </div>
            <div class='oper-block-box clearfix'>
              <div class='list-block-main clearfix'>
                <div class='clearfix'>
                  <div class='list-block'
                        v-for="(item,index) in collectionData"
                        :key="index" >
                        <div class='clearfix' v-if="item.payName">
                          <div class='list-block-label' > {{item.payName}}</div>
                          <div class='list-block-value' >￥ {{item.moneySum}}</div>
                          <div class='list-block-percent' >{{item.percent}}</div>
                        </div>
                        <div class='clearfix' v-else>
                        <div class='list-block-label' ></div>
                        <div class='list-block-label' > - </div>
                      </div>
                  </div>
                </div>
                <div class='list-block-total'> 收款合计： <span class='total-value'>￥{{totalMoney}}</span> </div>
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
        currentInfo: {},
        echartsArr: [],
        pieOptions: pieOptions,

        // 小程序传递过来的参数
        holderType: 0,
        // 客流量
        customerData:{
          // 浴足
          "paidMQty": 6,
          "notPaidMQty": 4,
          "waitMQty": 0,
          // 棋牌
          "paidTQty": 4,
          notPaidTQty: 0,

          "paidMoney": 267.0,
          "notPaidMoney": 1391.66
        },

        // 收款方式汇总
        paymentMethods: [],
        paymentTotalMoney: 0,


        // 会员卡信息
        memberCardData: {
          "consumedTotal":267,// 消费总计
          "cardLeftTotal":68279.02,// 卡剩余
          "cardLeftNetValue":68248.02, //卡净值
          "firstCount":1,  //新增会员
          "firstTotal":1000,
          "continuCount":2, //续费会员
          "continuTotal":2000,
          "redFlushAndrefundCount":0,
          "redFlushAndrefundTotal":0,
          "sumGiftTotal":0,
          "rechargeMoneyDaily":0,
          "rechargeCountDaily":0,
          "showDailyFlag":"0",
          "rechargeMoneySum":3000,
          "rechargeCountSum":3
        },

        // 收款合计
        collectionData: [],
        totalMoney: 0,

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
    computed: mapState({
      // 名字
      username: state => state.login.userInfo.username,
      customerDataTotal(){
        return this.customerData.paidMQty+this.customerData.notPaidMQty+this.customerData.waitMQty
      },
      customerDataTotal2(){
        return this.customerData.paidTQty+this.customerData.notPaidTQty
      },
      customerTotalMoney(){
        return this.customerData.paidMoney+this.customerData.notPaidMoney
      }

    }),
    mounted(){
      let currentInfo = localStorage.getItem('currentInfo')
      this.currentInfo = JSON.parse(currentInfo)


      

      // ['微信支付','现金','会员卡','银行卡','团购']
      // let list = [
      //             {value:335, name:'微信支付'},
      //             {value:310, name:'现金'},
      //             {value:234, name:'会员卡'},
      //             {value:135, name:'银行卡'},
      //             {value:1548, name:'团购'}
      //         ]

      // this.pieOptions.series[0].data = list

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

      // this.$ajaxGet('/api/movie/in_theaters').then( res => {
      //   debugger
      // })

      this.getData();

      this.getCollection()

      this.getChartList()

      this.getMemberCard()

      // 收款合计信息
      this.getCollectionData()
      // this.drawChart1()
      // this.drawChart2()
    },
    methods: {
      goPage(url){
        this.$router.push({name: url})
      },



      getData(){
        let params = {
          holderId: this.currentInfo.holderId,
          holderType: this.currentInfo.holderType,
          holdrGroup: this.currentInfo.holdGroup,
        }
        this.$ajaxPost(urls.GETBILLINFOWITHOUTFREE, params).then(res => {
          if(res){
            //
            // debugger;
          }
        })
      },

      // 获取收款方式
      getCollection(){
        // let params = {
        //   holderId: this.currentInfo.holderId,
        //   holderType: this.currentInfo.holderType,
        //   holdrGroup: this.currentInfo.holdGroup,
        // }
        // this.$ajaxPost('/api/wechatMini/getBillInfoWithFree', params).then(res => {
        //   if(res){
        //     //
        //     // debugger;
        //   }
        // })

        this.paymentMethods = [
          {"moneyCount":1,"holderId":100,"moneySum":300,"payType":17,"payName":"cvs","payOrder":1},
          {"moneyCount":1,"holderId":100,"moneySum":267,"payType":2,"payName":"会员卡","payOrder":25},
          {"moneyCount":1,"holderId":100,"moneySum":1272,"payType":1,"payName":"现金","payOrder":777}
        ]

        this.paymentMethods.forEach(item => {
          this.paymentTotalMoney += item.moneySum
        })

        let num = 4 - this.paymentMethods.length % 4;
        if (num) {
          for (var i = 0; i < num; i++) {
            this.paymentMethods.push({
              payName: '',
              moneySum: ''
            })
          }
        }
        

        this.paymentMethods.forEach(item => {
          item.percent = (item.moneySum/this.paymentTotalMoney).toFixed(4) * 100 + '%'
        })
      },

      // 获取会员卡信息 饼图 统计
      getMemberCard(){
        // let params = {
        //   holderId: '',
        //   holderType: 1,
        //   holderGroup: 1,
        // }
        // this.$ajaxPost(urls.GETRECHARGESUMINFO, params).then(res => {
        //   if(res){
        //    let data = this.memberCardData
        //     let list = [
        //       {
        //         name: '卡剩余',
        //         value: data.cardLeftTotal
        //       },
        //       {
        //         name: '卡净值',
        //         value: data.cardLeftNetValue
        //       }
        //     ]
        //     this.drawChart2(list)
        //   }
        // })

        let data = this.memberCardData
            let list = [
              {
                name: '卡剩余',
                value: data.cardLeftTotal
              },
              {
                name: '卡净值',
                value: data.cardLeftNetValue
              }
            ]
            this.drawChart2(list)
      },

      // 收款合计
      getCollectionData(){
        // let params = {
        //   holderId: this.currentInfo.holderId,
        //   holderType: this.currentInfo.holderType,
        //   holdrGroup: this.currentInfo.holdGroup,
        // }
        // this.$ajaxPost(urls.GETCASHFLOWSUMINFO, params).then(res => {
        //   if(res){
            
        //   }
        // })

        this.collectionData = [
          {"moneyCount":6,"holderId":100,"moneySum":4800,"payType":17,"payName":"cvs","payOrder":1},
          {"moneyCount":2,"holderId":100,"moneySum":0,"payType":1,"payName":"现金","payOrder":777}
        ]

        this.collectionData.forEach(item => {
          this.totalMoney += item.moneySum
        })

        let num = 4 - this.collectionData.length % 4;
        if (num) {
          for (var i = 0; i < num; i++) {
            this.collectionData.push({
              payName: '',
              moneySum: ''
            })
          }
        }
        
        

        this.collectionData.forEach(item => {
          item.percent = (item.moneySum/this.totalMoney).toFixed(4) * 100 + '%'
        })
      },
      


      // 获取charts图一
      getChartList(){

        // this.$ajaxPost(urls.GETBUSINESSBASEINFO).then(res => {
        //   if(res){
        //     let data = this.dealChartData1(res)
        //     this.drawChart1(data)
        //   }
        // })

        let data = this.dealChartData1()
        this.drawChart1(data)

      },

      dealChartData1(data){
        data =[
          {"moneyCount":1,"holderId":100,"moneySum":300,"payType":17,"payName":"微信","payOrder":1},
          {"moneyCount":1,"holderId":100,"moneySum":267,"payType":2,"payName":"会员卡","payOrder":25},
          {"moneyCount":1,"holderId":100,"moneySum":1272,"payType":1,"payName":"现金","payOrder":777}
        ]
        let list = [];
        data.forEach(item => {
          list.push({
            name: item.payName,
            value: item.moneySum
          })
        });

        return list
      },

       // 饼图图一
      drawChart1(list){
        if (!document.querySelector('#inventoryChart')) {
          return
        }
        // 基于准备好的dom，初始化echarts实例
        let inventoryChart = echarts.init(document.querySelector('#inventoryChart'));

        let breakageChartoption = this.pieOptions

        breakageChartoption.series[0].data = list

        inventoryChart.setOption(breakageChartoption)

        this.echartsArr.push(inventoryChart);

      },

      // 饼图图二
      drawChart2(list){
        if (!document.querySelector('#inventoryChart2')) {
          return
        }
        // 基于准备好的dom，初始化echarts实例
        let inventoryChart = echarts.init(document.querySelector('#inventoryChart2'));

        let breakageChartoption = this.pieOptions

        breakageChartoption.series[0].data = list

        inventoryChart.setOption(breakageChartoption)

        this.echartsArr.push(inventoryChart);

      },


    },
    components: {

    }
  }

</script>



