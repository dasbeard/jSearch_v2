import { View } from 'react-native';
import { Surface } from 'react-native-paper';

import { Text } from '../../infrastructure/components/text.component';
import { DetailsHeader } from '../../components/job-details/job-details-header/details-header.component';

import { Container, Logo } from './job-details.styles';
import { DetailsSelector } from '../../components/job-details/details-selector/details-selector.component';
import { Spacer } from '../../infrastructure/components/spacer.component';

export const JobDetails = ({ route }) => {
  const { jobDetails } = route.params;

  return (
    <Container>
      <Surface>
        <DetailsHeader
          logo={jobDetails.employer_logo}
          jobTitle={jobDetails.job_title}
          companyName={jobDetails.employer_name}
          loctaion={`${jobDetails.job_city}, ${jobDetails.job_state}`}
        />
      </Surface>

      <Spacer size='md' />
      <DetailsSelector />
      <Spacer size='md' />

      <Text>Job Details</Text>
    </Container>
  );
};

// style={{ paddingHorizontal: 5 }}
