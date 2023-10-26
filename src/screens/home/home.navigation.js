import { useContext, useEffect } from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { IconButton } from 'react-native-paper';

import { HomeScreen } from './home.screen';
import { SavedScreen } from '../saved/saved.screen';
import { UserAccount } from '../account/users-account.screen';

import { FSContext } from '../../services/firestore/firestore.context';
import { AuthContext } from '../../services/authentication/authentication.context';

import { colors } from '../../infrastructure/theme/colors';
import { Platform } from 'react-native';

const Tab = createBottomTabNavigator();

export const HomeNavigation = () => {
  const { dialogVisible, setDialogVisible, user } = useContext(AuthContext);

  const { RetreiveSearchValues, RetrieveSavedPosts, updateSavedPosts } =
    useContext(FSContext);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          height: Platform.OS == 'android' ? 60 : 45,
          paddingBottom: Platform.OS == 'android' ? 10 : 0,
          backgroundColor: colors.bg.primary,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
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
        tabBarHideOnKeyboard: true,
      })}
    >
      <Tab.Group>
        <Tab.Screen name='Home' component={HomeScreen} />
        <Tab.Screen
          name='Saved'
          component={SavedScreen}
          listeners={() => ({
            blur: () => {
              if (updateSavedPosts) {
                RetrieveSavedPosts(user.uid);
              }
            },
          })}
        />
        <Tab.Screen
          name='Account'
          component={UserAccount}
          listeners={() => ({
            blur: () => {
              if (dialogVisible) {
                // hide delete dialog when leaving account screen
                setDialogVisible(false);
              }
            },
          })}
        />
      </Tab.Group>
    </Tab.Navigator>
  );
};
