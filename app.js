const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const cinemaRouter = require('./routes/cinema');
const movieRouter = require('./routes/movie');
const screeningRouter = require('./routes/screening');
const ticketRouter = require('./routes/ticket');

const app = express();

// Enable cross origin resource sharing: https://enable-cors.org/server_expressjs.html
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/cinemas', cinemaRouter);
app.use('/movies', movieRouter);
app.use('/screenings', screeningRouter);
app.use('/tickets', ticketRouter);

module.exports = app;
