import type GoalStatus from '@/enums/GoalStatus';

export type Goal = {
  id: number;
  title: string;
  date: Date;
  description: string;
  image: string | null;
  status: GoalStatus;
};

export type GoalRedux = {
  id: number;
  title: string;
  description: string;
  image: string | null;
  status: GoalStatus;
  date: string;
};
