import React from 'react';
import ModalBottomLayout from '../ModalBottomLayout';
import DeleteButton from '../DeleteButton';
import ThemedButton from '../ThemedComponents/ThemedButton';
import { useTranslation } from 'react-i18next';
import { router } from 'expo-router';
import type { Goal } from '@/types/Goal';

export type ModalBottomProps = {
  isVisible: boolean;
  dismiss: () => void;
  goal: Goal;
  onChangeStatus: () => void;
  onDeleteGoal: () => void;
  onEditGoal: () => void;
};

const ModalBottom: React.FC<ModalBottomProps> = ({
  isVisible,
  dismiss,
  goal,
  onChangeStatus,
  onDeleteGoal,
}) => {
  const { t } = useTranslation();

  const onPressDeleteGoal = () => {
    dismiss();
    onDeleteGoal();
  };

  const onPressChangeStatus = () => {
    dismiss();
    onChangeStatus();
  };

  const onEditGoal = () => {
    dismiss();
    router.push({
      pathname: '/goal/modify',
      params: {
        goalId: goal.id,
      },
    });
  };

  const onPressPepTalks = () => {
    dismiss();
    router.push({
      pathname: '/pep_talk',
      params: {
        goalId: goal.id,
      },
    });
  };

  return (
    <ModalBottomLayout isVisible={isVisible} dismiss={dismiss}>
      <ThemedButton title={t('goal_details.modify_goal')} iconName="pencil" onPress={onEditGoal} />
      <ThemedButton
        title={t('goal_details.pep_talk')}
        iconName="audio.jack.mono"
        onPress={onPressPepTalks}
      />
      <ThemedButton
        onPress={onPressChangeStatus}
        iconName="checklist"
        title={t('goal_details.change_status')}
      />
      <DeleteButton onPress={onPressDeleteGoal} />
    </ModalBottomLayout>
  );
};

export default ModalBottom;
