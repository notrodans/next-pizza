export interface IPizza {
  id: string
  imageUrl: string
  title: string
  types: number[]
  type?: 'тонкое' | 'традиционное'
  sizes: number[]
  size?: string
  price: number
  count?: number
  category?: number
  rating?: number
}

export interface IPizzaAsyncOptions {
  currentPage: number
  category: number | string
  sort: string
}
