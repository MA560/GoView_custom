import { useSystemStore } from '@/store/modules/systemStore/systemStore'
import { SystemStoreEnum } from '@/store/modules/systemStore/systemStore.d'
import { ResultEnum } from '@/enums/httpEnum'
import { ossUrlApi } from '@/api/path'


// * 初始化
export const useSystemInit = async () => {
  const systemStore = useSystemStore()

  // 获取 OSS 信息的 url 地址，用来拼接展示图片的地址
  const getOssUrl = async () => {
    // const res = await ossUrlApi({})
    const { baseUrl } = <any>Window
    let baseURL = `${import.meta.env.PROD ? baseUrl.VITE_PRO_PATH : baseUrl.VITE_DEV_PATH}`
    const res = { code: 200, data: { bucketURL: baseURL } }
    if (res && res.code === ResultEnum.SUCCESS) {
      systemStore.setItem(SystemStoreEnum.FETCH_INFO, {
        OSSUrl: res.data?.bucketURL
      })
    }
  }

  // 执行
  getOssUrl()
}