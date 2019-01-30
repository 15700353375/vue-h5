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

              <div class="show-total clearfix">
                <div class="total-title">浴足客流量：{{comUtil.formatNumber(customerData.customerTotalMoney)}}人</div>
                <div class="show-main">
                  <div class="show-mian-item color-success" :style="{width: customerData.paidMoney_percent}"></div>
                  <div class="show-mian-item color-error" :style="{width: customerData.notPaidMoney_percent}"></div>
                </div>
                <div class="show-content clearfix">
                  <div class="show-content-item">
                    <span class="show-label color-success"></span>
                    <span class="show-value">已买单: {{comUtil.formatNumber(customerData.paidMoney)}}</span>
                  </div>
                  <div class="show-content-item">
                    <span class="show-label color-error"></span>
                    <span class="show-value">未买单: {{comUtil.formatNumber(customerData.notPaidMoney)}}</span>
                  </div>
                </div>
              </div>

              <div v-if="currentInfo.holderType == 1" class="show-total clearfix">
                <div class="total-title">浴足客流量：{{comUtil.formatNumber(customerData.customerDataTotal)}}人</div>
                <div class="show-main">
                  <div class="show-mian-item color-success" :style="{width: customerData.paidMQty_percent}"></div>
                  <div class="show-mian-item color-error" :style="{width: customerData.notPaidMQty_percent}"></div>
                  <div class="show-mian-item color-info" :style="{width: customerData.waitMQty_percent}"></div>
                </div>
                <div class="show-content clearfix">
                  <div class="show-content-item">
                    <span class="show-label color-success"></span>
                    <span class="show-value">已买单: {{comUtil.formatNumber(customerData.paidMQty)}}</span>
                  </div>
                  <div class="show-content-item">
                    <span class="show-label color-error"></span>
                    <span class="show-value">未买单: {{comUtil.formatNumber(customerData.notPaidMQty)}}</span>
                  </div>
                  <div class="show-content-item">
                    <span class="show-label color-info"></span>
                    <span class="show-value">等待: {{comUtil.formatNumber(customerData.waitMQty)}}</span>
                  </div>
                </div>
              </div>

              <div v-if="currentInfo.holderType == 2" class="show-total clearfix">
                <div class="total-title">浴足客流量：{{comUtil.formatNumber(customerData.customerDataTotal2)}}人</div>
                <div class="show-main">
                  <div class="show-mian-item color-success" :style="{width: customerData.paidTQty_percent}"></div>
                  <div class="show-mian-item color-error" :style="{width: customerData.notPaidTQty_percent}"></div>
                  <div class="show-mian-item color-info" :style="{width: customerData.waitTQty_percent}"></div>
                </div>
                <div class="show-content clearfix">
                  <div class="show-content-item">
                    <span class="show-label color-success"></span>
                    <span class="show-value">已买单: {{comUtil.formatNumber(customerData.paidTQty)}}</span>
                  </div>
                  <div class="show-content-item">
                    <span class="show-label color-error"></span>
                    <span class="show-value">未买单: {{comUtil.formatNumber(customerData.notPaidTQty)}}</span>
                  </div>
                  <div class="show-content-item">
                    <span class="show-label color-info"></span>
                    <span class="show-value">等待: {{comUtil.formatNumber(customerData.waitTQty)}}</span>
                  </div>
                </div>
              </div>


            <div class="statistical-title marginT-20">
              <span class='text-title'>收款方式</span>
            </div>

            <div v-if="paymentMethods && paymentMethods.length" class='list-block-main clearfix'>
              <div class='clearfix'>
                <div class='list-block'
                      v-for="(item,index) in paymentMethods"
                      :key="index" >
                      <div class='clearfix' v-if="item.payName">
                        <div class='list-block-label' > {{item.payName}}</div>
                        <div class='list-block-value' >￥ {{comUtil.formatNumber(item.moneySum)}}</div>
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
            <div v-else class='list-block-main clearfix'>
              <div class="noData">暂无数据</div>
            </div>

            <div class='statistical-title'>
              <span class='text-title'>会员卡信息</span>
            </div>

            <div class='echarts-main clearfix'>
              <div id="inventoryChart2" style="width: 100%;height:100%;" />
            </div>

            <div class="show-total clearfix marginB-20">
                <div class="total-title">会员量：{{comUtil.formatNumber(memberCardData.total)}}人</div>
                <div class="show-main">
                  <div class="show-mian-item color-success" :style="{width: memberCardData.firstCount_percent}"></div>
                  <div class="show-mian-item color-error" :style="{width: memberCardData.continuCount_percent}"></div>
                </div>
                <div class="show-content clearfix">
                  <div class="show-content-item">
                    <span class="show-label color-success"></span>
                    <span class="show-value">续费会员: {{comUtil.formatNumber(memberCardData.firstCount)}}</span>
                  </div>
                  <div class="show-content-item">
                    <span class="show-label color-error"></span>
                    <span class="show-value">新增会员: {{comUtil.formatNumber(memberCardData.continuCount)}}</span>
                  </div>
                </div>
              </div>



            <div class='statistical-title'>
              <span class='text-title'>收款合计</span>
            </div>
            <div class='oper-block-box clearfix'>
              <div v-if="collectionData && collectionData.length" class='list-block-main clearfix'>
                <div class='clearfix'>
                  <div class='list-block'
                        v-for="(item,index) in collectionData"
                        :key="index" >
                        <div class='clearfix' v-if="item.payName">
                          <div class='list-block-label' > {{item.payName}}</div>
                          <div class='list-block-value' >￥ {{comUtil.formatNumber(item.moneySum)}}</div>
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
              <div v-else class='list-block-main clearfix'>
                <div class="noData">暂无数据</div>
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
  import { pieOptions, funnelOption } from '@Util/charts';
  import MiniRefreshTools from 'minirefresh';
  export default {
    props: ['currentData'],
    data() {
      return {
        comUtil: comUtil,
        currentInfo: {},
        echartsArr: [],
        pieOptions: pieOptions,
        funnelOption: funnelOption,

        today: null,

        // 小程序传递过来的参数
        holderType: 0,
        // 客流量
        customerData:{
          // 浴足
          paidMQty: 0,
          notPaidMQty: 0,
          waitMQty: 0,
          // 棋牌
          paidTQty: 0,
          notPaidTQty: 0,
          waitTQty: 0,

          paidMoney: 0,
          notPaidMoney: 0
        },

        // 收款方式汇总
        paymentMethods: [],
        paymentTotalMoney: 0,


        // 会员卡信息
        memberCardData: {},

        // 收款合计
        collectionData: [],
        totalMoney: 0,

      }
    },
    computed: mapState({
      // 名字
      username: state => state.login.userInfo.username,
    }),
    watch:{
      currentData(newVal,oldVal){
        console.log(oldVal,newVal)
        if(newVal == 0){
          this.refresh();

        }
      }
    },
    created(){
      
      let currentInfo = localStorage.getItem('currentInfo')
      this.currentInfo = JSON.parse(currentInfo)
      console.log(this.currentInfo)
      this.refresh();
    },
    mounted(){

      this.today = Moment().format('YYYY-MM-DD HH:mm:ss')
      
      let that = this;

      var miniRefresh = new MiniRefresh({
          container: '#minirefresh',
          down: {
              callback: function() {
                that.refresh();
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
    },
    methods: {
      refresh(){
        this.getData();

        this.getCollection()

        this.getChartList()

        this.getMemberCard()

        // 收款合计信息
        this.getCollectionData()
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
            this.dealTotalData();
          }
        })
      },

      dealTotalData(){
        this.customerData['customerTotalMoney'] = this.customerData.paidMoney+this.customerData.notPaidMoney
        this.customerData['paidMoney_percent'] = comUtil.formatNumber(this.customerData.paidMoney/this.customerData.customerTotalMoney * 100) +'%';
        this.customerData['notPaidMoney_percent'] = comUtil.formatNumber(this.customerData.notPaidMoney/this.customerData.customerTotalMoney * 100) +'%';

        this.customerData['customerDataTotal'] = this.customerData.paidMQty+this.customerData.notPaidMQty+this.customerData.waitMQty
        this.customerData['paidMQty_percent'] = comUtil.formatNumber(this.customerData.paidMQty/this.customerData.customerDataTotal * 100) +'%';
        this.customerData['notPaidMQty_percent'] = comUtil.formatNumber(this.customerData.notPaidMQty/this.customerData.customerDataTotal * 100) +'%';
        this.customerData['waitMQty_percent'] = comUtil.formatNumber(this.customerData.waitMQty/this.customerData.customerDataTotal * 100) +'%';

        this.customerData['customerDataTotal2'] = this.customerData.paidTQty+this.customerData.notPaidTQty
        this.customerData['paidTQty_percent'] = comUtil.formatNumber(this.customerData.paidTQty/this.customerData.customerDataTotal2 * 100) +'%';
        this.customerData['notPaidTQty_percent'] = comUtil.formatNumber(this.customerData.notPaidTQty/this.customerData.customerDataTotal2 * 100) +'%';
        this.customerData['waitTQty_percent'] = comUtil.formatNumber(this.customerData.waitTQty/this.customerData.customerDataTotal2 * 100) +'%';
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
            if(this.paymentMethods && this.paymentMethods.length){
              this.dealCollectionData();
            }
          }
        })
      },
      dealCollectionData(){
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
          item.percent = (new Number(item.moneySum/this.paymentTotalMoney) * 100).toFixed(2)+ '%'
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

            this.dealMemberData(res.data);
            this.drawChart2(list)
          }
        })
      },

      dealMemberData(data){
        this.memberCardData = data;
        this.memberCardData['total'] = data.firstCount+data.continuCount
        this.memberCardData['firstCount_percent'] = comUtil.formatNumber(data.firstCount/this.memberCardData.total * 100) +'%';
        this.memberCardData['continuCount_percent'] = comUtil.formatNumber(data.continuCount/this.customerData.total * 100) +'%';
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
            if(this.collectionData && this.collectionData.length){
              this.dealCollectionData2()
            }

          }
        })
      },
      dealCollectionData2(){
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

        let params = {
          holderId: this.currentInfo.holderId,
          holderType: this.currentInfo.holderType,
          holderGroup: this.currentInfo.holdGroup,
        }

        this.$ajaxPost(urls.GETBILLINFOWITHOUTFREE, params).then(res => {
          if(res){
            let data = this.dealChartData1(res.data)
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
        if(!list || !list.length){
          breakageChartoption.series[0].data = [
            {
              name: '今日营业',
              value: 0
            }
          ]
          breakageChartoption.series[0].label = {
            show: false
          }
        }else{
          breakageChartoption.title.show = false;
          breakageChartoption.series[0].data = list
        }

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

        if(!list || !list.length){
          breakageChartoption.series[0].data = [
            {
              name: '今日营业',
              value: 0
            }
          ]
          breakageChartoption.series[0].label = {
            show: false
          }
        }else{
          breakageChartoption.title.show = false;
          breakageChartoption.series[0].data = list
        }

        inventoryChart.setOption(breakageChartoption)

        this.echartsArr.push(inventoryChart);

      },


    },
    components: {

    }
  }

</script>



