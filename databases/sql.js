/*
        This file creates connection with MySql database.
*/
const mysql = require('mysql');
/**
 * 
 * @param {*} config 
 */
const intialize = function (config) {
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(config);
        connection.connect(function(err) {
            if(err)
            reject(err);  
        });
        return resolve(connection);
    })
}

module.exports.intialize = intialize;