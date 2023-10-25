import styled from 'styled-components/native';
import { colors } from '../../infrastructure/theme/colors';
import { Button } from 'react-native-paper';

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.bg.secondary};
  /* padding-bottom: 190px; */
`;

export const Logo = styled.Image`
  height: 65px;
  width: 65px;
  object-fit: contain;
  margin: 6px;
  border-radius: 6px;
  align-self: center;
`;

export const ApplyContainer = styled.View`
  position: absolute;
  width: 100%;
  bottom: 31px;
  padding-top: 5px;
  padding-bottom: 5px;
  /* background-color: rgba(34, 34, 34, 0.15); */
  /* background-color: linear-gradient(
    180deg,
    rgba(34, 34, 34, 0.9023984593837535) 0%,
    rgba(165, 165, 165, 0.5606617647058824) 53%,
    rgba(245, 245, 245, 0) 100%
  ); */
`;

export const ApplyButton = styled(Button).attrs({
  mode: 'contained',
})`
  width: 80%;
  align-self: center;

  height: 50px;
  text-align: center;
  justify-content: center;
`;
