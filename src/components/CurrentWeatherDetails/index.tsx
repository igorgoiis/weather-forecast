//** React and React Native Imports */
import { memo } from 'react';

//** Third Party Imports */
import {
  Box,
  Center,
  HStack,
  Text,
  useColorMode,
  useTheme,
  VStack
} from 'native-base';

//** Expo Imports */
import {
  Feather,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons
} from '@expo/vector-icons';

//** Types Imports */
import { IWeatherMain } from '@interfaces/weatherMain';
import { IWind } from '@interfaces/wind';
import { ICityForecast } from '@interfaces/cityForecast';

//** Utils Imports */
import { unixTimestampGetTime } from '@utils/dateTime';

interface ICurrentWeatherDetailsProps {
  main: IWeatherMain;
  wind: IWind;
  city: ICityForecast;
}

function CurrentWeatherDetailsComponent({
  main,
  wind,
  city
}: ICurrentWeatherDetailsProps) {
  //** Hooks */
  const { colors } = useTheme();
  const { colorMode } = useColorMode();

  return (
    <VStack width="100%" space={4} alignItems="center" px="5">
      <HStack space={4}>
        <Box
          w={32}
          h={32}
          p={3}
          rounded={8}
          flexGrow={1}
          _light={{ bgColor: 'blueGray.200' }}
          _dark={{ bgColor: 'darkBlue.900' }}
          alignItems="center"
          shadow="2"
        >
          <Box flexDirection="row" alignItems="center">
            <FontAwesome
              name="thermometer-half"
              size={18}
              color={
                colorMode === 'light'
                  ? colors.blueGray[500]
                  : colors.blueGray[300]
              }
            />
            <Text
              _light={{ color: 'blueGray.500' }}
              _dark={{ color: 'blueGray.300' }}
              ml={1}
            >
              Sensação:
            </Text>
          </Box>
          <Center mt={4}>
            <Text
              ml={3}
              fontWeight="bold"
              fontSize="3xl"
              _light={{ color: 'darkBlue.800' }}
              _dark={{ color: 'light.300' }}
              testID="feels-like"
            >
              {main.feels_like ? `${Math.round(main.feels_like)}°` : ''}
            </Text>
          </Center>
        </Box>
        <Box
          w={32}
          h={32}
          p={3}
          rounded={8}
          flexGrow={1}
          _light={{ bgColor: 'blueGray.200' }}
          _dark={{ bgColor: 'darkBlue.900' }}
          alignItems="center"
          shadow="2"
        >
          <Box flexDirection="row" alignItems="center">
            <Ionicons
              name="md-water-outline"
              size={18}
              color={
                colorMode === 'light'
                  ? colors.blueGray[500]
                  : colors.blueGray[300]
              }
              style={{ margin: 0, padding: 0, marginLeft: 0 }}
            />
            <Text
              _light={{ color: 'blueGray.500' }}
              _dark={{ color: 'blueGray.300' }}
            >
              Umidade:
            </Text>
          </Box>
          <Center mt={4}>
            <Text
              ml={3}
              fontWeight="bold"
              fontSize="3xl"
              _light={{ color: 'darkBlue.800' }}
              _dark={{ color: 'light.300' }}
              testID="humidity"
            >
              {`${main.humidity}%`}
            </Text>
          </Center>
        </Box>
      </HStack>
      <HStack space={4}>
        <Box
          w={32}
          h={32}
          p={3}
          rounded={8}
          flexGrow={1}
          _light={{ bgColor: 'blueGray.200' }}
          _dark={{ bgColor: 'darkBlue.900' }}
          alignItems="center"
          shadow="2"
        >
          <Box flexDirection="row" alignItems="center">
            <MaterialCommunityIcons
              name="weather-windy"
              size={18}
              color={
                colorMode === 'light'
                  ? colors.blueGray[500]
                  : colors.blueGray[300]
              }
            />
            <Text
              _light={{ color: 'blueGray.500' }}
              _dark={{ color: 'blueGray.300' }}
              ml={1}
            >
              Vento:
            </Text>
          </Box>
          <Center mt={4}>
            <Text
              ml={3}
              fontWeight="bold"
              fontSize="2xl"
              _light={{ color: 'darkBlue.800' }}
              _dark={{ color: 'light.300' }}
              testID="wind-speed"
            >
              {`${Math.round(wind.speed * 3.6)} km/h`}
            </Text>
          </Center>
        </Box>

        <Box
          w={32}
          h={32}
          p={3}
          rounded={8}
          flexGrow={1}
          _light={{ bgColor: 'blueGray.200' }}
          _dark={{ bgColor: 'darkBlue.900' }}
          alignItems="center"
          shadow="2"
        >
          <Box flexDirection="row" alignItems="center">
            <Ionicons
              name="md-speedometer-outline"
              size={18}
              color={
                colorMode === 'light'
                  ? colors.blueGray[500]
                  : colors.blueGray[300]
              }
            />
            <Text
              ml={1}
              _light={{ color: 'blueGray.500' }}
              _dark={{ color: 'blueGray.300' }}
            >
              Pressão:
            </Text>
          </Box>
          <Center mt={4}>
            <Text
              ml={3}
              fontWeight="bold"
              fontSize="xl"
              _light={{ color: 'darkBlue.800' }}
              _dark={{ color: 'light.300' }}
              testID="pressure"
            >
              {`${main.pressure} hPa`}
            </Text>
          </Center>
        </Box>
      </HStack>
      <HStack space={4}>
        <Box
          w={32}
          h={32}
          p={3}
          rounded={8}
          flexGrow={1}
          _light={{ bgColor: 'blueGray.200' }}
          _dark={{ bgColor: 'darkBlue.900' }}
          alignItems="center"
          shadow="2"
        >
          <Box flexDirection="row" alignItems="center">
            <Feather
              name="sunrise"
              size={18}
              color={
                colorMode === 'light'
                  ? colors.blueGray[500]
                  : colors.blueGray[300]
              }
            />
            <Text
              _light={{ color: 'blueGray.500' }}
              _dark={{ color: 'blueGray.300' }}
              ml={1}
            >
              Nascer do Sol:
            </Text>
          </Box>
          <Center mt={4}>
            <Text
              ml={3}
              fontWeight="bold"
              fontSize="3xl"
              _light={{ color: 'darkBlue.800' }}
              _dark={{ color: 'light.300' }}
              testID="sunrise"
            >
              {city.sunrise ? unixTimestampGetTime(city.sunrise) : ''}
            </Text>
          </Center>
        </Box>
        <Box
          w={32}
          h={32}
          p={3}
          rounded={8}
          flexGrow={1}
          _light={{ bgColor: 'blueGray.200' }}
          _dark={{ bgColor: 'darkBlue.900' }}
          alignItems="center"
          shadow="2"
        >
          <Box flexDirection="row" alignItems="center">
            <Feather
              name="sunset"
              size={18}
              color={
                colorMode === 'light'
                  ? colors.blueGray[500]
                  : colors.blueGray[300]
              }
            />
            <Text
              _light={{ color: 'blueGray.500' }}
              _dark={{ color: 'blueGray.300' }}
              ml={1}
            >
              Pôr do Sol:
            </Text>
          </Box>
          <Center mt={4}>
            <Text
              ml={3}
              fontWeight="bold"
              fontSize="3xl"
              _light={{ color: 'darkBlue.800' }}
              _dark={{ color: 'light.300' }}
              testID="sunset"
            >
              {city.sunset ? unixTimestampGetTime(city.sunset) : ''}
            </Text>
          </Center>
        </Box>
      </HStack>
    </VStack>
  );
}

export const CurrentWeatherDetails = memo(
  CurrentWeatherDetailsComponent,
  (prevProps, nextProps) => {
    return (
      Object.is(prevProps.city, nextProps.city) &&
      Object.is(prevProps.main, nextProps.main) &&
      Object.is(prevProps.wind, nextProps.wind)
    );
  }
);
