
const dbService = require('../database/database');
/**
 * Handle the request to retrieve all dishes data and send the response.
 * 
 * @param {object} request - The HTTP request object.
 * @param {object} response - The HTTP response object.
 */
exports.menuGet = (request, response) => {
  const db = dbService.getDbServiceInstance();
  const result = db.getAllDataFromDishes();

  return result
    .then(data => response.json({ data: data }))
    .catch(err => console.log(err));
}

/**
 * Handle the request to add a new dish and send the response.
 * 
 * @param {object} request - The HTTP request object containing the new dish details in the body.
 * @param {object} response - The HTTP response object.
 */
exports.menuAdd = (request, response) => {
  const { name, price, description } = request.body;
  const db = dbService.getDbServiceInstance();
  const result = db.insertToDishes(name, price, description);

  return result
    .then(data => response.json({ success: data }))
    .catch(err => console.log(err));
}

/**
 * Handle the request to delete a dish and send the response.
 * 
 * @param {object} request - The HTTP request object containing the ID of the dish to be deleted.
 * @param {object} response - The HTTP response object.
 */
exports.menuDelete = (request, response) => {
  const { id } = request.params;
  const db = dbService.getDbServiceInstance();
  const result = db.deleteByIdFromDishes(id);

  return result
    .then(data => response.json({ success: data }))
    .catch(err => console.log(err));
}

/**
 * Handle the request to update a dish and send the response.
 * 
 * @param {object} request - The HTTP request object containing the updated dish details in the body.
 * @param {object} response - The HTTP response object.
 */
exports.menuUpdate = (request, response) => {
  const { id, name, price, description } = request.body;
  const db = dbService.getDbServiceInstance();
  const result = db.updateDish(id, name, price, description);

  return result
    .then(data => response.json({ success: data }))
    .catch(err => console.log(err));
}
