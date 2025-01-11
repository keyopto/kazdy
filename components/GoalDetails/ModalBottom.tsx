import React from 'react';
import ModalBottomLayout from '../ModalBottomLayout';
import type { Goal } from '@/types/Goal';
import { router } from 'expo-router';
import DeleteButton from '../DeleteButton';
import useGoals from '@/hooks/useGoals';
import ThemedButton from '../ThemedComponents/ThemedButton';
import { useTranslation } from 'react-i18next';

export type ModalBottomProps = {
  isVisible: boolean;
  dismiss: () => void;
  goal: Goal;
  onChangeStatus: () => void;
};

const ModalBottom: React.FC<ModalBottomProps> = ({ isVisible, dismiss, goal, onChangeStatus }) => {
  const { t } = useTranslation();

  const { removeGoal } = useGoals({});

  const onDeleteGoal = async () => {
    await removeGoal(goal.id);
    dismiss();
    router.dismissTo('/');
  };

  const onPressChangeStatus = () => {
    dismiss();
    onChangeStatus();
  };

  return (
    <ModalBottomLayout isVisible={isVisible} dismiss={dismiss}>
      <ThemedButton
        onPress={onPressChangeStatus}
        iconName="checklist"
        title={t('goal_details.change_status')}
      />
      <DeleteButton onPress={onDeleteGoal} />
    </ModalBottomLayout>
  );
};

export default ModalBottom;
