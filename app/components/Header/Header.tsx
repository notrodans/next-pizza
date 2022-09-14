import { FC, memo } from 'react'

import styles from './Header.module.scss'
import HeaderCart from './header-cart/HeaderCart'
import HeaderLogo from './header-logo/HeaderLogo'

const Header: FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <HeaderLogo />
        <HeaderCart />
      </div>
    </header>
  )
}

export default memo(Header)
