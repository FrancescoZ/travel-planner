import { NavigatorScreenParams } from '@react-navigation/native';
import { FullTrip, Trip } from '../types';

// Auth stack params
export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

// Main tab navigator params
export type MainTabParamList = {
  Trips: NavigatorScreenParams<TripsStackParamList>;
  Profile: undefined;
};

// Trips stack params
export type TripsStackParamList = {
  TripsList: undefined;
  TripDetails: { tripId: string };
  CreateTrip: undefined;
  EditTrip: { tripId: string };
  DayDetails: { tripId: string; dayIndex: number };
  AddActivity: { tripId: string; dayIndex: number };
  AddAccommodation: { tripId: string; dayIndex: number };
  ActivityDetails: { tripId: string; dayIndex: number; activityId: string };
  AccommodationDetails: { tripId: string; dayIndex: number; accommodationId: string };
  ShareTrip: { tripId: string };
  ManageCollaborators: { tripId: string };
};

// Root navigator params (combining auth and main)
export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
}; 
