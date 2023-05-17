const dataMapper = require('../datamapper/contact');

const contactController = {

    getAllContact: async (req, res) => {
        try{

            const contacts = await dataMapper.getContactInfo();
            res.json(contacts)

        }catch(error){
            res.json(error);
        }
    },

    getOneContact : async (req, res) => {
        const id = req.params.id;
        try{
            const contact = await dataMapper.getOneContactInfo(id);
            res.json(contact);
        }catch(error){
            res.json(error);
        }
    },

    updateOneContact : async (req, res) => {

        const id = req.params.id;
        const {
            firstname,
            lastname,
            phone,
            mail,
            company,
            company_adress,
            company_zip_code,
            company_city,
            re_contact,
            status
        } = req.body

        try{
            const updateContact = await dataMapper.updateOneContactInfo(
                firstname,
                lastname,
                phone,
                mail,
                company,
                company_adress,
                company_zip_code,
                company_city,
                re_contact,
                status,
                id
            );

            res.json("update contact success !")
          
        }catch(error){
            console.log(error)
            res.json(error)
        }

    },

    updateOneContactMeet : async (req, res) => {

        const id = req.params.id;
        const {
            date,
            time,
            subject
        } = req.body
        
        try{
            const updateContact = await dataMapper.updateOneContactMeetInfo(
                date,
                time,
                subject,
                id
            );

            res.json("update meet success !")
          
        }catch(error){
            res.json(error)
        }

    },

    createOneContactMeet : async (req, res) => {

        const id = req.params.id;
        const {
            date,
            time,
            subject
        } = req.body
        
        try{
            const updateContact = await dataMapper.createOneContactMeetInfo(
                date,
                time,
                subject,
                id
            );

            res.json("create meet success !")
          
        }catch(error){
            res.json(error)
        }

    },
    
    deleteOneContactMeet : async (req, res) => {
        const id = req.params.id;
        try{
            const deleteMeet = await dataMapper.deleteOneContactMeetInfo(id);

            res.json("delete meet success !")
          
        }catch(error){
            res.json(error)
        }
    }
}

module.exports = contactController;