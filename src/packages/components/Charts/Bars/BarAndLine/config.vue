<template>
  <!-- Echarts 全局设置 -->
  <global-setting :optionData="optionData"></global-setting>
  <CollapseItem
    v-for="(item, index) in seriesList"
    :key="index"
    :name="item.type == 'line' ? `折线图-${index + 1}` : `柱状图-${index + 1}`"
    :expanded="true"
  >
    <n-select v-model:value="item.type" :options="selectOptions" />
    <template v-if="item.type == 'line'">
      <div>
        <SettingItemBox name="线条">
          <SettingItem name="宽度">
            <n-input-number
              v-model:value="item.lineStyle.width"
              :min="1"
              :max="100"
              size="small"
              placeholder="自动计算"
            ></n-input-number>
          </SettingItem>
          <SettingItem name="类型">
            <n-select v-model:value="item.lineStyle.type" size="small" :options="lineConf.lineStyle.type"></n-select>
          </SettingItem>
        </SettingItemBox>
        <SettingItemBox name="实心点">
          <SettingItem name="大小">
            <n-input-number
              v-model:value="item.symbolSize"
              :min="1"
              :max="100"
              size="small"
              placeholder="自动计算"
            ></n-input-number>
          </SettingItem>
        </SettingItemBox>
        <setting-item-box name="标签">
          <setting-item>
            <n-space>
              <n-switch v-model:value="item.label.show" size="small" />
              <n-text>展示标签</n-text>
            </n-space>
          </setting-item>
          <setting-item name="大小">
            <n-input-number v-model:value="item.label.fontSize" size="small" :min="1"></n-input-number>
          </setting-item>
          <setting-item name="颜色">
            <n-color-picker size="small" :modes="['hex']" v-model:value="item.label.color"></n-color-picker>
          </setting-item>
          <setting-item name="位置">
            <n-select
              v-model:value="item.label.position"
              :options="[
                { label: 'top', value: 'top' },
                { label: 'left', value: 'left' },
                { label: 'right', value: 'right' },
                { label: 'bottom', value: 'bottom' }
              ]"
            />
          </setting-item>
        </setting-item-box>
        <setting-item-box name="平均值">
          <setting-item>
            <n-space>
              <n-switch
                v-model:value="item.markLine.show"
                size="small"
                @update:value="checked(item.markLine.show, index)"
              />
              <n-text>展示平均值</n-text>
            </n-space>
          </setting-item>
          <setting-item name="大小">
            <n-input-number v-model:value="item.markLine.label.fontSize" size="small" :min="1"></n-input-number>
          </setting-item>
          <setting-item name="文案">
            <n-input
              v-model:value="item.markLine.label.text"
              @update:value="TextInput(item.markLine.label.text, index)"
            ></n-input>
          </setting-item>
          <setting-item name="颜色">
            <n-color-picker size="small" :modes="['hex']" v-model:value="item.markLine.label.color"></n-color-picker>
          </setting-item>
          <setting-item name="位置">
            <n-select
              v-model:value="item.markLine.label.position"
              :options="[
                { label: 'start', value: 'start' },
                { label: 'middle', value: 'middle' },
                { label: 'end', value: 'end' }
              ]"
            />
          </setting-item>
        </setting-item-box>
      </div>
    </template>
    <template v-else>
      <div>
        <SettingItemBox name="图形">
          <SettingItem name="宽度">
            <n-input-number
              v-model:value="item.barWidth"
              :min="1"
              :max="100"
              size="small"
              placeholder="自动计算"
            ></n-input-number>
          </SettingItem>
          <SettingItem name="圆角">
            <n-input-number v-model:value="item.itemStyle.borderRadius" :min="0" size="small"></n-input-number>
          </SettingItem>
        </SettingItemBox>
        <setting-item-box name="标签">
          <setting-item>
            <n-space>
              <n-switch v-model:value="item.label.show" size="small" />
              <n-text>展示标签</n-text>
            </n-space>
          </setting-item>
          <setting-item name="大小">
            <n-input-number v-model:value="item.label.fontSize" size="small" :min="1"></n-input-number>
          </setting-item>
          <setting-item name="颜色">
            <n-color-picker size="small" :modes="['hex']" v-model:value="item.label.color"></n-color-picker>
          </setting-item>
          <setting-item name="位置">
            <n-select
              v-model:value="item.label.position"
              :options="[
                { label: 'top', value: 'top' },
                { label: 'left', value: 'left' },
                { label: 'right', value: 'right' },
                { label: 'bottom', value: 'bottom' }
              ]"
            />
          </setting-item>
        </setting-item-box>
        <setting-item-box name="平均值">
          <setting-item>
            <n-space>
              <n-switch
                v-model:value="item.markLine.show"
                size="small"
                @update:value="checked(item.markLine.show, index)"
              />
              <n-text>展示平均值</n-text>
            </n-space>
          </setting-item>
          <setting-item name="大小">
            <n-input-number v-model:value="item.markLine.label.fontSize" size="small" :min="1"></n-input-number>
          </setting-item>
          <setting-item name="文案">
            <n-input
              v-model:value="item.markLine.label.text"
              @update:value="TextInput(item.markLine.label.text, index)"
            ></n-input>
          </setting-item>
          <setting-item name="颜色">
            <n-color-picker size="small" :modes="['hex']" v-model:value="item.markLine.label.color"></n-color-picker>
          </setting-item>
          <setting-item name="位置">
            <n-select
              v-model:value="item.markLine.label.position"
              :options="[
                { label: 'start', value: 'start' },
                { label: 'middle', value: 'middle' },
                { label: 'end', value: 'end' }
              ]"
            />
          </setting-item>
        </setting-item-box>
      </div>
    </template>
  </CollapseItem>
</template>

<script setup lang="ts">
import { PropType, computed, ref } from 'vue'
import { GlobalSetting, CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import { GlobalThemeJsonType } from '@/settings/chartThemes/index'
import { lineConf } from '@/packages/chartConfiguration/echarts/index'

const props = defineProps({
  optionData: {
    type: Object,
    required: true
  }
})
const selectOptions = ref([
  {
    label: '线',
    value: 'line'
  },
  {
    label: '柱',
    value: 'bar'
  }
])
const seriesList = computed(() => {
  return props.optionData.series
})

const checked = (e: Boolean, f: number | string) => {
  console.log(e)
  seriesList.value[f].markLine.lineStyle.normal.opacity = e ? 1 : 0
}
const TextInput = (e: Boolean, f: number | string) => {
  seriesList.value[f].markLine.label.formatter = e + '{c}'
}
</script>
