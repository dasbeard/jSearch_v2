import { useContext, useState } from 'react';
import { Divider, Switch } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { Text } from '../../infrastructure/components/text.component';
import { Spacer } from '../../infrastructure/components/spacer.component';

import {
  ButtonContainer,
  Container,
  Section,
  ParameterButton,
  LocationInput,
  SearchButton,
} from './filter.styles';

import {
  postedDatesList,
  employmentTypesList,
  jobRequirementsList,
} from '../../infrastructure/search-parameters';

import { colors } from '../../infrastructure/theme/colors';
import { FSContext } from '../../services/firestore/firestore.context';
import { AuthContext } from '../../services/authentication/authentication.context';

export const Filter = () => {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);

  const { UpdateSearchParameters, fsSearchParameters } = useContext(FSContext);

  const [searchModified, setSearchModified] = useState(false);
  const [location, setLocation] = useState(fsSearchParameters.location);
  const [employmentTypes, setEmploymentTypes] = useState(
    fsSearchParameters.employmentTypes
  );
  const [experienceRequirements, setExperienceRequirements] = useState(
    fsSearchParameters.experienceRequirements
  );
  const [remoteOnly, setRemoteOnly] = useState(fsSearchParameters.remoteOnly);
  const [searchDates, setSearchDates] = useState(
    fsSearchParameters.searchDates
  );

  const handleUpdateParameter = (parameter, value) => {
    setSearchModified(true);

    switch (parameter) {
      case 'location':
        setLocation(value);
        break;
      case 'remoteOnly':
        setRemoteOnly(value);
        break;
      case 'searchDates':
        setSearchDates(value);
        break;
      case 'employmentTypes':
        let newEmploymentTypes = employmentTypes;

        if (!newEmploymentTypes.length) {
          newEmploymentTypes = [value];
        } else if (newEmploymentTypes.includes(value)) {
          newEmploymentTypes = newEmploymentTypes.filter(
            (item) => item !== value
          );
        } else {
          newEmploymentTypes = [...newEmploymentTypes, value];
        }
        setEmploymentTypes(newEmploymentTypes);

        break;
      case 'experienceRequirements':
        let newRequirements = experienceRequirements;

        if (!newRequirements.length) {
          newRequirements = [`${value}`];
        } else if (newRequirements.includes(value)) {
          newRequirements = newRequirements.filter((item) => item !== value);
        } else {
          newRequirements = [...newRequirements, value];
        }

        setExperienceRequirements(newRequirements);

        break;
      default:
        break;
    }
  };

  const handleSaveParameters = () => {
    const currentParams = {
      location,
      remoteOnly,
      searchDates,
      employmentTypes,
      experienceRequirements,
    };

    UpdateSearchParameters(user.uid, currentParams);
    navigation.goBack();
  };

  return (
    <Container>
      <Section>
        <Text variant='label'>Location</Text>
        <LocationInput
          placeholder='Los Angeles, CA'
          value={location}
          onChangeText={(loc) => handleUpdateParameter('location', loc)}
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
      <Section>
        <Spacer size='xl' />
        <SearchButton
          mode='contained'
          uppercase
          update={searchModified}
          onPress={() => handleSaveParameters()}
        >
          Search
        </SearchButton>
      </Section>
    </Container>
  );
};
