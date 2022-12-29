import { extendTheme } from 'native-base';

export const THEME = extendTheme({
  fonts: {
    heading: 'Poppins_700Bold',
    body: 'Poppins_400Regular'
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20
  },
  sizes: {
    14: 56,
    33: 148,
    42: 168,
    44: 176
  }
});
