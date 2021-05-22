import * as React from 'react';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, View, StyleSheet } from 'react-native';

// You can import from local files
import HomeView from './components/HomeViewScreen';
import HistoryView from './components/HistoryScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeView}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="HistoryView"
          component={HistoryView}
          options={{
            title: 'HistoryView',
            headerStyle: {
              backgroundColor: 'purple',
            },
            headerTintColor: 'white',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}