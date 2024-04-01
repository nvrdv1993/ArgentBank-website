import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../reducers/authSlice';
import profileSlice from '../reducers/userProfileSlice';

// Configuration du magasin (store)
const store = configureStore({
  reducer: {
    auth: authSlice, 
    profile: profileSlice 
  },
});

// Export du magasin configuré
export default store;
