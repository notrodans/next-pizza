import { Dispatch, PayloadAction, createSlice } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AppState, AppThunk } from 'app/redux/store'
import axios from 'axios'
import { HYDRATE } from 'next-redux-wrapper'

import { IPizza, IPizzaAsyncOptions } from './types'

type StatusType = 'pending' | 'success' | 'error'

interface IPizzaSliceState {
  items: IPizza[]
  status: StatusType
}

const initialState: IPizzaSliceState = {
  items: [],
  status: 'pending'
}

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<IPizza[]>) {
      state.items = action.payload
    },
    setStatus(state, action: PayloadAction<StatusType>) {
      state.status = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(HYDRATE, (state, action: any) => {
      return {
        ...state,
        ...action?.payload.pizza
      }
    })
  }
})

export const { setItems, setStatus } = pizzaSlice.actions

export const fetchPizzas =
  (options: IPizzaAsyncOptions): AppThunk =>
  async (dispatch: Dispatch) => {
    const { currentPage, category, sort } = options

    dispatch(setStatus('pending'))
    try {
      const { data } = await axios.get<IPizza[]>(
        `https://62ee9ce0f5521ecad578b7b7.mockapi.io/items?limit=4${currentPage}${category}${sort}`
      )
      dispatch(setItems(data))
      return dispatch(setStatus('success'))
    } catch (error) {
      dispatch(setStatus('error'))
      return dispatch(setItems([]))
    }
  }

export const pizzaApi = createApi({
  reducerPath: 'pizza/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://62ee9ce0f5521ecad578b7b7.mockapi.io'
  }),
  endpoints: build => ({
    fetchPizza: build.query<IPizza[], IPizzaAsyncOptions>({
      query: ({ currentPage, category, sort }) => ({
        url: 'items',
        params: {
          page: currentPage,
          [category ? 'category' : '']: category,
          limit: 4,
          sortBy: sort
        }
      })
    })
  })
})

export const selectPizza = (state: AppState) => state?.pizza

export default pizzaSlice.reducer
