<template>
  <collapse-item name="渲染器">
    <setting-item-box :alone="true">
      <template #name>
        <n-text>全局</n-text>
        <n-tooltip trigger="hover">
          <template #trigger>
            <n-icon size="21" :depth="3">
              <help-outline-icon></help-outline-icon>
            </n-icon>
          </template>
          <n-text>所有echarts图表组件默认都将采用所选的渲染器进行渲染</n-text>
        </n-tooltip>
      </template>
      <EchartsRendererSetting v-model="themeSetting.renderer" />
    </setting-item-box>
    <setting-item-box :alone="true">
      <template #name>
        <n-text>当前</n-text>
        <n-tooltip trigger="hover">
          <template #trigger>
            <n-icon size="21" :depth="3">
              <help-outline-icon></help-outline-icon>
            </n-icon>
          </template>
          <n-text>仅当前组件采用指定渲染器渲染</n-text>
        </n-tooltip>
      </template>
      <EchartsRendererSetting v-model="optionData.renderer" includeInherit />
    </setting-item-box>
  </collapse-item>
  <collapse-item v-if="title" name="标题">
    <template #header>
      <n-switch v-model:value="title.show" size="small"></n-switch>
    </template>
    <setting-item-box name="标题">
      <setting-item name="颜色">
        <n-color-picker v-model:value="title.textStyle.color" size="small"></n-color-picker>
      </setting-item>
      <setting-item name="大小">
        <n-input-number v-model:value="title.textStyle.fontSize" :min="1" size="small"></n-input-number>
      </setting-item>
    </setting-item-box>
    <setting-item-box name="副标题">
      <setting-item name="颜色">
        <n-color-picker size="small" v-model:value="title.subtextStyle.color"></n-color-picker>
      </setting-item>
      <setting-item name="大小">
        <n-input-number v-model:value="title.subtextStyle.fontSize" :min="1" size="small"></n-input-number>
      </setting-item>
    </setting-item-box>
  </collapse-item>

  <collapse-item v-if="grid" name="容器">
    <setting-item-box name="距离">
      <setting-item name="左侧距离">
        <n-input v-model:value="grid.left" size="small"></n-input>
      </setting-item>
      <setting-item name="右侧距离">
        <n-input v-model:value="grid.right" size="small"></n-input>
      </setting-item>
      <setting-item name="上侧距离">
        <n-input v-model:value="grid.top" size="small"></n-input>
      </setting-item>
      <setting-item name="下侧距离">
        <n-input v-model:value="grid.bottom" size="small"></n-input>
      </setting-item>
    </setting-item-box>
  </collapse-item>

  <collapse-item v-if="xAxis" name="X轴">
    <template #header>
      <n-switch v-model:value="xAxis.show" size="small"></n-switch>
    </template>
    <setting-item-box name="单位">
      <setting-item name="名称">
        <n-input v-model:value="xAxis.name" size="small"></n-input>
      </setting-item>
      <setting-item name="颜色">
        <n-color-picker size="small" v-model:value="xAxis.nameTextStyle.color"></n-color-picker>
      </setting-item>
      <setting-item name="大小">
        <n-input-number v-model:value="xAxis.nameTextStyle.fontSize" :min="12" size="small"></n-input-number>
      </setting-item>
      <setting-item name="偏移量">
        <n-input-number v-model:value="xAxis.nameGap" :min="5" size="small"></n-input-number>
      </setting-item>
    </setting-item-box>
    <setting-item-box name="标签">
      <setting-item name="展示">
        <n-space>
          <n-switch v-model:value="xAxis.axisLabel.show" size="small"></n-switch>
        </n-space>
      </setting-item>
      <setting-item name="颜色">
        <n-color-picker size="small" v-model:value="xAxis.axisLabel.color"></n-color-picker>
      </setting-item>
      <setting-item name="大小">
        <n-input-number v-model:value="xAxis.axisLabel.fontSize" :min="8" size="small"></n-input-number>
      </setting-item>
      <setting-item name="偏移量">
        <n-input-number v-model:value="xAxis.axisLabel.rotate" :min="-90" :max="90" size="small"></n-input-number>
      </setting-item>
    </setting-item-box>
    <setting-item-box name="轴线">
      <setting-item name="展示">
        <n-space>
          <n-switch v-model:value="xAxis.axisLine.show" size="small"></n-switch>
        </n-space>
      </setting-item>
      <setting-item name="颜色">
        <n-color-picker v-model:value="xAxis.axisLine.lineStyle.color" size="small"></n-color-picker>
      </setting-item>
      <setting-item name="粗细">
        <n-input-number v-model:value="xAxis.axisLine.lineStyle.width" :min="1" size="small"></n-input-number>
      </setting-item>
      <setting-item name="位置">
        <n-select v-model:value="xAxis.position" size="small" :options="axisConfig.xposition"></n-select>
      </setting-item>
      <setting-item name="对齐零">
        <n-space>
          <n-switch v-model:value="xAxis.axisLine.onZero" size="small"></n-switch>
        </n-space>
      </setting-item>
      <setting-item name="反向">
        <n-space>
          <n-switch v-model:value="xAxis.inverse" size="small"></n-switch>
        </n-space>
      </setting-item>
    </setting-item-box>
    <setting-item-box name="刻度">
      <setting-item name="展示">
        <n-space>
          <n-switch v-model:value="xAxis.axisTick.show" size="small"></n-switch>
        </n-space>
      </setting-item>
      <setting-item name="长度">
        <n-input-number v-model:value="xAxis.axisTick.length" :min="1" size="small"></n-input-number>
      </setting-item>
    </setting-item-box>
    <setting-item-box name="分割线">
      <setting-item name="展示">
        <n-space>
          <n-switch v-model:value="xAxis.splitLine.show" size="small"></n-switch>
        </n-space>
      </setting-item>
      <setting-item name="颜色">
        <n-color-picker v-model:value="xAxis.splitLine.lineStyle.color" size="small"></n-color-picker>
      </setting-item>
      <setting-item name="粗细">
        <n-input-number v-model:value="xAxis.splitLine.lineStyle.width" :min="1" size="small"></n-input-number>
      </setting-item>
      <setting-item name="类型">
        <n-select
          v-model:value="xAxis.splitLine.lineStyle.type"
          size="small"
          :options="axisConfig.splitLint.lineStyle.type"
        ></n-select>
      </setting-item>
    </setting-item-box>
  </collapse-item>
  <!-- <collapse-item v-if="!Array.isArray(yAxis) && !isNoY" name="Y轴">
    <template #header>
      <n-switch v-model:value="yAxis.show" size="small"></n-switch>
    </template>
    <setting-item-box name="单位">
      <setting-item name="名称">
        <n-input v-model:value="yAxis.name" size="small"></n-input>
      </setting-item>
      <setting-item name="颜色">
        <n-color-picker size="small" v-model:value="yAxis.nameTextStyle.color"></n-color-picker>
      </setting-item>
      <setting-item name="大小">
        <n-input-number v-model:value="yAxis.nameTextStyle.fontSize" :min="8" size="small"></n-input-number>
      </setting-item>
      <setting-item name="偏移量">
        <n-input-number v-model:value="yAxis.nameGap" :min="5" size="small"></n-input-number>
      </setting-item>
    </setting-item-box>
    <setting-item-box name="标签">
      <setting-item name="展示">
        <n-space>
          <n-switch v-model:value="yAxis.axisLabel.show" size="small"></n-switch>
        </n-space>
      </setting-item>
      <setting-item name="颜色">
        <n-color-picker size="small" v-model:value="yAxis.axisLabel.color"></n-color-picker>
      </setting-item>
      <setting-item name="大小">
        <n-input-number v-model:value="yAxis.axisLabel.fontSize" :min="8" size="small"></n-input-number>
      </setting-item>
      <setting-item name="偏移量">
        <n-input-number v-model:value="yAxis.axisLabel.rotate" :min="-90" :max="90" size="small"></n-input-number>
      </setting-item>
    </setting-item-box>
    <setting-item-box name="轴线">
      <setting-item name="展示">
        <n-space>
          <n-switch v-model:value="yAxis.axisLine.show" size="small"></n-switch>
        </n-space>
      </setting-item>
      <setting-item name="颜色">
        <n-color-picker v-model:value="yAxis.axisLine.lineStyle.color" size="small"></n-color-picker>
      </setting-item>
      <setting-item name="粗细">
        <n-input-number v-model:value="yAxis.axisLine.lineStyle.width" :min="1" size="small"></n-input-number>
      </setting-item>
      <setting-item name="位置">
        <n-select v-model:value="yAxis.position" size="small" :options="axisConfig.yposition"></n-select>
      </setting-item>
      <setting-item name="对齐零">
        <n-space>
          <n-switch v-model:value="yAxis.axisLine.onZero" size="small"></n-switch>
        </n-space>
      </setting-item>
      <setting-item name="反向">
        <n-space>
          <n-switch v-model:value="yAxis.inverse" size="small"></n-switch>
        </n-space>
      </setting-item>
    </setting-item-box>
    <setting-item-box name="刻度">
      <setting-item name="展示">
        <n-space>
          <n-switch v-model:value="yAxis.axisTick.show" size="small"></n-switch>
        </n-space>
      </setting-item>
      <setting-item name="长度">
        <n-input-number v-model:value="yAxis.axisTick.length" :min="1" size="small"></n-input-number>
      </setting-item>
    </setting-item-box>
    <setting-item-box name="分割线">
      <setting-item name="展示">
        <n-space>
          <n-switch v-model:value="yAxis.splitLine.show" size="small"></n-switch>
        </n-space>
      </setting-item>
      <setting-item name="颜色">
        <n-color-picker v-model:value="yAxis.splitLine.lineStyle.color" size="small"></n-color-picker>
      </setting-item>
      <setting-item name="粗细">
        <n-input-number v-model:value="yAxis.splitLine.lineStyle.width" :min="1" size="small"></n-input-number>
      </setting-item>
      <setting-item name="类型">
        <n-select
          v-model:value="yAxis.splitLine.lineStyle.type"
          size="small"
          :options="axisConfig.splitLint.lineStyle.type"
        ></n-select>
      </setting-item>
    </setting-item-box>
  </collapse-item> -->
  <div v-if="yAxis && yAxis[0]">
    <div v-for="(item, index) in yAxis" :key="index">
      <collapse-item :name="'Y轴' + (1 + Number(index))">
        <template #header>
          <n-switch v-model:value="item.show" size="small"></n-switch>
        </template>
        <setting-item-box name="单位">
          <setting-item name="名称">
            <n-input v-model:value="item.name" size="small"></n-input>
          </setting-item>
          <setting-item name="颜色">
            <n-color-picker size="small" v-model:value="item.nameTextStyle.color"></n-color-picker>
          </setting-item>
          <setting-item name="大小">
            <n-input-number v-model:value="item.nameTextStyle.fontSize" :min="8" size="small"></n-input-number>
          </setting-item>
          <setting-item name="偏移量">
            <n-input-number v-model:value="item.nameGap" :min="5" size="small"></n-input-number>
          </setting-item>
        </setting-item-box>
        <setting-item-box name="标签">
          <setting-item name="展示">
            <n-space>
              <n-switch v-model:value="item.axisLabel.show" size="small"></n-switch>
            </n-space>
          </setting-item>
          <setting-item name="颜色">
            <n-color-picker size="small" v-model:value="item.axisLabel.color"></n-color-picker>
          </setting-item>
          <setting-item name="大小">
            <n-input-number v-model:value="item.axisLabel.fontSize" :min="8" size="small"></n-input-number>
          </setting-item>
          <setting-item name="偏移量">
            <n-input-number v-model:value="item.axisLabel.rotate" :min="-90" :max="90" size="small"></n-input-number>
          </setting-item>
        </setting-item-box>
        <setting-item-box name="轴线">
          <setting-item name="展示">
            <n-space>
              <n-switch v-model:value="item.axisLine.show" size="small"></n-switch>
            </n-space>
          </setting-item>
          <setting-item name="颜色">
            <n-color-picker v-model:value="item.axisLine.lineStyle.color" size="small"></n-color-picker>
          </setting-item>
          <setting-item name="粗细">
            <n-input-number v-model:value="item.axisLine.lineStyle.width" :min="1" size="small"></n-input-number>
          </setting-item>
          <setting-item name="位置">
            <n-select v-model:value="item.position" size="small" :options="axisConfig.yposition"></n-select>
          </setting-item>
          <setting-item name="对齐零">
            <n-space>
              <n-switch v-model:value="item.axisLine.onZero" size="small"></n-switch>
            </n-space>
          </setting-item>
          <setting-item name="反向">
            <n-space>
              <n-switch v-model:value="item.inverse" size="small"></n-switch>
            </n-space>
          </setting-item>
        </setting-item-box>
        <setting-item-box name="刻度">
          <setting-item name="展示">
            <n-space>
              <n-switch v-model:value="item.axisTick.show" size="small"></n-switch>
            </n-space>
          </setting-item>
          <setting-item name="长度">
            <n-input-number v-model:value="item.axisTick.length" :min="1" size="small"></n-input-number>
          </setting-item>
        </setting-item-box>
        <setting-item-box name="分割线">
          <setting-item name="展示">
            <n-space>
              <n-switch v-model:value="item.splitLine.show" size="small"></n-switch>
            </n-space>
          </setting-item>
          <setting-item name="颜色">
            <n-color-picker v-model:value="item.splitLine.lineStyle.color" size="small"></n-color-picker>
          </setting-item>
          <setting-item name="粗细">
            <n-input-number v-model:value="item.splitLine.lineStyle.width" :min="1" size="small"></n-input-number>
          </setting-item>
          <setting-item name="类型">
            <n-select
              v-model:value="item.splitLine.lineStyle.type"
              size="small"
              :options="axisConfig.splitLint.lineStyle.type"
            ></n-select>
          </setting-item>
        </setting-item-box>
      </collapse-item>
    </div>
  </div>
  <collapse-item v-if="legend" name="图例">
    <template #header>
      <n-switch v-model:value="legend.show" size="small"></n-switch>
    </template>
    <setting-item-box name="图例文字">
      <setting-item>
        <n-color-picker size="small" v-model:value="legend.textStyle.color"></n-color-picker>
      </setting-item>
    </setting-item-box>
    <setting-item-box name="位置">
      <setting-item>
        <n-input size="small" v-model:value="legend.top"> </n-input>
      </setting-item>
    </setting-item-box>
  </collapse-item>

  <collapse-item v-if="visualMap" name="视觉映射">
    <template #header>
      <n-switch v-model:value="visualMap.show" size="small"></n-switch>
    </template>

    <setting-item-box name="范围">
      <setting-item name="最小值">
        <n-input-number v-model:value="visualMap.min" size="small"></n-input-number>
      </setting-item>
      <setting-item name="最大值">
        <n-input-number v-model:value="visualMap.max" size="small"></n-input-number>
      </setting-item>
    </setting-item-box>

    <setting-item-box name="颜色">
      <setting-item :name="`层级-${index + 1}`" v-for="(item, index) in visualMap.inRange.color" :key="index">
        <n-color-picker v-model:value="visualMap.inRange.color[index]" size="small"></n-color-picker>
      </setting-item>
    </setting-item-box>

    <setting-item-box name="控制块">
      <setting-item name="放置方向">
        <n-select v-model:value="visualMap.orient" size="small" :options="axisConfig.visualMap.orient"></n-select>
      </setting-item>
      <setting-item name="宽度">
        <n-input-number v-model:value="visualMap.itemWidth" :min="5" size="small"></n-input-number>
      </setting-item>
      <setting-item name="高度">
        <n-input-number v-model:value="visualMap.itemHeight" :min="5" size="small"></n-input-number>
      </setting-item>
      <setting-item name="反转">
        <n-space>
          <n-switch v-model:value="visualMap.inverse" size="small"></n-switch>
        </n-space>
      </setting-item>
      <setting-item name="拖拽组件实时更新">
        <n-space>
          <n-switch v-model:value="visualMap.realtime" size="small"></n-switch>
        </n-space>
      </setting-item>
    </setting-item-box>
    <global-setting-position :targetData="visualMap"></global-setting-position>
  </collapse-item>
