import { useContext } from 'react';
import { ImageBackground } from 'react-native';
import { Avatar } from 'react-native-paper';

import { Text } from '../../infrastructure/components/text.component';
import { Spacer } from '../../infrastructure/components/spacer.component';

import { AuthContext } from '../../services/authentication/authentication.context';

import { colors } from '../../infrastructure/theme/colors';
import { Container, LogoutButton } from './users-account.styles';

import BG from '../../../assets/bg-image.jpg';

export const UserAccount = () => {
  const { logoutUser, user } = useContext(AuthContext);

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
        <Avatar.Icon
          icon='account'
          size={175}
          backgroundColor={colors.ui.primary}
        />

        <Spacer size='xxl' />

        <Text>Signed in as: {user.email}</Text>

        <Spacer size='xl' />
        <LogoutButton
          buttonColor={colors.ui.secondary}
          mode='contained'
          onPress={() => logoutUser()}
        >
          Logout
        </LogoutButton>
      </Container>
    </ImageBackground>
  );
};
