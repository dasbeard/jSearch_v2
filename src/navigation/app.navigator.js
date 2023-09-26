import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { IconButton } from 'react-native-paper';

import { SafeContainer } from '../infrastructure/components/safe-area.component';
import { HomeScreen } from '../screens/home/home.screen';
import { SavedScreen } from '../screens/saved/saved.screen';
import { UserAccount } from '../screens/account/users-account.screen';
import { colors } from '../infrastructure/theme/colors';

import { ImageBackground } from 'react-native';

import header from '../../assets/header2.jpg';

const Tab = createBottomTabNavigator();

export const AppNavigator = () => {
  return (
    <SafeContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,

          tabBarStyle: {
            backgroundColor: 'transparent',
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
              size = focused ? 28 : 24;
            } else if (route.name === 'Saved') {
              iconName = focused ? 'heart' : 'heart-outline';
              size = focused ? 28 : 24;
            } else if (route.name === 'Account') {
              iconName = focused ? 'account' : 'account-outline';
              size = focused ? 28 : 24;
            }

            return <IconButton icon={iconName} size={size} iconColor={color} />;
          },
          tabBarActiveTintColor: colors.ui.secondary,
          tabBarInactiveTintColor: colors.ui.muted,
          // tabBarActiveBackgroundColor: 'none',
        })}
      >
        <Tab.Screen name='Home' component={HomeScreen} />
        <Tab.Screen name='Saved' component={SavedScreen} />
        <Tab.Screen name='Account' component={UserAccount} />
      </Tab.Navigator>
    </SafeContainer>
  );
};
