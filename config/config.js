/*
        This file contains database credentials
*/

// MySql credentials.
const sqlConfig = {
    host: 'localhost',
    user: 'root',
    password: 'dreambook',
    database: 'application',
    multipleStatements: true
};

// Mongodb credentials.
const mongoConfig = {
    url: 'mongodb://localhost:27017',
    dbName: 'assignment7'
}

module.exports.sqlConfig   = sqlConfig;
module.exports.mongoConfig = mongoConfig;