const express = require('express');
//importing validation
const { goalValidationRules } = require('../../validators/goal');
//importing controller
const goalController = require('../../controllers/goal');
const router = express.Router();
//route to create a new goal
router.post('/create', goalValidationRules(), goalController.create);
//route to update the goal
router.post('/update/:id', goalValidationRules(), goalController.update);
//route to delete the goal
router.get('/delete/:id', goalValidationRules(), goalController.delete);

module.exports = router;
