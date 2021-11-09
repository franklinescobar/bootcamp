const express = require('express');
const router = express.Router();
const badRequest = require('../controllers/bad-request');

router.use('/', badRequest);

module.exports = router;