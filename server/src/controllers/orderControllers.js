
const dbService = require('../database/database');

/**
 * Handle the request to retrieve all orders data and send the response.
 * 
 * @param {object} request - The HTTP request object.
 * @param {object} response - The HTTP response object.
 */
exports.orderGet = (request, response) => {
  const db = dbService.getDbServiceInstance();
  const result = db.getAllDataFromOrders();

  return result
    .then(data => response.json({ data: data }))
    .catch(err => console.log(err));
}

/**
 * Handle the request to add a new order and send the response.
 * 
 * @param {object} request - The HTTP request object containing the 
 * new order details in the body.
 * @param {object} response - The HTTP response object.
 */
exports.orderAdd = (request, response) => {
  const { item_list, table_id, customer_num } = request.body;
  const db = dbService.getDbServiceInstance();
  const result = db.insertToOrders(item_list, table_id, customer_num);
  
  return result
    .then(data => response.json({ success: data }))
    .catch(err => console.log(err));
}

/**
 * Handle the request to delete an order and send the response.
 * 
 * @param {object} request - The HTTP request object containing the 
 * ID of the order to be deleted.
 * @param {object} response - The HTTP response object.
 */
exports.orderDelete = (request, response) => {
  const { id } = request.params;
  const db = dbService.getDbServiceInstance();
  const result = db.deleteByIdFromOrders(id);

  return result
    .then(data => response.json({ success: data }))
    .catch(err => console.log(err));
}

/**
 * Handle the request to update an order and send the response.
 * 
 * @param {object} request - The HTTP request object containing the 
 * updated order details in the body.
 * @param {object} response - The HTTP response object.
 */
exports.orderUpdate = (request, response) => {
  const { id, item_list, table_id } = request.body;
  const db = dbService.getDbServiceInstance();
  const result = db.updateOrder(id, item_list, table_id);

  return result
    .then(data => response.json({ success: data }))
    .catch(err => console.log(err));
}
