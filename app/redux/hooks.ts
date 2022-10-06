import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { AppState, makeStore } from './store'

const store = makeStore()

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector
