/*
        This file contains controllers for booking routes.
*/
const _= require('underscore');
const constants = require('./../properties/constants');
const service  = require('../services/booking-service.js');
const generalService  = require('../services/general-services.js');
const Bluebird = require('bluebird');

/**
 * 
 * @param {*} booking 
 * @param {*} user 
 */
const requestBooking = (booking, user) => {
    return new Promise((resolve, reject) => {
        Bluebird.coroutine(function*() {
            const result = yield service.requestBooking(booking, user);
            return result;
        })().then((result) => resolve(result)).catch((err) => reject(err));
    });
}

/**
 * 
 * @param {*} booking 
 * @param {*} user 
 */
const approveBooking = (booking, user) => {
    return new Promise((resolve, reject) => {
        Bluebird.coroutine(function*() {
            const result = yield service.approveBooking(booking, user.admin_id);
            return result;
        })().then((result) => resolve(result)).catch((err) => reject(err));
    });
}

/**
 * 
 * @param {*} booking_id 
 * @param {*} user 
 */
const checkBookingStatus = (booking_id, user) => {
    return new Promise((resolve, reject) => {
        Bluebird.coroutine(function*() {
            let result;
            result = yield service.getBookingStatus(booking_id, user);
            if(result.data.status == 'APPROVED'||result.data.status == 'COMPLETED')
            result = yield service.getBookingInfo(booking_id);
            return result;
        })().then((result) => resolve(result)).catch((err) => reject(err));
    });
}

/**
 * 
 * @param {*} user 
 */
const viewAllBookings = (user) => {
    return new Promise((resolve, reject) => {
        Bluebird.coroutine(function*() {
            const result = yield service.viewAllBookings(user.type);
            return result;
        })().then((result) => resolve(result)).catch((err) => reject(err));
    });
}

/**
 * 
 * @param {*} booking_id 
 * @param {*} user 
 */
const completeBooking = (booking_id, user) => {
    return new Promise((resolve, reject) => {
        Bluebird.coroutine(function*() {
            const result =  yield service.setBookingStatus(booking_id, user.driver_id, 'COMPLETED')
            return result;
        })().then((result) => resolve(result)).catch((err) => reject(err));
    });
}

/**
 * 
 * @param {*} user 
 */
const getBookingHistory = (user) => {
    return new Promise((resolve, reject) => {
        Bluebird.coroutine(function*() {
            const result = yield service.getBookingHistory(user);
            return result;
        })().then((result) => resolve(result)).catch((err) => reject(err));
    });
}

/**
 * 
 * @param {*} userType 
 */
const checkLogs = (user) => {
    return new Promise((resolve, reject) => {
        Bluebird.coroutine(function*() {
            const result = yield generalService.checkLogs(user.type);
            return result;
        })().then((result) => resolve(result)).catch((err) => reject(err));
    });
}

const blockDriver = (driverID) => {
    return new Promise((resolve, reject) => {
        Bluebird.coroutine(function*() {
            const result = yield generalService.blockUnblock(driverID);
            if(_.isEmpty(result))
            return {message: constants.responseMessages.INTERNAL_ERROR,  status: constants.responseFlags.INTERNAL_ERROR, data: {}};
            return {result};
        })().then((result) => resolve(result)).catch((err) => reject(err));
    });
}

module.exports.requestBooking     = requestBooking;
module.exports.approveBooking     = approveBooking;
module.exports.checkBookingStatus = checkBookingStatus;
module.exports.viewAllBookings    = viewAllBookings;
module.exports.completeBooking    = completeBooking;
module.exports.getBookingHistory  = getBookingHistory;
module.exports.checkLogs          = checkLogs;
module.exports.blockDriver        = blockDriver;