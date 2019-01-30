<!--
 * @Author:      changh
 * @DateTime:    2018-12-27
 * @Description: 房间状态
 -->

<template>
  <div id="minirefresh" class="minirefresh-wrap">
    <div class="minirefresh-scroll">
      <div class='room-container'>
        <div class='clearfix select-main'>
          <select name="select1" v-model="select1" @change="changeSelect()">
            <option v-for="(item,index) in selectArray" :key='index' :value="item.value">{{item.label}}</option>
          </select>
          <select name="select1" v-model="select2" @change="changeSelect()">
            <option v-for="(item,index) in selectArray2" :key='index' :value="item.value">{{item.label}}</option>
          </select>
        </div>

        <div class='clearfix list-main'>
          <div class='list-item' v-for='(item,index) in listData' :key='index'>
            <div v-if="dealClass(item.roomStatus)" class='list-item-top' :class="dealClass(item.roomStatus) ? 'active'+item.roomOrder.billBatch : ''">
               {{item.roomOrder.billBatch}} {{item.roomName}}
              <!-- 字段：roomOrder.totalGoodsAmount,如果roomType字段值为2时，在钱后面显示+号，其他情况不显示+号 -->
              <span v-if="item.roomOrder" class="item-top-right">￥{{item.roomOrder.totalGoodsAmount || 0}}{{item.roomType == 2 ? '+' : ''}}</span>
            </div>
            <div v-else class='list-item-top'>
              {{item.roomName}}
            </div>
            <div v-if="item.roomStatus == 5" class='list-item-content clearfix'>

              <div class="content-first">使用中</div>
              <div class="content-second " v-for="(child,index) in item.cashierShowTechnicianInfoList" :key="index">
                <!-- 当字段status为待上钟状态(1)和正在上钟状态(2)时，如果字段isTimeout显示为true,表示技师超时，该行背景变为红色，正常情况下显示绿色 -->
                <template v-if="index < 3">
                  <div class="second-left" :class="statusColor(item.status,item.isTimeout)">
                    <span class='fa ' :class="child.sex == 1 ? 'fa-male': 'fa-female'"></span>
                    {{child.number}}
                  </div>
                  <div class="second-center">{{child.statusName}}</div>
                  <div class="second-right">{{child.timing}}</div>
                </template>
              </div>
              <!-- 字段：remark,房间备注。roomStatus是使用中(5)，房间暂停(11)，已结账未离开(8)，需要打扫(9)时，如果有备注，需要显示，对于已结账未离开(8)和需要打扫(9)状态-->
              <div class="content-bottom" v-if="item.roomStatus == 5 || item.roomStatus == 11">
                <span v-if="item.remark">备注:{{item.remark}}</span>
              </div>

              <!-- 字段restMinute，所有技师均完成服务，客人休息分钟数遮层显示，如果字段restMinute有值，就显示该遮层，如果休息时间分钟数大于24小时，需要前端逻辑处理把分钟数改为天数 -->
              <div class="mask" v-if="item.restMinute">
                <div class="mask-opacity"></div>
                <span v-if="item.restDay" class="mask-text mask-text-text">{{item.restDay}}<span class="unit">天</span></span>
                <span v-else class="mask-text mask-text-text">{{item.restMinute}}<span class="unit">分钟</span></span>
              </div>

              <div class="mask" v-if="item.roomStatus == 11">
                <div class="mask-text">
                  <div class="img-box"><img src="agentstatic/img/pauseBtn.png" alt=""></div>
                  <div class="texts">暂停使用</div>
                </div>
              </div>
              <!-- <div class="mask">
                <div class="mask-opacity"></div>
                <span class='mask-text iconfont icon-huiyuan'></span>
                <div class="mask-text">
                  <div class="img-box"><img src="agentstatic/img/continueBtn.png" alt=""></div>
                  <div class="texts">继续使用</div>
                </div>
                <div class="mask-text">
                  <div class="img-box"><img src="agentstatic/img/pauseBtn.png" alt=""></div>
                  <div class="texts">暂停使用</div>
                </div>
                <span class="mask-text mask-text-text">48分钟</span>
              </div> -->
            </div>

            <div v-else class='list-item-content clearfix'>
              <div class="kong-content clearfix">
                <div class="icon-box">
                  <img src="agentStatic/img/icon-free.png" alt="">
                </div>
                <!-- 字段：seatNum，座位数，只有空闲中，需要打扫，已买单未离开状态才显示 -->
                <div class="kong-text" v-if="item.roomStatus == 2">
                  空闲中({{item.seatNum}})
                </div>
                <div class="kong-text" v-if="item.roomStatus == 8">
                  客人未离开
                  <div v-if="item.remark" class="remark text-ellipsis2">
                    备注:{{item.remark}}
                  </div>
                </div>
                <div class="kong-text" v-if="item.roomStatus == 9">
                  需要打扫
                  <div v-if="item.remark" class="remark text-ellipsis2">
                    备注：{{item.remark}}
                  </div>
                </div>
                <div class="kong-text" v-if="item.roomStatus == 1">
                  房间停用
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>



