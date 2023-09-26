import { Text, View } from 'react-native';
import { ImageBackground } from 'react-native';

import BG from '../../../assets/bg-image.jpg';
export const HomeScreen = () => {
  return (
    <ImageBackground
      source={BG}
      style={{
        resizeMode: 'cover',
        overflow: 'hidden',
        flex: 1,
      }}
    >
      <View>
        <Text>Home Screen</Text>
      </View>
    </ImageBackground>
  );
};
