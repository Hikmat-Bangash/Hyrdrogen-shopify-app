import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  items: [], // List of favorite products
  IsFeaturePageOpened: false,
};

const favoriteProduct = createSlice({
  name: 'favoriteProduct',
  initialState,
  reducers: {
    addToFavoriteProduct: (state, action) => {
      const product = action.payload;
      state.items[0] = product; // Add product if not already in favorites
    },
    removeFromFavoriteProduct: (state, action) => {
      state.items = []; // Add product if not already in favorites
    },

    handleFeaturePage: (state, action) => {
      console.log('action.payload: ', action.payload);
      state.IsFeaturePageOpened = action.payload;
    },
  },
});

export const {
  addToFavoriteProduct,
  removeFromFavoriteProduct,
  handleFeaturePage,
} = favoriteProduct.actions;

export default favoriteProduct.reducer;
