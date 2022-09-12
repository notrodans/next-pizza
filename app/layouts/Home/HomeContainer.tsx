import { FC, PropsWithChildren } from 'react'

const HomeContainer: FC<PropsWithChildren> = ({ children }) => {
  return (
    <section className='page__home home'>
      <div className='home__container'>{children}</div>
    </section>
  )
}

export default HomeContainer
