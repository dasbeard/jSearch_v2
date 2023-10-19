import { useState } from 'react';
import { Platform, ScrollView, View } from 'react-native';
import { Surface } from 'react-native-paper';

import { DetailsHeader } from '../../components/job-details/job-details-header/details-header.component';

import { DetailsSelector } from '../../components/job-details/details-selector/details-selector.component';
import { Spacer } from '../../infrastructure/components/spacer.component';
import { Specifics } from '../../components/job-details/specifics/specifics.component';

import { Container } from './job-details.styles';

export const JobDetails = ({ route }) => {
  const { jobDetails } = route.params;
  const [activeTab, setActiveTab] = useState('About');

  const city = jobDetails.job_city ? jobDetails.job_city : '';
  const state = jobDetails.job_state ? jobDetails.job_state : '';
  const location = city && state ? `${city}, ${state}` : `${city}${state}`;

  return (
    <Container
      style={{
        paddingBottom: Platform.OS == 'android' ? 155 : 200,
      }}
    >
      <Surface>
        <DetailsHeader
          logo={jobDetails.employer_logo}
          jobTitle={jobDetails.job_title}
          companyName={jobDetails.employer_name}
          location={location}
        />
      </Surface>

      <Spacer size='md' />

      <View style={{ paddingHorizontal: 6 }}>
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
      </View>
    </Container>
  );
};
