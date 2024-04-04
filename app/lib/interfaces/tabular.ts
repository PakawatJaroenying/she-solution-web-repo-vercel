export interface FieldDefinition {
  key: string //companyId
  label: string //ชื่อบริษัท
  tdClass?: string | string[] | ((value: any, key: string, item: any) => string)
  thClass?: string | string[]
  sortable?: boolean
  stickyColumn?: boolean
  required?: boolean
  isEllipsis?: boolean
}

export interface BasePropsTabular<I> {
  fields: FieldDefinition[]
  items: I[]
  renderers?: Partial<Record<string, (it: I) => React.ReactNode>>
  handleSortChange?: (sortColumn: string) => void
  loading?: boolean
}

export interface TabularState<TData, TSearch = any> {
  data: TData[]
  rowCount: number
  pageIndex: number
  pageSize: number
  sortColumn: string
  sortDirection: 'asc' | 'desc'
  search?: Partial<Record<string, TSearch>>
}

export interface PaginatedResult<T> {
  data: T[]
  rowCount: number
  pageIndex: number
  pageSize: number
}
