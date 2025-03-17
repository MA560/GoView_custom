import { http } from '@/api/http'
import { httpErrorHandle } from '@/utils'
import { ContentTypeEnum, RequestHttpEnum, ModuleTypeEnum } from '@/enums/httpEnum'
import { TargetDetail } from './index'

// * 指标列表
export const getTargetList = async (data: object) => {
  try {
    const res = await http(RequestHttpEnum.POST)<TargetDetail>(`/indexReport/queryCycleIndex`, data)
    return res
  } catch {
    httpErrorHandle()
  }
}

