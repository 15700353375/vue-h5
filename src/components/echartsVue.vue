<!--
 * @Author:      changh
 * @DateTime:    2018-12-27
 * @Description: 营业数据
 -->

<template>
<div id="minirefresh1" class="minirefresh-wrap">
  <div class="minirefresh-scroll">
    <div class="echarts-container">

      <div class="clearfix filterMain">
        <a :class="{'active' : searchCurrent == 1}" @click="searchTab(1)">今天</a>
        <a :class="{'active' : searchCurrent == 2}" @click="searchTab(2)">最近一周</a>
        <a :class="{'active' : searchCurrent == 3}" @click="searchTab(3)">近一月</a>
        <a :class="{'active' : searchCurrent == 4}" @click="searchTab(4)">自定义</a>
        <div class="custom" v-if="searchCurrent == 4">
          <input id='datePicker' @click="startTimeClick" v-model="startTime" placeholder="开始时间"/>
          <input id='datePicker2' @click="endTimeClick" v-model="endTime" placeholder="结束时间"/>
          <button>确定</button>
        </div>
      </div>
      <div class="statistical-title">
        <span class='text-title'>营业信息</span>
        <span class='text-right'>{{today}} 统计</span>
      </div>
      <div class='echarts-main clearfix'>
        <div class="echarts-content">
          <div id="inventoryChart" style="width: 100%;height: 100%;" />
        </div>

        <!-- 浴足 -->
        <div class="show-total clearfix">

          <div class="show-content clearfix">
            <div class="show-content-item">
              <span class="show-label color-success"></span>
              <span class="show-value">已买单</span>
            </div>
            <div class="show-content-item">
              <span class="show-label color-error"></span>
              <span class="show-value">未买单</span>
            </div>
            <div class="show-content-item">
              <span class="show-label color-info"></span>
              <span class="show-value">等待</span>
            </div>
          </div>
          <div class="clearfix show-main-main">
            <div class="show-main">
                <div v-if="customerData.paidMQty"
                    class="show-mian-item color-success"
                    :style="{height: customerData.paidMQty_percent}">
                    <span>{{customerData.paidMQty}}</span>
                </div>
                <div v-if="customerData.notPaidMQty"
                    class="show-mian-item color-error"
                    :style="{height: customerData.notPaidMQty_percent}">

                    <span>{{customerData.notPaidMQty}}</span>
                </div>
                <div v-if="customerData.waitMQty"
                    class="show-mian-item color-info"
                    :style="{height: customerData.waitMQty_percent}">
                    <span>{{customerData.waitMQty}}</span>
                </div>
            </div>
          </div>

          <div class="total-title">浴足{{parseInt(customerData.customerDataTotal) || 0}}人</div>
        </div>
      </div>

      <div class="echarts-total">
        <div class="echarts-total-item">
          <div class="item-label">营业额</div>
          <div class="item-value"> ￥{{parseInt(Number(customerData.paidMoney) + Number(customerData.notPaidMoney)) || 0}}</div>
        </div>
        <div class="echarts-total-item">
          <div class="item-label">已买单</div>
          <div class="item-value item-value-success"> ￥{{parseInt(customerData.paidMoney) || 0}}</div>
        </div>
        <div class="echarts-total-item">
          <div class="item-label">未买单</div>
          <div class="item-value item-value-warning"> ￥{{parseInt(customerData.notPaidMoney) || 0}}</div>
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

      <div class='echarts-main clearfix echarts-main2'>
        <!-- 会员 -->
        <div class="show-total clearfix show-total2">

          <div class="show-content clearfix">
            <div class="show-content-item">
              <span class="show-label color-error"></span>
              <span class="show-value">新增会员</span>
            </div>
            <div class="show-content-item">
              <span class="show-label color-info"></span>
              <span class="show-value">续费会员</span>
            </div>
          </div>
          <div class="clearfix show-main-main">
            <div class="show-main">
                <div v-if="memberCardData.firstCount"
                    class="show-mian-item color-error"
                    :style="{height: memberCardData.firstCount_percent}">

                    <span>{{memberCardData.firstCount}}</span>
                </div>
                <div v-if="memberCardData.continuCount"
                    class="show-mian-item color-info"
                    :style="{height: memberCardData.continuCount_percent}">
                    <span>{{memberCardData.continuCount}}</span>
                </div>
            </div>
          </div>

          <div class="total-title">新增/续费</div>
        </div>

        <div class="echarts-content">
          <div id="inventoryChart2" style="width: 100%;height:100%;" />
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
  import { pieOptions, pieOptions2 } from '@Util/charts';
  import MiniRefreshTools from 'minirefresh';
