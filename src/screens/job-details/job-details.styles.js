import styled from 'styled-components/native';
import { colors } from '../../infrastructure/theme/colors';
import { Button } from 'react-native-paper';

import { Platform } from 'react-native';

const isAndroid = Platform.OS == 'android' ? true : false;

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.bg.secondary};
  /* padding-bottom: 195px; */
  padding-bottom: ${isAndroid ? '180px' : '195px'};
`;

export const Logo = styled.Image`
  height: 65px;
  width: 65px;
  object-fit: contain;
  margin: 6px;
  border-radius: 6px;
  align-self: center;
`;

export const DetailsContainer = styled.View`
  padding-left: 6px;
  padding-right: 6px;
  margin-bottom: 40px;
`;

export const ApplyContainer = styled.View`
  position: absolute;
  width: 100%;
  /* bottom: 30px; */
  bottom: ${isAndroid ? '10px' : '25px'};
  padding-top: 5px;
  padding-bottom: 5px;
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
