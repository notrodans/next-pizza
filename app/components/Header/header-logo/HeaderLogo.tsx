import logo from '@assets/img/pizza-logo.svg'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import styles from '../Header.module.scss'

const HeaderLogo: FC = () => {
  return (
    <Link href='/'>
      <a className={styles.logo}>
        <Image width={38} height={40} src={logo} alt='Pizza logo' />
        <div>
          <h1>Next Pizza</h1>
          <p>самая вкусная пицца во вселенной</p>
        </div>
      </a>
    </Link>
  )
}

export default HeaderLogo
