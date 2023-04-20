// on utilise une déconstruction afin de récupérer uniquement le module Client, auquel on va donner le nom 'pgClient'
const { Client: pgClient } = require('pg');

// paramètre notre client
const client = new pgClient({
    password: process.env.PG_PASSWORD,
    user: process.env.PG_USERNAME,
    database: process.env.PG_DATABASE_NAME,
    host: process.env.PG_URL

});


// on lance la connexion à notre BDD
client.connect();


module.exports = client;