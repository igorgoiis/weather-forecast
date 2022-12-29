/* eslint-disable no-empty-pattern */
import { Spinner, ISpinnerProps, Center, useColorMode } from 'native-base';

export function Loading({ ...rest }: ISpinnerProps) {
  const { colorMode } = useColorMode();

  return (
    <Center
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
    >
      <Spinner
        size="lg"
        color={colorMode === 'light' ? 'darkBlue.700' : 'darkBlue.200'}
        {...rest}
      />
    </Center>
  );
}
