import { configureStore } from '@reduxjs/toolkit';
import { youtubeApi } from './youtubeApi';
import reduxSlice from './reduxSlice';

const store = configureStore({
  reducer: {
    [youtubeApi.reducerPath]: youtubeApi.reducer,
    redux: reduxSlice.reducer,
  },
});

export default store;
