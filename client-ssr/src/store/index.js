import { configureStore, combineReducers } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import adminReducer from '../reducers/admin';

import debug from '../middlewares/exemples/debug';
import admin from '../middlewares/admin';

const rootReducer = combineReducers({
  admin: adminReducer,
});

const middleware = [thunk, debug, admin];

const store = configureStore({
  reducer: rootReducer,
  middleware: middleware,
})

export default store