import { colors } from '../../infrastructure/theme/colors';
import { SafeContainer } from '../../infrastructure/components/safe-area.component';
import { Spacer } from '../../infrastructure/components/spacer.component';

import { Container, AccountButton } from './account-entry.styles';

export const AccountEntry = ({ navigation }) => {
  return (
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
  );
};
