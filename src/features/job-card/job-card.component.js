import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, View } from 'react-native';
import { IconButton } from 'react-native-paper';

import { checkImageIsSVG } from '../../infrastructure/checkImageIsSVG';
import TempLogo from '../../../assets/TempLogo.jpeg';

import { Text } from '../../infrastructure/components/text.component';

import { Container, JobContainer, JobContent, Logo } from './job-card.styles';

export const JobCard = ({ jobData, UID, SavePost, RemovePost }) => {
  const navigation = useNavigation();
  const [saved, setSaved] = useState(jobData.saved);
  const [applied, setApplied] = useState(jobData.applied);

  const validLogo =
    jobData.employer_logo === null || checkImageIsSVG(jobData.employer_logo)
      ? false
      : true;

  const handleSavePost = () => {
    if (saved) {
      // Removing Saved post
      console.log('remove post');
      RemovePost(UID, jobData.job_id);
    } else {
      // Saving post
      console.log('save post');
      SavePost(UID, jobData);
    }

    // Update state for UI
    setSaved(!saved);
  };

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
            {jobData.job_is_remote === true ? (
              <Text variant='caption'>Remote</Text>
            ) : (
              <Text variant='caption'>On Site</Text>
            )}

            {jobData.job_city && jobData.job_state ? (
              <Text variant='caption' style={{ textAlign: 'right' }}>
                {jobData.job_city}, {jobData.job_state}
              </Text>
            ) : (
              <Text></Text>
            )}
          </JobContent>
        </JobContainer>
      </TouchableOpacity>
      <View>
        <IconButton
          icon={saved ? 'heart' : 'heart-outline'}
          iconColor={saved ? 'red' : '#000'}
          size={18}
          onPress={handleSavePost}
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
