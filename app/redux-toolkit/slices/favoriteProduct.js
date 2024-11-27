import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  items: [], // List of favorite products
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
  },
});

export const {addToFavoriteProduct, removeFromFavoriteProduct} =
  favoriteProduct.actions;

export default favoriteProduct.reducer;
