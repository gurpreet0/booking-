const bcrypt   = require('bcrypt');
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