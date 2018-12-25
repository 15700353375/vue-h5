/**
 * @Author:      cyzeng
 * @DateTime:    2017-06-16 23:11:25
 * @Description: 登录路由
 */

const statistical = r => require.ensure( [], () => r(require('@Src/view/list/statistical')), 'statistical');
const report = r => require.ensure( [], () => r(require('@Src/view/list/report')), 'report');
const manager = r => require.ensure( [], () => r(require('@Src/view/list/manager')), 'manager');
const myself = r => require.ensure( [], () => r(require('@Src/view/list/myself')), 'myself');

export default [
  {
    path: '/',
    name: 'statistical',
    component: statistical,
    meta: {
      title: '即时信息'
    }
  },
  {
    path: '/report',
    name: 'report',
    component: report,
    meta: {
      title: '报表决策'
    }
  },
  {
    path: '/manager',
    name: 'manager',
    component: manager,
    meta: {
      title: '经营管理'
    }
  },
  {
    path: '/myself',
    name: 'myself',
    component: myself,
    meta: {
      title: '我的'
    }
  },
]
