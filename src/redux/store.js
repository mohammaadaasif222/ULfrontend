import { combineReducers, configureStore } from '@reduxjs/toolkit';
import newsReducer from './news/newsSlice'

import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({  news: newsReducer, });

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
  blacklist: ['news'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
