const client = require('../database/client');

const contact = {

    async getContactInfo() {
        const query = `
        SELECT contact.firstname, contact.lastname, contact.company, contact.id
        FROM contact
        `
        const results = await client.query(query);
        return results.rows
    },

    async getOneContactInfo(id){
        const query = `
        SELECT * 
        FROM contact
        WHERE contact.id = $1
        `;
        const values = [id];

        const result = await client.query(query, values);
        return result.rows[0];
    },

    async getContactNeedInfo(id){
        const query = `
        SELECT answer.response 
        FROM contact_answer 
        JOIN answer 
        ON contact_answer.answer_id = answer.id 
        WHERE contact_answer.contact_id = $1;
        `;
        const values = [id];
        const results = await client.query(query, values);
        return results.rows
    },

    async getOneContactMeetInfo(id){
        const query = `
        SELECT meet.date, meet.time, meet.subject, meet.id
        FROM meet 
        JOIN contact 
        ON contact.id = meet.contact_id 
        WHERE contact.id = $1;
        `
        const value = [id]
        const results = await client.query(query, value);
        return results.rows
    },

    async updateOneContactInfo(
        firstname,
        lastname,
        phone,
        mail,
        company,
        company_adress,
        company_zip_code,
        company_city,
        status,
        id
    ){
        const query = `
            UPDATE contact
            SET 
            firstname = $1,
            lastname = $2,
            phone = $3,
            mail = $4,
            company = $5,
            company_adress = $6,
            company_zip_code = $7,
            company_city = $8,
            status = $9,
            WHERE id = $10;
        `;
        const values = [
            firstname,
            lastname,
            phone,
            mail,
            company,
            company_adress,
            company_zip_code,
            company_city,
            status,
            id
        ];

        const update = await client.query(query, values);
    },

    async updateOneContactMeetInfo(
        id,
        date,
        time,
        subject
    ){
        const query = `
            UPDATE meet
            SET 
            date = $1,
            time = $2,
            subject = $3,
            WHERE contact_id = $4;
        `;

        const values = [
            date,
            time,
            subject,
            id
        ];

        const update = await client.query(query, values);
    },

    async createOneContactMeetInfo(
        date,
        time,
        subject,
        id
    ) {
        const query = `
        INSERT INTO meet 
        (date, time, subject, contact_id) 
        VALUES ($1, $2, $3, $4);
        `;
        const values = [
            date,
            time,
            subject,
            id
        ];

        const create = await client.query(query, values)
    },

    async deleteOneContactMeetInfo(id){
        const query = `
            DELETE FROM meet 
            WHERE id = $1;
        `;
        const values = [id];
        const deleteMeet = await client.query(query, values)
        
    }

}

module.exports = contact;