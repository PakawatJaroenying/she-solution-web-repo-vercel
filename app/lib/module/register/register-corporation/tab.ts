export interface Tab<T> {
  key: T
  label: React.ReactNode
  content: React.ReactNode
  disabled?: boolean
}
