import { useState } from 'react';
import { Linking, Platform, ScrollView, View } from 'react-native';
import { Button, Surface } from 'react-native-paper';

import { DetailsHeader } from '../../components/job-details/job-details-header/details-header.component';

import { DetailsSelector } from '../../components/job-details/details-selector/details-selector.component';
import { Spacer } from '../../infrastructure/components/spacer.component';
import { Specifics } from '../../components/job-details/specifics/specifics.component';

import {
  Container,
  ApplyButton,
  ApplyContainer,
  DetailsContainer,
} from './job-details.styles';

export const JobDetails = ({ route }) => {
  const { jobDetails } = route.params;
  const [activeTab, setActiveTab] = useState('About');

  const city = jobDetails.job_city ? jobDetails.job_city : '';
  const state = jobDetails.job_state ? jobDetails.job_state : '';
  const location = city && state ? `${city}, ${state}` : `${city}${state}`;
  const postedDate = (myDate = new Date(
    jobDetails.job_posted_at_datetime_utc
  ).toLocaleDateString('en-US'));

  console.log(jobDetails.saved);

  return (
    <Container>
      <Surface>
        <DetailsHeader
          logo={jobDetails.employer_logo}
          jobTitle={jobDetails.job_title}
          companyName={jobDetails.employer_name}
          location={location}
          isRemote={jobDetails.job_is_remote}
          postedOn={postedDate}
        />
      </Surface>

      <Spacer size='md' />

      <DetailsContainer>
        <DetailsSelector activeTab={activeTab} setActiveTab={setActiveTab} />
        <Spacer size='md' />

        <ScrollView>
          {activeTab === 'About' ? (
            <Specifics
              title={null}
              points={null}
              description={jobDetails.job_description ?? 'Not Provided'}
            />
          ) : activeTab === 'Qualifications' ? (
            <Specifics
              title={null}
              points={
                jobDetails.job_highlights?.Qualifications ?? ['Not Provided']
              }
              description={null}
            />
          ) : activeTab === 'Skills' ? (
            <Specifics
              title={null}
              points={jobDetails.job_required_skills ?? ['Not provided']}
              description={null}
            />
          ) : activeTab === 'Responsibilities' ? (
            <Specifics
              title={null}
              points={
                jobDetails.job_highlights?.Responsibilities ?? ['Not provided']
              }
              description={null}
            />
          ) : null}
        </ScrollView>
      </DetailsContainer>
      <ApplyContainer>
        <ApplyButton onPress={() => Linking.openURL(jobDetails.job_apply_link)}>
          Apply
        </ApplyButton>
      </ApplyContainer>
    </Container>
  );
};
