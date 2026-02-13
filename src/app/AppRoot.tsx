import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import AuthStack from '../navigation/AuthStack';
import { AuthProvider, useAuth } from '../screens/Auth/AuthContext';
import AppStack from '../navigation/AppStack';

function RootNavigator() {
  const {isLoggedIn} = useAuth();
  return isLoggedIn ? <AppStack /> : <AuthStack />;
}
export default function AppRoot() {
  
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
    
  );
}
