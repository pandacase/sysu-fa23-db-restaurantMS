
const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const dbService = require('../database/database');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false}));

const menuGet = (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getAllDataFromDishes();

    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
}

const menuAdd = (request, response) => {
    const { name } = request.body;
    const { price } = request.body;
    const { description } = request.body;
    // icon 
    const db = dbService.getDbServiceInstance();
    const result = db.insertToDishes(name, price, description);

    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
}

const menuDelete = (request, response) => {
    const { id } = request.params;
    const db = dbService.getDbServiceInstance();
    const result = db.deleteByIdFromDishes(id);

    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
}

const menuUpdate = (request, response) => {
    const { id } = request.body;
    const { name } = request.body;
    const { price } = request.body;
    const { description } = request.body;
    // icon 
    const db = dbService.getDbServiceInstance();
    const result = db.updateDish(id, name, price, description);

    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
}

// get
app.get('/get', menuGet);

// add
app.post('/add', menuAdd);

// delete
app.delete('/delete/:id', menuDelete)

// update
app.patch('/update', menuUpdate)


module.exports = app;