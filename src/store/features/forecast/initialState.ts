import { IForecastProps } from '@store/types';

export const initialState: IForecastProps = {
  forecast: {
    city: {},
    cnt: 0,
    cod: '',
    list: [],
    message: 0
  },
  loading: true,
  error: false
};
