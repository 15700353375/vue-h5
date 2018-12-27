/*
 * @Author:      cyzeng
 * @DateTime:    2017-07-31 15:51:50
 * @Description: 请求路径
 */

let base_url = '/agent/agent/web/';

if (process.env.NODE_ENV == 'production') {
  // 测试部使用的生产环境，上线时改为发布环境
  base_url = '/agent/agent/web/';

}else{
  // 开发环境
  base_url = '/api/';
}


export const baseUrl = base_url;

// 所有请求具体url链接
export const urls = {
  BASE_URL: base_url,
  // 登录
  LOGIN_LOGIN: 'login/login',

};

// 不需要token的请求
export const noTokenReq = [
  'login/login',
  'public/captcha-img',
  'public/captcha-sms',
  'login/reset-passwd'
];

// 不需要token的路由
export const noTokenUrls = [
  '/',
  '/login',
  '/forgetPasswd'
];

