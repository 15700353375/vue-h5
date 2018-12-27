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
  import { pieOptions } from '@Util/charts';
  export default {
    props: ['navData'],
    data() {
      return {

        listData: [
          {
            id: 1,
            no: '023',
            status: 1,
            leftNo: 0,
            rightNo: 0,
            text: '空闲'
          },
          {
            id: 2,
            no: '024',
            status: 2,
            leftNo: 0,
            rightNo: 1,
            text: '点'
          },
          {
            id: 3,
            no: '025',
            status: 3,
            leftNo: 0,
            rightNo: 0,
            text: '暂停'
          },
          {
            id: 4,
            no: '023',
            status: 1,
            leftNo: 0,
            rightNo: 0,
            text: '空闲'
          },
          {
            id: 5,
            no: '024',
            status: 2,
            leftNo: 0,
            rightNo: 1,
            text: '点'
          },
          {
            id: 6,
            no: '025',
            status: 3,
            leftNo: 0,
            rightNo: 0,
            text: '暂停'
          },
        ]

      }
    },
    mounted(){
      this.listData= this.listData.concat(this.listData,this.listData)

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



