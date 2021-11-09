const express = require('express');
const router = express.Router();
const { createExchange, 
        getExchange, 
        getExchanges } = require('../controllers/exchange');

router.post('/exchange', createExchange);

router.get('/exchange/:id', getExchange);

router.get('/exchange', getExchanges);

module.exports = router;