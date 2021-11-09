const pgdb = require('../util/posgre-database');

const AccountType = {};

AccountType.create = (data) => {
  const bindings = [...data];
  const SQL_CREATE_ACCOUNT_TYPE = `INSERT INTO CUENTA_TIPO(DESCRIPCION) VALUES ($1)`;
  return pgdb.query(SQL_CREATE_ACCOUNT_TYPE, bindings); 
}

AccountType.findById = (data) => {
  const bindings = [...data];
  const SQL_SELECT_ACCOUNT_TYPE = `SELECT
                                    CUENTA_TIPO AS "account_type",
                                    DESCRIPCION AS "description",
                                    TO_CHAR(ADD_FECHA, 'DD-MM-YYYY') AS "add_date"
                                  FROM CUENTA_TIPO
                                  WHERE CUENTA_TIPO = $1`;
  return pgdb.query(SQL_SELECT_ACCOUNT_TYPE, bindings); 
}

AccountType.fetchAll = () => {
  const SQL_SELECT_ACCOUNT_TYPES = `SELECT
                                      CUENTA_TIPO AS "account_type",
                                      DESCRIPCION AS "description",
                                      TO_CHAR(ADD_FECHA, 'DD-MM-YYYY') AS "add_date"
                                    FROM CUENTA_TIPO`;
  return pgdb.query(SQL_SELECT_ACCOUNT_TYPES); 
}

module.exports = AccountType;