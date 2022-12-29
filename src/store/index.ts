import { RootState } from '@interfaces/redux';
import {
  combineReducers,
  configureStore,
  PreloadedState
} from '@reduxjs/toolkit';
import { appSlice } from './features/app/appSlice';
import { forecastSlice } from './features/forecast/forecastSlice';
import { weatherSlice } from './features/weather/weatherSlice';

export const rootReducer = combineReducers({
  app: appSlice.reducer,
  weather: weatherSlice.reducer,
  forecast: forecastSlice.reducer
});

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false
      })
  });
}
