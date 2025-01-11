import type { PepTalk } from '@/types/PepTalk';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';
import { selectorPepTalksFromGoalId } from '@/redux/selectors/pepTalkSelector';
import { useEffect } from 'react';
import { addPepTalkRedux, fetchPepTalks } from '@/redux/pepTalksSlice';
import type { FormDataAddPepTalk } from '@/types/forms/AddPepTalkForm';
import { insertPepTalk, selectPepTalkFromId } from '@/db/pepTalksDB';

export type usePepTalksType = {
  pepTalks: PepTalk[];
  loading: boolean;
  error: string | null;
  addPepTalk: (milestone: FormDataAddPepTalk & { goalId: number; uri: string }) => Promise<void>;
};

const usePepTalks = ({ goalId }: { goalId: number }): usePepTalksType => {
  const dispatch = useAppDispatch();
  const pepTalks = useAppSelector(selectorPepTalksFromGoalId(goalId));
  const loading = useAppSelector((state) => state.pepTalks.loading);
  const error = useAppSelector((state) => state.pepTalks.error);

  useEffect(() => {
    if (pepTalks.length === 0) {
      dispatch(fetchPepTalks());
    }
  }, [pepTalks.length, dispatch]);

  const addPepTalk = async (pepTalk: FormDataAddPepTalk & { goalId: number; uri: string }) => {
    const idInserted = await insertPepTalk(pepTalk);
    const milestoneAdded = await selectPepTalkFromId(idInserted);
    if (!milestoneAdded) {
      throw new Error('PepTalk was not inserted');
    }
    dispatch(addPepTalkRedux(milestoneAdded));
  };

  return {
    pepTalks,
    loading,
    error,
    addPepTalk,
  };
};

export default usePepTalks;
