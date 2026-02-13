import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import AuthStack from '../navigation/AuthStack';
import { AuthProvider, useAuth } from '../screens/Auth/AuthContext';
import AppStack from '../navigation/AppStack';
import QueryProvider from './QueryProvider';

function RootNavigator() {
  const {isLoggedIn} = useAuth();
  return isLoggedIn ? <AppStack /> : <AuthStack />;
}
export default function AppRoot() {
  
  return (
    <QueryProvider>
      <AuthProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </AuthProvider>
    </QueryProvider>
  );
}
