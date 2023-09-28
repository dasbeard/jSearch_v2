import { useState } from 'react';
import { SegmentedButtons } from 'react-native-paper';

import { colors } from '../../../infrastructure/theme/colors';

import { View } from 'react-native';

const size = 12;

export const DetailsSelector = (props) => {
  const { activeTab, setActiveTab } = props;
  const navButtons = [
    {
      value: 'About',
      label: 'About',
      // onPress: () => alert('test'),
      style: {
        backgroundColor:
          activeTab === 'About' ? colors.ui.muted : colors.bg.primary,
      },
      labelStyle: { fontSize: size },
    },
    {
      value: 'Qualifications',
      label: 'Qualifications',
      icon: '',
      // onPress: () => alert('test'),
      style: {
        backgroundColor:
          activeTab === 'Qualifications' ? colors.ui.muted : colors.bg.primary,
      },
      labelStyle: { fontSize: size },
    },
    {
      value: 'Responsibilities',
      label: 'Responsibilities',
      // onPress: () => alert('test'),
      style: {
        backgroundColor:
          activeTab === 'Responsibilities'
            ? colors.ui.muted
            : colors.bg.primary,
      },
      labelStyle: { fontSize: size },
    },
    {
      value: 'Skills',
      label: 'Skills',
      // onPress: () => alert('test'),
      style: {
        backgroundColor:
          activeTab === 'Skills' ? colors.ui.muted : colors.bg.primary,
      },
      labelStyle: { fontSize: size },
    },
  ];

  return (
    <View>
      <SegmentedButtons
        density='small'
        value={activeTab}
        onValueChange={setActiveTab}
        buttons={navButtons}
      />
    </View>
  );
};
