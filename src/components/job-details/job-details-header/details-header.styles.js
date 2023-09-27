import styled from 'styled-components/native';
import { colors } from '../../../infrastructure/theme/colors';

export const Container = styled.View`
  height: 95px;
  flex-direction: row;
  background-color: transparent;
  /* background-color: ${colors.bg.primary}; */
  /* margin-bottom: 9px; */
  padding-left: 6px;
  padding-right: 9px;
  /* box-shadow: 0 0 0.75px ${colors.bg.shadow}; */
`;

export const LogoContainer = styled.View`
  align-self: center;
  flex: 1;
`;

export const Logo = styled.Image`
  height: 75px;
  width: 75px;
  object-fit: contain;
  margin: 3px;
  margin-right: 8px;
  border-radius: 6px;
`;

export const HeaderContent = styled.View`
  flex: 3;
  flex-direction: row;
  /* border-width: 1px; */
`;

export const CompanyAndTitle = styled.View`
  flex: 2;
  justify-content: space-between;
  /* border-width: 1px; */
`;

export const LocationInfo = styled.View`
  flex: 1;
  justify-content: space-between;
  align-items: flex-end;
  /* border-width: 1px; */
`;
