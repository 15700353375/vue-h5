/*
 * @Author:      changh
 * @DateTime:    2018
 * @Description: 请求路径
 */

let base_url = 'http://t.yushu.im/v2/';

if (process.env.NODE_ENV == 'production') {
  // 测试部使用的生产环境，上线时改为发布环境
  base_url = '/agent/agent/web/';

}else{
  // 开发环境
  base_url = 'http://qsyfw.gnway.cc:12345/';
  // base_url = 'http://t.yushu.im/v2/'
}


export const baseUrl = base_url;

// 所有请求具体url链接
export const urls = {
  BASE_URL: base_url,
  // 登录
  in_theaters: 'movie/in_theaters',

  LOGIN: 'user-api/mlogin',

  getBillInfoWithoutFree: '/wechatMini/getBillInfoWithoutFree',
  getBusinessBaseInfo: '/wechatMini/getBusinessBaseInfo',

  


};

// 不需要token的请求
export const noTokenReq = [

];

// 不需要token的路由
export const noTokenUrls = [

];

