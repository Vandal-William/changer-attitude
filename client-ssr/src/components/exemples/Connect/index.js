import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import './styles.scss'

function Connect() {
    const data = useSelector(state => state.pokemonList);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: "FETCH_ALL_POKEMON"
        });
    });
    
    console.log(data.pokemonList)

    return (
        <div>
            <h1>Test de connexion a l'API pokedex</h1>
            <div className="Connect">
                {data.pokemonList.map((pokemon) => (
                    <div className='card'>
                        <h3>{pokemon.nom}</h3>
                        <span>N°{pokemon.numero}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Connect;