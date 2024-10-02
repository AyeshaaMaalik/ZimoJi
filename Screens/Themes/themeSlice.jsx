import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    isDay: true, 
  },
  reducers: {
    toggleTheme(state) {
      state.isDay = !state.isDay;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
