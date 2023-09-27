import { FlatList, Text, View } from 'react-native';
import { ImageBackground } from 'react-native';

import { Search } from '../../features/search/search.component';

import BG from '../../../assets/bg-image.jpg';

import * as tempSearchData from '../../../testSearchData.json';
import { JobCard } from '../../features/job-card/job-card.component';
import { Fragment } from 'react';

const data = tempSearchData.data;

export const HomeScreen = () => {
  return (
    <Fragment>
      <Search />

      <FlatList
        data={data}
        keyExtractor={(item) => item.job_id}
        renderItem={({ item }) => {
          return <JobCard jobData={item} />;
        }}
        style={{ width: '95%', alignSelf: 'center' }}
      />
    </Fragment>
  );
};
