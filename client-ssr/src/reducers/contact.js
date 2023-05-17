import { createSlice } from '@reduxjs/toolkit';
const contactSlice = createSlice({
    name: 'contact',
    initialState: {
        contact : [],
        company : "",
        company_adress : "",
        company_city : "",
        company_zip_code : "",
        contract_training : [],
        firstname : "",
        lastname : "",
        levies : [],
        mail : "",
        meets : [],
        phone : "",
        re_contact : false,
        responses : [],
        status : "",
        training_quotation : [],
 
    },
    reducers: {
        getContact : (state, action) => {
            state.contact = action.payload.contact;
        },
        getAllContactInfo : (state, action) => {

            state.company = action.payload.company;
            state.company_adress = action.payload.company_adress;
            state.company_city = action.payload.company_city;
            state.company_zip_code = action.payload.company_zip_code;
            state.contract_training = action.payload.contract_training;
            state.firstname = action.payload.firstname;
            state.lastname = action.payload.lastname;
            state.levies = action.payload.levies;
            state.mail = action.payload.mail;
            state.meets = action.payload.meets;
            state.phone = action.payload.phone;
            state.re_contact = action.payload.re_contact;
            state.responses = action.payload.responses;
            state.status = action.payload.status;
            state.training_quotation = action.payload.training_quotation
        },
        updateContact : (state, action) => {
            state.company = action.payload.company;
            state.company_adress = action.payload.company_adress;
            state.company_city = action.payload.company_city;
            state.company_zip_code = action.payload.company_zip_code;
            state.firstname = action.payload.firstname;
            state.lastname = action.payload.lastname;
            state.mail = action.payload.mail;
            state.phone = action.payload.phone;
            state.re_contact = action.payload.re_contact;
            state.status = action.payload.status;
        }
    }
});

export const {getContact} = contactSlice.actions;
export const {getAllContactInfo} = contactSlice.actions;
export const {updateContact} = contactSlice.actions;
export default contactSlice.reducer;