<template>
  <v-chart ref="vChartRef" :init-options="initOptions" :theme="themeColor" :option="option" :manual-update="isPreview()" autoresize></v-chart>
</template>

<script setup lang="ts">
import { ref, computed, PropType, watch } from 'vue'
import VChart from 'vue-echarts'
import { useCanvasInitOptions } from '@/hooks/useCanvasInitOptions.hook'
import dataJson from './data.json'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { RadarChart } from 'echarts/charts'
import { includes } from './config'
import { mergeTheme, setOption } from '@/packages/public/chart'
import { useChartDataFetch } from '@/hooks'
import { CreateComponentType } from '@/packages/index.d'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { isPreview } from '@/utils'
import { DatasetComponent, GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'

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
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})

const initOptions = useCanvasInitOptions(props.chartConfig.option, props.themeSetting)

use([DatasetComponent, CanvasRenderer, RadarChart, GridComponent, TooltipComponent, LegendComponent])

const vChartRef = ref<typeof VChart>()

const option = computed(() => {
  return mergeTheme(props.chartConfig.option, props.themeSetting, includes)
})

const dataSetHandle = (dataset: typeof dataJson) => {
  if (dataset.nodes) {
    props.chartConfig.option.series[0].data = dataset.nodes
  }
  if (dataset.links) {
    props.chartConfig.option.series[0].links = dataset.links
  }
  if (dataset.categories) {
    props.chartConfig.option.series[0].categories = dataset.categories
    // @ts-ignore
    props.chartConfig.option.legend.data = dataset.categories.map((i: { name: string }) => i.name)
  }
  if (vChartRef.value && isPreview()) {
    setOption(vChartRef.value, props.chartConfig.option)
  }
}

watch(
  () => props.chartConfig.option.dataset,
  newData => {
    try {
      dataSetHandle(newData)
    } catch (error) {
      console.log(error)
    }
  },
  {
    deep: false
  }
)

useChartDataFetch(props.chartConfig, useChartEditStore, (newData: typeof dataJson) => {
  dataSetHandle(newData)
})
</script>
