import styled from 'styled-components/native';
import { colors } from '../../infrastructure/theme/colors';
import { ScrollView } from 'react-native';
import { Button } from 'react-native-paper';

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.bg.secondary};
`;

export const Section = styled.View`
  padding: 9px 9px;
`;

export const ButtonContainer = styled(ScrollView).attrs({
  horizontal: true,
  centerContent: true,
  showsHorizontalScrollIndicator: false,
  contentInset: { left: 8, right: 8 },
})`
  margin: 9px 0;
`;

export const ParameterButton = styled(Button).attrs((props) => ({
  buttonColor: props.active ? colors.ui.primary : colors.ui.muted,
  textColor: !props.active ? colors.text.primary : colors.text.inverse,
}))`
  margin: 0 3px;
`;
