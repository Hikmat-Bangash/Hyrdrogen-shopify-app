import {createSlice} from '@reduxjs/toolkit';
import {toast} from 'react-toastify';

const initialState = {
  items: [], // List of favorite products
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      const product = action.payload;
      console.log('action.payload: ', product);
      const exists = state.items.find((item) => item.id === product.id);
      if (!exists) {
        state.items.push(product); // Add product if not already in favorites
        toast.success('Product added to Favorites!');
      } else {
        toast.error('Product already added!');
      }
    },
    removeFromFavorites: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.id !== productId); // Remove product by ID
    },
  },
});

export const {addToFavorites, removeFromFavorites} = favoritesSlice.actions;

export default favoritesSlice.reducer;