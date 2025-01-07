import CustomDatePicker from '@/components/CustomDatePicker';
import ThemedView from '@/components/ThemedView';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

export type AddGoalProps = {
  __placeholder?: never;
};

const AddGoal: React.FC<AddGoalProps> = () => {
  const [date, setDate] = useState<Date>(new Date());

  return (
    <ThemedView style={styles.container}>
      <CustomDatePicker mode="date" date={date} setDate={setDate} />
    </ThemedView>
  );
};

export default AddGoal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
