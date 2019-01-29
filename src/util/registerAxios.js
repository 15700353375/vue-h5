/*
 * @Author:      changh
 * @DateTime:    2018-12-30
 * @Description: 统一请求或返回API层
 */

import Vue from 'vue'
import qs from 'qs'
import axios from 'axios'
import {
  urls,
  noTokenReq
} from '@Util/axiosConfig'

// 验证权限
function validatePower(url){
  // 验证访问页面是否需要权限
  if (noTokenReq.indexOf(url) == -1) {
    // 验证浏览器sessionstorage缓存中是否存在token
    let zzbToken = localStorage.getItem('zzb_token')
    console.log(zzbToken)
    axios.defaults.headers.common['token'] = zzbToken;
    return zzbToken ? true : false;
  }else{
    return true;
  }
}


// 统一处理成功请求返回值
function resolveSuccessRes(res){
  if(res.status == 200){
    if(res.data.code == 1){
      return res.data;
    }else if(res.data.code == -1){
      // sessionId失效 通知小程序
    }else{
      window.app.Toast.text(res.data.msg);
    }

  }else{
    // 表示网络正常，服务器拒绝
    window.app.Toast.text(res.statusText);
    // return res.data;
  }
}


// 统一处理失败请求返回值
function resolveFailRes(status){
  if(status >= 500){
    window.app.Toast.text('服务器错误，请稍后重试');
  }else if(status >= 400 && status < 500){
    if(status == 404){
    window.app.Toast.text('网络错误，请稍后重试');
    }else{
    window.app.Toast.text('客户端错误，请联系工作人员');
    }
  }else if( status >= 300 && status < 400){
    window.app.Toast.text('请求发生重定向，请联系工作人员');
  }
}


// post请求
let post = function(url, params, btn){
  let currentInfo = localStorage.getItem('currentInfo')
  currentInfo = JSON.parse(currentInfo)
  params = {...params, sessionId: currentInfo.sessionId}
  let requestData = params ? params : {};
  // 验证权限
  // if(validatePower(url)){
    // qs.stringify(requestData)
    return axios.post(url, requestData)
                .then( (res) => {
                  return resolveSuccessRes(res);
                }).catch((error)=>{
                  resolveFailRes(error.response.status);
                })

  // }else{
  //   // 权限不足，跳转至小程序登陆
  //   this.$router.push({name: 'login'});
  // }
}

// get请求
let get = function(url, params, btn){
  let requestData = params ? params : {};
  // 验证权限
  // if(validatePower(url)){
    return axios.get(url, {params: requestData})
                .then( (res) => {
                  return resolveSuccessRes(res);
                }).catch((error)=>{
                  // resolveFailRes(error.response.status);
                })
  // }else{
  //   // 权限不足，跳转至登录页面
  //   this.$router.push({name: 'login'});
  // }
}


// 初始化axios
// axios.defaults.baseURL = urls.BASE_URL;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers.post['Access-Control-Allow-Headers'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'json';
axios.defaults.timeout = 60000;


// ajax请求,挂在到Vue中
Vue.prototype.$ajaxPost = post;
Vue.prototype.$ajaxGet = get;

