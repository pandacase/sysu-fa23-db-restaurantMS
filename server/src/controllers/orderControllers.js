
const dbService = require('../database/database');


exports.orderGet = (request, response) => {
  const db = dbService.getDbServiceInstance();
  const result = db.getAllDataFromOrders();

  result
  .then(data => response.json({data : data}))
  .catch(err => console.log(err));
}

exports.orderAdd = (request, response) => {
  const { item_list } = request.body;
  const { total_price } = request.body;
  const db = dbService.getDbServiceInstance();
  const result = db.insertToOrders(item_list, total_price);
  
  result
  .then(data => response.json({success : data}))
  .catch(err => console.log(err));
}

exports.orderDelete = (request, response) => {
  const { id } = request.params;
  const db = dbService.getDbServiceInstance();
  const result = db.deleteByIdFromOrders(id);

  result
  .then(data => response.json({success : data}))
  .catch(err => console.log(err));
}

exports.orderUpdate = (request, response) => {
  const { id } = request.body;
  const { item_list } = request.body;
  const { total_price } = request.body;
  const db = dbService.getDbServiceInstance();
  const result = db.updateOrder(id, item_list, total_price);

  result
  .then(data => response.json({success : data}))
  .catch(err => console.log(err));
}
