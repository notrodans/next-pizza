import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AppState } from 'app/redux/store'
import axios from 'axios'
import { HYDRATE } from 'next-redux-wrapper'

import { IPizza, IPizzaAsyncOptions } from './types'

type StatusType = 'pending' | 'success' | 'error'

interface IPizzaSliceState {
  items: IPizza[]
  status: StatusType
  isLoading: boolean
}

const initialState: IPizzaSliceState = {
  items: [],
  status: 'pending',
  isLoading: true
}

export const fetchPizzas = createAsyncThunk<IPizza[], IPizzaAsyncOptions>(
  'pizza/fetchPizzasStatus',
  async ({ currentPage, category, sort }) => {
    const { data } = await axios.get<IPizza[]>(
      `https://62ee9ce0f5521ecad578b7b7.mockapi.io/items?page=${currentPage}&limit=4${category}${sort}`
    )
    return data
  }
)

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(HYDRATE, (state, action: any) => {
        return {
          ...state,
          ...action?.payload.pizza
        }
      })
      .addCase(fetchPizzas.pending, state => {
        state.status = 'pending'
        state.isLoading = true
        state.items = []
      })
      .addCase(fetchPizzas.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.items = payload
        state.status = 'success'
      })
      .addCase(fetchPizzas.rejected, state => {
        state.status = 'error'
        state.isLoading = false
        state.items = []
      })
  }
})

export const selectPizza = (state: AppState) => state?.pizza

export default pizzaSlice.reducer
