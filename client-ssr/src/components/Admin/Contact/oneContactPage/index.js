import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector} from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


import NavAdmin from '../../NavAdmin';
import {updateContact} from '../../../../reducers/contact';
import './styles.scss'

function OneContactPage() {

  const navigate = useNavigate()
  const contact = useSelector(state => state.contact);
  const {levies} = contact
  console.log(contact)
  
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
    const { name, value } = e.target;
      const newAllContactInfo = { ...contact, id: params.id, [name]: value };
  
    dispatch({ type: 'UPDATE_CONTACT', payload: newAllContactInfo });
  }

  const handleChange = (e) =>{
    const { name, value } = e.target;
      const newAllContactInfo = {...contact, [name]: value };
      dispatch(updateContact(newAllContactInfo));
  }

  const handleCreateMeet = () => {
    navigate(`/create/meet/${params.id}`)
  }

  const handleCreateQuotation = () => {
    navigate(`/quotation/create/${params.id}`)
  }

  return (
    <div className='default-home'>
      <NavAdmin/>
      <div className='onecontact'>
        <h2 className='onecontact-name'>{contact.firstname} - {contact.lastname}</h2>
        <form  className='onecontact-form'>

          <h3 className='onecontact-legend'>Information de contact</h3>
          <fieldset className='onecontact-field'>

            <label className='onecontact-label' for="firstname">Nom de famille</label>
            <input onChange={handleChange}  className='onecontact-input' id="firstname" type="text" name="firstname" value={contact.firstname}/>

            <label className='onecontact-label' for="lastname">Prénom</label>
            <input onChange={handleChange} className='onecontact-input' id="lastname" type="text" name="lastname" value={contact.lastname}/>
  
            <label className='onecontact-label' for="mail">E-mail</label>
            <input onChange={handleChange} className='onecontact-input' id="mail" type="text" name="mail" value={contact.mail}/>
  
            <label className='onecontact-label' for="phone">Téléphone</label>
            <input onChange={handleChange} className='onecontact-input' id="phone" type="text" name="phone" value={contact.phone}/>
  
            {contact.re_contact && ( 
              <div> 
                <label className='onecontact-label' for="contact">Contact</label>
                <input onChange={handleChange} className='onecontact-input' type="checkbox" name="contact" id="contact" value={contact.re_contact} checked/>
              </div>
            )}
  
            {!contact.re_contact && ( 
              <div> 
                <label className='onecontact-label' for="re_contact">Contact</label>
                <input onChange={handleChange} className='onecontact-input' type="checkbox" name="re_contact" id="re_contact" value={contact.re_contact}/>
              </div>
            )}
  
            <label className='onecontact-label' for="status">Status</label>
            <select onChange={handleChange} name="status_id" id="status" value={contact.status_name}>
              <option value={contact.status_name}>
                {contact.status_name}
              </option>
              <option value="contact">
                contact
              </option>
            </select>

          </fieldset>

          <h3 className='onecontact-legend'>Entreprise</h3>
          <fieldset className='onecontact-field'>

            <label className='onecontact-label' for="company">Entreprise</label>
            <input onChange={handleChange} className='onecontact-input' id="company" type="text" name="company" value={contact.company}/>

            <label className='onecontact-label' for="company_adress">Adresse</label>
            <input onChange={handleChange} className='onecontact-input' id="company_adress" type="text" name="company_adress" value={contact.company_adress}/>

            <label className='onecontact-label' for="company_zip_code">Code postal</label>
            <input onChange={handleChange} className='onecontact-input' id="company_zip_code" type="text" name="company_zip_code" value={contact.company_zip_code}/>

            <label className='onecontact-label' for="company_city">Ville</label>
            <input onChange={handleChange} className='onecontact-input' id="company_city" type="text" name="company_city" value={contact.company_city}/>
            
            <button className='onecontact-submit' onClick={handleSubmit}> Modifier</button>

          </fieldset>

        </form>

        <h3 className='onecontact-legend'>Problématiques</h3>

        <fieldset className='onecontact-field'>
          {contact.responses !== undefined ? contact.responses.map(response => (
            <p className='onecontact-response' key={response}>{response}</p>
          )): 'loading...'}
        </fieldset>

        <h3 className='onecontact-legend'>Rendez-vous</h3>

        <fieldset className='onecontact-field'>

              <button onClick={handleCreateMeet} className='onecontact-btn'>Ajouter un rendez-vous</button>
              {contact.meets && contact.meets.length > 0 && (
                <table className='onecontact-table'>
                    <thead className='onecontact-thead'>
                      <tr>
                        <th className='onecontact-th' style={{textAlign: 'start'}}>Date</th>
                        <th className='onecontact-th' style={{textAlign: 'end'}}>Heure</th>
                        <th className='onecontact-th' style={{textAlign: 'end'}}>Commentaire</th>
                        <th className='onecontact-th' style={{textAlign: 'end'}}>Action</th>
                      </tr>
                    </thead>
                    <tbody className='onecontact-tbody'>
                    {contact.meets !== undefined ? contact.meets.map(meet => {
                        return (
                          <tr className='onecontact-active'>
                            <>
                              <td className='onecontact-td' style={{textAlign: 'start'}}>{meet.date}</td>
                              <td className='onecontact-td' style={{textAlign: 'end'}}>{meet.time}</td>
                              <td className='onecontact-td' style={{textAlign: 'end'}}>{meet.subject}</td>
                              <td className='onecontact-td' style={{textAlign: 'end'}}> <Link to={`/meet/update/${params.id}/${meet.id}`}>Modifier</Link> </td>
                            </>
                          </tr>
                        )
                    }): 'loading...'}
                    </tbody>
                  </table>
              )}
          </fieldset>

        <h3 className='onecontact-legend'>Devis</h3>

        <fieldset className='onecontact-field'>
          <button onClick={handleCreateQuotation} className='onecontact-btn'>Créer un devis</button>
          {contact.training_quotation !== undefined ? contact.training_quotation.map(bill => {
            let total = 0; // initialise la variable pour stocker la somme
            return (
              <div key={bill.quotation}>
                <div className='onecontact-cta'>
                    <h3>Devis N° {bill.quotation}</h3>
                    <button className='onecontact-btn'>Imprimer le devis</button>
                    <button className='onecontact-btn'>Modifier le devis</button>
                    <button className='onecontact-btn'>Supprimer le devis</button>
                </div>
                <table className='onecontact-table'>
                  <thead className='onecontact-thead'>
                    <tr>
                      <th className='onecontact-th' style={{textAlign: 'start'}}>Formations</th>
                      <th className='onecontact-th' style={{textAlign: 'end'}}>Durées</th>
                      <th className='onecontact-th' style={{textAlign: 'end'}}>prix / h</th>
                      <th className='onecontact-th' style={{textAlign: 'end'}}>Total</th>
                    </tr>
                  </thead>
                  <tbody className='onecontact-tbody'>
                    {bill.trainings.map(training => {
                      const totalTraining = training.price * training.duration;
                      total += totalTraining; // met à jour la somme
                      return (
                        <tr key={training.name}>
                          <>
                            <td className='onecontact-td'>{training.name}</td>
                            <td className='onecontact-td' style={{textAlign: 'end'}}>{training.duration}h</td>
                            <td className='onecontact-td' style={{textAlign: 'end'}}>{training.price}€</td>
                            <td className='onecontact-td' style={{textAlign: 'end'}}>{totalTraining}€</td>
                          </>
                        </tr>
                      )
                    })}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td className='onecontact-td' colSpan={4}  style={{textAlign: 'end', color : 'green'}}>Total : {total}€</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            )
          }) : 'loading...'}
        </fieldset>

        <h3 className='onecontact-legend'>Contrats</h3>

        <fieldset className='onecontact-field'>
          <button className='onecontact-btn'>Créer un contrat</button>
          {contact.contract_training !== undefined ? contact.contract_training.map(contract => {
            return (
              <div>
                <div className='onecontact-cta'>
                    <h3>Contrat N°{contract.id}</h3>
                    <button className='onecontact-btn'>Imprimer le contrat</button>
                    <button className='onecontact-btn'>Modifier le contrat</button>
                    <button className='onecontact-btn'>Supprimer le contrat</button>
                </div>
                <table className='onecontact-table'>
                  <thead className='onecontact-thead'>
                    <tr>
                      <th className='onecontact-th' style={{textAlign: 'start'}}>Date de début</th>
                      <th className='onecontact-th' style={{textAlign: 'end'}}>Date de fin</th>
                      <th className='onecontact-th' style={{textAlign: 'end'}}>Statut</th>
                      <th className='onecontact-th' style={{textAlign: 'end'}}>Action</th>
                    </tr>
                  </thead>
                  <tbody className='onecontact-tbody'>
                    <tr className='onecontact-active'>
                      <td className='onecontact-td' style={{textAlign: 'start'}}>{contract.start}</td>
                      <td className='onecontact-td' style={{textAlign: 'end'}}>{contract.end}</td>
                      <td className='onecontact-td' style={{textAlign: 'end'}}>{contract.status}</td>
                      <td className='onecontact-td' style={{textAlign: 'end'}}><a href="#">Details</a></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )
          }) : 'loading...'}
        </fieldset>

        <h3 className='onecontact-legend'>Prélèvement</h3>

        <fieldset className='onecontact-field'>
          <button className='onecontact-btn'>Ajouter un prélèvement</button>

          { contact.levies && contact.levies.length > 0 && (
          <table className='onecontact-table'>
            <thead className='onecontact-thead'>
                <tr>
                  <th className='onecontact-th' style={{textAlign: 'start'}}>Date</th>
                  <th className='onecontact-th' style={{textAlign: 'end'}}>Montant</th>
                  <th className='onecontact-th' style={{textAlign: 'end'}}>Référence</th>
                  <th className='onecontact-th' style={{textAlign: 'end'}}>Statut</th>
                  <th className='onecontact-th' style={{textAlign: 'end'}}>Action</th>
                </tr>
            </thead>
            <tbody className='onecontact-tbody'>

            {contact.levies !== undefined ? contact.levies.map(levy => {
                return (
                  <tr className='onecontact-active' key={levy.id}>
                    <>
                      <td className='onecontact-td' style={{textAlign: 'start'}}>{levy.date}</td>
                      <td className='onecontact-td' style={{textAlign: 'end'}}>{levy.amount}€</td>
                      <td className='onecontact-td' style={{textAlign: 'end'}}>{levy.reference}</td>
                      <td className='onecontact-td' style={{textAlign: 'end'}}>{levy.status}</td>
                      <td className='onecontact-td' style={{textAlign: 'end'}}> <a href="#">Details</a> </td>

                    </>
                  </tr>
                )
            }): 'loading...'}
            </tbody>
          </table>
          )}
        </fieldset>

      </div>
    </div>
  );
}

 const mapStateToProps = (state) => ({
   contact: state.contact,
});

 export default connect(mapStateToProps)(OneContactPage);
