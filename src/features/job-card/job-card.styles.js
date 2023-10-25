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
  height: 65px;
  width: 65px;
  object-fit: contain;
  margin: 6px;
  margin-right: 8px;
  border-radius: 6px;
  align-self: center;
`;

export const JobContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 4px;
  padding-bottom: 4px;
`;

export const JobContent = styled.View`
  justify-content: space-around;
  margin-right: 6px;
`;

export const RemoteTag = styled.View`
  padding: 2px 5px;
  border-radius: 15px;
  background-color: rgba(238, 187, 2, 0.75);
`;
