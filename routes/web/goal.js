const express = require('express');
// imporing controller
const goalController = require('../../controllers/goal');

const router = express.Router();

// getting the list of all goals
router.get('/', (req, res) => {
    goalController.getAll(req, res)
});

// rendering page to create
router.get('/create', (req, res) => {
    res.render('goal/create_update')
});

// rendering page to update
router.get('/update/:id', (req, res) => {
    goalController.getById(req, res)
});

module.exports = router;
