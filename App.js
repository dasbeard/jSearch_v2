import { Fragment } from 'react';
import { StatusBar } from 'expo-status-bar';

import { theme } from './src/infrastructure/theme';

export default function App() {
  return (
    <Fragment>
      <StatusBar style='auto' />
    </Fragment>
  );
}
