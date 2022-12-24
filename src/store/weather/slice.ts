import { createSlice } from '@reduxjs/toolkit'
import { initialState } from './initalState'
import { fetchWeather } from './thunks'

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.weather = action.payload
        state.error = false
        state.loading = false
      })
      .addCase(fetchWeather.rejected, (state) => {
        state.error = true
        state.loading = false
      })
  }
})
