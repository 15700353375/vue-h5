<!--
 * @Author:      changh
 * @DateTime:    2018-12-25
 * @Description: 底部菜单栏
 -->

<template>
  <div class="bottomBar">
    <div class='bottom-tabs-item'
        :class='{"active": currentType == item.url}'
        v-for="(item,index) in list"
        :key='index'
        @click="goPage(item.url)">
      <i class="iconfont" :class="item.icon"></i>
      <div class='bottom-tabs-item-text'>{{item.name}}</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.bottomBar{
  height: 120px;
  width: 100%;
  overflow: hidden;
  background: #fff;
  box-sizing: border-box;
  border-top: 1px solid #ddd;
  .bottom-tabs-item{
    width: 33.33%;
    height: 100%;
    text-align: center;
    float: left;
    // padding-top: 10px;
    i{
      color: #666;
      font-size: 46px;
    }
    .bottom-tabs-item-text{
      color: #666;
      font-size: 26px;
      line-height: 26px;
    }

    &.active{
      i{
        color:#3b76b2;
      }
      .bottom-tabs-item-text{
        color:#3b76b2;
      }
    }
  }
}
</style>



<script>
  //加载相关依赖
  import { mapState } from 'vuex';

  export default {
    props: ['navData'],
    data() {
      return {
        currentType: 'statistical',
        list: [
          {
            icon: 'icon-shouye2',
            name: '即时信息',
            url: 'statistical',
            id: 1
          },
          {
            icon: 'icon-laoban',
            name: '报表决策',
            url: 'report',
            id: 2
          },
          // {
          //   icon: 'icon-guanli',
          //   name: '经营管理',
          //   url: 'manager',
          //   id: 3
          // },
          {
            icon: 'icon-tubiaolunkuo-',
            name: '我的',
            url: 'myself',
            id: 4
          }
        ]

      }
    },
    mounted(){
      // 获取当前路由
      console.log(this.$route.name)
      this.currentType = this.$route.name;
    },
    computed: mapState({
      // 名字
      username: state => state.login.userInfo.username,


    }),
    methods: {
      goPage(url){
        this.$router.push({name: url})
      }


    },
    components: {

    }
  }

</script>



