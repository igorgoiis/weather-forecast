//** React and React Native Imports */
import { memo } from 'react';
import { useWindowDimensions } from 'react-native';

//** Third Party Imports */
import { format } from 'date-fns';
import { Center, Heading, Image } from 'native-base';

export interface IWeatherForecastByTimeOfDayProps {
  temp: number;
  description: string;
  icon: string;
  dt: Date;
}

function WeatherForecastByTimeOfDayComponent({
  description,
  dt,
  icon,
  temp
}: IWeatherForecastByTimeOfDayProps) {
  const { width } = useWindowDimensions();
  const dtformated = format(dt, 'HH');

  return (
    <Center w={width * 0.8 - 16} h={width / 1.9} mx={2} mb={2}>
      <Center
        _light={{ bgColor: 'blueGray.200' }}
        _dark={{ bgColor: 'darkBlue.900' }}
        shadow="2"
        width="full"
        h="full"
        rounded={8}
        my="2"
      >
        <Center>
          <Heading
            fontSize="lg"
            fontWeight="bold"
            _light={{ color: 'darkBlue.800' }}
            _dark={{ color: 'light.300' }}
            testID="hour"
          >
            {`${dtformated}H`}
          </Heading>
        </Center>
        <Center>
          <Center flexDir="row">
            <Image
              source={{
                uri: `http://openweathermap.org/img/wn/${icon}@2x.png`
              }}
              alt="Ícone do tempo"
              size="lg"
              testID="image-weather"
            />
            <Heading
              fontSize="4xl"
              fontWeight="normal"
              mt={2}
              _light={{ color: 'darkBlue.800' }}
              _dark={{ color: 'light.300' }}
              testID="weather-temp"
            >
              {`${temp}°`}
            </Heading>
          </Center>
          <Heading
            fontSize="md"
            fontWeight="bold"
            textTransform="capitalize"
            _light={{ color: 'darkBlue.800' }}
            _dark={{ color: 'light.300' }}
            testID="description"
          >
            {description}
          </Heading>
        </Center>
      </Center>
    </Center>
  );
}

export const WeatherForecastByTimeOfDay = memo(
  WeatherForecastByTimeOfDayComponent,
  (prevProps, nextProps) => {
    return (
      prevProps.description === nextProps.description &&
      prevProps.dt === nextProps.dt &&
      prevProps.icon === nextProps.icon &&
      prevProps.temp === nextProps.temp
    );
  }
);
