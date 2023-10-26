import { useContext, useEffect } from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { IconButton } from 'react-native-paper';

import { SafeContainer } from '../infrastructure/components/safe-area.component';

import { HomeNavigation } from '../screens/home/home.navigation';
// import { SavedScreen } from '../screens/saved/saved.screen';
// import { UserAccount } from '../screens/account/users-account.screen';

import { colors } from '../infrastructure/theme/colors';
import { AuthContext } from '../services/authentication/authentication.context';
import { FSContext } from '../services/firestore/firestore.context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Filter } from '../features/filter/filter.component';
import { JobDetails } from '../screens/job-details/job-details.component';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  const { dialogVisible, setDialogVisible, user } = useContext(AuthContext);

  const { RetreiveSearchValues, RetrieveSavedPosts, updateSavedPosts } =
    useContext(FSContext);

  useEffect(() => {
    RetrieveSavedPosts(user.uid);
    RetreiveSearchValues(user.uid);
  }, []);

  return (
    <SafeContainer>
      <Stack.Navigator
        initialRouteName='HomeScreen'
        screenOptions={{ headerShown: false }}
      >
        <Stack.Group>
          <Stack.Screen name='HomeScreen' component={HomeNavigation} />
        </Stack.Group>

        <Stack.Group
          screenOptions={{
            headerTitleAlign: 'center',
            headerShown: true,
            presentation: 'modal',
          }}
        >
          <Stack.Screen
            name='Filters'
            component={Filter}
            options={{
              title: 'Search Parameters',
              animation: 'slide_from_bottom',
            }}
          />

          <Stack.Screen
            name='Details'
            component={JobDetails}
            options={{
              title: 'Job Details',
              gestureEnabled: true,
              animation: 'slide_from_bottom',
            }}
          />
        </Stack.Group>
      </Stack.Navigator>

      <View
        // this is for ios to cover the bottom tab navigator color
        style={{
          backgroundColor: colors.bg.primary,
          position: 'absolute',
          bottom: 0,
          right: 0,
          left: 0,
          height: 50,
          zIndex: -100,
        }}
      />
    </SafeContainer>
  );
};

// **** Safety ****
// return (
//   <SafeContainer>
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         headerShown: false,
//         tabBarStyle: {
//           // paddingTop: 6,
//           backgroundColor: colors.bg.primary,
//         },
//         tabBarIcon: ({ focused, color, size }) => {
//           let iconName;

//           if (route.name === 'Home') {
//             iconName = focused ? 'home' : 'home-outline';
//             size = focused ? 28 : 24;
//           } else if (route.name === 'Saved') {
//             iconName = focused ? 'heart' : 'heart-outline';
//             size = focused ? 28 : 24;
//           } else if (route.name === 'Account') {
//             iconName = focused ? 'account' : 'account-outline';
//             size = focused ? 28 : 24;
//           }

//           return <IconButton icon={iconName} size={size} iconColor={color} />;
//         },
//         tabBarActiveTintColor: colors.ui.secondary,
//         tabBarInactiveTintColor: colors.ui.muted,
//         tabBarHideOnKeyboard: true,
//       })}
//     >
//       <Tab.Group>
//         <Tab.Screen name='Home' component={HomeNavigation} />
//         <Tab.Screen
//           name='Saved'
//           component={SavedScreen}
//           listeners={() => ({
//             blur: () => {
//               if (updateSavedPosts) {
//                 RetrieveSavedPosts(user.uid);
//               }
//             },
//           })}
//         />
//         <Tab.Screen
//           name='Account'
//           component={UserAccount}
//           listeners={() => ({
//             blur: () => {
//               if (dialogVisible) {
//                 // hide delete dialog when leaving account screen
//                 setDialogVisible(false);
//               }
//             },
//           })}
//         />
//       </Tab.Group>
//     </Tab.Navigator>

//     <View
//       // this is for ios to cover the bottom tab navigator color
//       style={{
//         backgroundColor: colors.bg.primary,
//         position: 'absolute',
//         bottom: 0,
//         right: 0,
//         left: 0,
//         height: 50,
//         zIndex: -100,
//       }}
//     />
//   </SafeContainer>
// );
