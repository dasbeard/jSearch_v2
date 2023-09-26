import { Fragment } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components';

import { theme } from './src/infrastructure/theme';

import { EntryNavigation } from './src/navigation';

import { AuthenticationContext } from './src/services/authentication/authentication.context';

export default function App() {
  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <AuthenticationContext>
          <EntryNavigation />
        </AuthenticationContext>
      </ThemeProvider>
      <StatusBar style='auto' />
    </Fragment>
  );
}
