import { http } from '@/api/http'
import { httpErrorHandle } from '@/utils'
import { ContentTypeEnum, RequestHttpEnum, ModuleTypeEnum } from '@/enums/httpEnum'
import { ProjectItem, ProjectDetail } from './project'

// * 项目列表
export const projectListApi = async (data: object) => {
  try {
    const res = await http(RequestHttpEnum.GET)<ProjectItem[]>(`/index/model/dataScreenList`, data)
    return res
  } catch {
    httpErrorHandle()
  }
}

// new 新增保存接口
export const createSaveProject = async (data: object) => {
  try {
    const res = await http(RequestHttpEnum.POST)<{
      /**
       * 项目id
       */
      id: string
    }>(`/index/model/addDataScreen`, data)
    return res
  } catch {
    httpErrorHandle()
  }
}


// new 修改项目信息接口
export const updateDataScreen = async (data: object) => {
  try {
    const res = await http(RequestHttpEnum.POST)<{
      /**
       * 项目id
       */
      id: string
    }>(`/index/model/updateDataScreen`, data)
    return res
  } catch {
    httpErrorHandle()
  }
}


// * 新增项目
export const createProjectApi = async (data: object) => {
  try {
    const res = await http(RequestHttpEnum.POST)<{
      /**
       * 项目id
       */
      id: number
    }>(`${ModuleTypeEnum.PROJECT}/create`, data)
    return res
  } catch {
    httpErrorHandle()
  }
}

// * 获取项目
export const fetchProjectApi = async (data: { projectId: string }) => {
  try {
    const res = await http(RequestHttpEnum.GET)<ProjectDetail>(`/index/model/dataScreenDetail/${data.projectId}`, data)
    return res
  } catch {
    httpErrorHandle()
  }
}

// * 保存项目
export const saveProjectApi = async (data: object) => {
  try {
    const res = await http(RequestHttpEnum.POST)(
      `${ModuleTypeEnum.PROJECT}/save/data`,
      data,
      ContentTypeEnum.FORM_URLENCODED
    )
    return res
  } catch {
    httpErrorHandle()
  }
}

// * 修改项目基础信息
export const updateProjectApi = async (data: object) => {
  try {
    const res = await http(RequestHttpEnum.POST)(`${ModuleTypeEnum.PROJECT}/edit`, data)
    return res
  } catch {
    httpErrorHandle()
  }
}

// * 删除项目
export const deleteProjectApi = async (data: { ids: string | string[] }) => {
  try {
    const res = await http(RequestHttpEnum.DELETE)(`/index/model/deleteDataScreen/${data.ids}`, data)
    return res
  } catch {
    httpErrorHandle()
  }
}

// * 修改发布状态 [0未发布,1发布]
export const changeProjectReleaseApi = async (data: object) => {
  try {
    const res = await http(RequestHttpEnum.PUT)(`${ModuleTypeEnum.PROJECT}/publish`, data)
    return res
  } catch {
    httpErrorHandle()
  }
}

// * 上传文件
export const uploadFile = async (data: object) => {
  try {
    const res = await http(RequestHttpEnum.POST)(`/common/upload`, data, ContentTypeEnum.FORM_DATA)
    return res
  } catch {
    httpErrorHandle()
  }
}
