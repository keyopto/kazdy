import ThemedView from '@/components/ThemedComponents/ThemedView';
import AddGoalForm, { type FormDataAddGoal } from '@/types/forms/AddGoalForm';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import ControllerTextInput from '@/components/ControllerInputs/ControllerTextInput';
import ControllerDatePicker from '@/components/ControllerInputs/ControllerDatePicker';
import ThemedButton from '@/components/ThemedComponents/ThemedButton';
import { router } from 'expo-router';
import useGoals from '@/hooks/useGoals';
import ControllerImagePicker from '@/components/ControllerInputs/ControllerImagePicker';

export type AddGoalProps = {
  __placeholder?: never;
};

const AddGoal: React.FC<AddGoalProps> = () => {
  const { t } = useTranslation();
  const { addGoal } = useGoals({});

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataAddGoal>({
    resolver: zodResolver(AddGoalForm(t)),
  });

  const getDefaultDate = () => {
    const defaultDate = new Date();

    defaultDate.setFullYear(defaultDate.getFullYear() + 1);

    return defaultDate;
  };

  const onSubmit = async (goal: FormDataAddGoal) => {
    await addGoal(goal);
    router.dismissTo('/');
  };

  return (
    <ThemedView themeColor="background" style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <ThemedView style={styles.insideScrollView}>
          <ControllerTextInput
            control={control}
            name="title"
            placeholder={t('add_goal.placeholder_title')}
            error={errors.title}
            label={t('add_goal.label_title')}
          />
          <ControllerImagePicker control={control} name="image" error={errors.image} />
          <ControllerDatePicker
            control={control}
            name="date"
            placeholder={t('add_goal.placeholder_date')}
            label={t('add_goal.label_date')}
            mode="date"
            error={errors.date}
            defaultDate={getDefaultDate()}
          />
          <ControllerTextInput
            control={control}
            name="description"
            placeholder={t('add_goal.placeholder_description')}
            error={errors.description}
            label={t('add_goal.label_description')}
            multiline
          />
        </ThemedView>
      </ScrollView>

      <ThemedButton type="submit" title="Submit" onPress={handleSubmit(onSubmit)} />
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
  insideScrollView: {
    gap: 20,
  },
  scrollView: {
    flex: 1,
  },
});
