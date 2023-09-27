import { Image, TouchableOpacity, View } from 'react-native';
import { Text } from '../../infrastructure/components/text.component';

import { useNavigation } from '@react-navigation/native';
import { checkImageURL } from '../../infrastructure/checkImageURL';

import { Container, JobContainer, JobContent, Logo } from './job-card.styles';
import TempLogo from '../../../assets/TempLogo.jpeg';
import { IconButton } from 'react-native-paper';

export const JobCard = ({ jobData }) => {
  console.log('incoming', jobData.employer_logo);

  const companyLogo = checkImageURL(jobData.employer_logo)
    ? jobData.employer_logo
    : TempLogo;
  const navigation = useNavigation();

  console.log('display', companyLogo);

  return (
    <Container>
      <TouchableOpacity
        style={{ flexDirection: 'row', flex: 1 }}
        onPress={() => navigation.navigate('Details', { jobDetails: jobData })}
      >
        <Logo source={{ uri: jobData.employer_logo }} />

        <JobContainer>
          <JobContent style={{ flex: 2 }}>
            <Text variant='label' numberOfLines={2}>
              {jobData.job_title}
            </Text>
            <Text variant='body'>{jobData.employer_name}</Text>
          </JobContent>

          <JobContent style={{ flex: 1 }}>
            {jobData.job_is_remote ? (
              <Text variant='caption'>Remote</Text>
            ) : (
              <Text variant='caption'>On Site</Text>
            )}

            <Text variant='caption'>
              {jobData.job_city}. {jobData.job_state}
            </Text>
          </JobContent>
        </JobContainer>

        <View>
          <IconButton icon='heart' iconColor='red' size={18} />
          <IconButton icon='checkbox-outline' iconColor='black' size={18} />
        </View>
      </TouchableOpacity>
    </Container>
  );
};
