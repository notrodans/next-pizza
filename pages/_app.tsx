import store, { wrapper } from 'app/redux/store'
import type { AppProps } from 'next/app'
import { FC } from 'react'
import { Provider } from 'react-redux'

import '../styles/style.scss'

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default wrapper.withRedux(App)
