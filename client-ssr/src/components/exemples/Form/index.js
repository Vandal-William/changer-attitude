import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserInfo } from '../../../reducers/exemples/user';

function Form() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  function handleSubmit(e) {
  e.preventDefault();

  const userInfo = {
    firstName: e.target.firstName.value,
    lastName: e.target.lastName.value,
    email: e.target.email.value,
  };

  dispatch(updateUserInfo(userInfo));
}

    return (
 
        <div>
            <h1>Formulaire de saisie </h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="firstName">First Name:</label>
                    <input type="text" id="firstName" defaultValue={user.firstName} />
                </div>

                <div>
                    <label htmlFor="lastName">Last Name:</label>
                    <input type="text" id="lastName" defaultValue={user.lastName} />
                </div>

                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" defaultValue={user.email} />
                </div>
                
                <button type="submit">Soumettre</button>
            </form>

            <div>
                <h1>{user.firstName} {user.lastName}</h1>
                <span>{user.email}</span>
            </div>

        </div>

    );
};

export default Form;