import axios from 'axios';
import { dataPokemonInfo } from '../../reducers/exemples/pokemonList';

const instance = axios.create({
    baseURL: 'http://localhost:4000',
  });

const pokemonList = (store) => (next) => (action) => {
    
    if(action.type === 'FETCH_ALL_POKEMON'){
        instance.get('/pokemon')
        .then((response) => {
            store.dispatch(dataPokemonInfo({ pokemonList: response.data }));    
        })
        .catch((error) => {
            // en cas d’échec de la requête
            console.log(error);
            alert('Erreur de chargement, veuillez réessayer');
        });
    }
    
    next(action);
  };
  
  export default pokemonList;