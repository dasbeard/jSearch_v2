import { useState } from 'react';
import { IconButton, Searchbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { colors } from '../../infrastructure/theme/colors';

import { Container } from './search.styles';

export const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    alert('Search!');
  };

  const navigation = useNavigation();

  return (
    <Container>
      <Searchbar
        style={{ width: '90%' }}
        onIconPress={handleSearch}
        value={searchTerm}
        elevation={1}
        onChangeText={(text) => {
          if (!text.length) {
            // do nothing
          }
          setSearchTerm(text);
        }}
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
