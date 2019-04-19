/*
        This file contains methods which provides registration services.
*/
const Bluebird  = require('bluebird');
const constants = require('../properties/constants.js');
const genSalt   = require('bcrypt').genSalt;
const hash      = require('bcrypt').hash;

/**
 * 
 * @param {*} userInfo 
 */
const registerUser = function(userInfo) {
    return new Promise((resolve, reject) => {
        Bluebird.coroutine(function*() {
            const salt = yield genSalt(10);
            var id = 0;
            const hashedPassword = yield hash(userInfo.password, salt);
            const inner = [];
            let sqlQuery = `INSERT INTO ${userInfo.type} VALUES (?)`;
            inner.push(null,userInfo.name, userInfo.email, hashedPassword, userInfo.mobile_num);
            if(userInfo.type == 'driver')
            inner.push(userInfo.vehicle, 0);
             ({name:name, email:email, mobile_num:mobile_num}=userInfo);
             const message = {name: name, email: email, mobile_num: mobile_num};
            const values = [inner];
            connection.query(sqlQuery, values, (err, rows, fields) => {
                if(err)
                reject({code: constants.responseFlags.INTERNAL_ERROR, message: err.message, data: err});
                else{
                    id = rows.insertId;
                    console.log("driver id",id);
                resolve({code: constants.responseFlags.SUCCESSFULLY_REGISTERED, message: constants.responseMessages.SUCCESSFULLY_REGISTERED, data: message});
                 }
                 if(userInfo.type == 'driver'){
                    console.log(id);
                    db.collection('driver').insertOne({driver_id: id,block_status: 0 , time: Date()}, (err, result) => {
                        if(err)
                        reject({code: constants.responseFlags.INTERNAL_ERROR, message: err, data: null});
                    });
                }
            });
            
        })();    
    });
}

module.exports.registerUser = registerUser;