import { NavigationContainer } from '@react-navigation/native';
import { LoginNavigator } from './login.navigator';
import { AppNavigator } from './app.navigator';

export const EntryNavigation = () => {
  const isAuthenticated = false;

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigator /> : <LoginNavigator />}
    </NavigationContainer>
  );
};
