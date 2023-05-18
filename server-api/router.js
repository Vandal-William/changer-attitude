const express = require('express');
const router = express.Router();


// on récupère notre mainController
const adminController = require('./controllers/adminController');
const contactController = require('./controllers/contactController');

// CONTACT
router.get('/contacts', contactController.getAllContact);
router.get('/contact/:id', contactController.getOneContact);
router.get('/get/type/theme', contactController.getTypeAndThemeToCreateQuotation);

router.post('/updateContact/:id', contactController.updateOneContact);

router.post('/updateMeet/:id', contactController.updateOneContactMeet);
router.post('/createMeet/:id', contactController.createOneContactMeet);
router.post('/deleteMeet/:id', contactController.deleteOneContactMeet);

router.post('/contact/create/quotation/:id', contactController.createQuotation);

//ADMIN
router.post('/adminConnect', adminController.getAdmin);

module.exports = router;