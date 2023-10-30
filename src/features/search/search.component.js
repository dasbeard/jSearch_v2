import { useContext, useEffect, useState } from 'react';
import { IconButton, Searchbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { colors } from '../../infrastructure/theme/colors';

import { Container } from './search.styles';
import { FSContext } from '../../services/firestore/firestore.context';
import { AuthContext } from '../../services/authentication/authentication.context';

export const Search = () => {
  const { fsSearchParameters, UpdateSearchQuery } = useContext(FSContext);
  const { user } = useContext(AuthContext);
  const [searchBar, setSearchBar] = useState('');

  const navigation = useNavigation();

  const handleSearch = () => {
    alert('Search!');
  };

  const handleSearchSubmit = () => {
    if (searchBar.trim() !== fsSearchParameters) {
      UpdateSearchQuery(user.uid, searchBar);
    }
  };

  const handleOnChange = (newSearch) => {
    setSearchBar(newSearch);
  };

  useEffect(() => {
    if (fsSearchParameters) {
      setSearchBar(fsSearchParameters.searchValue);
    }
  }, [fsSearchParameters]);

  return (
    <Container>
      <Searchbar
        style={{ width: '90%' }}
        inputStyle={{ fontSize: 14 }}
        onIconPress={() => handleSearchSubmit()}
        value={searchBar}
        elevation={1}
        onChangeText={(text) => handleOnChange(text)}
        onSubmitEditing={() => handleSearchSubmit()}
      />
      <IconButton
        icon='filter'
        size={24}
        iconColor={colors.ui.primary}
        onPress={() => navigation.navigate('Filters')}
      />
    </Container>
  );
};
