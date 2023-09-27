import { useState } from 'react';
import { SegmentedButtons } from 'react-native-paper';

import { colors } from '../../../infrastructure/theme/colors';

export const DetailsSelector = () => {
  const [activeTab, setActiveTab] = useState('');
  const navButtons = [
    {
      value: 'About',
      label: 'About',
      // onPress: () => alert('test'),
      style: {
        backgroundColor:
          activeTab === 'About' ? colors.ui.muted : colors.bg.primary,
      },
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
    },
    {
      value: 'Skills',
      label: 'Skills',
      // onPress: () => alert('test'),
      style: {
        backgroundColor:
          activeTab === 'Skills' ? colors.ui.muted : colors.bg.primary,
      },
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
    },
  ];

  return (
    <SegmentedButtons
      value={activeTab}
      onValueChange={setActiveTab}
      buttons={navButtons}
    />
  );
};
