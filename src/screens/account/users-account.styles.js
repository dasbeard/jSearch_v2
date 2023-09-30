import styled from 'styled-components/native';
import { Button } from 'react-native-paper';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 15%;
  width: 100%;
`;

export const LogoutButton = styled(Button)`
  width: 80%;
  height: 50px;
  text-align: center;
  justify-content: center;
`;
