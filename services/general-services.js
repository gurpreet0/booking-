/*
        This file contains general booking services.
*/
const constants = require('../properties/constants.js');
/**
 * 
 * @param {*} email 
 * @param {*} userType 
 */
const getIdByEmail = (email, userType) => {
    return new Promise((resolve, reject) => {
        const values = [];
        let sqlQuery = `SELECT ${userType}_id FROM ${userType} WHERE email = ?`;
        values.push(email);
        connection.query(sqlQuery, values, (err, rows, fields) => {
            if(err)
            reject({code: constants.responseFlags.INTERNAL_ERROR, message: err, data: null});
            else
            resolve(rows[0][`${userType}_id`]);
        });
    });
}
/**
 * 
 * @param {*} id 
 * @param {*} idType 
 */
const getBookingId = (id, idType) => {
    return new Promise((resolve, reject) => {
        const values = [];
        let sqlQuery = `SELECT * FROM booking WHERE ${idType} = ?`;
        values.push(id)
        connection.query(sqlQuery, values, (err, rows, fields) => {
            if(err)
            reject({code: constants.responseFlags.INTERNAL_ERROR, message: err, data: null});
            else if(rows.length < 1)
            reject({code: constants.responseFlags.NOT_FOUND, message: constantsresponse.Messages.NOT_FOUND, data: null});
            else
            resolve({code: constants.responseFlags.SUCCESS, message: constants.responseMessages.SUCCESS, data: rows});
        });
    });
}

const checkLogs = (userType) => {
    return new Promise((resolve, reject) => {
        if(userType != 'admin')
        reject({code: constants.responseFlags.ACCESS_DENIED, message: constants.responseMessages.ACCESS_DENIED, data: null});
        else {
            db.collection('registration').find().project({ _id: 0}).toArray((err, result) => {
                if(err)
                reject({code: constants.responseFlags.INTERNAL_ERROR, message: err, data: null});
                else
                resolve({code: constants.responseFlags.SUCCESS, message: constants.responseMessages.SUCCESS, data: result});
              });
        }
    });
}

const blockUnblock = (driverID)=>{
    return new Promise((resolve,reject)=>{
       driverID = parseInt(driverID);
        db.collection('driver').updateOne({"driver_id":driverID},{$set:{"block_status":1,"time":Date()}},(err, result) => {
            if(err)
            reject({code: constants.responseFlags.INTERNAL_ERROR, message: err, data: null});
            else{
                resolve({code: constants.responseFlags.SUCCESS, message: constants.responseMessages.DRIVER_BLOCKED, data: {driver_id: driverID}});
            }
            agenda.define('unblock blocked drivers', () => {
                console.log('in block unblock agenda function');
                db.collection('driver').update({driver_id:driverID},{$set:{"block_status":0}});
              });
            (async function() {
                console.log('in agenda function');
                
                await agenda.start();
                console.log('after agenda start');
                await agenda.schedule('in 20 minutes', 'unblock blocked drivers');
            })();
        });
    });
}
module.exports.getIdByEmail = getIdByEmail;
module.exports.getBookingId = getBookingId;
module.exports.checkLogs    = checkLogs;
module.exports.blockUnblock = blockUnblock;