import { useContext } from 'react';
import { FlatList } from 'react-native';

import { JobCard } from '../../features/job-card/job-card.component';
import { Text } from '../../infrastructure/components/text.component';
import { Spacer } from '../../infrastructure/components/spacer.component';

import { Container } from './saved.styles';

import { FSContext } from '../../services/firestore/firestore.context';
import { AuthContext } from '../../services/authentication/authentication.context';

export const SavedScreen = () => {
  const { savedPosts, savedPostsIDs } = useContext(FSContext);
  const { user } = useContext(AuthContext);

  return (
    <FlatList
      // data={data}
      data={savedPosts}
      keyExtractor={(item) => item.job_id}
      renderItem={({ item }) => {
        return (
          <JobCard
            jobData={item}
            // SavePost={SavePost}
            // RemoveSavedPost={RemoveSavedPost}
            UID={user.uid}
          />
        );
      }}
      style={{ width: '95%', alignSelf: 'center' }}
    />
  );
};

// <Container>
//   <Text variant='label'>Saved Screen</Text>
//   <Spacer size='md' />
//   <Text variant='caption'>NOT SETUP YET</Text>
// </Container>
