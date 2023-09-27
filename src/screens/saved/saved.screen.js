import { Text } from '../../infrastructure/components/text.component';

import { Container } from './saved.styles';
import { Spacer } from '../../infrastructure/components/spacer.component';

export const SavedScreen = () => {
  return (
    <Container>
      <Text variant='label'>Saved Screen</Text>
      <Spacer size='md' />
      <Text variant='caption'>NOT SETUP YET</Text>
    </Container>
  );
};
