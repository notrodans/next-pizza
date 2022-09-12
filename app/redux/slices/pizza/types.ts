export interface IPizza {
  id: string
  imageUrl: string
  title: string
  types: number[]
  type?: string
  sizes: number[]
  size?: string
  price: number
  count?: number
}

export interface IPizzaAsyncOptions {
  currentPage: number
  category: string
  sort: string
  search: string
}
