

class interQuery {
  constructor(connection) {
    this.connection = connection;
  }

  /**
   * Retrieve item list for a specific order from the database.
   * 
   * @param {number} orderId - The ID of the order to retrieve the 
   * item list for.
   * 
   * @returns {Array} - An array containing the items and their 
   * quantities for the specified order.
   */
  async getItemListForOrder(orderId) {
    const query = `
      SELECT
        d.name, 
        od.quantity
      FROM 
        order_details od
      JOIN 
        dishes d ON od.dish_id = d.id
      WHERE 
        od.order_id = ?;`;

    const [result] = await this.connection.query(query, [orderId]);
    return result;
  }

  /**
   * Insert a new order into the database with the specified table ID.
   * 
   * @param {number} table_id - The ID of the table for the new order.
   * 
   * @returns {number} - The ID of the newly inserted order.
   * 
   * @throws {Error} - If the insertion into the "orders" table fails.
   */
  async insertOrder(table_id) {
    const query = `
      INSERT INTO orders (time_added, table_id) 
      VALUES (CURRENT_TIMESTAMP, ?);`;
    const [result] = await this.connection.query(query, [table_id]);
    if (result.affectedRows !== 1) {
      throw new Error("Insert into [ orders ] failed.");
    }
    return result.insertId;
  }

  /**
   * Update the number of customers for a specific table in the database.
   * 
   * @param {number} table_id - The ID of the table to update.
   * @param {number} customer_num - The new number of customers 
   * for the table.
   * 
   * @throws {Error} - If the update operation on the "tables" 
   * table fails.
   */
  async updateTable(table_id, customer_num) {
    const query = "UPDATE tables SET customer_num = ? WHERE id = ?;";
    const [result] = await this.connection.query(
      query, [customer_num, table_id]);
    if (result.affectedRows !== 1) {
      throw new Error("Update [ tables ] failed.");
    }
  }

  /**
   * Insert order details into the database for a specific order, dish, 
   * quantity, and sub-total.
   * 
   * @param {number} order_id - The ID of the order for the details.
   * @param {number} dish_id - The ID of the dish for the order.
   * @param {number} quantity - The quantity of the dish in the order.
   * @param {number} sub_total - The sub-total for the dish in 
   * the order.
   * 
   * @throws {Error} - If the insertion into the "order_details" 
   * table fails.
   */
  async insertOrderDetails(order_id, dish_id, quantity, sub_total) {
    const query = `
      INSERT INTO order_details (order_id, dish_id, quantity, sub_total)
      VALUES (?, ?, ?, ?);`;
    const [result] = await this.connection.query(
      query, [order_id, dish_id, quantity, sub_total]);
    if (result.affectedRows !== 1) {
      throw new Error("Insert into [ order_details ] failed.");
    }
  }

  /**
   * Delete order details from the database for a specific order.
   * 
   * @param {number} order_id - The ID of the order for which 
   * the details 
   * are to be deleted.
   * 
   * @throws {Error} - If the deletion from the "order_details" 
   * table fails.
   */
  async deleteOrderDetails(order_id) {
    const query = "DELETE FROM order_details WHERE order_id = ?;"
    const [result] = await this.connection.query(query, [order_id]);
    if (result.affectedRows < 1) {
      throw new Error("Delete from [ order_details ] failed.");
    }
  }

  /**
   * Delete a specific order from the database.
   * 
   * @param {number} id - The ID of the order to be deleted.
   * 
   * @throws {Error} - If the deletion from the "orders" table fails.
   */
  async deleteOrder(id) {
    const query = "DELETE FROM orders WHERE id = ?;";
    const [result] = await this.connection.query(query, [id]);
    if (result.affectedRows !== 1) {
      throw new Error("Delete from [ order ] failed.");
    }
  }

  /**
   * Update the table ID for a specific order in the database.
   * 
   * @param {number} order_id - The ID of the order to be updated.
   * @param {number} table_id - The new table ID for the order.
   * 
   * @throws {Error} - If the update operation on the "orders" 
   * table fails.
   */
  async updateOrder(order_id, table_id) {
    const query = "UPDATE orders SET table_id = ? WHERE id = ?;";
    const [result] = await this.connection.query(
      query, [table_id, order_id]);
    if (result.affectedRows !== 1) {
      throw new Error("Update [ order ] failed.");
    }
  }
}

module.exports = interQuery;
