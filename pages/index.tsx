import Home from '@components/screens/home/Home'
import Meta from 'app/utils/Meta'
import type { NextPage } from 'next'

const HomePage: NextPage = () => {
  return (
    <>
      <Meta title='Домашняя' description='Главная страница' />
      <Home />
    </>
  )
}

export default HomePage
