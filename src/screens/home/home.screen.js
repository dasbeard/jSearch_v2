import { Fragment, useContext, useEffect } from 'react';
import { FlatList, Text, View } from 'react-native';

import { Search } from '../../features/search/search.component';
import { JobCard } from '../../features/job-card/job-card.component';

import * as tempSearchData from '../../../testSearchData.json';
import { AuthContext } from '../../services/authentication/authentication.context';
import { FSContext } from '../../services/firestore/firestore.context';
import { ActivityIndicator } from 'react-native-paper';

const data = tempSearchData.data;

export const HomeScreen = () => {
  const { user } = useContext(AuthContext);
  const {
    SavePost,
    RemoveSavedPost,
    searchResults,
    dataLoading,
    setDataLoading,
    dataError,
    setDataError,
  } = useContext(FSContext);

  useEffect(() => {
    console.log('new resuilts?');
  }, [searchResults]);

  return (
    <Fragment>
      <Search />

      {dataLoading ? (
        <ActivityIndicator animating={true} size={62} />
      ) : dataError ? (
        <Text>{dataError}</Text>
      ) : (
        <FlatList
          // data={data}
          data={searchResults}
          keyExtractor={(item) => item.job_id}
          renderItem={({ item }) => {
            return (
              <JobCard
                jobData={item}
                SavePost={SavePost}
                RemoveSavedPost={RemoveSavedPost}
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
