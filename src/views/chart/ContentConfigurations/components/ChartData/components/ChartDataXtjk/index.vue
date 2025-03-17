<template>
  <setting-item-box name="指标选择" :alone="true">
    <n-select v-model:value="targetData.request.chooseSelectValue" :options="selectOptions" />
  </setting-item-box>
  <setting-item-box :alone="true">
    <n-button type="primary" ghost @click="sendHandle">
      <template #icon>
        <n-icon>
          <flash-icon />
        </n-icon>
      </template>
      发送请求
    </n-button>
  </setting-item-box>
</template>

<script setup lang="ts">
import { ref, toRefs, toRaw, onBeforeUnmount, computed, watchEffect, reactive, onMounted } from 'vue'
import { icon } from '@/plugins'
import { useDesignStore } from '@/store/modules/designStore/designStore'
import { useTargetData } from '../../../hooks/useTargetData.hook'
import { ChartDataMatchingAndShow } from '../ChartDataMatchingAndShow'
import { newFunctionHandle } from '@/utils'
import { getData, setData } from './setData'
import { http, customizeHttp } from '@/api/http'
import { SettingItemBox } from '@/components/Pages/ChartItemSetting'
import { clearLocalStorage, getLocalStorage, clearCookie } from '@/utils/storage'
import { StorageEnum } from '@/enums/storageEnum'
import { SystemStoreEnum, SystemStoreUserInfoEnum } from '@/store/modules/systemStore/systemStore.d'
import { getTargetList } from '@/api/path'

type optionsType = {
  label: string
  value: number
}[]
const designStore = useDesignStore()
const { HelpOutlineIcon, FlashIcon, PulseIcon, FishIcon } = icon.ionicons5
const { targetData, chartEditStore } = useTargetData()

// const loading = ref(false)
const controlModel = ref(false)

// 选项
let selectOptions = ref<optionsType>([])

// 颜色
const themeColor = computed(() => {
  return designStore.getAppTheme
})

onMounted(async () => {
  let res = await getTargetList({ type: 4 })
  let tem: optionsType = []
  console.log(res)
  if (res?.code == 200) {
    res.data?.map((item: any) => {
      tem.push({
        label: item.indexName,
        value: item.id
      })
    })
  }
  selectOptions.value = [...tem]
  console.log(selectOptions)
})
// 发送请求
const sendHandle = async () => {
  if (!targetData.value?.request) return
  try {
    const info = getLocalStorage(StorageEnum.GO_SYSTEM_STORE)
    let getToken = info[SystemStoreEnum.USER_INFO][SystemStoreUserInfoEnum.USER_TOKEN]
    const { baseUrl } = <any>Window
    let baseURL = `${import.meta.env.PROD ? baseUrl.VITE_PRO_PATH : baseUrl.VITE_DEV_PATH}`
    // 请求方式
    targetData.value.request.requestUrl = '/indexReport/week/indexInfo/' + targetData.value.request.chooseSelectValue
    targetData.value.request.requestParams.Header.Authorization = getToken
    chartEditStore.getRequestGlobalConfig.requestOriginUrl = baseURL
    // 过滤器
    targetData.value.filter = `
      let allKey = {
        absolute_value: null,
        speed_increase: null,
        year_on_year: null,
        month_on_month: null
      }
      const setTitle = ['你', '它', '他', '我']

      // 获取内部所有的key值
      let dimensionsArr = []
      let sourceArr = []
      for (let i in data) {
        if (!data[i]) {
          data[i] = { ...allKey }
        }
        sourceArr.push({
          product: i,
          ...data[i]
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
`
    const res = await customizeHttp(toRaw(targetData.value.request), toRaw(chartEditStore.getRequestGlobalConfig))
    if (res) {
      if (!res?.data && !targetData.value.filter) window['$message'].warning('您的数据不符合默认格式，请配置过滤器！')
      targetData.value.option.dataset = newFunctionHandle(res?.data, res, targetData.value.filter)
      console.log(targetData.value.option, targetData.value.option.dataset)
      return
    }
    window['$message'].warning('没有拿到返回值，请检查接口！')
  } catch (error) {
    console.error(error)
    window['$message'].warning('数据异常，请检查参数！')
  }
}
</script>

<style scoped lang="scss">
::v-deep .n-select {
  width: calc(100% - 60px) !important;
}
</style>
