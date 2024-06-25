
const dbService = require('../database/database');


exports.tableGet = (request, response) => {
  const db = dbService.getDbServiceInstance();
  const result = db.getAllDataFromTables();

  result
  .then(data => response.json({data : data}))
  .catch(err => console.log(err));
}

exports.tableAdd = (request, response) => {
  const { table_id } = request.body;
  const { type } =request.body;
  const { customer_num } = request.body;
  const db = dbService.getDbServiceInstance();
  const result = db.insertToTables(table_id, type, customer_num);
  
  result
  .then(data => response.json({success : data}))
  .catch(err => console.log(err));
}

exports.tableDelete = (request, response) => {
  const { id } = request.params;
  const db = dbService.getDbServiceInstance();
  const result = db.deleteByIdFromTables(id);

  result
  .then(data => response.json({success : data}))
  .catch(err => console.log(err));
}

exports.tableUpdate = (request, response) => {
  const { id } = request.body;
  const { table_id } = request.body;
  const { type } = request.body;
  const { customer_num } = request.body;
  const db = dbService.getDbServiceInstance();
  const result = db.updateTable(id, table_id, type, customer_num);

  result
  .then(data => response.json({success : data}))
  .catch(err => console.log(err));
}

exports.tableClear = (request, response) => {
  const { id } = request.params;
  const db = dbService.getDbServiceInstance();
  const result = db.clearTableById(id);

  result
  .then(data => response.json({success : data}))
  .catch(err => console.log(err));
}
