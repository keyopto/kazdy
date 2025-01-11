import type { Goal } from '@/types/Goal';
import React from 'react';
import ModalCenterLayout from '../ModalCenterLayout';
import ThemedText from '../ThemedComponents/ThemedText';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import ThemedIconButton from '../ThemedComponents/ThemedIconButton';
import ThemedView from '../ThemedComponents/ThemedView';
import GoalStatus from '@/enums/GoalStatus';
import useGoals from '@/hooks/useGoals';

export type ModalChangeStatusProps = {
  isVisible: boolean;
  dismiss: () => void;
  goal: Goal;
};

const ModalChangeStatus: React.FC<ModalChangeStatusProps> = ({ isVisible, dismiss, goal }) => {
  const { t } = useTranslation();

  const { changeStatusGoal } = useGoals({});

  const changeStatus = async (newStatus: GoalStatus) => {
    await changeStatusGoal(goal, newStatus);
    dismiss();
  };

  return (
    <ModalCenterLayout isVisible={isVisible} dismiss={dismiss}>
      <ThemedText style={styles.question}>{t('goal_details.status_question')}</ThemedText>
      <ThemedView style={styles.buttonsContainer} themeColor="transparent">
        <ThemedIconButton
          iconName="checklist"
          themeColor="correct"
          onPress={() => changeStatus(GoalStatus.COMPLETED)}
        />
        <ThemedIconButton
          iconName="cross.fill"
          themeColor="text_error"
          onPress={() => changeStatus(GoalStatus.GIVEN_UP)}
        />
      </ThemedView>
    </ModalCenterLayout>
  );
};

export default ModalChangeStatus;

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 40,
  },
  question: {
    textAlign: 'center',
  },
});
