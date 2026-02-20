import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import AuthStack from '../navigation/AuthStack';
import { AuthProvider, useAuth } from '../screens/Auth/AuthContext';
import AppStack from '../navigation/AppStack';
import QueryProvider from './QueryProvider';
import { ActivityIndicator, View } from 'react-native';

function RootNavigator() {
  const { isLoggedIn, isBootstraping } = useAuth();

  if (isBootstraping) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

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
