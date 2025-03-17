import { IGetData, IGetDataItem, IDimensions } from './index.d'

export let getData: IGetData = {
  '2023-15': null,
  '2023-14': null,
  '2023-13': {
    absolute_value: '38.9',
    speed_increase: null,
    year_on_year: '52.7',
    month_on_month: '14.1'
  },
  '2023-12': {
    absolute_value: '34.1',
    speed_increase: null,
    year_on_year: '49.7',
    month_on_month: '-2.7'
  },
  '2023-11': {
    absolute_value: '35.0',
    speed_increase: null,
    year_on_year: '87.6',
    month_on_month: '12.9'
  },
  '2023-10': {
    absolute_value: '31.1',
    speed_increase: null,
    year_on_year: '39.1',
    month_on_month: '-5.7'
  },
  '2023-9': {
    absolute_value: '32.9',
    speed_increase: null,
    year_on_year: '64.1',
    month_on_month: '-15.0'
  },
  '2023-8': {
    absolute_value: '38.7',
    speed_increase: null,
    year_on_year: '39.8',
    month_on_month: '50.7'
  },
  '2023-7': {
    absolute_value: '25.7',
    speed_increase: null,
    year_on_year: '-6.7',
    month_on_month: '-2.8'
  },
  '2023-6': {
    absolute_value: '26.4',
    speed_increase: null,
    year_on_year: '83.5',
    month_on_month: '25.8'
  },
  '2023-5': {
    absolute_value: '21',
    speed_increase: null,
    year_on_year: '39.1',
    month_on_month: '325'
  },
  '2023-4': {
    absolute_value: '4.9',
    speed_increase: null,
    year_on_year: '-80',
    month_on_month: '-77.1'
  },
  '2023-3': {
    absolute_value: '21.6',
    speed_increase: null,
    year_on_year: '-47.8',
    month_on_month: '-60.9'
  },
  '2023-2': {
    absolute_value: '55.2',
    speed_increase: null,
    year_on_year: '30.5',
    month_on_month: '30.7'
  },
  '2023-1': {
    absolute_value: '42.2',
    speed_increase: null,
    year_on_year: '141.8',
    month_on_month: '7.9'
  },
  '2022-52': {
    absolute_value: '39.1',
    speed_increase: null,
    year_on_year: '-3.7',
    month_on_month: '82.5'
  }
}

function supplementData(data: IGetData, allKey: IGetDataItem) {
  for (let i in data) {
    if (!data[i]) {
      data[i] = { ...allKey }
    }
  }
  return data
}

export function setData(data: IGetData, allKey: IGetDataItem, setTitle: Array<string>) {
  let realData = supplementData(data, allKey)
  // 获取内部所有的key值
  let dimensionsArr: Array<IDimensions> = []
  let sourceArr = []
  for (let i in realData) {
    sourceArr.push({
      product: i,
      ...realData[i]
    })
  }
  Object.keys(allKey).forEach((item, index) => {
    console.log(item)
    dimensionsArr.push({
      name: item,
      displayName: setTitle[index] ?? ''
    })
  })
  return {
    dimensions: ['product', ...dimensionsArr],
    source: [...sourceArr]
  }
}
