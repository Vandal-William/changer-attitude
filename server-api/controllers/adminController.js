const dataMapper = require('../datamapper/admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const adminController = {

    getAdmin: async (req, res) => {

        const {username, password} = req.body;

        if(username !== "" && password != ""){

            const BddPassword = await dataMapper.getBddPasswordByUsername(username);
            if (BddPassword){
                const match = bcrypt.compare(password, BddPassword);
                if (match) {
                    // Génération du token
                    const token = jwt.sign({ username }, 'secret_key');
                    // Envoi de la session en réponse au front-end
                    res.json(token);
                } else {
                    // Envoi d'une réponse d'erreur au front-end
                    res.json("votre mot de passe ou votre nom d'utilisateur est incorrect");
                }
            }else{
                res.json("votre mot de passe ou votre nom d'utilisateur est incorrect")
            }
        }else{
            res.json("le mot de passe et le nom d'utilisateur sont obligatoires")
        }
    
    },

}

module.exports = adminController;