</template>

<script setup lang="ts">
import { PropType, computed, watch, ref } from 'vue'
import { GlobalThemeJsonType } from '@/settings/chartThemes/index'
import { axisConfig } from '@/packages/chartConfiguration/echarts/index'
import { CollapseItem, SettingItemBox, SettingItem, GlobalSettingPosition } from '@/components/Pages/ChartItemSetting'
import { icon } from '@/plugins'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import EchartsRendererSetting from './EchartsRendererSetting.vue'
import { useTargetData } from '@/views/chart/ContentConfigurations/components/hooks/useTargetData.hook'

const { HelpOutlineIcon } = icon.ionicons5
const { targetData } = useTargetData()

const props = defineProps({
  optionData: {
    type: Object as PropType<GlobalThemeJsonType>,
    required: true
  },
  inChart: {
    type: Boolean,
    required: false,
    default: false
  }
})

const chartEditStore = useChartEditStore()
const themeSetting = computed(() => {
  const chartThemeSetting = chartEditStore.getEditCanvasConfig.chartThemeSetting
  return chartThemeSetting
})
const title = computed(() => {
  return props.optionData.title
})
// 控制横纵两坐标轴时候y轴不展示
const isNoY = computed(() => {
  return props.optionData.isNoY ? true : false
})

const xAxis = computed(() => {
  return props.optionData.xAxis
})

const yAxis = computed(() => {
  if (Array.isArray(props.optionData.yAxis)) {
    let len = props.optionData.yAxis.length - 1
    props.optionData.yAxis.map((item, index) => {
      if (index == 0 || index == 1) {
        item.show = true
        item.position = index == 0 ? 'left' : 'right'
      } else {
        item.show = false
      }
      return item
    })
    // console.log(props.optionData.yAxis)
    return [props.optionData.yAxis[0], props.optionData.yAxis[1]]
  } else {
    return [props.optionData.yAxis]
  }
})

const legend = computed(() => {
  fixData()
  return props.optionData.legend
})

const fixData = () => {
  let reg = /%+/
  // @ts-ignore
  if (!reg.test(props.optionData.legend.top)) {
    // @ts-ignore
    props.optionData.legend.top = props.optionData.legend.top + '%'
  }
}

const grid = computed(() => {
  return props.optionData.grid
})

const visualMap = computed(() => {
  return props.optionData.visualMap
})
</script>
