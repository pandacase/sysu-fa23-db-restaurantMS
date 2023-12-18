
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
    const result = db.getAllDataFromOrders();

    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
})

// search
app.get('/search/date', (request, response) => {
    const { date_left } = request.body;
    const { date_right } = request.body;
    const db = dbService.getDbServiceInstance();
    const result = db.TMP(date);

    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
})

app.get('/search/price', (request, response) => {
    const { price_left } = request.body;
    const { price_right } = request.body;
    const db = dbService.getDbServiceInstance();
    const result = db.TMP(date);

    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
})

// add
app.post('/insert', (request, response) => {
    const { name } = request.body;
    const db = dbService.getDbServiceInstance();
    const result = db.TMP(name);
    
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
});

// delete
app.delete('/delete/:id', (request, response) => {
    const { id } = request.params;
    const db = dbService.getDbServiceInstance();
    const result = db.TMP(id);

    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
})

// update
app.patch('/update', (request, response) => {
    const { id } = request.body;
    const { name } = request.body;
    const db = dbService.getDbServiceInstance();
    const result = db.TMP(id, name);

    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
})

module.exports = app;