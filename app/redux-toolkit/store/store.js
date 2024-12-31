// // app/store/store.js
// import {configureStore, combineReducers} from '@reduxjs/toolkit';
// import {persistStore, persistReducer} from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
// import toggleThemeMode from '../slices/index.slice';

// const authPersistConfig = {
//   key: 'auth',
//   storage,
// };

// // Create persisted reducers for the slices that need persistence
// const persistedThemeModeReducer = persistReducer(
//   authPersistConfig,
//   toggleThemeMode,
// );

// // Combine reducers, with some being persisted and others not
// const rootReducer = combineReducers({
//   themeMode: persistedThemeModeReducer, // This slice will be persisted
//   //   user: userReducer, // This slice will not be persisted
// });

// // Configure the store
// const store = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
//       },
//     }),
// });

// // Create the persistor for redux-persist
// export const persistor = persistStore(store);

// export default store;

import {configureStore, combineReducers} from '@reduxjs/toolkit';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import toggleThemeMode from '../slices/index.slice';
import AddToFavourite from '../slices/favourite_slice';
import FavoriteProduct from '../slices/favoriteProduct';

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

// Create a noop storage for environments where localStorage is unavailable (e.g., SSR)
const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

// Use actual localStorage on the client side, noop storage on the server side
const storage =
  typeof window !== 'undefined'
    ? createWebStorage('local')
    : createNoopStorage();

// Persist configuration
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['RiskProfile', 'generalSlice', 'favoriteProduct'], // Reducers that we don't want to add to the persist store
};

// Combine all reducers
const reducer = combineReducers({
  themeMode: toggleThemeMode,
  favourites: AddToFavourite,
  favoriteProduct: FavoriteProduct,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, reducer);

// Configure the store with the persisted reducer and custom middleware
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Define types for state and dispatch
// These lines are removed in the plain JavaScript version since they are TypeScript specific
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
