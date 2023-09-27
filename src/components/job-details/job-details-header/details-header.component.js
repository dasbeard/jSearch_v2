import { Text } from '../../../infrastructure/components/text.component';

import { checkImageIsSVG } from '../../../infrastructure/checkImageIsSVG';
import TempLogo from '../../../../assets/TempLogo.jpeg';

import {
  CompanyAndTitle,
  Container,
  HeaderContent,
  LocationInfo,
  Logo,
  LogoContainer,
} from './details-header.styles';
import { View } from 'react-native';

export const DetailsHeader = ({ logo, jobTitle, companyName, loctaion }) => {
  const validLogo = logo === null || checkImageIsSVG(logo) ? false : true;

  return (
    <Container>
      <LogoContainer>
        {validLogo ? (
          <Logo source={{ uri: logo }} />
        ) : (
          <Logo source={TempLogo} />
        )}
      </LogoContainer>

      <HeaderContent>
        <CompanyAndTitle style={{ paddingVertical: 6 }}>
          <View>
            <Text variant='caption'>Title</Text>
            <Text variant='label' numberOfLines={2}>
              {jobTitle}
            </Text>
          </View>

          <View>
            <Text variant='caption'>Company</Text>
            <Text variant='label'>{companyName}</Text>
          </View>
        </CompanyAndTitle>

        <LocationInfo style={{ paddingVertical: 6 }}>
          <Text variant='body'>Hybrid</Text>
          <Text variant='body'>{loctaion}</Text>
        </LocationInfo>
      </HeaderContent>
    </Container>
  );
};
