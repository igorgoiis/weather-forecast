import { ICoord } from './coord';

export interface ICityForecast {
  id?: number;
  name?: string;
  coord?: ICoord;
  country?: 'BR';
  population?: number;
  timezone?: number;
  sunrise?: number;
  sunset?: number;
}
