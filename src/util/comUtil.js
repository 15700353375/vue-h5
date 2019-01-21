/*
 * @Author:      changh
 * @DateTime:    2018
 * @Description: 公共方法
 */

import _ from 'lodash';

export default {
  // 克隆
  clone(obj){
    return JSON.parse(JSON.stringify(obj));
  },

  // 格式化时间
  formatTime(time, type){
    let typeFin =  type ? type : 'YYYY-MM-DD HH:mm:ss';
    return Moment(time*1000).format(typeFin);
  },

  // 格式化金额
  formatMoney(money){
    return new Number(money).toFixed(2);
  },

}
