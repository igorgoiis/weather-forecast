import React from 'react';
import { render } from '@testing-library/react-native';

import { CardCurrentWeather } from '@components/CardCurrentWeather';
import { ProviderWrapper } from '@utils/providerTest';

describe('CardCurrentWeatherHorizontal Component', () => {
  it('should be label with city name', () => {
    const { getByTestId } = render(
      <CardCurrentWeather
        city="Maceió"
        main={{ temp: 30 }}
        weather={{ id: 0, description: 'Nublado', icon: 'd1', main: '' }}
      />,
      {
        wrapper: ProviderWrapper
      }
    );

    const textCityName = getByTestId('city-name');

    expect(textCityName.props.children).toEqual('Maceió');
  });

  it('should be label with current weather', () => {
    const { getByTestId } = render(
      <CardCurrentWeather
        city="Maceió"
        main={{ temp: 30 }}
        weather={{ id: 0, description: 'Nublado', icon: 'd1', main: '' }}
      />,
      {
        wrapper: ProviderWrapper
      }
    );

    const textTemp = getByTestId('label-temp');
    expect(textTemp.props.children).toEqual('30°');
  });

  it('should be label with description weather', () => {
    const { getByTestId } = render(
      <CardCurrentWeather
        city="Maceió"
        main={{ temp: 30 }}
        weather={{ id: 0, description: 'Nublado', icon: 'd1', main: '' }}
      />,
      {
        wrapper: ProviderWrapper
      }
    );

    const description = getByTestId('label-description');
    expect(description.props.children).toEqual('Nublado');
  });
});
