import ModalBottom from '@/components/GoalDetails/ModalBottom';
import MoreButton from '@/components/MoreButton';
import ThemedText from '@/components/ThemedComponents/ThemedText';
import ThemedView from '@/components/ThemedComponents/ThemedView';
import useGoals from '@/hooks/useGoals';
import type { Goal } from '@/types/Goal';
import formatDate from '@/utils/formatDate';
import { router, type UnknownOutputParams } from 'expo-router';
import { useLocalSearchParams } from 'expo-router/build/hooks';
import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import DefaultImage from '@/assets/images/default_goal.jpg';
import { useTranslation } from 'react-i18next';
import AddButton from '@/components/AddButton';

export interface GoalDetailsScreenParams extends UnknownOutputParams {
  id: string;
}

const GoalDetails = () => {
  const { id } = useLocalSearchParams<GoalDetailsScreenParams>();
  const { getGoalById } = useGoals();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const { t } = useTranslation();

  const [goal, setGoal] = useState<Goal>();

  const openModal = () => {
    setIsModalVisible(true);
  };

  const dismissModal = () => {
    setIsModalVisible(false);
  };

  const setup = async () => {
    const goalFromDB = await getGoalById(Number(id));

    if (!goalFromDB) {
      throw new Error('goal not found in db');
    }

    setGoal(goalFromDB);
  };

  useEffect(() => {
    setup();
  }, [id]);

  if (!goal) {
    //TODO loading
    return <ThemedView />;
  }

  const getSourceImage = () => {
    if (!goal.image) {
      return DefaultImage;
    }
    return { uri: goal.image };
  };

  const onAddMilestone = () => {
    router.push({
      pathname: '/milestone/add',
      params: {
        goalId: goal.id.toString(),
      },
    });
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText style={styles.title}> {goal.title}</ThemedText>
        <MoreButton onPress={openModal} />
      </ThemedView>
      <ImageBackground source={getSourceImage()} style={styles.image} />
      <ThemedView style={styles.dateContainer}>
        <ThemedText style={styles.dDay}> {t('goal_details.d_day')} </ThemedText>
        <ThemedText style={styles.date}> {formatDate(goal.date)} </ThemedText>
      </ThemedView>
      <ThemedView style={styles.descriptionContainer}>
        <ThemedText> {t('goal_details.description')}</ThemedText>
        <ThemedText> {goal.description} </ThemedText>
      </ThemedView>
      <AddButton onPress={onAddMilestone} />
      <ModalBottom isVisible={isModalVisible} dismiss={dismissModal} goal={goal} />
    </ThemedView>
  );
};

export default GoalDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dDay: {
    fontSize: 15,
  },
  date: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  dateContainer: {
    alignItems: 'center',
  },
  descriptionContainer: {
    gap: 10,
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    height: 200,
    marginVertical: 10,
  },
  title: {
    fontSize: 20,
  },
});
