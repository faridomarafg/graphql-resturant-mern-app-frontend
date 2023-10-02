import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import liveSearchReducer from '../features/searchSlice';
import wishListReducer from '../features/wishListSlice';


export const store = configureStore({
  reducer: {
    auth:authReducer,
    liveSearch: liveSearchReducer,
    wishList:wishListReducer
  },
});
