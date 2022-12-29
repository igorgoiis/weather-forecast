import { ReactNode } from 'react';
import { THEME } from '@theme/index';
import { NativeBaseProvider } from 'native-base';
import { setupStore } from '@store/index';
import { Provider } from 'react-redux';

interface IProvider {
  children: ReactNode;
}

const nativeBaseConfig = {
  dependencies: {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    'linear-gradient': require('expo-linear-gradient').LinearGradient
  }
};

const inset = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 }
};

export const ProviderWrapper = ({ children }: IProvider) => (
  <Provider store={setupStore()}>
    <NativeBaseProvider
      initialWindowMetrics={inset}
      theme={THEME}
      config={nativeBaseConfig}
    >
      {children}
    </NativeBaseProvider>
  </Provider>
);
