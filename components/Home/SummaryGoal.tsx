import type { Goal } from '@/types/Goal';
import React from 'react';
import ThemedText from '../ThemedComponents/ThemedText';
import ThemedPressable from '../ThemedComponents/ThemedPressable';
import { router } from 'expo-router';
import { ImageBackground, StyleSheet } from 'react-native';
import ThemedView from '../ThemedComponents/ThemedView';
import DefaultImage from '@/assets/images/default_goal.jpg';
import formatDate from '@/utils/formatDate';

export type SummaryGoalProps = {
  goal: Goal;
};

const SummaryGoal: React.FC<SummaryGoalProps> = ({ goal }) => {
  const goToDetails = () => {
    router.push({
      pathname: `/goal_details/[id]`,
      params: {
        id: goal.id.toString(),
      },
    });
  };

  const getSourceImage = () => {
    if (!goal.image) {
      return DefaultImage;
    }
    return { uri: goal.image };
  };

  return (
    <ThemedPressable onPress={goToDetails} style={styles.container}>
      <ImageBackground source={getSourceImage()} style={styles.image}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText style={styles.title}>{goal.title}</ThemedText>
        </ThemedView>

        <ThemedView style={styles.dateContainer}>
          <ThemedText style={styles.date}>{formatDate(goal.date)}</ThemedText>
        </ThemedView>
      </ImageBackground>
    </ThemedPressable>
  );
};

export default SummaryGoal;

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    minHeight: 100,
    overflow: 'hidden',
  },
  date: {
    fontWeight: 'bold',
  },
  dateContainer: {
    borderRadius: 15,
    bottom: 10,
    paddingHorizontal: 10,
    position: 'absolute',
    right: 10,
  },
  image: {
    flex: 1,
    flexDirection: 'row',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  titleContainer: {
    justifyContent: 'center',
    opacity: 0.7,
    width: '40%',
  },
});
