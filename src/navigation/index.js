import { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import * as SplashScreen from 'expo-splash-screen';

import { LoginNavigator } from './login.navigator';
import { AppNavigator } from './app.navigator';

import { AuthContext } from '../services/authentication/authentication.context';

import { View, Text } from 'react-native';

export const EntryNavigation = () => {
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated !== null) {
      setTimeout(() => {
        SplashScreen.hideAsync();
      }, 150);
    }
  }, [isAuthenticated]);

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigator /> : <LoginNavigator />}
    </NavigationContainer>
  );
};
