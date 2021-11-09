const express = require('express');
const router = express.Router();
const { createCurrency, 
        getCurrency, 
        getCurrencies } = require('../controllers/currency');

router.post('/currency', createCurrency);

router.get('/currency/:id', getCurrency);

router.get('/currency', getCurrencies);

module.exports = router;