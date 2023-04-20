import { configureStore, combineReducers } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import counterReducer from '../reducers/exemples/counter';
import userReducer from '../reducers/exemples/user';
import pokemonReducer from '../reducers/exemples/pokemonList';

import debug from '../middlewares/exemples/debug';
import pokemonMiddleware from '../middlewares/exemples/pokemonList'

const rootReducer = combineReducers({
  counter: counterReducer,
  user: userReducer,
  pokemonList: pokemonReducer
});

const middleware = [thunk, debug, pokemonMiddleware];

const store = configureStore({
  reducer: rootReducer,
  middleware: middleware,
})

export default store