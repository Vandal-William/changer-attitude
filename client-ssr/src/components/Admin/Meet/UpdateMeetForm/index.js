import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';



import NavAdmin from '../../NavAdmin';
import {updateMeet} from '../../../../reducers/contact';
import './styles.scss'

function UpdateMeetForm() {
    
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()
    const meets = useSelector(state => state.contact.meets)

    const oneMeet = meets.find((meet) => meet.id === parseInt(params.id));
    console.log(oneMeet)

    const handleSubmit = (e) => {
        e.preventDefault()

        const updateMeet = { 
            id: params.id,
            date: e.target.elements.date.value,
            time: e.target.elements.time.value,
            subject: e.target.elements.subject.value,
        };
        console.log(updateMeet)

        dispatch({ type: 'UPDATE_MEET', payload: updateMeet });
        navigate(`/contact/${params.contact_id}`)
    }

    const handleDelete = (e) => {
      e.preventDefault()
      const deleteMeet = {
        id: params.id,
      }
      dispatch({ type: 'DELETE_MEET', payload: deleteMeet });
      navigate(`/contact/${params.contact_id}`)

    }

    const handleChange = (e) => {
      const { name, value } = e.target;
      const updatedMeet = { ...oneMeet, [name]: value };
      dispatch(updateMeet(updatedMeet));
    }

  return (
    <div className='default-home'>
      <NavAdmin/>
      <div className='default-style'>    
        <h3 className='default-style-title'>Ajouter un rendez-vous</h3>

        <form className="meet" onSubmit={handleSubmit}>

            <label className="meet-label" for="date">Date</label>
            <input onChange={handleChange} className="meet-input" type="date" name="date" id="date" value={oneMeet !== undefined ? oneMeet.date : ''}/>

            <label className="meet-label" for="time">Heure</label>
            <input onChange={handleChange} className="meet-input" type="time" name="time" id="time" value={ oneMeet !== undefined ? oneMeet.time : ''}/>

            <label className="meet-label" for="subject">Commentaire</label>
            <input onChange={handleChange} className="meet-input" type="text" name="subject" id="subject" value={ oneMeet !== undefined ? oneMeet.subject : ''}/>

            <button className="btn" disabled  type="submit">Modifier le rendez-vous</button>
            <button className="btn" onClick={handleDelete} type="submit">Supprimer le rendez-vous</button>

        </form>

      </div>
    </div>
  );
}


 export default UpdateMeetForm;
