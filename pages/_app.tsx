import { wrapper } from 'app/redux/store'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'

import '../styles/style.scss'

const App = ({ Component, ...pageProps }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(pageProps)

  return (
    <Provider store={store}>
      <Component {...props.pageProps} />
    </Provider>
  )
}

export default App
