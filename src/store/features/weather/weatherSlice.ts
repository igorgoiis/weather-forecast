import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './initalState';
import { fetchWeatherBuilder } from './thunks/fetchWeather';

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers(builder) {
    fetchWeatherBuilder(builder);
  }
});
