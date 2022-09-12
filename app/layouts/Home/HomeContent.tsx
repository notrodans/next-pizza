import { FC, PropsWithChildren } from 'react'

const HomeContent: FC<PropsWithChildren> = ({ children }) => {
  return <div className='content'>{children}</div>
}

export default HomeContent
