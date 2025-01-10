import { insertMilestone } from '@/db/milestonesDB';
import type { FormDataAddMilestone } from '@/types/forms/AddMilestoneForm';

export type useMilestonesType = {
  addMilestone: (milestone: FormDataAddMilestone & { goalId: number }) => Promise<void>;
};

const useMilestones = (): useMilestonesType => {
  const addMilestone = async (milestone: FormDataAddMilestone & { goalId: number }) => {
    await insertMilestone(milestone);
  };

  return {
    addMilestone,
  };
};

export default useMilestones;
