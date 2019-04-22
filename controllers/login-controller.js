/*
        This file contains controllers for login routes.
*/
const _ = require('underscore');
const constants = require('./../properties/constants');
const Bluebird = require('bluebird');
const service  = require('../services/login-service.js');

// For login.
const login  = (req, res) => {
    Bluebird.coroutine(function*() {
        const data = yield service.login(req.body.email, req.body.password, req.body.type);
        if(_.isEmpty(data))
        return {message: constants.responseMessages.INTERNAL_ERROR,  status: constants.responseFlags.INTERNAL_ERROR, data: {}};
        return data;
    })().then((data)=> res.send(data), (err)=> res.send(err));
}

module.exports.login = login;