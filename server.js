/*
    This application provides user with the following functionalities :-
     - register customers and drivers
     - login customers, drivers and admins.
     - book rides
     - view booking status
     - approve booking
     - complete booking
     - logging booking details.
*/

const services        = require('./services/startup-service');
const registration    = require('./routes/registration');
const login           = require('./routes/login');
const booking         = require('./routes/booking');
const swaggerUI       = require('swagger-ui-express');
const swaggerDocument = require('./dist/swagger.json');

// Intialize databases and server.
services.initializeServer();

services.app.use('/api-docs',swaggerUI.serve, swaggerUI.setup(swaggerDocument));
services.app.use('/register', registration);
services.app.use('/login', login);
services.app.use('/bookings', booking);
