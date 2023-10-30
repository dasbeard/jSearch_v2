import { Button } from 'react-native-paper';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const FilterContainer = styled.View`
  justify-content: flex-end;
  align-items: center;
  /* justify-items: center; */
  flex-direction: row;
  padding-left: 10px;
  padding-right: 10px;
  height: 50px;
`;

export const FilterButton = styled(Button).attrs({
  mode: 'elevated',
})`
  width: 135px;
`;
