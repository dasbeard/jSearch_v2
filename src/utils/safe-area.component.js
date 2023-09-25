import { StatusBar, SafeAreaView } from 'react-native';
import styled from 'styled-components/native';

export const SafeArea = styled(SafeAreaView)`
  /* background-color: ${(props) => props.theme.colors.bg.primary}; */
  flex: 1;
  ${StatusBar.currentHeight &&
  `margin-top: ${StatusBar.currentHeight + 10}px `};
`;
