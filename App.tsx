//** React and React Native Imports */
import { useEffect } from 'react';
import { StatusBar } from 'react-native';

//** Expo Imports */
import * as ScreenOrientation from 'expo-screen-orientation';
import {
  useFonts,
  Poppins_200ExtraLight,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold
} from '@expo-google-fonts/poppins';

//** Third Party Imports*/
import { Provider } from 'react-redux';
import { NativeBaseProvider, useColorMode } from 'native-base';

//** Components Imports */
import { Loading } from '@components/Loading';
import { Home } from '@screens/Home';

//** Theme Imports */
import { THEME } from '@theme/index';

//** Store Imports */
import { setupStore } from '@store/index';

const nativeBaseConfig = {
  dependencies: {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    'linear-gradient': require('expo-linear-gradient').LinearGradient
  }
};

export default function App() {
  //** Loading external fonts */
  const [fontsLoaded] = useFonts({
    Poppins_200ExtraLight,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold
  });
  const { colorMode } = useColorMode();

  useEffect(() => {
    //** Using Screen Orientation API to lock screen orientation in portrait mode */
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Provider store={setupStore()}>
      <NativeBaseProvider theme={THEME} config={nativeBaseConfig}>
        <StatusBar
          barStyle={colorMode === 'light' ? 'dark-content' : 'light-content'}
          backgroundColor="transparent"
          translucent
        />
        {fontsLoaded ? <Home /> : <Loading />}
      </NativeBaseProvider>
    </Provider>
  );
}
