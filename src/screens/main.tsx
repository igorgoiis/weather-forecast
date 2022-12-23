import { VStack, Image  } from 'native-base';
import BackgroundImage from '@assets/background-image-light.png';
import { CardCurrentWeather } from '@components/CardCurrentWeather';

export function Main() {
  return (
    <VStack
      flex={1}
      bg={{
        linearGradient: {
          colors: ['lightBlue.50', 'lightBlue.500'],
          start: [0, 0],
          end: [1, 1]
        }
      }}
      pt={10}
    >
      <CardCurrentWeather />
      <Image source={BackgroundImage} alt="Nuvens" resizeMode='contain' position="absolute" bottom={0} />
    </VStack>
  );
}