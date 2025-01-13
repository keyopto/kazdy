import { selectAllMilestones } from '@/db/milestonesDB';
import type { MilestoneRedux } from '@/types/Milestone';
import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface MilestoneState {
  list: MilestoneRedux[];
  loading: boolean;
  error: string | null;
}

const initialState: MilestoneState = {
  list: [],
  loading: false,
  error: null,
};

export const fetchMilestones = createAsyncThunk<MilestoneRedux[]>('milestone/getAll', async () => {
  return await selectAllMilestones();
});

const milestonesSlice = createSlice({
  name: 'milestones',
  initialState,
  reducers: {
    addMilestoneRedux(state, action: PayloadAction<MilestoneRedux>) {
      state.list.push(action.payload);
    },
    modifyMilestoneRedux(state, action: PayloadAction<MilestoneRedux>) {
      const index = state.list.findIndex((milestone) => milestone.id === action.payload.id);
      if (index === -1) {
        throw new Error('Cannot modify goal : not found id');
      }
      state.list[index] = { ...action.payload };
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

export const { addMilestoneRedux, modifyMilestoneRedux } = milestonesSlice.actions;
export default milestonesSlice.reducer;
