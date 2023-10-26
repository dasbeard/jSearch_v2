import { useContext, Fragment, useState } from 'react';
import { ActivityIndicator, Avatar, Button, Portal } from 'react-native-paper';

import { Text } from '../../infrastructure/components/text.component';
import { Spacer } from '../../infrastructure/components/spacer.component';

import { AuthContext } from '../../services/authentication/authentication.context';

import { colors } from '../../infrastructure/theme/colors';
import { Container, LogoutButton } from './users-account.styles';
import { DeleteAccountPortal } from '../../components/alert/alert.component';

export const UserAccount = () => {
  const { logoutUser, user, isLoading, dialogVisible, setDialogVisible } =
    useContext(AuthContext);

  const [showIndicator] = useState(false);

  return (
    <Fragment>
      <Container>
        {showIndicator ? (
          <Fragment>
            <Text variant='header'>
              One moment while we delete all your data
            </Text>
            <Spacer size='xxl' />
            <ActivityIndicator
              animating={true}
              color={colors.ui.quaternary}
              size={175}
            />
          </Fragment>
        ) : (
          <Fragment>
            <Avatar.Icon
              icon='account'
              size={175}
              backgroundColor={colors.ui.primary}
            />

            <Spacer size='xxl' />

            <Text>Signed in as: {user.email}</Text>

            <Spacer size='xl' />

            <LogoutButton
              disabled={isLoading}
              buttonColor={isLoading ? colors.ui.disabled : colors.ui.secondary}
              mode='contained'
              onPress={() => logoutUser()}
            >
              Logout
            </LogoutButton>

            <Spacer size='xxl' />

            <LogoutButton
              disabled={isLoading}
              buttonColor={isLoading ? colors.ui.disabled : colors.ui.error}
              mode='contained'
              onPress={() => setDialogVisible(true)}
            >
              Delete Account
            </LogoutButton>
          </Fragment>
        )}
      </Container>

      {dialogVisible && (
        <Portal.Host>
          <DeleteAccountPortal />
        </Portal.Host>
      )}
    </Fragment>
  );
};
