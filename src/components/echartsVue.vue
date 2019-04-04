<!--
 * @Author:      changh
 * @DateTime:    2018-12-27
 * @Description: 营业数据
 -->

<template>
<div id="minirefresh1" class="minirefresh-wrap">
  <div class="minirefresh-scroll">
    <div class="echarts-container">

      <!-- 顶部筛选条件 -->
      <div class="clearfix filterMain">
        <div class="clearfix filterMain_a">
          <a :class="{'active' : searchCurrent == 2}" @click="searchTab(2)">昨日</a>
          <a :class="{'active' : searchCurrent == 3}" @click="searchTab(3)">近1周</a>
          <a :class="{'active' : searchCurrent == 4}" @click="searchTab(4)">近2周</a>
          <a :class="{'active' : searchCurrent == 5}" @click="searchTab(5)">近1月</a>
          <a :class="{'active' : searchCurrent == 6}" @click="searchTab(6)">自定义</a>
          <a class="float_right" :class="{'active' : searchCurrent == 1}" @click="searchTab(1)">今日</a>
        </div>
        <transition name="fade">
           <!-- v-if="searchCurrent == 6" -->
          <div class="custom" v-if="searchCurrent == 6">
            <div class="custom_input">
              <div class="simulate_input" id='datePicker' @click="startTimeClick">{{startTime}}</div>
              <div class="simulate_input" id='datePicker2' @click="endTimeClick">{{endTime}}</div>
            </div>
            <button @click="sureSearch">确定</button>
          </div>
        </transition>
      </div>
      <div class="statistical-title">
        <span class='text-title'>营业信息</span>
        <span class='text-right'>{{today}} 统计</span>
      </div>

      <!-- echats图一  模块一 -->
      <div class='echarts-main clearfix'>
        <div class="echarts-content">
          <div id="inventoryChart" style="width: 100%;height: 100%;" />
        </div>
        <!-- 右侧浴足 -->
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
      <!-- 营业额 -->
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
          <div class="item-value item-value-warning" v-if="isToday"> ￥{{parseInt(customerData.notPaidMoney) || 0}}</div>
          <div class="item-value item-value-warning" v-else> - </div>
        </div>
      </div>


      <!-- 挂单（24小时以上未结账） 模块二 -->
      <div class="statistical-title marginT-20">
        <span class='text-title'>挂单预估（24小时以上未结账单）</span>
      </div>

      <div v-if="customerData.notPaidMoneyMoreThan24H != null" class='list-block-main clearfix'>
        <div class='list-block-total'> 总计： <span class='total-value'>￥{{parseInt(customerData.notPaidMoneyMoreThan24H)}}</span> </div>
      </div>
      <div v-else class='list-block-main clearfix'>
        <div class="noData">暂无数据</div>
      </div>

      <!-- 收款方式  模块二 -->
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


      <!-- 会员卡信息  模块三 -->
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

      <!-- 收款合计 模块四 -->
      <div class='statistical-title'>
        <span class='text-title'>现金流</span>
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
          <div class='list-block-total'> 现金流合计： <span class='total-value'>￥{{totalMoney}}</span> </div>
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
  import axios from 'axios'
  import comUtil from '@Util/comUtil';
  import {urls} from '@Util/axiosConfig';
  import { pieOptions, pieOptions2 } from '@Util/charts';
  import MiniRefreshTools from 'minirefresh';
  export default {
    props: ['currentData'],
    data() {
      return {
        comUtil: comUtil,
        currentInfo: {},
        echartsArr: [],
        pieOptions1: pieOptions,
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
          notPaidMoney: 0,
          notPaidMoneyMoreThan24H: null,
        },

        isToday: true,

        // 收款方式汇总
        paymentMethods: [],
        paymentTotalMoney: 0,

        // 会员卡信息
        memberCardData: {},

        // 收款合计
        collectionData: [],
        totalMoney: 0,

        searchCurrent: 1,

        // 控制可选时间
        startDate: Moment().subtract(60, 'days').format('YYYY-MM-DD'),
        endDate: Moment().format('YYYY-MM-DD'),
        // 时间筛选
        startTime: '',
        endTime: ''

      }
    },
    watch:{
      currentData(newVal,oldVal){
        if(newVal == 0){
          this.searchCurrent = 1
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
                that.searchCurrent = 1;
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
        let start = null
        let end = null
        switch(this.searchCurrent){
          case 1:  break;
          case 2: end = Moment().format("YYYY-MM-DD HH:mm");start = Moment().subtract(1, 'days').format("YYYY-MM-DD HH:mm"); break;
          case 3: end = Moment().format("YYYY-MM-DD HH:mm");start = Moment().subtract(7, 'days').format("YYYY-MM-DD HH:mm"); break;
          case 4: end = Moment().format("YYYY-MM-DD HH:mm");start = Moment().subtract(14, 'days').format("YYYY-MM-DD HH:mm"); break;
          case 5: end = Moment().format("YYYY-MM-DD HH:mm");start = Moment().subtract(1, 'months').format("YYYY-MM-DD HH:mm"); break;
          case 6: start= `${this.startTime} ${Moment().format("HH:mm")}`; end=`${this.endTime} ${Moment().format("HH:mm")}`; break;
          default: start = null;end = null;
        }
        if(!this.searchCurrent || this.searchCurrent == 1){
          this.getTimer()
        }

        this.getData(start, end);

        this.getCollection(start, end);

        this.getChartList(start, end);

        this.getMemberCard(start, end);

        // 收款合计信息
        this.getCollectionData(start, end);

      },

      // 搜索框切换
      searchTab(tab){
        this.searchCurrent = tab;

        if(this.searchCurrent == 6){
          return
        }
        app.Loading.start()
        setTimeout(()=>{
          app.Loading.end()
        },1000)
        this.refresh()

      },
      // 开始时间
      startTimeClick(){
        let that = this;
        // 示例1：
        weui.datePicker({
            start: this.startDate,
            end: this.endDate,
            defaultValue: [new Date().getFullYear(), new Date().getMonth()+1, new Date().getDate()],
            onConfirm: function(result){
              that.startTime = `${result[0].value}-${result[1].value}-${result[2].value}`
            },
            id: 'datePicker'
        });
      },
      // 结束时间
      endTimeClick(){
        let that = this;
        // 示例1：
        weui.datePicker({
            start: this.startDate,
            end: this.endDate,
            defaultValue: [new Date().getFullYear(), new Date().getMonth()+1, new Date().getDate()],
            onConfirm: function(result){
                that.endTime =`${result[0].value}-${result[1].value}-${result[2].value}`
            },
            id: 'datePicker2'
        });
      },

      // 获取可选时间
      getTimer(){
        let params = {
          holderId: this.currentInfo.holderId
        }
        this.$ajaxPost(urls.GETBUSINESSDATEINFO, params).then(res => {
          if(res){
            // 需求： 结束时间用获取到的开始时间 开始时间在结束时间前60天  默认显示结束时间前三天
            // 格式化时间，处理后台返回时间不合理问题
            let start = new Date(res.data.start.replace(/-/g, '/'))
            this.endDate = Moment(start).format('YYYY-MM-DD')
            this.startDate = Moment(start).subtract(60, 'days').format('YYYY-MM-DD')
            this.endTime = Moment(start).format('YYYY-MM-DD')
            this.startTime = Moment(start).subtract(3, 'days').format('YYYY-MM-DD')
          }
        })
      },

      // 搜索
      sureSearch(){
        let startTime = new Date(Date.parse(this.startTime.replace(/-/g, "/")))
        let endTime = new Date(Date.parse(this.endTime.replace(/-/g, "/")))
        if((endTime - startTime)<0){
          app.Toast.text('开始时间不能大于结束时间')
          return
        }else{
          app.Loading.start()
          setTimeout(()=>{
            app.Loading.end()
          },1000)
          this.refresh()
        }
      },

      // 统计数据
      getData(start,end){
        let params = {
          holderId: this.currentInfo.holderId,
          holderType: this.currentInfo.holderType,
          holderGroup: this.currentInfo.holdGroup,
          start: start,
          end: end
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
        if(this.searchCurrent != 1){
          this.customerData.notPaidMoney = 0
          this.isToday = false
        }else{
          this.isToday = true
        }
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
      getCollection(start,end){
        let params = {
          holderId: this.currentInfo.holderId,
          holderType: this.currentInfo.holderType,
          holderGroup: this.currentInfo.holdGroup,
          start: start,
          end: end
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
        this.paymentTotalMoney = _.sumBy(this.paymentMethods, 'moneySum');
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
      getMemberCard(start,end){
        let params = {
          holderId: this.currentInfo.holderId,
          holderType: this.currentInfo.holderType,
          holderGroup: this.currentInfo.holdGroup,
          start: start,
          end: end
        }
        this.$ajaxPost(urls.GETRECHARGESUMINFO, params).then(res => {
          if(res){
           let data = res.data
            let list = [
              {
                name: '今日卡消',
                // value: comUtil.formatNumber(data.consumedTotal)
                value: 300
              },
              {
                name: '今日充卡',
                // value: comUtil.formatNumber(data.rechargeMoneySum)
                value: 256
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
      getCollectionData(start,end){
        let params = {
          holderId: this.currentInfo.holderId,
          holderType: this.currentInfo.holderType,
          holderGroup: this.currentInfo.holdGroup,
          start: start,
          end: end
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
        this.totalMoney = _.sumBy(this.collectionData, 'moneySum');

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
      getChartList(start,end){

        let params = {
          holderId: this.currentInfo.holderId,
          holderType: this.currentInfo.holderType,
          holderGroup: this.currentInfo.holdGroup,
          start: start,
          end: end
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
          return []
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
          breakageChartoption.series[1].data = []
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
        // let cardLeftTotal = parseInt(this.memberCardData.cardLeftTotal) || 0
        // breakageChartoption.series[0].data = [{value: cardLeftTotal, name:'卡余额'}]
        breakageChartoption.series[0].data = []
        breakageChartoption.series[1].data = list

        inventoryChart.setOption(breakageChartoption)

        this.echartsArr.push(inventoryChart);

      },

    },
    components: {
    }
  }

</script>

