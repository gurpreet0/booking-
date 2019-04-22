/*
        This file contains controllers for registration routes.
*/
const _ = require('underscore');
const constants = require('./../properties/constants');
const service  = require('../services/registration-service');
const Bluebird = require('bluebird');

// For registraion.
const register = function(req, res) {
    Bluebird.coroutine(function*() {
        const data = yield service.registerUser(req.body);
        if(_.isEmpty(data))
        return {message: constants.responseMessages.INTERNAL_ERROR,  status: constants.responseFlags.INTERNAL_ERROR, data: {}};
        return data;
    })().then((result) => res.send(result), (err) => res.send(err));
}

module.exports.register = register;