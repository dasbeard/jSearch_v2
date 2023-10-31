import { useEffect, useState } from 'react';
import {
  getFocusedRouteNameFromRoute,
  useNavigation,
} from '@react-navigation/native';
import { TouchableOpacity, View } from 'react-native';
import { IconButton } from 'react-native-paper';

import { checkImageIsSVG } from '../../infrastructure/checkImageIsSVG';
import TempLogo from '../../../assets/TempLogo.jpeg';

import { Text } from '../../infrastructure/components/text.component';

import {
  Container,
  JobContainer,
  JobContent,
  Logo,
  RemoteTag,
} from './job-card.styles';

export const JobCard = ({ jobData, UID, SetAppliedStatus, SetSavedStatus }) => {
  const navigation = useNavigation();
  const [saved, setSaved] = useState();
  const [applied, setApplied] = useState();

  const validLogo =
    jobData.employer_logo === null || checkImageIsSVG(jobData.employer_logo)
      ? false
      : true;

  // const screenName = getFocusedRouteNameFromRoute(route);

  const handleSavePost = () => {
    SetSavedStatus(UID, jobData, !saved);
    setSaved(!saved);
  };

  const handleApplied = () => {
    SetAppliedStatus(UID, jobData, !applied);
    setApplied(!applied);
  };

  useEffect(() => {
    setApplied(jobData.applied);
    setSaved(jobData.saved);
  }, []);

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

          <JobContent style={{ flex: 1.5, alignItems: 'flex-end' }}>
            {jobData.job_is_remote === true ? (
              <RemoteTag>
                <Text variant='caption'>Remote</Text>
              </RemoteTag>
            ) : (
              <Text />
            )}
            {jobData.job_city && jobData.job_state ? (
              <Text variant='caption' style={{ textAlign: 'right' }}>
                {jobData.job_city}, {jobData.job_state}
              </Text>
            ) : (
              <Text />
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
          onPress={handleApplied}
        />
      </View>
    </Container>
  );
};
