import { View, Text } from 'react-native';
import { SafeContainer } from '../infrastructure/components/safe-area.component';
import { Button } from 'react-native-paper';
import { useContext } from 'react';
import { AuthContext } from '../services/authentication/authentication.context';

export const AppNavigator = () => {
  const { logoutUser } = useContext(AuthContext);

  return (
    <SafeContainer>
      <Text>App Navigator</Text>
      <Button onPress={() => logoutUser()} mode='contained'>
        Logout
      </Button>
    </SafeContainer>
  );
};
