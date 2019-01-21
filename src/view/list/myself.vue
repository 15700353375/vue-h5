<!--
 * @Author:      changh
 * @DateTime:    2018-12-25
 * @Description: 我的
 -->
<template>
  <div class="clearfix container">

    <div class="report-main">
        <div class='personal-container'>
          <div class='personal-info'>
            <div class='personal-img-box'>
              <img src="agentStatic/img/11.jpg" alt="">
            </div>
            <div class='personal-content'>
              <div class='personal-name'>古天乐</div>
              <div class='personal-desc'>您的付费体验还剩下 <span>0</span> 天</div>
              <div class='personal-type'>管理者</div>
              <div class='personal-btn' type="default">续费</div>
            </div>
          </div>

          <div class='funciton-content'>
            <div class='function-item'>
              消息列表
              <span class='right-vision'>0元</span>
            </div>
            <div class='function-item'>
              最低折扣
              <span class='right-vision'>100%</span>
            </div>
          </div>

          <div class='funciton-content'>
            <div class='function-item'>
              在线登录授权
              <span class='right-vision'>未开放</span>
            </div>
            <div class='function-item'>
              涨钟宝报警
              <span class='iconfont icon-jiantou'></span>
            </div>
          </div>

          <div class='funciton-content'>
            <div class='function-item'>
              有效期至
              <span class='right-vision'>2019.01.01</span>
            </div>
            <div class='function-item'>
              当前版本
              <span class='right-vision'>v1.0.0</span>
            </div>
          </div>
        </div>

    </div>
    <bottomBar></bottomBar>
  </div>
</template>
<style lang="less" scoped>
  .container{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

.report-main{
  flex: 1;
  width: 100%;
}

</style>

<script>
  import {
          urls,
          baseUrl} from '@Util/axiosConfig';
  import comUtil from '@Util/comUtil';
  import bottomBar from '@Components/bottomBar'
  export default {
    data(){
      return{


      }
    },
    mounted(){
      // token失效时-强制跳转到绑定登录页面
      wx.miniProgram.redirectTo({
        url:'/pages/logs/logs',
        success: function(){
            console.log('success')
        },
        fail: function(){
            console.log('fail');
        },
        complete:function(){
            console.log('complete');
        }

      });

    },
    methods: {



    },
    components:{
      bottomBar,
    }
  }
</script>
