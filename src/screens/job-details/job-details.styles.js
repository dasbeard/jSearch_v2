import styled from 'styled-components/native';
import { colors } from '../../infrastructure/theme/colors';

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
