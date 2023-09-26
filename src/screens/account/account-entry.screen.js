import { colors } from '../../infrastructure/theme/colors';
import { SafeContainer } from '../../infrastructure/components/safe-area.component';
import { Spacer } from '../../infrastructure/components/spacer.component';

import { Container, AccountButton } from './account-entry.styles';
import { ImageBackground } from 'react-native';

import BG from '../../../assets/bg-image.jpg';

export const AccountEntry = ({ navigation }) => {
  return (
    <ImageBackground
      source={BG}
      style={{
        resizeMode: 'code',
        overflow: 'hidden',
        flex: 1,
      }}
    >
      <SafeContainer>
        <Container>
          <AccountButton
            textColor={colors.text.inverse}
            buttonColor={colors.ui.primary}
            icon='lock-open-outline'
            mode='contained'
            onPress={() => navigation.navigate('Login')}
          >
            Login
          </AccountButton>

          <Spacer size='xl' />

          <AccountButton
            textColor={colors.text.inverse}
            buttonColor={colors.ui.secondary}
            icon='email'
            mode='contained'
            onPress={() => navigation.navigate('Register')}
          >
            Register
          </AccountButton>
        </Container>
      </SafeContainer>
    </ImageBackground>
  );
};
