import { extendTheme } from 'native-base'

export const THEME = extendTheme({
  fonts: {
    heading: 'Roboto_700Bold',
    body: 'Roboto_400Regular'
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
    33: 148
  }
})
