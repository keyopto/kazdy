import type { Goal } from '@/types/Goal';
import React from 'react';
import ThemedView from '../ThemedComponents/ThemedView';
import { ImageBackground, StyleSheet } from 'react-native';
import ThemedText from '../ThemedComponents/ThemedText';
import DefaultImage from '@/assets/images/default_goal.jpg';
import formatDate from '@/utils/formatDate';
import { useTranslation } from 'react-i18next';
import StatusDisplayer from './StatusDisplayer';

export type HeaderGoalDetailsProps = {
  goal: Goal;
};

const HeaderGoalDetails: React.FC<HeaderGoalDetailsProps> = ({ goal }) => {
  const { t } = useTranslation();

  const getSourceImage = () => {
    if (!goal.image) {
      return DefaultImage;
    }
    return { uri: goal.image };
  };

  return (
    <ThemedView>
      <ImageBackground source={getSourceImage()} style={styles.image}>
        <StatusDisplayer goal={goal} />
      </ImageBackground>
      <ThemedView style={styles.dateContainer}>
        <ThemedText style={styles.dDay}> {t('goal_details.d_day')} </ThemedText>
        <ThemedText style={styles.date}> {formatDate(goal.date)} </ThemedText>
      </ThemedView>
      <ThemedView style={styles.descriptionContainer}>
        <ThemedText> {t('goal_details.description')}</ThemedText>
        <ThemedText> {goal.description} </ThemedText>
      </ThemedView>
    </ThemedView>
  );
};

export default HeaderGoalDetails;

const styles = StyleSheet.create({
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
  image: {
    height: 200,
    marginBottom: 10,
  },
});
