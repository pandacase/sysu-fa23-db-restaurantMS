
const express = require('express');
const app = express();

const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();

const menu = require('./views/menu');
const order = require('./views/order');
const table = require('./views/table');

// set the router
app.use('/menu', menu);
app.use('/order', order);
app.use('/table', table);

// run the app
app.listen(process.env.PORT, () => console.log('App is running'));