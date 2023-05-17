import axios from 'axios';
import {getContact} from '../reducers/contact';
import {getAllContactInfo} from '../reducers/contact';

const instance = axios.create({
  baseURL: 'http://localhost:4000',
});

const contact = (store) => (next) => (action) => {

  if (action.type === 'FETCH_CONTACT') {

    instance
      .get('/contacts')
      .then((response) => {
        store.dispatch(getContact({ contact : response.data}));
      })
      .catch((error) => {
        console.log(error);
        alert('Erreur de chargement, veuillez réessayer');
      });

  }

   if (action.type === 'FETCH_ONE_CONTACT') {
    const { id } = action.payload;

    instance
      .get(`/contact/${id}`)
      .then((response) => {
        store.dispatch(getAllContactInfo({ 
          company : response.data.company,
          company_adress : response.data.company_adress,
          company_city : response.data.company_city,
          company_zip_code : response.data.company_zip_code,
          contract_training : response.data.contract_training,
          firstname : response.data.firstname,
          lastname : response.data.lastname,
          levies : response.data.levies,
          mail : response.data.mail,
          meets : response.data.meets,
          phone : response.data.phone,
          re_contact : response.data.re_contact,
          responses : response.data.responses,
          status : response.data.status,
          training_quotation : response.data.training_quotation,
        }));
      })
      .catch((error) => {
        console.log(error);
        alert('Erreur de chargement, veuillez réessayer');
      });

  }

  if (action.type === 'UPDATE_CONTACT') {
    const { 
      company,
      company_adress,
      company_city,
      company_zip_code,
      firstname,
      lastname,
      mail,
      phone,
      re_contact,
      status

    } = action.payload;
  

    // instance
    //   .get(``)
    //   .then((response) => {
        
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     alert('Erreur de chargement, veuillez réessayer');
    //   });

  }

  next(action);
};

export default contact;
