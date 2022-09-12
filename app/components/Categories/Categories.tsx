import { useAppDispatch, useAppSelector } from 'app/redux/hooks'
import { select, selectCategory, selectFilter } from 'app/redux/slices/filter/filter.slice'
import cn from 'classnames'
import React, { FC, memo } from 'react'

import styles from './Categories.module.scss'

const categories = ['Все', 'Гриль', 'Острые', 'Мясные', 'Закрытые', 'Вегетерианская']
const Categories: FC = () => {
  const dispatch = useAppDispatch()
  const { categoryId } = useAppSelector(selectFilter)

  const onClickCategory = React.useCallback((index: number, category: string) => {
    dispatch(select(index))
    dispatch(selectCategory(category))
    // eslint-disable-next-line
  }, [])

  return (
    <div className={styles.categories}>
      <ul>
        {categories.map((category, index) => (
          <button
            type='button'
            key={category}
            className={cn({
              [styles.active]: categoryId + 1 === index + 1
            })}
            onClick={() => onClickCategory(index, category)}>
            {category}
          </button>
        ))}
      </ul>
    </div>
  )
}

export default memo(Categories)
