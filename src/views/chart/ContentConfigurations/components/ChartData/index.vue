<template>
  <div class="go-chart-configurations-data" v-if="targetData">
    <setting-item-box name="请求方式" :alone="true">
      <n-select v-model:value="targetData.request.requestDataType" :disabled="isNotData" :options="selectOptions" />
    </setting-item-box>
    <!-- 静态 -->
    <chart-data-static v-if="targetData.request.requestDataType === RequestDataTypeEnum.STATIC"></chart-data-static>
    <!-- 动态 -->
    <chart-data-ajax v-if="targetData.request.requestDataType === RequestDataTypeEnum.AJAX"></chart-data-ajax>
    <!-- 数据池 -->
    <chart-data-pond v-if="targetData.request.requestDataType === RequestDataTypeEnum.Pond"></chart-data-pond>
    <!-- 系统接口 -->
    <chart-data-xtjk v-if="targetData.request.requestDataType === RequestDataTypeEnum.Xtjk"></chart-data-xtjk>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { loadAsyncComponent } from '@/utils'
import { SettingItemBox } from '@/components/Pages/ChartItemSetting'
import { RequestDataTypeEnum } from '@/enums/httpEnum'
import { ChartFrameEnum } from '@/packages/index.d'
import { useTargetData } from '../hooks/useTargetData.hook'
import { SelectCreateDataType, SelectCreateDataEnum } from './index.d'
import cloneDeep from 'lodash/cloneDeep'

const ChartDataStatic = loadAsyncComponent(() => import('./components/ChartDataStatic/index.vue'))
const ChartDataAjax = loadAsyncComponent(() => import('./components/ChartDataAjax/index.vue'))
const ChartDataPond = loadAsyncComponent(() => import('./components/ChartDataPond/index.vue'))
const ChartDataXtjk = loadAsyncComponent(() => import('./components/ChartDataXtjk/index.vue'))

const { targetData } = useTargetData()

// 选项
// const selectOptions = ref<SelectCreateDataType[]>([])
// 无数据源
const isNotData = computed(() => {
  return (
    targetData.value.chartConfig?.chartFrame === ChartFrameEnum.STATIC ||
    typeof targetData.value?.option?.dataset === 'undefined'
  )
})

const selectOptions = computed(() => {
  let defaultSelectionOptions = [
    {
      label: SelectCreateDataEnum.STATIC,
      value: RequestDataTypeEnum.STATIC
    },
    {
      label: SelectCreateDataEnum.AJAX,
      value: RequestDataTypeEnum.AJAX
    },
    {
      label: SelectCreateDataEnum.Pond,
      value: RequestDataTypeEnum.Pond
    },
    {
      label: SelectCreateDataEnum.Xtjk,
      value: RequestDataTypeEnum.Xtjk
    }
  ]
  if (targetData.value.chartConfig?.category == 'Mores') {
    return defaultSelectionOptions.slice(0, -1)
  } else {
    return defaultSelectionOptions
  }
})
</script>
