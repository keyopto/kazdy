import CustomDatePicker from '@/components/CustomDatePicker';
import ThemedView from '@/components/ThemedView';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';

export type AddGoalProps = {
  __placeholder?: never;
};

const AddGoal: React.FC<AddGoalProps> = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);

  const { t } = useTranslation();

  return (
    <ThemedView style={styles.container}>
      <CustomDatePicker
        mode="date"
        date={date}
        setDate={setDate}
        placeholder={t('add_goal.placeholder_date')}
      />
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
