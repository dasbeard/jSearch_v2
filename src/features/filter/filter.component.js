import { ScrollView, View } from 'react-native';
import { Button, Divider, Switch } from 'react-native-paper';

import { Text } from '../../infrastructure/components/text.component';

import {
  ButtonContainer,
  Container,
  Section,
  ParameterButton,
} from './filter.styles';
import {
  postedDatesList,
  employmentTypesList,
  jobRequirementsList,
} from '../../infrastructure/search-parameters';
import { useState } from 'react';
import { colors } from '../../infrastructure/theme/colors';

export const Fitler = () => {
  const [remoteOnly, setRemoteOnly] = useState(false);
  const tempList = ['FULLTIME', 'CONTRACTOR'];

  return (
    <Container>
      <Section>
        <Text variant='label'>Posted Date</Text>
        <ButtonContainer>
          {postedDatesList.map((item, _idx) => (
            <ParameterButton
              onPress={() => null}
              mode='contained'
              key={item + _idx}
            >
              {item.label}
            </ParameterButton>
          ))}
        </ButtonContainer>
      </Section>

      <Divider />

      <Section>
        <Text variant='label'>Employment Type</Text>
        <ButtonContainer>
          {employmentTypesList.map((item, _idx) => (
            <ParameterButton
              active={tempList.includes(item.value)}
              onPress={() => null}
              mode='contained'
              key={item + _idx}
            >
              {item.label}
            </ParameterButton>
          ))}
        </ButtonContainer>
      </Section>

      <Divider />

      <Section
        style={{
          height: 50,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text variant='label'>Remote Only?</Text>
        <Switch
          color={colors.ui.secondary}
          style={{ marginRight: 12 }}
          value={remoteOnly}
          onValueChange={() => setRemoteOnly(!remoteOnly)}
        />
      </Section>

      <Divider />

      <Section>
        <Text variant='label'>Experience Requirements</Text>
        <ButtonContainer>
          {jobRequirementsList.map((item, _idx) => (
            <ParameterButton
              onPress={() => null}
              mode='contained'
              key={item + _idx}
            >
              {item.label}
            </ParameterButton>
          ))}
        </ButtonContainer>
      </Section>
    </Container>
  );
};

// <ScrollView
// horizontal
// contentInset={{ left: 10, right: 10 }}
// centerContent
// showsHorizontalScrollIndicator={false}
// >
