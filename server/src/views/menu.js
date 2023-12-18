
const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const dbService = require('../database/database');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false}));

// get
app.get('/get', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getAllDataFromDishes();

    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
})

// search
app.get('/search/:name', (request, response) => {
    const { name } = request.params;
    const db = dbService.getDbServiceInstance();
    const result = db.getByNameFromDishes(name);

    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
})

// create
app.post('/insert', (request, response) => {
    const { name } = request.body;
    const { price } = request.body;
    const { description } = request.body;
    // icon 
    const db = dbService.getDbServiceInstance();
    const result = db.insertToDishes(name);

    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
});

// delete
app.delete('/delete/:id', (request, response) => {
    const { id } = request.params;
    const db = dbService.getDbServiceInstance();
    const result = db.deleteByIdFromDishes(id);

    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
})

// update
app.patch('/update', (request, response) => {
    const { id } = request.body;
    const { name } = request.body;
    const { price } = request.body;
    const { description } = request.body;
    // icon 
    const db = dbService.getDbServiceInstance();
    const result = db.TMP(id, name);

    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
})


module.exports = app;