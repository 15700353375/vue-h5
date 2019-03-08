<!--
 * @Author:      changh
 * @DateTime:    2018-12-27
 * @Description: 房间状态
 -->

<template>
  <div id="minirefresh3" class="minirefresh-wrap">
    <div class="minirefresh-scroll">

      <div class='technician-container'>
        <div class='tec-main clearfix'>
          <div class='tec-title'>保健师</div>
          <div class='tec-content clearfix'>
            <div class='tec-item' v-for="(item,index) in listData" :key='index'
            :class="item.finishWorkWillPauseFlag == 1 ? 'item-bg5' : 'item-bg'+item.statusFlag">
            <!-- 下钟后暂停会多一个暂停标记,字段finishWorkWillPauseFlag:1 -->
              <div class="item-top">
                <div class="item-top-left">
                  {{item.sex == 1 ? '女' : '男'}}
                </div>
                <div class="item-top-center">
                  {{item.workFlag == 3 ? '加' : item.sortsName}}
                </div>
                <div class="item-top-right">
                  <!-- <span v-if="item.finishWorkWillPauseFlag == 0" class='iconfont icon-gengduomore12'></span> -->
                  <span v-if="item.finishWorkWillPauseFlag == 1" class='iconfont icon-tianchongxing-'></span>
                </div>
              </div>
              <div class="item-center">
                {{item.number}}
                <!-- 当workFlag =2 并且statusFlag = 3 or 4   下班 -->
                <div class="noWork" v-if="item.workFlag == 2 && (item.statusFlag == 3 || item.statusFlag == 4)">
                 <span>下</span>
                 <span>班</span>
                </div>
              </div>

              <div class="item-bottom">
                <div class="item-bottom-left">
                  {{item.paizhong}}
                </div>
                <div class="item-bottom-center">
                  <!-- 非上钟 -->
                  <span v-if="item.statusFlag != 3" class="item-bottom-center-span">{{dealStatus(item.statusFlag)}}</span>
                  <!-- 上钟  1:排钟，2:选钟，3:加钟，4:点钟-->
                  <span v-else class="item-bottom-center-span">{{dealOper(item.oper)}}</span>
                </div>
                <div class="item-bottom-right">
                  {{item.dianzhong}}
                </div>
              </div>
            </div>
          </div>
          <div class='tec-footer'>总数：{{dataInfo1.totalPersonNum}}&nbsp;&nbsp;/&nbsp;&nbsp;空闲：{{dataInfo1.freePersonNum}}&nbsp;&nbsp;/&nbsp;&nbsp;忙碌：{{dataInfo1.workingPersonNum}}</div>
        </div>

        <div class='tec-main clearfix'>
          <div class='tec-title'>足疗师</div>
          <div class='tec-content clearfix'>
            <div class='tec-item' v-for="(item,index) in listData2" :key='index'
            :class="item.finishWorkWillPauseFlag == 1 ? 'item-bg5' : 'item-bg'+item.statusFlag">
              <div class="item-top">
                <div class="item-top-left">
                  {{item.sex == 1 ? '女' : '男'}}
                </div>
                <div class="item-top-center">
                  {{item.workFlag == 2 ? '加' : item.sortsName}}
                </div>
                <div class="item-top-right">
                  <!-- <span v-if="item.finishWorkWillPauseFlag == 0" class='iconfont icon-gengduomore12'></span> -->
                  <span v-if="item.finishWorkWillPauseFlag == 1" class='iconfont icon-tianchongxing-'></span>
                </div>
              </div>
              <div class="item-center">
                {{item.number}}
              </div>

              <div class="item-bottom">
                <div class="item-bottom-left">
                  {{item.paizhong}}
                </div>
                <div class="item-bottom-center">
                  <!-- 非上钟 -->
                  <span v-if="item.statusFlag != 3" class="item-bottom-center-span">{{dealStatus(item.statusFlag)}}</span>
                  <!-- 上钟  1:排钟，2:选钟，3:加钟，4:点钟-->
                  <span v-else class="item-bottom-center-span">{{dealOper(item.oper)}}</span>
                </div>
                <div class="item-bottom-right">
                  {{item.dianzhong}}
                </div>
              </div>
            </div>
          </div>
          <div class='tec-footer'>总数：{{dataInfo2.totalPersonNum}}&nbsp;&nbsp;/&nbsp;&nbsp;空闲：{{dataInfo2.freePersonNum}}&nbsp;&nbsp;/&nbsp;&nbsp;忙碌：{{dataInfo2.workingPersonNum}}</div>
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
  import axios from 'axios'
  import {urls} from '@Util/axiosConfig';
  import MiniRefreshTools from 'minirefresh';
  export default {
    props: ['currentData'],
    data() {
      return {

        currentInfo: {},

        dataInfo1:{
          totalPersonNum: 0,
          freePersonNum: 0,
          workingPersonNum: 0
        },

        listData: [{
          sex: 1,
          workFlag: 2,
          statusFlag:3,
          number: '234',
          oper: '2'
        }],

        dataInfo2:{
          totalPersonNum: 0,
          freePersonNum: 0,
          workingPersonNum: 0
        },

        listData2: []

      }
    },
    watch:{
      currentData(newVal,oldVal){
        if(newVal == 2){
          this.getTecList();
        }
      }
    },
    created(){
      let currentInfo = localStorage.getItem('currentInfo')
      this.currentInfo = JSON.parse(currentInfo)

      this.getTecList();
    },
    mounted(){
      let that = this;
      var miniRefresh = new MiniRefresh({
          container: '#minirefresh3',
          down: {
              callback: function() {
                that.getTecList();
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

      // 获取技师列表
      getTecList(){
        let params = {
          holderId: this.currentInfo.holderId,
          holderGroup: this.currentInfo.holdGroup,
        }
        this.$ajaxPost(urls.GETTECHNICIANQUEUE, params).then(res => {
          if(res){
            this.dataInfo1 = res.data[0].depart;
            this.listData = res.data[0].all_queue
            this.dataInfo2 = res.data[1].depart;
            this.listData2 = res.data[1].all_queue
          }
        })
      },

      dealOper(oper){
        oper = Number(oper)
        // 1:排钟，2:选钟，3:加钟，4:点钟
        let name = '';
        switch (oper) {
          case 1 : name = '排'; break;
          case 2 : name = '选'; break;
          case 3 : name = '加'; break;
          case 4 : name = '点'; break;
        }
        return name
      },

      dealStatus(data){
        data = Number(data)
        // 1：暂停  2：空闲  3：上钟  4: 待上
        let name = '';
        switch (data) {
          case 1 : name = '暂停'; break;
          case 2 : name = '空闲'; break;
          case 3 : name = '上钟'; break;
          case 4 : name = '待上'; break;
        }
        return name
      }

    },
    components: {

    }
  }

</script>



