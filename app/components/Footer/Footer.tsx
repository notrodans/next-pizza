import Pagination from '@components/Pagination/Pagination'
import { useRouter } from 'next/router'
import { FC } from 'react'

const Footer: FC = () => {
  const { pathname } = useRouter()

  return (
    <footer>
      <div className='footer__container'>
        {pathname.includes('cart') || pathname.includes('pizza') ? '' : <Pagination />}
      </div>
    </footer>
  )
}

export default Footer
