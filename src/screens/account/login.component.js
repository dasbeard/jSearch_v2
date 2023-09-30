import { useState, useContext, useEffect, Fragment } from 'react';
import { ActivityIndicator, Button } from 'react-native-paper';

import { colors } from '../../infrastructure/theme/colors';
import { Spacer } from '../../infrastructure/components/spacer.component';

import {
  Container,
  AccountInput,
  AccountButton,
  InputsContainer,
  ButtonContainer,
} from './account-entry.styles';
import { AuthContext } from '../../services/authentication/authentication.context';
import { Text } from '../../infrastructure/components/text.component';

import { ImageBackground } from 'react-native';

import BG from '../../../assets/bg-image.jpg';

export const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loginWithEmail, error, setError, isLoading } =
    useContext(AuthContext);

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
        resizeMode: 'cover',
        overflow: 'hidden',
        flex: 1,
      }}
    >
      <Container>
        <InputsContainer>
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

          {error && (
            <Spacer size='md' position='bottom'>
              <Text variant='error'>{error}</Text>
            </Spacer>
          )}
        </InputsContainer>

        <Spacer size='lg' />

        {isLoading ? (
          <Fragment>
            <Spacer size='xxl' />
            <ActivityIndicator
              animating={true}
              color={colors.ui.quaternary}
              size='68'
            />
          </Fragment>
        ) : (
          <Fragment>
            <ButtonContainer>
              <AccountButton
                disabled={isLoading}
                mode='contained'
                icon='lock-open-outline'
                buttonColor={isLoading ? colors.ui.disabled : colors.ui.primary}
                onPress={() => loginWithEmail(email, password)}
              >
                Login
              </AccountButton>

              <Spacer size='xl' />

              <Spacer size='xxl' />
              <Button
                disabled={isLoading}
                mode='contained'
                icon='arrow-left'
                onPress={() => navigation.goBack()}
                buttonColor={isLoading ? colors.ui.disabled : colors.ui.muted}
              >
                Go Back
              </Button>
            </ButtonContainer>
          </Fragment>
        )}
      </Container>
    </ImageBackground>
  );
};
