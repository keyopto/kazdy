import ThemedView from '@/components/ThemedView';
import React from 'react';
import { StyleSheet } from 'react-native';

export type AddGoalProps = {
  __placeholder?: never;
};

const AddGoal: React.FC<AddGoalProps> = () => {
  return <ThemedView style={styles.container}></ThemedView>;
};

export default AddGoal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
