import AddButton from '@/components/AddButton';
import ThemedText from '@/components/ThemedText';
import ThemedView from '@/components/ThemedView';
import React from 'react';
import { StyleSheet } from 'react-native';

export default function Index() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText>Coucou</ThemedText>
      <AddButton onPress={() => {}} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
