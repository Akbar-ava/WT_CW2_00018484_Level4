const express = require('express')

const goalRouter = require('./goal')

const router = express.Router()

router.use('/goal', goalRouter)

module.exports = router
