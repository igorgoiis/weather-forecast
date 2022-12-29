//** React and React Native Imports */
import { useEffect, useRef, useState } from 'react';

//** Expo Imports */
import * as Location from 'expo-location';
import { Feather } from '@expo/vector-icons';

//** Third Party Imports*/
import NetInfo from '@react-native-community/netinfo';
import {
  VStack,
  useColorMode,
  AlertDialog,
  Button,
  StatusBar,
  Icon,
  Image
} from 'native-base';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';

//** Component Imports */
import { CardCurrentWeather } from '@components/CardCurrentWeather';
import { CardCurrentWeatherHorizontal } from '@components/CardCurrentWeatherHorizontal';
import { CurrentWeatherDetails } from '@components/CurrentWeatherDetails';
import { DailyWeatherForecast } from '@components/DailyWeatherForecast';
import { Loading } from '@components/Loading';

//** Store Imports */
import { fetchWeather } from '@store/features/weather/thunks/fetchWeather';
import { useAppDispatch } from '@store/hooks/useAppDispatch';
import { useAppSelector } from '@store/hooks/useAppSelector';
import { changeLocationUpdateAt } from '@store/features/app/appSlice';

//** Util Imports */
import { formatDateForecast } from '@utils/dateTime';

//** Assets Imports */
import backgroundDark from '@assets/background-image-dark.png';
import backgroundLight from '@assets/background-image-light.png';
import { add, compareAsc } from 'date-fns';

