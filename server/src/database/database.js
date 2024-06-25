
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const interQuery = require('./interQuery');
let instance = null;
dotenv.config();


// Create a connection pool
const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 100, // max connection num
  queueLimit: 0
});

console.log('Connection pool created');

// Only close the pool when the APP is shut down.
process.on('SIGINT', async () => {
  await pool.end();
  console.log('Pool closed');
  process.exit(0);
});



class dbService {
  static getDbServiceInstance() {
    return instance ? instance : new dbService();
  }

  ////////////////////////////////////////////////////////////////
  //// For /menu 
  ////////////////////////////////////////////////////////////////
  
  /**
   * Retrieve all dishes data from the database.
   * 
   * @returns {Array} - An array containing all the dishes data.
   */
  async getAllDataFromDishes() {
    let connection;
    try {
      connection = await pool.getConnection();
      const query = "SELECT * FROM dishes;";
      const [rows] = await connection.query(query);
      return rows;
    } catch (err) {
      console.error(
        "Error during dbService::getAllDataFromDishes:", err);
      throw err;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }

  /**
   * Insert a new dish into the database with the provided details.
   * 
   * @param {string} name - The name of the new dish.
   * @param {number} price - The price of the new dish.
   * @param {string} description - The description of the new dish.
   * 
   * @returns {boolean} - True if the insertion was successful, 
   * false otherwise.
   */
  async insertToDishes(name, price, description) {
    let connection;
    try {
      connection = await pool.getConnection();
      const query = `
        INSERT INTO dishes (name, price, description) 
        VALUES (?, ?, ?);`;
      const [result] = await connection.query(
        query, [name, price, description]);
      return result.affectedRows === 1;
    } catch (err) {
      console.error(
        "Error during dbService::insertToDishes:", err);
      throw err;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }
  
  /**
   * Delete a dish from the database by its ID.
   * 
   * @param {number} id - The ID of the dish to be deleted.
   * 
   * @returns {boolean} - True if the deletion was successful, 
   * false otherwise.
   */
  async deleteByIdFromDishes(id) {
    let connection;
    try {
      connection = await pool.getConnection();
      const query = "DELETE FROM dishes WHERE id = ?;";
      const [result] = await connection.query(query, [id]);
      return result.affectedRows === 1;
    } catch (err) {
      console.error(
        "Error during dbService::deleteByIdFromDishes:", err);
      throw err;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }

  /**
   * Update the details of a dish in the database by its ID.
   * 
   * @param {number} id - The ID of the dish to be updated.
   * @param {string} name - The updated name of the dish.
   * @param {number} price - The updated price of the dish.
   * @param {string} description - The updated description 
   * of the dish.
   * 
   * @returns {boolean} - True if the update was successful, 
   * false otherwise.
   */
  async updateDish(id, name, price, description) {
    let connection;
    try {
      connection = await pool.getConnection();
      const query = `
        UPDATE dishes SET name = ?, price = ?, description = ? 
        WHERE id = ?;`;
      const [result] = await connection.query(
        query, [name, price, description, id]);
      return result.affectedRows === 1;
    } catch (err) {
      console.error(
        "Error during dbService::updateDish:", err);
      throw err;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }

  ////////////////////////////////////////////////////////////////
  //// For /orders
  ////////////////////////////////////////////////////////////////
  
  /**
   * Select list from orders (JOIN order_details, JOIN dishes).
   * 
   * @returns {Object[]} - An array of table data, each object is:
   * {order_id, time_added, table_id, total_price, item_list}
   */
  async getAllDataFromOrders() {
    let connection;
    try {
      connection = await pool.getConnection();

      const result = await mysqlQuery(`
        SELECT 
          o.id AS order_id, 
          o.time_added, 
          o.table_id,
          SUM(od.sub_total) AS total_price
        FROM 
          orders o
        JOIN 
          order_details od ON o.id = od.order_id
        GROUP BY 
          o.id, o.time_added, o.table_id
      `);
      
      const formattedResult = await Promise.all(
        result.map(async order => ({
          ...order,
          item_list: await getItemListForOrder(order.order_id)
      })));

      return formattedResult;
    } catch (err) {
      console.error(
        "Error during dbService::getAllDataFromOrders:", err);
      throw err;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }

  /**
   * Insert new order into database.
   * 
   * @param {Object[]} item_list - Order's item list
   * @param {string} item_list[].name - A dish's name
   * @param {number} item_list[].quantity - A dish's quantity
   * @param {number} table_id - The table number to which the order 
   * belongs
   * @param {number} customer_num - The number of customers to which 
   * the order belongs
   * 
   * @returns {boolean} - True if the whole Transaction is commited.
   */
  async insertToOrders(item_list, table_id, customer_num) {
    let connection;
    try {
      connection = await pool.getConnection();
      await connection.beginTransaction();
  
      const inter = new interQuery(connection);
  
      const orderId = await inter.insertOrder(table_id);
      await inter.updateTable(table_id, customer_num);
  
      const dishNames = item_list.map(item => item.name);
      const [dishes] = await connection.query(
        `SELECT id, name, price FROM dishes 
        WHERE name IN (?)`, [dishNames]);
  
      for (let i = 0; i < item_list.length; i++) {
        const dish = item_list[i];
        const dishInfo = dishes.find(d => d.name === dish.name);
        const subTotal = dish.quantity * dishInfo.price;
        await inter.insertOrderDetails(
          orderId, dishInfo.id, dish.quantity, subTotal);
      }
  
      await connection.commit();
      return true;
    } catch (error) {
      console.error(
        "Error during dbService::insertToOrders:", error);
        if (connection) {
          await connection.rollback();
        }
      throw error;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }

  /**
   * Delete from orders by id.
   * 
   * @param {number} id - orders primary key: id
   * 
   * @returns {boolean} - True if the whole Transaction is commited.
   */
  async deleteByIdFromOrders(id) {
    let connection;
    try {
      connection = await pool.getConnection();
      await connection.beginTransaction();

      const inter = new interQuery(connection);
      await inter.deleteOrderDetails(id);
      await inter.deleteOrder(id);
      
      await connection.commit();
      return true;
    } catch (err) {
      console.error(
        "Error during dbService::deleteByIdFromOrders:", err);
      if (connection) {
        await connection.rollback();
      }
      throw err;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }

  /**
   * Update order with id.
   * 
   * @param {number} id 
   * @param {Object[]} item_list - Order's item list
   * @param {string} item_list[].name - A dish's name
   * @param {number} item_list[].quantity - A dish's quantity
   * @param {number} table_id - A table's id
   * 
   * @returns {boolean} - True if the whole Transaction is commited.
   */
  async updateOrder(id, item_list, table_id) {
    let connection;
    try {
      connection = await pool.getConnection();
      await connection.beginTransaction();

      const inter = new interQuery(connection);
      // Step 1, update table_id
      await inter.updateOrder(id, table_id);
      // Step 2, update item_list in order_details
      // Step 2.1, delete original order_details related
      await inter.deleteOrderDetails(id);
      // Step 2.2, add new item_list -> order_details
      const dishNames = item_list.map(item => item.name);
      const [dishes] = await connection.query(
        `SELECT id, name, price FROM dishes 
        WHERE name IN (?)`, [dishNames]);
  
      for (let i = 0; i < item_list.length; i++) {
        const dish = item_list[i];
        const dishInfo = dishes.find(d => d.name === dish.name);
        const subTotal = dish.quantity * dishInfo.price;
        await inter.insertOrderDetails(
          id, dishInfo.id, dish.quantity, subTotal);
      }
  
      await connection.commit();
      return true;
    } catch (err) {
      console.error(
        "Error during dbService::updateOrder:", err);
      if (connection) {
        await connection.rollback();
      }
      throw err;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }

  ////////////////////////////////////////////////////////////////
  //// For /tables 
  ////////////////////////////////////////////////////////////////

  /**
   * Retrieve all data from the tables in the database.
   * 
   * @returns {Object[]} - An array of table data, each object 
   * representing a table.
   */
  async getAllDataFromTables() {
    let connection;
    try {
      connection = await pool.getConnection();
      const query = "SELECT * FROM tables;";
      const [rows] = await connection.query(query);
      return rows;
    } catch (err) {
      console.error(
        "Error during dbService::getAllDataFromTables:", err);
      throw err;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }

  /**
   * Insert a new table into the database.
   * 
   * @param {string} type - The type of the table.
   * @param {number} customer_num - The number of customers the 
   * table can accommodate.
   * 
   * @returns {boolean} - True if the insertion was successful, 
   * false otherwise.
   */
  async insertToTables(type, customer_num) {
    let connection;
    try {
      connection = await pool.getConnection();
      const query = `
        INSERT INTO tables (type, customer_num) 
        VALUES(?, ?);`;
      const [result] 
        = await connection.query(query, [type, customer_num]);
      return result.affectedRows === 1;
    } catch (err) {
      console.error(
        "Error during dbService::insertToTables:", err);
      throw err;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }

  /**
   * Delete a table from the database by its ID.
   * 
   * @param {number} id - The ID of the table to be deleted.
   * 
   * @returns {boolean} - True if the deletion was successful, 
   * false otherwise.
   */
  async deleteByIdFromTables(id) {
    let connection;
    try {
      connection = await pool.getConnection();
      const query = "DELETE FROM tables WHERE id = ?;";
      const [result] = await connection.query(query, [id]);
      return result.affectedRows === 1;
    } catch (err) {
      console.error(
        "Error during dbService::deleteByIdFromTables:", err);
      throw err;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }

  /**
   * Update the type and customer number of a table in the database 
   * by its ID.
   * 
   * @param {number} id - The ID of the table to be updated.
   * @param {string} type - The updated type of the table.
   * @param {number} customer_num - The updated number of customers 
   * the table can accommodate.
   * 
   * @returns {boolean} - True if the update was successful, 
   * false otherwise.
   */
  async updateTable(id, type, customer_num) {
    let connection;
    try {
      connection = await pool.getConnection();
      const query = `
        UPDATE tables SET type = ?, customer_num = ? 
        WHERE id = ?;`;
      const [result] = await connection.query(
        query, [type, customer_num, id]);
      return result.affectedRows === 1;
    } catch (err) {
      console.error("Error during dbService::updateTable:", err);
      throw err;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }

  /**
   * Clear the table by setting the number of customers to 0, identified 
   * by its ID.
   * 
   * @param {number} id - The ID of the table to be cleared.
   * 
   * @returns {boolean} - True if the table was successfully cleared, 
   * false otherwise.
   */
  async clearTableById(id) {
    let connection;
    try {
      connection = await pool.getConnection();
      const query = "UPDATE tables SET customer_num = 0 WHERE id = ?;";
      const [result] = await connection.query(query, [id]);
      return result.affectedRows === 1;
    } catch (err) {
      console.error("Error during dbService::clearTableById:", err);
      throw err;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }
}

module.exports = dbService;