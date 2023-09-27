import { useContext, useEffect } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import * as SplashScreen from 'expo-splash-screen';

import { LoginNavigator } from './login.navigator';
import { AppNavigator } from './app.navigator';

import { AuthContext } from '../services/authentication/authentication.context';

import { ImageBackground } from 'react-native';

import BG from '../../assets/header2.jpg';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

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
    <NavigationContainer theme={MyTheme}>
      {isAuthenticated ? <AppNavigator /> : <LoginNavigator />}
    </NavigationContainer>
  );
};

// <ImageBackground
//   source={BG}
//   style={{
//     overflow: 'hidden',
//     flex: 1,
//   }}
// >
// </ImageBackground>
