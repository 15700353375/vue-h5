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
              <span class='text-right'>{{today}} 统计</span>
            </div>
            <!-- <div class="clearfix echartsData"> -->
              <div class='echarts-main clearfix'>
                <div id="inventoryChart" style="width: 100%;height: 100%;" />
              </div>

              <!-- 浴足客流量 -->
              <div class="echarts-total clearfix">
                <div class="echarts-total-item">
                  <div class='item-label'>浴足总客流</div>
                  <div class='item-value color-info'>￥{{comUtil.formatNumber(customerDataTotal)}}</div>
                </div>
                <div class="echarts-total-item">
                  <div class='item-label'>已买单</div>
                  <div class='item-value color-success'>￥{{comUtil.formatNumber(customerData.paidMQty)}}</div>
                </div>
                <div class="echarts-total-item">
                  <div class='item-label'>未买单</div>
                  <div class='item-value color-warning'>￥{{comUtil.formatNumber(customerData.notPaidMQty)}}</div>
                </div>
                <div class="echarts-total-item">
                  <div class='item-label'>等待</div>
                  <div class='item-value'>￥{{comUtil.formatNumber(customerData.waitMQty)}}</div>
                </div>
              </div>

              <!-- 棋牌客流量 -->
              <!-- holderType = 1 时，才有棋牌客流 -->
              <div v-if="holderType == 1" class="echarts-total echarts-total2 clearfix">
                <div class="echarts-total-item">
                  <div class='item-label'>棋牌总客流</div>
                  <div class='item-value color-info'>￥{{comUtil.formatNumber(customerDataTotal2)}}</div>
                </div>
                <div class="echarts-total-item">
                  <div class='item-label'>已买单</div>
                  <div class='item-value color-success'>￥{{comUtil.formatNumber(customerData.paidTQty)}}</div>
                </div>
                <div class="echarts-total-item">
                  <div class='item-label'>未买单</div>
                  <div class='item-value color-warning'>￥{{comUtil.formatNumber(customerData.notPaidTQty)}}</div>
                </div>
              </div>

              <!-- 营业额 -->
              <div class="echarts-total echarts-total2 clearfix">
                <div class="echarts-total-item">
                  <div class='item-label'>今日营业额</div>
                  <div class='item-value color-info'>￥{{comUtil.formatNumber(customerTotalMoney)}}</div>
                </div>
                <div class="echarts-total-item">
                  <div class='item-label'>已买单</div>
                  <div class='item-value color-success'>￥{{comUtil.formatNumber(customerData.paidMoney)}}</div>
                </div>
                <div class="echarts-total-item">
                  <div class='item-label'>未买单</div>
                  <div class='item-value color-warning'>￥{{comUtil.formatNumber(customerData.notPaidMoney)}}</div>
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
  import comUtil from '@Util/comUtil';
  import {urls} from '@Util/axiosConfig';
  import { pieOptions } from '@Util/charts';
  import MiniRefreshTools from 'minirefresh';
  export default {
    props: ['navData'],
    data() {
      return {
        comUtil: comUtil,
        currentInfo: {},
        echartsArr: [],
        pieOptions: pieOptions,

        today: null,

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

      this.today = Moment().format('YYYY-MM-DD HH:mm:ss')
      let currentInfo = localStorage.getItem('currentInfo')
      this.currentInfo = JSON.parse(currentInfo)


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

      this.getCollection()

      this.getChartList()

      this.getMemberCard()

      // 收款合计信息
      this.getCollectionData()

    },
    methods: {
      goPage(url){
        this.$router.push({name: url})
      },


      // 统计数据
      getData(){
        let params = {
          holderId: this.currentInfo.holderId,
          holderType: this.currentInfo.holderType,
          holderGroup: this.currentInfo.holdGroup,
        }
        this.$ajaxPost(urls.GETBUSINESSBASEINFO, params).then(res => {
          if(res){
            this.customerData = res.data;
          }
        })
      },

      // 获取收款方式
      getCollection(){
        let params = {
          holderId: this.currentInfo.holderId,
          holderType: this.currentInfo.holderType,
          holderGroup: this.currentInfo.holdGroup,
        }
        this.$ajaxPost(urls.GETBILLINFOWITHFREE, params).then(res => {
          if(res){
            this.paymentMethods = res.data;

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
          }
        })


      },

      // 获取会员卡信息 饼图 统计
      getMemberCard(){
        let params = {
          holderId: this.currentInfo.holderId,
          holderType: this.currentInfo.holderType,
          holderGroup: this.currentInfo.holdGroup,
        }
        this.$ajaxPost(urls.GETRECHARGESUMINFO, params).then(res => {
          if(res){
           let data = res.data
            let list = [
              {
                name: '卡剩余',
                value: comUtil.formatNumber(data.cardLeftTotal)
              },
              {
                name: '卡净值',
                value: comUtil.formatNumber(data.cardLeftNetValue)
              }
            ]
            this.drawChart2(list)
          }
        })
      },

      // 收款合计
      getCollectionData(){
        let params = {
          holderId: this.currentInfo.holderId,
          holderType: this.currentInfo.holderType,
          holderGroup: this.currentInfo.holdGroup,
        }
        this.$ajaxPost(urls.GETCASHFLOWSUMINFO, params).then(res => {
          if(res){
            this.collectionData = res.data;
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
          }
        })

      },



      // 获取charts图一
      getChartList(){

        let params = {
          holderId: this.currentInfo.holderId,
          holderType: this.currentInfo.holderType,
          holderGroup: this.currentInfo.holdGroup,
        }

        this.$ajaxPost(urls.GETBILLINFOWITHOUTFREE, params).then(res => {
          if(res){
            let data = this.dealChartData1(res)
            this.drawChart1(data)
          }
        })

      },

      dealChartData1(data){
        if(!data || !data.length){
          return
        }
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



