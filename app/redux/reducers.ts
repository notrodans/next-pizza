import { combineReducers } from '@reduxjs/toolkit'

import cartSlice from './slices/cart/cart.slice'
import filterSlice from './slices/filter/filter.slice'
import pizzaSlice from './slices/pizza/pizza.slice'

const combinedReducers = combineReducers({
  [cartSlice.name]: cartSlice.reducer,
  [filterSlice.name]: filterSlice.reducer,
  [pizzaSlice.name]: pizzaSlice.reducer
})

export default combinedReducers
