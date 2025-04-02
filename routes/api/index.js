const express = require('express');
//importing the goal route
const goalRouter = require('./goal');

const router = express.Router();
//using goal route
router.use('/goal', goalRouter);

module.exports = router;