</style>



<script>
  //加载相关依赖
  import { mapState } from 'vuex';
  import comUtil from '@Util/comUtil';
  import { pieOptions } from '@Util/charts';
  import countDown from '@Components/countDown'
  import countAdd from '@Components/countAdd'
  import {urls} from '@Util/axiosConfig';
  export default {
    props: ['navData'],
    data() {
      return {
        comUtil: comUtil,
        // roomType 1 浴足房间；2 棋牌房间
        selectArray: [{
            value: "0",
            label: "全部"
          }, {
            value: "1",
            label: "浴足房间"
          }, {
            value: "2",
            label: "棋牌房间"
          },
        ],
        // roomStatus
        // 1：停用
        // 2：空闲中
        // 5：使用中
        // 8：已买单未离开
        // 9：需要打扫
        // 10：已预约
        // 11:房间暂停
        selectArray2: [
          {
            value: "0",
            label: "全部"
          }, {
            value: "1",
            label: "停用"
          }, {
            value: "2",
            label: "空闲中"
          }, {
            value: "5",
            label: "使用中"
          }, {
            value: "8",
            label: "已买单未离开"
          }, {
            value: "9",
            label: "需要打扫"
          },
          // {
          //   value: "10",
          //   label: "已预约"
          // },
          {
            value: "11",
            label: "房间暂停"
          }
        ],

        select1: null,
        select2: null,

        listData: []

      }
    },
    mounted(){
      let currentInfo = localStorage.getItem('currentInfo')
      this.currentInfo = JSON.parse(currentInfo)

      this.getRoomList();
    },
    computed: mapState({
      // 名字
      username: state => state.login.userInfo.username,

    }),
    methods: {
      // 筛选
      changeSelect(){
        let select1 = Number(this.select1);
        let select2 = Number(this.select2);
        if(select1 && !select2){
          this.listData =  _.filter(this.allData, { 'roomType': this.select1 });
        }else if(select1 && select2){
          this.listData =  _.filter(this.allData, { 'roomType': this.select1, 'roomStatus': this.select2});
        }else if(!select1 && select2){
          this.listData =  _.filter(this.allData, { 'roomStatus': this.select2});
        }else{
          this.listData = comUtil.clone(this.allData)
        }
      },

      // 获取技师列表
      getRoomList(){
        let params = {
          holderId: this.currentInfo.holderId,
          holderType: this.currentInfo.holderType,
          holderGroup: this.currentInfo.holdGroup,
        }
        this.$ajaxPost(urls.GETROOMINFO, params).then(res => {
          if(res){
            this.allData = this.dealData(res.data);
            this.listData = comUtil.clone(this.allData)
          }
        })
      },
      // 处理时间
      dealData(list){
        if(!list || !list.length) return;
        list.forEach(item => {
          item.restDay = this.transformTime(item.restMinute)
        })
        return list;
      },

      transformTime(time){
        let newTime = null
        if(time > 1440){
          newTime = Math.ceil(time/1440)
        }else{
          newTime = null
        }

        return newTime;
      },

      // 顶部颜色
      dealClass(status){
        // 是在roomStatus为3,5,11,12时才存在
        let flag = false;
        if(status == 3 || status == 5 || status == 11 ||  status == 12){
          flag = true
        }else{
          flag = false;
        }

        return flag;
      },

      // 中间颜色
      // 当字段status为待上钟状态(1)和正在上钟状态(2)时，如果字段isTimeout显示为true,表示技师超时，该行背景变为红色，正常情况下显示绿色
      statusColor(status,isTimeout){
        let color = ''
        if(status == 1 || status == 2){
          if(isTimeout == true){
            color = 'color-error'
          }else{
            color = 'color-success'
          }
        }else if(status == 3){
          color = 'color-success'
        }else{
          color = 'color-warning'
        }
        return color;
      }



    },
    components: {
      countDown,
      countAdd
    }
  }

</script>



