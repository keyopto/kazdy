import AddButton from '@/components/AddButton';
import ThemedText from '@/components/ThemedComponents/ThemedText';
import ThemedView from '@/components/ThemedComponents/ThemedView';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';

export default function Index() {
  const router = useRouter();

  const onPressAdd = () => {
    router.push('/add_goal');
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText>Coucou</ThemedText>
      <AddButton onPress={onPressAdd} />
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
