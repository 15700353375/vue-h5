<!--
 * @Author:      changh
 * @DateTime:    2018-12-25
 * @Description: 我的
 -->
<template>
  <div class="clearfix container">

    <h1>我的。。。</h1>
    <div class="report-main"></div>
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

    },
    methods: {



    },
    components:{
      bottomBar,
    }
  }
</script>
