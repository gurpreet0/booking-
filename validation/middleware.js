/*
         This file contains middlewares to validate input at various stages.
*/
const constants  = require('../properties/constants')
const validation = require('./validation');

// Validates registration.
const registration = (req, res, next) => {
    const result = validation.validateRegistration(req.body);
    if(result.error)
    res.send({code: constants.responseFlags.BAD_REQUEST, message: result.error.details[0].message, data: result.error});
    else
    next();
}
// Valid login.
const login = (req, res, next) => {
    const result = validation.validateLogin(req.body);
    if(result.error)
    res.send({code: constants.responseFlags.BAD_REQUEST, message: result.error.details[0].message, data: result.error});
    else
    next();
}
// Validates new booking.
const newBooking = (req, res, next) => {
    const result = validation.validateNewBooking(req.body);
    if(result.error)
    res.send({code: constants.responseFlags.BAD_REQUEST, message: result.error.details[0].message, data: result.error});
    else
    next();
}
// Validates check booking status.
const checkBookingStatus = (req, res, next) => {
    const result = validation.validateCheckBookingStatus(req.body);
    if(result.error)
    res.send({code: constants.responseFlags.BAD_REQUEST, message: result.error.details[0].message, data: result.error});
    else
    next();
}
// Validates booking approval.
const approveBooking = (req, res, next) => {
    const result = validation.validateApproveBooking(req.body);
    if(result.error)
    res.send({code: constants.responseFlags.BAD_REQUEST, message: result.error.details[0].message, data: result.error});
    else
    next();
}
// Validates view all bookings.
const viewAllBookings = (req, res, next) => {
    const result = validation.validateViewAllBookings(req.body);
    if(result.error)
    res.send({code: constants.responseFlags.BAD_REQUEST, message: result.error.details[0].message, data: result.error});
    else
    next();
}
// Validates booking completion.
const completeBooking = (req, res, next) => {
    const result = validation.validateCompleteBooking(req.body);
    if(result.error)
    res.send({code: constants.responseFlags.BAD_REQUEST, message: result.error.details[0].message, data: result.error});
    else
    next();
}

module.exports.registration       = registration;
module.exports.login              = login;
module.exports.newBooking         = newBooking;
module.exports.checkBookingStatus = checkBookingStatus;
module.exports.approveBooking     = approveBooking;
module.exports.viewAllBookings    = viewAllBookings;
module.exports.completeBooking    = completeBooking;