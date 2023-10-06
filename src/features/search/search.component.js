import { useContext, useState } from 'react';
import { IconButton, Searchbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { colors } from '../../infrastructure/theme/colors';

import { Container } from './search.styles';
import { FSContext } from '../../services/firestore/firestore.context';
import { AuthContext } from '../../services/authentication/authentication.context';

export const Search = () => {
  const { searchQuery, setSearchQuery, UpdateSearchQuery } =
    useContext(FSContext);
  const { user } = useContext(AuthContext);

  const handleSearch = () => {
    alert('Search!');
  };

  const handleInputChange = (input) => {
    setSearchQuery(input);
    UpdateSearchQuery(input, user.uid);
  };

  const navigation = useNavigation();

  return (
    <Container>
      <Searchbar
        style={{ width: '90%' }}
        inputStyle={{ fontSize: 14 }}
        onIconPress={handleSearch}
        value={searchQuery}
        elevation={1}
        onChangeText={(text) => handleInputChange(text)}
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
