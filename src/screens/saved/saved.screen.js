import { ImageBackground } from 'react-native';
import { Text } from '../../infrastructure/components/text.component';

import BG from '../../../assets/bg-image.jpg';

import { Container } from './saved.styles';
import { Spacer } from '../../infrastructure/components/spacer.component';

export const SavedScreen = () => {
  return (
    <ImageBackground
      source={BG}
      style={{
        resizeMode: 'cover',
        overflow: 'hidden',
        flex: 1,
      }}
    >
      <Container>
        <Text variant='label'>Saved Screen</Text>
        <Spacer size='md' />
        <Text variant='caption'>NOT SETUP YET</Text>
      </Container>
    </ImageBackground>
  );
};
