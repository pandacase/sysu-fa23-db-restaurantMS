
const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const dbService = require('../database/database');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false}));

const orderGet = (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getAllDataFromOrders();

    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
}

const orderAdd = (request, response) => {
    const { item_list } = request.body;
    const { total_price } = request.body;
    const db = dbService.getDbServiceInstance();
    const result = db.insertToOrders(item_list, total_price);
    
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
}

const orderDelete = (request, response) => {
    const { id } = request.params;
    const db = dbService.getDbServiceInstance();
    const result = db.deleteByIdFromOrders(id);

    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
}

const orderUpdate = (request, response) => {
    const { id } = request.body;
    const { item_list } = request.body;
    const { total_price } = request.body;
    const db = dbService.getDbServiceInstance();
    const result = db.updateOrder(id, item_list, total_price);

    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
}


// get
app.get('/get', orderGet)

// add
app.post('/add', orderAdd);

// delete
app.delete('/delete/:id', orderDelete)

// update
app.patch('/update', orderUpdate)


module.exports = app;