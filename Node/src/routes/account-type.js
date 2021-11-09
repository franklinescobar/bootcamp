const express = require('express');
const router = express.Router();
const { createAccountType, 
        getAccountType, 
        getAccountsType } = require('../controllers/account-type');

router.post('/account-type', createAccountType);

router.get('/account-type/:id', getAccountType);

router.get('/account-type', getAccountsType);

module.exports = router;