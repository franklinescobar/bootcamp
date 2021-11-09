const pgdb = require('../util/posgre-database');

const Category = {};

Category.create = (data) => {
  const bindings = [...data];
  const SQL_CREATE_CATEGORY = `INSERT INTO category
  (description, idcategory, categorytype)
  VALUES($1, $3, $2);
  `;
  return pgdb.query(SQL_CREATE_CATEGORY, bindings);
}

Category.findById = (data) => {
  console.log("estoy aqui ");
  const bindings = [... data];
  const SQL_SELECT_CATEGORY = `SELECT id, description, idcategory, categorytype
  FROM category  WHERE id = $1`;
  return pgdb.query(SQL_SELECT_CATEGORY, bindings);
}
// TO_CHAR(ADD_FECHA, 'DD-MM-YYYY') AS "add_date"
Category.fetchAll = () => {
  console.log("estoy aqui fetchAll11");
  const SQL_SELECT_CATEGORY = `SELECT id,   concat( concat( concat(description , ' ( '), categorytype), ' )') as description, idcategory, categorytype
  FROM category;`;
  return pgdb.query(SQL_SELECT_CATEGORY);
}
// TO_CHAR(ADD_FECHA, 'DD-MM-YYYY') AS "add_date"
module.exports = Category;