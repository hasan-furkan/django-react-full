import { configureStore } from '@reduxjs/toolkit';
import userReducer from './components/auth';
import themeReducer from './components/theme';

export const store = configureStore({
  reducer: { user: userReducer, theme: themeReducer },
});
