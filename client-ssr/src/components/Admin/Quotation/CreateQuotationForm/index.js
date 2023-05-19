import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';


import NavAdmin from '../../NavAdmin';
import './styles.scss'

function CreateQuotationForm() {

  const typesAndThemes = useSelector(state => state.contact)
  const results = useSelector(state => state.contact.results_searched_trainings)
  const dispatch = useDispatch()
  const params = useParams()

  useEffect(() => {

    dispatch({
      type: 'GET_TYPES_AND_THEMES_OF_TRAININGS',
    })

  }, []);

  const handleSubmit = (e) => {

    e.preventDefault()
  
    const searchTrainings = { 
      type_id: parseInt(e.target.elements.type_id.value),
      theme_id: parseInt(e.target.elements.theme_id.value),
    };

    dispatch({ type: 'SEARCH_TRAININGS', payload: searchTrainings });
  }

  return (
    <div className='default-home'>
      <NavAdmin/>
      <div className='default-style'>    
        <h2 className='default-style-title'>Créer un devis</h2>

        <h2 className='title'>Rechercher une formation</h2>

        <form onSubmit={handleSubmit} className='quotation'>

          <label className='quotation-label' for="type">Types</label>
          <select className='quotation-select' name="type_id" id="type">

            <option className='quotation-option' value="Choisissez">
                Choix du type
            </option>

            {typesAndThemes.types_trainings.map(type => (

            <option className='quotation-option' value={type.id}>
              {type.name}
            </option>

            ))}

          </select>

          <label className='quotation-label' for="theme">Themes</label>
          <select className='quotation-select' name="theme_id" id="theme">

            <option className='quotation-option' value="Choisissez">
              Choix du thème
            </option>

          {typesAndThemes.themes_trainings.map(theme => (

            <option className='quotation-option' value={theme.id}>
              {theme.name}
            </option>

          ))}

          </select>

          <button className='btn'>Recercher</button>
        </form>

        <h2 className='title'>Ajouter une formation au devis</h2>
        <form>

          <div className='quotation'>
          
            {results.map(result => (
              <div className='quotation-results'>
                <label for="training_id">{result.name}</label>
                <input id="training_id" name="training_id" value={result.id} type="checkbox"/>
              </div>
            ))}
          </div>

          <div className='quotation-btn'>
            <button className='btn'> Créer le devis </button>
          </div>

        </form>
      </div>
    </div>
  );
}


 export default CreateQuotationForm;
