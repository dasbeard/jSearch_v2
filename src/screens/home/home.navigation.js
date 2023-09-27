import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen } from './home.screen';

import { JobDetails } from '../../screens/job-details/job-details.component';
import { Fitler } from '../../features/filter/filter.component';

const Stack = createNativeStackNavigator();

export const HomeNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Group
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name='HomeScreen' component={HomeScreen} />
      </Stack.Group>

      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name='Filters' component={Fitler} />
        <Stack.Screen
          name='Details'
          component={JobDetails}
          options={({ route }) => ({
            // title: route.params.jobDetails.job_title,
            title: 'Job Details',
          })}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
