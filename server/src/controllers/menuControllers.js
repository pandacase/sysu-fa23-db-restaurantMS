
const dbService = require('../database/database');

exports.menuGet = (request, response) => {
  const db = dbService.getDbServiceInstance();
  const result = db.getAllDataFromDishes();

  result
  .then(data => response.json({data : data}))
  .catch(err => console.log(err));
}

exports.menuAdd = (request, response) => {
  const { name } = request.body;
  const { price } = request.body;
  const { description } = request.body;
  // icon 
  const db = dbService.getDbServiceInstance();
  const result = db.insertToDishes(name, price, description);

  result
  .then(data => response.json({success : data}))
  .catch(err => console.log(err));
}

exports.menuDelete = (request, response) => {
  const { id } = request.params;
  const db = dbService.getDbServiceInstance();
  const result = db.deleteByIdFromDishes(id);

  result
  .then(data => response.json({success : data}))
  .catch(err => console.log(err));
}

exports.menuUpdate = (request, response) => {
  const { id } = request.body;
  const { name } = request.body;
  const { price } = request.body;
  const { description } = request.body;
  // icon 
  const db = dbService.getDbServiceInstance();
  const result = db.updateDish(id, name, price, description);

  result
  .then(data => response.json({success : data}))
  .catch(err => console.log(err));
}
