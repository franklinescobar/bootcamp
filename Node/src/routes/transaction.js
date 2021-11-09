const express = require('express');
const router = express.Router();
const { createTransaction, 
        getTransaction, 
        getTransactions } = require('../controllers/transaction');

//router.post('/transaction', createTransaction);
router.post('/transaction', createTransaction);
router.get('/transaction/:id', getTransaction);

router.get('/transaction', getTransactions);

module.exports = router;