import { echartOptionProfixHandle, PublicConfigClass } from '@/packages/public'
import { BarAndLineConfig } from './index'
import { CreateComponentType } from '@/packages/index.d'
import cloneDeep from 'lodash/cloneDeep'
import dataJson from './data.json'

export const includes = ['legend', 'xAxis', 'yAxis', 'grid']
export const yConfig = {
  type: 'value',
  scale: true,
  name: '',
  nameGap: 15,
  nameTextStyle: {
    color: '#B9B8CE',
    fontSize: 12
  },
  inverse: false,
  axisLabel: {
    show: true,
    fontSize: 12,
    color: '#B9B8CE',
    rotate: 0
  },
  axisLine: {
    show: true,
    lineStyle: {
      color: '#B9B8CE',
      width: 1
    },
    onZero: true
  },
  axisTick: {
    show: true,
    length: 5
  },
  splitLine: {
    show: true,
    lineStyle: {
      color: '#484753',
      width: 1,
      type: 'solid'
    }
  }
}

export const seriesItemLine = {
  name: 'data1',
  type: 'line',
  xAxisIndex: 0,
  yAxisIndex: 0,
  encode: {
    x: 0,
    y: 2
  },
  label: {
    show: true,
    position: 'top',
    color: '#fff',
    fontSize: 12
  },
  markLine: {
    show: true,
    symbol: 'none',
    lineStyle: {
      normal: {
        opacity: 1,
        type: 'dashed'
      }
    },
    label: {
      text: '',
      formatter: '平均值{c}',
      show: true,
      position: 'middle',
      color: '#fff',
      fontSize: 12
    },
    data: [{ type: 'average', name: '平均值' }]
  },

  symbolSize: 5, //设定实心点的大小
  itemStyle: {
    color: null,
    borderRadius: 0
  },
  lineStyle: {
    type: 'solid',
    width: 3,
    color: null
  }
}
export const seriesItemBar = {
  name: 'data2',
  type: 'bar',
  xAxisIndex: 0,
  yAxisIndex: 1,
  encode: {
    x: 0,
    y: 1
  },
  barWidth: 15,
  label: {
    show: true,
    position: 'top',
    color: '#fff',
    fontSize: 12
  },
  markLine: {
    show: true,
    symbol: 'none',
    lineStyle: {
      normal: {
        opacity: 1,
        type: 'dashed'
      }
    },
    label: {
      text: '',
      formatter: '平均值{c}',
      show: true,
      position: 'middle',
      color: '#fff',
      fontSize: 12
    },
    data: [{ type: 'average', name: '平均值' }]
  },

  itemStyle: {
    color: null,
    borderRadius: 2
  },
  lineStyle: {
    type: 'solid',
    width: 3,
    color: null
  }
}
export const option = {
  isNoY: true,
  legend: {
    show: true
  },
  tooltip: {
    show: true,
    trigger: 'axis',
    axisPointer: {
      show: true,
      type: 'shadow'
    }
  },
  xAxis: {
    show: true,
    type: 'category'
  },
  yAxis: [{ ...cloneDeep(yConfig), show: true }, { ...cloneDeep(yConfig), show: true }, cloneDeep(yConfig)],
  dataset: { ...dataJson },
  series: [seriesItemLine, seriesItemBar]
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = BarAndLineConfig.key
  public chartConfig = cloneDeep(BarAndLineConfig)
  // 图表配置项
  public option = echartOptionProfixHandle(option, includes)
}
