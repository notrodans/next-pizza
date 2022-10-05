import Footer from '@components/Footer/Footer'
import Header from '@components/Header/Header'
import { FC, PropsWithChildren, memo } from 'react'

const Page: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className='wrapper'>
      <Header />
      <main className='page'>{children}</main>
      <Footer />
    </div>
  )
}

export default memo(Page)
