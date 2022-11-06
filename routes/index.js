const express = require('express');

const router = express.Router();

router.use('/users',require('./user'));
router.use('/todo',require('./list'));


module.exports = router;