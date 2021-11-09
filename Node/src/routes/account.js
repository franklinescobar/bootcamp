const express = require('express');
const router = express.Router();
const { createAccount, 
        getAccount, 
        getAccounts } = require('../controllers/account');

router.post('/account', createAccount);

router.get('/account/:id', getAccount);

router.get('/account', getAccounts);

module.exports = router;