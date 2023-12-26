
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
    console.log('Database:' + connection.state);
})


class dbService {
    static getDbServiceInstance() {
        return instance ? instance : new dbService();
    }

    // TABLE dishes
    async getAllDataFromDishes() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM dishes;";
                connection.query(query, (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                });
            });
            return response;
        } catch (err) {
            console.log(err);
        }
    }

    async insertToDishes(name, price, description) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "INSERT INTO dishes (name, price, description) VALUES (?, ?, ?);";
                connection.query(query, [name, price, description], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                });
            });
            return response === 1 ? true : false;
        } catch (err) {
            console.log(err);
        }
    }

    async deleteByIdFromDishes(id) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM dishes WHERE id = ?;";
                connection.query(query, [id], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                });
            });
            console.log(response);
            return response === 1 ? true : false;
        } catch (err) {
            console.log(err);
        }
    }

    async updateDish(id, name, price, description) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE dishes SET name = ?, price = ?, description = ? WHERE id = ?;";
                connection.query(query, [name, price, description, id], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                });
            });
            console.log(response);
            return response === 1 ? true : false;
        } catch (err) {
            console.log(err);
        }
    }

    // TABLE orders
    async getAllDataFromOrders() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM orders;";
                connection.query(query, (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                });
            });
            return response;
        } catch (err) {
            console.log(err);
        }
    }

    async insertToOrders(item_list, total_price) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "INSERT INTO orders (time_added, item_list, total_price) VALUES (FROM_UNIXTIME(?, '%Y-%m-%d %H:%i:%s'), ?, ?);";
                const item_list_json = JSON.stringify(item_list);
                const time_stamp = Date.now() / 1000;   // Convert milliseconds to seconds
                connection.query(query, [time_stamp, item_list_json, total_price], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                });
            });
            return response === 1 ? true : false;
        } catch (err) {
            console.log(err);
        }
    }

    async deleteByIdFromOrders(id) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM orders WHERE id = ?;";
                connection.query(query, [id], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                });
            });
            console.log(response);
            return response === 1 ? true : false;
        } catch (err) {
            console.log(err);
        }
    }

    async updateOrder() {

    }

    // TABLE tables
    async getAllDataFromTables() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM tables;";
                connection.query(query, (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                });
            });
            return response;
        } catch (err) {
            console.log(err);
        }
    }

    async insertToTables(table_id, type, customer_num) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "INSERT INTO tables (table_id, type, customer_num) VALUES(?, ?, ?);";
                connection.query(query, [table_id, type, customer_num], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                });
            });
            return response === 1 ? true : false;
        } catch (err) {
            console.log(err);
        }
    }

    async deleteByIdFromTables(id) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM tables WHERE id = ?;";
                connection.query(query, [id], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                });
            });
            console.log(response);
            return response === 1 ? true : false;
        } catch (err) {
            console.log(err);
        }
    }

    async updateTable(id, table_id, type, customer_num) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE tables SET table_id = ?, type = ?, customer_num = ? WHERE id = ?;";
                connection.query(query, [table_id, type, customer_num, id], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                });
            });
            console.log(response);
            return response === 1 ? true : false;
        } catch (err) {
            console.log(err);
        }
    }

    async clearTableById(id) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE tables SET customer_num = 0 WHERE id = ?;";
                connection.query(query, [id], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                });
            });
            console.log(response);
            return response === 1 ? true : false;
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = dbService;