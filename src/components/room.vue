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
          <select name="select1" id="">
            <option v-for="(item,index) in selectArray" :key='index' value="item.id">{{item.text}}</option>
          </select>
          <select name="select1" id="">
            <option v-for="(item,index) in selectArray" :key='index' value="item.id">{{item.text}}</option>
          </select>
        </div>

        <div class='clearfix list-main'>
          <div class='list-item' v-for='(item,index) in listData' :key='index'>
            <div class='list-item-top'>
              {{item.roomName}}
              <!-- 字段：roomOrder.totalGoodsAmount,如果roomType字段值为2时，在钱后面显示+号，其他情况不显示+号 -->
              <span v-if="item.roomOrder" class="item-top-right">￥{{item.roomOrder.totalGoodsAmount}} {{item.roomType == 2 ? '+' : ''}}</span>
            </div>
            <div class='list-item-content clearfix'>

              <div class="content-first">使用中 <button>更多</button></div>
              <div class="content-second">
                <div class="second-left">
                  <span class='iconfont icon-huiyuan'></span>
                  567
                </div>
                <div class="second-center">点钟</div>
                <div class="second-right">等待中</div>
              </div>
              <div class="content-second"></div>
              <div class="content-second"></div>
              <div class="content-bottom">
                备注：5阿斯顿发生
              </div>

              <!-- <div v-if='item.status > 2' class='list-item-message' :class='item.status == 3 ? "success" : item.status == 4 ? "error" : "info"'>
                <span class='iconfont icon-huiyuan'></span>
                <span class='no'>{{item.no}}</span> 排
                <span class='iconfont icon-shijian'></span>
                <span class='timer'>{{item.restTimer}}</span>
              </div>
              <div class='center' :class='item.status == 1 ? "warning":"success"' v-if='item.status < 3' >{{item.satusText}}</div>
              <div class='mask' v-if='item.status == 5'>
                <span class='mask-text'><countDown :endtime='item.timer'></countDown> <span>分钟</span></span>
                <div class='mask-opacity'></div>
              </div>
              <div class='mask' v-if='item.status == 4'>
                <span class='mask-text'><countAdd :endtime='item.timer'></countAdd> <span>分钟</span></span>
                <div class='mask-opacity'></div>
              </div> -->
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

        selectArray: [{
          "id": "1",
          "text": "全部"
        }, {
          "id": "2",
          "text": "足疗"
          }, {
            "id": "3",
            "text": "SPA"
          },
        ],
        selectArray2: [
          {
            "id": "1",
            "text": "全部"
          }, {
            "id": "2",
            "text": "空闲"
          }, {
            "id": "3",
            "text": "忙碌"
          }, {
            "id": "4",
            "text": "未打扫"
          }, {
            "id": "5",
            "text": "已预约"
          }, {
            "id": "6",
            "text": "已买单未离开"
          },
        ],

        listData: [
          {
            cancelHandleFlag: "1",
            remark: "",
            roomId: 114,
            roomName: "退单重结",
            roomStatus: "2",
            roomType: "1",
            roomWholeType: "1_8",
            seatNum: 3,
            sort: 9999
          }
        ]

      }
    },
    mounted(){
      let currentInfo = localStorage.getItem('currentInfo')
      this.currentInfo = JSON.parse(currentInfo)
      // ‘58e6cdd7e4484df5952e2a7aa546346b’
      // this.getRoomList();
    },
    computed: mapState({
      // 名字
      username: state => state.login.userInfo.username,


    }),
    methods: {

      // 获取技师列表
      getRoomList(){
        let params = {
          holderId: this.currentInfo.holderId,
          holderType: this.currentInfo.holderType,
          holderGroup: this.currentInfo.holdGroup,
        }
        this.$ajaxPost(urls.GETROOMINFO, params).then(res => {
          if(res){
            this.listData = res.data;
          }
        })
      },








    },
    components: {
      countDown,
      countAdd
    }
  }

</script>



