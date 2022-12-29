import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import { fetchForecastBuilder } from './thunks/fetchForecast';

export const forecastSlice = createSlice({
  name: 'forecast',
  initialState,
  reducers: {},
  extraReducers(builder) {
    fetchForecastBuilder(builder);
  }
});
