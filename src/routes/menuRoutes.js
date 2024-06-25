
const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const controller = require('../controllers/menuControllers');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false}));

// get
app.get('/get', controller.menuGet);

// add
app.post('/add', controller.menuAdd);

// delete
app.delete('/delete/:id', controller.menuDelete)

// update
app.patch('/update', controller.menuUpdate)


module.exports = app;