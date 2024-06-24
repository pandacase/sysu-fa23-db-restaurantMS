

class interQuery {
  constructor(connection) {
    this.connection = connection;
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
}

module.exports = interQuery;
