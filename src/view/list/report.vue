<!--
 * @Author:      changh
 * @DateTime:    2018-12-25
 * @Description: 报表决策
 -->
<template>
  <div class="clearfix report-container">
    <div class="report-main">

      <div class='report-block clearfix'>
        <div class="statistical-title">
          <span class='text-title'>营业报表</span>
        </div>
        <div class='report-content clearfix'>
          <div class='report-item'>
            <div class='report-item-icon bg-success'><span class='iconfont icon-zhouqifuwushiduan'></span></div>
            <div class='report-item-text'>时段汇总表</div>
          </div>
          <div class='report-item'>
            <div class='report-item-icon bg-info'><span class='iconfont icon-mingxi3'></span></div>
            <div class='report-item-text'>营业明细表</div>
          </div>
          <div class='report-item'>
            <div class='report-item-icon bg-error'><span class='iconfont icon-lvzhou_gukehuizong'></span></div>
            <div class='report-item-text'>项目汇总表</div>
          </div>
          <div class='report-item'>
            <div class='report-item-icon bg-success'><span class='iconfont icon-shangpin'></span></div>
            <div class='report-item-text'>商品汇总表</div>
          </div>
        </div>
        <div class='report-content clearfix'>
          <div class='report-item'>
            <div class='report-item-icon bg-warning'><span class='iconfont icon-qian'></span></div>
            <div class='report-item-text'>提成工资表</div>
          </div>
          <div class='report-item'>
            <div class='report-item-icon bg-success'><span class='iconfont icon-qian1'></span></div>
            <div class='report-item-text'>提成汇总表</div>
          </div>
        </div>
      </div>

      <div class='report-block clearfix'>
        <div class="statistical-title marginT-20">
          <span class='text-title'>会员报表</span>
        </div>
        <div class='report-content clearfix'>
          <div class='report-item'>
            <div class='report-item-icon bg-error'><span class='iconfont icon-chongzhi'></span></div>
            <div class='report-item-text'>充值未收款</div>
          </div>
          <div class='report-item'>
            <div class='report-item-icon bg-warning'><span class='iconfont icon-tongji1'></span></div>
            <div class='report-item-text'>充值收款明细</div>
          </div>
          <div class='report-item'>
            <div class='report-item-icon bg-info'><span class='iconfont icon-chongzhi1'></span></div>
            <div class='report-item-text'>充值汇总表</div>
          </div>
          <div class='report-item'>
            <div class='report-item-icon bg-error'><span class='iconfont icon-huiyuan'></span></div>
            <div class='report-item-text'>会员分析表</div>
          </div>
        </div>
        <div class='report-content clearfix'>
          <div class='report-item'>
            <div class='report-item-icon bg-success'><span class='iconfont icon-huiyuan2'></span></div>
            <div class='report-item-text'>呆滞会员表</div>
          </div>
        </div>
      </div>

      <div class='report-block clearfix'>
        <div class="statistical-title marginT-20">
          <span class='text-title'>经营管理分析</span>
        </div>
        <div class='report-content clearfix'>
          <div class='report-item'>
            <div class='report-item-icon bg-warning'><span class='iconfont icon-pingjia'></span></div>
            <div class='report-item-text'>充值未收款</div>
          </div>
          <div class='report-item'>
            <div class='report-item-icon bg-warning'><span class='iconfont icon-pingjia1'></span></div>
            <div class='report-item-text'>充值收款明细</div>
          </div>
        </div>
      </div>

    </div>
    <bottomBar></bottomBar>
  </div>
</template>
<style lang="less" scoped>
  .report-container{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
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

    },
    methods: {



    },
    components:{
      bottomBar,
    }
  }
</script>
