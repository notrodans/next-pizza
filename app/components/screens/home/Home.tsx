import Categories from '@components/Categories/Categories'
import PizzaBlock from '@components/PizzaItem/PizzaItem'
import Sort from '@components/Sort/Sort'
import HomeContainer from 'app/layouts/Home/HomeContainer'
import HomeContent from 'app/layouts/Home/HomeContent'
import Page from 'app/layouts/Page'
import { useAppSelector } from 'app/redux/hooks'
import { selectFilter } from 'app/redux/slices/filter/filter.slice'
import { pizzaApi, selectPizza } from 'app/redux/slices/pizza/pizza.slice'
import { IPizza } from 'app/redux/slices/pizza/types'
import dynamic from 'next/dynamic'
import { FC, useEffect, useMemo, useRef } from 'react'
import { useDispatch } from 'react-redux'

const Skeleton = dynamic(() => import('@components/PizzaItem/Skeleton/Skeleton'), { ssr: false })

type ItemsType = {
  items: IPizza[]
}

const Home: FC<ItemsType> = ({ items }) => {
  const useGetFetchPizza = pizzaApi.endpoints.fetchPizza.useQuery
  const { currentCategory, categoryId, currentPage, sort: sortType } = useAppSelector(selectFilter)

  const { data, error, isLoading } = useGetFetchPizza({
    currentPage,
    category: categoryId,
    sort: sortType.sortProperty
  })

  const isMount = useRef(false)
  const isItems = useRef(true)

  useEffect(() => {
    if (isMount.current) isItems.current = false

    isMount.current = true
  }, [currentCategory, categoryId, currentPage, sortType])

  const skeleton = useMemo(() => [...new Array(6)].map(() => <Skeleton key={Date.now() + Math.random()} />), [])
  const pizzas = useMemo(() => data && data.map(item => <PizzaBlock key={item.id} {...item} />), [data])
  const pizzasFromServer = useMemo(() => items.map(item => <PizzaBlock key={item.id} {...item} />), [items])
  console.log(error)
  return (
    <Page>
      <HomeContainer>
        <HomeContent>
          <div className='content__top'>
            <Categories />
            <Sort />
          </div>
          <h2 className='content__title'>{currentCategory}</h2>
          <div className='content__items'>
            {isLoading
              ? skeleton
              : !isLoading && isItems.current
              ? pizzasFromServer
              : !isLoading && !isItems.current && pizzas && pizzas.length
              ? pizzas
              : error
              ? 'Ошибка на стороне сервера'
              : 'Ничего не найдено'}
          </div>
        </HomeContent>
      </HomeContainer>
    </Page>
  )
}

export default Home
