import { IWeather } from 'src/interfaces/weather'

interface IProps {
  weather: IWeather
  loading: boolean
  error: boolean
}

export const initialState: IProps = {
  weather: {
    base: '',
    clouds: {
      all: 0
    },
    cod: 0,
    coord: {
      lat: 0,
      lon: 0
    },
    dt: 0,
    id: 0,
    main: {
      feels_like: 0,
      humidity: 0,
      pressure: 0,
      temp: 0,
      temp_max: 0,
      temp_min: 0
    },
    name: '',
    sys: {
      country: '',
      id: 0,
      sunrise: 0,
      sunset: 0,
      type: 0
    },
    timezone: 0,
    visibility: 0,
    weather: [],
    wind: {
      deg: 0,
      speed: 0
    }
  },
  loading: true,
  error: false
}
