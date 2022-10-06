import { ThunkAction, configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import { Action, combineReducers } from 'redux'

import cartSlice from './slices/cart/cart.slice'
import filterSlice from './slices/filter/filter.slice'
import pizzaSlice from './slices/pizza/pizza.slice'

const rootReducer = combineReducers({
  filter: filterSlice,
  pizza: pizzaSlice,
  cart: cartSlice
})

export const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    devTools: true
  })

export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore['getState']>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>

export const wrapper = createWrapper<AppStore>(makeStore)
