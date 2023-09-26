import { Fragment } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components';

import { theme } from './src/infrastructure/theme';

import { Text } from 'react-native-paper';
import { View } from 'react-native';
import { EntryNavigation } from './src/navigation';

export default function App() {
  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <EntryNavigation />
      </ThemeProvider>
      <StatusBar style='auto' />
    </Fragment>
  );
}
