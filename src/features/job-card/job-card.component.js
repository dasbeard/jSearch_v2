import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { Text } from '../../infrastructure/components/text.component';

import { checkImageIsSVG } from '../../infrastructure/checkImageIsSVG';

import { Container, JobContainer, JobContent, Logo } from './job-card.styles';
import TempLogo from '../../../assets/TempLogo.jpeg';

export const JobCard = ({ jobData }) => {
  const navigation = useNavigation();
  const [saved, setSaved] = useState(jobData.saved);
  const [applied, setApplied] = useState(jobData.applied);

  const validLogo =
    jobData.employer_logo === null || checkImageIsSVG(jobData.employer_logo)
      ? false
      : true;

  return (
    <Container>
      <TouchableOpacity
        style={{ flexDirection: 'row', flex: 1 }}
        onPress={() => navigation.navigate('Details', { jobDetails: jobData })}
      >
        {validLogo ? (
          <Logo source={{ uri: jobData.employer_logo }} />
        ) : (
          <Logo source={TempLogo} />
        )}

        <JobContainer>
          <JobContent style={{ flex: 2 }}>
            <Text variant='label' numberOfLines={2}>
              {jobData.job_title}
            </Text>

            <Text variant='body'>{jobData.employer_name}</Text>
          </JobContent>

          <JobContent style={{ flex: 1, alignItems: 'flex-end' }}>
            {jobData.job_is_remote ? (
              <Text variant='caption'>Remote</Text>
            ) : (
              <Text variant='caption'>On Site</Text>
            )}

            <Text variant='caption'>
              {jobData.job_city}, {jobData.job_state}
            </Text>
          </JobContent>
        </JobContainer>
      </TouchableOpacity>
      <View>
        <IconButton
          icon={saved ? 'heart' : 'heart-outline'}
          iconColor={saved ? 'red' : '#000'}
          size={18}
          onPress={() => setSaved(!saved)}
        />
        <IconButton
          icon={applied ? 'checkbox-outline' : 'square-outline'}
          iconColor={applied ? 'green' : '#000'}
          size={18}
          onPress={() => setApplied(!applied)}
        />
      </View>
    </Container>
  );
};
