/*
        This file contains routes for registration.
*/
const express                = require('express');
const registrationController = require('../controllers/registration-controller');
const middleware             = require('../validation/middleware');
const router                 = express.Router();

router.post('/', middleware.registration, registrationController.register);

module.exports = router;