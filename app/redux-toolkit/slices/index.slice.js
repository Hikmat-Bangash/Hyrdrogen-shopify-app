// app/store/slices/counterSlice.js
import {createSlice} from '@reduxjs/toolkit';

const themeModerSlice = createSlice({
  name: 'counter',
  initialState: {
    isDarkMode: false,
    IsFeaturePageOpened: false,
  },
  reducers: {
    toggleThemeMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },

    hanldeFeaturePage: (state) => {
      state.IsFeaturePageOpened = !state.IsFeaturePageOpened;
    },
  },
});

export const {toggleThemeMode, hanldeFeaturePage} = themeModerSlice.actions;

export default themeModerSlice.reducer;
