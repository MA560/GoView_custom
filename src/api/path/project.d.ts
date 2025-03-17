export type ProjectItem = {
  /**
   * 项目 id
   */
  id: string
  /**
   * 项目名称
   */
  name: string
  /* 菜单 */
  belongMenu: string
  /**
   * 项目状态:\
   * 0: 未发布\
   * 1: 已发布
   */
  isPublish: number
  /* 是否显示 */
  isView: number
  /**
   * 创建时间
   */
  createTime?: string
  /**
   * 预览图片url
   */
  imageUrl: string
  /**
   * 创建者 id
   */
  createUserId?: string
  /**
   * 项目备注
   */
  remarks?: string
}

export interface ProjectDetail extends ProjectItem {
  /**
   * 项目参数
   */
  //  content: string
  name: string
  imageUrl: string
  isPublish: number
  dataJson: string
}