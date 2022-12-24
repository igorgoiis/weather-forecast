import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { NativeBaseProvider } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { Loading } from '@components/Loading';
import { Main } from '@screens/main';
import { store } from '@store/index';
import { THEME } from '@theme/index';

const nativeBaseConfig = {
  dependencies: {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    'linear-gradient': require('expo-linear-gradient').LinearGradient,
  },
};

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });
  return (
    <Provider store={store}>
      <NativeBaseProvider theme={THEME} config={nativeBaseConfig}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />
        {fontsLoaded ? <Main /> : <Loading />}
      </NativeBaseProvider>
    </Provider>
  );
}