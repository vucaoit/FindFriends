import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainTabNavigation } from './MainTabNavigation';

const Stack = createNativeStackNavigator();

export type NavigationScreenType =
  | 'MainTabNavigation'
  | 'Cart'
  | 'Search'
  | 'ProductDetail'
  | 'RatingDetail';

export function navigate<T extends { title: string }>(
  navigation: any,
  destination: NavigationScreenType,
  data?: T,
  type: 'navigate' | 'push' = 'navigate',
) {
  if (type === 'navigate') {
    navigation.navigate(destination, data);
  } else {
    navigation.push(destination, data);
  }
}

export const AppNavigation = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="MainTabNavigation"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="MainTabNavigation" component={MainTabNavigation} />
    </Stack.Navigator>
  </NavigationContainer>
);
