<template>
  <v-chart
    ref="vChartRef"
    v-if="isShow"
    :init-options="initOptions"
    :theme="themeColor"
    :option="option"
    :manual-update="isPreview()"
    :update-options="{
      replaceMerge: replaceMergeArr
    }"
    autoresize
  ></v-chart>
</template>

<script setup lang="ts">
import { ref, nextTick, computed, watch, PropType } from 'vue'
import VChart from 'vue-echarts'
import { useCanvasInitOptions } from '@/hooks/useCanvasInitOptions.hook'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, LineChart } from 'echarts/charts'
import config, { includes, seriesItemLine, yConfig } from './config'
import { mergeTheme } from '@/packages/public/chart'
import { useChartDataFetch } from '@/hooks'
import { CreateComponentType } from '@/packages/index.d'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { isPreview } from '@/utils'
import { DatasetComponent, GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import isObject from 'lodash/isObject'
import cloneDeep from 'lodash/cloneDeep'

const props = defineProps({
  themeSetting: {
    type: Object,
    required: true
  },
  themeColor: {
    type: Object,
    required: true
  },
  chartConfig: {
    type: Object as PropType<config>,
    required: true
  }
})

const initOptions = useCanvasInitOptions(props.chartConfig.option, props.themeSetting)

use([DatasetComponent, CanvasRenderer, BarChart, LineChart, GridComponent, TooltipComponent, LegendComponent])

const replaceMergeArr = ref<string[]>()
const isShow = ref(true)
const option = computed(() => {
  return mergeTheme(props.chartConfig.option, props.themeSetting, includes)
})
watch(
  () => props.chartConfig.option.yAxis,
  () => {
    console.log(option, props.chartConfig.option.dataset.source, '12312')

    let result = props.chartConfig.option.dataset.source.map((item: any) => {
      // @ts-ignore
      // delete item.product
      // @ts-ignore
      return item
    })

    let allKey = Object.keys(result[0])
    let leftList = []
    let rightList = []
    for (let i = 0; i < result.length; i++) {
      for (let j = 1; j < allKey.length; j++) {
        if (j == 1) {
          leftList.push(result[i][allKey[j]])
        } else {
          rightList.push(result[i][allKey[j]])
        }
      }
    }
    // 左侧值，右侧值
    let leftMax = Math.max(...leftList.filter(item => item))
    let leftMin = Math.min(...leftList.filter(item => item))
    let rightMax = Math.max(...rightList.filter(item => item))
    let rightMin = Math.min(...rightList.filter(item => item))
    console.log(leftMax, leftMin, rightMax, rightMin)
    let tem = Math.floor((rightMax + Math.abs(rightMin)) / 200)
    console.log(tem)
    let baseJZ = tem == 0 ? 20 : tem * 20
    // 右侧最高值
    rightMax = Math.ceil(rightMax / baseJZ) * baseJZ
    console.log(Math.floor(rightMin / baseJZ) * baseJZ)
    // 右侧最低值
    rightMin = Math.floor(rightMin / baseJZ) * baseJZ
    // 右侧总和
    let allRight = Math.abs(rightMax) + Math.abs(rightMin)
    // 右侧按base分为的间隔
    let rightInterval = Math.ceil(allRight / baseJZ)
    console.log('rightInterval', allRight, rightMax, baseJZ, rightInterval)

    // 计算出左侧间隔
    var newinterval = (rightInterval * rightMax) / allRight
    // 左侧最大值向上取整
    leftMax = Math.ceil(leftMax / newinterval) * newinterval
    console.log('leftMax', leftMax, Math.ceil(leftMax / newinterval))
    // 左侧最小值
    leftMin = leftMax / (rightMax / allRight) - leftMax
    props.chartConfig.option.series.map((item: any, index: number) => {
      if (index == 0) {
        item.encode.y = 1
      } else {
        item.encode.y = 1 + index
      }
      return item
    })
    props.chartConfig.option.yAxis.map((item: any, index: number) => {
      if (index == 0) {
        item.interval = (leftMax + leftMin) / rightInterval
        item.min = -leftMin
        item.max = leftMax
      } else {
        item.interval = allRight / rightInterval
        item.min = rightMin
        item.max = rightMax
      }
      if (index == 0 || index == 1) {
        item.show = true
      } else {
        item.show = false
      }
      return item
    })
    console.log(props.chartConfig.option)
    isShow.value = false
    nextTick(() => {
      isShow.value = true
    })
  },
  {
    deep: true,
    immediate: true
  }
)
// dataset 无法变更条数的补丁
watch(
  () => props.chartConfig.option.dataset,
  async (newData: { dimensions: any }, oldData) => {
    try {
      if (!isObject(newData) || !('dimensions' in newData)) return
      if (Array.isArray(newData?.dimensions)) {
        const seriesArr = []
        const yConfigArr = []
        // 对oldData进行判断，防止传入错误数据之后对旧维度判断产生干扰
        // 此处计算的是dimensions的Y轴维度，若是dimensions.length为0或1，则默认为1，排除X轴维度干扰
        const oldDimensions =
          Array.isArray(oldData?.dimensions) && oldData.dimensions.length >= 1 ? oldData.dimensions.length : 1
        const newDimensions = newData.dimensions.length >= 1 ? newData.dimensions.length : 1
        const dimensionsGap = newDimensions - oldDimensions
        console.log(dimensionsGap, newDimensions, oldDimensions, newData.dimensions, oldData.dimensions)
        if (dimensionsGap < 0) {
          props.chartConfig.option.series.splice(newDimensions - 1)
          props.chartConfig.option.yAxis.splice(newDimensions - 1)
          console.log(props.chartConfig.option, props.chartConfig.option.series, 'props.chartConfig.option.series1111')
        } else if (dimensionsGap > 0) {
          if (!oldData || !oldData?.dimensions || !Array.isArray(oldData?.dimensions) || !oldData?.dimensions.length) {
            props.chartConfig.option.series = []
          }
          for (let i = 0; i < dimensionsGap; i++) {
            let tem = cloneDeep(seriesItemLine)
            // tem.encode.y = tem.encode.y + i + 1
            // @ts-ignore
            delete tem.xAxisIndex
            // @ts-ignore
            delete tem.yAxisIndex
            seriesArr.push(cloneDeep(tem))
            yConfigArr.push(cloneDeep(yConfig))
          }
          props.chartConfig.option.series.push(...seriesArr)
          props.chartConfig.option.yAxis.push(...yConfigArr)
          let datasetList = props.chartConfig.option.dataset.dimensions

          await props.chartConfig.option.series.map((item: any, index: number) => {
            console.log(datasetList[index + 1].displayName, index)
            if (index == 0) {
              item.position = 'left'
              item.yAxisIndex = 0
            } else {
              item.position = 'right'
              item.yAxisIndex = 1
            }
            item.name = datasetList[index + 1].displayName
            return item
          })

          // console.log(props.chartConfig.option, props.chartConfig.option.series, 'props.chartConfig.option.series2222')
        }
        replaceMergeArr.value = ['series']
        nextTick(() => {
          replaceMergeArr.value = []
        })
        console.log(props.chartConfig.option, 'props2222')
      }
    } catch (error) {
      console.log(error)
    }
  },
  {
    deep: false
  }
)

const { vChartRef } = useChartDataFetch(props.chartConfig, useChartEditStore)
</script>
