/*
        This file provides functions for the following :-
         - to generate and return jsonwebtoken
         - to verify jsonwebtoken and return the result
*/
const jwt = require('jsonwebtoken');

/**
 * 
 * @param {*} user 
 */
const generateToken = (user) => {
    return jwt.sign(user, 'private_key');
}
// To verify token.
const verifyToken = (req, res, next) => {
    let result;
    try {
        result = jwt.verify(req.body.token, 'private_key');
        res.locals.user = result;
        next();
    }
    catch(err) {
        res.send({code: 400, message: err.message, data: err});
    }
}

module.exports.generateToken = generateToken;
module.exports.verifyToken   = verifyToken;