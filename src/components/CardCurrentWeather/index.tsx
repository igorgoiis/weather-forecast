//** React and React Native Imports */
import { memo } from 'react';

//** Third Party Imports */
import {
  Box,
  Image,
  HStack,
  Center,
  VStack,
  Heading,
  useColorMode,
  useTheme
} from 'native-base';

//** Expo Imports */
import { MaterialCommunityIcons } from '@expo/vector-icons';

//** Types Imports */
import { IWeatherMain } from '@interfaces/weatherMain';
import { IWeatherCondition } from '@interfaces/weatherCondition';

interface ICardCurrentWeatherProps {
  city: string;
  weather: IWeatherCondition;
  main: IWeatherMain;
}

function CardCurrentWeatherComponent({
  city,
  weather = { id: 0, description: '', icon: '', main: '' },
  main
}: ICardCurrentWeatherProps) {
  //** Hooks */
  const { colorMode } = useColorMode();
  const { colors } = useTheme();

  return (
    <VStack alignItems="center" w="100%" px="5" pb="3">
      <Center>
        <HStack justifyContent="center" alignItems="center">
          <MaterialCommunityIcons
            name="map-marker-outline"
            size={18}
            color={
              colorMode === 'light' ? colors.light[900] : colors.light[300]
            }
          />
          <Heading
            size={'md'}
            fontWeight={400}
            _light={{ color: 'light.900' }}
            _dark={{ color: 'light.300' }}
            testID="city-name"
          >
            {city}
          </Heading>
        </HStack>
      </Center>
      <Box flexDirection="row" alignItems="center">
        <Image
          source={{
            uri: `http://openweathermap.org/img/wn/${weather.icon}@2x.png`
          }}
          alt="Ícone do tempo"
          size="md"
          testID="image-weather"
        />
        <Heading
          size="3xl"
          _light={{ color: 'light.900' }}
          _dark={{ color: 'light.300' }}
          fontWeight="light"
          testID="label-temp"
        >
          {main.temp ? `${Math.round(main.temp)}°` : ''}
        </Heading>
      </Box>
      <Heading
        size="sm"
        textTransform="capitalize"
        _light={{ color: 'light.900' }}
        _dark={{ color: 'light.300' }}
        fontWeight="semibold"
        testID="label-description"
      >
        {weather.description}
      </Heading>
    </VStack>
  );
}

export const CardCurrentWeather = memo(
  CardCurrentWeatherComponent,
  (prevProps, nextProps) => {
    return (
      prevProps.city === nextProps.city &&
      Object.is(prevProps.weather, nextProps.weather) &&
      Object.is(prevProps.main, nextProps.main)
    );
  }
);
