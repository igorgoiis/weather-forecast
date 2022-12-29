import React from 'react';
import { render } from '@testing-library/react-native';
import { CurrentWeatherDetails } from '.';
import { ProviderWrapper } from '@utils/providerTest';

describe('CurrentWeatherDetails Component', () => {
  it('should be label with feels like', () => {
    const { getByTestId } = render(
      <CurrentWeatherDetails
        main={{ feels_like: 20, humidity: 70, pressure: 1010 }}
        wind={{ speed: 20, deg: 0 }}
        city={{ sunrise: 16126166, sunset: 16161616 }}
      />,
      {
        wrapper: ProviderWrapper
      }
    );

    const feelsLike = getByTestId('feels-like');

    expect(feelsLike.props.children).toEqual('20°');
  });

  it('should be label with humidity', () => {
    const { getByTestId } = render(
      <CurrentWeatherDetails
        main={{ feels_like: 20, humidity: 70, pressure: 1010 }}
        wind={{ speed: 20, deg: 0 }}
        city={{ sunrise: 16126166, sunset: 16161616 }}
      />,
      {
        wrapper: ProviderWrapper
      }
    );

    const humidity = getByTestId('humidity');
    expect(humidity.props.children).toEqual('70%');
  });

  it('should be label with wind speed', () => {
    const { getByTestId } = render(
      <CurrentWeatherDetails
        main={{ feels_like: 20, humidity: 70, pressure: 1010 }}
        wind={{ speed: 20, deg: 0 }}
        city={{ sunrise: 16126166, sunset: 16161616 }}
      />,
      {
        wrapper: ProviderWrapper
      }
    );

    const windSpeed = getByTestId('wind-speed');
    expect(windSpeed.props.children).toEqual(`${20 * 3.6} km/h`);
  });

  it('should be label with pressure', () => {
    const { getByTestId } = render(
      <CurrentWeatherDetails
        main={{ feels_like: 20, humidity: 70, pressure: 1010 }}
        wind={{ speed: 20, deg: 0 }}
        city={{ sunrise: 16126166, sunset: 16161616 }}
      />,
      {
        wrapper: ProviderWrapper
      }
    );

    const pressure = getByTestId('pressure');
    expect(pressure.props.children).toEqual('1010 hPa');
  });

  it('should be label with sunrise', () => {
    const { getByTestId } = render(
      <CurrentWeatherDetails
        main={{ feels_like: 20, humidity: 70, pressure: 1010 }}
        wind={{ speed: 20, deg: 0 }}
        city={{ sunrise: 16126166, sunset: 16161616 }}
      />,
      {
        wrapper: ProviderWrapper
      }
    );

    const sunrise = getByTestId('sunrise');
    expect(sunrise.props.children).toEqual('12:29');
  });

  it('should be label with sunset', () => {
    const { getByTestId } = render(
      <CurrentWeatherDetails
        main={{ feels_like: 20, humidity: 70, pressure: 1010 }}
        wind={{ speed: 20, deg: 0 }}
        city={{ sunrise: 16126166, sunset: 16161616 }}
      />,
      {
        wrapper: ProviderWrapper
      }
    );

    const sunset = getByTestId('sunset');
    expect(sunset.props.children).toEqual('22:20');
  });
});