// import { setTimeout } from 'timers';
  export default {
    props: ['currentData'],
    data() {
      return {
        comUtil: comUtil,
        currentInfo: {},
        echartsArr: [],
        pieOptions1: comUtil.clone(pieOptions),
        pieOptions2: pieOptions2,

        today: null,

        // 小程序传递过来的参数
        holderType: 0,

        // 客流量
        customerData:{
          // 浴足
          paidMQty: 0,
          notPaidMQty: 0,
          waitMQty: 0,

          paidMQty_percent: 0,
          notPaidMQty_percent: 0,
          waitMQty_percent: 0,
          // 棋牌
          paidTQty: 0,
          notPaidTQty: 0,
          waitTQty: 0,
          // 支付
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

        searchCurrent: null,

        startTime: '',
        endTime: ''

      }
    },
    computed: mapState({
      // 名字
      username: state => state.login.userInfo.username,
    }),
    watch:{
      currentData(newVal,oldVal){
        if(newVal == 0){
          this.refresh();
        }
      }
    },
    created(){

      let currentInfo = localStorage.getItem('currentInfo')
      this.currentInfo = JSON.parse(currentInfo)
      this.refresh();
    },
    mounted(){

      this.today = Moment().format('YYYY-MM-DD HH:mm:ss')

      let that = this;

      var miniRefresh = new MiniRefresh({
          container: '#minirefresh1',
          down: {
              callback: function() {
                that.refresh();
                setTimeout(()=>{
                  // 结束下拉刷新
                  miniRefresh.endDownLoading();
                },2000)
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

      searchTab(tab){
        this.searchCurrent = tab;
      },

      startTimeClick(){
        let that = this;
        // 示例1：
        this.$weui.datePicker({
            start: 1990,
            end: 2000,
            defaultValue: [1991, 6, 9],
            onChange: function(result){
                console.log(result);
            },
            onConfirm: function(result){

                that.startTime = result[0].label+result[1].label+result[2].label
                console.log(that.startTime);

            },
            id: 'datePicker'
        });
      },
      endTimeClick(){
        let that = this;
        // 示例1：
        this.$weui.datePicker({
            start: 1990,
            end: 2000,
            defaultValue: [1991, 6, 9],
            onChange: function(result){
                console.log(result);
            },
            onConfirm: function(result){
                console.log(result);
                that.endTime = result[0].label+result[1].label+result[2].label
            },
            id: 'datePicker2'
        });
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
            this.$nextTick(()=>{
              this.dealTotalData();
            })
          }
        })
      },

      dealTotalData(){
        let total = this.customerData.paidMQty+this.customerData.notPaidMQty+this.customerData.waitMQty
        let paidMQty_percent = comUtil.formatPercent(this.customerData.paidMQty/total) +'%';
        let notPaidMQty_percent = comUtil.formatPercent(this.customerData.notPaidMQty/total) +'%';
        let waitMQty_percent = comUtil.formatPercent(this.customerData.waitMQty/total) +'%';

        this.$set(this.customerData, 'customerDataTotal', total)
        this.$set(this.customerData, 'paidMQty_percent', paidMQty_percent)
        this.$set(this.customerData, 'notPaidMQty_percent', notPaidMQty_percent)
        this.$set(this.customerData, 'waitMQty_percent', waitMQty_percent)
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
        this.paymentTotalMoney = 0;
        this.paymentMethods.forEach(item => {
          this.paymentTotalMoney += Number(item.moneySum)
        })
        let remainder = this.paymentMethods.length % 4;
        let num = remainder ?  4 - remainder : 0;
        if (num) {
          for (var i = 0; i < num; i++) {
            this.paymentMethods.push({
              payName: '',
              moneySum: ''
            })
          }
        }

        setTimeout(()=>{
          this.paymentMethods.forEach((item,index) => {
            let obj = this.paymentMethods[index]
            obj['percent'] = comUtil.formatPercent(item.moneySum/this.paymentTotalMoney) + '%'
            this.$set(this.paymentMethods, index, obj);
          })
        },60)

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
                name: '今日卡消',
                value: comUtil.formatNumber(data.consumedTotal)
              },
              {
                name: '今日充卡',
                value: comUtil.formatNumber(data.rechargeMoneySum)
              }
            ]

            this.dealMemberData(res.data);
            this.$nextTick(()=>{
              this.drawChart2(list)
            })
          }
        })
      },

      dealMemberData(data){
        this.memberCardData = data;
        let total = data.firstCount+data.continuCount
        let firstCount_percent = comUtil.formatPercent(data.firstCount/total) +'%';
        let continuCount_percent = comUtil.formatPercent(data.continuCount/total) +'%';
        this.$set(this.memberCardData, 'total', total)
        this.$set(this.memberCardData, 'firstCount_percent', firstCount_percent)
        this.$set(this.memberCardData, 'continuCount_percent', continuCount_percent)
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
        this.totalMoney = 0;
        this.collectionData.forEach(item => {
          this.totalMoney += Number(item.moneySum)
        })

        let remainder = this.collectionData.length % 4;
        let num = remainder ?  4 - remainder : 0;
        if (num) {
          for (var i = 0; i < num; i++) {
            this.collectionData.push({
              payName: '',
              moneySum: ''
            })
          }
        }

        setTimeout(()=>{
          this.collectionData.forEach((item,index) => {
            let obj = this.collectionData[index]
            obj['percent'] = comUtil.formatPercent(item.moneySum/this.totalMoney) + '%'
            this.$set(this.collectionData, index, obj);
          })
        },60)

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
            this.$nextTick(()=>{
              this.drawChart1(data)
            })
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

        let breakageChartoption = this.pieOptions1
        if(!list || !list.length){
          breakageChartoption.series[0].data = [
            {
              name: '营业额',
              value: 0
            }
          ]
        }else{
          breakageChartoption.series[0].data = [];
          breakageChartoption.series[1].data = list
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

        let breakageChartoption = this.pieOptions2
        let cardLeftTotal = parseInt(this.memberCardData.cardLeftTotal) || 0
        breakageChartoption.series[0].data = [{value: cardLeftTotal, name:'卡余额'}]
        breakageChartoption.series[1].data = list

        inventoryChart.setOption(breakageChartoption)

        this.echartsArr.push(inventoryChart);

      },

    },
    components: {
    }
  }

</script>

