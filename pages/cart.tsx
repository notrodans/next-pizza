import Cart from '@components/screens/cart/Cart'
import Meta from 'app/utils/Meta'
import type { NextPage } from 'next'

const TestPage: NextPage = () => {
  return (
    <>
      <Meta title='Корзина' description='Страница корзины' />
      <Cart />
    </>
  )
}

export default TestPage
