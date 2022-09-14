import Categories from '@components/Categories/Categories'
import PizzaBlock from '@components/PizzaItem/PizzaItem'
import Sort, { sortOptions } from '@components/Sort/Sort'
import useDebounce from 'app/hooks/useDebounce'
import HomeContainer from 'app/layouts/Home/HomeContainer'
import HomeContent from 'app/layouts/Home/HomeContent'
import Page from 'app/layouts/Page'
import { useAppDispatch, useAppSelector } from 'app/redux/hooks'
import { selectFilter, setFilters } from 'app/redux/slices/filter/filter.slice'
import { fetchPizzas, selectPizza } from 'app/redux/slices/pizza/pizza.slice'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import qs from 'query-string'
import { FC, useCallback, useEffect, useMemo, useRef } from 'react'

const Skeleton = dynamic(() => import('@components/PizzaItem/Skeleton/Skeleton'), { ssr: false })

const Home: FC = () => {
  const dispatch = useAppDispatch()
  const { currentCategory, categoryId, currentPage, sort: sortType, searchValue } = useAppSelector(selectFilter)
  const { status: isLoading, items } = useAppSelector(selectPizza)
  const router = useRouter()
  const debounceValue = useDebounce(searchValue, 500)

  const skeleton = useMemo(() => [...new Array(6)].map(() => <Skeleton key={Date.now() + Math.random()} />), [])
  const pizzas = useMemo(() => items.map(obj => <PizzaBlock key={obj.id} {...obj} />), [items])

  const isSearch = useRef(false)
  const isMounted = useRef(false)

  const getPizzas = useCallback(async () => {
    const category = categoryId ? `&category=${categoryId}` : ''
    const sort = sortType ? `&sortBy=${sortType.sortProperty}` : ''
    const search = debounceValue ? `&search=${debounceValue}` : ''

    dispatch(fetchPizzas({ currentPage, category, sort, search }))
    // eslint-disable-next-line
  }, [currentPage, categoryId, debounceValue, sortType])

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))

      const sort = sortOptions.find(obj => obj.sortProperty === params.sortProperty)
      if (sort) {
        dispatch(
          setFilters({
            ...params,
            sort
          })
        )
      }

      isSearch.current = true
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (!isSearch.current) {
      getPizzas()
    }

    isSearch.current = false
  }, [getPizzas])

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        currentPage,
        categoryId,
        sortProperty: sortType.sortProperty
      })
      router.push('/', `?${queryString}`)
    }
    isMounted.current = true
    // eslint-disable-next-line
  }, [currentPage, categoryId, sortType])
  
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
            {isLoading === 'pending'
              ? skeleton
              : isLoading === 'success' && pizzas && pizzas.length
              ? pizzas
              : isLoading === 'error'
              ? 'Ошибка на стороне сервера'
              : 'Ничего не найдено'}
          </div>
        </HomeContent>
      </HomeContainer>
    </Page>
  )
}

export default Home
