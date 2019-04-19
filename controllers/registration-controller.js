/*
        This file contains controllers for registration routes.
*/
const service  = require('../services/registration-service');
const Bluebird = require('bluebird');

// For registraion.
const register = function(req, res) {
    Bluebird.coroutine(function*() {
        const data = yield service.registerUser(req.body);
        return data;
    })().then((result) => res.send(result), (err) => res.send(err));
}

module.exports.register = register;