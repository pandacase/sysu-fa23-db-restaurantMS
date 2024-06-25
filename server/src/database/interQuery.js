

class interQuery {
  constructor(connection) {
    this.connection = connection;
  }

  async getItemListForOrder(orderId) {
    const itemList = await mysqlQuery(`
      SELECT
        d.name, 
        od.quantity
      FROM 
        order_details od
      JOIN 
        dishes d ON od.dish_id = d.id
      WHERE 
        od.order_id = ?
      ORDER BY
    `, [orderId]);
  
    return itemList.map(item => ({
      name: item.name,
      quantity: item.quantity
    }));
  }

  async insertOrder(table_id) {
    const query = "INSERT INTO orders (time_added, table_id) VALUES (CURRENT_TIMESTAMP, ?);";
    const [result] = await this.connection.query(query, [table_id]);
    if (result.affectedRows !== 1) {
      throw new Error("Insert into [ orders ] failed.");
    }
    return result.insertId;
  }

  async updateTable(table_id, customer_num) {
    const query = "UPDATE tables SET customer_num = ? WHERE id = ?;";
    const [result] = await this.connection.query(query, [customer_num, table_id]);
    if (result.affectedRows !== 1) {
      throw new Error("Update [ tables ] failed.");
    }
  }

  async insertOrderDetails(order_id, dish_id, quantity, sub_total) {
    const query = "INSERT INTO order_details (order_id, dish_id, quantity, sub_total) VALUES (?, ?, ?, ?);";
    const [result] = await this.connection.query(query, [order_id, dish_id, quantity, sub_total]);
    if (result.affectedRows !== 1) {
      throw new Error("Insert into [ order_details ] failed.");
    }
  }

  async deleteOrderDetails(order_id) {
    const query = "DELETE FROM order_details WHERE order_id = ?;"
    const [result] = await this.connection.query(query, [order_id]);
    if (result.affectedRows < 1) {
      throw new Error("Delete from [ order_details ] failed.");
    }
  }

  async deleteOrder(id) {
    const query = "DELETE FROM orders WHERE id = ?;";
    const [result] = await this.connection.query(query, [id]);
    if (result.affectedRows !== 1) {
      throw new Error("Delete from [ order ] failed.");
    }
  }

  async updateOrder(order_id, table_id) {
    const query = "UPDATE orders SET table_id = ? WHERE id = ?;";
    const [result] = await this.connection.query(query, [table_id, order_id]);
    if (result.affectedRows !== 1) {
      throw new Error("Update [ order ] failed.");
    }
  }
}

module.exports = interQuery;
