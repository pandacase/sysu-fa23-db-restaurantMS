
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
})

// create
app.post('/insert', (request, response) => {
    const { table_id } = request.body;
    const { type } =request.body;
    const db = dbService.getDbServiceInstance();
    const result = db.TMP(table_id);
    
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