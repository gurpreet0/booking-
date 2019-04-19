/*
        This file intializes database connections and the server.
*/
const express  = require('express');
const Agenda    = require('agenda');
//const socket   = require('socket.io');
const genSalt  = require('bcrypt').genSalt;
const hash     = require('bcrypt').hash;
const Bluebird = require('bluebird');
const config   = require('../config/config.js');
const sql      = require('../databases/sql.js');
const mongo    = require('../databases/mongo.js');
const app      = express();

app.use(express.json());

// Add admins to database on startup.
const addAdmins = (hashedPassword1, hashedPassword2) => {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO admin VALUES(${null}, 'admin1', 'min1@yeg.com', '${hashedPassword1}', '9666666666'); INSERT INTO admin VALUES(${null}, 'dmin2', 'dmin2@zeg.com', '${hashedPassword2}', '9222222222');`, (err, rows, fields) => {
            if(err) {
                if(err.code == 'ER_DUP_ENTRY')
                resolve();
                else
                reject(err);
            }
            else if(rows.affectedRows >= 1)
            resolve();
        });
    });
}

const initializeAgenda = (mongoDb)=>{
    return new Promise((resolve, reject)=>{
        const agendaInstance = new Agenda({
            mongo: mongoDb
        });
        resolve(agendaInstance);
    });
}

// Initializes databases and the server.
const initializeServer = function () {
        Bluebird.coroutine(function * () {
            db = yield mongo.initialize(config.mongoConfig);
            connection = yield sql.intialize(config.sqlConfig);
            const salt1 = yield genSalt(10);
            const salt2 = yield genSalt(10);
            const hashedPassword1 = yield hash('adminxyz', salt1);
            const hashedPassword2 = yield hash('admin2yz', salt2);
            agenda = yield initializeAgenda(db);
            return yield addAdmins(hashedPassword1, hashedPassword2);
            
        })().then(() => {
            const server = app.listen(3000);
        }).catch((err) => {console.log(err); process.exit(1)});
}

module.exports.app              = app;
module.exports.initializeServer = initializeServer;