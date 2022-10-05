import { FC, PropsWithChildren, memo } from 'react'

const HomeContent: FC<PropsWithChildren> = ({ children }) => {
  return <div className='content'>{children}</div>
}

export default memo(HomeContent)
