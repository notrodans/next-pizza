import useOutside from 'app/hooks/useOutside'
import { useAppDispatch, useAppSelector } from 'app/redux/hooks'
import { selectFilter, selectSort } from 'app/redux/slices/filter/filter.slice'
import { SortType } from 'app/redux/slices/filter/types'
import cn from 'classnames'
import { FC, memo } from 'react'

import styles from './Sort.module.scss'

export const sortOptions: SortType[] = [
  { name: 'популярности', sortProperty: 'rating' },
  { name: 'цене', sortProperty: 'price' },
  { name: 'алфавиту', sortProperty: 'title' }
]

const Sort: FC = () => {
  const { ref, isShow, setIsShow } = useOutside(false)

  const { sort } = useAppSelector(selectFilter)
  const { name, sortProperty } = sort

  const dispatch = useAppDispatch()

  const onClickItem = (obj: SortType) => {
    dispatch(selectSort(obj))
    setIsShow(false)
  }

  return (
    <div
      ref={ref}
      className={cn([styles.sort], {
        [styles.active]: isShow
      })}>
      <div className={styles.sort__label}>
        <svg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z'
            fill='#2C2C2C'
          />
        </svg>
        <b>Сортировка по:</b>
        <button type='button' onClick={() => setIsShow(!isShow)}>
          {name}
        </button>
      </div>
      <div className={styles.sort__popup}>
        <ul>
          {sortOptions.map(obj => (
            <button
              type='button'
              key={obj.name}
              onClick={() => onClickItem(obj)}
              className={cn({ [styles.active]: sortProperty === obj.sortProperty })}>
              {obj.name}
            </button>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default memo(Sort)
