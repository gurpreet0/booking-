/*
        This file contains routes for bookings.
*/
const middleware = require('../validation/middleware');
const auth       = require('../authentication/tokens');
const router     = require('express').Router();
const controller = require('../controllers/booking-controller');

router.post('/new', middleware.newBooking, auth.verifyToken, (req, res) => {
    controller.requestBooking(req.body, res.locals.user)
    .then((data) => res.send(data))
    .catch((err) => res.send(err));
});
router.post('/approve', middleware.approveBooking, auth.verifyToken, (req, res) => {
    controller.approveBooking(req.body, res.locals.user)
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
});
router.post('/complete', middleware.completeBooking, auth.verifyToken, (req, res) => {
    controller.completeBooking(req.body.booking_id, res.locals.user)
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
});
router.post('/status', middleware.checkBookingStatus, auth.verifyToken, (req, res) => {
    controller.checkBookingStatus(req.body.booking_id, res.locals.user)
    .then((data) => res.send(data))
    .catch((err) => res.send(err));
});
router.post('/getAll', middleware.viewAllBookings, auth.verifyToken, (req, res) => {
    controller.viewAllBookings(res.locals.user)
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
});
router.post('/history', auth.verifyToken, (req, res) => {
    controller.getBookingHistory(res.locals.user)
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
});
router.post('/logs', auth.verifyToken, (req, res) => {
    controller.checkLogs(res.locals.user)
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
});
router.post('/block',  (req, res) => {
    controller.blockDriver(req.body.driverID)
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
});

module.exports = router;