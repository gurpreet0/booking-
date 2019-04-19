/*
        This file creates mongodb connection;
*/
const MongoClient = require('mongodb').MongoClient;

/**
 * 
 * @param {*} config 
 */
const initialize = function (config) {
    return new Promise((resolve, reject) => {
        const url = config.url;
        const dbName = config.dbName;
        const client = new MongoClient(url);
        client.connect(function(err, client) {
            if(err)
            return reject(err);
            return resolve(client.db(dbName));
        });
    })
}

module.exports.initialize = initialize;