import React from 'react';
import ModalBottomLayout from '../ModalBottomLayout';
import DeleteButton from '../DeleteButton';
import ThemedButton from '../ThemedComponents/ThemedButton';
import { useTranslation } from 'react-i18next';

export type ModalBottomProps = {
  isVisible: boolean;
  dismiss: () => void;
  onChangeStatus: () => void;
  onDeleteGoal: () => void;
};

const ModalBottom: React.FC<ModalBottomProps> = ({
  isVisible,
  dismiss,
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

  return (
    <ModalBottomLayout isVisible={isVisible} dismiss={dismiss}>
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
