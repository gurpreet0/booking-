/*
        This file contains controllers for login routes.
*/
const Bluebird = require('bluebird');
const service  = require('../services/login-service.js');

// For login.
const login  = (req, res) => {
    Bluebird.coroutine(function*() {
        const data = yield service.login(req.body.email, req.body.password, req.body.type);
        return data;
    })().then((data)=> res.send(data), (err)=> res.send(err));
}

module.exports.login = login;