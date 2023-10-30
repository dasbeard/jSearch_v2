import { Fragment, useContext, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { SegmentedButtons, Button } from 'react-native-paper';

import { JobCard } from '../../features/job-card/job-card.component';
import { Text } from '../../infrastructure/components/text.component';

import { Container, FilterButton, FilterContainer } from './saved.styles';

import { FSContext } from '../../services/firestore/firestore.context';
import { AuthContext } from '../../services/authentication/authentication.context';
import { colors } from '../../infrastructure/theme/colors';

export const SavedScreen = () => {
  const { savedPosts, SetAppliedStatus, SetSavedStatus } =
    useContext(FSContext);
  const { user } = useContext(AuthContext);

  const [showApplied, setShowApplied] = useState(false);
  const [allSavedPosts, setAllSavedPosts] = useState(savedPosts);

  const handleAppliedFilter = () => {
    if (!showApplied) {
      const newList = allSavedPosts.filter((post) => {
        if (!post.applied) {
          return post;
        }
      });
      setAllSavedPosts(newList);
    } else {
      setAllSavedPosts(savedPosts);
    }
    setShowApplied(!showApplied);
  };

  return (
    <>
      {savedPosts.length > 0 ? (
        <Fragment>
          <FilterContainer>
            <FilterButton
              mode='contained'
              icon={'checkbox-outline'}
              compact
              buttonColor={
                showApplied ? colors.ui.primary : colors.ui.secondary
              }
              textColor={
                showApplied ? colors.text.inverse : colors.text.primary
              }
              onPress={handleAppliedFilter}
            >
              {!showApplied ? 'Hide' : 'Show'} Applied
            </FilterButton>
          </FilterContainer>

          <FlatList
            data={allSavedPosts}
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
        </Fragment>
      ) : (
        <Container>
          <Text variant='label'>No Saved Post</Text>
        </Container>
      )}
    </>
  );
};
