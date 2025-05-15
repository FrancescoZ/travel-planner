import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from './types';
import { AuthNavigator } from './AuthNavigator';
import { MainTabNavigator } from './MainTabNavigator';
import { StatusBar } from 'react-native';
import { useAuthState } from '../hooks/useAuthState'; // We'll create this hook later

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  // Mock authenticated state (we'll replace this with real auth later)
  const { isAuthenticated, isLoading } = useAuthState();
  
  if (isLoading) {
    // We'll create a loading screen later
    return null;
  }
  
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name="Main" component={MainTabNavigator} />
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}; 
