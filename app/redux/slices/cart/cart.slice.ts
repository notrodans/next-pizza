import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from 'app/redux/store'

import { ICartItem } from './types'

interface ICartSliceState {
  items: ICartItem[]
  totalPrice: number
}

const initialState: ICartSliceState = {
  items: [],
  totalPrice: 0
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const findItem = state.items.find(item => item.id === action.payload.id)

      if (findItem) {
        findItem.count += 1
      } else {
        state.items.push(action.payload)
      }
      state.totalPrice = state.items.reduce((prev, item) => (prev += item.price * item.count), 0)
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter(obj => obj.id !== action.payload)
      state.totalPrice = state.items.reduce((prev, item) => (prev += item.price * item.count), 0)
    },
    clearItems(state) {
      state.items = []
      state.totalPrice = 0
    },
    incrementItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find(item => item.id === action.payload)
      if (findItem) {
        findItem.count += 1
        state.totalPrice = state.items.reduce((prev, item) => (prev += item.price * item.count), 0)
      }
    },
    decrementItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find(item => item.id === action.payload)
      if (findItem) {
        findItem.count -= 1

        if (findItem.count <= 0) state.items = state.items.filter(obj => obj.id !== findItem.id)
        state.totalPrice = state.items.reduce((prev, item) => (prev += item.price * item.count), 0)
      }
    }
  }
})

export const selectCart = (state: RootState) => state.cart

export const { addToCart, removeFromCart, clearItems, incrementItem, decrementItem } = cartSlice.actions

export default cartSlice
