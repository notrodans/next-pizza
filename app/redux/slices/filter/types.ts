export type SortType = {
  name: string
  sortProperty: 'rating' | 'price' | 'title'
}

export interface IFilterSliceState {
  categoryId: number
  currentPage: number
  currentCategory: string
  sort: SortType
}
