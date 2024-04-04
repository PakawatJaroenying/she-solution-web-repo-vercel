import { TabularState } from '../interfaces/tabular'

export function handleSortChange<Item>(
  prevState: TabularState<Item>,
  columnName: string,
): TabularState<Item> {
  return {
    ...prevState,
    sortColumn: columnName,
    sortDirection:
      prevState.sortColumn === columnName && prevState.sortDirection === 'asc'
        ? 'desc'
        : 'asc',
  }
}
