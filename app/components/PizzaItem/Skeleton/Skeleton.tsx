import React, { FC } from 'react'
import ContentLoader from 'react-content-loader'

const Skeleton: FC = () => (
  <ContentLoader
    className='pizza-block'
    speed={1}
    width={280}
    height={454}
    viewBox='0 0 280 454'
    backgroundColor='#f3f3f3'
    foregroundColor='#ecebeb'>
    <circle cx='130' cy='130' r='130' />
    <rect x='0' y='270' rx='10' ry='10' width='280' height='24' />
    <rect x='0' y='304' rx='10' ry='10' width='280' height='82' />
    <rect x='0' y='400' rx='10' ry='10' width='280' height='44' />
  </ContentLoader>
)

export default Skeleton
