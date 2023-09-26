import { StatusBar, SafeAreaView } from 'react-native';
import styled from 'styled-components/native';

import BG from '../../../assets/bg-image.jpg';

export const SafeContainer = styled(SafeAreaView)`
  flex: 1;
  ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight + 10}px`};
  /* background-color: ${(props) => props.theme.colors.bg.primary}; */
`;
