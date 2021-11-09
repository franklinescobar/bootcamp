const pgdb = require('../util/posgre-database');

const Exchange = {};

Exchange.create = (data) => {
  const bindings = [...data];
  const SQL_CREATE_EXCHANGE = `INSERT INTO MONEDA(DESCRIPCION) VALUES ($1)`;
  return pgdb.query(SQL_CREATE_EXCHANGE, bindings);
}

Exchange.findById = (data) => {
  console.log("estoy aqui ");
  const bindings = [... data];
  const SQL_SELECT_EXCHANGE = `SELECT 
                                  MONEDA AS "currency",
                                  DESCRIPCION AS "description"
                                 
                                FROM MONEDA 
                                WHERE MONEDA = $1`;
  return pgdb.query(SQL_SELECT_EXCHANGE, bindings);
}
// TO_CHAR(ADD_FECHA, 'DD-MM-YYYY') AS "add_date"
Exchange.fetchAll = () => {
  console.log("BUSCANDO EXCHANGES");
  const SQL_SELECT_EXCHANGES = `SELECT  from_currency, to_currency, factor as rate                            
  FROM currency_convertion`;
  return pgdb.query(SQL_SELECT_EXCHANGES);
}
// TO_CHAR(ADD_FECHA, 'DD-MM-YYYY') AS "add_date"
module.exports = Exchange;