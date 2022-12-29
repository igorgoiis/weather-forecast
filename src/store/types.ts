import { IForecast } from '@interfaces/forecast';
import { IWeather } from '@interfaces/weather';

export interface IForecastProps {
  forecast: IForecast;
  loading: boolean;
  error: boolean;
}

export interface IWeatherProps {
  weather: IWeather;
  loading: boolean;
  error: boolean;
}

export interface IAppProps {
  locationUpdatedAt: Date | null;
  loading: boolean;
}
