import styled from 'styled-components/native';
import { Button, TextInput } from 'react-native-paper';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const AccountButton = styled(Button)`
  width: 80%;
  height: 50px;
  text-align: center;
  justify-content: center;
`;

export const AccountInput = styled(TextInput)`
  width: 80%;
`;
