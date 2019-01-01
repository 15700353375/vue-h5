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
        orient: 'vertical',
        // orient: 'horizontal',
        x: 'left',
        itemWidth: 14,
        itemHeight: 14,
        data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
    },
    color: [
      '#59b7ff','#7fb8ff','#a4b8ff','#cbb5fe','#f1b2fb','#f9adc4','#ffa88c','#f2cb93','#e5ed9a','#c8eaa2','#aae6aa','#82cfd4'
    ],
    series: [
        {
            name:'访问来源',
            type:'pie',
            radius: ['30%', '40%'],
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
                formatter: '{b}: {per|{d}%}  ',
                rich: {
                  b: {
                    fontSize: 16,
                    lineHeight: 33
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