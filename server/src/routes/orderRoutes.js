
const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const controller = require('../controllers/orderControllers');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false}));


// get 
app.get('/get', controller.orderGet)

// add
app.post('/add', controller.orderAdd);

// delete
app.delete('/delete/:id', controller.orderDelete)

// update
app.patch('/update', controller.orderUpdate)


module.exports = app;