import styled from 'styled-components/native';
import { colors } from '../../infrastructure/theme/colors';

export const Container = styled.View`
  flex-direction: row;
  margin-top: 6px;
  border-width: 1px;
  border-radius: 8px;
  border-color: ${colors.bg.dark};
  background-color: ${colors.bg.secondary};
`;

export const Logo = styled.Image`
  height: 55px;
  width: 55px;
  object-fit: contain;
  margin: 6px;
  border-radius: 6px;
`;

export const JobContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;

export const JobContent = styled.View`
  justify-content: space-around;
  margin-right: 6px;
`;
