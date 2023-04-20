import { createSlice } from '@reduxjs/toolkit';

const pokemonSlice = createSlice({
  name: 'pokemonList',
  initialState: {
    pokemonList: [],
    
  },
  reducers: {
    dataPokemonInfo: (state, action) => {
      state.pokemonList = action.payload.pokemonList;
    }
  }
});

export const { dataPokemonInfo } = pokemonSlice.actions;

export default pokemonSlice.reducer;