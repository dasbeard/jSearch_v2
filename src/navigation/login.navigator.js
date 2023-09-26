import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AccountEntry } from '../screens/account/account-entry.screen';
import { Register } from '../screens/account/register.component';
import { Login } from '../screens/account/login.component';

const Stack = createNativeStackNavigator();

export const LoginNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='EntryHome' component={AccountEntry} />
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Register' component={Register} />
    </Stack.Navigator>
  );
};
