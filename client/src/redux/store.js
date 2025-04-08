import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { urlApi } from '../services/urlApi';

// Combine all reducers including the urlApi reducer
const rootReducer = combineReducers({
  user: userReducer,
  [urlApi.reducerPath]: urlApi.reducer, // Add the API reducer
});

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
  // You might want to blacklist the API reducer if you don't want to persist its data
  blacklist: [urlApi.reducerPath], // Optional: exclude API data from persistence
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Keep this for redux-persist
    }).concat(urlApi.middleware), // Add the API middleware
});

export const persistore = persistStore(store);


// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import userReducer from "./user/userSlice";
// import {persistReducer,persistStore} from 'redux-persist'
// import storage from 'redux-persist/lib/storage'

// const rootReducer = combineReducers({user: userReducer});

// const persistConfig = {
//   key: 'root',
//   storage,
//   version: 1
// }

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// });


// export const persistore = persistStore(store);