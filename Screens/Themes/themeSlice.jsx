import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    isDay: true, 
  },
  reducers: {
    setDayTheme(state, action) {
      state.isDay = action.payload;
    },
  },
});

export const { setDayTheme } = themeSlice.actions;
export default themeSlice.reducer;
