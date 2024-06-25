
const express = require('express');
const app = express();

const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();

console.log('Initializing...')

const menu = require('./routes/menuRoutes');
const order = require('./routes/orderRoutes');
const table = require('./routes/tableRoutes');

// set the router
app.use('/menu', menu);
app.use('/order', order);
app.use('/table', table);

// run the app
app.listen(process.env.APP_PORT, () => console.log('App is running'));
