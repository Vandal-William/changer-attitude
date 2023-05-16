import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';


import NavAdmin from '../NavAdmin';
import {getAllContactInfo} from '../../../reducers/contact';

function OneContactPage() {
  const contact = useSelector(state => state.contact.allContactInfo);
  
  const params = useParams();
  const dispatch = useDispatch();
  
  useEffect(() => {
    const getId = {
      id: params.id,
    }
    dispatch({
      type : 'FETCH_ONE_CONTACT',
      payload : getId
    });
  }, [dispatch, params]);



  const handleSubmit = (e) => {

    e.preventDefault()
    const updateContact = {
      firstname: e.target.firstname.value,
      lastname: e.target.lastname.value,
      company: e.target.company.value,
      company_adress: e.target.company_adress.value,
      company_city: e.target.company_city.value,
      company_zip_code: e.target.company_zip_code.value,
      mail: e.target.mail.value,
      phone: e.target.phone.value,
      status: e.target.status.value
    }
    dispatch({ type: 'UPDATE_CONTACT', payload: updateContact });
  }

  const handleChange = (e) =>{
    const { name, value } = e.target;
      const newAllContactInfo = { [name]: value };
      dispatch(getAllContactInfo(newAllContactInfo));
  }

  return (
    <div className='home-admin'>
      <NavAdmin/>
      <div className='onecontact'>
        <h2 className='onecontact-name'>{contact.firstname} - {contact.lastname}</h2>
        <form onSubmit={handleSubmit} className='onecontact-form'>

          <fieldset className='onecontact-field'>

            <legend className='onecontact-legend'>Information de contact</legend>

            <label className='onecontact-label' for="firstname">Nom de famille</label>
            <input onChange={handleChange}  className='onecontact-input' id="firstname" type="text" name="firstname" value={contact.firstname}/>

            <label className='onecontact-label' for="lastname">Prénom</label>
            <input onChange={handleChange} className='onecontact-input' id="lastname" type="text" name="lastname" value={contact.lastname}/>
  
            <label className='onecontact-label' for="mail">E-mail</label>
            <input onChange={handleChange} className='onecontact-input' id="mail" type="text" name="mail" value={contact.mail}/>
  
            <label className='onecontact-label' for="phone">Téléphone</label>
            <input onChange={handleChange} className='onecontact-input' id="phone" type="text" name="phone" value={contact.phone}/>
  
            {contact.re_contact && ( 
              <> 
                <label className='onecontact-label' for="contact">Contact</label>
                <input onChange={handleChange} className='onecontact-input' type="checkbox" name="contact" id="contact" value={contact.re_contact} checked/>
              </>
            )}
  
            {!contact.re_contact && ( 
              <> 
                <label className='onecontact-label' for="contact">Contact</label>
                <input onChange={handleChange} className='onecontact-input' type="checkbox" name="contact" id="contact" value={contact.re_contact}/>
              </>
            )}
  
            <label className='onecontact-label' for="status">Status</label>
            <select onChange={handleChange} name="status" id="status">
              <option value={contact.status}>
                {contact.status}
              </option>
              <option value="Autre">
                autre
              </option>
            </select>

          </fieldset>

          <fieldset className='onecontact-field'>
            <legend className='onecontact-legend'>Entreprise</legend>

            <label className='onecontact-label' for="company">Entreprise</label>
            <input onChange={handleChange} className='onecontact-input' id="company" type="text" name="company" value={contact.company}/>

            <label className='onecontact-label' for="company_adress">Adresse</label>
            <input onChange={handleChange} className='onecontact-input' id="company_adress" type="text" name="company_adress" value={contact.company_adress}/>

            <label className='onecontact-label' for="company_zip_code">Code postal</label>
            <input onChange={handleChange} className='onecontact-input' id="company_zip_code" type="text" name="company_zip_code" value={contact.company_zip_code}/>

            <label className='onecontact-label' for="company_city">Ville</label>
            <input onChange={handleChange} className='onecontact-input' id="company_city" type="text" name="company_city" value={contact.company_city}/>
            <button> Modifier</button>
          </fieldset>

        </form>
        <fieldset className='onecontact-field'>
          <legend className='onecontact-legend'>Problématiques</legend>
          {contact.responses !== undefined ? contact.responses.map(response => (
            <p key={response}>{response}</p>
          )): 'loading...'}
        </fieldset>
        <fieldset className='onecontact-field'>

            <legend className='onecontact-legend'>Rendez-vous</legend>
              <button>Ajouter un rendez-vous</button>
              <table style={{width: '100%'}}>
                  <thead>
                    <tr>
                      <th style={{textAlign: 'start'}}>Date</th>
                      <th style={{textAlign: 'end'}}>Heure</th>
                      <th style={{textAlign: 'end'}}>Commentaire</th>
                      <th style={{textAlign: 'end'}}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  {contact.meets !== undefined ? contact.meets.map(meet => {
                      return (
                        <tr>
                          <>
                            <td style={{textAlign: 'start'}}>{meet.date}</td>
                            <td style={{textAlign: 'end'}}>{meet.time}</td>
                            <td style={{textAlign: 'end'}}>{meet.subject}</td>
                            <td style={{textAlign: 'end'}}> <a href="#">Modifier</a> </td>

                          </>
                        </tr>
                      )
                  }): 'loading...'}
                  </tbody>
                </table>
          </fieldset>
        <fieldset className='onecontact-field'>
          <legend className='onecontact-legend'>Devis</legend>
          <button>Créer un devis</button>
          {contact.training_quotation !== undefined ? contact.training_quotation.map(bill => {
            let total = 0; // initialise la variable pour stocker la somme
            return (
              <div key={bill.quotation}>
                <div>
                    <h3>Devis N° {bill.quotation}</h3>
                    <button>Imprimer le devis</button>
                    <button>Modifier le devis</button>
                    <button>Supprimer le devis</button>
                </div>
                <table style={{width: '100%'}}>
                  <thead>
                    <tr>
                      <th style={{textAlign: 'start'}}>Formations</th>
                      <th style={{textAlign: 'end'}}>Durées</th>
                      <th style={{textAlign: 'end'}}>prix / h</th>
                      <th style={{textAlign: 'end'}}>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bill.trainings.map(training => {
                      const totalTraining = training.price * training.duration;
                      total += totalTraining; // met à jour la somme
                      return (
                        <tr key={training.name}>
                          <>
                            <td>{training.name}</td>
                            <td style={{textAlign: 'end'}}>{training.duration}h</td>
                            <td style={{textAlign: 'end'}}>{training.price}€</td>
                            <td style={{textAlign: 'end'}}>{totalTraining}€</td>
                          </>
                        </tr>
                      )
                    })}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={4}  style={{textAlign: 'end', color : 'green'}}>Total : {total}€</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            )
          }) : 'loading...'}
        </fieldset>

        <fieldset className='onecontact-field'>
          <legend className='onecontact-legend'>Contrats</legend>
          <button>Créer un contrat</button>
          {contact.contract_training !== undefined ? contact.contract_training.map(contract => {
            let total = 0; // initialise la variable pour stocker la somme
            return (
              <div>
                <div>
                    <h3>Contrat N°{contract.id}</h3>
                    <button>Imprimer le contrat</button>
                    <button>Modifier le contrat</button>
                    <button>Supprimer le contrat</button>
                </div>
                <table style={{width: '100%'}}>
                  <thead>
                    <tr>
                      <th style={{textAlign: 'start'}}>Date de début</th>
                      <th style={{textAlign: 'end'}}>Date de fin</th>
                      <th style={{textAlign: 'end'}}>Statut</th>
                      <th style={{textAlign: 'end'}}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{textAlign: 'start'}}>{contract.start}</td>
                      <td style={{textAlign: 'end'}}>{contract.end}</td>
                      <td style={{textAlign: 'end'}}>{contract.status}</td>
                      <td style={{textAlign: 'end'}}><a href="#">Details</a></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )
          }) : 'loading...'}
        </fieldset>

        <fieldset className='onecontact-field'>
          <legend className='onecontact-legend'>Prélèvement</legend>
          <button>Ajouter un prélèvement</button>
          <table style={{width: '100%'}}>
            <thead>
              <tr>
                <th style={{textAlign: 'start'}}>Date</th>
                <th style={{textAlign: 'end'}}>Montant</th>
                <th style={{textAlign: 'end'}}>Référence</th>
                <th style={{textAlign: 'end'}}>Statut</th>
                <th style={{textAlign: 'end'}}>Action</th>
              </tr>
            </thead>
            <tbody>
            {contact.levies !== undefined ? contact.levies.map(levy => {
                return (
                  <tr key={levy.id}>
                    <>
                      <td style={{textAlign: 'start'}}>{levy.date}</td>
                      <td style={{textAlign: 'end'}}>{levy.amount}€</td>
                      <td style={{textAlign: 'end'}}>{levy.reference}</td>
                      <td style={{textAlign: 'end'}}>{levy.status}</td>
                      <td style={{textAlign: 'end'}}> <a href="#">Details</a> </td>

                    </>
                  </tr>
                )
            }): 'loading...'}
            </tbody>
          </table>
        </fieldset>

      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  contact: state.contact.allContactInfo,
});

export default connect(mapStateToProps)(OneContactPage);
