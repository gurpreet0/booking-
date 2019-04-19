/*
        This file contains methods which provides login services.
*/
const Bluebird    = require('bluebird');
const compare     = require('bcrypt').compare;
const jwt         = require('jsonwebtoken');
const constants   = require('../properties/constants.js')
const currentUser = new Map();

/**
 * 
 * @param {*} userType 
 * @param {*} email 
 */
const ifUserExists = (userType,email) => {
    return new Promise((resolve, reject) => {
        console.log("welcome g")
        let sqlData =[]
        sqlData.push(email)
        connection.query(`select email from ${userType} where email = ?;`,sqlData, (err, rows, fields) => {
            if(err){
                console.log('oeee')
            reject(err.message);
            console.log(err);
            }
            else if(rows.length < 1){
                console.log('error aa gya')
            reject({code: constants.responseFlags.EMAIL_NOT_REGISTERED, message: constants.responseMessages.EMAIL_NOT_REGISTERED, data: null});
            }
            else
            resolve();
        })
    })
}
/**
 * 
 * @param {*} userType 
 * @param {*} email 
 */
const getPassword = function(userType, email) {
    return new Promise((resolve, reject) => {
        let sqlQuery = `SELECT password FROM ${userType} WHERE email = ?`;
        const params = [];
        params.push(email);
        connection.query(sqlQuery, params, (err, rows, fields) => {
            if(err)
            reject({code: constants.responseFlags.INTERNAL_ERROR, message: err, data: null});
            else if(rows.length < 1)
            reject({code: constants.responseFlags.EMAIL_NOT_REGISTERED, message: constants.responseMessages.EMAIL_NOT_REGISTERED, data: null});
            else
            resolve(rows[0].password);
        });
    });
}
/**
 * 
 * @param {*} userType 
 * @param {*} email 
 */
const getUserInfo = function(userType, email) {
    return new Promise((resolve, reject) => {
        let sqlQuery = `SELECT ${userType}_id, name, email, mobile_num FROM ${userType} WHERE email = ?`;
        const params = [];
        params.push(email);
        connection.query(sqlQuery, params, (err, rows, fields) => {
            if(err)
            reject({code: constants.responseFlags.INTERNAL_ERROR, message: err, data: null});
            else if(rows.length < 1)
            reject({code: constants.responseFlags.EMAIL_NOT_REGISTERED, message: constants.responseMessages.EMAIL_NOT_REGISTERED, data: null});
            else
            resolve(rows[0]);
        });
    });
}
/**
 * 
 * @param {*} email 
 * @param {*} password 
 * @param {*} userType 
 */
const login = function(email, password, userType) {
    return new Promise((resolve, reject) => {
        Bluebird.coroutine(function*() {
             yield ifUserExists(userType,email)
            const hashedPassword = yield getPassword(userType, email);
            if(yield compare(password, hashedPassword)) {
                const userInfo = Object.assign({}, yield getUserInfo(userType, email));
                userInfo.type = userType;
                userInfo.token = jwt.sign(userInfo, 'private_key');
                currentUser.set(userInfo.email, userInfo.type);
                return {code: constants.responseFlags.LOGIN_SUCCESSFUL, message: constants.responseMessages.LOGIN_SUCCESSFUL, data: userInfo};
            }
            else
            return {code: constants.responseFlags.WRONG_PASSWORD, message: constants.responseMessages.WRONG_PASSWORD, data: null};
        })().then((result) => resolve(result), (err) => reject(err));
    });
}


module.exports.getPassword = getPassword;
module.exports.login       = login;
