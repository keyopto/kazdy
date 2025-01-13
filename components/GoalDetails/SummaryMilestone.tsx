import type { Milestone } from '@/types/Milestone';
import React from 'react';
import ThemedView from '../ThemedComponents/ThemedView';
import { StyleSheet } from 'react-native';
import ThemedText from '../ThemedComponents/ThemedText';
import formatDate from '@/utils/formatDate';
import ThemedIconButton from '../ThemedComponents/ThemedIconButton';
import MilestoneStatus from '@/enums/MilestoneStatus';
import ThemedIconSymbol from '../ThemedComponents/ThemedIconSymbol';
import { useTranslation } from 'react-i18next';
import useMilestones from '@/hooks/useMilestones';

export type SummaryMilestoneProps = {
  milestone: Milestone;
};

const SummaryMilestone: React.FC<SummaryMilestoneProps> = ({ milestone }) => {
  const { t } = useTranslation();

  const { changeStatusMilestone } = useMilestones();

  const onChangeStatus = async (status: MilestoneStatus) => {
    await changeStatusMilestone(milestone, status);
  };

  const getSecondPart = () => {
    if (milestone.status === MilestoneStatus.ON_GOING) {
      return (
        <ThemedView style={styles.buttons}>
          <ThemedIconButton
            style={styles.button_item}
            iconName="checklist"
            themeColor="correct"
            onPress={() => onChangeStatus(MilestoneStatus.COMPLETED)}
          />
          <ThemedIconButton
            style={styles.button_item}
            iconName="cross.fill"
            themeColor="text_error"
            onPress={() => onChangeStatus(MilestoneStatus.GIVEN_UP)}
          />
        </ThemedView>
      );
    }

    if (milestone.status === MilestoneStatus.COMPLETED) {
      return (
        <ThemedView style={styles.status_container}>
          <ThemedIconSymbol name="checklist" themeColor="correct" />
          <ThemedText> {t('goal_details.status_milestone_completed')} </ThemedText>
        </ThemedView>
      );
    }

    if (milestone.status === MilestoneStatus.GIVEN_UP) {
      return (
        <ThemedView style={styles.status_container}>
          <ThemedIconSymbol name="cross.fill" themeColor="text_error" />
          <ThemedText> {t('goal_details.status_milestone_failed')} </ThemedText>
        </ThemedView>
      );
    }

    return null;
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.informationContainer}>
        <ThemedText style={styles.title}>{milestone.title}</ThemedText>
        <ThemedText style={styles.date}>Pour le {formatDate(milestone.date)}</ThemedText>
      </ThemedView>
      {getSecondPart()}
    </ThemedView>
  );
};

export default SummaryMilestone;

const styles = StyleSheet.create({
  button_item: {
    padding: 15,
  },
  buttons: {
    flexDirection: 'row',
    gap: 5,
  },
  container: {
    alignItems: 'center',
    borderRadius: 15,
    flexDirection: 'row',
    minHeight: 100,
    overflow: 'hidden',
    padding: 10,
  },
  date: {
    fontWeight: 'bold',
  },
  informationContainer: {
    flex: 1,
    gap: 5,
  },
  status_container: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
});
