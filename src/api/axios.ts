import axios, { AxiosResponse, AxiosRequestConfig, Axios } from 'axios'
import { ResultEnum, ModuleTypeEnum } from "@/enums/httpEnum"
import { PageEnum, ErrorPageNameMap } from "@/enums/pageEnum"
import { StorageEnum } from '@/enums/storageEnum'
import { axiosPre } from '@/settings/httpSetting'
import { SystemStoreEnum, SystemStoreUserInfoEnum } from '@/store/modules/systemStore/systemStore.d'
import { useSystemStore } from '@/store/modules/systemStore/systemStore'
import { redirectErrorPage, getLocalStorage, routerTurnByName, isPreview } from '@/utils'
import { fetchAllowList } from './axios.config'
import includes from 'lodash/includes'

export interface MyResponseType<T> {
  code: ResultEnum
  data?: T
  rows?: T
  url?: string
  fileName?: string
  message?: string
  msg?: string
  token?: string
}

export interface MyRequestInstance extends Axios {
  <T = any>(config: AxiosRequestConfig): Promise<MyResponseType<T>>
}

const { baseUrl } = <any>Window;
const axiosInstance = axios.create({
  // baseURL: `${import.meta.env.PROD ? import.meta.env.VITE_PRO_PATH : ''}${axiosPre}`,
  baseURL: `${import.meta.env.PROD ? baseUrl.VITE_PRO_PATH : baseUrl.VITE_DEV_PATH}`,
  timeout: ResultEnum.TIMEOUT,
}) as unknown as MyRequestInstance

axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // 白名单校验
    if (includes(fetchAllowList, config.url)) return config
    // 获取 token
    const info = getLocalStorage(StorageEnum.GO_SYSTEM_STORE)
    // 重新登录
    if (!info) {
      routerTurnByName(PageEnum.BASE_LOGIN_NAME)
      return config
    }
    const userInfo = info[SystemStoreEnum.USER_INFO]
    config.headers = {
      ...config.headers,
      [userInfo[SystemStoreUserInfoEnum.TOKEN_NAME] || 'token']: userInfo[SystemStoreUserInfoEnum.USER_TOKEN] || ''
    }
    return config
  },
  (err: AxiosRequestConfig) => {
    Promise.reject(err)
  }
)

// 响应拦截器
axiosInstance.interceptors.response.use(
  (res: AxiosResponse) => {
    // 预览页面错误不进行处理
    if (isPreview()) {
      return Promise.resolve(res.data)
    }
    const { code } = res.data as { code: number }

    if (code === undefined || code === null) return Promise.resolve(res)

    // 成功
    if (code === ResultEnum.SUCCESS) {
      return Promise.resolve(res.data)
    }

    // 登录过期
    if (code === ResultEnum.TOKEN_OVERDUE) {
      const systemStore = useSystemStore();
      const { fromPath } = systemStore.getUserInfo;
      window['$message'].error(window['$t']('http.token_overdue_message'))
      if(fromPath){
        const url = window.location.href.split('/#/')[0];
        window.location.href = fromPath + `#/login?redirectLink=${url}` // 否则全部重定向到登录页
      }else{
        routerTurnByName(PageEnum.BASE_LOGIN_NAME)
      }
      return Promise.resolve(res.data)
    }

    // 固定错误码重定向
    if (ErrorPageNameMap.get(code)) {
      redirectErrorPage(code)
      return Promise.resolve(res.data)
    }

    // 提示错误
    window['$message'].error(window['$t']((res.data as any).msg))
    return Promise.resolve(res.data)
  },
  (err: AxiosResponse) => {
    Promise.reject(err)
  }
)

export default axiosInstance
