import { insertMilestone, selectMilestoneFromId } from '@/db/milestonesDB';
import type { FormDataAddMilestone } from '@/types/forms/AddMilestoneForm';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';
import { selectorMilestonesFromGoalId } from '@/redux/selectors/milestoneSelector';
import { addMilestoneRedux, fetchMilestones } from '@/redux/milestonesSlice';
import { useEffect } from 'react';
import type { Milestone } from '@/types/Milestone';

export type useMilestonesType = {
  milestones: Milestone[];
  loading: boolean;
  error: string | null;
  addMilestone: (milestone: FormDataAddMilestone & { goalId: number }) => Promise<void>;
};

const useMilestones = (goalId: number): useMilestonesType => {
  const dispatch = useAppDispatch();
  const milestones = useAppSelector(selectorMilestonesFromGoalId(goalId));
  const loading = useAppSelector((state) => state.milestones.loading);
  const error = useAppSelector((state) => state.milestones.error);

  useEffect(() => {
    if (milestones.length === 0) {
      dispatch(fetchMilestones());
    }
  }, [milestones.length, dispatch]);

  const addMilestone = async (milestone: FormDataAddMilestone & { goalId: number }) => {
    const idInserted = await insertMilestone(milestone);
    const milestoneAdded = await selectMilestoneFromId(idInserted);
    if (!milestoneAdded) {
      throw new Error('Goal was not inserted');
    }
    dispatch(addMilestoneRedux(milestoneAdded));
  };

  return {
    milestones,
    loading,
    error,
    addMilestone,
  };
};

export default useMilestones;
