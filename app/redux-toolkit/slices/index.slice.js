// app/store/slices/counterSlice.js
import {createSlice} from '@reduxjs/toolkit';

const themeModerSlice = createSlice({
  name: 'counter',
  initialState: {
    isDarkMode: false,
  },
  reducers: {
    toggleThemeMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export const {toggleThemeMode} = themeModerSlice.actions;

export default themeModerSlice.reducer;
