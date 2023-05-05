import axios from 'axios';
import { tokenInfo } from '../reducers/admin';
import { errorInfo } from '../reducers/admin';

const instance = axios.create({
  baseURL: 'http://localhost:4000',
});

const admin = (store) => (next) => (action) => {
  if (action.type === 'GET_USER') {
    const { username, password } = action.payload;

    instance
      .post('/adminConnect', {
        username,
        password,
      })
      .then((response) => {
        if (response.data === "votre mot de passe ou votre nom d'utilisateur est incorrect"){
          store.dispatch(errorInfo({ error : response.data}));
        }else if (response.data === "le mot de passe et le nom d'utilisateur sont obligatoires"){
          store.dispatch(errorInfo({ error : response.data}));
        }else{
          store.dispatch(tokenInfo({ token : response.data}));
        }
      })
      .catch((error) => {
        console.log(error);
        alert('Erreur de chargement, veuillez réessayer');
      });

  }

  next(action);
};

export default admin;
