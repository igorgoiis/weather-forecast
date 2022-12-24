import { ICoord } from '@interfaces/coord'
import { IWeather } from '@interfaces/weather'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '@services/api'

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (coord: ICoord, { rejectWithValue }) => {
    try {
      console.log('Chamou')
      const { data } = await api.get<IWeather>(
        `/weather?lat=${coord.lat}&lon=${coord.lon}&appid=95c3b51440f1443c69fd9ef27e6126d2&lang=pt_br&units=metric`
      )
      console.log('E deu certo!')
      return data
    } catch (error) {
      console.log('E deu errado!')
      return rejectWithValue('Error')
    }
  }
)
