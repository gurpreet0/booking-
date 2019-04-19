/*
        This file contains methods which provides booking related services.
*/
const Bluebird        = require('bluebird');
const constants       = require('../properties/constants.js');
const generalServices = require('./general-services.js');
const bookings        = new Map();
const drivers         = new Map();
let emailCustomer;

/**
 * 
 * @param {*} booking 
 * @param {*} customer_id 
 * @param {*} fare 
 */
const insertBooking = (booking, customer_id, fare) => {
    return new Promise((resolve, reject) => {
        let values =[];
        let sqlQuery = `INSERT INTO booking ( booking_id, booked_by, lat_from, lon_from, lat_to, lon_to, fare, status) VALUES (?);`;
        values.push(null, customer_id,booking.lat_from,booking.lon_from,booking.lat_to,booking.lon_to,fare,'PENDING');
        connection.query(sqlQuery, [values], (err, rows, fields) => {
            if(err)
            reject({code: constants.responseFlags.INTERNAL_ERROR, message: err, data: null});
            else{
                booking.booked_id = rows.insertId;
                resolve({code: constants.responseFlags.BOOKING_SUCCESSFUL, message: constants.responseMessages.BOOKING_SUCCESSFUL, data: booking});
            }
        });
    });
}


const isDriverBlocked = (driverId) => {
    return new Promise((resolve, reject) => {
        db.collection('driver').find({driver_id: driverId}).project({ _id: 0}).toArray((err, result) => {
            if(err)
            reject({code: constants.responseFlags.INTERNAL_ERROR, message: err, data: null});
            else
            resolver(result[0].block_status);
          });
    });
}



/**
 * 
 * @param {*} booking 
 * @param {*} user 
 */
const requestBooking = (booking, user) => {
    return new Promise((resolve, reject) => {
        Bluebird.coroutine(function*() {
            if(bookings.has(user.email))
            return reject({code: constants.responseFlags.BOOKING_PENDING, message: constants.responseMessages.BOOKING_PENDING, data: booking});
            const fare = 25.60;
            const customer_id = yield generalServices.getIdByEmail(user.email, 'customer');
            const bookingStatus = yield insertBooking(booking, customer_id, fare);
            bookings.set(user.email, bookingStatus.booked_id);
            delete bookingStatus.data.token;
            return bookingStatus;
        })().then((result) => resolve(result), (err) => reject(err));
    });
}
/**
 * 
 * @param {*} booking 
 * @param {*} assigned_by 
 */
const approveBooking = (booking, assigned_by) => {
    return new Promise(async(resolve, reject) => {
        let blockStatus = await isDriverBlocked(booking.driver_assigned);
        if( drivers.has(booking.driver_assigned)) {
            reject({code: constants.responseFlags.DRIVER_BUSY, message: constants.responseMessages.DRIVER_BUSY, data: {assigned_booking: drivers.get(booking.driver_assigned)}});
        }
        if( blockStatus ) {
            reject({code: constants.responseFlags.DRIVER_BLOCKED, message: constants.responseMessages.DRIVER_BLOCKED, data: {driver_id: booking.driver_assigned}});
        }
        else {
            const values = [];
            let sqlQuery = `UPDATE booking SET driver_assigned = ?, arrival = ?, assigned_by = ?, status = 'APPROVED' WHERE booking_id = ?`;
            values.push(booking.driver_assigned,booking.arrival,assigned_by,booking.booking_id);
            connection.query(sqlQuery, values, (err, rows, fields) => {
                if(err)
                reject({code: constants.responseFlags.INTERNAL_ERROR, message: err, data: null});
                else {
                    drivers.set(booking.driver_assigned, booking.getBookingId);
                    console.log(emailCustomer);
                    bookings.delete(emailCustomer);
                    delete booking.token;
                    db.collection('registration').insertOne({booking_id: booking.booking_id, driver_assigned: booking.driver_assigned, assigned_by: assigned_by, assign_time: Date()}, (err, result) => {
                        if(err)
                        reject({code: constants.responseFlags.INTERNAL_ERROR, message: err, data: null});
                    });
                    resolve({code: constants.responseFlags.BOOKING_SUCCESSFUL, message: constants.responseMessages.BOOKING_SUCCESSFUL, data: booking});
                }
            });
        }
    });
}
/**
 * 
 * @param {*} booking_id 
 */
const ifApproved = (booking_id) => {
    return new Promise((resolve, reject) => {
        const values = [];
        let sqlQuery = `SELECT driver_assigned FROM booking WHERE booking_id = ?`;
        values.push(booking_id);
        connection.query(sqlQuery,values, (err, rows, fields) => {
            if(err)
            reject({code: constants.responseFlags.INTERNAL_ERROR, message: err, data: null});
            else if(rows.length < 1)
            reject({code: constants.responseFlags.NOT_FOUND, message: constants.responseMessages.NOT_FOUND, data: null});
            else if(!rows[0].driver_assigned)
            reject({code: constants.responseFlags.BOOKING_PENDING, message: constants.responseMessages.BOOKING_PENDING, data: {booking_id: booking_id}});
            else
            resolve(rows[0].driver_assigned);
        });
    });
}
/**
 * 
 * @param {*} userType 
 */
