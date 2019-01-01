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
            <div class='list-item-top'>{{item.roomNo}}</div>
            <div class='list-item-content clearfix'>
              <div v-if='item.status > 2' class='list-item-message' :class='item.status == 3 ? "success" : item.status == 4 ? "error" : "info"'>
                <span class='iconfont icon-huiyuan'></span>
                <span class='no'>{{item.no}}</span> 排
                <span class='iconfont icon-shijian'></span>
                <span class='timer'>{{item.restTimer}}</span>
              </div>
              <div class='center' :class='item.status == 1 ? "warning":"success"' v-if='item.status < 3' >{{item.satusText}}</div>
              <div class='mask' v-if='item.status == 5'>
                <span class='mask-text'>{{item.timer}} <span>分钟</span></span>
                <div class='mask-opacity'></div>
              </div>
            </div>
            <div class='list-item-bottom'>消费:{{item.money}}元</div>
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
  import { pieOptions } from '@Util/charts';
  export default {
    props: ['navData'],
    data() {
      return {

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
            id: 1,
            status: 1,
            money: 556,
            timer: 117,
            no: '036',
            restTimer: '4m',
            roomNo: 'A05',
            satusText: '空闲'
          },
          {
            id: 2,
            status: 2,
            money: 556,
            timer: 117,
            no: '036',
            restTimer: '4m',
            roomNo: 'A05',
            satusText: '已开房'
          },
          {
            id: 3,
            status: 3,
            money: 556,
            timer: 117,
            no: '036',
            restTimer: '4m',
            roomNo: 'A05',
            satusText: '已开房'
          },
          {
            id: 4,
            status: 4,
            money: 556,
            timer: 117,
            no: '036',
            restTimer: '4m',
            roomNo: 'A05',
            satusText: '已开房'
          },
          {
            id: 5,
            status: 5,
            money: 556,
            timer: 117,
            no: '036',
            restTimer: '4m',
            roomNo: 'A05',
            satusText: '已开房'
          },
        ]

      }
    },
    mounted(){
      this.listData= this.listData.concat(this.listData)
    },
    computed: mapState({
      // 名字
      username: state => state.login.userInfo.username,


    }),
    methods: {



    },
    components: {

    }
  }

</script>



