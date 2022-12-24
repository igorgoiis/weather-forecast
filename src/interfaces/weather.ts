import { ICloud } from './cloud'
import { ICoord } from './coord'
import { ISys } from './sys'
import { IWeatherCondition } from './weatherCondition'
import { IWeatherMain } from './weatherMain'
import { IWind } from './wind'

export interface IWeather {
  coord: ICoord
  weather: IWeatherCondition[]
  base: string
  main: IWeatherMain
  visibility: number
  wind: IWind
  clouds: ICloud
  dt: number
  sys: ISys
  timezone: number
  id: number
  name: string
  cod: number
}
