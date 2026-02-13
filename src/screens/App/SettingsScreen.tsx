import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../navigation/types';
import { View, StyleSheet, Text, Button } from 'react-native';
import { useAuth } from '../Auth/AuthContext';

type props = NativeStackScreenProps<AppStackParamList, 'Settings'>;
export default function SettingsScreen({ navigation }: props) {
  const { logoutMock } = useAuth();
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Settings</Text>
      <Text>Settings Page Placeholders</Text>

      <Button title="Back" onPress={logoutMock} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 12,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 700,
  },
});
