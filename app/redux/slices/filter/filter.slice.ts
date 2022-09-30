import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AppState } from 'app/redux/store'
import { HYDRATE } from 'next-redux-wrapper'

import { IFilterSliceState, SortType } from './types'

const initialState: IFilterSliceState = {
  categoryId: 0,
  currentPage: 1,
  currentCategory: 'Все',
  sort: { name: 'популярности', sortProperty: 'rating' }
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    select(state, action: PayloadAction<number>) {
      state.categoryId = action.payload
    },
    selectCategory(state, action: PayloadAction<string>) {
      state.currentCategory = action.payload
    },
    selectSort(state, action: PayloadAction<SortType>) {
      state.sort = action.payload
    },
    setPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    },
    setFilters(state, action) {
      if (Object.keys(action.payload).length) {
        state.currentPage = Number(action.payload.currentPage)
        state.categoryId = Number(action.payload.categoryId)
        state.sort = action.payload.sort
      } else {
        state.categoryId = 0
        state.currentPage = 1
        state.sort = { name: 'популярности', sortProperty: 'rating' }
      }
    }
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.filter
      }
    }
  }
})

export const selectFilter = (state: AppState) => state?.filter

export const { select, selectCategory, selectSort, setPage, setFilters } = filterSlice.actions

export default filterSlice.reducer
