//** React and React Native */
import { memo } from 'react';

//** React and React Native Imports */
import { useWindowDimensions } from 'react-native';

//** Third Paty Imports */
import { Box, Center, FlatList, Heading } from 'native-base';

//** Components Imports */
import {
  IWeatherForecastByTimeOfDayProps,
  WeatherForecastByTimeOfDay
} from '@components/WeatherForecastByTimeOfDay';

export interface IDailyWeatherForecastProps {
  day: string;
  weathers: IWeatherForecastByTimeOfDayProps[];
}

function DailyWeatherForecastComponent({
  day,
  weathers
}: IDailyWeatherForecastProps) {
  //** Hooks */
  const { width } = useWindowDimensions();

  return (
    <Box w="full">
      <Center pt="2" mb="4">
        <Heading
          fontSize="lg"
          color="darkBlue.800"
          _light={{ color: 'light.900' }}
          _dark={{ color: 'light.300' }}
          testID="dia-extenso"
        >
          {day}
        </Heading>
      </Center>
      <FlatList
        horizontal
        data={weathers}
        keyExtractor={(item) => `${item.dt}`}
        showsHorizontalScrollIndicator={false}
        snapToAlignment="start"
        scrollEventThrottle={16}
        decelerationRate="fast"
        snapToOffsets={[...Array(weathers.length)].map(
          (x, i) => i * (width * 0.8 - 32) + (i - 1) * 32
        )}
        testID="daily-weather-forecast"
        renderItem={({ item, index }) => (
          <WeatherForecastByTimeOfDay
            key={index}
            description={item.description}
            dt={item.dt}
            icon={item.icon}
            temp={item.temp}
          />
        )}
      />
    </Box>
  );
}

export const DailyWeatherForecast = memo(
  DailyWeatherForecastComponent,
  (prevProps, nextProps) => {
    return (
      Object.is(prevProps.weathers, nextProps.weathers) &&
      prevProps.day === nextProps.day
    );
  }
);
