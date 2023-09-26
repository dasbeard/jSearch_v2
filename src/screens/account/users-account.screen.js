import { useContext } from 'react';
import { Text, View, Button } from 'react-native';
import { AuthContext } from '../../services/authentication/authentication.context';

export const UserAccount = () => {
  const { logoutUser } = useContext(AuthContext);

  return (
    <View>
      <Text>User Account</Text>

      <Button title='Logout' onPress={() => logoutUser()} mode='contained'>
        Logout
      </Button>
    </View>
  );
};
