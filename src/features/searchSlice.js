import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    results: [],
  }

const liveSearchSlice = createSlice({
  name: 'liveSearch',
  initialState,
  reducers: {
    setResults: (state, action) => {
      state.results = action.payload;
    },
  },
});

export const { setResults } = liveSearchSlice.actions;
export default liveSearchSlice.reducer;