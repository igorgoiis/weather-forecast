import { ICoord } from '@interfaces/coord';
import { IWeather } from '@interfaces/weather';
import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '@services/api';
import { API_KEY } from '@env';
import { fetchForecast } from '@store/features/forecast/thunks/fetchForecast';
import { changeLoadingApp } from '@store/features/app/appSlice';
import { IWeatherProps } from '@store/types';

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (coord: ICoord, { rejectWithValue, dispatch }) => {
    dispatch(changeLoadingApp(true));
    try {
      const { data } = await api.get<IWeather>(
        `/weather?lat=${coord.lat}&lon=${coord.lon}&appid=${API_KEY}&lang=pt_br&units=metric`
      );
      dispatch(fetchForecast({ lat: coord.lat, lon: coord.lon }));
      return data;
    } catch (error) {
      return rejectWithValue('Error');
    }
  }
);

export const fetchWeatherBuilder = (
  builder: ActionReducerMapBuilder<IWeatherProps>
) => {
  builder
    .addCase(fetchWeather.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchWeather.fulfilled, (state, action) => {
      state.weather = action.payload;
      state.error = false;
      state.loading = false;
    })
    .addCase(fetchWeather.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
};
