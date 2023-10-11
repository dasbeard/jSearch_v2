import styled from 'styled-components/native';
import { colors } from '../../infrastructure/theme/colors';
import { ScrollView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

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

export const LocationInput = styled(TextInput)`
  margin: 9px 0;
  align-self: center;
  width: 95%;
`;

export const ParameterButton = styled(Button).attrs((props) => ({
  buttonColor: props.active ? colors.ui.secondary : colors.ui.muted,
  textColor: colors.text.primary,
}))`
  margin: 0 3px;
`;

export const SearchButton = styled(Button).attrs((props) => ({
  // buttonColor: props.update ? colors.ui.primary : colors.ui.disabled,
  buttonColor: props.update ? colors.ui.primary : colors.text.disabled,
  textColor: props.update ? colors.text.inverse : colors.text.inverse,
}))`
  width: 80%;
  height: 50px;
  align-self: center;
  justify-content: center;
`;
