import CustomDatePicker from '@/components/CustomDatePicker';
import CustomTextInput from '@/components/CustomTextInput';
import ThemedView from '@/components/ThemedView';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';

export type AddGoalProps = {
  __placeholder?: never;
};

const AddGoal: React.FC<AddGoalProps> = () => {
  const [title, setTitle] = useState<string>('');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [description, setDescription] = useState<string>('');

  const { t } = useTranslation();

  return (
    <ThemedView style={styles.container}>
      <CustomTextInput
        placeholder={t('add_goal.placeholder_title')}
        value={title}
        setValue={setTitle}
      />

      <CustomDatePicker
        mode="date"
        date={date}
        setDate={setDate}
        placeholder={t('add_goal.placeholder_date')}
      />

      <CustomTextInput
        placeholder={t('add_goal.placeholder_description')}
        value={description}
        setValue={setDescription}
        multiline={true}
      />
    </ThemedView>
  );
};

export default AddGoal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    padding: 20,
  },
});
