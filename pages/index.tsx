import Home from '@components/screens/home/Home'
import { wrapper } from 'app/redux/store'
import Meta from 'app/utils/Meta'
import type { GetServerSideProps, NextPage } from 'next'

const HomePage: NextPage = () => {
  return (
    <>
      <Meta title='Домашняя' description='Главная страница' />
      <Home />
    </>
  )
}

export default HomePage
