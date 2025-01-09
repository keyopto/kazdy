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
    removeGoalRedux(state, action: PayloadAction<number>) {
      const index = state.list.findIndex((goal) => goal.id === action.payload);
      if (index === -1) {
        throw new Error('Cannot remove goal : not found id');
      }
      state.list.splice(index, 1);
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

export const { addGoalRedux, removeGoalRedux } = goalsSlice.actions;
export default goalsSlice.reducer;