export function Home() {
  //** States */
  const [noConnection, setNoConnection] = useState(false);
  const [locationDenied, setLocationDenied] = useState(false);
  const [localizationGranted, setLocalizationGranted] = useState(false);

  //** Refs */
  const cancelRef = useRef(null);

  //** Hooks */
  const dispatch = useAppDispatch();
  const { loading, locationUpdatedAt } = useAppSelector((state) => state.app);
  const { weather } = useAppSelector((state) => state.weather);
  const { forecast } = useAppSelector((state) => state.forecast);
  const { colorMode, setColorMode } = useColorMode();

  //** Animation Scroll Begin */
  const scrollY = useSharedValue(0);
  const scrollHandle = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });
  const headerStyleAnimated = useAnimatedStyle(() => {
    return {
      height: interpolate(scrollY.value, [0, 200], [200, 44], Extrapolate.CLAMP)
    };
  });
  const hiddenWeatherAnimated = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [0, 150], [1, 0], Extrapolate.CLAMP)
    };
  });
  const showWeatherAnimated = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [0, 200], [0, 1], Extrapolate.CLAMP)
    };
  });
  //** Animation Scroll End */

  const forecastCity = formatDateForecast(forecast.list);

  async function getPermissionLocation() {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status === 'granted') {
      setLocalizationGranted(true);
      setLocationDenied(false);
    } else if (status === 'denied') {
      setLocalizationGranted(false);
      setLocationDenied(true);
    }
  }

  async function getCurrentPosition() {
    const { coords, timestamp } = await Location.getCurrentPositionAsync();
    dispatch(changeLocationUpdateAt(new Date(timestamp)));
    dispatch(fetchWeather({ lat: coords.latitude, lon: coords.longitude }));
  }

  async function getLocation() {
    if (locationUpdatedAt) {
      const timeToUpdate = add(locationUpdatedAt, { minutes: 30 });

      if (compareAsc(new Date(), timeToUpdate) === -1) {
        const location = await Location.getLastKnownPositionAsync();
        if (location) {
          dispatch(
            fetchWeather({
              lat: location.coords.latitude,
              lon: location.coords.longitude
            })
          );
          return;
        }
      } else {
        getCurrentPosition();
      }
    } else {
      getCurrentPosition();
    }
  }

  async function getCurrentLocationAndWeatherForecast() {
    if (localizationGranted) {
      getLocation();
    } else {
      getPermissionLocation();
    }
  }

  useEffect(() => {
    getCurrentLocationAndWeatherForecast();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getCurrentLocationAndWeatherForecast();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localizationGranted]);

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour < 5 || currentHour >= 18) {
      setColorMode('dark');
    } else {
      setColorMode('light');
    }
  }, [setColorMode]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      state.isConnected ? setNoConnection(false) : setNoConnection(true);
    });

    return () => unsubscribe();
  }, []);

  if (loading && !locationDenied) {
    return <Loading />;
  }

  if (locationDenied) {
    return (
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={locationDenied}
        bg={{
          linearGradient: {
            colors:
              colorMode === 'dark'
                ? ['darkBlue.600', 'darkBlue.800']
                : ['lightBlue.50', 'lightBlue.300'],
            start: [0, 1, 0],
            end: [1, 1, 1]
          }
        }}
      >
        <AlertDialog.Content>
          <AlertDialog.Header>Precisamos da sua localização</AlertDialog.Header>
          <AlertDialog.Body>
            Para este aplicativo funcionar precisamos da sua localização e para
            isso é necessário que você autorize o acesso.
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                colorScheme="lightBlue"
                onPress={getCurrentLocationAndWeatherForecast}
              >
                Solicitar novamente
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    );
  }

  if (noConnection) {
    return (
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={noConnection}
        bg={{
          linearGradient: {
            colors:
              colorMode === 'dark'
                ? ['darkBlue.600', 'darkBlue.800']
                : ['lightBlue.50', 'lightBlue.300'],
            start: [0, 1, 0],
            end: [1, 1, 1]
          }
        }}
      >
        <AlertDialog.Content>
          <AlertDialog.Header>Sem conexão</AlertDialog.Header>
          <AlertDialog.Body>
            Este aplicativo nescessita de conexão com a internet para funcionar,
            por favor conecte-se com a internet e tente novamente
          </AlertDialog.Body>
        </AlertDialog.Content>
      </AlertDialog>
    );
  }

  return (
    <VStack
      flex={1}
      bg={{
        linearGradient: {
          colors:
            colorMode === 'dark'
              ? ['darkBlue.600', 'darkBlue.800']
              : ['lightBlue.50', 'lightBlue.300'],
          start: [0, 1, 0],
          end: [1, 1, 1]
        }
      }}
      pt={0}
      safeArea
    >
      <StatusBar
        barStyle={colorMode === 'light' ? 'dark-content' : 'light-content'}
        backgroundColor="transparent"
        translucent
      />
      <Animated.View style={[{ overflow: 'hidden' }, headerStyleAnimated]}>
        <Animated.View style={[showWeatherAnimated]}>
          <CardCurrentWeatherHorizontal
            city={weather.name}
            main={weather.main}
            weather={weather.weather[0]}
          />
        </Animated.View>
        <Animated.View style={[hiddenWeatherAnimated]}>
          <CardCurrentWeather
            city={weather.name}
            main={weather.main}
            weather={weather.weather[0]}
          />
        </Animated.View>
      </Animated.View>
      <Animated.ScrollView
        style={{ flex: 1, zIndex: 2, width: '100%' }}
        contentContainerStyle={{ paddingBottom: 30, paddingTop: 20 }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandle}
        scrollEventThrottle={16}
      >
        <VStack
          space={12}
          justifyContent="center"
          alignItems="center"
          zIndex={2}
          flex={1}
        >
          <CurrentWeatherDetails
            main={weather.main}
            wind={weather.wind}
            city={forecast.city}
          />
          {forecastCity.map((city) => (
            <DailyWeatherForecast
              key={city.day}
              day={city.day}
              weathers={city.weathers}
            />
          ))}
        </VStack>
      </Animated.ScrollView>

      <Button
        w="12"
        h="12"
        position="absolute"
        right="5"
        bottom="10"
        rounded="30"
        zIndex="3"
        shadow="4"
        bgColor="darkBlue.600"
        onPress={getCurrentLocationAndWeatherForecast}
      >
        <Icon color="white" as={Feather} name="refresh-cw" size="lg" />
      </Button>

      <Image
        source={colorMode === 'light' ? backgroundLight : backgroundDark}
        alt="cloud background"
        resizeMode="contain"
        position="absolute"
        bottom="0"
      />
    </VStack>
  );
}
