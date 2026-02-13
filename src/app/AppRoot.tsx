import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import AuthStack from '../navigation/AuthStack';

export default function AppRoot() {
  const isLoggedIn = false
  return (
    <NavigationContainer>
      {isLoggedIn? null : <AuthStack />}
    </NavigationContainer>
  );
}
