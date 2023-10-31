import { Fragment, useContext, useEffect, useRef } from 'react';
import { FlatList, Text } from 'react-native';
import { ActivityIndicator, Button } from 'react-native-paper';

import { Search } from '../../features/search/search.component';
import { JobCard } from '../../features/job-card/job-card.component';

import { AuthContext } from '../../services/authentication/authentication.context';
import { FSContext } from '../../services/firestore/firestore.context';
import { colors } from '../../infrastructure/theme/colors';

export const LoadMore = () => {
  const { apiPageNum, RetreiveJobPosts, fsSearchParameters } =
    useContext(FSContext);

  // const handleLoadMore = () => {
  //   RetreiveJobPosts(fsSearchParameters, apiPageNum + 1);

  // };

  return (
    <Button
      mode='contained'
      buttonColor={colors.ui.primary}
      style={{ marginVertical: 9 }}
      onPress={handleLoadMore}
    >
      Load More
    </Button>
  );
};

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
    apiPageNum,
  } = useContext(FSContext);

  const flatListRef = useRef();

  const handleLoadMore = async () => {
    await RetreiveJobPosts(fsSearchParameters, apiPageNum + 1);
    // flatListRef.scrollToIndex({ animated: true, index: apiPageNum + 10 });
  };

  useEffect(() => {
    if (fsSearchParameters !== null) {
      RetreiveJobPosts(fsSearchParameters);
    }
  }, [fsSearchParameters]);

  useEffect(() => {
    console.log('apiPageNum', apiPageNum);
    if (apiPageNum > 1) {
      const position = apiPageNum * 10 - 2;
      console.log('position', position);
      console.log('Item', searchResults[position].job_id);

      flatListRef.current.scrollToItem({
        index: searchResults[5],
      });
    }
  }, [searchResults]);

  return (
    <Fragment>
      <Search />

      {dataLoading ? (
        <ActivityIndicator animating={true} size={62} style={{ top: '40%' }} />
      ) : dataError ? (
        <Text>{dataError}</Text>
      ) : (
        <Fragment>
          <FlatList
            data={searchResults}
            keyExtractor={(item) => item.job_id}
            style={{ width: '95%', alignSelf: 'center' }}
            ref={flatListRef}
            ListFooterComponent={
              <Button
                mode='contained'
                buttonColor={colors.ui.primary}
                style={{ marginVertical: 9 }}
                onPress={handleLoadMore}
              >
                Load More
              </Button>
            }
            // onEndReached={() =>
            //   RetreiveJobPosts(fsSearchParameters, apiPageNum + 1)
            // }
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
          />
        </Fragment>
      )}
    </Fragment>
  );
};
