import { selectAllGoals } from '@/db/goalsDB';
import type { Goal } from '@/types/Goal';
import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface GoalState {
  list: Goal[];
  loading: boolean;
  error: string | null;
}

const initialState: GoalState = {
  list: [],
  loading: false,
  error: null,
};

export const fetchGoals = createAsyncThunk<Goal[]>('goals/getAll', async () => {
  return selectAllGoals();
});

const goalsSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {
    addGoalRedux(state, action: PayloadAction<Goal>) {
      state.list.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGoals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGoals.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchGoals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { addGoalRedux } = goalsSlice.actions;
export default goalsSlice.reducer;
