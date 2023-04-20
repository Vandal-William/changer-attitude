const dataMapper = require('../datamapper/exemple');


const mainController = {
    // homePage est une méthode appellée par le routeur, par défaut elle recoit 2 objets, req et res (la requête et res,un objet à travers lequel on va préparer notre réponse)
    homePage: async (req, res) => {
        try {
            const result = await dataMapper.getAllPokemons();
            if (result) {
                res.json(result);
            } else {
                res.json('error', { error: 404, message: 'No pokemons found'}); 
            }
        } catch(error) {
            res.status('500');
            res.json('error', { error: 500, message: error.message }); 
        }

    },

    detailPokemon: async (req, res, next) => {
        const id = req.params.id;
        dataMapper.getOnePokemonById(id, (error, result) => {
            if (!!error) {
                res.status(500).json(error);
                console.trace(error);
                return;
            }

            if (!result.rows[0]) {
                next();
                return;
            }

            const pokemon = result.rows[0];
            pokemon.typeList = [];

            for(const type of result.rows){
                pokemon.typeList.push({
                    id: type.type_id,
                    name: type.name,
                    color: type.color,
                })
            }

            delete pokemon.type_id;
            delete pokemon.name, pokemon.color;
            delete pokemon.color;

            console.log(pokemon);
            res.json(pokemon);
        });
    },


    typePage: (request, response) => {

        console.debug('mainController typePage');

        dataMapper.getAllType((error, result) => {
            if (!!error) {
                response.status(500).send(error);
                console.trace(error);
                return;
            }

            response.json(result.rows);
        });

    },

    pokemonTypePage: (request, response, next) => {

        console.debug('controller pokemonTypePage', request.params.id);

        const id = parseInt(request.params.id, 10);

        dataMapper.getPokemonByTypeId(id, (error, result) => {
            if (!!error) {
                response.status(500).send(error);
                console.trace(error);
                return;
            }

            if (!result.rows) {
                next();
                return;
            }

            response.json(result.rows);
        });

    },



    notFound: (req, res) => {
        // on rajoute un statut à notre réponse
        res.status(404);
        res.status('error', { error: 404, message: 'Page not found'});
    }

}

module.exports = mainController;