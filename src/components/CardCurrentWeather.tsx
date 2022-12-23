import { HStack, Box, Center, Text, Heading, VStack, useTheme } from 'native-base';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import CloudyWeather from '@assets/cloudy.svg';

export function CardCurrentWeather() {
  const { colors } = useTheme();
  return (
    <VStack space={12} justifyContent='center' alignItems='center' bgColor='white' p={8} mx='5' borderRadius={20}>
      <Box alignItems='center'>
        <Center mb={4}>
          <HStack justifyContent="center" alignItems="center">
            <MaterialCommunityIcons name="map-marker-outline" size={18} color="light.900" />
            <Heading size={'sm'} fontWeight={400} color="light.900">Maceió</Heading>
          </HStack>
        </Center>
        <Box flexDirection='row' alignItems='center'>
          <CloudyWeather />
          <Heading size='3xl'>32°</Heading>
        </Box>
        <Heading size='xs'>Parcialmente Nublado</Heading>
      </Box>
      <VStack space={2} width='100%' alignItems='flex-start'>
        <Box flexDirection='row' alignItems='center'>
          <FontAwesome name="thermometer-half" size={18} color={colors.blueGray[500]} />
          <Text color='blueGray.500' ml={1}>Feels Like:</Text>
          <Text ml={3} fontWeight='bold' fontSize={16} color='darkBlue.300'>37°</Text>
        </Box>
        <Box flexDirection='row' alignItems='center'>
          <Ionicons name="md-water-outline" size={18} color={colors.blueGray[500]} style={{ margin: 0, padding: 0, marginLeft: -3 }}/>
          <Text color='blueGray.500'>Humidity:</Text>
          <Text ml={3} fontWeight='bold' fontSize={16} color='darkBlue.300'>62%</Text>
        </Box>
        <Box flexDirection='row' alignItems='center'>
          <MaterialCommunityIcons name="weather-windy" size={18} color={colors.blueGray[500]} />
          <Text color='blueGray.500' ml={1}>Wind:</Text>
          <Text ml={3} fontWeight='bold' fontSize={16} color='darkBlue.300'>20 km/h</Text>
        </Box>
        <Box flexDirection='row' alignItems='center'>
          <Ionicons name="md-speedometer-outline" size={18} color={colors.blueGray[500]} />
          <Text ml={1} color='blueGray.500'>Pressure:</Text>
          <Text ml={3} fontWeight='bold' fontSize={16} color='darkBlue.300'>1012 hPa</Text>
        </Box>
      </VStack>
    </VStack>
  );
}