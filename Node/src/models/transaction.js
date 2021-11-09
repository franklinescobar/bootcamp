const pgdb = require('../util/posgre-database');

const Transaction = {};

Transaction.create = (data, iscome) => { 
    const bindings = [...data];

    console.log(iscome);

//console.log(data[4]);

var isInCome  =iscome.includes("INCOME");

console.log(isInCome);


   // const args = [req.body.account_number, req.body.destination_account,req.body.amount, req.body.category];
    console.log(bindings);
  // const SQL_CREATE_ACCOUNT = `insert into transaction (account_number, destination_account, amount,category_id, previus_balance, balance, client, transaction_date, currency) 
  //   VALUES ($1, $2,$3,$4 ,0,0,'clientequemado', CURRENT_TIMESTAMP,1)`;


/*
 if (isInCome){
     const SQL_CREATE_ACCOUNT_INCOME =
      `INSERT INTO transaction  (account_number, destination_account, amount, previus_balance, balance, client, transaction_date  , currency, category_id)
      select  account_number, $2 , $3, balance   , balance + $3, client, CURRENT_TIMESTAMP  , currency, $4
      from transaction t where t.account_number= $1   ORDER BY t.id  DESC    LIMIT 1`;
     return pgdb.query(SQL_CREATE_ACCOUNT_INCOME, bindings);
 }else{
   console.log("INSERTARA ALGO");
    const SQL_CREATE_ACCOUNT_EXPENSE =
    `INSERT INTO transaction  (account_number, destination_account, amount, previus_balance, balance, client, transaction_date  , currency, category_id)
    select  account_number, $2 , $3, balance   , balance - $3, client, CURRENT_TIMESTAMP  , currency, $4
    from transaction t where t.account_number= $1   ORDER BY t.id  DESC    LIMIT 1`



   return pgdb.query(SQL_CREATE_ACCOUNT_EXPENSE, bindings);
  }
*/

const SQL_CALL_SP =  `CALL insert_transaction($1,$2,$3,$4);`;

return pgdb.query(SQL_CALL_SP, bindings);
}

Transaction.findById = (data) => {
    console.log("findById ");
    const bindings = [... data];

    console.log("findById bindings"+bindings);

    const SQL_SELECT_CURRENCY = `SELECT t.id, t.destination_account as DestinationAccount
    , concat ( m.simbolo, t.amount) as Amount,concat ( m.simbolo, t.previus_balance) as PreviusBalance, concat ( m.simbolo, t.balance) as Balance,
   ( select concat( concat( concat(description , ' ( '), categorytype), ' )') as description   from category  where id = t.category_id) as movementType
    , (TO_CHAR(t.transaction_date, 'DD/MM/YYYY HH24:MI:SS') ) as transaction_date, m.descripcion as currency
    FROM transaction   t
    , moneda m
    WHERE t.account_number in (select number from account where id=$1)  and m.moneda = t.currency    `;
    return pgdb.query(SQL_SELECT_CURRENCY, bindings);
}

Transaction.fetchAll = (data) => {
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



                              const SQL_SELECT_ACCOUNTS = `SELECT id, account_number as Account, destination_account as DestinationAccount
                              , amount as Amount, previus_balance as PreviusBalance, balance as Balance, transaction_date, currency
                              FROM public."transaction    WHERE account_number = $1`;
                                                          console.log(SQL_SELECT_ACCOUNTS);
  return pgdb.query(SQL_SELECT_ACCOUNTS, bindings);  
}

module.exports = Transaction;