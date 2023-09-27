import { useContext } from 'react';
import { Avatar } from 'react-native-paper';

import { Text } from '../../infrastructure/components/text.component';
import { Spacer } from '../../infrastructure/components/spacer.component';

import { AuthContext } from '../../services/authentication/authentication.context';

import { colors } from '../../infrastructure/theme/colors';
import { Container, LogoutButton } from './users-account.styles';

export const UserAccount = () => {
  const { logoutUser, user } = useContext(AuthContext);

  return (
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
  );
};
