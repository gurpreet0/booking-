/*
        This file contains routes for login.
*/
const express         = require('express');
const loginController = require('../controllers/login-controller');
const middleware      = require('../validation/middleware');
const router          = express.Router();

router.post('/', middleware.login, loginController.login);

module.exports = router;