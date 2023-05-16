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
        store.dispatch(getAllContactInfo({ allContactInfo : response.data}));
      })
      .catch((error) => {
        console.log(error);
        alert('Erreur de chargement, veuillez réessayer');
      });

  }

  next(action);
};

export default contact;
