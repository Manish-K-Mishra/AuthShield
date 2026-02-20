import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../navigation/types';
import { View, StyleSheet, Text, Button } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { fetchUser } from '../../services/userApi';
import { errorMessage } from '../../utils/errorMessages';
import { toAppError } from '../../services/errorMapper';
import { secureStorage } from '../../services/storage';
import { STORAGE_CONFIG } from '../../services/storage/storageConfig';
import { STORAGE_KEYS } from '../../services/storage/keys';

type props = NativeStackScreenProps<AppStackParamList, 'Home'>;
export default function HomeScreen({ navigation }: props) {
  console.log('HomeScreen render');

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['user', 1],
    queryFn: () => fetchUser(1),
  });
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Home</Text>
      {isLoading ? <Text> Loading user...</Text> : null}
      {error ? (
        <Text>{errorMessage(toAppError(error))}</Text>
      ) : (
        <Text>{data ? `Welcome, ${data.name}` : 'No data'}</Text>
      )}
      <Button title="Refetch" onPress={() => refetch()} />
      <Button title="Go to settings" onPress={() => navigation.navigate('Settings')} />
      <Button
        title="Save dummy token"
        onPress={async () => {
          await secureStorage.set(STORAGE_KEYS.accessToken, 'dummy-token-123');
        }}
      />

      <Button
        title="Read dummy token (console)"
        onPress={async () => {
          const t = await secureStorage.get(STORAGE_KEYS.accessToken);
          console.log('TOKEN:', t);
        }}
      />

      <Button
        title="Remove token"
        onPress={async () => {
          await secureStorage.remove(STORAGE_KEYS.accessToken);
        }}
      />
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
