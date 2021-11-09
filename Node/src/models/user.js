const pgdb = require('../util/posgre-database');

const User = {};

User.create = (data) => {
  const bindings = [...data];
  const SQL_CREATE_USER = `INSERT INTO USUARIO(USUARIO, CORREO) VALUES($1, $2)`;
  return pgdb.query(SQL_CREATE_USER, bindings);
}

module.exports = User;