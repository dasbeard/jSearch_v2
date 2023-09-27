import { Fragment } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components';

import { theme } from './src/infrastructure/theme';

import { EntryNavigation } from './src/navigation';

import { AuthenticationContext } from './src/services/authentication/authentication.context';
import { ImageBackground } from 'react-native';

import BG from './assets/bg-image.jpg';

export default function App() {
  return (
    <Fragment>
      <ImageBackground
        source={BG}
        style={{
          overflow: 'hidden',
          flex: 1,
        }}
      >
        <ThemeProvider theme={theme}>
          <AuthenticationContext>
            <EntryNavigation />
          </AuthenticationContext>
        </ThemeProvider>
        <StatusBar style='auto' />
      </ImageBackground>
    </Fragment>
  );
}
