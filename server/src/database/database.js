
const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

connection.connect((err) => {
    if (err) {
        console.log(err.message);
    }
    console.log('database:' + connection.state);
})


class dbService {
    static getDbServiceInstance() {
        return instance ? instance : new dbService();
    }

    // TABLE dishes
    async getAllDataFromDishes() {
        try {
        
        } catch (err) {
            console.log(err);
        }
    }


    // TABLE orders
    async getAllDataFromOrders() {
        try {
        
        } catch (err) {
            console.log(err);
        }
    }


    // TABLE tables
    async getAllDataFromTables() {
        try {
            
        } catch (err) {
            console.log(err);
        }
    }
    
}

module.exports = dbService;