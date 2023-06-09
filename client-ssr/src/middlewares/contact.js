import axios from 'axios';
import {getContact} from '../reducers/contact';
import {getAllContactInfo} from '../reducers/contact';
import {getThemesTypesOfTrainings} from '../reducers/contact';
import {getResultsSearchedTraining} from '../reducers/contact';

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
          status_id : response.data.status_id,
          status_name : response.data.status_name,
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
      status_id,
      id

    } = action.payload;
  
    instance
      .post(`/updateContact/${id}`, {
        company,
        company_adress,
        company_city,
        company_zip_code,
        firstname,
        lastname,
        mail,
        phone,
        re_contact,
        status_id
      })
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
        alert('Erreur de chargement, veuillez réessayer');
      });

  }

  if (action.type === 'CREATE_MEET') {
    const { 
      date,
      time,
      subject,
      id
    } = action.payload;
  
    instance
      .post(`/createMeet/${id}`, {
        date,
        time,
        subject
      })
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
        alert('Erreur de chargement, veuillez réessayer');
      });

  }

  if (action.type === 'UPDATE_MEET') {
    const { 
      date,
      time,
      subject,
      id
    } = action.payload;
  
    instance
      .post(`/updateMeet/${id}`, {
        date,
        time,
        subject
      })
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
        alert('Erreur de chargement, veuillez réessayer');
      });

  }
   if (action.type === 'DELETE_MEET') {
    const { 
      id
    } = action.payload;
  
    instance
      .post(`/deleteMeet/${id}`)
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
        alert('Erreur de chargement, veuillez réessayer');
      });

  }

   if (action.type === 'GET_TYPES_AND_THEMES_OF_TRAININGS') {
  
    instance
      .get(`/get/type/theme`)
      .then((response) => {
        response.data.map(res => {
          store.dispatch(getThemesTypesOfTrainings({ 
            types_trainings : res.type,
            themes_trainings: res.theme
          }));
        })
      })
      .catch((error) => {
        console.log(error);
        alert('Erreur de chargement, veuillez réessayer');
      });

  }

  if (action.type === 'SEARCH_TRAININGS') {
    const { type_id, theme_id } = action.payload;

    instance
      .post('/search/training/themeAndType', {
        type_id,
        theme_id
    })
      .then((response) => {
          store.dispatch(getResultsSearchedTraining({ 
            results_searched_trainings : response.data
          }));

        })
      .catch((error) => {
        console.log(error);
        alert('Erreur de chargement, veuillez réessayer');
      });

  }

  next(action);
};

export default contact;
