import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import compoundInterestReducer from './compoundInterestSlice';
import debtRatioReducer from './debtRatioSlice';
import assetClassReducer from './assetClassSlice';

const rootReducer = combineReducers({
  compoundInterest: compoundInterestReducer,
  debtRatio: debtRatioReducer,
  assetClass: assetClassReducer,
  // add reducer here
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['compoundInterest', 'debtRatio', 'assetClass'], // Specify which reducers to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;