import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  items: [], // List of favorite products
  IsFeaturePageOpened: false,
  resetProductsCateogry: false,
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
      console.log('inside remove specific product from favorites');
      state.items = []; // Add product if not already in favorites
    },

    handleFeaturePage: (state, action) => {
      state.IsFeaturePageOpened = action.payload;
    },

    resetProductsCateogry: (state) => {
      state.resetProductsCateogry = !state.resetProductsCateogry;
    },
  },
});

export const {
  addToFavoriteProduct,
  removeFromFavoriteProduct,
  handleFeaturePage,
} = favoriteProduct.actions;

export default favoriteProduct.reducer;
