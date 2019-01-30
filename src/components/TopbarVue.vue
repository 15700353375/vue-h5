<!--
 * @Author:      changh
 * @DateTime:    2018
 * @Description: topbar以及内容区域
 -->

<template>
  <div class="topBar">
    <div class="displayNone">{{currentDataChange}}</div>
    <div class="topbar-item" v-for="(item,index) in classify" :class="{'active': curTab == item.id}" :key='index' @click="classifyClick(item.id)">{{item.name}}</div>
  </div>
</template>

<style lang="less" scoped>
  .topBar{
    height: 80px;
    width: 100%;
    overflow: hidden;
    background: #f1f1f1;
    border-bottom: 1px solid #ddd;
    box-sizing: border-box;
    .topbar-item{
      width: 33.33%;
      text-align: center;
      line-height: 77px;
      font-size: 30px;
      color: #000;
      float: left;
      border-bottom: 2px solid #f1f1f1;
      &.active{
        border-bottom: 2px solid #3b72f0;
      }
    }
  }
</style>


<script>
  //加载相关依赖
  import { mapState } from 'vuex';

  export default {
    props: ['currentData'],
    data() {
      return {
        classify: [
          {
            id: 0,
            name: '营业数据'
          },
          {
            id: 1,
            name: '房间状态'
          },
          {
            id: 2,
            name: '技师状态'
          }
        ],

        // 预设当前tab
        curTab: 0,

      }
    },

    mounted(){
      this.curTab = this.currentData;
    },
    computed: mapState({
      // 名字
      username: state => state.login.userInfo.username,

      currentDataChange(){
        this.curTab = this.currentData;
      }
    }),
    methods: {

      classifyClick(e) {
        this.curTab = e;
        this.$emit('changeSwiper',e);
      },

    },
    components: {

    }
  }

</script>



