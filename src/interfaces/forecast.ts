import { ICityForecast } from './cityForecast';
import { IListForecast } from './ListForecast';

export interface IForecast {
  cod: string;
  message: number;
  cnt: number;
  list: IListForecast[];
  city: ICityForecast;
}
