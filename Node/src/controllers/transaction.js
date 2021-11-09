const Transaction = require('../models/transaction');

module.exports.createTransaction =  (req, res, next) => {
  const args = [req.body.account_number, req.body.destination_account,req.body.amount, req.body.category];


 // const args = [req.body.account_number,req.body.destination_account];




console.log("antes de insertar transaccion es esto " + args);
Transaction.create(args, req.body.category_description)
  .then(() => res.status(200).json({ valid: true, message: 'Transaction created!' }))
  .catch((e) => res.status(400).json({ valid: false, message: e }));


}

module.exports.getTransaction = (req, res, next) => {

 
  const args = [parseInt(req.params.id, 10)];
  console.log(args);
  Transaction.findById(args)
  .then(({rows}) => {
    res.status(200).json({ valid: true, data: rows })
  })
  .catch((e) => res.status(400).json({ valid: false, message: e }));
}

module.exports.getTransactions = (req, res, next) => {
  const args = [req.user.uid];
  Transaction.fetchAll(args)
  .then(({rows}) => res.status(200).json({ valid: true, data: rows }))
  .catch((e) => res.status(400).json({ valid: false, message: e }));
}
