import { useAppDispatch, useAppSelector } from 'app/redux/hooks'
import { addToCart, selectCart } from 'app/redux/slices/cart/cart.slice'
import { ICartItem } from 'app/redux/slices/cart/types'
import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import React, { FC, memo } from 'react'

import styles from './PizzaItem.module.scss'

const typeNames = ['тонкое', 'традиционное']
const sizeNames = [26, 30, 40]

type PizzaBlockProps = {
  id: string
  title: string
  price: number
  imageUrl: string
  sizes: number[]
  types: number[]
}

const PizzaBlock: FC<PizzaBlockProps> = ({ id, title, price, imageUrl, sizes, types }) => {
  const [activeType, setActiveType] = React.useState(0)
  const [activeSize, setActiveSize] = React.useState(0)

  const dispatch = useAppDispatch()
  const { items } = useAppSelector(selectCart)
  const countItems = items.find(item => item.id === id)

  const onClickAdd = () => {
    const item: ICartItem = {
      id,
      title,
      price,
      imageUrl,
      type: typeNames[activeType],
      size: sizeNames[activeSize],
      count: 1
    }

    dispatch(addToCart(item))
  }

  return (
    <div className={styles['pizza-block']}>
      <Link href={`/pizza/${id}`}>
        <a>
          <Image className={styles.image} src={imageUrl} width={280} height={280} alt={`pizza: ${title}`} />
        </a>
      </Link>
      <h4 className={styles.title}>{title}</h4>
      <div className={styles.selector}>
        <ul>
          {types.map(typeId => (
            <button
              type='button'
              key={typeId}
              className={cn({
                [styles.active]: activeType === typeId
              })}
              onClick={() => setActiveType(typeId)}>
              {typeNames[typeId]}
            </button>
          ))}
        </ul>
        <ul>
          {sizes.map((size, index) => {
            const onClickSize = () => setActiveSize(index)
            return (
              <button
                type='button'
                key={size}
                onClick={onClickSize}
                className={cn({ [styles.active]: activeSize === index })}>
                {size} см.
              </button>
            )
          })}
        </ul>
      </div>
      <div className={styles.bottom}>
        <div className={styles.price}>от {price} ₽</div>
        <button type='button' onClick={() => onClickAdd()} className='button button--outline button--add'>
          <svg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
              fill='white'
            />
          </svg>
          <span>Добавить</span>
          {countItems ? <i>{countItems?.count}</i> : ''}
        </button>
      </div>
    </div>
  )
}

export default memo(PizzaBlock)
