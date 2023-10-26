import { Fragment, useContext, useEffect } from 'react';
import { FlatList, Text, View } from 'react-native';

import { Search } from '../../features/search/search.component';
import { JobCard } from '../../features/job-card/job-card.component';

import { AuthContext } from '../../services/authentication/authentication.context';
import { FSContext } from '../../services/firestore/firestore.context';
import { ActivityIndicator, Button } from 'react-native-paper';

export const HomeScreen = () => {
  const { user } = useContext(AuthContext);
  const dataError = false;

  const {
    RetreiveJobPosts,
    searchResults,
    dataLoading,
    fsSearchParameters,

    SetAppliedStatus,
    SetSavedStatus,
  } = useContext(FSContext);

  useEffect(() => {
    if (fsSearchParameters !== null) {
      RetreiveJobPosts(fsSearchParameters);
    }
  }, [fsSearchParameters]);

  return (
    <Fragment>
      <Search />

      {dataLoading ? (
        <ActivityIndicator animating={true} size={62} style={{ top: '40%' }} />
      ) : dataError ? (
        <Text>{dataError}</Text>
      ) : (
        <FlatList
          data={searchResults}
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
      )}
    </Fragment>
  );
};
