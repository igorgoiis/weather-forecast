import { VStack, Image } from 'native-base'
import BackgroundImage from '@assets/background-image-light.png'
import { useEffect } from 'react'
import { fetchWeather } from '@store/weather/thunks'
import { useAppDispatch } from '@store/hooks/useAppDispatch'
import { CardCurrentWeather } from '@components/CardCurrentWeather'
import * as Location from 'expo-location'
import { useAppSelector } from '@store/hooks/useAppSelector'

export function Main() {
  const dispatch = useAppDispatch()
  const { weather } = useAppSelector((state) => state.weather)

  useEffect(() => {
    ;(async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()
      const backgroundPermissions =
        await Location.getBackgroundPermissionsAsync()
      console.log({ backgroundPermissions })
      if (status !== 'granted') {
        return
      }
      const { coords } = await Location.getCurrentPositionAsync({})
      dispatch(fetchWeather({ lat: coords.latitude, lon: coords.longitude }))
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <VStack
      flex={1}
      bg={{
        linearGradient: {
          colors: ['lightBlue.50', 'lightBlue.500'],
          start: [0, 0],
          end: [1, 1]
        }
      }}
      pt={10}
    >
      <CardCurrentWeather
        city={weather.name}
        main={weather.main}
        weather={weather.weather[0]}
        wind={weather.wind}
      />
      <Image
        source={BackgroundImage}
        alt="Nuvens"
        resizeMode="contain"
        position="absolute"
        bottom={0}
      />
    </VStack>
  )
}
