import { configureStore } from '@reduxjs/toolkit'
import calculater from './reducers/calculate.reducer'

export const store = configureStore({
  reducer: {
    calculater,
  },
})