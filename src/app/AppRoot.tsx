import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function AppRoot() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <Text style={styles.title}>AuthShield</Text>
      <Text style={styles.subtitle}>Step 1 complete ✅</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: '700',
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
  },
});
