import Categories from '@components/Categories/Categories'
import PizzaBlock from '@components/PizzaItem/PizzaItem'
import Sort from '@components/Sort/Sort'
import HomeContainer from 'app/layouts/Home/HomeContainer'
import HomeContent from 'app/layouts/Home/HomeContent'
import Page from 'app/layouts/Page'
import { useAppSelector } from 'app/redux/hooks'
import { selectFilter } from 'app/redux/slices/filter/filter.slice'
import { fetchPizzas, selectPizza } from 'app/redux/slices/pizza/pizza.slice'
import { IPizza } from 'app/redux/slices/pizza/types'
import dynamic from 'next/dynamic'
import { FC, useEffect, useMemo, useRef } from 'react'
import { useDispatch } from 'react-redux'

const Skeleton = dynamic(() => import('@components/PizzaItem/Skeleton/Skeleton'), { ssr: false })

type ItemsType = {
  items: IPizza[]
}

const Home: FC<ItemsType> = ({ items }) => {
  const { currentCategory, categoryId, currentPage, sort: sortType } = useAppSelector(selectFilter)
  const { items: data, isLoading, status } = useAppSelector(selectPizza)
  const dispatch = useDispatch()

  const isMount = useRef(false)
  const isItems = useRef(true)

  useEffect(() => {
    if (isMount.current) isItems.current = false

    isMount.current = true
  }, [currentCategory, categoryId, currentPage, sortType])

  useEffect(() => {
    const category = categoryId ? `&category=${categoryId}` : ''
    const sort = sortType ? `&sortBy=${sortType.sortProperty}` : ''

    // eslint-disable-next-line
    // @ts-ignore
    dispatch(fetchPizzas({ currentPage, category, sort }))
  }, [currentPage, categoryId, sortType])

  const skeleton = useMemo(() => [...new Array(6)].map(() => <Skeleton key={Date.now() + Math.random()} />), [])
  const pizzas = useMemo(() => data && data.map(item => <PizzaBlock key={item.id} {...item} />), [data])
  const pizzasFromServer = useMemo(() => items.map(item => <PizzaBlock key={item.id} {...item} />), [items])

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
              : isItems.current
              ? pizzasFromServer
              : !isItems.current && pizzas && pizzas.length
              ? pizzas
              : status === 'error'
              ? 'Ошибка на стороне сервера'
              : 'Ничего не найдено'}
          </div>
        </HomeContent>
      </HomeContainer>
    </Page>
  )
}

export default Home
