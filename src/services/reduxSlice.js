import { createSlice } from '@reduxjs/toolkit';

const reduxSlice = createSlice({
  name: 'redux',
  initialState: { darkMode: false },
  reducers: {
    toggleMode(state) {
      state.darkMode = !state.darkMode;
    },
  },
});

export const reduxActions = reduxSlice.actions;

export default reduxSlice;
