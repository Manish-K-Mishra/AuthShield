import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { AppStackParamList } from './types'
import HomeScreen from '../screens/App/HomeScreen';
import SettingsScreen from '../screens/App/SettingsScreen';

const Stack = createNativeStackNavigator<AppStackParamList>();

export default function AppStack(){
  return (
    <Stack.Navigator>
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='Settings' component={SettingsScreen} />
    </Stack.Navigator>
  )
}