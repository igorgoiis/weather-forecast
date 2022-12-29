//** React and React Native Imports */
import { memo } from 'react';
//** Third Party Imports */
import {
  Image,
  HStack,
  Center,
  Heading,
  useColorMode,
  useTheme
} from 'native-base';

//** Expo Imports */
import { MaterialCommunityIcons } from '@expo/vector-icons';

//** Types Imports */
import { IWeatherMain } from '@interfaces/weatherMain';
import { IWeatherCondition } from '@interfaces/weatherCondition';

interface ICardCurrentWeatherHorizontalProps {
  city: string;
  weather: IWeatherCondition;
  main: IWeatherMain;
}

function CardCurrentWeatherHorizontalComponent({
  city,
  weather = { id: 0, description: '', icon: '', main: '' },
  main
}: ICardCurrentWeatherHorizontalProps) {
  //** Hooks */
  const { colorMode } = useColorMode();
  const { colors } = useTheme();

  return (
    <HStack space={2} justifyContent="space-between" w="100%" px="5" pt="1">
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
            size={'sm'}
            fontWeight={400}
            _light={{ color: 'light.900' }}
            _dark={{ color: 'light.300' }}
            testID="city-name"
          >
            {city}
          </Heading>
        </HStack>
      </Center>
      <Center flexDir="row">
        <Image
          source={{
            uri: `http://openweathermap.org/img/wn/${weather.icon}@2x.png`
          }}
          alt="Ícone do tempo"
          size="xs"
          testID="image-weather"
        />
        <Heading
          size="md"
          _light={{ color: 'light.900' }}
          _dark={{ color: 'light.300' }}
          fontWeight="light"
          testID="label-temp"
        >
          {main.temp ? `${Math.round(main.temp)}°` : ''}
        </Heading>
      </Center>
    </HStack>
  );
}

export const CardCurrentWeatherHorizontal = memo(
  CardCurrentWeatherHorizontalComponent,
  (prevProps, nextProps) => {
    return (
      prevProps.city === nextProps.city &&
      Object.is(prevProps.weather, nextProps.weather) &&
      Object.is(prevProps.main, nextProps.main)
    );
  }
);