const viewAllBookings = (userType) => {
    return new Promise((resolve, reject) => {
        if(userType == 'admin') {
            connection.query(`SELECT * FROM booking;`, (err, rows, fields) => {
                if(err)
                reject({code: constants.responseFlags.INTERNAL_ERROR, message: err, data: null});
                else if(rows.length < 1)
                reject({code: constants.responseFlags.NOT_FOUND, message: constants.responseMessages.NOT_FOUND, data: null});
                else
                resolve({code: constants.responseFlags.SUCCESS, message: constants.responseMessages.SUCCESS, data: rows});
            });
        }
        else
        reject({code: constants.responseFlags.ACCESS_DENIED, message: constants.responseMessages.ACCESS_DENIED, data: null});
    });
    
}
/**
 * 
 * @param {*} booking_id 
 * @param {*} driver_assigned 
 * @param {*} status 
 */
const setBookingStatus = (booking_id, driver_assigned, status) => {
    return new Promise((resolve, reject) => {
        const values = [];
        let sqlQuery = `UPDATE booking SET status = ? WHERE booking_id = ? AND driver_assigned = ?`
        values.push(status,booking_id,driver_assigned);
        connection.query(sqlQuery, values, (err, rows, fields) => {
            if(err)
            reject({code: constants.responseFlags.INTERNAL_ERROR, message: err, data: null});
            else if(rows.affectedRows < 1)
            reject({code: constants.responseFlags.NOT_FOUND, message: constants.responseMessages.NOT_FOUND, data: null});
            else {
                bookings.forEach(function (value,key) { 
                    if(value == booking_id)
                    bookings.delete(key); 
                 });
                db.collection('registration').updateOne({booking_id: booking_id}, {$set: {completion_time: Date()}}, (err, result) => {
                    if(err)
                    reject({code: constants.responseFlags.INTERNAL_ERROR, message: err, data: null});
                });
                drivers.delete(driver_assigned);
                resolve({code: constants.responseFlags.SUCCESS, message: constants.responseMessages.SUCCESS, data: {booked_id: booking_id, status: status}});
            }
        });
    });
}
/**
 * 
 * @param {*} booking_id 
 * @param {*} user 
 */
const getBookingStatus = (booking_id, user) => {
    return new Promise((resolve, reject) => {
        const values = [];
        let sqlQuery = `SELECT status  FROM booking WHERE booking_id = ? AND `;
        values.push(booking_id);
        if(user.type == 'customer'){
            sqlQuery += `booked_by = ?`;
            values.push(user.customer_id);  
        }
        else if(user.type == 'driver'){
            sqlQuery += `driver_assigned = ?`;
            values.push(user.driver_id);
        }
        else if(user.type == 'admin')
        {
            sqlQuery += `assigned_by =?;`;
            values.push(user.admin_id);
        }
        connection.query(sqlQuery, values, (err, rows, fields) => {
            if(err)
            reject({code: constants.responseFlags.INTERNAL_ERROR, message: err, data: null});
            else if(rows.length < 1)
            reject({code: constants.responseFlags.NOT_FOUND, message: constants.responseMessages.NOT_FOUND, data: null});
            else
            resolve({code: constants.responseFlags.SUCCESS, message: constants.responseMessages.SUCCESS, data: {booked_id: booking_id, status: rows[0].status}});
        });
    });
}
/**
 * 
 * @param {*} booking_id 
 */
const getBookingInfo = (booking_id) => {
    return new Promise((resolve, reject) => {
        const values = [];
        let sqlQuery = `SELECT b.booking_id, b.booked_by, c.name AS customer, c.email AS customer_email, c.mobile_num AS customer_mobile_num, d.name AS driver, d.mobile_num AS driver_mobile_num, d.vehicle, b.time, b.arrival, b.lat_from, b.lon_from, b.lat_to, b.lon_to, b.fare  FROM booking b JOIN customer c ON b.booked_by = c.customer_id JOIN driver d ON b.driver_assigned = d.driver_id WHERE b.booking_id = ?`;
        values.push(booking_id);
        connection.query(sqlQuery,values, (err, rows, fields) => {
            if(err)
            reject({code: constants.responseFlags.INTERNAL_ERROR, message: err, data: null});
            else if(rows.length < 1)
            reject({code: constants.responseFlags.NOT_FOUND, message: constants.responseMessages.NOT_FOUND, data: null});
            else
            resolve({code: constants.responseFlags.BOOKING_SUCCESSFUL, message: constants.responseMessages.BOOKING_SUCCESSFUL, data: rows[0]});
        });
    });
}
/**
 * 
 * @param {*} user 
 */
const getBookingHistory = (user) => {
    return new Promise((resolve, reject) => {
        Bluebird.coroutine(function*() {
            let type;
            if(user.type == 'customer')
            type = 'booked_by';
            else if(user.type == 'driver')
            type = 'driver_assigned';
            else if(user.type == 'admin')
            type = 'assigned_by';
            const result = yield generalServices.getBookingId(user[`${user.type}_id`], type);
            return result;
        })().then((result) => resolve(result)).catch((err) => reject(err));
    });
}


module.exports.requestBooking    = requestBooking;
module.exports.approveBooking    = approveBooking;
module.exports.viewAllBookings   = viewAllBookings;
module.exports.ifApproved        = ifApproved;
module.exports.setBookingStatus  = setBookingStatus;
module.exports.getBookingStatus  = getBookingStatus;
module.exports.getBookingHistory = getBookingHistory;
module.exports.getBookingInfo    = getBookingInfo;