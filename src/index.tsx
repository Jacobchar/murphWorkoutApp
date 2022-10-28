import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {StartingScreen, WorkoutScreen, HistoryScreen} from './screens';
import {LogBox} from 'react-native';

export type StackParamList = {
  StartingScreen: undefined;
  WorkoutScreen: undefined;
  HistoryScreen: undefined;
};

LogBox.ignoreAllLogs();

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomePage"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="HomePage" component={StartingScreen} />
        <Stack.Screen name="WorkoutPage" component={WorkoutScreen} />
        <Stack.Screen name="HistoryPage" component={HistoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
