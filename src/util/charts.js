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
    title: {
      show: true,
      text: '今日营业',
      top: '43%',
      left: 'center',
      textStyle: {
        color: '#8392A7',
        fontWeight: 'lighter',
        fontSize: 15,
      },
      itemGap: 10,
      subtext: '0.00',
      subtextStyle: {
        color: '#5ab7fd',
        fontWeight: 'bold',
        fontSize: 15,
      },
    },
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
            name:'营业信息',
            type:'pie',
            radius: ['25%', '35%'],
            avoidLabelOverlap: false,
            // 是否开启动画
            hoverAnimation: true,
            hoverOffset: 5,
            labelLine: {
              show: true,
              length: 15,
              length2: 15,
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


export const funnelOption = {
  title: {
    show: false,
    text: '漏斗图',
    subtext: '纯属虚构'
  },
  tooltip: {
    trigger: 'item',
    formatter: "{a} <br/>{b} : {c}%"
  },
  // toolbox: {
  //     feature: {
  //         dataView: {readOnly: false},
  //         restore: {},
  //         saveAsImage: {}
  //     }
  // },
  legend: {
    orient: 'vertical',
    data: ['订单','咨询','访问']
  },
  calculable: true,
  series: [
      {
          name:'漏斗图',
          type:'funnel',
          left: '10%',
          top: 60,
          //x2: 80,
          bottom: 60,
          width: '80%',
          // height: {totalHeight} - y - y2,
          min: 50,
          max: 50,
          minSize: '0%',
          maxSize: '100%',
          sort: 'descending',
          gap: 2,
          label: {
              show: true,
              position: 'inside'
          },
          labelLine: {
              // length: 10,
              lineStyle: {
                  width: 0,
                  type: 'solid'
              }
          },
          itemStyle: {
              borderColor: '#fff',
              borderWidth: 0
          },
          emphasis: {
              label: {
                  fontSize: 12
              }
          },
          data: [
              {value: 60, name: '访问'},
              {value: 40, name: '咨询'},
              {value: 20, name: '订单'}
          ]
      }
  ]
};
