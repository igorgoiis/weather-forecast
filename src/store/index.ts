import { configureStore } from '@reduxjs/toolkit'
import { weatherSlice } from './weather/slice'
export const store = configureStore({
  reducer: {
    weather: weatherSlice.reducer
  }
})
