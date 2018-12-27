<!--
 * @Author:      changh
 * @DateTime:    2018-12-25
 * @Description: 经营管理
 -->
<template>
  <div class="clearfix report-container">
    <div class="report-main">

      <div class='report-block clearfix'>
        <div class="statistical-title">
          <span class='text-title'>拓客营销</span>
        </div>
        <div class='report-content clearfix'>
          <div class='report-item'>
            <div class='report-item-icon bg-success'><span class='iconfont icon-quan'></span></div>
            <div class='report-item-text'>电子券</div>
          </div>
          <div class='report-item'>
            <div class='report-item-icon bg-info'><span class='iconfont icon-duanxin'></span></div>
            <div class='report-item-text'>短信群发</div>
          </div>
        </div>
      </div>


    </div>
    <bottomBar></bottomBar>
  </div>
</template>

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
