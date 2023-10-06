import { useContext, useState } from 'react';
import { Divider, Switch, TextInput } from 'react-native-paper';

import { Text } from '../../infrastructure/components/text.component';

import {
  ButtonContainer,
  Container,
  Section,
  ParameterButton,
  LocationInput,
} from './filter.styles';

import {
  postedDatesList,
  employmentTypesList,
  jobRequirementsList,
} from '../../infrastructure/search-parameters';

import { colors } from '../../infrastructure/theme/colors';
import { FSContext } from '../../services/firestore/firestore.context';
import { AuthContext } from '../../services/authentication/authentication.context';

export const Fitler = () => {
  const { UpdateSearchParameters, searchParameters } = useContext(FSContext);

  const { user } = useContext(AuthContext);

  const {
    location,
    employmentTypes,
    experienceRequirements,
    remoteOnly,
    searchDates,
  } = searchParameters;

  console.log('---filter.component---');
  console.log('searchParameters', searchParameters);

  const handleUpdateParameter = (parameter, value) => {
    if (parameter === 'location') {
      //  Set State???
    }
    UpdateSearchParameters(parameter, value, user.uid);
  };

  return (
    <Container>
      <Section>
        <Text variant='label'>Location</Text>
        <LocationInput
          label='location'
          value={location}
          onChangeText={(text) => handleUpdateParameter('location', text)}
        />
      </Section>
      <Section>
        <Text variant='label'>Posted Date</Text>
        <ButtonContainer>
          {postedDatesList.map((item, _idx) => {
            return (
              <ParameterButton
                // active={'all' === item.value}
                onPress={() => handleUpdateParameter('searchDates', item.value)}
                mode='contained'
                active={searchDates === item.value}
                key={item + _idx}
              >
                {item.label}
              </ParameterButton>
            );
          })}
        </ButtonContainer>
      </Section>

      <Divider />

      <Section>
        <Text variant='label'>Employment Type</Text>
        <ButtonContainer>
          {employmentTypesList.map((item, _idx) => (
            <ParameterButton
              onPress={() =>
                handleUpdateParameter('employmentTypes', item.value)
              }
              mode='contained'
              key={item + _idx}
              active={employmentTypes?.includes(item.value)}
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
          onValueChange={() => handleUpdateParameter('remoteOnly', !remoteOnly)}
        />
      </Section>

      <Divider />

      <Section>
        <Text variant='label'>Experience Requirements</Text>
        <ButtonContainer>
          {jobRequirementsList.map((item, _idx) => (
            <ParameterButton
              onPress={() =>
                handleUpdateParameter('experienceRequirements', item.value)
              }
              mode='contained'
              key={item + _idx}
              active={experienceRequirements?.includes(item.value)}
            >
              {item.label}
            </ParameterButton>
          ))}
        </ButtonContainer>
      </Section>
    </Container>
  );
};
