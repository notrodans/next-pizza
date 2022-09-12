import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'

import cartSlice from './slices/cart/cart.slice'
import filterSlice from './slices/filter/filter.slice'
import pizzaSlice from './slices/pizza/pizza.slice'

function makeStore() {
  return configureStore({
    reducer: {
      filterSlice,
      cartSlice,
      pizzaSlice
    }
  })
}

const store = makeStore()
export type RootStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<RootStore['getState']>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>

export const wrapper = createWrapper<RootStore>(makeStore)

export default store
