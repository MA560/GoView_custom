export interface IGetData {
  [key: string]: IGetDataItem | null
}
export interface IGetDataItem {
  absolute_value?: string | null
  speed_increase?: string | null
  year_on_year?: string | null
  month_on_month?: string | null
}
export interface IDimensions {
  name?: string | null
  displayName?: string | null
}
