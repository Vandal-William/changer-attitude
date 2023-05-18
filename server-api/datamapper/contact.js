const client = require('../database/client');
const moment = require('moment');

const contact = {

    async getContactInfo() {
        const query = `
        SELECT contact.firstname, contact.lastname, contact.id
        FROM contact
        WHERE status_id = 1
        ORDER BY id DESC
        LIMIT 5;
        `;
        const results = await client.query(query);
        return results.rows
    },

    async getOneContactInfo(id){
        const query = `
        SELECT contact.*, status.name AS "status_name",
        COALESCE(to_json(answer_responses), '[]'::json) AS responses,
        COALESCE(to_json(contract_trainings), '[]'::json) AS contract_training,
        COALESCE(to_json(quotation_trainings), '[]'::json) AS training_quotation,
        COALESCE(to_json(meet_ids), '[]'::json) AS meets,
        COALESCE(to_json(levy_ids), '[]'::json) AS levies
        FROM contact
        JOIN status ON contact.status_id = status.id
        LEFT JOIN (
            SELECT contact_id, array_agg(response) AS answer_responses
            FROM contact_answer
            JOIN answer ON contact_answer.answer_id = answer.id
            GROUP BY contact_id
        ) AS answer_agg ON contact.id = answer_agg.contact_id
        LEFT JOIN (
            SELECT contact_id, array_agg(
                json_build_object(
                    'id', contract.id,
                    'start', contract.start_date, 
                    'end', contract.end_date, 
                    'status', contract.status,
                    'trainings', (
                        SELECT array_agg(
                            json_build_object(
                                'contract_training', contract_training.id,
                                'training', training.id,
                                'name', training.name,
                                'type', training.type_id,
                                'theme', training.theme_id
                            )
                        )
                        FROM contract_training
                        JOIN training ON contract_training.training_id = training.id
                        WHERE contract.id = contract_training.contract_id
                    )
                )
            ) AS contract_trainings
            FROM contract
            GROUP BY contact_id
        ) AS contract_agg ON contact.id = contract_agg.contact_id
        LEFT JOIN (
            SELECT contact_id, array_agg(json_build_object(
                'quotation', quotation.id,
                'trainings', (
                    SELECT array_agg(
                        json_build_object(
                            'quotation_training', quotation_training.id,
                            'training', training.id,
                            'name', training.name,
                            'price', training.price,
                            'duration', training.duration 
                        )
                    )
                    FROM quotation_training
                    JOIN training ON quotation_training.training_id = training.id
                    WHERE quotation.id = quotation_training.quotation_id
                )
            )) AS quotation_trainings
            FROM quotation
            GROUP BY contact_id
        ) AS quotation_agg ON contact.id = quotation_agg.contact_id
        LEFT JOIN (
            SELECT contact_id, array_agg(json_build_object('id', id, 'date', date, 'time', time, 'subject', subject)) AS meet_ids
            FROM (
                SELECT meet.*, ROW_NUMBER() OVER (PARTITION BY contact_id ORDER BY date ASC) AS rn
                FROM meet
            ) sub
            WHERE rn <= 5
            GROUP BY contact_id
        ) AS meet_agg ON contact.id = meet_agg.contact_id
        LEFT JOIN (
            SELECT contact_id, array_agg(json_build_object(
                'id', levy.id, 
                'date', levy.date,
                'amount', levy.amount, 
                'status', levy.status, 
                'reference', levy.reference
            )) AS levy_ids
            FROM levy
            GROUP BY contact_id
        ) AS levy_agg ON contact.id = levy_agg.contact_id
        WHERE contact.id = $1;

        `;
        const values = [id];

        const result = await client.query(query, values);
        console.log(result.rows[0])
        return result.rows[0];
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
        status_id,
        re_contact,
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
            status_id = $9,
            re_contact = $10
            WHERE contact.id = $11;
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
            status_id,
            Boolean(re_contact),
            id
        ];
        console.log(values)
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
            time = to_time($2, 'HH24:MI:SS'),
            subject = $3
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
        
    },

    async createQuotationForOneContact(id_contact, array_training) {
        const query = `
            WITH inserted_quotation AS (
                INSERT INTO quotation (responsible, contact_id)
                VALUES ('Changer d''attitude', $1)
                RETURNING quotation_id
            )
            INSERT INTO quotation_training (quotation_id, training_id)
            SELECT quotation_id, training_id
            FROM inserted_quotation, unnest($2::int[]) AS training_id
        `;
    
        const values = [
            id_contact,
            array_training
        ];
    
        const createQuotation = await client.query(query, values);
    },

    async getThemeAndTypeOFTraining (){
        const query = `
        SELECT
        ARRAY_AGG(JSON_BUILD_OBJECT('id', t.id, 'name', t.name)) AS type,
        ARRAY_AGG(JSON_BUILD_OBJECT('id', th.id, 'name', th.name)) AS theme
        FROM
            type t, theme th
        LIMIT 1;
      
        `;
        const results = await client.query(query);
        return results.rows
    }


}

module.exports = contact;