import { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { FlatList, Text } from 'react-native';
import { ActivityIndicator, Button } from 'react-native-paper';

import { Search } from '../../features/search/search.component';
import { JobCard } from '../../features/job-card/job-card.component';

import { AuthContext } from '../../services/authentication/authentication.context';
import { FSContext } from '../../services/firestore/firestore.context';
import { colors } from '../../infrastructure/theme/colors';

export const HomeScreen = () => {
  const { user } = useContext(AuthContext);
  const dataError = false;

  const [displayData, setDisplayData] = useState([]);

  const {
    RetreiveJobPosts,
    searchResults,
    dataLoading,
    fsSearchParameters,
    SetAppliedStatus,
    SetSavedStatus,
    apiPageNum,
  } = useContext(FSContext);

  // useEffect(() => {
  //   setInitalData();
  //   console.log('useEffect11');
  // }, []);

  useEffect(() => {
    if (fsSearchParameters !== null) {
      // setDisplayData(RetreiveJobPosts(fsSearchParameters, apiPageNum));
      getData();
    }
  }, [fsSearchParameters]);

  // const setInitalData = async () => {
  //   setDisplayData(await RetreiveJobPosts(fsSearchParameters, apiPageNum));
  // };

  const handleLoadMore = async () => {
    const newData = await RetreiveJobPosts(fsSearchParameters, apiPageNum + 1);

    setDisplayData((previousData) => [...previousData, ...newData]);
  };

  const getData = async () => {
    const newData = await RetreiveJobPosts(fsSearchParameters, apiPageNum);

    if (apiPageNum == 1) {
      setDisplayData(newData);
    } else {
      setDisplayData((previousData) => [...previousData, ...newData]);
    }
  };

  return (
    <Fragment>
      <Search />

      {dataLoading && !displayData.length ? (
        <ActivityIndicator animating={true} size={62} style={{ top: '40%' }} />
      ) : dataError ? (
        <Text>{dataError}</Text>
      ) : (
        <Fragment>
          <FlatList
            maintainVisibleContentPosition={{
              minIndexForVisible: 2,
            }}
            // onEndReachedThreshold={1}
            data={displayData}
            keyExtractor={(item) => item.job_id}
            style={{ width: '95%', alignSelf: 'center' }}
            // ref={flatListRef}
            renderItem={({ item, index }) => (
              <JobCard
                jobData={item}
                index={index}
                SetAppliedStatus={SetAppliedStatus}
                SetSavedStatus={SetSavedStatus}
                UID={user.uid}
              />
            )}
            extraData={displayData}
            ListFooterComponent={
              <Button
                mode='contained'
                buttonColor={colors.ui.primary}
                style={{ marginVertical: 9 }}
                // onPress={handleLoadMore}
                onPress={getData}
              >
                Load More
              </Button>
            }
            // initialScrollIndex={0}

            getItemLayout={(_, index) => ({
              length: 75, //  WIDTH + (MARGIN_HORIZONTAL * 2)
              offset: 75 * index, //  ( WIDTH + (MARGIN_HORIZONTAL*2) ) * (index)
              index,
            })}
            onEndReached={() => getData()}
          />
        </Fragment>
      )}
    </Fragment>
  );
};
