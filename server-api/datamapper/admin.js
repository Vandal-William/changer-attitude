const client = require('../database/client');

// ici on va créer toute les méthodes qui servent à communiquer avec notre BDD
const admin = {
    async getBddPasswordByUsername(username) {
        const query = 'SELECT password FROM admin_connect WHERE username = $1';
        const values = [username]; 
        const error = "";
        const passwordBdd = await client.query(query, values);
    
        if (passwordBdd.rows[0] !== undefined){
            return passwordBdd.rows[0].password;
        }else{
            return error;
        }
    },

}

module.exports = admin;