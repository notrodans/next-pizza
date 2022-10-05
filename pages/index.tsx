import Home from '@components/screens/home/Home'
import { fetchPizzas } from 'app/redux/slices/pizza/pizza.slice'
import { IPizza } from 'app/redux/slices/pizza/types'
import { wrapper } from 'app/redux/store'
import Meta from 'app/utils/Meta'
import type { GetStaticProps, NextPage } from 'next'

type ItemsType = {
  items: IPizza[]
}

const HomePage: NextPage<ItemsType> = ({ items }) => {
  return (
    <>
      <Meta title='Домашняя' description='Главная страница' />
      <Home items={items} />
    </>
  )
}

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(({ getState, dispatch }) => async () => {
  const { filter } = getState()
  const { currentPage, categoryId, sort: sortType } = filter

  const category = categoryId ? `&category=${categoryId}` : ''
  const sort = sortType ? `&sortBy=${sortType.sortProperty}` : ''

  const { payload: items } = await dispatch(fetchPizzas({ currentPage, category, sort }))

  return {
    props: {
      items
    }
  }
})

export default HomePage
