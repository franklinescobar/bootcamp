const pgdb = require('../util/posgre-database');

const Account = {};

Account.create = (data) => { 
    const bindings = [...data];
    console.log("a crear la transccion");
    console.log(bindings);
    const SQL_CREATE_ACCOUNT = `insert into ACCOUNT (NUMBER , BALANCE, DESCRIPTION , CLIENT, OPENDATE, STATUS, CURRENCY,ACCOUNT_TYPE)
     VALUES ($1, $2,$3,$4 , CURRENT_TIMESTAMP,$5,$6,$7);`;

    console.log(SQL_CREATE_ACCOUNT);


    const SQL_CREATE_TRANSACTION = `INSERT INTO transaction  (account_number, destination_account, amount, previus_balance, balance, client, transaction_date  , currency, category_id)
    VALUES ($1, $2, $3,$4,$5,$6,CURRENT_TIMESTAMP,$6, $7)`;



     pgdb.query(SQL_CREATE_ACCOUNT, bindings);

     return  pgdb.query(SQL_CREATE_TRANSACTION, bindings);
    }

Account.findById = (data) => {
    console.log("estoy aqui ");
    const bindings = [... data];
    const SQL_SELECT_CURRENCY = `SELECT 
                                    MONEDA AS "currency",
                                    DESCRIPCION AS "description",
                                    TO_CHAR(ADD_FECHA, 'DD-MM-YYYY') AS "add_date"
                                  FROM MONEDA 
                                  WHERE MONEDA = $1`;
    return pgdb.query(SQL_SELECT_CURRENCY, bindings);
}

Account.fetchAll = (data) => {
  const bindings = [...data];
//   const SQL_SELECT_ACCOUNTS = `SELECT
//   C.NUMBER AS "account",
//   C.DESCRIPTION AS "description",
//   CT.CUENTA_TIPO AS "account_type",
//   C.DESCRIPTION AS "account_type_description",
//   M.MONEDA AS "currency",
//   M.DESCRIPCION AS "currency_description"
// FROM ACCOUNT C
//   INNER JOIN CUENTA_TIPO CT ON (C.ACCOUNT_TYPE = CT.CUENTA_TIPO)
//   INNER JOIN MONEDA M ON (C.CURRENCY = M.MONEDA)
//                               WHERE C.CLIENT = $1`;

console.log("ESTO ES LA ACCOUNT"+bindings);

                              const SQL_SELECT_ACCOUNTS = `SELECT id,
                              C.NUMBER AS "account",
                              c.balance,
                              (TO_CHAR(c.opendate, 'DD/MM/YYYY HH24:MI:SS') ) as opendate,
                              m.simbolo AS "currency",
                              (case when c.status = 1 then 'ACTIVE' ELSE 'INACTIVE' END)as status,
                          ct.descripcion as "type"
                            FROM ACCOUNT C
                              INNER JOIN CUENTA_TIPO CT ON (C.ACCOUNT_TYPE = CT.CUENTA_TIPO)
                              INNER JOIN MONEDA M ON (C.CURRENCY = M.MONEDA)
                                                          WHERE C.CLIENT = $1 order by id desc` ;
                                                        //  console.log(SQL_SELECT_ACCOUNTS);
  return pgdb.query(SQL_SELECT_ACCOUNTS, bindings);  
}

module.exports = Account;