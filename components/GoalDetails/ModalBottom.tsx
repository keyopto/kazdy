import React from 'react';
import ModalBottomLayout from '../ModalBottomLayout';
import type { Goal } from '@/types/Goal';
import { router } from 'expo-router';
import DeleteButton from '../DeleteButton';
import useGoals from '@/hooks/useGoals';

export type ModalBottomProps = {
  isVisible: boolean;
  dismiss: () => void;
  goal: Goal;
};

const ModalBottom: React.FC<ModalBottomProps> = ({ isVisible, dismiss, goal }) => {
  const { removeGoal } = useGoals();

  const onDeleteGoal = async () => {
    await removeGoal(goal.id);
    dismiss();
    router.dismissTo('/');
  };

  return (
    <ModalBottomLayout isVisible={isVisible} dismiss={dismiss}>
      <DeleteButton onPress={onDeleteGoal} />
    </ModalBottomLayout>
  );
};

export default ModalBottom;
