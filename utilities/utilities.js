/*
        This file provides functions for following operations :-
         - sending reset code on email
         - generating random 6 digit reset code
*/
const sendGrid = require('@sendgrid/mail');
const bcrypt   = require('bcrypt');

/**
 * 
 * @param {*} email 
 * @param {*} resetCode 
 */
const sendResetCode = (email, resetCode) => {
    sendGrid.setApiKey("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");
    const message = {
        to: email,
        from: 'test@jungleworks.com',
        subject: 'Reset Password',
        text: `Enter the code provided below to reset your password!\n${resetCode}`,
        html: `<strong>Enter the code provided below to reset your password!\n${resetCode}</strong>`
    }
    sendGrid.send(message);
}

// To generate reset code.
const getResetCode = () => {
    return Math.floor((Math.random()*1000000));
}
/**
 * 
 * @param {*} password 
 */
const hash = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}
/**
 * 
 * @param {*} inputPassword 
 * @param {*} hashedPassword 
 */
const verifyPasswords = async(inputPassword, hashedPassword) => {
    return await bcrypt.compare(inputPassword, hashedPassword);
}

module.exports.hash            = hash;
module.exports.verifyPasswords = verifyPasswords;
module.exports.getResetCode    = getResetCode;
module.exports.sendResetCode   = sendResetCode;