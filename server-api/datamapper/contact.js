const client = require('../database/client');

const contact = {

    async getContactInfo() {
        const query = `
        SELECT contact.firstname, contact.lastname, contact.id
        FROM contact
        WHERE status = 'contact'
        ORDER BY id DESC
        LIMIT 5;
        `;
        const results = await client.query(query);
        return results.rows
    },

    async getOneContactInfo(id){
        const query = `
        SELECT contact.*,
        COALESCE(to_json(answer_responses), '[]'::json) AS responses,
        COALESCE(to_json(contract_trainings), '[]'::json) AS contract_training,
        COALESCE(to_json(quotation_trainings), '[]'::json) AS training_quotation,
        COALESCE(to_json(meet_ids), '[]'::json) AS meets,
        COALESCE(to_json(levy_ids), '[]'::json) AS levies,
        COALESCE(to_json(quotation_ids), '[]'::json) AS quotations,
        COALESCE(to_json(contract_ids), '[]'::json) AS contracts
        FROM contact
        LEFT JOIN (
            SELECT contact_id, array_agg(response) AS answer_responses
            FROM contact_answer
            JOIN answer ON contact_answer.answer_id = answer.id
            GROUP BY contact_id
        ) AS answer_agg ON contact.id = answer_agg.contact_id
        LEFT JOIN (
            SELECT contact_id, array_agg(training_id) AS contract_trainings
            FROM contract
            GROUP BY contact_id
        ) AS contract_agg ON contact.id = contract_agg.contact_id
        LEFT JOIN (
            SELECT contact_id, array_agg(training_id) AS quotation_trainings
            FROM quotation
            GROUP BY contact_id
        ) AS quotation_agg ON contact.id = quotation_agg.contact_id
        LEFT JOIN (
            SELECT contact_id, array_agg(json_build_object('date', meet.date, 'time', meet.time, 'subject', meet.subject)) AS meet_ids
            FROM meet
            GROUP BY contact_id
        ) AS meet_agg ON contact.id = meet_agg.contact_id
        LEFT JOIN (
            SELECT contact_id, array_agg(id) AS levy_ids
            FROM levy
            GROUP BY contact_id
        ) AS levy_agg ON contact.id = levy_agg.contact_id
        LEFT JOIN (
            SELECT contact_id, array_agg(id) AS quotation_ids
            FROM quotation
            GROUP BY contact_id
        ) AS quotation_id_agg ON contact.id = quotation_id_agg.contact_id
        LEFT JOIN (
            SELECT contact_id, array_agg(json_build_object('start_date', contract.start_date, 'end_date', contract.end_date, 'status', contract.status, 'training_id', contract.training_id, 'responsible', contract.responsible)) AS contract_ids
            FROM contract
            GROUP BY contact_id
        ) AS contract_id_agg ON contact.id = contract_id_agg.contact_id
        WHERE contact.id = $1;

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