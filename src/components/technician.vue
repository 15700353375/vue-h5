<!--
 * @Author:      changh
 * @DateTime:    2018-12-27
 * @Description: 房间状态
 -->

<template>
  <div id="minirefresh" class="minirefresh-wrap">
    <div class="minirefresh-scroll">

      <div class='technician-container'>
        <div class='tec-main clearfix'>
          <div class='tec-title'>保健师</div>
          <div class='tec-content clearfix'>
            <div class='tec-item' v-for="(item,index) in listData" :key='index' :class="'item-bg'+item.statusFlag">
              <div class="item-top">
                <div class="item-top-left">
                  {{item.sex == 1 ? '女' : '男'}}
                </div>
                <div class="item-top-center">
                  {{item.workFlag == 2 ? '加' : item.sortsName}}
                </div>
                <div class="item-top-right">
                  <span v-if="item.finishWorkWillPauseFlag == 0" class='iconfont icon-gengduomore12'></span>
                  <span v-else class='iconfont icon-tianchongxing-'></span>
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
          <div class='tec-footer'>总数：{{dataInfo1.totalPersonNum}} 空闲：{{dataInfo1.freePersonNum}} 忙碌：{{dataInfo1.workingPersonNum}}</div>
        </div>

        <div class='tec-main clearfix'>
          <div class='tec-title'>足疗师</div>
          <div class='tec-content clearfix'>
            <div class='tec-item' v-for="(item,index) in listData2" :key='index' :class="'item-bg'+item.statusFlag">
              <div class="item-top">
                <div class="item-top-left">
                  {{item.sex == 1 ? '女' : '男'}}
                </div>
                <div class="item-top-center">
                  {{item.workFlag == 2 ? '加' : item.sortsName}}
                </div>
                <div class="item-top-right">
                  <span v-if="item.finishWorkWillPauseFlag == 0" class='iconfont icon-gengduomore12'></span>
                  <span v-else class='iconfont icon-tianchongxing-'></span>
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
          <div class='tec-footer'>总数：{{dataInfo2.totalPersonNum}} 空闲：{{dataInfo2.freePersonNum}} 忙碌：{{dataInfo2.workingPersonNum}}</div>
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
  export default {
    props: ['navData'],
    data() {
      return {

        currentInfo: {},

        dataInfo1:{
          totalPersonNum: 0,
          freePersonNum: 0,
          workingPersonNum: 0
        },

        listData: [],

        dataInfo2:{
          totalPersonNum: 0,
          freePersonNum: 0,
          workingPersonNum: 0
        },

        listData2: []

      }
    },
    mounted(){
      let currentInfo = localStorage.getItem('currentInfo')
      this.currentInfo = JSON.parse(currentInfo)

      // this.listData= this.listData.concat(this.listData,this.listData)
      this.getTecList()
    },
    computed: mapState({
      // 名字
      username: state => state.login.userInfo.username,


    }),
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
        console.log(11111111,data,name)
        return name
      }



    },
    components: {

    }
  }

</script>



