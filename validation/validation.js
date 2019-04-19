/*
        This file provides functions to validate following APIs :-
         - registration
         - login
         - booking
*/
const Joi             = require('joi');
const nameSchema      = Joi.string().min(3).max(45).required();
const emailSchema     = Joi.string().email({minDomainAtoms: 2}).required();
const passwordSchema  = Joi.string().min(5).max(15).required();
const resetCodeSchema = Joi.number().required().positive();
const mobileNum       = Joi.string().min(10).max(10).required();
const userType        = Joi.string().required();
const latLon          = Joi.number().required();
const token           = Joi.string().required(); 
const booking_id      = Joi.number().required();
const driver_assigned = Joi.number().required();
const arrival         = Joi.string().required();
const vehicle         = Joi.string().optional();

/**
 * 
 * @param {*} registrationDetails 
 */
const validateRegistration = (registrationDetails) => {
    const registrationSchema = {
        name        : nameSchema,
        email       : emailSchema,
        password    : passwordSchema,
        mobile_num  : mobileNum,
        vehicle     : vehicle,
        type        : userType
    };
    const result = Joi.validate(registrationDetails, registrationSchema);
    return result;
}
/**
 * 
 * @param {*} loginDetails 
 */
const validateLogin = (loginDetails) => {
    const loginSchema = {
        email       : emailSchema,
        password    : passwordSchema,
        type        : userType
    };
    const result = Joi.validate(loginDetails, loginSchema);
    return result;
}
/**
 * 
 * @param {*} body 
 */
const validateNewBooking = (body) => {
    const loginSchema = {
        lat_from    : latLon,
        lon_from    : latLon,
        lat_to      : latLon,
        lon_to      : latLon,
        token       : token
    };
    const result = Joi.validate(body, loginSchema);
    return result;
}
/**
 * 
 * @param {*} body 
 */
const validateApproveBooking = (body) => {
    const loginSchema = {
        booking_id      : booking_id,
        driver_assigned : driver_assigned,
        arrival         : arrival,
        token           : token
    };
    const result = Joi.validate(body, loginSchema);
    return result;
}
/**
 * 
 * @param {*} body 
 */
const validateCheckBookingStatus = (body) => {
    const loginSchema = {
        booking_id      : booking_id,
        token           : token
    };
    const result = Joi.validate(body, loginSchema);
    return result;
}
/**
 * 
 * @param {*} body 
 */
const validateViewAllBookings = (body) => {
    const loginSchema = {
        token           : token
    };
    const result = Joi.validate(body, loginSchema);
    return result;
}
/**
 * 
 * @param {*} body 
 */
const validateCompleteBooking = (body) => {
    const loginSchema = {
        booking_id      : booking_id,
        token           : token
    };
    const result = Joi.validate(body, loginSchema);
    return result;
}
/**
 * 
 * @param {*} changePasswordDetails 
 */
const validateChangePassword = (changePasswordDetails) => {
    const changePasswordSchema = {
        password    : passwordSchema,
        passwordNew : passwordSchema
    };
    const result = Joi.validate(changePasswordDetails, changePasswordSchema);
    return result;
}
/**
 * 
 * @param {*} email 
 */
const validateForgotStep1 = (email) => {
    const result = Joi.validate(email, emailSchema);
    return result;
}
/**
 * 
 * @param {*} resetDetails 
 */
const validateForgotStep3 = (resetDetails) => {
    const resetSchema = {
        resetCode   : resetCodeSchema,
        passwordNew : passwordSchema
    }
    const result = Joi.validate(resetDetails, resetSchema);
    return result;
}

module.exports.validateRegistration       = validateRegistration;
module.exports.validateLogin              = validateLogin;
module.exports.validateNewBooking         = validateNewBooking;
module.exports.validateApproveBooking     = validateApproveBooking;
module.exports.validateCheckBookingStatus = validateCheckBookingStatus;
module.exports.validateViewAllBookings    = validateViewAllBookings;
module.exports.validateCompleteBooking    = validateCompleteBooking;
module.exports.validateChangePassword     = validateChangePassword;
module.exports.validateForgotStep1        = validateForgotStep1;
module.exports.validateForgotStep3        = validateForgotStep3;