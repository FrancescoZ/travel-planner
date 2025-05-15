import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TripsStackParamList } from './types';
import { colors } from '../theme';

// Import trips screens (we'll create these later)
// For now, we'll use placeholder components
import TripsListScreen from '../screens/trips/TripsListScreen';
import TripDetailsScreen from '../screens/trips/TripDetailsScreen';
import CreateTripScreen from '../screens/trips/CreateTripScreen';
import EditTripScreen from '../screens/trips/EditTripScreen';
import DayDetailsScreen from '../screens/trips/DayDetailsScreen';
import AddActivityScreen from '../screens/trips/AddActivityScreen';
import AddAccommodationScreen from '../screens/trips/AddAccommodationScreen';
import ActivityDetailsScreen from '../screens/trips/ActivityDetailsScreen';
import AccommodationDetailsScreen from '../screens/trips/AccommodationDetailsScreen';
import ShareTripScreen from '../screens/trips/ShareTripScreen';
import ManageCollaboratorsScreen from '../screens/trips/ManageCollaboratorsScreen';

const Stack = createNativeStackNavigator<TripsStackParamList>();

export const TripsNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="TripsList"
      screenOptions={{
        headerTintColor: colors.primary,
        headerBackTitleVisible: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen 
        name="TripsList" 
        component={TripsListScreen} 
        options={{ title: 'My Trips' }}
      />
      <Stack.Screen 
        name="TripDetails" 
        component={TripDetailsScreen} 
        options={{ title: 'Trip Details' }}
      />
      <Stack.Screen 
        name="CreateTrip" 
        component={CreateTripScreen} 
        options={{ title: 'Create New Trip' }}
      />
      <Stack.Screen 
        name="EditTrip" 
        component={EditTripScreen} 
        options={{ title: 'Edit Trip' }}
      />
      <Stack.Screen 
        name="DayDetails" 
        component={DayDetailsScreen} 
        options={{ title: 'Day Details' }}
      />
      <Stack.Screen 
        name="AddActivity" 
        component={AddActivityScreen} 
        options={{ title: 'Add Activity' }}
      />
      <Stack.Screen 
        name="AddAccommodation" 
        component={AddAccommodationScreen} 
        options={{ title: 'Add Accommodation' }}
      />
      <Stack.Screen 
        name="ActivityDetails" 
        component={ActivityDetailsScreen} 
        options={{ title: 'Activity Details' }}
      />
      <Stack.Screen 
        name="AccommodationDetails" 
        component={AccommodationDetailsScreen} 
        options={{ title: 'Accommodation Details' }}
      />
      <Stack.Screen 
        name="ShareTrip" 
        component={ShareTripScreen} 
        options={{ title: 'Share Trip' }}
      />
      <Stack.Screen 
        name="ManageCollaborators" 
        component={ManageCollaboratorsScreen} 
        options={{ title: 'Manage Collaborators' }}
      />
    </Stack.Navigator>
  );
}; 
