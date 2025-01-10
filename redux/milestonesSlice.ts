import { selectAllMilestones } from '@/db/milestonesDB';
import type { Milestone } from '@/types/Milestone';
import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface MilestoneState {
  list: Milestone[];
  loading: boolean;
  error: string | null;
}

const initialState: MilestoneState = {
  list: [],
  loading: false,
  error: null,
};

export const fetchMilestones = createAsyncThunk<Milestone[]>('milestone/getAll', async () => {
  return await selectAllMilestones();
});

const milestonesSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {
    addMilestoneRedux(state, action: PayloadAction<Milestone>) {
      state.list.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMilestones.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMilestones.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchMilestones.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { addMilestoneRedux } = milestonesSlice.actions;
export default milestonesSlice.reducer;
