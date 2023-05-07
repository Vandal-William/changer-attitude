const express = require('express');
const router = express.Router();


// on récupère notre mainController
const adminController = require('./controllers/adminController');
const contactController = require('./controllers/contactController');

// CONTACT
router.get('/contacts', contactController.getAllContact);
router.get('/contact/:id', contactController.getOneContact);
router.get('/contactNeed/:id', contactController.getOneContactNeed);
router.get('/contactMeet/:id', contactController.getOneContactMeet);

router.post('/updateContact/:id', contactController.updateOneContact);
router.post('/updateMeet/:id', contactController.updateOneContactMeet);
router.post('/createMeet/:id', contactController.createOneContactMeet);
router.post('/deleteMeet/:id', contactController.deleteOneContactMeet);

//ADMIN
router.post('/adminConnect', adminController.getAdmin);

module.exports = router;