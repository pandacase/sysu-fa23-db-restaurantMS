
const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const controller = require('../controllers/tableControllers');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false}));

// get
app.get('/get', controller.tableGet);

// add
app.post('/add', controller.tableAdd);

// delete
app.delete('/delete/:id', controller.tableDelete);

// update
app.patch('/update', controller.tableUpdate);

// clear table
app.patch('/clear:id', controller.tableClear);

module.exports = app;