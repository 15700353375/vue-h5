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
            <div class='tec-item' v-for="(item,index) in listData" :key='index'>
              <div class="item-top">
                <div class="item-top-left">
                  男
                </div>
                <div class="item-top-center">
                  早
                </div>
                <div class="item-top-right">
                  <span class='iconfont icon-huiyuan' :class="{'error': item.status == 3}"></span>
                </div>
              </div>
              <div class="item-center">
                089
              </div>

              <div class="item-bottom">
                <div class="item-bottom-left">
                  8
                </div>
                <div class="item-bottom-center">
                  <span class="item-bottom-center-span">暂停</span>
                </div>
                <div class="item-bottom-right">
                  9
                </div>
              </div>
              
              <!-- <div class='tec-item-num' :class='item.status == 1 ? "success": item.status == 2 ? "warning": "info"'>015</div>
              <div class='tec-item-type clearfix' :class='item.status == 1 ? "success": item.status == 2 ? "warning": "info"'>
                <span class='tec-item-type-left'>0</span>
                <span class='tec-item-type-center'>暂停</span>
                <span class='tec-item-type-right'>0</span>
              </div> -->
            </div>
          </div>
          <div class='tec-footer'>空闲： 10 忙碌：45 预约： 30 暂停： 44</div>
        </div>

        <div class='tec-main clearfix'>
          <div class='tec-title'>足疗师</div>
          <div class='tec-content clearfix'>
            <div class='tec-item' v-for="(item,index) in listData" :key='index'>
              <span class='iconfont icon-huiyuan' :class="{'error': item.status == 3}"></span>
              <div class='tec-item-num' :class='item.status == 1 ? "success": item.status == 2 ? "warning": "info"'>015</div>
              <div class='tec-item-type clearfix' :class='item.status == 1 ? "success": item.status == 2 ? "warning": "info"'>
                <span class='tec-item-type-left'>0</span>
                <span class='tec-item-type-center'>暂停</span>
                <span class='tec-item-type-right'>0</span>
              </div>
            </div>
          </div>
          <div class='tec-footer'>空闲： 10 忙碌：45 预约： 30 暂停： 44</div>
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

        listData: [
          {
            sex: 2, //"1":女 , "2":男
            sortsName: '早',// 显示班次(早或中或晚) 但如果是加班，就不显示早中晚啦。只显示“加”字
            number: '089', //技师工号
            paizhong: 2, // 排钟数量
            dianzhong: 3, // 点钟数量
            statusFlag: 1, //但上钟时就根据oper的状态来显示。只需要显示一个字（排，点，选，加）
            oper: 2, //1:排钟，2:选钟，3:加钟，4:点钟
            workFlag: 1, //"1":上班  "2":下班  "3"：加班
            id: 1,
            no: '023',
            status: 1,
            leftNo: 0,
            rightNo: 0,
            text: '空闲'
          }
        ]

      }
    },
    mounted(){
      let currentInfo = localStorage.getItem('currentInfo')
      this.currentInfo = JSON.parse(currentInfo)

      this.listData= this.listData.concat(this.listData,this.listData)

    },
    computed: mapState({
      // 名字
      username: state => state.login.userInfo.username,


    }),
    methods: {

      // 获取技师列表
      getTecList(){
        GETTECHNICIANQUEUE
        let params = {
          holderId: this.currentInfo.holderId,
          holderGroup: this.currentInfo.holdGroup,
        }
        this.$ajaxPost(urls.GETTECHNICIANQUEUE, params).then(res => {
          if(res){
            
          }
        })
      }



    },
    components: {

    }
  }

</script>



