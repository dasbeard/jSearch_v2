import { View } from 'react-native';
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
  RemoteTag,
} from './details-header.styles';

export const DetailsHeader = ({
  logo,
  jobTitle,
  companyName,
  location,
  isRemote,
  postedOn,
}) => {
  const validLogo = logo === null || checkImageIsSVG(logo) ? false : true;
  const locationDisplay = location ? location : null;

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
          <Text variant='caption'>Posted: {postedOn}</Text>
          <Text variant='body'>{locationDisplay}</Text>
          {isRemote ? (
            <RemoteTag>
              <Text variant='caption'>Remote</Text>
            </RemoteTag>
          ) : (
            <Text />
          )}
        </LocationInfo>
      </HeaderContent>
    </Container>
  );
};
