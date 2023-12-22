
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
    const result = db.getAllDataFromTables();

    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
});

// add
app.post('/add', (request, response) => {
    const { table_id } = request.body;
    const { type } =request.body;
    const { customer_num } = request.body;
    const db = dbService.getDbServiceInstance();
    const result = db.insertToTables(table_id, type, customer_num);
    
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});

// delete
app.delete('/delete/:id', (request, response) => {
    const { id } = request.params;
    const db = dbService.getDbServiceInstance();
    const result = db.deleteByIdFromTables(id);

    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
})

// update
app.patch('/update', (request, response) => {
    const { id } = request.body;
    const { table_id } = request.body;
    const { type } = request.body;
    const { customer_num } = request.body;
    const db = dbService.getDbServiceInstance();
    const result = db.updateTable(id, table_id, type, customer_num);

    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
})

// clear table
app.patch('/clear:id', (request, response) => {
    const { id } = request.params;
    const db = dbService.getDbServiceInstance();
    const result = db.clearTableById(id);

    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
})


module.exports = app;