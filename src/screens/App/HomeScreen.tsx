import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../navigation/types';
import { View, StyleSheet, Text, Button } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { fetchUser } from '../../services/userApi';
import { errorMessage } from '../../utils/errorMessages';
import { toAppError } from '../../services/errorMapper';

type props = NativeStackScreenProps<AppStackParamList, 'Home'>;
export default function HomeScreen({ navigation }: props) {
  const {data, isLoading, error, refetch} = useQuery({
    queryKey: ['user', 1],
    queryFn: () => fetchUser(1),
  })
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Home</Text>
      {isLoading ? <Text> Loading user...</Text> : null}
      {error ? (
        <Text>{errorMessage(toAppError(error))}</Text>
      ) : (
        <Text>{data ? `Welcome, ${data.name}` : 'No data'}</Text>
      )}
      <Button title='Refetch' onPress={() => refetch()} />
      <Button title="Go to settings" onPress={() => navigation.navigate('Settings')} />
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
