import { configureStore } from '@reduxjs/toolkit';

import { adminReducer, authReducer, pollReducer } from './reducers';

export const store = configureStore({
  reducer: {
    authReducer,
    adminReducer,
    pollReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV === 'development',
});
