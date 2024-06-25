
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const interQuery = require('./interQuery');
let instance = null;
dotenv.config();


// 创建连接池
const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 100, // 可以根据需要调整连接数
  queueLimit: 0
});

console.log('Connection pool created');

// 连接池不需要关闭每个连接，只在应用关闭时关闭池
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
  async getAllDataFromDishes() {
    let connection;
    try {
      connection = await pool.getConnection();
      const query = "SELECT * FROM dishes;";
      const [rows] = await connection.query(query);
      return rows;
    } catch (err) {
      console.error("Error during the query execution:", err);
      throw err;
    } finally {
      if (connection) {
        connection.release(); // 无论成功或失败，都释放连接回池中
      }
    }
  }

  async insertToDishes(name, price, description) {
    let connection;
    try {
      connection = await pool.getConnection();
      const query = "INSERT INTO dishes (name, price, description) VALUES (?, ?, ?);";
      const [result] = await connection.query(query, [name, price, description]);
      return result.affectedRows === 1;
    } catch (err) {
      console.error("Error during inserting data:", err);
      throw err;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }
  

  async deleteByIdFromDishes(id) {
    let connection;
    try {
      connection = await pool.getConnection();
      const query = "DELETE FROM dishes WHERE id = ?;";
      const [result] = await connection.query(query, [id]);
      return result.affectedRows === 1;
    } catch (err) {
      console.error("Error during deleting data:", err);
      throw err;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }

  async updateDish(id, name, price, description) {
    let connection;
    try {
      connection = await pool.getConnection();
      const query = "UPDATE dishes SET name = ?, price = ?, description = ? WHERE id = ?;";
      const [result] = await connection.query(query, [name, price, description, id]);
      return result.affectedRows === 1;
    } catch {
      console.error("Error during updating data:", err);
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
   * Select {order_id, time_added, table_id, item_list, total_price}
   * list from orders (JOIN order_details, JOIN dishes).
   * 
   * @returns Data table.
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
      
      const formattedResult = await Promise.all(result.map(async order => ({
        ...order,
        item_list: await getItemListForOrder(order.order_id)
      })));

      return formattedResult;
    } catch {
      console.error("Error during dbService::getAllDataFromOrders:", err);
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
   * @param {number} table_id - The table number to which the order belongs
   * @param {number} customer_num - The number of customers to which the order belongs
   * 
   * @returns True if the whole Transaction is commited.
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
        "SELECT id, name, price FROM dishes WHERE name IN (?)", [dishNames]);
  
      for (let i = 0; i < item_list.length; i++) {
        const dish = item_list[i];
        const dishInfo = dishes.find(d => d.name === dish.name);
        const subTotal = dish.quantity * dishInfo.price;
        await inter.insertOrderDetails(orderId, dishInfo.id, dish.quantity, subTotal);
      }
  
      await connection.commit();
      return true;
    } catch (error) {
      console.error("Error during inserting data:", error);
      await connection.rollback();
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
   * @returns True if the whole Transaction is commited.
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
      console.error("Error during dbService::deleteByIdFromOrders:", err);
      connection.rollback();
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
   * @returns True if the whole Transaction is commited.
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
        "SELECT id, name, price FROM dishes WHERE name IN (?)", [dishNames]);
  
      for (let i = 0; i < item_list.length; i++) {
        const dish = item_list[i];
        const dishInfo = dishes.find(d => d.name === dish.name);
        const subTotal = dish.quantity * dishInfo.price;
        await inter.insertOrderDetails(orderId, dishInfo.id, dish.quantity, subTotal);
      }
  
      await connection.commit();
      return true;
    } catch (err) {
      console.error("Error during dbService::updateOrder:", err);
      connection.rollback();
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

  // select
  async getAllDataFromTables() {
    let connection;
    try {
      connection = await pool.getConnection();
      const query = "SELECT * FROM tables;";
      const [rows] = await connection.query(query);
      return rows;
    } catch {
      console.error("Error during dbService::getAllDataFromTables:", err);
      throw err;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }

  // insert
  async insertToTables(type, customer_num) {
    let connection;
    try {
      connection = await pool.getConnection();
      const query = "INSERT INTO tables (type, customer_num) VALUES(?, ?, ?);";
      const [result] = await connection.query(query, [type, customer_num]);
      return result.affectedRows === 1;
    } catch {
      console.error("Error during dbService::insertToTables:", err);
      throw err;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }

  // delete
  async deleteByIdFromTables(id) {
    let connection;
    try {
      connection = await pool.getConnection();
      const query = "DELETE FROM tables WHERE id = ?;";
      const [result] = await connection.query(query, [id]);
      return result.affectedRows === 1;
    } catch (err) {
      console.error("Error during dbService::deleteByIdFromTables:", err);
      throw err;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }

  // update
  async updateTable(id, type, customer_num) {
    let connection;
    try {
      connection = await pool.getConnection();
      const query = "UPDATE tables SET type = ?, customer_num = ? WHERE id = ?;";
      const [result] = await connection.query(query, [type, customer_num, id]);
      return result.affectedRows === 1;
    } catch {
      console.error("Error during dbService::updateTable:", err);
      throw err;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }

  // unuse
  async clearTableById(id) {
    let connection;
    try {
      connection = await pool.getConnection();
      const query = "UPDATE tables SET customer_num = 0 WHERE id = ?;";
      const [result] = await connection.query(query, [id]);
      return result.affectedRows === 1;
    } catch {
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