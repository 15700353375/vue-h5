// const charts = require('echarts/lib/echarts');
// require('echarts/lib/chart/bar');
// require('echarts/lib/chart/pie');
// require('echarts/lib/chart/line');
// require('echarts/lib/component/legend');
// require('echarts/lib/component/tooltip');
// require('echarts/lib/component/title');
import echarts from 'echarts'
window.echarts = echarts;

// export const echarts = charts;

// 饼状图的基本配置项
export const pieOptions = {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
      show: false,
      orient: 'vertical',
      // orient: 'horizontal',
      x: 'left',
      itemWidth: 14,
      itemHeight: 14,
      data:['微信支付','现金','会员卡','银行卡','团购']
    },
    color: [
      '#59b7ff','#a4b8ff','#f1b2fb','#ffa88c','#e5ed9a','#aae6aa','#82cfd4'
    ],
    series: [
        {
            name:'访问来源',
            type:'pie',
            radius: ['25%', '35%'],
            avoidLabelOverlap: false,
            // 是否开启动画
            hoverAnimation: true,
            hoverOffset: 5,
            labelLine: {
              show: true,
              length: 10,
              length2: 8,
            },
            label: {
              normal: {
                // formatter: '{b}\n{per|{d}%}',
                formatter: '{b}： \n{c} \n {per|{d}%}',
                rich: {
                  b: {
                    fontSize: 12,
                    lineHeight: 30
                  },
                  per: {
                    color: '#eee',
                    backgroundColor: '#334455',
                    padding: [2, 2],
                    borderRadius: 2
                  }
                }
              }
            },
            data:[]
        }
    ]
}
