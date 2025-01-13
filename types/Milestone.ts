import type MilestoneStatus from '@/enums/MilestoneStatus';

export type Milestone = {
  id: number;
  title: string;
  date: Date;
  goalId: number;
  status: MilestoneStatus;
};

export type MilestoneRedux = {
  id: number;
  title: string;
  date: string;
  goalId: number;
  status: MilestoneStatus;
};
