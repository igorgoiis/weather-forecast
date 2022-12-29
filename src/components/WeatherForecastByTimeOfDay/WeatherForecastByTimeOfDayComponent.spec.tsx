import React from 'react';
import { render } from '@testing-library/react-native';

import { WeatherForecastByTimeOfDay } from '@components/WeatherForecastByTimeOfDay';
import { ProviderWrapper } from '@utils/providerTest';
import { format } from 'date-fns';

describe('WeatherForecastByTimeOfDayComponent Component', () => {
  it('should be label with the weather forecast hour', () => {
    const { getByTestId } = render(
      <WeatherForecastByTimeOfDay
        description="Nublado"
        dt={new Date()}
        icon="1d0"
        temp={29}
      />,
      {
        wrapper: ProviderWrapper
      }
    );

    const hour = getByTestId('hour');

    expect(hour.props.children).toEqual(`${format(new Date(), 'HH')}H`);
  });

  it('should be source image correctly', () => {
    const { getByTestId } = render(
      <WeatherForecastByTimeOfDay
        description="Nublado"
        dt={new Date()}
        icon="1d0"
        temp={29}
      />,
      {
        wrapper: ProviderWrapper
      }
    );

    const image = getByTestId('image-weather');
    expect(image.props.source).toEqual({
      uri: 'http://openweathermap.org/img/wn/1d0@2x.png'
    });
  });

  it('should be label with weather temp', () => {
    const { getByTestId } = render(
      <WeatherForecastByTimeOfDay
        description="Nublado"
        dt={new Date()}
        icon="1d0"
        temp={29}
      />,
      {
        wrapper: ProviderWrapper
      }
    );

    const weatherTemp = getByTestId('weather-temp');
    expect(weatherTemp.props.children).toEqual('29°');
  });

  it('should be label with weather description', () => {
    const { getByTestId } = render(
      <WeatherForecastByTimeOfDay
        description="Nublado"
        dt={new Date()}
        icon="1d0"
        temp={29}
      />,
      {
        wrapper: ProviderWrapper
      }
    );

    const description = getByTestId('description');
    expect(description.props.children).toEqual('Nublado');
  });
});
