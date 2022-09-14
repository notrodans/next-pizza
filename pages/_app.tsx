import store from 'app/redux/store'
import type { AppProps } from 'next/app'
import { FC } from 'react'
import { Provider } from 'react-redux'

import '../styles/style.scss'

const WrappedApp: FC<AppProps> = ({ Component, pageProps }) => (
  <Provider store={store}>
    <Component {...pageProps} />
  </Provider>
)

export default WrappedApp
