import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState } from './initalState';

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    changeLocationUpdateAt: (state, action: PayloadAction<Date>) => {
      state.locationUpdatedAt = action.payload;
    },
    changeLoadingApp: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    }
  }
});

export const { changeLoadingApp, changeLocationUpdateAt } = appSlice.actions;
