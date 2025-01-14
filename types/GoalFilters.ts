import type GoalStatus from '@/enums/GoalStatus';

export type GoalFilters = {
  id?: number;
  status?: GoalStatus;
};
