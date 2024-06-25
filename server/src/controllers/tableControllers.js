
const dbService = require('../database/database');


/**
 * Handle the request to retrieve all tables data and send the response.
 * 
 * @param {object} request - The HTTP request object.
 * @param {object} response - The HTTP response object.
 */
exports.tableGet = (request, response) => {
  const db = dbService.getDbServiceInstance();
  const result = db.getAllDataFromTables();

  return result
    .then(data => response.json({ data: data }))
    .catch(err => console.log(err));
}

/**
 * Handle the request to add a new table and send the response.
 * 
 * @param {object} request - The HTTP request object containing the 
 * new table details in the body.
 * @param {object} response - The HTTP response object.
 */
exports.tableAdd = (request, response) => {
  const { table_id, type, customer_num } = request.body;
  const db = dbService.getDbServiceInstance();
  const result = db.insertToTables(table_id, type, customer_num);
  
  return result
    .then(data => response.json({ success: data }))
    .catch(err => console.log(err));
}

/**
 * Handle the request to delete a table and send the response.
 * 
 * @param {object} request - The HTTP request object containing the 
 * ID of the table to be deleted.
 * @param {object} response - The HTTP response object.
 */
exports.tableDelete = (request, response) => {
  const { id } = request.params;
  const db = dbService.getDbServiceInstance();
  const result = db.deleteByIdFromTables(id);

  return result
    .then(data => response.json({ success: data }))
    .catch(err => console.log(err));
}

/**
 * Handle the request to update a table and send the response.
 * 
 * @param {object} request - The HTTP request object containing the 
 * updated table details in the body.
 * @param {object} response - The HTTP response object.
 */
exports.tableUpdate = (request, response) => {
  const { id, table_id, type, customer_num } = request.body;
  const db = dbService.getDbServiceInstance();
  const result = db.updateTable(id, table_id, type, customer_num);

  return result
    .then(data => response.json({ success: data }))
    .catch(err => console.log(err));
}

/**
 * Handle the request to clear a table and send the response.
 * 
 * @param {object} request - The HTTP request object containing the 
 * ID of the table to be cleared.
 * @param {object} response - The HTTP response object.
 */
exports.tableClear = (request, response) => {
  const { id } = request.params;
  const db = dbService.getDbServiceInstance();
  const result = db.clearTableById(id);

  return result
    .then(data => response.json({ success: data }))
    .catch(err => console.log(err));
}
