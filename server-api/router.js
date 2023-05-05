const express = require('express');
const router = express.Router();


// on récupère notre mainController
const adminController = require('./controllers/adminController');

// page d'acceuil
// router.get('/pokemon', mainController.homePage);
router.post('/adminConnect', adminController.getAdmin);

// router.get('/pokemon/:id', mainController.detailPokemon);

// router.get('/type', mainController.typePage);

// router.get('/type/:id', mainController.pokemonTypePage);


// 404
// router.use(mainController.notFound);


module.exports = router;