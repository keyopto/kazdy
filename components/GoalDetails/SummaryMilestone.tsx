import type { Milestone } from '@/types/Milestone';
import React from 'react';
import ThemedView from '../ThemedComponents/ThemedView';
import DefaultImage from '@/assets/images/default_goal.jpg';
import { ImageBackground, StyleSheet } from 'react-native';
import ThemedText from '../ThemedComponents/ThemedText';
import formatDate from '@/utils/formatDate';

export type SummaryMilestoneProps = {
  milestone: Milestone;
};

const SummaryMilestone: React.FC<SummaryMilestoneProps> = ({ milestone }) => {
  return (
    <ThemedView style={styles.container}>
      <ImageBackground source={DefaultImage} style={styles.image}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText style={styles.title}>{milestone.title}</ThemedText>
        </ThemedView>

        <ThemedView style={styles.dateContainer}>
          <ThemedText style={styles.date}>{formatDate(milestone.date)}</ThemedText>
        </ThemedView>
      </ImageBackground>
    </ThemedView>
  );
};

export default SummaryMilestone;

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
