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
  // 传入的色值
  color: [],
  // hover提示
  tooltip: {
    trigger: 'item',
    formatter: "{b}: {c}%"
  },
  // 图例标记
  legend: {
    orient: 'horizontal',
    bottom: 0,
    padding: [20, 0, 0, 0],
    itemWidth: 12,
    itemHeight: 12,
    // 关闭点击图例的效果
    selectedMode: false,
    // 传入的数据
    data: []
  },
  series: [
    {
      type: 'pie',
      radius: ['48%', '72%'],
      // 关闭点击
      avoidLabelOverlap: false,
      // 关闭hover动画
      hoverAnimation: false,
      minAngle: 5,           　　 //最小的扇区角度（0 ~ 360），用于防止某个值过小导致扇区太小影响交互
      avoidLabelOverlap: true,   //是否启用防止标签重叠策略
      label: {
        normal: {
          show: false,
          position: 'center'
        },
        emphasis: {
          show: false,
          textStyle: {
            fontSize: '30',
            fontWeight: 'bold'
          }
        }
      },
      labelLine: {
        normal:{
          show: true,
          length:5
        }
      },
      // 传入的数据
      data: []
    }
  ]
};
