import { useState, useContext, useEffect } from 'react';
import { Button } from 'react-native-paper';

import { colors } from '../../infrastructure/theme/colors';
import { Spacer } from '../../infrastructure/components/spacer.component';

import { Container, AccountInput, AccountButton } from './account-entry.styles';
import { AuthContext } from '../../services/authentication/authentication.context';
import { Text } from '../../infrastructure/components/text.component';

import { ImageBackground } from 'react-native';

import BG from '../../../assets/bg-image.jpg';

export const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loginWithEmail, error, setError } = useContext(AuthContext);

  useEffect(() => {
    if (error !== null) {
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  });

  return (
    <ImageBackground
      source={BG}
      style={{
        resizeMode: 'code',
        overflow: 'hidden',
        flex: 1,
      }}
    >
      <Container>
        <AccountInput
          placeholder='Email'
          value={email}
          autoCapitalize='none'
          keyboardType='email-address'
          textContentType='emailAddress'
          onChangeText={(e) => setEmail(e)}
        />

        <Spacer size='md' />

        <AccountInput
          placeholder='Password'
          value={password}
          autoCapitalize='none'
          secureTextEntry
          textContentType='password'
          onChangeText={(p) => setPassword(p)}
        />

        <Spacer size='lg' />

        {error && (
          <Spacer size='md' position='bottom'>
            <Text variant='error'>{error}</Text>
          </Spacer>
        )}

        <AccountButton
          mode='contained'
          icon='lock-open-outline'
          buttonColor={colors.ui.primary}
          onPress={() => loginWithEmail(email, password)}
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
    </ImageBackground>
  );
};
