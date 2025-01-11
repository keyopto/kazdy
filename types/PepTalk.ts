export type PepTalk = {
  id: number;
  title: string | null;
  date: Date;
  uri: string;
  goalId: number;
};

export type PepTalkRedux = {
  id: number;
  title: string | null;
  date: string;
  uri: string;
  goalId: number;
};
