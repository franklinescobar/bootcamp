const Exchange = require('../models/exchange');

module.exports.createExchange =  (req, res, next) => {
  const args = [req.body.description];
  Exchange.create(args)
  .then(() => res.status(200).json({ valid: true, message: 'Exchanged created!' }))
  .catch((e) => res.status(400).json({ valid: false, message: e }));
}

module.exports.getExchange = (req, res, next) => {
  const args = [parseInt(req.params.id, 10)];
  Exchange.findById(args)
  .then(({rows}) => {
    res.status(200).json({ valid: true, data: rows })
  })
  .catch((e) => res.status(400).json({ valid: false, message: e }));
}

module.exports.getExchanges = (req, res, next) => {
  Exchange.fetchAll()
  .then(({rows}) => {
    res.status(200).json({ valid: true, data: rows })
  })
  .catch((e) => res.status(400).json({ valid: false, message: e }));
}