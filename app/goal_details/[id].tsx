import ModalBottom from '@/components/GoalDetails/ModalBottom';
import MoreButton from '@/components/MoreButton';
import ThemedText from '@/components/ThemedComponents/ThemedText';
import ThemedView from '@/components/ThemedComponents/ThemedView';
import useGoals from '@/hooks/useGoals';
import { router, type UnknownOutputParams } from 'expo-router';
import { useLocalSearchParams } from 'expo-router/build/hooks';
import React, { useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import AddButton from '@/components/AddButton';
import useMilestones from '@/hooks/useMilestones';
import SummaryMilestone from '@/components/GoalDetails/SummaryMilestone';
import HeaderGoalDetails from '@/components/GoalDetails/HeaderGoalDetails';
import ModalChangeStatus from '@/components/GoalDetails/ModalChangeStatus';
import ModalDelete from '@/components/ModalDelete';

export interface GoalDetailsScreenParams extends UnknownOutputParams {
  id: string;
}

const GoalDetails = () => {
  const { id } = useLocalSearchParams<GoalDetailsScreenParams>();
  const { goals, removeGoal } = useGoals({ id: Number(id) });
  const [isModalBottomVisible, setIsModalBottomVisible] = useState<boolean>(false);
  const [isModalChangeStatusVisible, setIsModalChangeStatusVisible] = useState<boolean>(false);
  const [isModalDeleteVisible, setIsModalDeleteVisible] = useState<boolean>(false);

  const { milestones } = useMilestones(Number(id));

  const openBottomModal = () => {
    setIsModalBottomVisible(true);
  };

  const dismissBottomModal = () => {
    setIsModalBottomVisible(false);
  };

  const onChangeStatus = () => {
    setIsModalChangeStatusVisible(true);
  };

  const dismissChangeStatusModal = () => {
    setIsModalChangeStatusVisible(false);
  };

  const openModalDelete = () => {
    setIsModalDeleteVisible(true);
  };

  const dismissModalDelete = () => {
    setIsModalDeleteVisible(false);
  };

  if (!goals || !goals[0]) {
    //TODO loading
    return <ThemedView />;
  }

  const goal = goals[0];

  const onDeleteGoal = async () => {
    await removeGoal(goal.id);
    router.dismissTo('/');
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
        <MoreButton onPress={openBottomModal} />
      </ThemedView>

      <FlatList
        data={milestones}
        contentContainerStyle={styles.flatList}
        keyExtractor={(goal) => goal.id.toString()}
        renderItem={({ item }) => {
          return <SummaryMilestone key={item.id} milestone={item} />;
        }}
        ListHeaderComponent={<HeaderGoalDetails goal={goal} />}
        showsVerticalScrollIndicator={false}
      />
      <AddButton onPress={onAddMilestone} />
      <ModalBottom
        onChangeStatus={onChangeStatus}
        isVisible={isModalBottomVisible}
        dismiss={dismissBottomModal}
        onDeleteGoal={openModalDelete}
      />
      <ModalChangeStatus
        isVisible={isModalChangeStatusVisible}
        dismiss={dismissChangeStatusModal}
        goal={goal}
      />
      <ModalDelete
        isVisible={isModalDeleteVisible}
        dismiss={dismissModalDelete}
        onDelete={onDeleteGoal}
      />
    </ThemedView>
  );
};

export default GoalDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatList: {
    gap: 15,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
  },
});
