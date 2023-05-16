import { configureStore, combineReducers } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import adminReducer from '../reducers/admin';
import contactReducer from '../reducers/contact';

import admin from '../middlewares/admin';
import contact from '../middlewares/contact'

const rootReducer = combineReducers({
  admin: adminReducer,
  contact: contactReducer
});

const middleware = [thunk, admin, contact];

const store = configureStore({
  reducer: rootReducer,
  middleware: middleware,
})

export default store