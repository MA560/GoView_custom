<template>
  <collapse-item name="标签页配置" :expanded="true">
    <setting-item-box name="默认值" :alone="true">
      <n-select size="small" v-model:value="optionData.tabType" :options="tabTypeOptions" />
    </setting-item-box>
  </collapse-item>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { CollapseItem, SettingItemBox } from '@/components/Pages/ChartItemSetting'
import { option } from './config'

defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true
  }
})

const tabTypeOptions = [
  {
    label: '线条',
    value: 'bar'
  },
  {
    label: '分段',
    value: 'segment'
  }
]
</script>
