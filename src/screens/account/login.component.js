import { useState } from 'react';
import { Button, TextInput } from 'react-native-paper';

import { colors } from '../../infrastructure/theme/colors';
import { Spacer } from '../../infrastructure/components/spacer.component';

import { Container, AccountInput, AccountButton } from './account-entry.styles';

export const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Container>
      <AccountInput
        placeholder='Email'
        value={email}
        autoCapitalize='none'
        keyboardType='email-address'
        textContentType='emailAddress'
        onChange={(e) => setEmail(e)}
      />

      <Spacer size='md' />

      <AccountInput
        placeholder='Password'
        value={password}
        autoCapitalize='none'
        secureTextEntry
        textContentType='password'
        onChange={(p) => setPassword(p)}
      />

      <Spacer size='lg' />

      <AccountButton
        mode='contained'
        icon='lock-open-outline'
        onPress={() => alert('Log In')}
        buttonColor={colors.ui.primary}
      >
        Login
      </AccountButton>

      <Spacer size='xl' />

      <Spacer size='xxl'>
        <Button
          mode='contained'
          icon='arrow-left'
          onPress={() => navigation.goBack()}
          buttonColor={colors.ui.muted}
        >
          Go Back
        </Button>
      </Spacer>
    </Container>
  );
};
