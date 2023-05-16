import { createSlice } from '@reduxjs/toolkit';
const contactSlice = createSlice({
    name: 'contact',
    initialState: {
        contact : [],
        allContactInfo: {},
    },
    reducers: {
        getContact : (state, action) => {
            state.contact = action.payload.contact;
        },
        getAllContactInfo : (state, action) => {
            state.allContactInfo = action.payload.allContactInfo;
        }, 
    }
});

export const {getContact} = contactSlice.actions;
export const {getAllContactInfo} = contactSlice.actions;
export default contactSlice.reducer;
