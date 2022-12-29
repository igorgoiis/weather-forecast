import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '@services/api';
import { ICoord } from '@interfaces/coord';
import { IForecast } from '@interfaces/forecast';
import { API_KEY } from '@env';
import { changeLoadingApp } from '@store/features/app/appSlice';
import { IForecastProps } from '@store/types';

export const fetchForecast = createAsyncThunk(
  'forecast/fetchForecast',
  async (coord: ICoord, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await api.get<IForecast>(
        `/forecast?lat=${coord.lat}&lon=${coord.lon}&appid=${API_KEY}&lang=pt_br&units=metric`
      );
      dispatch(changeLoadingApp(false));

      return data;
    } catch (error) {
      return rejectWithValue('Error');
    }
  }
);

export const fetchForecastBuilder = (
  builder: ActionReducerMapBuilder<IForecastProps>
) => {
  builder
    .addCase(fetchForecast.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchForecast.fulfilled, (state, action) => {
      state.forecast = action.payload;
      state.error = false;
      state.loading = false;
    })
    .addCase(fetchForecast.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
};
