import { ref, reactive } from 'vue'
import { goDialog, httpErrorHandle } from '@/utils'
import { DialogEnum } from '@/enums/pluginEnum'
import { projectListApi, deleteProjectApi, updateDataScreen } from '@/api/path'
import { Chartype, ChartList } from '../../../index.d'
import { ResultEnum } from '@/enums/httpEnum'

// 数据初始化
export const useDataListInit = () => {
  const loading = ref(true)

  const paginate = reactive({
    // 当前页数
    pageNum: 1,
    // 每页值
    pageSize: 12,
    // 总数
    total: 10
  })

  const list = ref<ChartList>([])

  // 数据请求
  const fetchList = async () => {
    loading.value = true
    const res = await projectListApi({
      pageSize: paginate.pageSize,
      pageNum: paginate.pageNum
    })
    if (res && res.rows) {
      const { total } = res as any // 这里的count与data平级，不在Response结构中
      paginate.total = total
      list.value = res.rows.map(e => {
        // const { id, name, state, createTime, imageUrl, createUserId } = e
        const { id, name, isPublish, imageUrl } = e
        return {
          id: id,
          title: name,
          // createId: createUserId,
          // time: createTime,
          image: imageUrl,
          release: isPublish != 0
        }
      })
      setTimeout(() => {
        loading.value = false
      }, 500)
      return
    }
    httpErrorHandle()
  }

  // 修改页数
  const changePage = (_page: number) => {
    paginate.pageNum = _page
    fetchList()
  }

  // 修改大小
  const changeSize = (_size: number) => {
    paginate.pageSize = _size
    fetchList()
  }

  // 删除处理
  const deleteHandle = (cardData: Chartype) => {
    goDialog({
      type: DialogEnum.DELETE,
      promise: true,
      onPositiveCallback: () =>
        new Promise(res => {
          res(
            deleteProjectApi({
              ids: cardData.id
            })
          )
        }),
      promiseResCallback: (res: any) => {
        if (res.code === ResultEnum.SUCCESS) {
          window['$message'].success(window['$t']('global.r_delete_success'))
          fetchList()
          return
        }
        httpErrorHandle()
      }
    })
  }

  // 发布处理
  const releaseHandle = async (cardData: Chartype, index: number) => {
    const { id, release } = cardData
    const res = await updateDataScreen({
      id: id,
      // [0未发布, 1发布]
      isPublish: !release ? 1 : 0
    })
    if (res && res.code === ResultEnum.SUCCESS) {
      list.value = []
      fetchList()
      // 发布 -> 未发布
      if (release) {
        window['$message'].success(window['$t']('global.r_unpublish_success'))
        return
      }
      // 未发布 -> 发布
      window['$message'].success(window['$t']('global.r_publish_success'))
      return
    }
    httpErrorHandle()
  }

  // 立即请求
  fetchList()

  return {
    loading,
    paginate,
    list,
    fetchList,
    releaseHandle,
    changeSize,
    changePage,
    deleteHandle
  }
}
