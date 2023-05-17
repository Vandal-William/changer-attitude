import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';


import NavAdmin from '../NavAdmin';
import './styles.scss'

function CreateMeetForm() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()

    const handleSubmit = (e) => {
        e.preventDefault()

        const createMeet = { 
            id: params.id,
            date: e.target.elements.date.value,
            time: e.target.elements.time.value,
            subject: e.target.elements.subject.value,
        };

        dispatch({ type: 'CREATE_MEET', payload: createMeet });
        navigate(`/contact/${params.id}`)
    }

  return (
    <div className='default-home'>
      <NavAdmin/>
      <div className='default-style'>    
        <h3 className='default-style-title'>Ajouter un rendez-vous</h3>

        <form className="meet" onSubmit={handleSubmit}>

            <label className="meet-label" for="date">Date</label>
            <input className="meet-input" type="date" name="date" id="date"/>

            <label className="meet-label" for="time">Heure</label>
            <input className="meet-input" type="time" name="time" id="time"/>

            <label className="meet-label" for="subject">Commentaire</label>
            <input className="meet-input" type="text" name="subject" id="subject"/>

            <button className="btn" type="submit">Créer le rendez-vous</button>

        </form>

      </div>
    </div>
  );
}


 export default CreateMeetForm;
