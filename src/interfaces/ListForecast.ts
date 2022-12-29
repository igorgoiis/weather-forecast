import { ICloud } from './cloud';
import { ISys } from './sys';
import { IWeatherCondition } from './weatherCondition';
import { IWeatherMain } from './weatherMain';
import { IWind } from './wind';

export interface IListForecast {
  dt?: number;
  main?: IWeatherMain;
  weather?: IWeatherCondition[];
  clouds?: ICloud;
  wind?: IWind;
  visibility?: number;
  pop?: number;
  sys?: ISys;
  dt_txt?: string;
}
