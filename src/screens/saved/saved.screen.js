import { useContext } from 'react';
import { FlatList } from 'react-native';

import { JobCard } from '../../features/job-card/job-card.component';
import { Text } from '../../infrastructure/components/text.component';

import { Container } from './saved.styles';

import { FSContext } from '../../services/firestore/firestore.context';
import { AuthContext } from '../../services/authentication/authentication.context';

export const SavedScreen = () => {
  const { savedPosts, SetAppliedStatus, SetSavedStatus } =
    useContext(FSContext);
  const { user } = useContext(AuthContext);

  return (
    <>
      {savedPosts.length > 0 ? (
        <FlatList
          data={savedPosts}
          keyExtractor={(item) => item.job_id}
          renderItem={({ item }) => {
            return (
              <JobCard
                jobData={item}
                SetAppliedStatus={SetAppliedStatus}
                SetSavedStatus={SetSavedStatus}
                UID={user.uid}
              />
            );
          }}
          style={{ width: '95%', alignSelf: 'center' }}
        />
      ) : (
        <Container>
          <Text variant='label'>No Saved Post</Text>
        </Container>
      )}
    </>
  );
};
