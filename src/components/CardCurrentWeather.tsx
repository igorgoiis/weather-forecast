import {
  HStack,
  Box,
  Center,
  Text,
  Heading,
  VStack,
  useTheme,
  Image,
  Skeleton
} from 'native-base'
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons
} from '@expo/vector-icons'
import { IWeatherMain } from '@interfaces/weatherMain'
import { IWeatherCondition } from '@interfaces/weatherCondition'
import { IWind } from '@interfaces/wind'
import { useAppSelector } from '@store/hooks/useAppSelector'

interface ICardCurrentWeatherProps {
  city: string
  weather: IWeatherCondition
  main: IWeatherMain
  wind: IWind
}

export function CardCurrentWeather({
  city,
  weather = { id: 0, description: '', icon: '', main: '' },
  main,
  wind
}: ICardCurrentWeatherProps) {
  const { colors } = useTheme()
  const { loading } = useAppSelector((state) => state.weather)
  return (
    <VStack
      space={12}
      maxW="100%"
      justifyContent="center"
      alignItems="center"
      bgColor="white"
      p={5}
      mx="5"
      rounded={20}
      zIndex={1}
      shadow="2"
    >
      <VStack space={4} alignItems="center" justifyContent="center" w="100%">
        <Center>
          <HStack justifyContent="center" alignItems="center">
            <Skeleton.Text lines={1} isLoaded={!loading} w={40}>
              <MaterialCommunityIcons
                name="map-marker-outline"
                size={18}
                color="light.900"
              />
              <Heading size={'sm'} fontWeight={400} color="light.900">
                {city}
              </Heading>
            </Skeleton.Text>
          </HStack>
        </Center>
        <Skeleton h={24} isLoaded={!loading} rounded="10">
          <Box flexDirection="row" alignItems="center">
            <Image
              source={{
                uri: `http://openweathermap.org/img/wn/${weather.icon}@2x.png`
              }}
              alt="Ícone do tempo"
              size="lg"
            />
            <Heading size="3xl">{Math.round(main.temp)}°</Heading>
          </Box>
        </Skeleton>
        <Skeleton.Text lines={1} w={40} isLoaded={!loading}>
          <Heading size="xs" textTransform="capitalize">
            {weather.description}
          </Heading>
        </Skeleton.Text>
      </VStack>
      <VStack space={2} width="100%" alignItems="flex-start">
        <Skeleton.Text lines={1} w={40} isLoaded={!loading}>
          <Box flexDirection="row" alignItems="center">
            <FontAwesome
              name="thermometer-half"
              size={18}
              color={colors.blueGray[500]}
            />
            <Text color="blueGray.500" ml={1}>
              Sensação:
            </Text>
            <Text ml={3} fontWeight="bold" fontSize={16} color="darkBlue.300">
              {Math.round(main.feels_like)}°
            </Text>
          </Box>
        </Skeleton.Text>
        <Skeleton.Text lines={1} w={40} isLoaded={!loading}>
          <Box flexDirection="row" alignItems="center">
            <Ionicons
              name="md-water-outline"
              size={18}
              color={colors.blueGray[500]}
              style={{ margin: 0, padding: 0, marginLeft: -3 }}
            />
            <Text color="blueGray.500">Umidade:</Text>
            <Text ml={3} fontWeight="bold" fontSize={16} color="darkBlue.300">
              {main.humidity}%
            </Text>
          </Box>
        </Skeleton.Text>
        <Skeleton.Text lines={1} w={40} isLoaded={!loading}>
          <Box flexDirection="row" alignItems="center">
            <MaterialCommunityIcons
              name="weather-windy"
              size={18}
              color={colors.blueGray[500]}
            />
            <Text color="blueGray.500" ml={1}>
              Vento:
            </Text>
            <Text ml={3} fontWeight="bold" fontSize={16} color="darkBlue.300">
              {Math.round(wind.speed * 3.6)} km/h
            </Text>
          </Box>
        </Skeleton.Text>
        <Skeleton.Text lines={1} w={40} isLoaded={!loading}>
          <Box flexDirection="row" alignItems="center">
            <Ionicons
              name="md-speedometer-outline"
              size={18}
              color={colors.blueGray[500]}
            />
            <Text ml={1} color="blueGray.500">
              Pressão:
            </Text>
            <Text ml={3} fontWeight="bold" fontSize={16} color="darkBlue.300">
              {main.pressure} hPa
            </Text>
          </Box>
        </Skeleton.Text>
      </VStack>
    </VStack>
  )
}
