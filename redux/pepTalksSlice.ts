import { selectAllPepTalks } from '@/db/pepTalksDB';
import type { PepTalkRedux } from '@/types/PepTalk';
import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface PepTalkState {
  list: PepTalkRedux[];
  loading: boolean;
  error: string | null;
}

const initialState: PepTalkState = {
  list: [],
  loading: false,
  error: null,
};

export const fetchPepTalks = createAsyncThunk<PepTalkRedux[]>('pepTalks/getAll', async () => {
  return await selectAllPepTalks();
});

const pepTalksSlice = createSlice({
  name: 'pepTalks',
  initialState,
  reducers: {
    addPepTalkRedux(state, action: PayloadAction<PepTalkRedux>) {
      state.list.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPepTalks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPepTalks.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchPepTalks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { addPepTalkRedux } = pepTalksSlice.actions;
export default pepTalksSlice.reducer;
