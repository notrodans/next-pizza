import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from 'app/redux/store'
import axios from 'axios'

import { IPizza, IPizzaAsyncOptions } from './types'

interface IPizzaSliceState {
  items: IPizza[]
  status: 'pending' | 'success' | 'error'
}

const initialState: IPizzaSliceState = {
  items: [],
  status: 'pending'
}

export const fetchPizzas = createAsyncThunk<IPizza[], IPizzaAsyncOptions>('pizza/fetchPizzasStatus', async options => {
  const { currentPage, category, sort, search } = options

  const { data } = await axios.get<IPizza[]>(
    `https://62ee9ce0f5521ecad578b7b7.mockapi.io/items?page=${currentPage}&limit=4${category}${sort}&order=desc${search}`
  )
  return data
})

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPizzas.pending, state => {
        state.status = 'pending'
        state.items = []
      })
      .addCase(fetchPizzas.fulfilled, (state, { payload }) => {
        state.items = payload
        state.status = 'success'
      })
      .addCase(fetchPizzas.rejected, state => {
        state.status = 'error'
        state.items = []
      })
  }
})
export const selectPizza = (state: RootState) => state.pizza
export const { setItems } = pizzaSlice.actions

export default pizzaSlice
